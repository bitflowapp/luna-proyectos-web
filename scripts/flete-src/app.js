"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const preact_mjs_1 = require("./vendor/preact.mjs");
const api_js_1 = require("./api.js");
const ui_js_1 = require("./ui.js");
const domain_js_1 = require("./domain.js");
const tracking_js_1 = require("./tracking.js");
const commercial_js_1 = require("./commercial.js");

const { h } = preact_mjs_1;
const { Icon } = ui_js_1;

const serviceIcon = { freight: 'truck', passengers: 'users', special: 'route' };
const steps = ['Recorrido', 'Detalles', 'Contacto'];
const stepFields = [
    ['kind', 'origin', 'destination'],
    ['when', 'scheduled_at', 'details', 'description', 'quantity', 'cargo_size', 'needs_help', 'helpers', 'passengers', 'luggage', 'round_trip', 'return_at', 'notes'],
    ['contact', 'name', 'phone', 'whatsapp', 'email', 'consent']
];

const value = (e) => e.currentTarget.value;
const checked = (e) => e.currentTarget.checked;
const currentPath = () => window.location.hash.replace(/^#/, '') || '/';

const toArgInput = (iso) => iso ? new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false,
}).format(new Date(iso)).replace(' ', 'T') : '';

const fromArgInput = (input) => {
    if (!input)
        return null;
    const date = new Date(`${input}:00-03:00`);
    return Number.isFinite(date.getTime()) ? date.toISOString() : null;
};

function recover() {
    try {
        const saved = JSON.parse(sessionStorage.getItem('flete-draft.v1') || 'null');
        if (saved && /^[a-f0-9]{64}$/.test(saved.token) && ['freight', 'passengers', 'special'].includes(saved.draft?.kind) &&
            typeof saved.draft.origin === 'string' && typeof saved.draft.destination === 'string' &&
            typeof saved.draft.details?.notes === 'string' && typeof saved.draft.contact?.name === 'string')
            return { draft: saved.draft, token: saved.token, step: Math.max(0, Math.min(2, Number(saved.step) || 0)) };
    }
    catch { }
    return { draft: (0, domain_js_1.blankPayload)(), token: (0, domain_js_1.randomToken)(), step: 0 };
}

class App extends preact_mjs_1.Component {
    alive = true;
    poll = 0;
    scrollFrame = 0;
    revealObserver;
    detailSequence = 0;
    trackSequence = 0;
    restoreFocus = null;

    motion() { return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'; }

    observeHome() {
        this.revealObserver?.disconnect();
        if (this.state.path !== '/' || typeof IntersectionObserver === 'undefined')
            return;
        this.revealObserver = new IntersectionObserver(entries => {
            for (const entry of entries)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in-view');
                    this.revealObserver?.unobserve(entry.target);
                }
        }, { threshold: .15 });
        document.querySelectorAll('.how-section,.coverage-section').forEach(element => this.revealObserver?.observe(element));
    }

    viewportListener = () => {
        if (this.scrollFrame)
            return;
        this.scrollFrame = window.requestAnimationFrame(() => {
            this.scrollFrame = 0;
            const view = window.visualViewport;
            const keyboard = (view ? view.height < window.innerHeight * .78 : false) || document.activeElement?.matches('input,textarea,select');
            const visibleAction = Array.from(document.querySelectorAll('.hero-actions .button-primary,.quick-card button[type=submit],.closing-panel .button')).some(element => {
                const r = element.getBoundingClientRect();
                return r.top >= 70 && r.bottom <= window.innerHeight - 20;
            });
            const show = this.state.path === '/' && window.innerWidth < 800 && window.scrollY > 220 && !keyboard && !visibleAction;
            if (show !== this.state.stickyCta)
                this.set({ stickyCta: show });
        });
    };

    modalKeys = (event) => {
        const modal = document.querySelector('[aria-modal="true"]');
        if (!modal)
            return;
        if (event.key === 'Escape' && !this.state.busy) {
            event.preventDefault();
            const target = this.restoreFocus;
            this.set({ editing: null, cancellation: null, acceptance: null }, () => {
                if (target && target.isConnected) {
                    target.focus();
                } else {
                    document.querySelector('.quote-accept-actions button, main h1')?.focus();
                }
            });
            return;
        }
        if (event.key !== 'Tab')
            return;
        const fields = Array.from(modal.querySelectorAll('button:not(:disabled),a[href],input:not(:disabled),textarea:not(:disabled),select:not(:disabled),[tabindex="0"]')).filter(e => e.getClientRects().length > 0);
        const first = fields[0], last = fields[fields.length - 1];
        if (!first || !last)
            return;
        if (!modal.contains(document.activeElement) || (event.shiftKey && document.activeElement === first)) {
            event.preventDefault();
            (event.shiftKey ? last : first).focus();
        }
        else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    routeListener = () => this.routeChanged();
    connectionListener = () => this.notify(navigator.onLine ? 'Conexión recuperada. Podés volver a intentar.' : 'Estás sin conexión. No se pueden enviar cambios; tu formulario sigue en esta pestaña.', navigator.onLine ? 'success' : 'info');

    constructor(props) {
        super(props);
        const saved = recover();
        this.state = {
            path: currentPath(), runtime: null, bootError: '', busy: false, flash: null,
            ...saved, errors: {}, photos: [], website: '', saved: false, completedToken: null, tracking: null, trackingError: '', lookup: '',
            user: null, checkedSession: false, loadingAdmin: false, dashboard: null, detail: null, loginEmail: '', loginPassword: '',
            quote: '', note: '', cancellation: null, editing: null, vehicleEditor: null, settings: null,
            search: '', statusFilter: '', serviceFilter: '', dateFilter: '', customer: null,
            showDemoTools: new URLSearchParams(window.location.search).get('modo') === 'demo', quickErrors: {}, stickyCta: false, acceptance: null,
            showMoreDetails: false, showEmail: false, refreshing: false
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.routeListener);
        window.addEventListener('keydown', this.modalKeys);
        window.addEventListener('online', this.connectionListener);
        window.addEventListener('offline', this.connectionListener);
        window.addEventListener('scroll', this.viewportListener, { passive: true });
        window.addEventListener('resize', this.viewportListener);
        window.addEventListener('focusin', this.viewportListener);
        window.addEventListener('focusout', this.viewportListener);
        window.visualViewport?.addEventListener('resize', this.viewportListener);
        void this.boot();
        this.poll = window.setInterval(() => {
            if (document.visibilityState !== 'visible' || this.state.busy)
                return;
            if (this.state.path.startsWith('/seguimiento/') || this.state.path.startsWith('/recibida/'))
                void this.loadTracking(true);
            if (this.state.path.startsWith('/admin') && this.state.user)
                void this.loadDashboard(true);
        }, 15000);
    }

    componentDidUpdate(_previousProps, previous) {
        const wasOpen = previous.editing !== null || previous.cancellation !== null || previous.acceptance !== null;
        const isOpen = this.state.editing !== null || this.state.cancellation !== null || this.state.acceptance !== null;

        if (previous.path !== this.state.path || previous.runtime !== this.state.runtime) {
            this.viewportListener();
            this.observeHome();
        }

        if (isOpen && !wasOpen) {
            if (!this.restoreFocus || !this.restoreFocus.isConnected) {
                this.restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
            }
            const modalEl = document.querySelector('[aria-modal="true"]');
            if (modalEl) {
                const el = modalEl.querySelector('input, textarea, button:not(.icon-button), h2');
                el?.focus();
            }
            window.setTimeout(() => {
                const el = document.querySelector('[aria-modal="true"] input, [aria-modal="true"] textarea, [aria-modal="true"] button:not(.icon-button), [aria-modal="true"] h2');
                el?.focus();
            }, 30);
        }
        else if (wasOpen && !isOpen) {
            const target = this.restoreFocus;
            this.restoreFocus = null;
            window.requestAnimationFrame(() => {
                if (!this.alive)
                    return;
                if (target && target.isConnected) {
                    target.focus({ preventScroll: true });
                    if (document.activeElement === target)
                        return;
                }
                const fallback = document.querySelector('.accepted-receipt, main h1, .tracking-card');
                if (fallback instanceof HTMLElement) {
                    fallback.setAttribute('tabindex', '-1');
                    fallback.focus({ preventScroll: true });
                } else {
                    this.focusHeading();
                }
            });
        }
    }

    componentWillUnmount() {
        this.alive = false;
        this.revealObserver?.disconnect();
        window.clearInterval(this.poll);
        window.cancelAnimationFrame(this.scrollFrame);
        window.removeEventListener('scroll', this.viewportListener);
        window.removeEventListener('resize', this.viewportListener);
        window.removeEventListener('focusin', this.viewportListener);
        window.removeEventListener('focusout', this.viewportListener);
        window.visualViewport?.removeEventListener('resize', this.viewportListener);
        window.removeEventListener('hashchange', this.routeListener);
        window.removeEventListener('keydown', this.modalKeys);
        window.removeEventListener('online', this.connectionListener);
        window.removeEventListener('offline', this.connectionListener);
        this.state.photos.forEach(p => URL.revokeObjectURL(p.url));
    }

    componentDidCatch(error) {
        console.error(error);
        this.set({ bootError: 'Ocurrió un error al mostrar la pantalla. Recargá para recuperar el último borrador.' });
    }

    set(patch, after) {
        if (this.alive)
            this.setState(patch, after);
    }

    notify(text, type = 'info') {
        this.set({ flash: { text, type } });
    }

    fail(error) {
        this.notify(error instanceof Error ? error.message : 'No pudimos completar la operación.', 'error');
        if (error instanceof api_js_1.ApiError && error.status === 401)
            this.set({ user: null, dashboard: null, detail: null, checkedSession: true });
    }

    go(path) {
        if (this.state.path === path)
            this.routeChanged();
        else
            window.location.hash = path;
    }

    focusHeading() {
        window.setTimeout(() => {
            if (!document.activeElement?.matches('input,textarea,select'))
                document.querySelector('main h1')?.focus({ preventScroll: true });
        }, 40);
    }

    async boot() {
        this.set({ bootError: '' });
        try {
            const runtime = await api_js_1.api.config();
            this.set({ runtime }, () => void this.loadForRoute());
        }
        catch (e) {
            this.set({ bootError: e instanceof Error ? e.message : 'No pudimos iniciar la aplicación.' });
        }
    }

    routeChanged() {
        if (currentPath() === '/solicitar' && this.state.completedToken) {
            this.state.photos.forEach(p => URL.revokeObjectURL(p.url));
            this.set({ photos: [], completedToken: null });
        }
        this.detailSequence += 1;
        this.trackSequence += 1;
        this.set({
            path: currentPath(), flash: null, detail: null, tracking: null, trackingError: '', editing: null,
            vehicleEditor: null, cancellation: null, acceptance: null, stickyCta: false, note: '', quote: '', errors: {}
        }, () => void this.loadForRoute());
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.focusHeading();
    }

    async loadForRoute() {
        if (!this.state.runtime)
            return;
        const path = this.state.path;
        document.title = `${path.startsWith('/admin') ? 'Operaciones' : path.startsWith('/solicitar') ? 'Solicitar servicio' : path.startsWith('/seguimiento') ? 'Seguimiento' : 'Tu traslado, bien coordinado'} · ${this.state.runtime.business.name}`;
        if (path.startsWith('/admin')) {
            let sessionUser = this.state.user;
            if (!this.state.checkedSession) {
                this.set({ loadingAdmin: true });
                try {
                    const result = await api_js_1.api.session();
                    sessionUser = result.user;
                    this.set({ user: result.user, checkedSession: true });
                }
                catch (e) {
                    if (!(e instanceof api_js_1.ApiError && e.status === 401))
                        this.fail(e);
                    this.set({ checkedSession: true });
                }
                finally {
                    this.set({ loadingAdmin: false });
                }
            }
            if (sessionUser) {
                await this.loadDashboard();
                const id = this.state.path.match(/^\/admin\/solicitudes\/([a-f0-9-]{36})$/i)?.[1];
                if (id)
                    await this.loadDetail(id);
            }
        }
        else if (path.startsWith('/seguimiento/') || path.startsWith('/recibida/'))
            await this.loadTracking();
    }

    async loadDashboard(quiet = false) {
        if (!quiet)
            this.set({ loadingAdmin: true });
        try {
            const dashboard = await api_js_1.api.dashboard();
            this.set({
                dashboard, runtime: this.state.runtime ? { ...this.state.runtime, business: dashboard.business } : null,
                settings: this.state.settings ?? dashboard.business
            });
        }
        catch (e) {
            if (!quiet)
                this.fail(e);
        }
        finally {
            if (!quiet)
                this.set({ loadingAdmin: false });
        }
    }

    async loadDetail(id, preserveInputs = false) {
        const sequence = ++this.detailSequence;
        try {
            const detail = await api_js_1.api.detail(id);
            if (sequence !== this.detailSequence || !this.state.path.endsWith(id))
                return;
            this.set({
                detail,
                ...(preserveInputs ? {} : { quote: detail.request.quote_cents === null ? '' : String(detail.request.quote_cents / 100).replace('.', ','), note: '', editing: null })
            });
        }
        catch (e) {
            this.fail(e);
        }
    }

    async loadTracking(quiet = false) {
        const token = this.state.path.split('/')[2] ?? '';
        const sequence = ++this.trackSequence;
        if (!/^[a-f0-9]{64}$/.test(token)) {
            this.set({ trackingError: 'El enlace no es válido o ya venció.' });
            return;
        }
        try {
            const tracking = await api_js_1.api.track(token);
            if (sequence === this.trackSequence)
                this.set({ tracking, trackingError: '' });
        }
        catch (e) {
            if (sequence === this.trackSequence)
                this.set({ trackingError: e instanceof Error ? e.message : 'No pudimos consultar la solicitud.', ...(quiet ? {} : { tracking: null }) });
        }
    }

    stash(draft = this.state.draft, step = this.state.step) {
        try {
            sessionStorage.setItem('flete-draft.v1', JSON.stringify({ draft, step, token: this.state.token }));
            this.set({ saved: true });
        }
        catch {
            this.set({ saved: false });
        }
    }

    draft(patch) {
        const draft = { ...this.state.draft, ...patch };
        const invalid = (0, domain_js_1.validatePayload)(draft);
        const errors = Object.fromEntries(Object.entries(this.state.errors).filter(([key]) => invalid[key]));
        this.set({ draft, errors, quickErrors: Object.fromEntries(Object.entries(this.state.quickErrors).filter(([key]) => invalid[key])) });
        this.stash(draft);
    }

    detailDraft(patch) {
        this.draft({ details: { ...this.state.draft.details, ...patch } });
    }

    contactDraft(patch) {
        this.draft({ contact: { ...this.state.draft.contact, ...patch } });
    }

    start(kind = 'freight') {
        this.draft({ kind });
        this.set({ step: 0 });
        this.go('/solicitar');
    }

    stepNext(e) {
        e.preventDefault();
        if (this.state.step === 2) {
            void this.submit();
            return;
        }
        const all = (0, domain_js_1.validatePayload)(this.state.draft);
        const relevant = stepFields[this.state.step] ?? [];
        const errors = Object.fromEntries(Object.entries(all).filter(([key]) => relevant.includes(key)));
        if (Object.keys(errors).length) {
            this.set({ errors }, () => document.querySelector('.field-error input,.field-error textarea,.field-error select')?.focus());
            return;
        }
        const step = this.state.step + 1;
        this.set({ step, errors: {}, flash: null });
        this.stash(this.state.draft, step);
        window.scrollTo({ top: 0, behavior: this.motion() });
        this.focusHeading();
    }

    stepBack() {
        const step = Math.max(0, this.state.step - 1);
        this.set({ step, errors: {} });
        this.stash(this.state.draft, step);
    }

    async addPhotos(e) {
        const input = e.currentTarget;
        const files = [...(input.files ?? [])];
        input.value = '';
        if (this.state.photos.length + files.length > 3) {
            this.notify('Podés adjuntar hasta tres fotos.', 'error');
            return;
        }
        this.set({ busy: true });
        try {
            const prepared = [];
            for (const file of files)
                prepared.push(await (0, api_js_1.preparePhoto)(file));
            this.set({ photos: [...this.state.photos, ...prepared] });
        }
        catch (err) {
            this.fail(err);
        }
        finally {
            this.set({ busy: false });
        }
    }

    removePhoto(id) {
        const photo = this.state.photos.find(p => p.id === id);
        if (photo)
            URL.revokeObjectURL(photo.url);
        this.set({ photos: this.state.photos.filter(p => p.id !== id) });
    }

    async uploadPhotos(token) {
        for (const photo of this.state.photos.filter(p => !p.uploaded)) {
            try {
                await api_js_1.api.upload(token, photo.id, photo.blob);
                this.set({ photos: this.state.photos.map(p => p.id === photo.id ? { ...p, uploaded: true, error: '' } : p) });
            }
            catch (e) {
                this.set({ photos: this.state.photos.map(p => p.id === photo.id ? { ...p, error: e instanceof Error ? e.message : 'No se adjuntó.' } : p) });
            }
        }
    }

    async submit() {
        if (this.state.busy)
            return;
        const errors = (0, domain_js_1.validatePayload)(this.state.draft);
        if (Object.keys(errors).length) {
            const step = stepFields.findIndex(fields => fields.some(k => errors[k]));
            this.set({ errors, step: step < 0 ? 4 : step });
            return;
        }
        const token = this.state.token;
        this.set({ busy: true, flash: null });
        try {
            await api_js_1.api.create((0, domain_js_1.cleanPayload)(this.state.draft), token, this.state.website);
            if (this.state.draft.kind === 'freight')
                await this.uploadPhotos(token);
            try {
                sessionStorage.removeItem('flete-draft.v1');
                sessionStorage.setItem('flete-last-token.v2', token);
            }
            catch { }
            this.set({ draft: (0, domain_js_1.blankPayload)(), step: 0, token: (0, domain_js_1.randomToken)(), saved: false, completedToken: token });
            this.go(`/recibida/${token}`);
        }
        catch (e) {
            this.fail(e);
            if (e instanceof api_js_1.ApiError && Object.keys(e.fields).length) {
                const step = stepFields.findIndex(fields => fields.some(k => e.fields[k]));
                this.set({ errors: e.fields, step: step < 0 ? 4 : step });
            }
        }
        finally {
            this.set({ busy: false });
        }
    }

    async retryPhotos() {
        this.set({ busy: true });
        await this.uploadPhotos(this.state.path.split('/')[2] ?? '');
        this.set({ busy: false });
    }

    lookup(e) {
        e.preventDefault();
        const token = this.state.lookup.trim().match(/(?:^|\/)([a-f0-9]{64})(?:$|[?&])/i)?.[1];
        if (!token) {
            this.notify('Pegá el enlace privado completo que recibiste al enviar la solicitud. El código FL es sólo una referencia.', 'error');
            return;
        }
        this.go(`/seguimiento/${token.toLowerCase()}`);
    }

    async copyLink() {
        const token = this.state.path.split('/')[2] ?? '';
        const link = `${window.location.href.split('#')[0]}#/seguimiento/${token}`;
        const shareData = { title: 'Seguimiento de mi solicitud', text: 'Podés consultar el estado desde este enlace.', url: link };
        if (typeof navigator.share === 'function') {
            try {
                await navigator.share(shareData);
                this.notify('Enlace compartido.', 'success');
                return;
            }
            catch (error) {
                if (error instanceof DOMException && error.name === 'AbortError')
                    return;
            }
        }
        try {
            if (!navigator.clipboard?.writeText)
                throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(link);
            this.notify('Enlace copiado.', 'success');
        }
        catch {
            this.set({ lookup: link });
            window.requestAnimationFrame(() => {
                const input = document.getElementById('copy-link');
                input?.focus();
                input?.select();
            });
            this.notify('Enlace listo para copiar.', 'success');
        }
    }

    async refreshTracking() {
        if (this.state.refreshing)
            return;
        this.set({ refreshing: true, flash: null });
        await this.loadTracking(true);
        if (!this.state.trackingError)
            this.notify('Estado actualizado.', 'success');
        this.set({ refreshing: false });
    }

    fillDemo() {
        const p = (0, domain_js_1.blankPayload)();
        p.kind = this.state.draft.kind;
        p.origin = 'Centro';
        p.destination = 'Barrio Norte';
        p.details.description = p.kind === 'special' ? 'Traslado de equipos para un evento.' : '4 cajas y un mueble';
        p.details.quantity = 5;
        p.details.passengers = 3;
        p.details.luggage = 'Valijas';
        p.contact = { name: 'Persona de prueba', phone: '+540000000099', whatsapp: '', email: 'demo@example.invalid', consent: true };
        this.set({ draft: p, errors: {}, flash: { text: 'Cargamos datos ficticios. Podés cambiarlos y recorrer todos los pasos.', type: 'info' } });
        this.stash(p);
    }

    async resetPreview() {
        if (!api_js_1.IS_PREVIEW || !window.confirm('¿Reiniciar esta demo? Se borrarán sólo tus pruebas de Flete en este navegador y volverán los ejemplos iniciales.'))
            return;
        this.set({ busy: true });
        try {
            await api_js_1.previewApi.reset();
            try {
                sessionStorage.removeItem('flete-draft.v1');
                sessionStorage.removeItem('flete-last-token.v2');
            }
            catch { }
            window.location.hash = '/';
            window.location.reload();
        }
        catch (error) {
            this.fail(error);
            this.set({ busy: false });
        }
    }

    async previewTracking(id) {
        try {
            const token = await api_js_1.previewApi.tokenFor(id);
            if (token)
                this.go(`/seguimiento/${token}`);
        }
        catch (error) {
            this.fail(error);
        }
    }

    async previewRequest() {
        try {
            const data = await api_js_1.previewApi.dashboard();
            const r = data.requests.find(item => item.code === this.state.tracking?.code);
            if (r)
                this.go(`/admin/solicitudes/${r.id}`);
        }
        catch (error) {
            this.fail(error);
        }
    }

    previewToolbar() {
        if (!api_js_1.IS_PREVIEW || !this.state.showDemoTools)
            return null;
        return (0, preact_mjs_1.h)("nav", { id: "demo-controls", class: "preview-toolbar", "aria-label": "Recorrer la demostraci\u00F3n" },
            (0, preact_mjs_1.h)("span", { class: "preview-label" }, "HERRAMIENTAS DE PRESENTACI\u00D3N"),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("a", { href: "#/demo" }, "Gu\u00EDa de la demo"),
                (0, preact_mjs_1.h)("a", { class: this.state.path.startsWith('/admin') ? '' : 'active', href: "#/" }, "Vista cliente"),
                (0, preact_mjs_1.h)("a", { class: this.state.path.startsWith('/admin') ? 'active' : '', href: "#/admin" }, "Panel del due\u00F1o"),
                (0, preact_mjs_1.h)("button", { "aria-label": "Reiniciar demostraci\u00F3n", onClick: () => void this.resetPreview(), disabled: this.state.busy },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 16 })
                ),
                (0, preact_mjs_1.h)("button", { "aria-label": "Ocultar controles de demostraci\u00F3n", onClick: () => this.set({ showDemoTools: false }) },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close", size: 16 })
                )
            )
        );
    }

    scrollHome(id) {
        if (this.state.path !== '/')
            this.go('/');
        window.setTimeout(() => {
            const target = document.getElementById(id);
            target?.scrollIntoView({ behavior: this.motion(), block: 'center' });
            if (target instanceof HTMLInputElement)
                target.focus({ preventScroll: true });
        }, 80);
    }

    publicHeader() {
        return (0, preact_mjs_1.h)("header", { class: "public-header" },
            (0, preact_mjs_1.h)("div", { class: "container header-inner" },
                (0, preact_mjs_1.h)(ui_js_1.Brand, { name: this.state.runtime?.business.name }),
                (0, preact_mjs_1.h)("nav", { "aria-label": "Navegaci\u00F3n principal" },
                    (0, preact_mjs_1.h)("a", { class: "nav-link tracking-nav", href: "#/seguimiento", "aria-label": "Mi solicitud" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "search", size: 18 }),
                        (0, preact_mjs_1.h)("span", null, "Mi solicitud")
                    )
                )
            )
        );
    }

    footer() {
        return (0, preact_mjs_1.h)(commercial_js_1.CommercialFooter, { business: this.state.runtime?.business ?? domain_js_1.defaultConfig, demo: api_js_1.IS_PREVIEW });
    }

    home() {
        return (0, preact_mjs_1.h)(commercial_js_1.CommercialHome, {
            business: this.state.runtime?.business ?? domain_js_1.defaultConfig,
            draft: this.state.draft,
            errors: this.state.quickErrors,
            onDraft: patch => this.draft(patch),
            onStart: kind => this.start(kind),
            onQuickSubmit: event => this.quickSubmit(event),
            onScroll: id => this.scrollHome(id)
        });
    }

    quickSubmit(event) {
        event.preventDefault();
        const errors = Object.fromEntries(Object.entries((0, domain_js_1.validatePayload)(this.state.draft)).filter(([key]) => ['origin', 'destination'].includes(key)));
        if (Object.keys(errors).length) {
            this.set({ quickErrors: errors }, () => document.querySelector('.quick-card input[aria-invalid="true"]')?.focus());
            return;
        }
        this.set({ step: 1, errors: {}, quickErrors: {} });
        this.stash(this.state.draft, 1);
        this.go('/solicitar');
    }

    async exampleTracking() {
        try {
            const data = await api_js_1.previewApi.dashboard();
            const request = data.requests.find(r => r.status === 'quoted') ?? data.requests[0];
            if (request)
                await this.previewTracking(request.id);
            else
                this.start();
        }
        catch (e) {
            this.fail(e);
        }
    }

    async acceptQuote() {
        if (!api_js_1.IS_PREVIEW || this.state.busy || !this.state.acceptance)
            return;
        const token = this.state.path.split('/')[2] ?? '';
        const path = this.state.path;
        const expected = this.state.acceptance;
        this.set({ busy: true });
        try {
            await api_js_1.previewApi.acceptQuote(token, expected.version, expected.quote);
            if (this.state.path === path) {
                this.restoreFocus = null;
                this.set({ acceptance: null });
                await this.loadTracking();
                this.notify('Cotización aceptada. Quedan por definir las condiciones del servicio. No se realizó ningún cobro.', 'success');
                window.setTimeout(() => {
                    const receipt = document.querySelector('.accepted-receipt, .next-step-card');
                    if (receipt instanceof HTMLElement) {
                        receipt.setAttribute('tabindex', '-1');
                        receipt.focus({ preventScroll: true });
                    }
                }, 40);
            }
        }
        catch (error) {
            if (this.state.path === path) {
                this.set({ acceptance: null });
                await this.loadTracking();
                this.fail(error);
            }
        }
        finally {
            this.set({ busy: false });
        }
    }

    acceptanceDialog() {
        const accepted = this.state.acceptance;
        if (!accepted)
            return null;
        return (0, preact_mjs_1.h)("div", { class: "modal-scrim" },
            (0, preact_mjs_1.h)("section", {
                class: "modal panel small-modal",
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "accept-title",
                "aria-describedby": "accept-description"
            },
                (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                    (0, preact_mjs_1.h)("h2", { id: "accept-title" }, "Aceptar cotización"),
                    (0, preact_mjs_1.h)("button", {
                        class: "icon-button",
                        disabled: this.state.busy,
                        "aria-label": "Cerrar aceptación",
                        onClick: () => {
                            const target = this.restoreFocus;
                            this.set({ acceptance: null }, () => target?.focus());
                        }
                    }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close" }))
                ),
                (0, preact_mjs_1.h)("p", { class: "accept-amount" },
                    (0, domain_js_1.money)(accepted.quote),
                    " ",
                    (0, preact_mjs_1.h)("small", null, "ARS")
                ),
                (0, preact_mjs_1.h)("p", { id: "accept-description" },
                    "Aceptás este importe. El dueño todavía debe confirmar el servicio."
                ),
                (0, preact_mjs_1.h)("div", { class: "form-actions" },
                    (0, preact_mjs_1.h)("button", {
                        class: "button button-light",
                        disabled: this.state.busy,
                        onClick: () => {
                            const target = this.restoreFocus;
                            this.set({ acceptance: null }, () => target?.focus());
                        }
                    }, "Volver"),
                    (0, preact_mjs_1.h)("button", {
                        class: "button button-primary",
                        disabled: this.state.busy,
                        onClick: () => void this.acceptQuote()
                    },
                        this.state.busy ? 'Guardando…' : 'Confirmar aceptación',
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 18 })
                    )
                )
            )
        );
    }

    wizard() {
        const { step, draft: p, errors: e, busy } = this.state;
        const titles = [
            '¿Qué necesitás trasladar?',
            '¿De dónde a dónde?',
            '¿Cuándo lo necesitás?',
            p.kind === 'freight' ? 'Contanos sobre la carga.' : p.kind === 'passengers' ? 'Los detalles del viaje.' : 'Cada traslado es diferente.',
            '¿Cómo te contactamos?',
            'Revisá tu solicitud.'
        ];
        const subtitles = [
            'Elegí el tipo de servicio. Después coordinamos los detalles.',
            'Escribí origen y destino. Podés sumar detalles en el siguiente paso.',
            'Elegí si lo necesitás lo antes posible o preferís programar una fecha y hora.',
            'Estos datos ayudan a preparar una cotización y evaluar el servicio solicitado.',
            'Usá datos ficticios para probar el formulario. No se enviarán mensajes.',
            'Enviar la solicitud no confirma el viaje ni genera ningún cobro.'
        ];

        return (0, preact_mjs_1.h)("main", { id: "main", class: "container wizard-main", "data-step": step },
            (0, preact_mjs_1.h)("div", { class: "wizard-top" },
                (0, preact_mjs_1.h)("a", { href: "#/", class: "text-link" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 17 }),
                    "Volver al inicio"
                ),
                (0, preact_mjs_1.h)("span", { class: "muted" }, "Paso ", step + 1, " de 6")
            ),
            (0, preact_mjs_1.h)("ol", { class: "stepper", "aria-label": "Pasos de la solicitud" },
                steps.map((name, i) => (0, preact_mjs_1.h)("li", {
                    class: i === step ? 'current' : i < step ? 'done' : '',
                    "aria-current": i === step ? 'step' : undefined,
                    key: name
                },
                    h('button', {
                        type: 'button', disabled: i >= step || busy,
                        'aria-label': i < step ? `Volver al paso ${i + 1}: ${name}` : `Paso ${i + 1}: ${name}`,
                        onClick: () => { if (i < step) { this.set({ step: i, errors: {} }); this.stash(this.state.draft, i); this.focusHeading(); } }
                    }, h('span', null, i < step ? h(Icon, { name: 'check', size: 14 }) : i + 1), h('b', null, name))
                ))
            ),
            (0, preact_mjs_1.h)("div", { class: "wizard-layout" },
                (0, preact_mjs_1.h)("section", { class: "wizard-form", 'data-step': step },
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, steps[step]),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, titles[step]),
                    (0, preact_mjs_1.h)("p", { class: "subtitle" }, subtitles[step]),
                    api_js_1.IS_PREVIEW && step < 5 && (
                        (0, preact_mjs_1.h)("button", { class: "demo-fill text-link", type: "button", onClick: () => this.fillDemo() },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "plus", size: 16 }),
                            "Completar con datos de ejemplo"
                        )
                    ),
                    this.state.flash && (0, preact_mjs_1.h)(ui_js_1.Notice, { type: this.state.flash.type }, this.state.flash.text),
                    (0, preact_mjs_1.h)("form", { onSubmit: (event) => this.stepNext(event), noValidate: true, "aria-busy": busy },
                        step === 0 && (
                            (0, preact_mjs_1.h)("div", { class: "service-choices" },
                                ['freight', 'passengers', 'special'].map(kind => (0, preact_mjs_1.h)("button", {
                                    type: "button",
                                    class: `service-choice${p.kind === kind ? ' selected' : ''}`,
                                    "aria-pressed": p.kind === kind,
                                    onClick: () => this.draft({ kind }),
                                    key: kind
                                },
                                    (0, preact_mjs_1.h)("span", { class: "choice-icon" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: serviceIcon[kind], size: 26 })
                                    ),
                                    (0, preact_mjs_1.h)("span", null,
                                        (0, preact_mjs_1.h)("strong", null, domain_js_1.serviceLabels[kind]),
                                        (0, preact_mjs_1.h)("small", null,
                                            kind === 'freight' ? 'Muebles, cajas, mercadería y cargas generales'
                                                : kind === 'passengers' ? 'Viajes coordinados de ida o ida y vuelta'
                                                : 'Traslados que requieren evaluación a medida'
                                        )
                                    ),
                                    (0, preact_mjs_1.h)("span", { class: "radio-dot" })
                                ))
                            )
                        ),
                        step === 1 && (
                            (0, preact_mjs_1.h)("div", { class: "form-fields" },
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "origin", label: "Direcci\u00F3n de origen", error: e.origin, hint: "Inclu\u00ED calle, n\u00FAmero y localidad." },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "origin",
                                        name: "origin",
                                        autoComplete: "street-address",
                                        maxLength: 240,
                                        value: p.origin,
                                        onInput: (ev) => this.draft({ origin: value(ev) }),
                                        placeholder: "Calle, altura y localidad",
                                        "aria-invalid": Boolean(e.origin)
                                    })
                                ),
                                (0, preact_mjs_1.h)("div", { class: "route-connector" },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route", size: 20 })
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "destination", label: "Direcci\u00F3n de destino", error: e.destination, hint: "Dirección de destino y localidad." },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "destination",
                                        name: "destination",
                                        maxLength: 240,
                                        value: p.destination,
                                        onInput: (ev) => this.draft({ destination: value(ev) }),
                                        placeholder: "Calle, altura y localidad",
                                        "aria-invalid": Boolean(e.destination)
                                    })
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Notice, null,
                                    "No necesitamos tu ubicación GPS. Escribí las direcciones aproximadas; podés sumar referencias en el paso de detalles."
                                )
                            )
                        ),
                        step === 2 && (
                            (0, preact_mjs_1.h)("div", { class: "form-fields" },
                                (0, preact_mjs_1.h)("div", { class: "segmented" },
                                    (0, preact_mjs_1.h)("button", {
                                        type: "button",
                                        "aria-pressed": p.when === 'asap',
                                        class: p.when === 'asap' ? 'selected' : '',
                                        onClick: () => this.draft({ when: 'asap', scheduled_at: null })
                                    },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "clock" }),
                                        "Lo antes posible"
                                    ),
                                    (0, preact_mjs_1.h)("button", {
                                        type: "button",
                                        "aria-pressed": p.when === 'scheduled',
                                        class: p.when === 'scheduled' ? 'selected' : '',
                                        onClick: () => this.draft({ when: 'scheduled' })
                                    },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "calendar" }),
                                        "Programar fecha y hora"
                                    )
                                ),
                                p.when === 'scheduled' ? (
                                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "scheduled_at", label: "Fecha y horario de salida", error: e.scheduled_at, hint: "Horario de Argentina (UTC\u22123). Con al menos 5 minutos de anticipaci\u00F3n." },
                                        (0, preact_mjs_1.h)("input", {
                                            id: "scheduled_at",
                                            type: "datetime-local",
                                            value: toArgInput(p.scheduled_at),
                                            onInput: (ev) => this.draft({ scheduled_at: fromArgInput(value(ev)) })
                                        })
                                    )
                                ) : (
                                    (0, preact_mjs_1.h)("div", { class: "soft-panel" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "clock", size: 30 }),
                                        (0, preact_mjs_1.h)("h3", null, "Coordinación según disponibilidad."),
                                        (0, preact_mjs_1.h)("p", null, "El prestador revisa la solicitud y define los próximos pasos.")
                                    )
                                )
                            )
                        ),
                        step === 3 && (
                            (0, preact_mjs_1.h)("div", { class: "form-fields" },
                                p.kind === 'freight' || p.kind === 'special' ? (
                                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "description", label: p.kind === 'freight' ? '¿Qué necesitás transportar?' : 'Contanos qué servicio necesitás', error: e.description },
                                        (0, preact_mjs_1.h)("textarea", {
                                            id: "description",
                                            rows: 3,
                                            maxLength: 1500,
                                            value: p.details.description,
                                            onInput: (ev) => this.detailDraft({ description: value(ev) }),
                                            placeholder: p.kind === 'freight' ? 'Por ejemplo: una heladera y cuatro cajas medianas.' : 'Describí lo que necesitás y cualquier detalle importante.'
                                        })
                                    )
                                ) : null,
                                p.kind === 'freight' && (
                                    (0, preact_mjs_1.h)("div", null,
                                        (0, preact_mjs_1.h)("div", { class: "form-row" },
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "cargo_size", label: "Tama\u00F1o aproximado", error: e.cargo_size },
                                                (0, preact_mjs_1.h)("select", {
                                                    id: "cargo_size",
                                                    value: p.details.cargo_size,
                                                    onChange: (ev) => this.detailDraft({ cargo_size: value(ev) })
                                                }, ['Pequeña', 'Mediana', 'Grande', 'No sé'].map(t => (0, preact_mjs_1.h)("option", { key: t, value: t }, t)))
                                            ),
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "quantity", label: "Cantidad de bultos", error: e.quantity },
                                                (0, preact_mjs_1.h)("input", {
                                                    id: "quantity",
                                                    type: "number",
                                                    inputMode: "numeric",
                                                    min: 1,
                                                    max: 500,
                                                    value: p.details.quantity,
                                                    onInput: (ev) => this.detailDraft({ quantity: Number(value(ev)) })
                                                })
                                            )
                                        ),
                                        (0, preact_mjs_1.h)("label", { class: "check-label" },
                                            (0, preact_mjs_1.h)("input", {
                                                type: "checkbox",
                                                checked: p.details.needs_help,
                                                onChange: (ev) => this.detailDraft({ needs_help: checked(ev) })
                                            }),
                                            (0, preact_mjs_1.h)("span", null,
                                                "Necesito ayuda para cargar o descargar",
                                                (0, preact_mjs_1.h)("small", null, "Se coordina y cotiza con el servicio.")
                                            )
                                        ),
                                        p.details.needs_help && (
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "helpers", label: "\u00BFCu\u00E1ntas personas estim\u00E1s necesarias?", error: e.helpers },
                                                (0, preact_mjs_1.h)("input", {
                                                    id: "helpers",
                                                    type: "number",
                                                    inputMode: "numeric",
                                                    min: 1,
                                                    max: 10,
                                                    value: p.details.helpers,
                                                    onInput: (ev) => this.detailDraft({ helpers: Number(value(ev)) })
                                                })
                                            )
                                        ),
                                        (0, preact_mjs_1.h)("div", { class: "photo-section" },
                                            (0, preact_mjs_1.h)("div", { class: "mini-heading" },
                                                (0, preact_mjs_1.h)("strong", null, "Fotos de la carga"),
                                                (0, preact_mjs_1.h)("span", null, "Opcionales \u00B7 hasta 3 fotos")
                                            ),
                                            (0, preact_mjs_1.h)("div", { class: "photo-grid" },
                                                this.state.photos.map((photo, i) => (0, preact_mjs_1.h)("div", { class: "photo-preview", key: photo.id },
                                                    (0, preact_mjs_1.h)("img", { src: photo.url, alt: `Foto de carga ${i + 1}` }),
                                                    (0, preact_mjs_1.h)("button", { type: "button", "aria-label": `Quitar foto ${i + 1}`, onClick: () => this.removePhoto(photo.id) },
                                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close", size: 16 })
                                                    )
                                                )),
                                                this.state.photos.length < 3 && (
                                                    (0, preact_mjs_1.h)("label", { class: "photo-add" },
                                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "image", size: 27 }),
                                                        (0, preact_mjs_1.h)("span", null, busy ? 'Preparando…' : 'Agregar fotos'),
                                                        (0, preact_mjs_1.h)("input", {
                                                            type: "file",
                                                            accept: "image/jpeg,image/png,image/webp",
                                                            multiple: true,
                                                            disabled: busy,
                                                            onChange: (ev) => void this.addPhotos(ev),
                                                            "aria-label": "Agregar fotos de la carga"
                                                        })
                                                    )
                                                )
                                            ),
                                            (0, preact_mjs_1.h)("small", { class: "field-hint" },
                                                "Se optimizan y guardan de forma privada. No adjuntes documentos ni datos personales."
                                            )
                                        )
                                    )
                                ),
                                p.kind === 'passengers' && (
                                    (0, preact_mjs_1.h)("div", null,
                                        (0, preact_mjs_1.h)("div", { class: "form-row" },
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "passengers", label: "Cantidad de pasajeros", error: e.passengers },
                                                (0, preact_mjs_1.h)("input", {
                                                    id: "passengers",
                                                    type: "number",
                                                    inputMode: "numeric",
                                                    min: 1,
                                                    max: 60,
                                                    value: p.details.passengers,
                                                    onInput: (ev) => this.detailDraft({ passengers: Number(value(ev)) })
                                                })
                                            ),
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "luggage", label: "Equipaje", error: e.luggage },
                                                (0, preact_mjs_1.h)("select", {
                                                    id: "luggage",
                                                    value: p.details.luggage,
                                                    onChange: (ev) => this.detailDraft({ luggage: value(ev) })
                                                }, ['Sin equipaje', 'Mochilas / bolsos', 'Valijas', 'Equipaje especial'].map(t => (0, preact_mjs_1.h)("option", { key: t, value: t }, t)))
                                            )
                                        ),
                                        (0, preact_mjs_1.h)("div", { class: "segmented" },
                                            (0, preact_mjs_1.h)("button", {
                                                type: "button",
                                                class: !p.details.round_trip ? 'selected' : '',
                                                "aria-pressed": !p.details.round_trip,
                                                onClick: () => this.detailDraft({ round_trip: false, return_at: null })
                                            }, "S\u00F3lo ida"),
                                            (0, preact_mjs_1.h)("button", {
                                                type: "button",
                                                class: p.details.round_trip ? 'selected' : '',
                                                "aria-pressed": p.details.round_trip,
                                                onClick: () => this.detailDraft({ round_trip: true })
                                            }, "Ida y vuelta")
                                        ),
                                        p.details.round_trip && (
                                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "return_at", label: "Fecha y horario de regreso", error: e.return_at, hint: "Horario de Argentina (UTC\u22123). El regreso se coordina en la misma solicitud." },
                                                (0, preact_mjs_1.h)("input", {
                                                    id: "return_at",
                                                    type: "datetime-local",
                                                    value: toArgInput(p.details.return_at),
                                                    onInput: (ev) => this.detailDraft({ return_at: fromArgInput(value(ev)) })
                                                })
                                            )
                                        )
                                    )
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "notes", label: "Observaciones adicionales (opcional)", error: e.notes },
                                    (0, preact_mjs_1.h)("textarea", {
                                        id: "notes",
                                        rows: 3,
                                        maxLength: 1500,
                                        value: p.details.notes,
                                        onInput: (ev) => this.detailDraft({ notes: value(ev) }),
                                        placeholder: "Acceso al lugar, escaleras, referencias o algo que debamos saber."
                                    })
                                )
                            )
                        ),
                        step === 4 && (
                            (0, preact_mjs_1.h)("div", { class: "form-fields" },
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "name", label: "Tu nombre", error: e.name },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "name",
                                        autoComplete: "name",
                                        maxLength: 100,
                                        value: p.contact.name,
                                        onInput: (ev) => this.contactDraft({ name: value(ev) }),
                                        placeholder: "Nombre y apellido"
                                    })
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "phone", label: "Tel\u00E9fono con c\u00F3digo de pa\u00EDs", error: e.phone, hint: "Argentina: +54 9, código de área y número, sin 0 ni 15." },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "phone",
                                        type: "tel",
                                        autoComplete: "tel",
                                        maxLength: 30,
                                        placeholder: "+54 9 299 123 4567",
                                        value: p.contact.phone,
                                        onInput: (ev) => this.contactDraft({ phone: value(ev) })
                                    })
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "whatsapp", label: "WhatsApp diferente (opcional)", error: e.whatsapp, hint: "Dejalo vacío para usar el mismo teléfono." },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "whatsapp",
                                        type: "tel",
                                        autoComplete: "off",
                                        maxLength: 30,
                                        value: p.contact.whatsapp,
                                        onInput: (ev) => this.contactDraft({ whatsapp: value(ev) })
                                    })
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "email", label: "Correo electr\u00F3nico (opcional)", error: e.email },
                                    (0, preact_mjs_1.h)("input", {
                                        id: "email",
                                        type: "email",
                                        autoComplete: "email",
                                        maxLength: 254,
                                        value: p.contact.email,
                                        onInput: (ev) => this.contactDraft({ email: value(ev) })
                                    })
                                ),
                                (0, preact_mjs_1.h)("label", { class: "check-label consent" },
                                    (0, preact_mjs_1.h)("input", {
                                        type: "checkbox",
                                        id: "consent",
                                        checked: p.contact.consent,
                                        onChange: (ev) => this.contactDraft({ consent: checked(ev) })
                                    }),
                                    (0, preact_mjs_1.h)("span", null,
                                        "Autorizo el uso de estos datos para recibir una cotizaci\u00F3n y coordinar esta solicitud. ",
                                        (0, preact_mjs_1.h)("a", { href: "#/privacidad", target: "_blank", rel: "noopener noreferrer" }, "C\u00F3mo se usan mis datos")
                                    )
                                ),
                                e.consent && (0, preact_mjs_1.h)("span", { class: "field-message", role: "alert" }, e.consent),
                                (0, preact_mjs_1.h)("div", { class: "honeypot", "aria-hidden": "true" },
                                    (0, preact_mjs_1.h)("label", null, "Dej\u00E1 este campo vac\u00EDo",
                                        (0, preact_mjs_1.h)("input", {
                                            tabIndex: -1,
                                            autoComplete: "off",
                                            name: "website",
                                            value: this.state.website,
                                            onInput: (ev) => this.set({ website: value(ev) })
                                        })
                                    )
                                )
                            )
                        ),
                        step === 5 && (
                            (0, preact_mjs_1.h)("div", { class: "review" },
                                (0, preact_mjs_1.h)("div", { class: "review-service" },
                                    (0, preact_mjs_1.h)("span", { class: "choice-icon" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: serviceIcon[p.kind], size: 26 })
                                    ),
                                    (0, preact_mjs_1.h)("div", null,
                                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "SERVICIO SOLICITADO"),
                                        (0, preact_mjs_1.h)("h3", null, domain_js_1.serviceLabels[p.kind])
                                    ),
                                    (0, preact_mjs_1.h)("button", { class: "text-link", type: "button", onClick: () => this.set({ step: 0 }) }, "Cambiar")
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.RouteCard, { origin: p.origin, destination: p.destination, scheduledAt: p.scheduled_at }),
                                (0, preact_mjs_1.h)("div", { class: "review-row" },
                                    (0, preact_mjs_1.h)("div", null,
                                        (0, preact_mjs_1.h)("strong", null, p.kind === 'passengers' ? `${p.details.passengers} pasajeros · ${p.details.luggage}` : p.details.description),
                                        (0, preact_mjs_1.h)("p", null, p.kind === 'freight' ? `${p.details.quantity} bultos · Carga ${p.details.cargo_size.toLowerCase()}${p.details.needs_help ? ` · Ayuda de ${p.details.helpers} persona(s)` : ''}` : p.kind === 'passengers' ? p.details.round_trip ? `Regreso: ${(0, domain_js_1.dateText)(p.details.return_at)}` : 'Sólo ida' : ''),
                                        p.details.notes && (0, preact_mjs_1.h)("p", null, p.details.notes),
                                        this.state.photos.length > 0 && p.kind === 'freight' && (0, preact_mjs_1.h)("small", null, this.state.photos.length, " foto(s) para adjuntar")
                                    ),
                                    (0, preact_mjs_1.h)("button", { class: "text-link", type: "button", onClick: () => this.set({ step: 3 }) }, "Editar")
                                ),
                                (0, preact_mjs_1.h)("div", { class: "review-row" },
                                    (0, preact_mjs_1.h)("div", null,
                                        (0, preact_mjs_1.h)("strong", null, p.contact.name),
                                        (0, preact_mjs_1.h)("p", null, p.contact.phone),
                                        p.contact.email && (0, preact_mjs_1.h)("p", null, p.contact.email)
                                    ),
                                    (0, preact_mjs_1.h)("button", { class: "text-link", type: "button", onClick: () => this.set({ step: 4 }) }, "Editar")
                                ),
                                api_js_1.IS_PREVIEW && (
                                    (0, preact_mjs_1.h)("p", { class: "demo-review-note" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info", size: 16 }),
                                        "Esta prueba se guarda en este navegador. No genera un servicio real ni realiza cobros."
                                    )
                                ),
                                (0, preact_mjs_1.h)(ui_js_1.Notice, null,
                                    "El importe y las condiciones se definen después de revisar tu solicitud. No hay cobros automáticos."
                                )
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "wizard-actions" },
                            step > 0 && (
                                (0, preact_mjs_1.h)("button", {
                                    class: "button button-light",
                                    type: "button",
                                    disabled: busy,
                                    onClick: () => this.stepBack()
                                },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 18 }),
                                    "Atr\u00E1s"
                                )
                            ),
                            (0, preact_mjs_1.h)("button", {
                                class: "button button-primary",
                                type: "submit",
                                disabled: busy
                            },
                                busy ? (0, preact_mjs_1.h)("span", { class: "spinner small" }) : null,
                                busy ? 'Guardando solicitud…' : step === 5 ? 'Enviar solicitud' : 'Continuar',
                                !busy && (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 19 })
                            )
                        )
                    ),
                    (0, preact_mjs_1.h)("div", { class: "form-footnote" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 14 }),
                        this.state.saved ? 'Borrador conservado en esta pestaña.' : 'La solicitud se guarda cuando confirmás el envío.'
                    )
                ),
                (0, preact_mjs_1.h)("aside", { class: "wizard-aside" },
                    (0, preact_mjs_1.h)("div", { class: "sticky-card" },
                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "AS\u00CD VA TU SOLICITUD"),
                        (0, preact_mjs_1.h)("h3", null, domain_js_1.serviceLabels[p.kind]),
                        (0, preact_mjs_1.h)(ui_js_1.RouteCard, { origin: p.origin, destination: p.destination, scheduledAt: p.scheduled_at, compact: true }),
                        step > 1 && h('button', { type: 'button', class: 'text-link edit-route', onClick: () => { this.set({ step: 1, errors: {} }); this.stash(this.state.draft, 1); this.focusHeading(); } }, h(Icon, { name: 'edit', size: 14 }), 'Editar recorrido'),
                        (0, preact_mjs_1.h)("div", { class: "aside-note" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info" }),
                            (0, preact_mjs_1.h)("p", null, "Vos compartís lo que necesitás. El prestador revisa la solicitud y prepara una cotización.")
                        ),
                        (0, preact_mjs_1.h)("span", { class: "quote-pending" },
                            "Cotización antes de confirmar",
                            (0, preact_mjs_1.h)("span", null, "Sin cargos automáticos")
                        )
                    )
                )
            )
        );
    }

    simpleWizard() {
        const { step, draft: p, errors: e, busy } = this.state;
        const cargoChoices = ['Cajas', 'Muebles', 'Electrodomésticos', 'Mercadería'];
        const cargoChoice = cargoChoices.includes(p.details.description) ? p.details.description : (p.details.description ? 'Otro' : '');
        const chooseCargo = (description) => {
            if (description === 'Otro') {
                this.detailDraft({ description: '' });
                this.set({ showMoreDetails: true });
            }
            else
                this.detailDraft({ description });
        };
        const titles = ['¿Qué necesitás?', '¿Cuándo y qué llevás?', '¿Cómo te contactamos?'];
        const summaryWhen = p.when === 'scheduled' ? (0, domain_js_1.dateText)(p.scheduled_at) : 'Lo antes posible';

        return h('main', { id: 'main', class: 'container wizard-main simple-wizard', 'data-step': step },
            h('div', { class: 'wizard-top' },
                h('a', { href: '#/', class: 'text-link' }, h(Icon, { name: 'back', size: 17 }), 'Volver'),
                h('span', { class: 'muted' }, `Paso ${step + 1} de 3`)),
            h('ol', { class: 'stepper simple-stepper', 'aria-label': 'Pasos de la solicitud' },
                steps.map((name, index) => h('li', { class: index === step ? 'current' : index < step ? 'done' : '', key: name, 'aria-current': index === step ? 'step' : undefined },
                    h('button', { type: 'button', disabled: index >= step || busy, onClick: () => { this.set({ step: index, errors: {} }); this.stash(this.state.draft, index); this.focusHeading(); }, 'aria-label': index < step ? `Volver al paso ${index + 1}: ${name}` : `Paso ${index + 1}: ${name}` },
                        h('span', null, index < step ? h(Icon, { name: 'check', size: 14 }) : index + 1), h('b', null, name))))),
            h('section', { class: 'wizard-form simple-wizard-form', 'data-step': step },
                h('h1', { tabIndex: -1 }, titles[step]),
                this.state.flash && h(ui_js_1.Notice, { type: this.state.flash.type }, this.state.flash.text),
                h('form', { onSubmit: event => this.stepNext(event), noValidate: true, 'aria-busy': busy },
                    step === 0 && h('div', { class: 'form-fields' },
                        h('div', { class: 'service-choices simple-service-choices' },
                            [['freight', 'Flete / carga'], ['passengers', 'Pasajeros'], ['special', 'Otro traslado']].map(([kind, label]) => h('button', {
                                type: 'button', class: `service-choice${p.kind === kind ? ' selected' : ''}`, 'aria-pressed': p.kind === kind,
                                onClick: () => this.draft({ kind }), key: kind
                            }, h(Icon, { name: serviceIcon[kind], size: 24 }), h('strong', null, label)))),
                        h(ui_js_1.Field, { id: 'origin', label: 'Origen', error: e.origin },
                            h('input', { id: 'origin', name: 'origin', autoComplete: 'street-address', enterKeyHint: 'next', maxLength: 240, value: p.origin, placeholder: '¿Desde dónde?', onInput: event => this.draft({ origin: value(event) }), 'aria-invalid': Boolean(e.origin) })),
                        h(ui_js_1.Field, { id: 'destination', label: 'Destino', error: e.destination },
                            h('input', { id: 'destination', name: 'destination', enterKeyHint: 'go', maxLength: 240, value: p.destination, placeholder: '¿Hasta dónde?', onInput: event => this.draft({ destination: value(event) }), 'aria-invalid': Boolean(e.destination) }))),
                    step === 1 && h('div', { class: 'form-fields' },
                        h('div', { class: 'segmented large-segments', 'aria-label': 'Cuándo necesitás el servicio' },
                            h('button', { type: 'button', 'aria-pressed': p.when === 'asap', class: p.when === 'asap' ? 'selected' : '', onClick: () => this.draft({ when: 'asap', scheduled_at: null }) }, 'Lo antes posible'),
                            h('button', { type: 'button', 'aria-pressed': p.when === 'scheduled', class: p.when === 'scheduled' ? 'selected' : '', onClick: () => this.draft({ when: 'scheduled' }) }, 'Programar')),
                        p.when === 'scheduled' && h(ui_js_1.Field, { id: 'scheduled_at', label: 'Fecha y hora', error: e.scheduled_at },
                            h('input', { id: 'scheduled_at', type: 'datetime-local', value: toArgInput(p.scheduled_at), onInput: event => this.draft({ scheduled_at: fromArgInput(value(event)) }) })),
                        p.kind === 'freight' && h('div', { class: 'request-details' },
                            h('h2', null, '¿Qué llevás?'),
                            h('div', { class: 'choice-chips cargo-chips' }, [...cargoChoices, 'Otro'].map(item => h('button', { type: 'button', class: cargoChoice === item ? 'selected' : '', 'aria-pressed': cargoChoice === item, onClick: () => chooseCargo(item), key: item }, item))),
                            (cargoChoice === 'Otro' || (!cargoChoice && e.description)) && h(ui_js_1.Field, { id: 'description', label: 'Contanos qué llevás', error: e.description },
                                h('textarea', { id: 'description', rows: 2, maxLength: 1500, value: p.details.description, onInput: event => this.detailDraft({ description: value(event) }), placeholder: 'Por ejemplo: 4 cajas y un mueble' })),
                            h(ui_js_1.Field, { id: 'quantity', label: 'Cantidad aproximada (opcional)', error: e.quantity },
                                h('input', { id: 'quantity', type: 'number', inputMode: 'numeric', min: 1, max: 500, value: p.details.quantity, onInput: event => this.detailDraft({ quantity: Math.max(1, Number(value(event)) || 1) }) })),
                            h('label', { class: 'check-label large-check' }, h('input', { type: 'checkbox', checked: p.details.needs_help, onChange: event => this.detailDraft({ needs_help: checked(event) }) }), h('span', null, 'Necesito ayuda para cargar')),
                            h('button', { class: 'text-link disclosure-button', type: 'button', 'aria-expanded': this.state.showMoreDetails, onClick: () => this.set({ showMoreDetails: !this.state.showMoreDetails }) }, this.state.showMoreDetails ? 'Ocultar detalles' : 'Agregar más detalles'),
                            this.state.showMoreDetails && h('div', { class: 'optional-details' },
                                h(ui_js_1.Field, { id: 'cargo_size', label: 'Tamaño aproximado', error: e.cargo_size },
                                    h('select', { id: 'cargo_size', value: p.details.cargo_size, onChange: event => this.detailDraft({ cargo_size: value(event) }) }, ['Pequeña', 'Mediana', 'Grande', 'No sé'].map(item => h('option', { value: item, key: item }, item)))),
                                p.details.needs_help && h(ui_js_1.Field, { id: 'helpers', label: 'Personas para ayudar', error: e.helpers },
                                    h('input', { id: 'helpers', type: 'number', inputMode: 'numeric', min: 1, max: 10, value: p.details.helpers, onInput: event => this.detailDraft({ helpers: Math.max(1, Number(value(event)) || 1) }) })),
                                h(ui_js_1.Field, { id: 'notes', label: 'Observaciones (opcional)', error: e.notes },
                                    h('textarea', { id: 'notes', rows: 3, maxLength: 1500, value: p.details.notes, onInput: event => this.detailDraft({ notes: value(event) }), placeholder: 'Medidas, acceso u otro dato útil' })),
                                h('div', { class: 'photo-section' }, h('strong', null, 'Fotos (opcional)'),
                                    h('div', { class: 'photo-grid' },
                                        this.state.photos.map((photo, index) => h('div', { class: 'photo-preview', key: photo.id }, h('img', { src: photo.url, alt: `Foto ${index + 1}` }), h('button', { type: 'button', 'aria-label': `Quitar foto ${index + 1}`, onClick: () => this.removePhoto(photo.id) }, h(Icon, { name: 'close', size: 16 })))),
                                        this.state.photos.length < 3 && h('label', { class: 'photo-add' }, h(Icon, { name: 'image', size: 25 }), h('span', null, 'Agregar fotos'), h('input', { type: 'file', accept: 'image/jpeg,image/png,image/webp', multiple: true, disabled: busy, onChange: event => void this.addPhotos(event), 'aria-label': 'Agregar fotos' }))))))),
                        p.kind === 'passengers' && h('div', { class: 'request-details' },
                            h('h2', null, 'Pasajeros'),
                            h('div', { class: 'choice-chips four-chips' }, [1, 2, 3, 4].map(number => h('button', { type: 'button', class: p.details.passengers === number ? 'selected' : '', 'aria-pressed': p.details.passengers === number, onClick: () => this.detailDraft({ passengers: number }), key: number }, number === 4 ? '4+' : String(number)))),
                            h('h2', null, 'Equipaje'),
                            h('div', { class: 'choice-chips' }, ['Sin equipaje', 'Poco', 'Mucho'].map(item => h('button', { type: 'button', class: p.details.luggage === item ? 'selected' : '', 'aria-pressed': p.details.luggage === item, onClick: () => this.detailDraft({ luggage: item }), key: item }, item))),
                            h('div', { class: 'segmented large-segments' },
                                h('button', { type: 'button', class: !p.details.round_trip ? 'selected' : '', 'aria-pressed': !p.details.round_trip, onClick: () => this.detailDraft({ round_trip: false, return_at: null }) }, 'Ida'),
                                h('button', { type: 'button', class: p.details.round_trip ? 'selected' : '', 'aria-pressed': p.details.round_trip, onClick: () => this.detailDraft({ round_trip: true }) }, 'Ida y vuelta')),
                            p.details.round_trip && h(ui_js_1.Field, { id: 'return_at', label: 'Regreso', error: e.return_at }, h('input', { id: 'return_at', type: 'datetime-local', value: toArgInput(p.details.return_at), onInput: event => this.detailDraft({ return_at: fromArgInput(value(event)) }) }))),
                        p.kind === 'special' && h(ui_js_1.Field, { id: 'description', label: 'Contanos qué necesitás', error: e.description },
                            h('textarea', { id: 'description', rows: 4, maxLength: 1500, value: p.details.description, onInput: event => this.detailDraft({ description: value(event) }), placeholder: 'Escribí lo más importante' }))),
                    step === 2 && h('div', { class: 'form-fields contact-step' },
                        h(ui_js_1.Field, { id: 'name', label: 'Nombre', error: e.name }, h('input', { id: 'name', autoComplete: 'name', value: p.contact.name, onInput: event => this.contactDraft({ name: value(event) }), 'aria-invalid': Boolean(e.name) })),
                        h(ui_js_1.Field, { id: 'phone', label: 'Teléfono / WhatsApp', error: e.phone }, h('input', { id: 'phone', type: 'tel', inputMode: 'tel', autoComplete: 'tel', value: p.contact.phone, placeholder: '+54 9…', onInput: event => this.contactDraft({ phone: value(event), whatsapp: value(event) }), 'aria-invalid': Boolean(e.phone) })),
                        h('button', { type: 'button', class: 'text-link disclosure-button', 'aria-expanded': this.state.showEmail, onClick: () => this.set({ showEmail: !this.state.showEmail }) }, this.state.showEmail ? 'Quitar email' : 'Agregar email'),
                        this.state.showEmail && h(ui_js_1.Field, { id: 'email', label: 'Email (opcional)', error: e.email }, h('input', { id: 'email', type: 'email', autoComplete: 'email', value: p.contact.email, onInput: event => this.contactDraft({ email: value(event) }) })),
                        h('label', { class: 'check-label consent-simple' }, h('input', { id: 'consent', type: 'checkbox', checked: p.contact.consent, onChange: event => this.contactDraft({ consent: checked(event) }) }), h('span', null, 'Acepto que me contacten por esta solicitud.')),
                        e.consent && h('p', { class: 'error-text', role: 'alert' }, e.consent),
                        h('section', { class: 'short-summary', 'aria-label': 'Resumen de la solicitud' },
                            h('strong', null, domain_js_1.serviceLabels[p.kind]),
                            h('span', null, `${p.origin} → ${p.destination}`),
                            h('span', null, summaryWhen),
                            h('span', null, p.contact.phone || 'Teléfono pendiente'))),
                    h('div', { class: 'wizard-actions' },
                        step > 0 && h('button', { class: 'button button-light', type: 'button', disabled: busy, onClick: () => this.stepBack() }, 'Volver'),
                        h('button', { class: 'button button-primary', type: 'button', disabled: busy, onClick: event => this.stepNext(event) }, busy ? 'Enviando…' : step === 2 ? 'Enviar solicitud' : 'Continuar', !busy && h(Icon, { name: 'arrow', size: 19 })))));
    }

    trackingPage() {
        return (0, preact_mjs_1.h)(tracking_js_1.TrackingView, {
            tracking: this.state.tracking,
            error: this.state.trackingError,
            success: this.state.path.startsWith('/recibida/'),
            business: this.state.runtime?.business ?? domain_js_1.defaultConfig,
            preview: api_js_1.IS_PREVIEW,
            busy: this.state.busy,
            lookup: this.state.lookup,
            pendingPhotos: this.state.photos.filter(p => !p.uploaded).length,
            onCopy: () => void this.copyLink(),
            onRefresh: () => void this.refreshTracking(),
            refreshing: this.state.refreshing,
            onManage: () => void this.previewRequest(),
            onRetryPhotos: () => void this.retryPhotos(),
            onAccept: (btn) => {
                const t = this.state.tracking;
                if (t && t.quote_cents !== null && t.request_version !== undefined) {
                    this.restoreFocus = btn || document.querySelector('.quote-accept-actions button') || document.activeElement;
                    this.set({ acceptance: { version: t.request_version, quote: t.quote_cents } });
                }
            }
        });
    }

    lastTrackingToken() {
        try {
            const token = sessionStorage.getItem('flete-last-token.v2');
            return token && /^[a-f0-9]{64}$/.test(token) ? token : null;
        }
        catch {
            return null;
        }
    }

    lookupPage() {
        const last = this.lastTrackingToken();
        return (0, preact_mjs_1.h)("main", { id: "main", class: "container lookup-main" },
            (0, preact_mjs_1.h)("div", { class: "panel lookup-card" },
                (0, preact_mjs_1.h)("span", { class: "empty-icon" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route", size: 32 })
                ),
                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "VOLV\u00C9 A TU SOLICITUD"),
                (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "\u00BFC\u00F3mo va tu traslado?"),
                (0, preact_mjs_1.h)("p", null, "Peg\u00E1 el enlace privado que guardaste al enviar la solicitud."),
                last && (
                    (0, preact_mjs_1.h)("a", { class: "button button-light last-request", href: `#/seguimiento/${last}` },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "clock", size: 17 }),
                        "Abrir mi \u00FAltima solicitud"
                    )
                ),
                (0, preact_mjs_1.h)("form", { onSubmit: (e) => this.lookup(e) },
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "tracking-link", label: "Enlace privado de seguimiento", hint: "El código FL es una referencia pública, no una clave de acceso." },
                        (0, preact_mjs_1.h)("input", {
                            id: "tracking-link",
                            value: this.state.lookup,
                            onInput: (e) => this.set({ lookup: value(e) }),
                            autoComplete: "off",
                            spellCheck: false,
                            placeholder: "Pegá acá el enlace privado completo"
                        })
                    ),
                    (0, preact_mjs_1.h)("button", { class: "button button-primary", type: "submit" },
                        "Consultar mi solicitud",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow" })
                    )
                ),
                (0, preact_mjs_1.h)("div", { class: "lookup-help" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 19 }),
                    (0, preact_mjs_1.h)("p", null, "Por privacidad no se puede buscar por teléfono ni por código corto. El enlace privado es tu llave de acceso directo.")
                ),
                (0, preact_mjs_1.h)("a", { href: "#/solicitar", class: "text-link" },
                    "Quiero solicitar un servicio nuevo",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 17 })
                )
            )
        );
    }

    privacy() {
        return (0, preact_mjs_1.h)("main", { id: "main", class: "container policy-main" },
            (0, preact_mjs_1.h)("a", { class: "text-link back-link", href: "#/" },
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 17 }),
                "Volver al inicio"
            ),
            (0, preact_mjs_1.h)("article", { class: "panel" },
                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "INFORMACI\u00D3N SOBRE ESTA DEMO"),
                (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Tus datos, con un prop\u00F3sito."),
                (0, preact_mjs_1.h)("p", null, "Esta versión es una demostración interactiva de una plataforma de transporte. No despacha viajes reales ni realiza cobros. Podés probarla con datos ficticios."),
                (0, preact_mjs_1.h)("h2", null, "Qué se guarda"),
                (0, preact_mjs_1.h)("p", null, "La solicitud contiene recorrido, fecha, características del traslado y datos de contacto informados. Las fotos de carga son opcionales y privadas. No incluyas documentos personales ni datos bancarios."),
                (0, preact_mjs_1.h)("h2", null, "Quién puede verlo"),
                (0, preact_mjs_1.h)("p", null, api_js_1.IS_PREVIEW ? "En esta presentación el panel es de libre acceso local sin cuenta, con el fin de recorrer cliente y dueño desde el mismo navegador." : "El panel del operador requiere autenticación. El enlace privado de seguimiento permite consultar recorrido, estado y cotización; no muestra teléfono, notas internas ni fotos a terceros."),
                (0, preact_mjs_1.h)("h2", null, "Dónde se guarda en este entorno"),
                (0, preact_mjs_1.h)("p", null, api_js_1.IS_PREVIEW ? 'Esta demo guarda las solicitudes y fotos en IndexedDB únicamente en este navegador. No se transmiten a servidores externos ni a otros dispositivos.' : this.state.runtime?.mode === 'local' ? 'Guarda en SQLite local del equipo que ejecuta la demo.' : 'El almacenamiento y la autenticación quedan a definir.'),
                (0, preact_mjs_1.h)("h2", null, "Servicios externos"),
                (0, preact_mjs_1.h)("p", null, "WhatsApp y Google Maps sólo se abren si tocás sus enlaces explícitos. No hay analítica de terceros, cobros automáticos ni geolocalización en segundo plano."),
                (0, preact_mjs_1.h)(ui_js_1.Notice, null, "La plataforma definitiva se ajustará a la normativa comercial, política de privacidad y condiciones que el transportista defina para su negocio.")
            )
        );
    }

    async login(e) {
        e.preventDefault();
        this.set({ busy: true, flash: null });
        try {
            const { user } = await api_js_1.api.login(this.state.loginEmail, this.state.loginPassword);
            this.set({ user, checkedSession: true, loginPassword: '' });
            this.go('/admin');
        }
        catch (err) {
            this.fail(err);
        }
        finally {
            this.set({ busy: false });
        }
    }

    async logout() {
        this.set({ busy: true });
        try {
            await api_js_1.api.logout();
            this.set({ user: null, dashboard: null, detail: null, checkedSession: true });
            if (api_js_1.IS_PREVIEW)
                this.set({ checkedSession: false });
            this.go(api_js_1.IS_PREVIEW ? '/' : '/admin');
        }
        catch (err) {
            this.fail(err);
        }
        finally {
            this.set({ busy: false });
        }
    }

    loginPage() {
        return (0, preact_mjs_1.h)("main", { id: "main", class: "login-main" },
            (0, preact_mjs_1.h)("div", { class: "login-story" },
                (0, preact_mjs_1.h)(ui_js_1.Brand, { name: this.state.runtime?.business.name }),
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "TU NEGOCIO, EN ORDEN"),
                    (0, preact_mjs_1.h)("h2", null, "De la primera consulta", (0, preact_mjs_1.h)("br", null), "al \u00FAltimo kil\u00F3metro."),
                    (0, preact_mjs_1.h)("p", null, "Solicitudes claras. Cotizaciones a mano.", (0, preact_mjs_1.h)("br", null), "Un lugar para coordinar el trabajo."),
                    (0, preact_mjs_1.h)("div", { class: "login-story-card" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "list", size: 27 }),
                        (0, preact_mjs_1.h)("div", null,
                            (0, preact_mjs_1.h)("strong", null, "Todo empieza con una solicitud."),
                            (0, preact_mjs_1.h)("span", null, "Revisá, cotizá y coordiná desde el celular o la computadora.")
                        )
                    )
                ),
                (0, preact_mjs_1.h)("span", { class: "login-bottom" }, "Una plataforma que se adapta a tu forma de trabajar.")
            ),
            (0, preact_mjs_1.h)("div", { class: "login-form-wrap" },
                (0, preact_mjs_1.h)("a", { class: "text-link", href: "#/" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 18 }),
                    "Ir al sitio"
                ),
                (0, preact_mjs_1.h)("section", { class: "login-form" },
                    (0, preact_mjs_1.h)("span", { class: "login-lock" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 25 })
                    ),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Acceso al panel."),
                    (0, preact_mjs_1.h)("p", null, "Ingres\u00E1 con tu cuenta de administraci\u00F3n."),
                    this.state.flash && (0, preact_mjs_1.h)(ui_js_1.Notice, { type: this.state.flash.type }, this.state.flash.text),
                    (0, preact_mjs_1.h)("form", { onSubmit: (e) => void this.login(e) },
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "login-email", label: "Correo electr\u00F3nico" },
                            (0, preact_mjs_1.h)("input", {
                                id: "login-email",
                                type: "email",
                                autoComplete: "username",
                                required: true,
                                value: this.state.loginEmail,
                                onInput: (e) => this.set({ loginEmail: value(e) })
                            })
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "login-password", label: "Contrase\u00F1a" },
                            (0, preact_mjs_1.h)("input", {
                                id: "login-password",
                                type: "password",
                                autoComplete: "current-password",
                                required: true,
                                value: this.state.loginPassword,
                                onInput: (e) => this.set({ loginPassword: value(e) })
                            })
                        ),
                        (0, preact_mjs_1.h)("button", { class: "button button-primary full", type: "submit", disabled: this.state.busy },
                            this.state.busy ? 'Verificando acceso…' : 'Ingresar al panel',
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow" })
                        )
                    ),
                    (0, preact_mjs_1.h)("div", { class: "local-access-note" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "shield", size: 17 }),
                        (0, preact_mjs_1.h)("p", null, "Modo presentación: ingresá directamente para recorrer las solicitudes cargadas.")
                    )
                )
            )
        );
    }

    async mutate(mutation) {
        const detail = this.state.detail;
        if (!detail || this.state.busy)
            return;
        this.set({ busy: true, flash: null });
        try {
            const result = await api_js_1.api.mutate(detail.request.id, detail.request.version, mutation);
            this.set({
                detail: result,
                quote: result.request.quote_cents === null ? '' : String(result.request.quote_cents / 100).replace('.', ','),
                note: '',
                cancellation: null,
                editing: null
            });
            this.notify(
                mutation.action === 'quote' ? (api_js_1.IS_PREVIEW ? 'Cotización guardada. Abrí el seguimiento para probar cómo la acepta el cliente.' : 'Cotización guardada. Prepará el mensaje para enviarla por WhatsApp.')
                    : mutation.action === 'note' ? 'Nota interna guardada. No es visible para el cliente.'
                    : 'Cambios guardados.',
                'success'
            );
            await this.loadDashboard(true);
        }
        catch (err) {
            this.fail(err);
            if (err instanceof Error && 'status' in err && err.status === 409)
                await this.loadDetail(detail.request.id, true);
        }
        finally {
            this.set({ busy: false });
        }
    }

    async saveQuote(e) {
        e.preventDefault();
        const cents = (0, domain_js_1.parseMoney)(this.state.quote);
        if (cents === null) {
            this.notify('Ingresá un importe positivo, sin puntos de miles. Ejemplo: 45000 o 45000,50.', 'error');
            return;
        }
        await this.mutate({ action: 'quote', quote_cents: cents });
    }

    async saveVehicle(e) {
        e.preventDefault();
        if (!this.state.vehicleEditor)
            return;
        this.set({ busy: true, flash: null });
        try {
            await api_js_1.api.vehicle(this.state.vehicleEditor);
            this.set({ vehicleEditor: null });
            await this.loadDashboard(true);
            this.notify('Vehículo guardado.', 'success');
        }
        catch (err) {
            this.fail(err);
        }
        finally {
            this.set({ busy: false });
        }
    }

    async saveSettings(e) {
        e.preventDefault();
        if (!this.state.settings)
            return;
        this.set({ busy: true, flash: null });
        try {
            const business = await api_js_1.api.business(this.state.settings);
            this.set({ settings: business, runtime: this.state.runtime ? { ...this.state.runtime, business } : null });
            await this.loadDashboard(true);
            this.notify('Datos del negocio actualizados.', 'success');
        }
        catch (err) {
            this.fail(err);
        }
        finally {
            this.set({ busy: false });
        }
    }

    filteredRequests() {
        const needle = this.state.search.toLocaleLowerCase('es').trim();
        return (this.state.dashboard?.requests ?? []).filter(r =>
            (!this.state.statusFilter || r.status === this.state.statusFilter) &&
            (!this.state.serviceFilter || r.payload.kind === this.state.serviceFilter) &&
            (!this.state.dateFilter || (0, domain_js_1.argentinaDay)(r.payload.scheduled_at ?? r.created_at) === this.state.dateFilter) &&
            (!this.state.customer || r.customer_id === this.state.customer) &&
            (!needle || `${r.code} ${r.payload.contact.name} ${r.payload.contact.phone} ${r.payload.origin} ${r.payload.destination}`.toLocaleLowerCase('es').includes(needle))
        );
    }

    requestRows(requests, compact = false) {
        if (!requests.length)
            return (0, preact_mjs_1.h)(ui_js_1.Empty, { icon: "list", title: "No hay solicitudes para mostrar", text: "Prob\u00E1 otros filtros o cre\u00E1 una solicitud desde el sitio." });

        return (0, preact_mjs_1.h)("div", { class: compact ? 'request-collection compact-collection' : 'request-collection' },
            (0, preact_mjs_1.h)("div", { class: "table-wrap" },
                (0, preact_mjs_1.h)("table", null,
                    (0, preact_mjs_1.h)("thead", null,
                        (0, preact_mjs_1.h)("tr", null,
                            (0, preact_mjs_1.h)("th", null, "Solicitud / cliente"),
                            (0, preact_mjs_1.h)("th", null, "Servicio / recorrido"),
                            (0, preact_mjs_1.h)("th", null, "Fecha solicitada"),
                            (0, preact_mjs_1.h)("th", null, "Estado"),
                            (0, preact_mjs_1.h)("th", null, "Importe"),
                            (0, preact_mjs_1.h)("th", null, (0, preact_mjs_1.h)("span", { class: "sr-only" }, "Abrir"))
                        )
                    ),
                    (0, preact_mjs_1.h)("tbody", null,
                        requests.map(r => (0, preact_mjs_1.h)("tr", { key: r.id },
                            (0, preact_mjs_1.h)("td", null,
                                (0, preact_mjs_1.h)("button", { class: "table-code", onClick: () => this.go(`/admin/solicitudes/${r.id}`) }, r.code),
                                (0, preact_mjs_1.h)("span", { class: "table-secondary" }, r.payload.contact.name),
                                !compact && (0, preact_mjs_1.h)("span", { class: "table-phone" }, r.payload.contact.phone)
                            ),
                            (0, preact_mjs_1.h)("td", null,
                                (0, preact_mjs_1.h)("span", { class: "table-service" },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: serviceIcon[r.payload.kind], size: 16 }),
                                    domain_js_1.serviceLabels[r.payload.kind]
                                ),
                                (0, preact_mjs_1.h)("span", { class: "table-route", title: `${r.payload.origin} → ${r.payload.destination}` },
                                    r.payload.origin,
                                    (0, preact_mjs_1.h)("span", null, " \u2192 ", r.payload.destination)
                                )
                            ),
                            (0, preact_mjs_1.h)("td", null,
                                (0, preact_mjs_1.h)("span", { class: "table-date" }, (0, domain_js_1.dateText)(r.payload.scheduled_at, true)),
                                null
                            ),
                            (0, preact_mjs_1.h)("td", null,
                                (0, preact_mjs_1.h)(ui_js_1.Badge, { status: r.status })
                            ),
                            (0, preact_mjs_1.h)("td", { class: "table-money" },
                                (0, domain_js_1.money)(r.quote_cents)
                            ),
                            (0, preact_mjs_1.h)("td", null,
                                (0, preact_mjs_1.h)("button", {
                                    class: "icon-button",
                                    "aria-label": `Abrir solicitud ${r.code}`,
                                    onClick: () => this.go(`/admin/solicitudes/${r.id}`)
                                },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "chevron", size: 19 })
                                )
                            )
                        ))
                    )
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "request-mobile-list" },
                requests.map(r => (0, preact_mjs_1.h)("button", {
                    class: "request-mobile-card",
                    onClick: () => this.go(`/admin/solicitudes/${r.id}`),
                    key: r.id
                },
                    (0, preact_mjs_1.h)("div", { class: "request-mobile-top" },
                        (0, preact_mjs_1.h)("span", null, r.code, null),
                        (0, preact_mjs_1.h)(ui_js_1.Badge, { status: r.status })
                    ),
                    (0, preact_mjs_1.h)("strong", null, r.payload.contact.name),
                    (0, preact_mjs_1.h)("div", { class: "request-mobile-route" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: serviceIcon[r.payload.kind], size: 20 }),
                        (0, preact_mjs_1.h)("div", null,
                            r.payload.origin,
                            (0, preact_mjs_1.h)("span", null, " \u2192 ", r.payload.destination)
                        )
                    ),
                    (0, preact_mjs_1.h)("div", { class: "request-mobile-bottom" },
                        (0, preact_mjs_1.h)("span", null,
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "calendar", size: 14 }),
                            (0, domain_js_1.dateText)(r.payload.scheduled_at, true)
                        ),
                        (0, preact_mjs_1.h)("strong", null, (0, domain_js_1.money)(r.quote_cents))
                    )
                ))
            )
        );
    }

    simpleOverview() {
        const requests = this.state.dashboard?.requests ?? [];
        const newRequests = requests.filter(request => ['new', 'reviewing'].includes(request.status) && request.quote_cents === null);
        const accepted = requests.filter(request => request.status === 'quoted' && request.quote_accepted_at);
        const active = requests.filter(request => ['confirmed', 'en_route', 'in_service'].includes(request.status));
        const priority = [...newRequests, ...accepted, ...active].filter((request, index, list) => list.findIndex(item => item.id === request.id) === index);
        return h('div', { class: 'simple-overview' },
            h('div', { class: 'page-heading' }, h('div', null, h('span', { class: 'eyebrow' }, 'HOY'), h('h1', { tabIndex: -1 }, '¿Qué tenés que atender?'))),
            h('div', { class: 'simple-owner-metrics' },
                [['Nuevas solicitudes', newRequests.length], ['Cotizaciones aceptadas', accepted.length], ['Servicios en curso', active.length]].map(([label, count]) => h('div', { class: 'metric', key: label }, h('strong', null, count), h('span', null, label)))),
            h('section', { class: 'panel simple-owner-list' },
                h('h2', null, 'Solicitudes'),
                priority.length ? priority.map(request => h('article', { class: 'simple-owner-row', key: request.id },
                    h('div', null, h('strong', null, request.payload.contact.name), h('span', null, `${request.payload.origin} → ${request.payload.destination}`), h(ui_js_1.Badge, { status: request.status })),
                    h('button', { class: 'button button-light', onClick: () => this.go(`/admin/solicitudes/${request.id}`) }, 'Ver'))) : h(ui_js_1.Empty, { icon: 'check', title: 'Todo al día', text: 'No hay solicitudes pendientes.' })));
    }

    overview() {
        const requests = this.state.dashboard?.requests ?? [];
        const today = (0, domain_js_1.argentinaDay)(new Date().toISOString());
        const unquoted = requests.filter(r => ['new', 'reviewing'].includes(r.status) && r.quote_cents === null);
        const accepted = requests.filter(r => r.status === 'quoted' && r.quote_accepted_at);
        const needsVehicle = requests.filter(r => r.status === 'confirmed' && !r.vehicle_id);
        const next = requests.filter(r => ['confirmed', 'en_route', 'in_service'].includes(r.status))
            .sort((a, b) => Date.parse(a.payload.scheduled_at ?? a.created_at) - Date.parse(b.payload.scheduled_at ?? b.created_at));
        const todayCount = requests.filter(r => !['completed', 'cancelled'].includes(r.status) &&
            (0, domain_js_1.argentinaDay)(r.payload.scheduled_at ?? r.created_at) === today).length;
        const activeCount = requests.filter(r => ['en_route', 'in_service'].includes(r.status)).length;
        const queue = unquoted.length ? unquoted : needsVehicle;
        const hasWork = unquoted.length || accepted.length || needsVehicle.length;
        const total = requests.filter(r => !['cancelled', 'new', 'reviewing'].includes(r.status))
            .reduce((n, r) => n + (r.quote_cents ?? 0), 0);
        return h('div', { class: 'operations-overview' },
            h('div', { class: 'page-heading' }, h('div', null,
                h('span', { class: 'eyebrow' }, 'TU OPERACIÓN, EN ORDEN'),
                h('h1', { tabIndex: -1 }, '¿Qué hay para resolver hoy?'),
                h('p', null, 'Revisá las solicitudes y decidí el próximo paso.')),
                h('a', { class: 'button button-dark', href: '#/solicitar' }, h(Icon, { name: 'plus', size: 18 }), 'Nueva solicitud')),
            h('div', { class: 'metrics-grid operational-metrics' }, [
                ['Por cotizar', unquoted.length, 'list', 'Recorridos por revisar', 'metric-urgent'],
                ['Esperan confirmación', accepted.length, 'check', 'El cliente aceptó el importe', 'metric-action'],
                ['Servicios de hoy', todayCount, 'calendar', 'Fecha solicitada · hora argentina', ''],
                ['En curso', activeCount, 'truck', 'En camino o realizando el servicio', ''],
            ].map(([label, count, icon, hint, cls]) => h('div', { key: label, class: `metric ${cls}` },
                h('span', null, label, h(Icon, { name: icon, size: 17 })), h('strong', null, count), h('small', null, hint)))),
            accepted.length > 0 && h('section', { class: 'accepted-queue panel urgent-action-panel' },
                h('div', null, h('span', { class: 'eyebrow' }, 'EL CLIENTE YA RESPONDIÓ'),
                    h('h2', null, `${accepted.length} ${accepted.length === 1 ? 'cotización aceptada' : 'cotizaciones aceptadas'}`),
                    h('p', null, 'Revisá disponibilidad y condiciones antes de confirmar el viaje.')),
                h('button', { class: 'button button-dark', onClick: () => this.go(`/admin/solicitudes/${accepted[0].id}`) }, 'Revisar aceptación', h(Icon, { name: 'arrow', size: 18 }))),
            h('div', { class: 'overview-grid' },
                h('section', { class: 'panel needs-attention' },
                    h('div', { class: 'panel-heading' }, h('h2', null, 'Requiere atención'), h('span', { class: 'count-pill' }, queue.length)),
                    h('p', { class: 'attention-summary' }, unquoted.length ? 'Estas solicitudes todavía no tienen precio.' : needsVehicle.length ? 'Falta asignar una unidad a estos servicios.' : hasWork ? 'Las cotizaciones aceptadas están listas para tu revisión.' : 'No hay solicitudes pendientes de respuesta.'),
                    queue.length > 0 ? h('div', { class: 'attention-list' }, queue.slice(0, 3).map(r =>
                        h('button', { class: 'attention-row', key: r.id, onClick: () => this.go(`/admin/solicitudes/${r.id}`) },
                            h(Icon, { name: serviceIcon[r.payload.kind], size: 19 }),
                            h('span', null, h('strong', null, r.payload.contact.name), h('small', null, `${r.code} · ${unquoted.length ? 'Preparar cotización' : 'Asignar vehículo'}`)),
                            h(Icon, { name: 'arrow', size: 17 })))) : h('div', { class: 'attention-clear' }, h(Icon, { name: 'check', size: 30 }), 'Todo revisado en esta bandeja.'),
                    h('a', { class: 'text-link', href: '#/admin/solicitudes' }, 'Abrir bandeja de solicitudes', h(Icon, { name: 'arrow', size: 16 }))),
                h('section', { class: 'panel agenda-panel' },
                    h('div', { class: 'panel-heading' }, h('h2', null, 'Próximos movimientos'), h('span', { class: 'count-pill' }, next.length)),
                    next.length ? next.slice(0, 3).map(r => h('button', { class: 'agenda-item', key: r.id, onClick: () => this.go(`/admin/solicitudes/${r.id}`) },
                        h('span', { class: 'agenda-icon' }, h(Icon, { name: serviceIcon[r.payload.kind], size: 18 })),
                        h('span', null, h('strong', null, r.payload.contact.name), h('small', null, (0, domain_js_1.dateText)(r.payload.scheduled_at)),
                            h('small', null, r.payload.origin, ' → ', r.payload.destination)), h(ui_js_1.Badge, { status: r.status }))) :
                        h('p', { class: 'muted' }, 'Los servicios confirmados y en curso van a aparecer acá.'))),
            h('section', { class: 'panel recent-panel' },
                h('div', { class: 'panel-heading' }, h('div', null, h('h2', null, 'Últimas solicitudes'), h('p', null, 'Recorrido, estado y cotización de un vistazo.')),
                    h('a', { href: '#/admin/solicitudes', class: 'text-link' }, 'Ver todas', h(Icon, { name: 'arrow', size: 16 }))),
                this.requestRows(requests.slice(0, 5), true)),
            h('div', { class: 'page-footnote' }, h('span', null, `${requests.length} solicitudes en este navegador`),
                h('span', null, 'Importes cotizados de ejemplo: ', (0, domain_js_1.money)(total), ' · no son cobros')));
    }

    requestsPage() {
        const rows = this.filteredRequests();
        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("div", { class: "page-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "CENTRO DE OPERACIONES"),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Solicitudes."),
                    (0, preact_mjs_1.h)("p", null, "Del primer contacto al servicio finalizado.")
                ),
                (0, preact_mjs_1.h)("span", { class: "count-label" }, rows.length, " resultado(s)")
            ),
            (0, preact_mjs_1.h)("section", { class: "panel requests-panel" },
                (0, preact_mjs_1.h)("div", { class: "filters" },
                    (0, preact_mjs_1.h)("div", { class: "search-field" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "search", size: 18 }),
                        (0, preact_mjs_1.h)("input", {
                            "aria-label": "Buscar solicitudes",
                            placeholder: "Nombre, c\u00F3digo, tel\u00E9fono o recorrido",
                            value: this.state.search,
                            onInput: (e) => this.set({ search: value(e) })
                        })
                    ),
                    (0, preact_mjs_1.h)("select", {
                        "aria-label": "Filtrar por estado",
                        value: this.state.statusFilter,
                        onChange: (e) => this.set({ statusFilter: value(e) })
                    },
                        (0, preact_mjs_1.h)("option", { value: "" }, "Todos los estados"),
                        domain_js_1.statuses.map(s => (0, preact_mjs_1.h)("option", { value: s, key: s }, domain_js_1.labels[s]))
                    ),
                    (0, preact_mjs_1.h)("select", {
                        "aria-label": "Filtrar por servicio",
                        value: this.state.serviceFilter,
                        onChange: (e) => this.set({ serviceFilter: value(e) })
                    },
                        (0, preact_mjs_1.h)("option", { value: "" }, "Todos los servicios"),
                        ['freight', 'passengers', 'special'].map(k => (0, preact_mjs_1.h)("option", { value: k, key: k }, domain_js_1.serviceLabels[k]))
                    ),
                    (0, preact_mjs_1.h)("input", {
                        type: "date",
                        "aria-label": "Filtrar por fecha solicitada",
                        value: this.state.dateFilter,
                        onChange: (e) => this.set({ dateFilter: value(e) })
                    })
                ),
                (this.state.search || this.state.statusFilter || this.state.serviceFilter || this.state.dateFilter || this.state.customer) && (
                    (0, preact_mjs_1.h)("div", { class: "active-filters" },
                        (0, preact_mjs_1.h)("span", null, this.state.customer ? 'Mostrando historial de un cliente.' : 'Filtros aplicados.'),
                        (0, preact_mjs_1.h)("button", {
                            class: "text-link",
                            onClick: () => this.set({ search: '', statusFilter: '', serviceFilter: '', dateFilter: '', customer: null })
                        },
                            "Limpiar filtros",
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close", size: 14 })
                        )
                    )
                ),
                this.requestRows(rows)
            )
        );
    }

    simpleRequestDetail() {
        const detail = this.state.detail;
        if (!detail)
            return h(ui_js_1.Loading, { label: 'Abriendo la solicitud…' });
        const r = detail.request;
        const p = r.payload;
        const terminal = ['completed', 'cancelled'].includes(r.status);
        const canQuote = ['new', 'reviewing', 'quoted'].includes(r.status);
        const vehicles = this.state.dashboard?.vehicles ?? [];
        const need = p.kind === 'passengers' ? `${p.details.passengers} pasajero(s) · ${p.details.luggage}` : p.details.description;
        return h('div', { class: 'simple-owner-detail' },
            h('a', { class: 'text-link back-link', href: '#/admin' }, h(Icon, { name: 'back', size: 17 }), 'Volver'),
            h('div', { class: 'page-heading detail-heading' }, h('div', null, h('h1', { tabIndex: -1 }, p.contact.name), h('p', null, r.code)), h(ui_js_1.Badge, { status: r.status })),
            r.quote_accepted_at && h('section', { class: 'operator-accepted' }, h(Icon, { name: 'check', size: 22 }), h('strong', null, 'El cliente aceptó la cotización.')),
            h('section', { class: 'panel owner-request-summary' },
                h('dl', null,
                    h('div', null, h('dt', null, 'Cliente'), h('dd', null, p.contact.name, ' · ', p.contact.phone)),
                    h('div', null, h('dt', null, 'Recorrido'), h('dd', null, `${p.origin} → ${p.destination}`)),
                    h('div', null, h('dt', null, 'Cuándo'), h('dd', null, (0, domain_js_1.dateText)(p.scheduled_at))),
                    h('div', null, h('dt', null, 'Qué necesita'), h('dd', null, need))),
                api_js_1.IS_PREVIEW && h('button', { class: 'text-link', onClick: () => void this.previewTracking(r.id) }, 'Ver seguimiento del cliente')),
            h('section', { class: 'panel quote-panel simple-quote-panel' },
                h('span', { class: 'eyebrow' }, 'COTIZAR'),
                r.quote_cents !== null && h('div', { class: 'quote-total' }, (0, domain_js_1.money)(r.quote_cents)),
                canQuote ? h('form', { onSubmit: event => void this.saveQuote(event) },
                    h(ui_js_1.Field, { id: 'quote-amount', label: 'Importe' }, h('div', { class: 'money-input large-money-input' }, h('span', null, '$'), h('input', { id: 'quote-amount', inputMode: 'decimal', value: this.state.quote, onInput: event => this.set({ quote: value(event) }), placeholder: '0' }))),
                    h('button', { class: 'button button-primary full', type: 'submit', disabled: this.state.busy }, this.state.busy ? 'Enviando…' : 'Enviar cotización')) : h('p', null, 'El importe ya no se puede cambiar.')),
            h('section', { class: 'panel simple-owner-control' },
                h('h2', null, 'Asignar vehículo'),
                h(ui_js_1.Field, { id: 'assign-vehicle', label: 'Vehículo' }, h('select', { id: 'assign-vehicle', value: r.vehicle_id ?? '', disabled: terminal || this.state.busy, onChange: event => void this.mutate({ action: 'assign', vehicle_id: value(event) || null }) }, h('option', { value: '' }, 'Sin asignar'), vehicles.filter(vehicle => vehicle.active || vehicle.id === r.vehicle_id).map(vehicle => h('option', { value: vehicle.id, key: vehicle.id }, vehicle.name))))),
            h('section', { class: 'panel simple-owner-control' },
                h('h2', null, 'Cambiar estado'),
                terminal ? h('p', null, domain_js_1.labels[r.status]) : h('div', { class: 'state-actions' }, domain_js_1.transitions[r.status].filter(status => status !== 'cancelled').map(status => h('button', {
                    class: 'button button-light full', disabled: this.state.busy, key: status,
                    onClick: () => status === 'quoted' ? document.getElementById('quote-amount')?.focus() : void this.mutate({ action: 'status', status })
                }, { reviewing: 'Revisar', quoted: 'Cargar cotización', confirmed: 'Confirmar servicio', en_route: 'En camino', in_service: 'Iniciar servicio', completed: 'Finalizar servicio' }[status])))),
            h('details', { class: 'panel internal-notes-disclosure' },
                h('summary', null, 'Notas internas'),
                h('p', { class: 'tiny muted' }, 'Privadas: el cliente no puede verlas.'),
                h('form', { onSubmit: event => { event.preventDefault(); void this.mutate({ action: 'note', text: this.state.note }); } },
                    h(ui_js_1.Field, { id: 'internal-note', label: 'Nueva nota' }, h('textarea', { id: 'internal-note', rows: 3, maxLength: 2000, value: this.state.note, onInput: event => this.set({ note: value(event) }) })),
                    h('button', { class: 'button button-light', type: 'submit', disabled: this.state.busy }, 'Guardar nota')),
                h('div', { class: 'notes-list' }, detail.notes.map(note => h('article', { key: note.id }, h('p', null, note.text), h('small', null, (0, domain_js_1.dateText)(note.created_at)))))));
    }

    requestDetail() {
        const detail = this.state.detail;
        if (!detail)
            return (0, preact_mjs_1.h)(ui_js_1.Loading, { label: "Abriendo la solicitud…" });

        const r = detail.request;
        const p = r.payload;
        const terminal = ['completed', 'cancelled'].includes(r.status);
        const underway = ['en_route', 'in_service'].includes(r.status);
        const canQuote = ['new', 'reviewing', 'quoted'].includes(r.status);
        const vehicle = this.state.dashboard?.vehicles.find(v => v.id === r.vehicle_id);
        const realContact = !p.contact.phone.startsWith('+5400000000');
        const quoteLink = (0, domain_js_1.whatsappUrl)(p.contact.whatsapp || p.contact.phone, (0, domain_js_1.quoteMessage)(r, this.state.runtime?.business.name ?? 'Flete'));

        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("a", { class: "text-link back-link", href: "#/admin/solicitudes" },
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 17 }),
                "Todas las solicitudes"
            ),
            (0, preact_mjs_1.h)("div", { class: "page-heading detail-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" },
                        domain_js_1.serviceLabels[p.kind],
                        r.is_demo ? ' · DATOS DEMO' : ''
                    ),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, r.code),
                    api_js_1.IS_PREVIEW && (
                        (0, preact_mjs_1.h)("button", { class: "text-link demo-track-link", onClick: () => void this.previewTracking(r.id) },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route", size: 16 }),
                            "Ver seguimiento del cliente"
                        )
                    ),
                    (0, preact_mjs_1.h)("p", null, "Recibida el ", (0, domain_js_1.dateText)(r.created_at))
                ),
                (0, preact_mjs_1.h)(ui_js_1.Badge, { status: r.status })
            ),
            r.quote_accepted_at && (
                (0, preact_mjs_1.h)("section", { class: "operator-accepted" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 23 }),
                    (0, preact_mjs_1.h)("div", null,
                        (0, preact_mjs_1.h)("strong", null,
                            "El cliente acept\u00F3 la cotizaci\u00F3n de ",
                            (0, domain_js_1.money)(r.quote_cents),
                            "."
                        ),
                        (0, preact_mjs_1.h)("p", null,
                            r.status === 'quoted' ? 'Revisá disponibilidad y confirmá el servicio. La aceptación no reservó una unidad ni registró un cobro.' : `Aceptación registrada el ${(0, domain_js_1.dateText)(r.quote_accepted_at)}.`
                        )
                    )
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "detail-grid" },
                (0, preact_mjs_1.h)("div", { class: "detail-main" },
                    (0, preact_mjs_1.h)("section", { class: "panel" },
                        (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                            (0, preact_mjs_1.h)("h2", null, "Recorrido y detalles"),
                            !terminal && !underway && (
                                (0, preact_mjs_1.h)("button", {
                                    class: "text-link",
                                    onClick: (e) => {
                                        this.restoreFocus = e.currentTarget;
                                        this.set({ editing: structuredClone(p) });
                                    }
                                },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "edit", size: 16 }),
                                    "Editar"
                                )
                            )
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.RouteCard, { origin: p.origin, destination: p.destination, scheduledAt: p.scheduled_at }),
                        (0, preact_mjs_1.h)("a", { class: "text-link maps-link", href: (0, domain_js_1.directionsUrl)(p.origin, p.destination), target: "_blank", rel: "noopener noreferrer" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "external", size: 16 }),
                            "Ver direcciones en Google Maps"
                        ),
                        (0, preact_mjs_1.h)("div", { class: "request-specs" },
                            p.kind === 'passengers' ? (
                                (0, preact_mjs_1.h)("div", null,
                                    (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                        (0, preact_mjs_1.h)("span", null, "Pasajeros"),
                                        (0, preact_mjs_1.h)("strong", null, p.details.passengers)
                                    ),
                                    (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                        (0, preact_mjs_1.h)("span", null, "Equipaje"),
                                        (0, preact_mjs_1.h)("strong", null, p.details.luggage)
                                    ),
                                    (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                        (0, preact_mjs_1.h)("span", null, "Modalidad"),
                                        (0, preact_mjs_1.h)("strong", null, p.details.round_trip ? 'Ida y vuelta' : 'Sólo ida')
                                    ),
                                    p.details.round_trip && (
                                        (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                            (0, preact_mjs_1.h)("span", null, "Regreso solicitado"),
                                            (0, preact_mjs_1.h)("strong", null, (0, domain_js_1.dateText)(p.details.return_at))
                                        )
                                    )
                                )
                            ) : (
                                (0, preact_mjs_1.h)("div", null,
                                    (0, preact_mjs_1.h)("h3", null, p.kind === 'freight' ? 'Carga solicitada' : 'Necesidad del cliente'),
                                    (0, preact_mjs_1.h)("p", { class: "preserve-text" }, p.details.description),
                                    p.kind === 'freight' && (
                                        (0, preact_mjs_1.h)("div", null,
                                            (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                                (0, preact_mjs_1.h)("span", null, "Tama\u00F1o / cantidad"),
                                                (0, preact_mjs_1.h)("strong", null, p.details.cargo_size, " \u00B7 ", p.details.quantity, " bultos")
                                            ),
                                            (0, preact_mjs_1.h)("div", { class: "spec-row" },
                                                (0, preact_mjs_1.h)("span", null, "Ayuda para carga / descarga"),
                                                (0, preact_mjs_1.h)("strong", null, p.details.needs_help ? `${p.details.helpers} persona(s)` : 'No solicitada')
                                            )
                                        )
                                    )
                                )
                            ),
                            p.details.notes && (
                                (0, preact_mjs_1.h)("div", { class: "client-note" },
                                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "OBSERVACIONES DEL CLIENTE"),
                                    (0, preact_mjs_1.h)("p", { class: "preserve-text" }, p.details.notes)
                                )
                            )
                        ),
                        detail.attachments.length > 0 && (
                            (0, preact_mjs_1.h)("div", { class: "private-photos" },
                                (0, preact_mjs_1.h)("div", { class: "mini-heading" },
                                    (0, preact_mjs_1.h)("strong", null, "Fotos de la carga"),
                                    (0, preact_mjs_1.h)("span", null,
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 13 }),
                                        " Privadas para el operador"
                                    )
                                ),
                                (0, preact_mjs_1.h)("div", { class: "photo-grid" },
                                    detail.attachments.map((a, i) => (0, preact_mjs_1.h)("a", {
                                        class: "photo-preview",
                                        href: api_js_1.api.fileUrl(a.id),
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        key: a.id
                                    },
                                        (0, preact_mjs_1.h)("img", { src: api_js_1.api.fileUrl(a.id), alt: `Foto de carga ${i + 1}` })
                                    ))
                                )
                            )
                        )
                    ),
                    (0, preact_mjs_1.h)("section", { class: "panel" },
                        (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                            (0, preact_mjs_1.h)("h2", null, "Contacto del cliente"),
                            (0, preact_mjs_1.h)("button", {
                                class: "text-link",
                                onClick: () => {
                                    this.set({ customer: r.customer_id, search: '', statusFilter: '', serviceFilter: '', dateFilter: '' });
                                    this.go('/admin/solicitudes');
                                }
                            },
                                "Ver historial",
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 15 })
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "client-profile" },
                            (0, preact_mjs_1.h)("span", { class: "person-avatar" }, p.contact.name.slice(0, 1).toUpperCase()),
                            (0, preact_mjs_1.h)("div", null,
                                (0, preact_mjs_1.h)("h3", null, p.contact.name),
                                (0, preact_mjs_1.h)("p", null, p.contact.phone),
                                p.contact.email && (0, preact_mjs_1.h)("p", null, p.contact.email)
                            )
                        ),
                        realContact ? (
                            (0, preact_mjs_1.h)("div", { class: "contact-actions" },
                                (0, preact_mjs_1.h)("a", { class: "button button-light", href: `tel:${p.contact.phone}` },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "phone", size: 17 }),
                                    "Llamar"
                                ),
                                (0, preact_mjs_1.h)("a", { class: "button button-light", href: (0, domain_js_1.whatsappUrl)(p.contact.whatsapp || p.contact.phone, `Hola ${p.contact.name}, te escribimos por tu solicitud ${r.code}.`) ?? undefined, target: "_blank", rel: "noopener noreferrer" },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "message", size: 18 }),
                                    "WhatsApp"
                                )
                            )
                        ) : (
                            (0, preact_mjs_1.h)("p", { class: "tiny muted" }, "Contacto de ejemplo de la demo. Llamadas y mensajes automáticos desactivados.")
                        )
                    ),
                    (0, preact_mjs_1.h)("section", { class: "panel notes-panel" },
                        (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                            (0, preact_mjs_1.h)("h2", null, "Notas internas"),
                            (0, preact_mjs_1.h)("span", { class: "private-label" },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 14 }),
                                "S\u00F3lo el equipo (privadas)"
                            )
                        ),
                        (0, preact_mjs_1.h)("form", {
                            onSubmit: (e) => {
                                e.preventDefault();
                                void this.mutate({ action: 'note', text: this.state.note });
                            }
                        },
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "internal-note", label: "Agregar una nota interna" },
                                (0, preact_mjs_1.h)("textarea", {
                                    id: "internal-note",
                                    rows: 3,
                                    maxLength: 2000,
                                    value: this.state.note,
                                    onInput: (e) => this.set({ note: value(e) }),
                                    placeholder: "Detalles internos para la coordinación que el cliente nunca verá."
                                })
                            ),
                            (0, preact_mjs_1.h)("button", {
                                class: "button button-light",
                                type: "submit",
                                disabled: this.state.busy || this.state.note.trim().length < 2
                            },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "plus", size: 17 }),
                                "Guardar nota"
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "notes-list" },
                            detail.notes.map(note => (0, preact_mjs_1.h)("article", { key: note.id },
                                (0, preact_mjs_1.h)("p", { class: "preserve-text" }, note.text),
                                (0, preact_mjs_1.h)("small", null, (0, domain_js_1.dateText)(note.created_at))
                            ))
                        )
                    ),
                    (0, preact_mjs_1.h)("section", { class: "panel history-panel" },
                        (0, preact_mjs_1.h)("h2", null, "Actividad de la solicitud"),
                        (0, preact_mjs_1.h)("ol", null,
                            [...detail.history].reverse().map(event => (0, preact_mjs_1.h)("li", { key: event.id },
                                (0, preact_mjs_1.h)("span", { class: "history-dot" }),
                                (0, preact_mjs_1.h)("div", null,
                                    (0, preact_mjs_1.h)("strong", null, event.action),
                                    (0, preact_mjs_1.h)("small", null, (0, domain_js_1.dateText)(event.created_at), " \u00B7 ", domain_js_1.labels[event.status])
                                )
                            ))
                        )
                    )
                ),
                (0, preact_mjs_1.h)("aside", { class: "detail-aside" },
                    (0, preact_mjs_1.h)("section", { class: "panel quote-panel" },
                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "1. COTIZACI\u00D3N DEL SERVICIO"),
                        (0, preact_mjs_1.h)("div", { class: "quote-total" },
                            (0, domain_js_1.money)(r.quote_cents),
                            r.quote_cents !== null && (0, preact_mjs_1.h)("small", null, " ARS")
                        ),
                        canQuote ? (
                            (0, preact_mjs_1.h)("form", { onSubmit: (e) => void this.saveQuote(e) },
                                (0, preact_mjs_1.h)(ui_js_1.Field, { id: "quote-amount", label: "Importe a cotizar (ARS)", hint: "Sin puntos de miles. Ejemplo: 45000 o 45000,50." },
                                    (0, preact_mjs_1.h)("div", { class: "money-input" },
                                        (0, preact_mjs_1.h)("span", null, "$"),
                                        (0, preact_mjs_1.h)("input", {
                                            id: "quote-amount",
                                            inputMode: "decimal",
                                            value: this.state.quote,
                                            onInput: (e) => this.set({ quote: value(e) }),
                                            placeholder: "0"
                                        })
                                    )
                                ),
                                (0, preact_mjs_1.h)("button", {
                                    class: "button button-primary full",
                                    type: "submit",
                                    disabled: this.state.busy
                                },
                                    this.state.busy ? 'Guardando…' : r.quote_cents === null ? 'Guardar cotización' : 'Actualizar cotización',
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 17 })
                                )
                            )
                        ) : (
                            (0, preact_mjs_1.h)("p", { class: "tiny muted" },
                                terminal ? 'Servicio cerrado. El importe ya no se puede modificar.' : 'Importe acordado para este servicio.'
                            )
                        ),
                        r.status === 'quoted' && realContact && quoteLink && (
                            (0, preact_mjs_1.h)("a", { class: "button button-whatsapp full", href: quoteLink, target: "_blank", rel: "noopener noreferrer" },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "message", size: 18 }),
                                "Preparar cotizaci\u00F3n"
                            )
                        ),
                        r.status === 'quoted' && (
                            (0, preact_mjs_1.h)("p", { class: "tiny muted" },
                                realContact ? 'Abre WhatsApp con un mensaje preparado listo para enviar.' : 'Contacto de prueba; para probar WhatsApp real creá una solicitud con tu teléfono.'
                            )
                        )
                    ),
                    (0, preact_mjs_1.h)("section", { class: "panel state-panel" },
                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "2. CONFIRMAR Y GESTIONAR ESTADO"),
                        (0, preact_mjs_1.h)("h2", null, "Pr\u00F3ximo paso"),
                        terminal ? (
                            (0, preact_mjs_1.h)("div", { class: "closed-state" },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: r.status === 'completed' ? 'check' : 'close', size: 25 }),
                                (0, preact_mjs_1.h)("strong", null, domain_js_1.labels[r.status]),
                                (0, preact_mjs_1.h)("p", null, "El historial y las notas quedan disponibles.")
                            )
                        ) : (
                            (0, preact_mjs_1.h)("div", { class: "state-actions" },
                                domain_js_1.transitions[r.status].filter(s => s !== 'cancelled').map(status => (0, preact_mjs_1.h)("button", {
                                    class: `button full${status === 'reviewing' ? ' button-light' : status === 'confirmed' ? ' button-primary' : ' button-dark'}`,
                                    disabled: this.state.busy,
                                    key: status,
                                    onClick: () => {
                                        if (status === 'quoted') {
                                            document.getElementById('quote-amount')?.focus();
                                            return;
                                        }
                                        if (status === 'completed' && !window.confirm('¿Confirmás que el servicio terminó? Este estado no se puede revertir.'))
                                            return;
                                        void this.mutate({ action: 'status', status });
                                    }
                                },
                                    { reviewing: 'Pasar a revisión', quoted: 'Cargar cotización', confirmed: 'Confirmar servicio', en_route: 'Marcar en camino', in_service: 'Iniciar servicio', completed: 'Finalizar servicio' }[status],
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 17 })
                                )),
                                (0, preact_mjs_1.h)("button", {
                                    class: "text-link danger-link",
                                    disabled: this.state.busy,
                                    onClick: (e) => {
                                        this.restoreFocus = e.currentTarget;
                                        this.set({ cancellation: '' }, () => document.getElementById('cancel-reason')?.focus());
                                    }
                                }, "Cancelar solicitud")
                            )
                        )
                    ),
                    (0, preact_mjs_1.h)("section", { class: "panel" },
                        (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                            (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "3. UNIDAD ASIGNADA"),
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "truck", size: 20 })
                        ),
                        (0, preact_mjs_1.h)("h2", null, "Veh\u00EDculo"),
                        (0, preact_mjs_1.h)("p", { class: "muted tiny" },
                            vehicle ? `${vehicle.name} · ${vehicle.is_demo ? 'ID DEMO · ' : ''}${vehicle.plate}` : 'Todavía no se asignó una unidad.'
                        ),
                        !terminal && !underway && (
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "assign-vehicle", label: "Asignar unidad" },
                                (0, preact_mjs_1.h)("select", {
                                    id: "assign-vehicle",
                                    value: r.vehicle_id ?? '',
                                    disabled: this.state.busy,
                                    onChange: (e) => void this.mutate({ action: 'assign', vehicle_id: value(e) || null })
                                },
                                    (0, preact_mjs_1.h)("option", { value: "" }, "Sin asignar"),
                                    this.state.dashboard?.vehicles.filter(v => v.active).map(v => (0, preact_mjs_1.h)("option", { value: v.id, key: v.id },
                                        v.name, " \u00B7 ", v.seats, " asientos"
                                    ))
                                )
                            )
                        ),
                        (0, preact_mjs_1.h)("p", { class: "tiny muted" },
                            "No se permite iniciar dos servicios simultáneos con la misma unidad."
                        )
                    )
                )
            ),
            this.state.editing && this.editPanel()
        );
    }

    editPanel() {
        const p = this.state.editing;
        if (!p)
            return (0, preact_mjs_1.h)("div", null);
        const update = (patch) => this.set({ editing: { ...p, ...patch } });
        return (0, preact_mjs_1.h)("div", { class: "modal-scrim" },
            (0, preact_mjs_1.h)("section", { class: "modal panel", role: "dialog", "aria-modal": "true", "aria-labelledby": "edit-title" },
                (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                    (0, preact_mjs_1.h)("h2", { id: "edit-title" }, "Corregir datos de la solicitud"),
                    (0, preact_mjs_1.h)("button", {
                        class: "icon-button",
                        "aria-label": "Cerrar edici\u00F3n",
                        onClick: () => {
                            const target = this.restoreFocus;
                            this.set({ editing: null }, () => target?.focus());
                        }
                    }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close" }))
                ),
                (0, preact_mjs_1.h)(ui_js_1.Notice, null, "Modificar estos datos deja sin efecto la cotización y desasigna el vehículo para volver a revisión."),
                (0, preact_mjs_1.h)("form", { onSubmit: (e) => { e.preventDefault(); void this.mutate({ action: 'edit', payload: p }); } },
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-origin", label: "Origen" },
                        (0, preact_mjs_1.h)("input", { id: "edit-origin", value: p.origin, maxLength: 240, onInput: (e) => update({ origin: value(e) }) })
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-destination", label: "Destino" },
                        (0, preact_mjs_1.h)("input", { id: "edit-destination", value: p.destination, maxLength: 240, onInput: (e) => update({ destination: value(e) }) })
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-when", label: "Cu\u00E1ndo necesita el servicio" },
                        (0, preact_mjs_1.h)("select", {
                            id: "edit-when",
                            value: p.when,
                            onChange: (e) => update({ when: value(e), scheduled_at: value(e) === 'asap' ? null : p.scheduled_at })
                        },
                            (0, preact_mjs_1.h)("option", { value: "asap" }, "Lo antes posible"),
                            (0, preact_mjs_1.h)("option", { value: "scheduled" }, "Programado")
                        )
                    ),
                    p.when === 'scheduled' && (
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-date", label: "Salida (hora de Argentina)" },
                            (0, preact_mjs_1.h)("input", { id: "edit-date", type: "datetime-local", value: toArgInput(p.scheduled_at), onInput: (e) => update({ scheduled_at: fromArgInput(value(e)) }) })
                        )
                    ),
                    p.kind === 'passengers' ? (
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-passengers", label: "Pasajeros" },
                            (0, preact_mjs_1.h)("input", { id: "edit-passengers", type: "number", min: 1, max: 60, value: p.details.passengers, onInput: (e) => update({ details: { ...p.details, passengers: Number(value(e)) } }) })
                        )
                    ) : (
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-description", label: "Detalle del traslado" },
                            (0, preact_mjs_1.h)("textarea", { id: "edit-description", rows: 3, maxLength: 1500, value: p.details.description, onInput: (e) => update({ details: { ...p.details, description: value(e) } }) })
                        )
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "edit-notes", label: "Observaciones del cliente" },
                        (0, preact_mjs_1.h)("textarea", { id: "edit-notes", rows: 2, maxLength: 1500, value: p.details.notes, onInput: (e) => update({ details: { ...p.details, notes: value(e) } }) })
                    ),
                    this.state.flash?.type === 'error' && (0, preact_mjs_1.h)(ui_js_1.Notice, { type: "error" }, this.state.flash.text),
                    (0, preact_mjs_1.h)("div", { class: "form-actions" },
                        (0, preact_mjs_1.h)("button", {
                            class: "button button-light",
                            type: "button",
                            onClick: () => {
                                const target = this.restoreFocus;
                                this.set({ editing: null }, () => target?.focus());
                            }
                        }, "Volver sin guardar"),
                        (0, preact_mjs_1.h)("button", { class: "button button-primary", type: "submit", disabled: this.state.busy }, "Guardar y volver a revisi\u00F3n")
                    )
                )
            )
        );
    }

    vehiclesPage() {
        const vehicles = this.state.dashboard?.vehicles ?? [];
        const editor = this.state.vehicleEditor;
        const update = (patch) => {
            if (editor)
                this.set({ vehicleEditor: { ...editor, ...patch } });
        };

        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("div", { class: "page-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "LAS UNIDADES DEL NEGOCIO"),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Veh\u00EDculos."),
                    (0, preact_mjs_1.h)("p", null, "Gestioná las unidades y su información para asignarlas cuando corresponda.")
                ),
                (0, preact_mjs_1.h)("button", {
                    class: "button button-primary",
                    onClick: (e) => {
                        this.restoreFocus = e.currentTarget;
                        this.set({ vehicleEditor: { id: '', name: '', plate: '', type: 'van', capacity: '', seats: 2, active: true, notes: '', version: 0, is_demo: true } });
                    }
                },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "plus", size: 18 }),
                    "Agregar veh\u00EDculo"
                )
            ),
            editor && (
                (0, preact_mjs_1.h)("section", { class: "panel vehicle-editor" },
                    (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                        (0, preact_mjs_1.h)("h2", null, editor.id ? 'Editar vehículo' : 'Nuevo vehículo'),
                        (0, preact_mjs_1.h)("button", {
                            class: "button button-light button-small topbar-action",
                            "aria-label": "Cerrar edici\u00F3n de veh\u00EDculo",
                            onClick: () => {
                                const target = this.restoreFocus;
                                this.set({ vehicleEditor: null }, () => target?.focus());
                            }
                        }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close" }))
                    ),
                    (0, preact_mjs_1.h)("form", { onSubmit: (e) => void this.saveVehicle(e) },
                        (0, preact_mjs_1.h)("div", { class: "form-row" },
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-name", label: "Nombre identificador" },
                                (0, preact_mjs_1.h)("input", {
                                    id: "vehicle-name",
                                    required: true,
                                    minLength: 2,
                                    maxLength: 80,
                                    value: editor.name,
                                    onInput: (e) => update({ name: value(e) }),
                                    placeholder: "Por ejemplo: Utilitario 1"
                                })
                            ),
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-plate", label: "Patente" },
                                (0, preact_mjs_1.h)("input", {
                                    id: "vehicle-plate",
                                    required: true,
                                    minLength: 4,
                                    maxLength: 12,
                                    value: editor.plate,
                                    onInput: (e) => update({ plate: value(e).toUpperCase() }),
                                    placeholder: "Patente de la unidad"
                                })
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "form-row" },
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-type", label: "Tipo de veh\u00EDculo" },
                                (0, preact_mjs_1.h)("select", {
                                    id: "vehicle-type",
                                    value: editor.type,
                                    onChange: (e) => update({ type: value(e) })
                                },
                                    (0, preact_mjs_1.h)("option", { value: "pickup" }, "Camioneta"),
                                    (0, preact_mjs_1.h)("option", { value: "van" }, "Utilitario"),
                                    (0, preact_mjs_1.h)("option", { value: "car" }, "Auto"),
                                    (0, preact_mjs_1.h)("option", { value: "minibus" }, "Combi")
                                )
                            ),
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-seats", label: "Asientos para pasajeros" },
                                (0, preact_mjs_1.h)("input", {
                                    id: "vehicle-seats",
                                    type: "number",
                                    min: 0,
                                    max: 60,
                                    required: true,
                                    value: editor.seats,
                                    onInput: (e) => update({ seats: Number(value(e)) })
                                })
                            )
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-capacity", label: "Capacidad de carga (descripci\u00F3n)" },
                            (0, preact_mjs_1.h)("input", {
                                id: "vehicle-capacity",
                                maxLength: 120,
                                value: editor.capacity,
                                onInput: (e) => update({ capacity: value(e) }),
                                placeholder: "Medidas, volumen o peso aproximado"
                            })
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "vehicle-notes", label: "Observaciones internas" },
                            (0, preact_mjs_1.h)("textarea", {
                                id: "vehicle-notes",
                                rows: 2,
                                maxLength: 1000,
                                value: editor.notes,
                                onInput: (e) => update({ notes: value(e) })
                            })
                        ),
                        (0, preact_mjs_1.h)("label", { class: "check-label" },
                            (0, preact_mjs_1.h)("input", {
                                type: "checkbox",
                                checked: editor.active,
                                onChange: (e) => update({ active: checked(e) })
                            }),
                            (0, preact_mjs_1.h)("span", null, "Unidad activa para nuevas asignaciones")
                        ),
                        (0, preact_mjs_1.h)("div", { class: "form-actions" },
                            (0, preact_mjs_1.h)("button", {
                                type: "button",
                                class: "button button-light",
                                onClick: () => {
                                    const target = this.restoreFocus;
                                    this.set({ vehicleEditor: null }, () => target?.focus());
                                }
                            }, "Cancelar"),
                            (0, preact_mjs_1.h)("button", { class: "button button-primary", type: "submit", disabled: this.state.busy },
                                "Guardar veh\u00EDculo",
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 17 })
                            )
                        )
                    )
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "vehicles-grid" },
                vehicles.map(v => (0, preact_mjs_1.h)("article", { class: "panel vehicle-card", key: v.id },
                    (0, preact_mjs_1.h)("div", { class: "vehicle-card-top" },
                        (0, preact_mjs_1.h)("span", { class: "vehicle-illustration" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: v.type === 'car' || v.type === 'minibus' ? 'car' : 'truck', size: 44 })
                        ),
                        (0, preact_mjs_1.h)("span", { class: `availability${v.active ? ' available' : ''}` }, v.is_demo ? 'DEMO' : v.active ? 'Activa' : 'Inactiva')
                    ),
                    (0, preact_mjs_1.h)("div", { class: "vehicle-name" },
                        (0, preact_mjs_1.h)("h2", null, v.name),
                        v.is_demo && (0, preact_mjs_1.h)("span", { class: "demo-tag" }, "DEMO")
                    ),
                    (0, preact_mjs_1.h)("span", { class: "plate" }, v.is_demo ? `ID DEMO · ${v.plate}` : v.plate),
                    (0, preact_mjs_1.h)("p", null, v.capacity || 'Capacidad a detallar'),
                    (0, preact_mjs_1.h)("div", { class: "vehicle-seats" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "users", size: 18 }),
                        v.seats,
                        " asientos para pasajeros"
                    ),
                    (0, preact_mjs_1.h)("button", {
                        class: "button button-light full",
                        onClick: (e) => {
                            this.restoreFocus = e.currentTarget;
                            this.set({ vehicleEditor: structuredClone(v) });
                        }
                    },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "edit", size: 16 }),
                        "Editar unidad"
                    )
                ))
            ),
            !vehicles.length && !editor && (0, preact_mjs_1.h)(ui_js_1.Empty, { icon: "truck", title: "Carg\u00E1 tu primera unidad", text: "Despu\u00E9s podr\u00E1s asignarla a una solicitud." }),
            (0, preact_mjs_1.h)("p", { class: "page-footnote" }, "Las unidades de ejemplo son ficticias. No se modifican vehículos con servicios confirmados o en curso.")
        );
    }

    customersPage() {
        const customers = this.state.dashboard?.customers ?? [];
        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("div", { class: "page-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "CONTACTOS E HISTORIAL"),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Clientes."),
                    (0, preact_mjs_1.h)("p", null, "Los contactos se generan automáticamente a partir de las solicitudes recibidas.")
                ),
                (0, preact_mjs_1.h)("span", { class: "count-label" }, customers.length, " contacto(s)")
            ),
            (0, preact_mjs_1.h)("div", { class: "customers-grid" },
                customers.map(c => (0, preact_mjs_1.h)("button", {
                    class: "panel customer-card",
                    key: c.id,
                    onClick: () => {
                        this.set({ customer: c.id, search: '', statusFilter: '', serviceFilter: '', dateFilter: '' });
                        this.go('/admin/solicitudes');
                    }
                },
                    (0, preact_mjs_1.h)("span", { class: "person-avatar" }, c.name.slice(0, 1).toUpperCase()),
                    (0, preact_mjs_1.h)("span", null,
                        (0, preact_mjs_1.h)("strong", null, c.name),
                        (0, preact_mjs_1.h)("span", { class: "customer-phone" }, c.phone),
                        (0, preact_mjs_1.h)("span", { class: "customer-count" }, c.request_count, " solicitud(es)")
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "chevron", size: 18 })
                ))
            ),
            !customers.length && (0, preact_mjs_1.h)(ui_js_1.Empty, { icon: "users", title: "Todav\u00EDa no hay clientes", text: "Aparecer\u00E1n al recibir la primera solicitud." }),
            (0, preact_mjs_1.h)("p", { class: "page-footnote" }, "El historial se agrupa por teléfono informado.")
        );
    }

    settingsPage() {
        const b = this.state.settings;
        if (!b)
            return (0, preact_mjs_1.h)(ui_js_1.Loading, null);
        const update = (patch) => this.set({ settings: { ...b, ...patch } });
        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("div", { class: "page-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "CONFIGURACIÓN DEL NEGOCIO"),
                    (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, "Datos del negocio."),
                    (0, preact_mjs_1.h)("p", null, "Personaliz\u00E1 el nombre, canales de contacto y mensaje de cobertura.")
                )
            ),
            (0, preact_mjs_1.h)("section", { class: "panel settings-panel" },
                (0, preact_mjs_1.h)("form", { onSubmit: (e) => void this.saveSettings(e) },
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "business-name", label: "Nombre comercial", hint: "Flete es un nombre de demostración." },
                        (0, preact_mjs_1.h)("input", { id: "business-name", required: true, minLength: 2, maxLength: 60, value: b.name, onInput: (e) => update({ name: value(e) }) })
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "business-whatsapp", label: "WhatsApp del negocio (opcional)", hint: "Código internacional completo. Habilita los botones de contacto." },
                        (0, preact_mjs_1.h)("input", { id: "business-whatsapp", type: "tel", value: b.whatsapp, onInput: (e) => update({ whatsapp: value(e) }), placeholder: "+54 9…" })
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "business-email", label: "Correo del negocio (opcional)" },
                        (0, preact_mjs_1.h)("input", { id: "business-email", type: "email", value: b.email, onInput: (e) => update({ email: value(e) }) })
                    ),
                    (0, preact_mjs_1.h)(ui_js_1.Field, { id: "business-coverage", label: "Mensaje sobre cobertura y coordinación", hint: "Dejalo vacío hasta definir la zona y las condiciones con el prestador." },
                        (0, preact_mjs_1.h)("textarea", { id: "business-coverage", rows: 4, maxLength: 500, value: b.coverage ?? '', onInput: (e) => update({ coverage: value(e) }) })
                    ),
                    (0, preact_mjs_1.h)("button", { class: "button button-primary", type: "submit", disabled: this.state.busy },
                        "Guardar cambios",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 18 })
                    )
                )
            ),
            (0, preact_mjs_1.h)("section", { class: "panel settings-panel environment-panel" },
                (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                    (0, preact_mjs_1.h)("h2", null, "Entorno de esta versi\u00F3n"),
                    (0, preact_mjs_1.h)("span", { class: "demo-tag" }, "DEMO")
                ),
                (0, preact_mjs_1.h)("div", { class: "spec-row" },
                    (0, preact_mjs_1.h)("span", null, "Persistencia"),
                    (0, preact_mjs_1.h)("strong", null, api_js_1.IS_PREVIEW ? (this.state.runtime?.temporary ? 'Sesión temporal en memoria' : 'IndexedDB en este navegador') : this.state.runtime?.mode === 'local' ? 'SQLite en este equipo' : 'Almacenamiento a definir')
                ),
                (0, preact_mjs_1.h)("div", { class: "spec-row" },
                    (0, preact_mjs_1.h)("span", null, "Autenticaci\u00F3n"),
                    (0, preact_mjs_1.h)("strong", null, api_js_1.IS_PREVIEW ? 'Rol de demostración · sin cuenta' : this.state.runtime?.mode === 'local' ? 'Acceso local de prueba' : 'Autenticación a definir')
                ),
                (0, preact_mjs_1.h)("div", { class: "spec-row" },
                    (0, preact_mjs_1.h)("span", null, "Pagos y facturaci\u00F3n"),
                    (0, preact_mjs_1.h)("strong", null, "No incluidos en demo")
                ),
                (0, preact_mjs_1.h)("div", { class: "spec-row" },
                    (0, preact_mjs_1.h)("span", null, "Seguimiento"),
                    (0, preact_mjs_1.h)("strong", null, "Estados informados, sin GPS")
                ),
                (0, preact_mjs_1.h)("div", { class: "spec-row" },
                    (0, preact_mjs_1.h)("span", null, "Precios"),
                    (0, preact_mjs_1.h)("strong", null, "Sólo cotización manual · regla pendiente")
                ),
                (0, preact_mjs_1.h)("p", null, "Esta presentación es una primera base configurable. Quedan pendientes la marca, cobertura, vehículos, condiciones y forma de trabajo del prestador.")
            )
        );
    }

    adminLayout() {
        const path = this.state.path;
        const nav = [
            ['/admin', 'Resumen', 'grid'],
            ['/admin/solicitudes', 'Solicitudes', 'list'],
            ['/admin/vehiculos', 'Vehículos', 'truck'],
            ['/admin/clientes', 'Clientes', 'users'],
            ['/admin/ajustes', 'Ajustes', 'settings']
        ];
        let page;
        if (!this.state.dashboard)
            page = (0, preact_mjs_1.h)(ui_js_1.Loading, { label: "Cargando el panel…" });
        else if (/^\/admin\/solicitudes\//.test(path))
            page = this.simpleRequestDetail();
        else if (path === '/admin/solicitudes')
            page = this.requestsPage();
        else if (path === '/admin/vehiculos')
            page = this.vehiclesPage();
        else if (path === '/admin/clientes')
            page = this.customersPage();
        else if (path === '/admin/ajustes')
            page = this.settingsPage();
        else
            page = this.simpleOverview();

        return (0, preact_mjs_1.h)("div", { class: "admin-shell" },
            (0, preact_mjs_1.h)("aside", { class: "admin-sidebar" },
                (0, preact_mjs_1.h)(ui_js_1.Brand, { name: this.state.runtime?.business.name, admin: true }),
                (0, preact_mjs_1.h)("span", { class: "sidebar-label" }, "ESPACIO DE TRABAJO"),
                (0, preact_mjs_1.h)("nav", { "aria-label": "Panel de administraci\u00F3n" },
                    nav.map(([href, label, icon]) => (0, preact_mjs_1.h)("a", {
                        href: `#${href}`,
                        key: href,
                        class: path === href || (href !== '/admin' && path.startsWith(`${href}/`)) ? 'active' : '',
                        "aria-current": path === href || (href !== '/admin' && path.startsWith(`${href}/`)) ? 'page' : undefined
                    },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: icon, size: 20 }),
                        (0, preact_mjs_1.h)("span", null, label),
                        label === 'Solicitudes' && (0, preact_mjs_1.h)("small", null, this.state.dashboard?.requests.filter(r => r.status === 'new').length ?? 0)
                    ))
                ),
                (0, preact_mjs_1.h)("div", { class: "sidebar-bottom" },
                    (0, preact_mjs_1.h)("div", { class: "sidebar-demo" },
                        (0, preact_mjs_1.h)("span", { class: "status-dot" }),
                        (0, preact_mjs_1.h)("div", null,
                            (0, preact_mjs_1.h)("strong", null, "Entorno de demostración"),
                            (0, preact_mjs_1.h)("span", null, "Datos locales en este navegador")
                        )
                    ),
                    (0, preact_mjs_1.h)("a", { href: "#/", class: "sidebar-site" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "external", size: 17 }),
                        "Ver sitio de clientes"
                    ),
                    (0, preact_mjs_1.h)("button", { onClick: () => void this.logout(), disabled: this.state.busy },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "logout", size: 17 }),
                        api_js_1.IS_PREVIEW ? "Volver a vista cliente" : "Cerrar sesión"
                    )
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "admin-workspace" },
                (0, preact_mjs_1.h)("header", { class: "admin-topbar" },
                    (0, preact_mjs_1.h)("div", { class: "admin-mobile-brand" },
                        (0, preact_mjs_1.h)(ui_js_1.Brand, { name: this.state.runtime?.business.name, admin: true })
                    ),
                    (0, preact_mjs_1.h)("span", { class: "topbar-location" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "grid", size: 16 }),
                        "Panel de operaciones",
                        (0, preact_mjs_1.h)("span", null, "/"),
                        nav.find(([href]) => href !== '/admin' && path.startsWith(href))?.[1] ?? 'Resumen'
                    ),
                    (0, preact_mjs_1.h)("div", { class: "topbar-right" },
                        (0, preact_mjs_1.h)("button", {
                            class: "icon-button",
                            "aria-label": "Actualizar panel",
                            onClick: () => {
                                void this.loadDashboard();
                                if (this.state.detail)
                                    void this.loadDetail(this.state.detail.request.id, true);
                            }
                        }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 18 }), (0, preact_mjs_1.h)("span", null, "Actualizar")),
                        (0, preact_mjs_1.h)("span", { class: "topbar-user" },
                            (0, preact_mjs_1.h)("span", { class: "person-avatar small" }, "OP"),
                            (0, preact_mjs_1.h)("span", null, "Administración",
                                (0, preact_mjs_1.h)("small", null, this.state.user?.email)
                            )
                        ),
                        (0, preact_mjs_1.h)("button", {
                            class: "button button-light button-small mobile-logout topbar-action",
                            "aria-label": api_js_1.IS_PREVIEW ? "Volver a vista cliente" : "Cerrar sesión",
                            onClick: () => void this.logout()
                        }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "logout", size: 17 }), (0, preact_mjs_1.h)("span", null, "Salir"))
                    )
                ),
                (0, preact_mjs_1.h)("main", { id: "main", class: "admin-main" },
                    this.state.flash && (
                        (0, preact_mjs_1.h)("div", { class: "flash-wrap" },
                            (0, preact_mjs_1.h)(ui_js_1.Notice, { type: this.state.flash.type }, this.state.flash.text),
                            (0, preact_mjs_1.h)("button", { class: "icon-button", "aria-label": "Cerrar aviso", onClick: () => this.set({ flash: null }) },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close", size: 15 })
                            )
                        )
                    ),
                    page,
                    (0, preact_mjs_1.h)("footer", { class: "admin-footnote" },
                        (0, preact_mjs_1.h)("span", null, api_js_1.IS_PREVIEW ? 'Demostración en este navegador · almacenamiento local' : 'Persistencia en base de datos'),
                        (0, preact_mjs_1.h)("span", null, "Estados informados por el operador · Horario de Argentina")
                    )
                ),
                (0, preact_mjs_1.h)("nav", { class: "mobile-admin-nav", "aria-label": "Navegación móvil del panel" },
                    nav.map(([href, label, icon]) => (0, preact_mjs_1.h)("a", {
                        key: href,
                        href: `#${href}`,
                        class: path === href || (href !== '/admin' && path.startsWith(`${href}/`)) ? 'active' : ''
                    },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: icon, size: 20 }),
                        (0, preact_mjs_1.h)("span", null, label)
                    ))
                )
            ),
            this.state.cancellation !== null && (
                (0, preact_mjs_1.h)("div", { class: "modal-scrim" },
                    (0, preact_mjs_1.h)("section", { class: "modal panel small-modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "cancel-title" },
                        (0, preact_mjs_1.h)("div", { class: "panel-heading" },
                            (0, preact_mjs_1.h)("h2", { id: "cancel-title" }, "Cancelar solicitud"),
                            (0, preact_mjs_1.h)("button", {
                                class: "icon-button",
                                "aria-label": "Cerrar cancelación",
                                onClick: () => {
                                    const target = this.restoreFocus;
                                    this.set({ cancellation: null }, () => target?.focus());
                                }
                            }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "close" }))
                        ),
                        (0, preact_mjs_1.h)("p", null, "La solicitud se cerrará y el cliente verá el estado cancelado. El motivo queda como nota interna."),
                        (0, preact_mjs_1.h)("form", {
                            onSubmit: (e) => {
                                e.preventDefault();
                                void this.mutate({ action: 'status', status: 'cancelled', reason: this.state.cancellation ?? '' });
                            }
                        },
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "cancel-reason", label: "Motivo de la cancelación" },
                                (0, preact_mjs_1.h)("textarea", {
                                    id: "cancel-reason",
                                    required: true,
                                    minLength: 5,
                                    maxLength: 2000,
                                    rows: 3,
                                    value: this.state.cancellation,
                                    onInput: (e) => this.set({ cancellation: value(e) }),
                                    placeholder: "Explicá el motivo de la cancelación…"
                                })
                            ),
                            (0, preact_mjs_1.h)("div", { class: "form-actions" },
                                (0, preact_mjs_1.h)("button", {
                                    type: "button",
                                    class: "button button-light",
                                    onClick: () => {
                                        const target = this.restoreFocus;
                                        this.set({ cancellation: null }, () => target?.focus());
                                    }
                                }, "Volver"),
                                (0, preact_mjs_1.h)("button", { type: "submit", class: "button button-danger", disabled: this.state.busy }, "Confirmar cancelación")
                            )
                        )
                    )
                )
            )
        );
    }

    render() {
        if (this.state.bootError)
            return (0, preact_mjs_1.h)("main", { class: "container boot-failure" },
                (0, preact_mjs_1.h)(ui_js_1.Empty, { icon: "warning", title: "No pudimos abrir la plataforma", text: this.state.bootError },
                    (0, preact_mjs_1.h)("button", { class: "button button-primary", onClick: () => void this.boot() },
                        "Reintentar",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 17 })
                    )
                )
            );

        if (!this.state.runtime)
            return (0, preact_mjs_1.h)("main", { class: "container" },
                (0, preact_mjs_1.h)(ui_js_1.Loading, { label: "Preparando la plataforma…" })
            );

        const admin = this.state.path.startsWith('/admin');
        const banner = (0, preact_mjs_1.h)("div", { class: `mode-banner${admin ? ' admin-mode-banner' : ''}` },
            (0, preact_mjs_1.h)("span", { class: "status-dot" }),
            (0, preact_mjs_1.h)("span", null, api_js_1.IS_PREVIEW ? 'Demo comercial · datos ficticios' : 'Demo comercial'),
            api_js_1.IS_PREVIEW && (
                (0, preact_mjs_1.h)("button", {
                    class: "demo-toggle",
                    "aria-label": "Mostrar controles de demostración",
                    "aria-expanded": this.state.showDemoTools,
                    "aria-controls": "demo-controls",
                    onClick: () => this.set({ showDemoTools: !this.state.showDemoTools })
                },
                    "Explorar",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "settings", size: 13 })
                )
            )
        );

        if (admin)
            return (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("a", { class: "skip-link", href: "#main", onClick: (e) => { e.preventDefault(); const main = document.getElementById('main'); if (main) { main.tabIndex = -1; main.focus(); } } }, "Saltar al contenido"),
                this.previewToolbar(),
                banner,
                this.state.loadingAdmin && !this.state.checkedSession ? (
                    (0, preact_mjs_1.h)(ui_js_1.Loading, { label: "Verificando la sesión…" })
                ) : this.state.user ? (
                    this.adminLayout()
                ) : (
                    this.loginPage()
                )
            );

        let content;
        if (this.state.path === '/solicitar')
            content = this.simpleWizard();
        else if (this.state.path === '/seguimiento')
            content = this.lookupPage();
        else if (this.state.path.startsWith('/seguimiento/') || this.state.path.startsWith('/recibida/'))
            content = this.trackingPage();
        else if (this.state.path === '/privacidad')
            content = this.privacy();
        else if (this.state.path === '/demo' && api_js_1.IS_PREVIEW)
            content = (0, preact_mjs_1.h)(commercial_js_1.DemoGuide, {
                temporary: Boolean(this.state.runtime.temporary),
                busy: this.state.busy,
                onStart: () => this.start(),
                onExample: () => void this.exampleTracking(),
                onReset: () => void this.resetPreview()
            });
        else if (this.state.path === '/')
            content = this.home();
        else
            content = (0, preact_mjs_1.h)("main", { id: "main", class: "container" },
                (0, preact_mjs_1.h)(ui_js_1.Empty, { title: "Esa página no está disponible", text: "Podés volver al inicio o consultar tu solicitud." },
                    (0, preact_mjs_1.h)("a", { href: "#/", class: "button button-primary" }, "Volver al inicio")
                )
            );

        return (0, preact_mjs_1.h)("div", null,
            (0, preact_mjs_1.h)("a", { class: "skip-link", href: "#main", onClick: (e) => { e.preventDefault(); document.querySelector('main h1')?.focus(); } }, "Saltar al contenido"),
            this.previewToolbar(),
            banner,
            this.publicHeader(),
            this.state.flash && this.state.path !== '/solicitar' && (
                (0, preact_mjs_1.h)("div", { class: "container public-notice" },
                    (0, preact_mjs_1.h)(ui_js_1.Notice, { type: this.state.flash.type }, this.state.flash.text)
                )
            ),
            content,
            this.footer(),
            this.acceptanceDialog()
        );
    }
}

const root = document.getElementById('app');
if (root)
    (0, preact_mjs_1.render)((0, preact_mjs_1.h)(App, null), root);
