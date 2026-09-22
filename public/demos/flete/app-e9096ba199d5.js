(()=>{'use strict';const defs={"vendor/preact.mjs":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.isValidElement = void 0;
exports.render = N;
exports.hydrate = O;
exports.createElement = a;
exports.h = a;
exports.Fragment = y;
exports.createRef = h;
exports.Component = p;
exports.cloneElement = S;
exports.createContext = q;
exports.toChildArray = w;
var n, l, u, i, t, o, r = {}, f = [], e = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
function c(e, n) { for (var t in n)
    e[t] = n[t]; return e; }
function s(e) { var n = e.parentNode; n && n.removeChild(e); }
function a(e, n, t) { var _, l, o, r = arguments, i = {}; for (o in n)
    "key" == o ? _ = n[o] : "ref" == o ? l = n[o] : i[o] = n[o]; if (arguments.length > 3)
    for (t = [t], o = 3; o < arguments.length; o++)
        t.push(r[o]); if (null != t && (i.children = t), "function" == typeof e && null != e.defaultProps)
    for (o in e.defaultProps)
        void 0 === i[o] && (i[o] = e.defaultProps[o]); return v(e, i, _, l, null); }
function v(e, t, _, l, o) { var r = { type: e, props: t, key: _, ref: l, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, __h: null, constructor: void 0, __v: null == o ? ++n.__v : o }; return null != n.vnode && n.vnode(r), r; }
function h() { return { current: null }; }
function y(e) { return e.children; }
function p(e, n) { this.props = e, this.context = n; }
function d(e, n) { if (null == n)
    return e.__ ? d(e.__, e.__.__k.indexOf(e) + 1) : null; for (var t; n < e.__k.length; n++)
    if (null != (t = e.__k[n]) && null != t.__e)
        return t.__e; return "function" == typeof e.type ? d(e) : null; }
function _(e) { var n, t; if (null != (e = e.__) && null != e.__c) {
    for (e.__e = e.__c.base = null, n = 0; n < e.__k.length; n++)
        if (null != (t = e.__k[n]) && null != t.__e) {
            e.__e = e.__c.base = t.__e;
            break;
        }
    return _(e);
} }
function k(e) { (!e.__d && (e.__d = !0) && u.push(e) && !b.__r++ || t !== n.debounceRendering) && ((t = n.debounceRendering) || i)(b); }
function b() { for (var e; b.__r = u.length;)
    e = u.sort(function (e, n) { return e.__v.__b - n.__v.__b; }), u = [], e.some(function (e) { var n, t, l, o, r, i; e.__d && (r = (o = (n = e).__v).__e, (i = n.__P) && (t = [], (l = c({}, o)).__v = o.__v + 1, I(i, o, l, n.__n, void 0 !== i.ownerSVGElement, null != o.__h ? [r] : null, t, null == r ? d(o) : r, o.__h), T(t, o), o.__e != r && _(o))); }); }
function m(e, n, t, _, l, o, i, u, s, c) { var p, a, h, m, k, b, C, P = _ && _.__k || f, S = P.length; for (t.__k = [], p = 0; p < n.length; p++)
    if (null != (m = t.__k[p] = null == (m = n[p]) || "boolean" == typeof m ? null : "string" == typeof m || "number" == typeof m || "bigint" == typeof m ? v(null, m, null, null, m) : Array.isArray(m) ? v(y, { children: m }, null, null, null) : m.__b > 0 ? v(m.type, m.props, m.key, null, m.__v) : m)) {
        if (m.__ = t, m.__b = t.__b + 1, null === (h = P[p]) || h && m.key == h.key && m.type === h.type)
            P[p] = void 0;
        else
            for (a = 0; a < S; a++) {
                if ((h = P[a]) && m.key == h.key && m.type === h.type) {
                    P[a] = void 0;
                    break;
                }
                h = null;
            }
        I(e, m, h = h || r, l, o, i, u, s, c), k = m.__e, (a = m.ref) && h.ref != a && (C || (C = []), h.ref && C.push(h.ref, null, m), C.push(a, m.__c || k, m)), null != k ? (null == b && (b = k), "function" == typeof m.type && null != m.__k && m.__k === h.__k ? m.__d = s = g(m, s, e) : s = x(e, m, h, P, k, s), c || "option" !== t.type ? "function" == typeof t.type && (t.__d = s) : e.value = "") : s && h.__e == s && s.parentNode != e && (s = d(h));
    } for (t.__e = b, p = S; p--;)
    null != P[p] && ("function" == typeof t.type && null != P[p].__e && P[p].__e == t.__d && (t.__d = d(_, p + 1)), L(P[p], P[p])); if (C)
    for (p = 0; p < C.length; p++)
        z(C[p], C[++p], C[++p]); }
function g(e, n, t) { var _, l; for (_ = 0; _ < e.__k.length; _++)
    (l = e.__k[_]) && (l.__ = e, n = "function" == typeof l.type ? g(l, n, t) : x(t, l, l, e.__k, l.__e, n)); return n; }
function w(e, n) { return n = n || [], null == e || "boolean" == typeof e || (Array.isArray(e) ? e.some(function (e) { w(e, n); }) : n.push(e)), n; }
function x(e, n, t, _, l, o) { var r, i, u; if (void 0 !== n.__d)
    r = n.__d, n.__d = void 0;
else if (null == t || l != o || null == l.parentNode)
    e: if (null == o || o.parentNode !== e)
        e.appendChild(l), r = null;
    else {
        for (i = o, u = 0; (i = i.nextSibling) && u < _.length; u += 2)
            if (i == l)
                break e;
        e.insertBefore(l, o), r = o;
    } return void 0 !== r ? r : l.nextSibling; }
function A(e, n, t, _, l) { var o; for (o in t)
    "children" === o || "key" === o || o in n || C(e, o, null, t[o], _); for (o in n)
    l && "function" != typeof n[o] || "children" === o || "key" === o || "value" === o || "checked" === o || t[o] === n[o] || C(e, o, n[o], t[o], _); }
function P(n, t, _) { "-" === t[0] ? n.setProperty(t, _) : n[t] = null == _ ? "" : "number" != typeof _ || e.test(t) ? _ : _ + "px"; }
function C(e, n, t, _, l) { var o; e: if ("style" === n)
    if ("string" == typeof t)
        e.style.cssText = t;
    else {
        if ("string" == typeof _ && (e.style.cssText = _ = ""), _)
            for (n in _)
                t && n in t || P(e.style, n, "");
        if (t)
            for (n in t)
                _ && t[n] === _[n] || P(e.style, n, t[n]);
    }
else if ("o" === n[0] && "n" === n[1])
    o = n !== (n = n.replace(/Capture$/, "")), n = n.toLowerCase() in e ? n.toLowerCase().slice(2) : n.slice(2), e.l || (e.l = {}), e.l[n + o] = t, t ? _ || e.addEventListener(n, o ? H : $, o) : e.removeEventListener(n, o ? H : $, o);
else if ("dangerouslySetInnerHTML" !== n) {
    if (l)
        n = n.replace(/xlink[H:h]/, "h").replace(/sName$/, "s");
    else if ("href" !== n && "list" !== n && "form" !== n && "tabIndex" !== n && "download" !== n && n in e)
        try {
            e[n] = null == t ? "" : t;
            break e;
        }
        catch (e) { }
    "function" == typeof t || (null != t && (!1 !== t || "a" === n[0] && "r" === n[1]) ? e.setAttribute(n, t) : e.removeAttribute(n));
} }
function $(e) { this.l[e.type + !1](n.event ? n.event(e) : e); }
function H(e) { this.l[e.type + !0](n.event ? n.event(e) : e); }
function I(e, t, _, l, o, r, i, u, s) { var f, a, d, h, v, k, g, b, C, x, P, S = t.type; if (void 0 !== t.constructor)
    return null; null != _.__h && (s = _.__h, u = t.__e = _.__e, t.__h = null, r = [u]), (f = n.__b) && f(t); try {
    e: if ("function" == typeof S) {
        if (b = t.props, C = (f = S.contextType) && l[f.__c], x = f ? C ? C.props.value : f.__ : l, _.__c ? g = (a = t.__c = _.__c).__ = a.__E : ("prototype" in S && S.prototype.render ? t.__c = a = new S(b, x) : (t.__c = a = new p(b, x), a.constructor = S, a.render = M), C && C.sub(a), a.props = b, a.state || (a.state = {}), a.context = x, a.__n = l, d = a.__d = !0, a.__h = []), null == a.__s && (a.__s = a.state), null != S.getDerivedStateFromProps && (a.__s == a.state && (a.__s = c({}, a.__s)), c(a.__s, S.getDerivedStateFromProps(b, a.__s))), h = a.props, v = a.state, d)
            null == S.getDerivedStateFromProps && null != a.componentWillMount && a.componentWillMount(), null != a.componentDidMount && a.__h.push(a.componentDidMount);
        else {
            if (null == S.getDerivedStateFromProps && b !== h && null != a.componentWillReceiveProps && a.componentWillReceiveProps(b, x), !a.__e && null != a.shouldComponentUpdate && !1 === a.shouldComponentUpdate(b, a.__s, x) || t.__v === _.__v) {
                a.props = b, a.state = a.__s, t.__v !== _.__v && (a.__d = !1), a.__v = t, t.__e = _.__e, t.__k = _.__k, t.__k.forEach(function (e) { e && (e.__ = t); }), a.__h.length && i.push(a);
                break e;
            }
            null != a.componentWillUpdate && a.componentWillUpdate(b, a.__s, x), null != a.componentDidUpdate && a.__h.push(function () { a.componentDidUpdate(h, v, k); });
        }
        a.context = x, a.props = b, a.state = a.__s, (f = n.__r) && f(t), a.__d = !1, a.__v = t, a.__P = e, f = a.render(a.props, a.state, a.context), a.state = a.__s, null != a.getChildContext && (l = c(c({}, l), a.getChildContext())), d || null == a.getSnapshotBeforeUpdate || (k = a.getSnapshotBeforeUpdate(h, v)), P = null != f && f.type === y && null == f.key ? f.props.children : f, m(e, Array.isArray(P) ? P : [P], t, _, l, o, r, i, u, s), a.base = t.__e, t.__h = null, a.__h.length && i.push(a), g && (a.__E = a.__ = null), a.__e = !1;
    }
    else
        null == r && t.__v === _.__v ? (t.__k = _.__k, t.__e = _.__e) : t.__e = j(_.__e, t, _, l, o, r, i, s);
    (f = n.diffed) && f(t);
}
catch (e) {
    t.__v = null, (s || null != r) && (t.__e = u, t.__h = !!s, r[r.indexOf(u)] = null), n.__e(e, t, _);
} }
function T(e, t) { n.__c && n.__c(t, e), e.some(function (t) { try {
    e = t.__h, t.__h = [], e.some(function (e) { e.call(t); });
}
catch (e) {
    n.__e(e, t.__v);
} }); }
function j(e, n, t, _, l, o, i, u) { var c, p, a, d, h = t.props, v = n.props, y = n.type, k = 0; if ("svg" === y && (l = !0), null != o)
    for (; k < o.length; k++)
        if ((c = o[k]) && (c === e || (y ? c.localName == y : 3 == c.nodeType))) {
            e = c, o[k] = null;
            break;
        } if (null == e) {
    if (null === y)
        return document.createTextNode(v);
    e = l ? document.createElementNS("http://www.w3.org/2000/svg", y) : document.createElement(y, v.is && v), o = null, u = !1;
} if (null === y)
    h === v || u && e.data === v || (e.data = v);
else {
    if (o = o && f.slice.call(e.childNodes), p = (h = t.props || r).dangerouslySetInnerHTML, a = v.dangerouslySetInnerHTML, !u) {
        if (null != o)
            for (h = {}, d = 0; d < e.attributes.length; d++)
                h[e.attributes[d].name] = e.attributes[d].value;
        (a || p) && (a && (p && a.__html == p.__html || a.__html === e.innerHTML) || (e.innerHTML = a && a.__html || ""));
    }
    if (A(e, v, h, l, u), a)
        n.__k = [];
    else if (k = n.props.children, m(e, Array.isArray(k) ? k : [k], n, t, _, l && "foreignObject" !== y, o, i, e.firstChild, u), null != o)
        for (k = o.length; k--;)
            null != o[k] && s(o[k]);
    u || ("value" in v && void 0 !== (k = v.value) && (k !== e.value || "progress" === y && !k) && C(e, "value", k, h.value, !1), "checked" in v && void 0 !== (k = v.checked) && k !== e.checked && C(e, "checked", k, h.checked, !1));
} return e; }
function z(e, t, _) { try {
    "function" == typeof e ? e(t) : e.current = t;
}
catch (e) {
    n.__e(e, _);
} }
function L(e, t, _) { var l, o, r; if (n.unmount && n.unmount(e), (l = e.ref) && (l.current && l.current !== e.__e || z(l, null, t)), _ || "function" == typeof e.type || (_ = null != (o = e.__e)), e.__e = e.__d = void 0, null != (l = e.__c)) {
    if (l.componentWillUnmount)
        try {
            l.componentWillUnmount();
        }
        catch (e) {
            n.__e(e, t);
        }
    l.base = l.__P = null;
} if (l = e.__k)
    for (r = 0; r < l.length; r++)
        l[r] && L(l[r], t, _); null != o && s(o); }
function M(e, n, t) { return this.constructor(e, t); }
function N(e, t, _) { var l, o, i; n.__ && n.__(e, t), o = (l = "function" == typeof _) ? null : _ && _.__k || t.__k, i = [], I(t, e = (!l && _ || t).__k = a(y, null, [e]), o || r, r, void 0 !== t.ownerSVGElement, !l && _ ? [_] : o ? null : t.firstChild ? f.slice.call(t.childNodes) : null, i, !l && _ ? _ : o ? o.__e : t.firstChild, l), T(i, e); }
function O(e, n) { N(e, n, O); }
function S(e, n, t) { var _, l, o, r = arguments, i = c({}, e.props); for (o in n)
    "key" == o ? _ = n[o] : "ref" == o ? l = n[o] : i[o] = n[o]; if (arguments.length > 3)
    for (t = [t], o = 3; o < arguments.length; o++)
        t.push(r[o]); return null != t && (i.children = t), v(e.type, i, _ || e.key, l || e.ref, null); }
function q(e, n) { var t = { __c: n = "__cC" + o++, __: e, Consumer: function (e, n) { return e.children(n); }, Provider: function (e) { var t, _; return this.getChildContext || (t = [], (_ = {})[n] = this, this.getChildContext = function () { return _; }, this.shouldComponentUpdate = function (e) { this.props.value !== e.value && t.some(k); }, this.sub = function (e) { t.push(e); var n = e.componentWillUnmount; e.componentWillUnmount = function () { t.splice(t.indexOf(e), 1), n && n.call(e); }; }), e.children; } }; return t.Provider.__ = t.Consumer.contextType = t; }
exports.options = n = { __e: function (e, n) { for (var t, _, l; n = n.__;)
        if ((t = n.__c) && !t.__)
            try {
                if ((_ = t.constructor) && null != _.getDerivedStateFromError && (t.setState(_.getDerivedStateFromError(e)), l = t.__d), null != t.componentDidCatch && (t.componentDidCatch(e), l = t.__d), l)
                    return t.__E = t;
            }
            catch (n) {
                e = n;
            } throw e; }, __v: 0 }, exports.isValidElement = l = function (e) { return null != e && void 0 === e.constructor; }, p.prototype.setState = function (e, n) { var t; t = null != this.__s && this.__s !== this.state ? this.__s : this.__s = c({}, this.state), "function" == typeof e && (e = e(c({}, t), this.props)), e && c(t, e), null != e && this.__v && (n && this.__h.push(n), k(this)); }, p.prototype.forceUpdate = function (e) { this.__v && (this.__e = !0, e && this.__h.push(e), k(this)); }, p.prototype.render = y, u = [], i = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, b.__r = 0, o = 0;

},"business-config.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessConfig = void 0;

exports.businessConfig = {
    name: 'Flete · Demo',
    tagline: 'Transporte a tu medida',
    phone: '',
    whatsapp: '',
    email: '',
    colors: {
        ink: '#253b35',
        paper: '#ffffff',
        accent: '#a14f32',
        muted: '#65716a',
        line: '#e1e5de',
        soft: '#f2f4ef',
    },
    coverage: null,
    hours: null,
    pricingMode: 'quote_only',
    vehiclesDemo: true,
    driversDemo: true,
    services: {
        freight: {
            id: 'freight',
            label: 'Flete / carga',
            heroTitle: 'Fletes y cargas',
            intro: 'Muebles, cajas y mercadería.',
            detail: 'Indicá el tamaño, sumá fotos y contanos si necesitás ayuda para cargar.',
            icon: 'truck',
            sizes: ['Pequeña', 'Mediana', 'Grande', 'No sé'],
        },
        passengers: {
            id: 'passengers',
            label: 'Traslado de pasajeros',
            heroTitle: 'Traslado de pasajeros',
            intro: 'Solo, en grupo o con equipaje.',
            detail: 'Elegí la cantidad de pasajeros y coordiná un viaje de ida o ida y vuelta.',
            icon: 'users',
            luggage: ['Sin equipaje', 'Mochilas / bolsos', 'Valijas', 'Equipaje especial'],
        },
        special: {
            id: 'special',
            label: 'Otro traslado',
            heroTitle: 'Traslados especiales',
            intro: 'Un recorrido fuera de lo habitual.',
            detail: 'Describí lo que necesitás para que podamos evaluar una solución a medida.',
            icon: 'route',
        },
    },
    assurances: [
        { icon: 'check', text: 'Cotización antes de confirmar' },
        { icon: 'lock', text: 'Sin crear una cuenta' },
        { icon: 'route', text: 'Consultar el estado' },
        { icon: 'message', text: 'Coordinación con el operador' },
    ],
    vehicles: [
        { name: 'Furgón · DEMO', plate: 'DEMO-01', type: 'van', capacity: 'Carga mediana · dato demo', seats: 2 },
        { name: 'Combi · DEMO', plate: 'DEMO-02', type: 'minibus', capacity: '8 pasajeros · dato demo', seats: 8 },
        { name: 'Camioneta utilitaria · DEMO', plate: 'DEMO-03', type: 'pickup', capacity: 'Caja abierta · dato demo', seats: 4 },
    ],
    contactCopy: {
        actionText: 'Consultar por WhatsApp',
        quoteMessageIntro: 'Hola, te escribimos desde la demo de Flete.',
        helpPrompt: '¿Necesitás cambiar algo del recorrido o la fecha?',
    }
};

},"domain.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.businessConfig = exports.defaultConfig = exports.activeStatuses = exports.transitions = exports.serviceLabels = exports.labels = exports.statuses = exports.kinds = void 0;
exports.blankPayload = blankPayload;
exports.normalizePhone = normalizePhone;
exports.validatePayload = validatePayload;
exports.cleanPayload = cleanPayload;
exports.mutationError = mutationError;
exports.money = money;
exports.parseMoney = parseMoney;
exports.dateText = dateText;
exports.argentinaDay = argentinaDay;
exports.whatsappUrl = whatsappUrl;
exports.directionsUrl = directionsUrl;
exports.quoteMessage = quoteMessage;
exports.randomToken = randomToken;
exports.randomId = randomId;

const business_config_1 = require("./business-config.js");
exports.businessConfig = business_config_1.businessConfig;

exports.kinds = ['freight', 'passengers', 'special'];
exports.statuses = ['new', 'reviewing', 'quoted', 'confirmed', 'en_route', 'in_service', 'completed', 'cancelled'];
exports.labels = {
    new: 'Nueva', reviewing: 'Revisando', quoted: 'Cotizada', confirmed: 'Confirmada',
    en_route: 'En camino', in_service: 'En servicio', completed: 'Finalizada', cancelled: 'Cancelada',
};
exports.serviceLabels = {
    freight: 'Flete / carga', passengers: 'Traslado de pasajeros', special: 'Otro traslado',
};
exports.transitions = {
    new: ['reviewing', 'quoted', 'cancelled'], reviewing: ['quoted', 'cancelled'],
    quoted: ['reviewing', 'confirmed', 'cancelled'], confirmed: ['en_route', 'cancelled'],
    en_route: ['in_service', 'cancelled'], in_service: ['completed', 'cancelled'], completed: [], cancelled: [],
};
exports.activeStatuses = ['confirmed', 'en_route', 'in_service'];
exports.defaultConfig = {
    name: business_config_1.businessConfig.name,
    whatsapp: business_config_1.businessConfig.whatsapp,
    email: business_config_1.businessConfig.email,
    demo_mode: true,
    coverage: business_config_1.businessConfig.coverage,
    hours: business_config_1.businessConfig.hours,
    pricingMode: business_config_1.businessConfig.pricingMode,
    vehiclesDemo: business_config_1.businessConfig.vehiclesDemo,
    driversDemo: business_config_1.businessConfig.driversDemo,
};

function blankPayload() {
    return { kind: 'freight', origin: '', destination: '', when: 'asap', scheduled_at: null,
        details: { description: '', cargo_size: 'No sé', quantity: 1, needs_help: false, helpers: 1,
            passengers: 1, luggage: 'Sin equipaje', round_trip: false, return_at: null, notes: '' },
        contact: { name: '', phone: '', whatsapp: '', email: '', consent: false } };
}

function normalizePhone(value) {
    const clean = value.trim().replace(/[\s().-]/g, '');
    if (!/^\+?[1-9]\d{7,14}$/.test(clean))
        return '';
    return clean.startsWith('+') ? clean : `+${clean}`;
}

function validatePayload(input, now = Date.now()) {
    const e = {};
    if (!input || typeof input !== 'object')
        return { form: 'La solicitud no es válida.' };
    const p = input;
    if (!exports.kinds.includes(p.kind))
        e.kind = 'Elegí un servicio.';
    for (const field of ['origin', 'destination']) {
        const value = p[field];
        if (typeof value !== 'string' || value.trim().length < 4 || value.trim().length > 240)
            e[field] = 'Escribí una dirección y localidad (4 a 240 caracteres).';
    }
    if (typeof p.origin === 'string' && typeof p.destination === 'string' &&
        p.origin.trim().toLowerCase() === p.destination.trim().toLowerCase())
        e.destination = 'El destino debe ser diferente del origen.';
    if (p.when !== 'asap' && p.when !== 'scheduled')
        e.when = 'Elegí cuándo necesitás el servicio.';
    if (p.when === 'scheduled') {
        const t = Date.parse(p.scheduled_at ?? '');
        if (!Number.isFinite(t) || t < now + 5 * 60_000 || t > now + 365 * 86400_000)
            e.scheduled_at = 'Elegí una fecha futura: desde 5 minutos y hasta un año.';
    }
    const d = p.details;
    if (!d || typeof d !== 'object')
        e.details = 'Completá los detalles del servicio.';
    else {
        if (typeof d.notes !== 'string' || d.notes.length > 1500)
            e.notes = 'Usá hasta 1.500 caracteres.';
        if (p.kind === 'freight' || p.kind === 'special') {
            if (typeof d.description !== 'string' || d.description.trim().length < 5 || d.description.length > 1500)
                e.description = 'Contanos qué necesitás transportar (5 a 1.500 caracteres).';
        }
        if (p.kind === 'freight') {
            if (!['Pequeña', 'Mediana', 'Grande', 'No sé'].includes(d.cargo_size))
                e.cargo_size = 'Indicá el tamaño aproximado.';
            if (!Number.isInteger(d.quantity) || d.quantity < 1 || d.quantity > 500)
                e.quantity = 'Indicá entre 1 y 500 bultos.';
            if (typeof d.needs_help !== 'boolean')
                e.needs_help = 'Indicá si necesitás ayuda.';
            if (d.needs_help && (!Number.isInteger(d.helpers) || d.helpers < 1 || d.helpers > 10))
                e.helpers = 'Indicá entre 1 y 10 personas.';
        }
        if (p.kind === 'passengers') {
            if (!Number.isInteger(d.passengers) || d.passengers < 1 || d.passengers > 60)
                e.passengers = 'Indicá entre 1 y 60 pasajeros.';
            if (typeof d.luggage !== 'string' || d.luggage.trim().length < 2 || d.luggage.length > 200)
                e.luggage = 'Indicá el equipaje.';
            if (typeof d.round_trip !== 'boolean')
                e.round_trip = 'Indicá si necesitás regreso.';
            if (d.round_trip) {
                const back = Date.parse(d.return_at ?? '');
                const out = p.when === 'scheduled' ? Date.parse(p.scheduled_at ?? '') : now;
                if (!Number.isFinite(back) || back <= out || back > now + 366 * 86400_000)
                    e.return_at = 'El regreso debe ser posterior a la salida y dentro de un año.';
            }
        }
    }
    const c = p.contact;
    if (!c || typeof c !== 'object')
        e.contact = 'Completá tus datos de contacto.';
    else {
        if (typeof c.name !== 'string' || c.name.trim().length < 2 || c.name.length > 100)
            e.name = 'Escribí tu nombre (2 a 100 caracteres).';
        if (typeof c.phone !== 'string' || !normalizePhone(c.phone))
            e.phone = 'Usá código de país. Ejemplo: +54 9 299 123 4567.';
        if (typeof c.whatsapp !== 'string' || (c.whatsapp && !normalizePhone(c.whatsapp)))
            e.whatsapp = 'Revisá el WhatsApp y su código de país.';
        if (typeof c.email !== 'string' || (c.email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) || c.email.length > 254)))
            e.email = 'Revisá el correo electrónico.';
        if (c.consent !== true)
            e.consent = 'Necesitamos tu autorización para coordinar esta solicitud.';
    }
    return e;
}

function cleanPayload(p) {
    const blank = blankPayload().details;
    const specific = p.kind === 'freight' ? { description: p.details.description.trim(), cargo_size: p.details.cargo_size,
        quantity: p.details.quantity, needs_help: p.details.needs_help, helpers: p.details.needs_help ? p.details.helpers : 1 }
        : p.kind === 'passengers' ? { passengers: p.details.passengers, luggage: p.details.luggage.trim(),
            round_trip: p.details.round_trip, return_at: p.details.round_trip ? p.details.return_at : null }
            : { description: p.details.description.trim() };
    return { kind: p.kind, origin: p.origin.trim(), destination: p.destination.trim(), when: p.when,
        scheduled_at: p.when === 'scheduled' ? p.scheduled_at : null,
        details: { ...blank, ...specific, notes: p.details.notes.trim() },
        contact: { name: p.contact.name.trim(), phone: normalizePhone(p.contact.phone),
            whatsapp: normalizePhone(p.contact.whatsapp || p.contact.phone), email: p.contact.email.trim(), consent: true } };
}

function mutationError(request, mutation, vehicles) {
    if ((request.status === 'completed' || request.status === 'cancelled') && mutation.action !== 'note')
        return 'El servicio está cerrado. Sólo se pueden agregar notas internas.';
    switch (mutation.action) {
        case 'status':
            if (!exports.transitions[request.status].includes(mutation.status))
                return 'Ese cambio de estado no está permitido.';
            if (mutation.status === 'cancelled' && (!mutation.reason || mutation.reason.trim().length < 5))
                return 'Indicá un motivo de al menos 5 caracteres.';
            if ((mutation.status === 'quoted' || mutation.status === 'confirmed') && !(request.quote_cents && request.quote_cents > 0))
                return 'Guardá una cotización antes de confirmar.';
            if (mutation.status === 'en_route' && !request.vehicle_id)
                return 'Asigná un vehículo antes de iniciar el viaje.';
            return null;
        case 'quote':
            if (!['new', 'reviewing', 'quoted'].includes(request.status))
                return 'No se puede recotizar un servicio ya confirmado.';
            if (!Number.isSafeInteger(mutation.quote_cents) || mutation.quote_cents <= 0 || mutation.quote_cents > 10_000_000_000)
                return 'Ingresá un importe positivo de hasta $100.000.000.';
            return null;
        case 'assign': {
            if (['en_route', 'in_service'].includes(request.status))
                return 'No se puede cambiar el vehículo durante el servicio.';
            if (mutation.vehicle_id === null)
                return null;
            const vehicle = vehicles.find(v => v.id === mutation.vehicle_id);
            if (!vehicle || !vehicle.active)
                return 'Seleccioná un vehículo activo.';
            if (request.payload.kind === 'passengers' && vehicle.seats < request.payload.details.passengers)
                return 'El vehículo no tiene suficientes asientos.';
            return null;
        }
        case 'note': return typeof mutation.text !== 'string' || mutation.text.trim().length < 2 || mutation.text.length > 2000 ? 'La nota debe tener entre 2 y 2.000 caracteres.' : null;
        case 'edit': return ['en_route', 'in_service'].includes(request.status) ? 'No se puede modificar el recorrido de un servicio en curso.' : null;
    }
}

function money(cents) {
    return cents === null ? 'A cotizar' : new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: cents % 100 === 0 ? 0 : 2, maximumFractionDigits: 2 }).format(cents / 100);
}

function parseMoney(value) {
    const v = value.trim().replace(/\s/g, '');
    if (!/^\d+(?:,\d{1,2})?$/.test(v))
        return null;
    const [whole = '0', frac = ''] = v.split(',');
    const result = Number(whole) * 100 + Number(frac.padEnd(2, '0'));
    return Number.isSafeInteger(result) && result > 0 && result <= 10_000_000_000 ? result : null;
}

function dateText(value, compact = false) {
    if (!value)
        return 'Lo antes posible';
    const d = new Date(value);
    if (!Number.isFinite(d.getTime()))
        return 'Fecha no disponible';
    return new Intl.DateTimeFormat('es-AR', { timeZone: 'America/Argentina/Buenos_Aires',
        day: '2-digit', month: compact ? '2-digit' : 'short', hour: '2-digit', minute: '2-digit', hour12: false }).format(d);
}

function argentinaDay(value) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Argentina/Buenos_Aires', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value));
}

function whatsappUrl(phone, message) {
    const normalized = normalizePhone(phone);
    return normalized ? `https://wa.me/${normalized.slice(1)}?text=${encodeURIComponent(message)}` : null;
}

function directionsUrl(origin, destination) {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`;
}

function quoteMessage(request, business) {
    return `Hola ${request.payload.contact.name}, te escribimos de ${business}. La cotización de tu solicitud ${request.code} (${exports.serviceLabels[request.payload.kind]}), de ${request.payload.origin} a ${request.payload.destination}, es ${money(request.quote_cents)} ARS. Fecha: ${dateText(request.payload.scheduled_at)}. Respondé este mensaje para coordinar y definir las condiciones del servicio. El servicio todavía no está confirmado.`;
}

function randomToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)), n => n.toString(16).padStart(2, '0')).join('');
}

function randomId() {
    if (typeof crypto.randomUUID === 'function')
        return crypto.randomUUID();
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = ((bytes[6] ?? 0) & 15) | 64;
    bytes[8] = ((bytes[8] ?? 0) & 63) | 128;
    const h = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

},"build-mode.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_PREVIEW = void 0;
exports.IS_PREVIEW = true;

},"preview-store.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewApi = void 0;
const domain_js_1 = require("./domain.js");
const DATABASE = 'flete-commercial-preview-v3';
const now = () => new Date().toISOString();
const failure = (status, message) => Object.assign(new Error(message), { status });
let database;
let memory = null;
const objectUrls = new Map();
function db() {
    if (!database)
        database = new Promise((resolve, reject) => {
            if (typeof indexedDB === 'undefined') {
                reject(failure(503, 'Este navegador no permite guardar la demo. Abrila en Safari, Chrome o Edge.'));
                return;
            }
            const request = indexedDB.open(DATABASE, 1);
            request.onupgradeneeded = () => request.result.createObjectStore('data');
            request.onsuccess = () => { request.result.onversionchange = () => request.result.close(); resolve(request.result); };
            request.onerror = () => { database = undefined; reject(failure(503, 'No se pudo abrir el almacenamiento de la demo. Revisá los permisos del navegador.')); };
            request.onblocked = () => reject(failure(503, 'Cerrá las otras pestañas de esta demo y volvé a abrirla.'));
        });
    return database;
}
function history(data, r, action) {
    (data.history[r.id] ??= []).push({ id: (0, domain_js_1.randomId)(), status: r.status, action, created_at: now() });
}
function customer(data, p) {
    let c = data.customers.find(item => item.phone === p.contact.phone);
    if (!c) {
        c = { id: (0, domain_js_1.randomId)(), name: p.contact.name, phone: p.contact.phone, created_at: now(), request_count: 0 };
        data.customers.push(c);
    }
    return c;
}
function insert(data, p, token) {
    const id = (0, domain_js_1.randomId)();
    const r = { id, code: `FL-${id.replaceAll('-', '').slice(0, 8).toUpperCase()}`, payload: (0, domain_js_1.cleanPayload)(p),
        status: 'new', quote_cents: null, customer_id: customer(data, p).id, vehicle_id: null, version: 1, is_demo: true,
        created_at: now(), updated_at: now(), tracking_expires_at: new Date(Date.now() + 90 * 86400000).toISOString() };
    data.requests.unshift(r);
    data.tokens[token] = id;
    history(data, r, 'Solicitud de prueba recibida');
    return r;
}
function seed() {
    const data = { schema: 3, business: { ...domain_js_1.defaultConfig }, requests: [], vehicles: [], customers: [], history: {}, notes: {}, photos: [], tokens: {} };
    data.vehicles = [
        { name: 'Furgón · DEMO', plate: 'DEMO-01', type: 'van', capacity: 'Carga mediana · dato demo', seats: 2 },
        { name: 'Combi · DEMO', plate: 'DEMO-02', type: 'minibus', capacity: '8 pasajeros · dato demo', seats: 8 },
        { name: 'Camioneta utilitaria · DEMO', plate: 'DEMO-03', type: 'pickup', capacity: 'Caja abierta · dato demo', seats: 4 },
    ].map(v => ({ ...v, type: v.type, id: (0, domain_js_1.randomId)(), active: true, notes: 'Vehículo ficticio para recorrer la demo.', is_demo: true, version: 1 }));
    const samples = [
        ['freight', 'new', 'Domicilio de retiro', 'Domicilio de entrega', 'Una heladera y cuatro cajas medianas', null, 1],
        ['passengers', 'quoted', 'Punto de encuentro', 'Alojamiento de destino', '', 9500000, 4],
        ['freight', 'reviewing', 'Local de muebles', 'Domicilio del cliente', 'Dos muebles de madera', null, 1],
        ['passengers', 'confirmed', 'Alojamiento de salida', 'Terminal de destino', '', 18000000, 3],
        ['special', 'new', 'Depósito de equipos', 'Salón del evento', 'Equipamiento para un evento', null, 1],
        ['freight', 'in_service', 'Ferretería de origen', 'Obra de destino', 'Artículos de ferretería', 4200000, 1],
        ['freight', 'completed', 'Domicilio de retiro', 'Nueva vivienda', 'Mesa y seis sillas', 3500000, 1],
        ['passengers', 'completed', 'Terminal de salida', 'Punto de encuentro', '', 2800000, 2],
        ['special', 'cancelled', 'Depósito de origen', 'Local de entrega', 'Traslado de equipos', 6000000, 1],
    ];
    samples.forEach(([kind, status, origin, destination, description, price, passengers], i) => {
        const p = (0, domain_js_1.blankPayload)();
        p.kind = kind;
        p.origin = origin;
        p.destination = destination;
        p.details.description = description;
        p.details.passengers = passengers;
        p.contact = { name: ['Carolina R.', 'Matías L.', 'Lucía G.', 'Diego M.', 'Valentina S.', 'Nicolás P.', 'Julieta A.', 'Gabriel T.', 'Camila V.'][i], phone: `+5400000000${10 + i}`, whatsapp: '', email: 'demo@example.invalid', consent: true };
        p.when = i === 0 ? 'asap' : 'scheduled';
        p.scheduled_at = p.when === 'asap' ? null : new Date(Date.now() + (i < 5 ? (i + 1) * 3600000 : -(i - 4) * 86400000)).toISOString();
        const r = insert(data, (0, domain_js_1.cleanPayload)(p), (0, domain_js_1.randomToken)());
        r.status = status;
        r.quote_cents = price;
        r.created_at = new Date(Date.now() - (i + 1) * 1400000).toISOString();
        if (status === 'confirmed' || status === 'in_service')
            r.vehicle_id = data.vehicles.find(v => v.type === (kind === 'passengers' ? 'minibus' : 'van'))?.id ?? null;
        if (status !== 'new')
            history(data, r, 'Estado de ejemplo');
    });
    return data;
}
async function transaction(write, fn) {
    if (memory) {
        const working = structuredClone(memory);
        const result = fn(working);
        if (write)
            memory = working;
        return structuredClone(result);
    }
    let connection;
    try {
        connection = await db();
    }
    catch {
        memory = seed();
        return transaction(write, fn);
    }
    return new Promise((resolve, reject) => {
        const tx = connection.transaction('data', 'readwrite');
        const store = tx.objectStore('data');
        const request = store.get('state');
        let result;
        let specificError;
        request.onsuccess = () => {
            try {
                const existing = request.result;
                const data = existing?.schema === 3 ? existing : seed();
                result = fn(data);
                if (write || existing?.schema !== 3)
                    store.put(data, 'state');
            }
            catch (error) {
                specificError = error;
                tx.abort();
            }
        };
        tx.oncomplete = () => resolve(result);
        tx.onabort = () => reject(specificError ?? failure(503, 'No se guardó el cambio. El almacenamiento del navegador no está disponible o está lleno.'));
        tx.onerror = () => { };
    });
}
function requestById(data, id) {
    const r = data.requests.find(item => item.id === id);
    if (!r)
        throw failure(404, 'No encontramos esa solicitud en esta demo.');
    return r;
}
function requestByToken(data, token) {
    const id = /^[a-f0-9]{64}$/.test(token) ? data.tokens[token] : undefined;
    if (!id)
        throw failure(404, 'Ese enlace no está en este navegador. Los datos de la demo no se comparten entre dispositivos.');
    const r = requestById(data, id);
    if (Date.parse(r.tracking_expires_at) < Date.now())
        throw failure(404, 'El enlace ya venció.');
    return r;
}
function detail(data, id) {
    const photos = data.photos.filter(p => p.request_id === id);
    for (const photo of photos)
        if (!objectUrls.has(photo.id))
            objectUrls.set(photo.id, URL.createObjectURL(photo.blob));
    return { request: requestById(data, id), history: data.history[id] ?? [], notes: data.notes[id] ?? [],
        attachments: photos.map(({ id, name, mime, size, created_at }) => ({ id, name, mime, size, created_at })) };
}
function publicTracking(data, r) {
    const unit = ['confirmed', 'en_route', 'in_service', 'completed'].includes(r.status) ? data.vehicles.find(v => v.id === r.vehicle_id) : undefined;
    return { code: r.code, kind: r.payload.kind, origin: r.payload.origin, destination: r.payload.destination,
        scheduled_at: r.payload.scheduled_at, status: r.status, quote_cents: r.quote_cents, created_at: r.created_at,
        updated_at: r.updated_at, is_demo: true, request_version: r.version, quote_accepted_at: r.quote_accepted_at ?? null,
        vehicle: unit ? { name: unit.name, type: unit.type, capacity: unit.capacity, seats: unit.seats } : null,
        history: (data.history[r.id] ?? []).filter(event => !/Nota|Vehículo|asignación/i.test(event.action)) };
}
exports.previewApi = {
    config: () => transaction(false, data => ({ mode: 'preview', temporary: memory !== null, business: data.business })),
    session: async () => ({ user: { id: 'preview-operator', email: 'Operador de demostración' } }),
    login: async (_email, _password) => ({ user: { id: 'preview-operator', email: 'Operador de demostración' } }),
    logout: async () => ({ ok: true }),
    create: (p, token, website) => transaction(true, data => {
        if (website)
            throw failure(422, 'Solicitud no válida.');
        const errors = (0, domain_js_1.validatePayload)(p);
        if (Object.keys(errors).length)
            throw failure(422, Object.values(errors)[0] ?? 'Revisá los datos.');
        if (!/^[a-f0-9]{64}$/.test(token))
            throw failure(422, 'El identificador de la solicitud no es válido.');
        const payload = (0, domain_js_1.cleanPayload)(p);
        const previous = data.tokens[token];
        if (previous) {
            const r = requestById(data, previous);
            if (JSON.stringify(r.payload) !== JSON.stringify(payload))
                throw failure(409, 'Ya existe ese envío con otros datos. Empezá una solicitud nueva.');
            return { id: r.id, code: r.code, created: false, is_demo: true };
        }
        if (data.requests.length >= 250)
            throw failure(422, 'La demo llegó a 250 solicitudes. Reiniciala para seguir probando.');
        const r = insert(data, payload, token);
        r.created_by_visitor = true;
        return { id: r.id, code: r.code, created: true, is_demo: true };
    }),
    recentRequests: () => transaction(false, data => data.requests
        .filter(r => r.created_by_visitor && Date.parse(r.tracking_expires_at) > Date.now())
        .slice(0, 20).map(r => ({ code: r.code, status: r.status, origin: r.payload.origin,
            destination: r.payload.destination, token: Object.keys(data.tokens).find(t => data.tokens[t] === r.id) }))),
    track: (token) => transaction(false, data => publicTracking(data, requestByToken(data, token))),
    acceptQuote: (token, expectedVersion, expectedQuote) => transaction(true, data => {
        const r = requestByToken(data, token);
        if (r.status !== 'quoted' || r.quote_cents === null)
            throw failure(409, 'Esta cotización ya no está disponible para aceptar. Revisá el estado actualizado.');
        if (r.quote_cents !== expectedQuote)
            throw failure(409, 'El importe cambió. Revisá la nueva cotización antes de aceptarla.');
        if (r.quote_accepted_at)
            return publicTracking(data, r);
        if (r.version !== expectedVersion)
            throw failure(409, 'La solicitud cambió. Revisá la información actualizada antes de aceptar.');
        r.quote_accepted_at = now();
        r.version++;
        r.updated_at = now();
        history(data, r, 'Cotización aceptada por el cliente; pendiente de confirmación');
        return publicTracking(data, r);
    }),
    dashboard: () => transaction(false, data => ({ requests: data.requests.slice().sort((a, b) => b.created_at.localeCompare(a.created_at)),
        vehicles: data.vehicles, business: data.business,
        customers: data.customers.map(c => ({ ...c, request_count: data.requests.filter(r => r.customer_id === c.id).length })) })),
    detail: (id) => transaction(false, data => detail(data, id)),
    mutate: (id, version, mutation) => transaction(true, data => {
        const r = requestById(data, id);
        if (r.version !== version)
            throw failure(409, 'La solicitud cambió en otra pestaña. Actualizá el panel.');
        const error = (0, domain_js_1.mutationError)(r, mutation, data.vehicles);
        if (error)
            throw failure(422, error);
        let action = '';
        if (mutation.action === 'status') {
            if (mutation.status === 'en_route') {
                if (!data.vehicles.find(v => v.id === r.vehicle_id)?.active)
                    throw failure(422, 'El vehículo ya no está activo.');
                if (data.requests.some(item => item.id !== id && item.vehicle_id === r.vehicle_id && ['en_route', 'in_service'].includes(item.status)))
                    throw failure(409, 'Ese vehículo ya está realizando otro servicio.');
            }
            r.status = mutation.status;
            action = domain_js_1.labels[r.status];
            if (r.status === 'reviewing') {
                r.quote_cents = null;
                r.quote_accepted_at = null;
            }
            if (r.status === 'cancelled')
                (data.notes[id] ??= []).unshift({ id: (0, domain_js_1.randomId)(), text: `Cancelación: ${mutation.reason?.trim() ?? ''}`, created_at: now() });
        }
        else if (mutation.action === 'quote') {
            r.quote_cents = mutation.quote_cents;
            r.quote_accepted_at = null;
            r.status = 'quoted';
            action = 'Cotización guardada';
        }
        else if (mutation.action === 'assign') {
            r.vehicle_id = mutation.vehicle_id;
            action = 'Vehículo asignado';
        }
        else if (mutation.action === 'note') {
            (data.notes[id] ??= []).unshift({ id: (0, domain_js_1.randomId)(), text: mutation.text.trim(), created_at: now() });
            action = 'Nota interna agregada';
        }
        else if (mutation.action === 'edit') {
            const errors = (0, domain_js_1.validatePayload)(mutation.payload);
            if (Object.keys(errors).length)
                throw failure(422, Object.values(errors)[0] ?? 'Revisá los datos.');
            r.payload = (0, domain_js_1.cleanPayload)(mutation.payload);
            r.customer_id = customer(data, r.payload).id;
            r.status = 'reviewing';
            r.quote_cents = null;
            r.quote_accepted_at = null;
            r.vehicle_id = null;
            action = 'Datos corregidos; requiere nueva cotización';
        }
        r.version++;
        r.updated_at = now();
        history(data, r, action);
        return detail(data, id);
    }),
    vehicle: (vehicle) => transaction(true, data => {
        if (vehicle.name.trim().length < 2 || vehicle.name.length > 80 || vehicle.plate.trim().length < 3 || vehicle.plate.length > 20 ||
            !['pickup', 'van', 'car', 'minibus'].includes(vehicle.type) || !Number.isInteger(vehicle.seats) || vehicle.seats < 0 || vehicle.seats > 60 ||
            vehicle.capacity.length > 160 || vehicle.notes.length > 2000)
            throw failure(422, 'Revisá nombre, patente, capacidad y asientos del vehículo.');
        const old = data.vehicles.find(v => v.id === vehicle.id);
        if (vehicle.id && !old)
            throw failure(404, 'El vehículo ya no existe.');
        if (old && old.version !== vehicle.version)
            throw failure(409, 'El vehículo cambió en otra pestaña. Actualizá el panel.');
        if (old && data.requests.some(r => r.vehicle_id === old.id && ['confirmed', 'en_route', 'in_service'].includes(r.status)))
            throw failure(409, 'No se puede editar un vehículo con servicios confirmados o en curso.');
        const plate = vehicle.plate.trim().toUpperCase();
        if (data.vehicles.some(v => v.id !== vehicle.id && v.plate.toUpperCase() === plate))
            throw failure(409, 'Ya existe esa patente.');
        const result = { ...vehicle, plate, name: vehicle.name.trim(), id: old?.id ?? (0, domain_js_1.randomId)(), version: (old?.version ?? 0) + 1, is_demo: true };
        data.vehicles = old ? data.vehicles.map(v => v.id === old.id ? result : v) : [...data.vehicles, result];
        return result;
    }),
    business: (business) => transaction(true, data => {
        if (business.name.trim().length < 2 || business.name.length > 60 || (business.coverage ?? '').length > 400 ||
            (business.whatsapp && !(0, domain_js_1.normalizePhone)(business.whatsapp)) || (business.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email)))
            throw failure(422, 'Revisá los datos del negocio.');
        data.business = { ...business, name: business.name.trim(), demo_mode: true };
        return data.business;
    }),
    upload: (token, id, blob) => transaction(true, data => {
        const r = requestByToken(data, token);
        if (r.status !== 'new' || Date.parse(r.created_at) + 1800000 < Date.now())
            throw failure(403, 'La carga de fotos se cerró.');
        if (r.payload.kind !== 'freight')
            throw failure(422, 'Las fotos corresponden a solicitudes de carga.');
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(blob.type) || blob.size > 2 * 1024 * 1024 || blob.size === 0)
            throw failure(422, 'Usá fotos JPG, PNG o WebP de hasta 2 MB.');
        const duplicate = data.photos.find(p => p.id === id);
        if (duplicate) {
            if (duplicate.request_id !== r.id)
                throw failure(409, 'La foto ya existe.');
            return;
        }
        if (data.photos.filter(p => p.request_id === r.id).length >= 3)
            throw failure(422, 'Se permiten hasta tres fotos.');
        data.photos.push({ id, request_id: r.id, name: `Carga ${data.photos.filter(p => p.request_id === r.id).length + 1}`, mime: blob.type, size: blob.size, created_at: now(), blob });
    }),
    fileUrl: (id) => objectUrls.get(id) ?? '',
    tokenFor: (id) => transaction(false, data => Object.entries(data.tokens).find(([, value]) => value === id)?.[0] ?? null),
    reset: () => transaction(true, data => {
        Object.assign(data, seed());
        for (const url of objectUrls.values())
            URL.revokeObjectURL(url);
        objectUrls.clear();
    }),
};

},"api.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewApi = exports.IS_PREVIEW = exports.api = exports.ApiError = void 0;
exports.call = call;
exports.preparePhoto = preparePhoto;
const build_mode_js_1 = require("./build-mode.js");
Object.defineProperty(exports, "IS_PREVIEW", { enumerable: true, get: function () { return build_mode_js_1.IS_PREVIEW; } });
const preview_store_js_1 = require("./preview-store.js");
Object.defineProperty(exports, "previewApi", { enumerable: true, get: function () { return preview_store_js_1.previewApi; } });
const domain_js_1 = require("./domain.js");
class ApiError extends Error {
    status;
    fields;
    constructor(message, status, fields = {}) {
        super(message);
        this.status = status;
        this.fields = fields;
    }
}
exports.ApiError = ApiError;
async function call(path, body) {
    let response;
    try {
        response = await fetch(`/api${path}`, { method: body === undefined ? 'GET' : 'POST', credentials: 'same-origin',
            headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
            body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(25000), cache: 'no-store' });
    }
    catch {
        throw new ApiError('No pudimos conectar. Revisá la conexión y volvé a intentar; el formulario sigue guardado.', 0);
    }
    const data = await response.json().catch(() => ({ error: 'La respuesta del servidor no es válida.' }));
    if (!response.ok)
        throw new ApiError(data.error || 'No se pudo completar la operación.', response.status, data.fields);
    return data;
}
const remoteApi = {
    fileUrl: (id) => `/api/admin/files/${id}`,
    config: () => call('/config'),
    session: () => call('/session'),
    login: (email, password) => call('/login', { email, password }),
    logout: () => call('/logout', {}),
    create: (payload, token, website) => call('/public/requests', { payload, token, website }),
    track: (token) => call('/public/track', { token }),
    dashboard: () => call('/admin/dashboard'),
    detail: (id) => call(`/admin/requests/${id}`),
    mutate: (id, version, mutation) => call(`/admin/requests/${id}`, { version, mutation }),
    vehicle: (vehicle) => call('/admin/vehicles', { vehicle }),
    business: (business) => call('/admin/config', { business }),
    async upload(token, id, blob) {
        let response;
        try {
            response = await fetch(`/api/public/upload/${id}`, { method: 'POST', credentials: 'same-origin',
                headers: { 'x-request-token': token, 'Content-Type': blob.type }, body: blob, signal: AbortSignal.timeout(30000) });
        }
        catch {
            throw new ApiError('La foto no se pudo enviar. La solicitud sí quedó guardada.', 0);
        }
        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new ApiError(data.error || 'No pudimos adjuntar la foto.', response.status);
        }
    },
};
exports.api = build_mode_js_1.IS_PREVIEW ? preview_store_js_1.previewApi : remoteApi;
async function preparePhoto(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type))
        throw new Error('Usá fotos JPG, PNG o WebP. No se admiten PDF, SVG ni HEIC.');
    if (file.size > 15 * 1024 * 1024)
        throw new Error('Cada foto original debe pesar menos de 15 MB.');
    const source = URL.createObjectURL(file);
    try {
        const image = new Image();
        image.src = source;
        await image.decode();
        if (!image.naturalWidth || !image.naturalHeight || image.naturalWidth * image.naturalHeight > 80_000_000)
            throw new Error('La imagen es demasiado grande. Elegí una foto de menor resolución.');
        const factor = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.naturalWidth * factor));
        canvas.height = Math.max(1, Math.round(image.naturalHeight * factor));
        const ctx = canvas.getContext('2d');
        if (!ctx)
            throw new Error('Este navegador no pudo preparar la imagen.');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.82));
        if (!blob || blob.size > 2 * 1024 * 1024)
            throw new Error('La foto sigue siendo muy pesada. Elegí una más pequeña.');
        return { id: (0, domain_js_1.randomId)(), blob, url: URL.createObjectURL(blob), uploaded: false, error: '' };
    }
    finally {
        URL.revokeObjectURL(source);
    }
}

},"ui.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = Icon;
exports.Brand = Brand;
exports.Badge = Badge;
exports.Field = Field;
exports.Notice = Notice;
exports.Empty = Empty;
exports.Loading = Loading;
exports.RouteCard = RouteCard;
exports.TransportArt = TransportArt;
const preact_mjs_1 = require("./vendor/preact.mjs");
const domain_js_1 = require("./domain.js");
const paths = {
    arrow: 'M4 12h16m-6-6 6 6-6 6', back: 'M20 12H4m6-6-6 6 6 6',
    truck: 'M2 6h12v11H2zM14 10h4l4 4v3h-8M5 17a2 2 0 1 0 4 0m7 0a2 2 0 1 0 4 0',
    car: 'm4 10 2-5h12l2 5M3 10h18v8H3zM6 18v2m12-2v2M6 14h2m8 0h2',
    box: 'm12 3 9 5v9l-9 5-9-5V8zM3 8l9 5 9-5M12 13v9M7 5.8l9 5',
    pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0zM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
    clock: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 6v6l4 2',
    check: 'm5 12 4 4L19 6', shield: 'M12 2 3 6v6c0 6 9 10 9 10s9-4 9-10V6zM8 12l3 3 5-6',
    phone: 'M7 3 3 4c0 9 8 17 17 17l1-4-5-3-2 2c-3-1-5-3-6-6l2-2z',
    message: 'M21 11a9 9 0 0 1-9 9H4l-3 2 2-7a9 9 0 1 1 18-4M7 10h10M7 14h6',
    calendar: 'M4 5h16v16H4zM8 2v6m8-6v6M4 11h16',
    search: 'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-2 5 6 6',
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    list: 'M8 5h13M8 12h13M8 19h13M3 5h.1M3 12h.1M3 19h.1',
    users: 'M10 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0M2 21v-2a6 6 0 0 1 12 0v2M18 4a4 4 0 0 1 0 8m0 3a5 5 0 0 1 4 5',
    settings: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2',
    logout: 'M9 3H3v18h6M9 12h12m-5-5 5 5-5 5', plus: 'M12 4v16M4 12h16',
    close: 'm6 6 12 12M6 18 18 6', refresh: 'M20 7V2m0 5h-5M4 17v5m0-5h5M20 7a9 9 0 0 0-15-2M4 17a9 9 0 0 0 15 2',
    copy: 'M8 8h13v13H8zM16 8V3H3v13h5', external: 'M14 3h7v7M21 3 10 14M10 3H3v18h18v-7',
    image: 'M3 3h18v18H3zM3 17l6-6 4 4 3-3 5 5M16 7h.1',
    upload: 'M12 16V3m-5 5 5-5 5 5M3 15v6h18v-6', lock: 'M5 10h14v12H5zM8 10V6a4 4 0 0 1 8 0v4M12 15v3',
    chevron: 'm9 5 7 7-7 7', info: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6m0-10h.1',
    edit: 'm15 4 5 5-11 11-6 1 1-6zM13 6l5 5',
    route: 'M6 7v8a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9M6 7a3 3 0 1 1 0-6 3 3 0 0 1 0 6M18 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6',
    menu: 'M3 6h18M3 12h18M3 18h18', mail: 'M2 4h20v16H2zM2 5l10 8L22 5',
    warning: 'm12 2 11 20H1zM12 9v5m0 3h.1', download: 'M12 3v13m-5-5 5 5 5-5M3 16v5h18v-5',
};
function Icon({ name, size = 20 }) {
    return (0, preact_mjs_1.h)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" }, (0, preact_mjs_1.h)("path", { d: paths[name] }));
}
function Brand({ name = 'Flete', admin = false }) {
    const displayName = name === 'Flete · Demo' ? 'Flete' : name;
    return (0, preact_mjs_1.h)("a", { class: "brand", href: admin ? '#/admin' : '#/', "aria-label": `${name}, inicio` }, (0, preact_mjs_1.h)("span", { class: "brand-mark" }, (0, preact_mjs_1.h)(Icon, { name: "route", size: 25 })), (0, preact_mjs_1.h)("span", { class: "brand-word" }, displayName, (0, preact_mjs_1.h)("span", { class: "brand-caption" }, admin ? 'PANEL DE OPERACIONES' : 'TRANSPORTE A TU MEDIDA')));
}
function Badge({ status }) {
    return (0, preact_mjs_1.h)("span", { class: `badge status-${status}` }, (0, preact_mjs_1.h)("span", { class: "status-dot" }), domain_js_1.labels[status]);
}
function Field({ id, label, error, hint, children }) {
    return (0, preact_mjs_1.h)("div", { class: `field${error ? ' field-error' : ''}` }, (0, preact_mjs_1.h)("label", { for: id }, label), children, error ? (0, preact_mjs_1.h)("span", { class: "field-message", id: `${id}-hint`, role: "alert" }, error) : hint ? (0, preact_mjs_1.h)("span", { class: "field-hint", id: `${id}-hint` }, hint) : null);
}
function Notice({ children, type = 'info' }) {
    return (0, preact_mjs_1.h)("div", { class: `notice notice-${type}`, role: type === 'error' ? 'alert' : 'status' }, (0, preact_mjs_1.h)(Icon, { name: type === 'error' ? 'warning' : type === 'success' ? 'check' : 'info' }), (0, preact_mjs_1.h)("div", null, children));
}
function Empty({ icon = 'box', title, text, children }) {
    return (0, preact_mjs_1.h)("div", { class: "empty-state" }, (0, preact_mjs_1.h)("span", { class: "empty-icon" }, (0, preact_mjs_1.h)(Icon, { name: icon, size: 30 })), (0, preact_mjs_1.h)("h3", null, title), (0, preact_mjs_1.h)("p", null, text), children);
}
function Loading({ label = 'Cargando información…' }) {
    return (0, preact_mjs_1.h)("div", { class: "loading", role: "status" }, (0, preact_mjs_1.h)("span", { class: "spinner" }), (0, preact_mjs_1.h)("span", null, label), (0, preact_mjs_1.h)("div", { class: "skeleton" }), (0, preact_mjs_1.h)("div", { class: "skeleton shorter" }));
}
function RouteCard({ origin, destination, scheduledAt, compact = false }) {
    return (0, preact_mjs_1.h)("div", { class: `route-card${compact ? ' compact' : ''}` }, (0, preact_mjs_1.h)("div", { class: "route-stop" }, (0, preact_mjs_1.h)("span", { class: "origin-dot" }), (0, preact_mjs_1.h)("div", null, (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "ORIGEN"), (0, preact_mjs_1.h)("strong", null, origin || '¿Dónde empieza el traslado?'))), (0, preact_mjs_1.h)("div", { class: "route-stop" }, (0, preact_mjs_1.h)("span", { class: "destination-dot" }), (0, preact_mjs_1.h)("div", null, (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "DESTINO"), (0, preact_mjs_1.h)("strong", null, destination || '¿A dónde necesitás llegar?'))), scheduledAt !== undefined && (0, preact_mjs_1.h)("div", { class: "route-time" }, (0, preact_mjs_1.h)(Icon, { name: "calendar", size: 17 }), (0, domain_js_1.dateText)(scheduledAt), (0, preact_mjs_1.h)("span", null, "Hora de Argentina")));
}
function TransportArt() {
    return (0, preact_mjs_1.h)("div", { class: "transport-art", "aria-hidden": "true" }, (0, preact_mjs_1.h)("div", { class: "art-top" }, (0, preact_mjs_1.h)("span", { class: "art-tag" }, "MENOS IDAS Y VUELTAS"), (0, preact_mjs_1.h)("span", { class: "art-dot" })), (0, preact_mjs_1.h)("div", { class: "art-title" }, "Un recorrido.", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("strong", null, "Todo coordinado.")), (0, preact_mjs_1.h)("svg", { class: "van-art", viewBox: "0 0 600 300", fill: "none" }, (0, preact_mjs_1.h)("path", { d: "M-20 245h246q44 0 44-40v-40q0-40 40-40h110q40 0 40-40V-10", stroke: "#d3bfae", "stroke-width": "3", "stroke-dasharray": "8 9" }), (0, preact_mjs_1.h)("circle", { cx: "68", cy: "245", r: "8", fill: "#a55333" }), (0, preact_mjs_1.h)("circle", { cx: "462", cy: "36", r: "8", fill: "#233a35" }), (0, preact_mjs_1.h)("ellipse", { cx: "310", cy: "259", rx: "218", ry: "15", fill: "#decebd" }), (0, preact_mjs_1.h)("path", { d: "M116 102q0-16 16-16h225q20 0 31 15l55 73 28 13q12 6 12 19v39H113z", fill: "#283e39" }), (0, preact_mjs_1.h)("path", { d: "M133 91h198v110H133z", fill: "#354f47" }), (0, preact_mjs_1.h)("path", { d: "M353 105h27l50 67h-77z", fill: "#c2d1c5" }), (0, preact_mjs_1.h)("path", { d: "M143 106h174v68H143z", stroke: "#536e61", "stroke-width": "2" }), (0, preact_mjs_1.h)("path", { d: "M113 206h367v39H113z", fill: "#233731" }), (0, preact_mjs_1.h)("path", { d: "M333 91v151", stroke: "#1b2e29", "stroke-width": "3" }), (0, preact_mjs_1.h)("rect", { x: "353", y: "186", width: "20", height: "5", rx: "2", fill: "#adbeb0" }), (0, preact_mjs_1.h)("rect", { x: "462", y: "194", width: "20", height: "14", rx: "3", fill: "#f1b06a" }), (0, preact_mjs_1.h)("rect", { x: "110", y: "187", width: "8", height: "20", rx: "2", fill: "#d98361" }), (0, preact_mjs_1.h)("circle", { cx: "184", cy: "243", r: "33", fill: "#1b2523" }), (0, preact_mjs_1.h)("circle", { cx: "184", cy: "243", r: "17", fill: "#a7ada7" }), (0, preact_mjs_1.h)("circle", { cx: "184", cy: "243", r: "7", fill: "#4a5951" }), (0, preact_mjs_1.h)("circle", { cx: "418", cy: "243", r: "33", fill: "#1b2523" }), (0, preact_mjs_1.h)("circle", { cx: "418", cy: "243", r: "17", fill: "#a7ada7" }), (0, preact_mjs_1.h)("circle", { cx: "418", cy: "243", r: "7", fill: "#4a5951" }), (0, preact_mjs_1.h)("path", { d: "M176 132h46m-12-12 12 12-12 12", stroke: "#e5ba95", "stroke-width": "6", "stroke-linecap": "round", "stroke-linejoin": "round" }), (0, preact_mjs_1.h)("rect", { x: "74", y: "181", width: "36", height: "54", rx: "3", fill: "#bc8760" }), (0, preact_mjs_1.h)("path", { d: "M92 181v16M74 206h36", stroke: "#d8ac86", "stroke-width": "3" })), (0, preact_mjs_1.h)("div", { class: "art-bottom" }, (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(Icon, { name: "box", size: 17 }), " Cargas"), (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(Icon, { name: "users", size: 17 }), " Pasajeros"), (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(Icon, { name: "route", size: 17 }), " Especiales")));
}

},"commercial.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialHome = CommercialHome;
exports.DemoGuide = DemoGuide;
exports.CommercialFooter = CommercialFooter;
const preact_mjs_1 = require("./vendor/preact.mjs");
const ui_js_1 = require("./ui.js");
const domain_js_1 = require("./domain.js");
const { h } = preact_mjs_1;
const { Icon, Field, TransportArt } = ui_js_1;

function CommercialHome({ business, draft, errors, onDraft, onStart, onQuickSubmit, onScroll }) {
    const coverage = typeof business.coverage === 'string' ? business.coverage.trim() : '';
    const hasCoverage = Boolean(coverage && coverage !== domain_js_1.defaultConfig.coverage);
    const services = [
        ['freight', 'Fletes y cargas', 'Muebles, cajas o mercadería.', 'Sumá una foto y los detalles de tu carga.', 'truck'],
        ['passengers', 'Traslado de pasajeros', 'Tu próximo viaje, coordinado.', 'Indicá pasajeros, equipaje y si necesitás volver.', 'users'],
        ['special', 'Traslados especiales', 'No todos los recorridos son iguales.', 'Contanos qué necesitás y evaluamos tu solicitud.', 'route'],
    ];
    const faq = [
        ['¿Cómo se calcula el precio?', 'El operador revisa tu recorrido y los detalles antes de cotizar. No hay tarifas automáticas: primero conocés la propuesta.'],
        ['¿Puedo programarlo para otro día?', 'Sí. Podés pedir una fecha y un horario. La disponibilidad se coordina con el prestador antes de confirmar el servicio.'],
        ['¿También puedo pedir un traslado de pasajeros?', 'Sí. Elegí Pasajeros e indicá cuántas personas viajan, qué equipaje llevan y si necesitás ida y vuelta.'],
        ['¿Cuándo queda confirmado mi servicio?', 'Aceptar el importe no confirma el viaje ni realiza un cobro. El operador revisa disponibilidad y condiciones y luego confirma el servicio.'],
    ];
    return h('main', { id: 'main', tabIndex: -1, class: 'commercial-home' },
        h('section', { class: 'hero container', 'aria-labelledby': 'hero-title' },
            h('div', { class: 'hero-copy' },
                h('div', { class: 'eyebrow hero-eyebrow' }, h('span', { class: 'little-line' }), 'FLETES · PASAJEROS · ESPECIALES'),
                h('h1', { id: 'hero-title', tabIndex: -1 }, 'Tu traslado,', h('br'), h('em', null, 'sin vueltas.')),
                h('p', { class: 'hero-intro' }, 'Contanos de dónde a dónde. Recibí una cotización y seguí cada paso desde acá.'),
                h('div', { class: 'hero-actions' },
                    h('button', { class: 'button button-primary button-large', onClick: () => onStart() }, 'Solicitar servicio', h(Icon, { name: 'arrow', size: 18 })),
                    h('button', { class: 'text-link how-link', onClick: () => onScroll('como-funciona') }, 'Ver cómo funciona', h(Icon, { name: 'chevron', size: 16 }))),
                h('div', { class: 'hero-scene' }, h(TransportArt)),
                h('div', { class: 'hero-assurances' },
                    h('span', null, h(Icon, { name: 'check', size: 16 }), 'Primero la cotización'),
                    h('span', null, h(Icon, { name: 'check', size: 16 }), 'Sin crear una cuenta'))),
            h('div', { class: 'quick-card' },
                h('div', { class: 'quick-card-heading' },
                    h('span', { class: 'eyebrow' }, 'EMPEZAMOS POR ACÁ'),
                    h('h2', null, '¿De dónde a dónde?'),
                    h('p', null, 'Elegí el servicio y armá tu recorrido.')),
                h('form', { onSubmit: onQuickSubmit, noValidate: true },
                    h('fieldset', { class: 'quick-kind' },
                        h('legend', { class: 'sr-only' }, 'Tipo de servicio'),
                        services.map(([kind, , , , icon]) => h('button', {
                            key: kind, type: 'button', 'aria-pressed': draft.kind === kind,
                            class: draft.kind === kind ? 'selected' : '', onClick: () => onDraft({ kind }),
                        }, h(Icon, { name: icon, size: 21 }), kind === 'freight' ? 'Flete' : kind === 'passengers' ? 'Pasajeros' : 'Especial'))),
                    h('div', { class: 'quick-stops' },
                        h(Field, { id: 'quick-origin', label: 'Origen', error: errors.origin },
                            h('input', { id: 'quick-origin', autoComplete: 'off', enterKeyHint: 'next', placeholder: 'Dirección y localidad de salida', maxLength: 240, value: draft.origin,
                                onInput: e => onDraft({ origin: e.currentTarget.value }), 'aria-invalid': Boolean(errors.origin), 'aria-describedby': errors.origin ? 'quick-origin-hint' : undefined })),
                        h(Field, { id: 'quick-destination', label: 'Destino', error: errors.destination },
                            h('input', { id: 'quick-destination', autoComplete: 'off', enterKeyHint: 'go', placeholder: 'Dirección y localidad de llegada', maxLength: 240, value: draft.destination,
                                onInput: e => onDraft({ destination: e.currentTarget.value }), 'aria-invalid': Boolean(errors.destination), 'aria-describedby': errors.destination ? 'quick-destination-hint' : undefined }))),
                    h('div', { class: 'quick-next' }, h(Icon, { name: 'calendar', size: 17 }), 'Después elegís la fecha y sumás los detalles.'),
                    h('button', { class: 'button button-dark full', type: 'submit' }, 'Continuar solicitud', h(Icon, { name: 'arrow', size: 18 })),
                    h('p', { class: 'quick-footnote' }, h(Icon, { name: 'lock', size: 14 }), 'Sin reservar ni pagar en este paso.')))),
        h('section', { id: 'servicios', class: 'container services-section' },
            h('div', { class: 'section-heading' },
                h('div', null, h('span', { class: 'eyebrow' }, '¿QUÉ NECESITÁS TRASLADAR?'), h('h2', null, 'Un lugar para cada recorrido.')),
                h('p', null, 'Elegí tu servicio. Los detalles vienen después.')),
            h('div', { class: 'services-grid' }, services.map(([kind, title, intro, text, icon], i) => h('button', {
                key: kind, class: `service-card service-${kind}`, onClick: () => onStart(kind), 'aria-label': `Solicitar ${title.toLowerCase()}`,
            }, h('div', { class: 'service-card-top' }, h('span', { class: 'service-icon' }, h(Icon, { name: icon, size: 29 })), h('span', { class: 'service-number' }, '0', i + 1)),
                h('h3', null, title), h('p', null, h('strong', null, intro), h('br'), text),
                h('span', { class: 'card-link' }, 'Solicitar servicio', h(Icon, { name: 'arrow', size: 19 })))))),
        h('section', { id: 'como-funciona', class: 'how-section' }, h('div', { class: 'container' },
            h('div', { class: 'section-heading' }, h('div', null, h('span', { class: 'eyebrow' }, 'SABÉS QUÉ SIGUE'), h('h2', null, 'Del pedido al traslado.')),
                h('p', null, 'Vos hacés la consulta. El operador coordina el servicio.')),
            h('div', { class: 'how-grid' }, [
                ['01', 'Pedí tu servicio', 'Recorrido, fecha y lo que necesitás trasladar.', 'route'],
                ['02', 'Revisá la cotización', 'Conocé el importe. El viaje se confirma por separado.', 'check'],
                ['03', 'Consultá el estado', 'Seguí las actualizaciones informadas por el operador.', 'truck'],
            ].map(([n, title, text, icon]) => h('article', { class: 'how-step', key: n }, h('div', { class: 'how-step-head' }, h('span', null, n), h(Icon, { name: icon, size: 20 })), h('h3', null, title), h('p', null, text)))))),
        h('section', { id: 'cobertura', class: 'container coverage-section' },
            h('div', { class: 'coverage-copy' }, h('span', { class: 'eyebrow' }, 'CADA RECORRIDO ES DIFERENTE'), h('h2', null, 'Vos decís a dónde.'),
                h('p', null, hasCoverage ? coverage : 'Consultá disponibilidad para tu recorrido. La zona y las condiciones se coordinan con el prestador.'),
                h('button', { class: 'text-link', onClick: () => onScroll('quick-origin') }, 'Consultar mi recorrido', h(Icon, { name: 'arrow', size: 18 }))),
            h('div', { class: 'coverage-route', 'aria-label': 'El recorrido se consulta antes de confirmar' },
                h('span', null, h('i', { class: 'origin-dot' }), 'Tu origen'), h('span', { class: 'coverage-dashes' }), h(Icon, { name: 'arrow', size: 22 }), h('span', null, h('i', { class: 'destination-dot' }), 'Tu destino'))),
        h('section', { id: 'preguntas', class: 'container faq-section' },
            h('div', { class: 'faq-heading' }, h('span', { class: 'eyebrow' }, 'ANTES DE ARRANCAR'), h('h2', null, 'Las dudas, ', h('br'), 'sin vueltas.')),
            h('div', { class: 'faq-list' }, faq.map(([question, answer]) => h('details', { key: question },
                h('summary', null, question, h('span', { class: 'faq-plus' }, h(Icon, { name: 'plus', size: 18 }))), h('p', null, answer))))),
        h('section', { class: 'container closing-section' },
            h('div', { class: 'closing-panel' }, h('div', null, h('span', { class: 'eyebrow' }, 'TU PRÓXIMO RECORRIDO'), h('h2', null, 'Empecemos por tu solicitud.'), h('p', null, 'El primer paso es contarnos qué necesitás.')),
                h('button', { class: 'button button-primary button-large', onClick: () => onStart() }, 'Solicitar servicio', h(Icon, { name: 'arrow' }))),
            h('div', { class: 'contact-strip' }, h('span', null, '¿Ya hiciste una solicitud?'), h('a', { class: 'text-link', href: '#/seguimiento' }, 'Consultar el estado', h(Icon, { name: 'arrow', size: 17 })))));
}

function DemoGuide({ onStart, onExample, onReset, busy }) {
    const steps = [
        { num: '01', title: 'Cliente pide', desc: 'Ingresa origen, destino, fecha y detalles desde el formulario rápido o wizard.' },
        { num: '02', title: 'Dueño recibe', desc: 'La solicitud ingresa al panel, en la bandeja de Nuevas.' },
        { num: '03', title: 'Cotiza', desc: 'El operador analiza el recorrido y carga el importe en pesos.' },
        { num: '04', title: 'Cliente acepta', desc: 'Desde su enlace de seguimiento, el cliente revisa el precio y presiona “Aceptar cotización”.' },
        { num: '05', title: 'Dueño confirma', desc: 'El operador revisa la cotización aceptada y define el próximo paso del servicio.' },
        { num: '06', title: 'Asigna unidad', desc: 'Selecciona el vehículo adecuado para el traslado.' },
        { num: '07', title: 'En camino', desc: 'Indica la salida del vehículo al punto de origen.' },
        { num: '08', title: 'Servicio', desc: 'Inicia el traslado y el cliente ve el estado actualizado en su celular.' },
        { num: '09', title: 'Finaliza', desc: 'El operador concluye el servicio y queda en el histórico del cliente.' },
    ];

    return (0, preact_mjs_1.h)("main", { id: "main", class: "container demo-guide" },
        (0, preact_mjs_1.h)("a", { href: "#/", class: "text-link back-link" },
            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 17 }),
            "Volver al sitio"
        ),
        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "PRESENTACI\u00D3N DEL SISTEMA"),
        (0, preact_mjs_1.h)("h1", { tabIndex: -1 },
            "Un traslado.",
            (0, preact_mjs_1.h)("br", null),
            (0, preact_mjs_1.h)("em", null, "Los dos lados de la operaci\u00F3n.")
        ),
        (0, preact_mjs_1.h)("p", { class: "subtitle" },
            "Probá una solicitud corta. Después cotizala como dueño y aceptala como cliente."
        ),
        (0, preact_mjs_1.h)("p", { class: "demo-guide-disclaimer" }, "Recorrido demostrativo con datos ficticios."),
        (0, preact_mjs_1.h)("div", { class: "demo-guide-grid" },
            (0, preact_mjs_1.h)("section", { class: "panel" },
                (0, preact_mjs_1.h)("span", { class: "demo-guide-number" }, "A"),
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "phone", size: 28 }),
                (0, preact_mjs_1.h)("h2", null, "Experiencia del cliente"),
                (0, preact_mjs_1.h)("p", null, "Tres pasos: recorrido, detalles y contacto. El botón “Usar un ejemplo” completa los datos de prueba."),
                (0, preact_mjs_1.h)("button", { class: "button button-primary", onClick: onStart },
                    "Probar una solicitud",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
                )
            ),
            (0, preact_mjs_1.h)("section", { class: "panel" },
                (0, preact_mjs_1.h)("span", { class: "demo-guide-number" }, "B"),
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "grid", size: 28 }),
                (0, preact_mjs_1.h)("h2", null, "Panel del due\u00F1o"),
                (0, preact_mjs_1.h)("p", null, "Revis\u00E1 solicitudes en “Requiere atenci\u00F3n”, cotiz\u00E1, confirm\u00E1 servicios y asign\u00E1 veh\u00EDculos."),
                (0, preact_mjs_1.h)("a", { class: "button button-dark", href: "#/admin" },
                    "Ver panel del due\u00F1o",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
                )
            )
        ),
        (0, preact_mjs_1.h)("section", { class: "demo-guide-shortcut" },
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("h3", null, "\u00BFQuer\u00E9s probar una cotizaci\u00F3n ya lista para aceptar?"),
                (0, preact_mjs_1.h)("p", null, "Abr\u00ED un ejemplo de cotizaci\u00F3n para ver c\u00F3mo el cliente revisa el importe y luego el due\u00F1o contin\u00FAa la coordinaci\u00F3n.")
            ),
            (0, preact_mjs_1.h)("button", { class: "button button-light", onClick: onExample },
                "Ver ejemplo de seguimiento",
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route", size: 18 })
            )
        ),
        (0, preact_mjs_1.h)("details", { class: "demo-flow-strip", "aria-label": "Ciclo completo de un servicio" },
            (0, preact_mjs_1.h)("summary", null, "Ver los pasos de la operación"),
            (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "FLUJO OPERATIVO COMPLETO"),
            (0, preact_mjs_1.h)("div", { class: "demo-flow-steps" },
                steps.map(s => (0, preact_mjs_1.h)("div", { class: "demo-flow-step", key: s.num },
                    (0, preact_mjs_1.h)("span", { class: "step-badge" }, s.num),
                    (0, preact_mjs_1.h)("strong", null, s.title),
                    (0, preact_mjs_1.h)("p", null, s.desc)
                ))
            )
        ),
        (0, preact_mjs_1.h)("div", { class: "demo-guide-notice" },
            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info" }),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("strong", null, "Una primera base para personalizar."),
                (0, preact_mjs_1.h)("p", null,
                    "Los datos de este recorrido son ficticios; no se realizan viajes ni cobros reales. Ahora personalizamos servicios, vehículos, cobertura y forma de trabajo."
                ),
                (0, preact_mjs_1.h)("button", { class: "text-link", onClick: onReset, disabled: busy },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 16 }),
                    "Reiniciar datos de la demo"
                )
            )
        )
    );
}

function CommercialFooter({ business, demo }) {
    return (0, preact_mjs_1.h)("footer", { class: "public-footer commercial-footer" },
        (0, preact_mjs_1.h)("div", { class: "container" },
            (0, preact_mjs_1.h)(ui_js_1.Brand, { name: business.name }),
            (0, preact_mjs_1.h)("nav", { "aria-label": "Navegaci\u00F3n del pie" },
                (0, preact_mjs_1.h)("a", { href: "#/seguimiento" }, "Mi solicitud"),
                (0, preact_mjs_1.h)("a", { href: "#/privacidad" }, "Privacidad y datos"),
                (0, preact_mjs_1.h)("a", { href: "#/admin" }, "Acceso del due\u00F1o"),
                demo && (0, preact_mjs_1.h)("a", { href: "#/demo" }, "Explorar la demo")
            )
        ),
        (0, preact_mjs_1.h)("div", { class: "container footer-bottom" },
            (0, preact_mjs_1.h)("p", null, "Fletes \u00B7 Pasajeros \u00B7 Traslados especiales"),
            (0, preact_mjs_1.h)("span", null, "Marca temporal de presentaci\u00F3n comercial")
        )
    );
}

},"tracking.js":function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingView = TrackingView;
const preact_mjs_1 = require("./vendor/preact.mjs");
const ui_js_1 = require("./ui.js");
const domain_js_1 = require("./domain.js");

const serviceIcon = { freight: 'truck', passengers: 'users', special: 'route' };

const titles = {
    new: 'Recibimos tu solicitud.',
    reviewing: 'Estamos revisando los detalles.',
    quoted: 'Tu cotización está lista.',
    confirmed: 'Tu servicio está confirmado.',
    en_route: 'El vehículo está en camino.',
    in_service: 'Tu traslado está en curso.',
    completed: 'Llegamos al final del recorrido.',
    cancelled: 'Esta solicitud fue cancelada.',
};

const descriptions = {
    new: 'El próximo paso es revisar los detalles y preparar tu cotización.',
    reviewing: 'El operador está revisando los detalles. La cotización va a aparecer acá.',
    quoted: 'Revisá el importe y los datos del recorrido. La disponibilidad se confirma después de aceptar.',
    confirmed: 'Confirmación informada por el operador. Consultá cualquier ajuste del recorrido con el prestador.',
    en_route: 'El operador informó la salida hacia el punto de origen. No es una ubicación GPS.',
    in_service: 'El operador informó que comenzó el servicio. El siguiente paso es marcarlo como finalizado al llegar a destino.',
    completed: 'El prestador marcó el servicio como finalizado.',
    cancelled: 'No hay un servicio activo asociado a esta solicitud. Podés comenzar una nueva consulta cuando lo necesites.',
};

function TrackingView({ tracking: t, error, success, business, preview, busy, lookup, pendingPhotos, onCopy, onRefresh, onManage, onAccept, onRetryPhotos, refreshing, refreshMessage, copyMessage }) {
    const accepted = Boolean(t?.quote_accepted_at);
    const awaiting = t?.status === 'quoted' && accepted;
    const contact = t ? (0, domain_js_1.whatsappUrl)(business.whatsapp, `Hola, quisiera consultar por mi solicitud ${t.code}.`) : null;

    return (0, preact_mjs_1.h)("main", { id: "main", class: "container tracking-main tracking-v3" },
        (0, preact_mjs_1.h)("a", { class: "text-link back-link", href: "#/" },
            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "back", size: 17 }),
            "Volver al inicio"
        ),
        !t && !error ? (
            (0, preact_mjs_1.h)(ui_js_1.Loading, { label: "Consultando el estado de tu solicitud…" })
        ) : !t ? (
            (0, preact_mjs_1.h)("section", { class: "tracking-card" },
                (0, preact_mjs_1.h)(ui_js_1.Empty, { icon: "lock", title: "No encontramos ese enlace", text: error },
                    (0, preact_mjs_1.h)("a", { href: "#/seguimiento", class: "button button-primary" },
                        "Ver mis solicitudes",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow" })
                    )
                )
            )
        ) : (
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("div", { class: "tracking-page-heading" },
                    (0, preact_mjs_1.h)("div", null,
                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, success ? 'EL PRIMER PASO YA ESTÁ' : 'TU TRASLADO, PASO A PASO'),
                        (0, preact_mjs_1.h)("h1", { tabIndex: -1 }, success ? 'Solicitud recibida.' : 'Así va tu servicio.'),
                        (0, preact_mjs_1.h)("p", null, preview ? 'Tu prueba quedó guardada en este navegador.' : success ? 'Guardá este enlace para consultar los próximos pasos.' : 'Consultá el estado de tu servicio.')
                    ),
                    (0, preact_mjs_1.h)("span", { class: "tracking-reference" },
                        (0, preact_mjs_1.h)("span", null, "Tu referencia"),
                        (0, preact_mjs_1.h)("strong", null, t.code)
                    )
                ),
                (0, preact_mjs_1.h)("div", { class: "tracking-layout" },
                    (0, preact_mjs_1.h)("section", { class: "tracking-card" },
                        (0, preact_mjs_1.h)("div", { class: `next-step-card next-${t.status}${awaiting ? ' next-accepted' : ''}` },
                            (0, preact_mjs_1.h)("span", { class: "next-step-icon" },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, {
                                    name: awaiting || t.status === 'confirmed' || t.status === 'completed' ? 'check'
                                        : t.status === 'cancelled' ? 'close'
                                        : t.status === 'new' || t.status === 'reviewing' ? 'clock'
                                        : t.status === 'quoted' ? 'box' : 'truck',
                                    size: 24
                                })
                            ),
                            (0, preact_mjs_1.h)("div", null,
                                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, awaiting ? 'PROPUESTA ACEPTADA' : 'ESTADO ACTUAL'),
                                (0, preact_mjs_1.h)("h2", null, awaiting ? 'Aceptaste la cotización.' : titles[t.status]),
                                (0, preact_mjs_1.h)("p", null, awaiting ? 'El importe quedó aceptado. Falta la confirmación del operador; todavía no hay un viaje confirmado ni un cobro.' : preview && ['new', 'reviewing'].includes(t.status) ? 'Para continuar la prueba, abrí esta solicitud como dueño y prepará una cotización.' : descriptions[t.status])
                            )
                        ),
                        preview && (0, preact_mjs_1.h)("section", { class: `demo-next${t.status === 'quoted' && !accepted ? ' demo-next-secondary' : ''}` },
                            (0, preact_mjs_1.h)("div", null,
                                (0, preact_mjs_1.h)("strong", null, ['new', 'reviewing'].includes(t.status) ? 'Ahora probá como dueño' : awaiting ? 'El cliente ya aceptó. Ahora confirmá como dueño.' : 'Los dos lados de esta misma solicitud'),
                                (0, preact_mjs_1.h)("p", null, ['new', 'reviewing'].includes(t.status) ? 'Poné un precio y volvé para verlo como cliente.' : awaiting ? 'Revisá el servicio, asigná una unidad y confirmalo en el panel.' : 'Podés volver al panel para continuar la prueba.')
                            ),
                            (0, preact_mjs_1.h)("button", { class: 'button button-primary', disabled: busy, onClick: onManage }, 'Gestionar en el panel', (0, preact_mjs_1.h)(ui_js_1.Icon, { name: 'arrow', size: 18 }))
                        ),
                        (0, preact_mjs_1.h)("div", { class: "tracking-code" },
                            (0, preact_mjs_1.h)("div", null,
                                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "REFERENCIA DE SOLICITUD"),
                                (0, preact_mjs_1.h)("strong", null, t.code)
                            ),
                            (0, preact_mjs_1.h)(ui_js_1.Badge, { status: t.status })
                        ),
                        t.quote_cents !== null && (
                            (0, preact_mjs_1.h)("section", { class: "quote-response quote-hero" },
                                (0, preact_mjs_1.h)("div", { class: "price-block price-protagonist" },
                                    (0, preact_mjs_1.h)("div", { class: "price-headline" },
                                            (0, preact_mjs_1.h)("span", { class: "eyebrow" }, t.is_demo ? 'EJEMPLO DE COTIZACIÓN · DATO DEMO' : t.status === 'quoted' ? 'COTIZACIÓN DEL SERVICIO' : 'IMPORTE ACORDADO'),
                                        (0, preact_mjs_1.h)("strong", null,
                                            (0, domain_js_1.money)(t.quote_cents),
                                            (0, preact_mjs_1.h)("small", null, " ARS")
                                        )
                                    ),
                                    (0, preact_mjs_1.h)("div", { class: "price-badge" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info", size: 16 }),
                                        (0, preact_mjs_1.h)("span", null, "Sin cobros ", (0, preact_mjs_1.h)("br", null), "autom\u00E1ticos")
                                    )
                                ),
                                preview && t.status === 'quoted' && !accepted && (
                                    (0, preact_mjs_1.h)("div", { class: "quote-accept-actions" },
                                        (0, preact_mjs_1.h)("button", {
                                            class: "button button-primary button-large full",
                                            onClick: (e) => onAccept(e.currentTarget),
                                            disabled: busy || Boolean(error)
                                        },
                                            "Aceptar cotizaci\u00F3n",
                                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 19 })
                                        ),
                                        (0, preact_mjs_1.h)("p", { class: "accept-disclaimer" },
                                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info", size: 15 }),
                                            "Aceptar el precio no confirma el viaje ni realiza un cobro."
                                        )
                                    )
                                ),
                                accepted && (
                                    (0, preact_mjs_1.h)("div", { class: "accepted-receipt" },
                                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 18 }),
                                        (0, preact_mjs_1.h)("div", null,
                                            (0, preact_mjs_1.h)("strong", null, "Cotizaci\u00F3n aceptada"),
                                            (0, preact_mjs_1.h)("span", null, " \u00B7 ", (0, domain_js_1.dateText)(t.quote_accepted_at ?? null)),
                                            (0, preact_mjs_1.h)("small", null, "Quedan por coordinar las condiciones del servicio con el prestador.")
                                        )
                                    )
                                )
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "tracking-service" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: serviceIcon[t.kind] }),
                            (0, preact_mjs_1.h)("strong", null, domain_js_1.serviceLabels[t.kind])
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.RouteCard, { origin: t.origin, destination: t.destination, scheduledAt: t.scheduled_at }),
                        t.vehicle && (
                            (0, preact_mjs_1.h)("section", { class: "assigned-vehicle" },
                                (0, preact_mjs_1.h)("span", { class: "assigned-icon" },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: t.kind === 'passengers' ? 'car' : 'truck', size: 28 })
                                ),
                                (0, preact_mjs_1.h)("div", null,
                                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, t.is_demo ? "VEH\u00CDCULO DE EJEMPLO" : "VEH\u00CDCULO ASIGNADO"),
                                    (0, preact_mjs_1.h)("h3", null, t.vehicle.name),
                                    (0, preact_mjs_1.h)("p", null, t.kind === 'passengers' ? `${t.vehicle.seats} asientos para pasajeros` : t.vehicle.capacity)
                                )
                            )
                        ),
                        error && (
                            (0, preact_mjs_1.h)(ui_js_1.Notice, { type: "error" },
                                error,
                                " La informaci\u00F3n visible puede estar desactualizada."
                            )
                        ),
                        pendingPhotos > 0 && success && (
                            (0, preact_mjs_1.h)(ui_js_1.Notice, { type: "error" },
                                "La solicitud qued\u00F3 guardada, pero falta adjuntar ", pendingPhotos, " foto(s).",
                                (0, preact_mjs_1.h)("button", { class: "text-link", disabled: busy, onClick: onRetryPhotos },
                                    busy ? 'Reintentando…' : 'Reintentar carga de fotos'
                                )
                            )
                        ),
                        (0, preact_mjs_1.h)("div", { class: "tracking-buttons" },
                            (0, preact_mjs_1.h)("a", { class: 'button button-light', href: '#/seguimiento' }, 'Mis solicitudes'),
                            (0, preact_mjs_1.h)("button", { class: "button button-light", onClick: onRefresh, disabled: busy || refreshing },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 17 }), refreshing ? 'Consultando…' : 'Actualizar')
                        ),
                        (0, preact_mjs_1.h)("p", { class: 'tracking-feedback', role: 'status', 'aria-live': 'polite' }, refreshMessage || ''),
                        (0, preact_mjs_1.h)("div", { class: 'copy-options' },
                            (0, preact_mjs_1.h)("button", { class: 'text-link', onClick: onCopy },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: 'copy', size: 16 }), preview ? 'Copiar enlace de esta prueba' : 'Copiar enlace privado'),
                            (0, preact_mjs_1.h)("p", { class: 'copy-feedback', role: 'status', 'aria-live': 'polite' }, copyMessage || '')
                        ),
                        lookup && (
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "copy-link", label: "Enlace para copiar manualmente" },
                                (0, preact_mjs_1.h)("input", {
                                    id: "copy-link",
                                    readOnly: true,
                                    value: lookup,
                                    onFocus: (e) => e.currentTarget.select(), onClick: (e) => e.currentTarget.select()
                                })
                            )
                        ),
                        (0, preact_mjs_1.h)("p", { class: "privacy-note" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 15 }),
                            preview ? 'Esta prueba funciona sólo en este navegador. En otro teléfono no se verá. No se envían viajes ni mensajes.' : 'Quien tenga este enlace puede ver el recorrido y el estado. No lo compartas públicamente.'
                        )
                    ),
                    (0, preact_mjs_1.h)("aside", { class: "tracking-aside" },
                        (0, preact_mjs_1.h)("details", { class: "panel journey-panel" },
                            (0, preact_mjs_1.h)("summary", null, "Ver las etapas del servicio"),
                            (0, preact_mjs_1.h)(JourneyTimeline, { tracking: t }),
                            (0, preact_mjs_1.h)("p", { class: "sync-note" },
                                (0, preact_mjs_1.h)("span", { class: "status-dot" }),
                                "\u00DAltimo cambio: ", (0, domain_js_1.dateText)(t.updated_at)
                            ),
                            (0, preact_mjs_1.h)("p", { class: "tiny muted" }, "Estados informados por el operador. Actualiz\u00E1 para consultar cambios; no requiere GPS.")
                        ),
                        (0, preact_mjs_1.h)("section", { class: "panel contact-panel" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "message", size: 24 }),
                            (0, preact_mjs_1.h)("h3", null, "\u00BFNecesit\u00E1s cambiar algo?"),
                            (0, preact_mjs_1.h)("p", null,
                                contact ? 'Contactá al operador indicando tu referencia para coordinar ajustes de fecha, hora o recorrido.' : 'Los cambios de horario o trayecto se coordinan directamente con el operador.'
                            ),
                            contact && (
                                (0, preact_mjs_1.h)("a", { class: "button button-whatsapp", href: contact, target: "_blank", rel: "noopener noreferrer" },
                                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "external", size: 16 }),
                                    "Consultar por WhatsApp"
                                )
                            )
                        )
                    )
                ),
                t.status === 'completed' && (
                    (0, preact_mjs_1.h)("div", { class: "completed-cta" },
                        (0, preact_mjs_1.h)("a", { href: "#/solicitar", class: "button button-primary" },
                            "Solicitar otro traslado",
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 17 })
                        )
                    )
                )
            )
        )
    );
}

function JourneyTimeline({ tracking: t }) {
    if (t.status === 'cancelled')
        return (0, preact_mjs_1.h)(ui_js_1.Notice, { type: "error" }, "Solicitud cancelada. El registro anterior se conserva.");

    const stages = [
        { id: 'new', label: 'Solicitud recibida' },
        { id: 'reviewing', label: 'Revisión del recorrido' },
        { id: 'quoted', label: t.quote_accepted_at ? 'Cotización aceptada' : 'Cotización' },
        { id: 'confirmed', label: 'Servicio confirmado' },
        { id: 'en_route', label: 'Vehículo en camino' },
        { id: 'in_service', label: 'Traslado en curso' },
        { id: 'completed', label: 'Servicio finalizado' },
    ];

    const stage = stages.findIndex(s => s.id === t.status);

    return (0, preact_mjs_1.h)("ol", { class: "timeline journey-timeline" },
        stages.map((s, index) => {
            const event = t.history.find(e => e.status === s.id);
            const isCurrent = index === stage;
            const isDone = index < stage;

            return (0, preact_mjs_1.h)("li", {
                class: isDone ? 'done' : isCurrent ? 'current' : '',
                key: s.id,
                "aria-current": isCurrent ? 'step' : undefined
            },
                (0, preact_mjs_1.h)("span", { class: "timeline-dot" },
                    index <= stage ? (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 13 }) : null
                ),
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("strong", null, s.label),
                    isCurrent && (
                        (0, preact_mjs_1.h)("small", { class: "current-step" },
                            t.status === 'quoted' && t.quote_accepted_at ? 'Pendiente de confirmación del operador' : domain_js_1.labels[t.status]
                        )
                    ),
                    event && isDone && (
                        (0, preact_mjs_1.h)("small", null, (0, domain_js_1.dateText)(event.created_at))
                    )
                )
            );
        })
    );
}

},"simple-request.js":function(require,module,exports){
"use strict";
const { h } = require('./vendor/preact.mjs');
const { Icon, Field, Notice } = require('./ui.js');
const { serviceLabels, dateText } = require('./domain.js');
exports.SimpleRequest = SimpleRequest;
const icons = { freight: 'truck', passengers: 'users', special: 'route' };
const names = ['Recorrido', 'Qué y cuándo', 'Contacto y envío'];

function SimpleRequest({ app, toInput, fromInput }) {
    const { step, draft: p, errors, busy, photos } = app.state;
    const field = (id, label, control, hint) => h(Field, { id, label, error: errors[id], hint }, control);
    const input = (id, val, onInput, extra = {}) => h('input', {
        id, value: val, onInput: e => onInput(e.currentTarget.value),
        'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-hint` : undefined, ...extra
    });
    const option = (value, label = value) => h('option', { value }, label);
    const select = (id, val, onChange, values) => h('select', {
        id, value: val, onChange: e => onChange(e.currentTarget.value), 'aria-invalid': Boolean(errors[id])
    }, values.map(v => typeof v === 'string' ? option(v) : option(v[0], v[1])));
    const check = (id, label, selected, onChange) => h('label', { class: 'simple-check', htmlFor: id },
        h('input', { id, type: 'checkbox', checked: selected, onChange: e => onChange(e.currentTarget.checked) }), h('span', null, label));
    const details = p.details;
    const extrasInvalid = ['cargo_size', 'quantity', 'helpers', 'luggage', 'notes', 'whatsapp', 'email'].some(k => errors[k]);
    const heading = ['¿De dónde a dónde?', p.kind === 'passengers' ? '¿Cuántos viajan y cuándo?' : '¿Qué necesitás trasladar?', '¿Cómo te contactamos?'][step];

    return h('main', { id: 'main', class: 'container simple-request wizard-main', 'data-step': step },
        h('div', { class: 'simple-topline' },
            h('a', { class: 'text-link', href: '#/' }, h(Icon, { name: 'back', size: 16 }), 'Inicio'),
            h('button', { type: 'button', class: 'text-link example-fill', disabled: busy,
                'aria-label': 'Completar con datos de ejemplo', onClick: () => app.fillDemo() }, 'Usar un ejemplo', h(Icon, { name: 'arrow', size: 16 }))),
        h('nav', { class: 'simple-progress', 'aria-label': 'Pasos de la solicitud' }, names.map((name, index) =>
            h('button', { type: 'button', disabled: index >= step || busy, class: index === step ? 'current' : index < step ? 'done' : '',
                'aria-current': index === step ? 'step' : undefined,
                'aria-label': index < step ? `Volver al paso ${index + 1}: ${name}` : `Paso ${index + 1}: ${name}`,
                onClick: () => app.jumpStep(index) },
                h('span', { class: 'simple-step-number' }, index < step ? h(Icon, { name: 'check', size: 14 }) : index + 1), h('span', null, name)))),
        h('section', { class: 'panel simple-form wizard-form' },
            h('div', { class: 'simple-title' },
                h('span', { class: 'eyebrow' }, `PASO ${step + 1} DE 3${step === 2 ? ' · EL ÚLTIMO' : ''}`),
                h('h1', { tabIndex: -1 }, heading),
                h('p', null, ['Elegí el servicio e indicá el recorrido.', 'Con lo esencial alcanza para pedir una cotización.', 'Sólo tu nombre y celular. Revisá y enviá.'][step])),
            h('form', { onSubmit: e => app.stepNext(e), noValidate: true },
                h('fieldset', { disabled: busy, class: 'simple-fields' },
                    step === 0 && h('div', null,
                        h('div', { class: 'simple-services', role: 'group', 'aria-label': 'Tipo de servicio' }, ['freight', 'passengers', 'special'].map(kind =>
                            h('button', { type: 'button', class: `service-choice${p.kind === kind ? ' selected' : ''}`, 'aria-pressed': p.kind === kind,
                                onClick: () => app.draft({ kind }) }, h(Icon, { name: icons[kind], size: 25 }),
                                h('strong', null, kind === 'freight' ? 'Flete / carga' : kind === 'passengers' ? 'Pasajeros' : 'Especial')))),
                        errors.kind && h(Notice, { type: 'error' }, errors.kind),
                        field('origin', '¿Dónde empieza?', input('origin', p.origin, origin => app.draft({ origin }), { placeholder: 'Dirección y localidad de retiro', maxLength: 240, autoComplete: 'off' })),
                        field('destination', '¿Dónde termina?', input('destination', p.destination, destination => app.draft({ destination }), { placeholder: 'Dirección y localidad de llegada', maxLength: 240, autoComplete: 'off' }))),
                    step === 1 && h('div', null,
                        h('div', { class: 'simple-route-summary' }, h(Icon, { name: icons[p.kind], size: 20 }),
                            h('div', null, h('strong', null, serviceLabels[p.kind]), h('span', null, p.origin, ' → ', p.destination)),
                            h('button', { type: 'button', class: 'text-link', onClick: () => app.jumpStep(0), 'aria-label': 'Editar recorrido' }, 'Editar')),
                        p.kind !== 'passengers' && field('description', p.kind === 'freight' ? '¿Qué llevamos?' : 'Contanos qué necesitás', h('textarea', {
                            id: 'description', rows: 2, maxLength: 1500, value: details.description,
                            placeholder: p.kind === 'freight' ? 'Por ejemplo: una heladera y cuatro cajas' : 'Por ejemplo: llevar equipos para un evento',
                            'aria-invalid': Boolean(errors.description), onInput: e => app.detailDraft({ description: e.currentTarget.value }) })),
                        p.kind === 'passengers' && field('passengers', 'Cantidad de pasajeros', input('passengers', details.passengers,
                            passengers => app.detailDraft({ passengers: Number(passengers) }), { type: 'number', inputMode: 'numeric', min: 1, max: 60 })),
                        p.kind === 'freight' && check('needs_help', 'Necesito ayuda para cargar o descargar', details.needs_help, needs_help => app.detailDraft({ needs_help })),
                        h('fieldset', { class: 'simple-when' }, h('legend', null, '¿Cuándo lo necesitás?'),
                            h('div', { class: 'segmented' }, [['asap', 'Lo antes posible'], ['scheduled', 'Elegir fecha']].map(([when, label]) =>
                                h('button', { type: 'button', class: p.when === when ? 'selected' : '', 'aria-pressed': p.when === when,
                                    onClick: () => app.draft({ when, scheduled_at: when === 'asap' ? null : p.scheduled_at }) }, label))),
                            p.when === 'scheduled' && field('scheduled_at', 'Fecha y hora de salida', input('scheduled_at', toInput(p.scheduled_at),
                                val => app.draft({ scheduled_at: fromInput(val) }), { type: 'datetime-local' }), 'Hora de Argentina. Sujeto a confirmación.')),
                        p.kind === 'passengers' && check('round_trip', 'También necesito la vuelta', details.round_trip, round_trip => app.detailDraft({ round_trip })),
                        p.kind === 'passengers' && details.round_trip && field('return_at', 'Fecha y hora de regreso', input('return_at', toInput(details.return_at),
                            val => app.detailDraft({ return_at: fromInput(val) }), { type: 'datetime-local' })),
                        h('details', { class: 'simple-extras', key: `extras-${p.kind}`, open: extrasInvalid || undefined },
                            h('summary', null, p.kind === 'freight' ? 'Agregar fotos o más detalles' : 'Agregar más detalles', h('small', null, 'Opcional')),
                            p.kind === 'freight' && h('div', null,
                                h('div', { class: 'simple-two-columns' },
                                    field('cargo_size', 'Tamaño aproximado', select('cargo_size', details.cargo_size, cargo_size => app.detailDraft({ cargo_size }), ['No sé', 'Pequeña', 'Mediana', 'Grande'])),
                                    field('quantity', 'Cantidad de bultos', input('quantity', details.quantity, quantity => app.detailDraft({ quantity: Number(quantity) }), { type: 'number', inputMode: 'numeric', min: 1, max: 500 }))),
                                details.needs_help && field('helpers', 'Personas para ayudar', input('helpers', details.helpers, helpers => app.detailDraft({ helpers: Number(helpers) }), { type: 'number', min: 1, max: 10, inputMode: 'numeric' })),
                                field('photos', 'Fotos de la carga', h('input', { id: 'photos', type: 'file', accept: 'image/jpeg,image/png,image/webp', multiple: true, onChange: e => void app.addPhotos(e) }), 'Hasta 3 fotos. JPG, PNG o WebP.'),
                                h('div', { class: 'simple-photos' }, photos.map(photo => h('div', { key: photo.id },
                                    h('img', { src: photo.url, alt: 'Foto adjunta de la carga' }), h('button', { type: 'button', class: 'text-link', onClick: () => app.removePhoto(photo.id) }, 'Quitar foto'))))),
                            p.kind === 'passengers' && field('luggage', 'Equipaje', input('luggage', details.luggage, luggage => app.detailDraft({ luggage }), { maxLength: 200 })),
                            field('notes', 'Algo más que debamos saber', h('textarea', { id: 'notes', value: details.notes, rows: 2, maxLength: 1500, onInput: e => app.detailDraft({ notes: e.currentTarget.value }) })))),
                    step === 2 && h('div', null,
                        field('name', 'Tu nombre', input('name', p.contact.name, name => app.contactDraft({ name }), { autoComplete: 'name', maxLength: 100, placeholder: 'Nombre y apellido' })),
                        field('phone', 'Tu celular / WhatsApp', input('phone', p.contact.phone, phone => app.contactDraft({ phone }), { type: 'tel', inputMode: 'tel', autoComplete: 'tel', maxLength: 32, placeholder: '+54 9 299 123 4567' })),
                        h('details', { class: 'simple-extras', open: extrasInvalid || undefined },
                            h('summary', null, 'Otro contacto', h('small', null, 'Opcional')),
                            field('whatsapp', 'Otro número de WhatsApp', input('whatsapp', p.contact.whatsapp, whatsapp => app.contactDraft({ whatsapp }), { type: 'tel', inputMode: 'tel', maxLength: 32 })),
                            field('email', 'Correo electrónico', input('email', p.contact.email, email => app.contactDraft({ email }), { type: 'email', autoComplete: 'email', maxLength: 254 }))),
                        h('details', { class: 'simple-review', 'aria-label': 'Resumen de tu solicitud' },
                            h('summary', null, h('strong', null, 'Revisar mi solicitud'),
                                h('span', { class: 'simple-review-preview' }, serviceLabels[p.kind], ' · ', dateText(p.scheduled_at)),
                                h('span', { class: 'simple-review-preview' }, p.origin, ' → ', p.destination)),
                            h('div', { class: 'simple-review-stops' }, h('p', null, h('small', null, 'Desde'), p.origin), h('p', null, h('small', null, 'Hasta'), p.destination)),
                            h('p', null, p.kind === 'passengers' ? `${details.passengers} pasajero(s)${details.round_trip ? ' · ida y vuelta' : ''}` : details.description),
                            h('button', { type: 'button', class: 'text-link', onClick: () => app.jumpStep(0) }, 'Editar recorrido'),
                            h('button', { type: 'button', class: 'text-link', onClick: () => app.jumpStep(1) }, 'Cambiar detalles o fecha')),
                        check('consent', 'Acepto que usen estos datos para coordinar esta solicitud.', p.contact.consent, consent => app.contactDraft({ consent })),
                        errors.consent && h('p', { class: 'simple-field-error', role: 'alert' }, errors.consent)),
                    h('input', { class: 'honeypot', tabIndex: -1, 'aria-hidden': true, value: app.state.website, onInput: e => app.set({ website: e.currentTarget.value }), autoComplete: 'off' }),
                    app.state.flash && h(Notice, { type: app.state.flash.type }, app.state.flash.text),
                    h('div', { class: 'simple-actions wizard-actions' },
                        step > 0 && h('button', { type: 'button', class: 'button button-light', onClick: () => app.stepBack() }, h(Icon, { name: 'back', size: 18 }), 'Atrás'),
                        h('button', { class: 'button button-primary', type: 'submit' }, busy ? 'Guardando…' : step === 2 ? 'Enviar solicitud' : 'Continuar', h(Icon, { name: step === 2 ? 'check' : 'arrow', size: 18 }))),
                    h('p', { class: 'simple-endnote' }, step === 2 ? 'Prueba con datos ficticios. No se envían viajes ni cobros.' : 'Tres pasos. Sin crear una cuenta.')))));
}

},"app.js":function(require,module,exports){
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
const simple_request = require("./simple-request.js");
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
        const current = sessionStorage.getItem('flete-draft.v2');
        const saved = JSON.parse(current || sessionStorage.getItem('flete-draft.v1') || 'null');
        if (saved && /^[a-f0-9]{64}$/.test(saved.token) && ['freight', 'passengers', 'special'].includes(saved.draft?.kind) &&
            typeof saved.draft.origin === 'string' && typeof saved.draft.destination === 'string' &&
            typeof saved.draft.details?.notes === 'string' && typeof saved.draft.contact?.name === 'string')
            return { draft: saved.draft, token: saved.token, step: Math.max(0, Math.min(2, current ? Number(saved.step) || 0 : Math.floor((Number(saved.step) || 0) / 2))) };
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
            copyMessage: '', refreshMessage: '', refreshing: false, recentRequests: [],
            showDemoTools: new URLSearchParams(window.location.search).get('modo') === 'demo', quickErrors: {}, stickyCta: false, acceptance: null
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

    componentDidCatch() {
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
            lookup: '', copyMessage: '', refreshMessage: '', refreshing: false,
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
        else if (path === '/seguimiento' && api_js_1.IS_PREVIEW) {
            try { this.set({ recentRequests: await api_js_1.previewApi.recentRequests() }); }
            catch (error) { this.fail(error); }
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
            sessionStorage.setItem('flete-draft.v2', JSON.stringify({ draft, step, token: this.state.token }));
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
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.focusHeading();
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
            this.set({ errors, step: step < 0 ? 2 : step });
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
                sessionStorage.removeItem('flete-draft.v2');
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
                this.set({ errors: e.fields, step: step < 0 ? 2 : step });
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
        if (!/^[a-f0-9]{64}$/.test(token)) return;
        const link = `${window.location.href.split('#')[0]}#/seguimiento/${token}`;
        const path = this.state.path;
        const finish = patch => { if (this.state.path === path) this.set(patch); };
        try {
            if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
            await navigator.clipboard.writeText(link);
            finish({ lookup: '', copyMessage: api_js_1.IS_PREVIEW ? 'Copiado. Este enlace abre tus pruebas sólo en este navegador.' : 'Enlace copiado.' });
        } catch {
            finish({ lookup: link, copyMessage: 'No se pudo copiar automáticamente. Mantené presionado el enlace de abajo y elegí Copiar.' });
            window.requestAnimationFrame(() => {
                if (this.state.path !== path) return;
                const field = document.getElementById('copy-link');
                if (field instanceof HTMLInputElement) {
                    field.focus(); field.select(); field.setSelectionRange(0, field.value.length);
                    field.scrollIntoView({ block: 'center', behavior: 'instant' });
                }
            });
        }
    }

    async refreshTracking() {
        if (this.state.refreshing) return;
        const path = this.state.path;
        const oldVersion = this.state.tracking?.request_version;
        this.set({ refreshing: true, refreshMessage: '' });
        try {
            const tracking = await api_js_1.api.track(path.split('/')[2] ?? '');
            if (this.state.path === path) this.set({ tracking, trackingError: '',
                refreshMessage: tracking.request_version === oldVersion ? 'Ya está actualizado. No hay cambios nuevos.' : 'Estado actualizado.' });
        } catch (error) {
            if (this.state.path === path) this.set({ refreshMessage: error instanceof Error ? error.message : 'No se pudo actualizar. Volvé a intentar.' });
        } finally { if (this.state.path === path) this.set({ refreshing: false }); }
    }

    fillDemo() {
        const p = (0, domain_js_1.blankPayload)();
        p.kind = this.state.draft.kind;
        p.origin = 'Domicilio de retiro';
        p.destination = 'Domicilio de entrega';
        p.details.description = p.kind === 'special' ? 'Traslado de equipos para un evento. Datos de prueba.' : 'Una heladera y cuatro cajas medianas. Datos de prueba.';
        p.details.quantity = 5;
        p.details.passengers = 3;
        p.details.luggage = 'Valijas';
        p.contact = { name: 'Carolina R.', phone: '+540000000099', whatsapp: '', email: 'demo@example.invalid', consent: true };
        this.set({ draft: p, errors: {}, flash: { text: 'Ejemplo cargado. Podés cambiarlo o seguir hasta enviar.', type: 'info' } });
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
                sessionStorage.removeItem('flete-draft.v2');
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
                    (0, preact_mjs_1.h)("button", { class: "nav-link desktop-link", onClick: () => this.scrollHome('servicios') }, "Servicios"),
                    (0, preact_mjs_1.h)("button", { class: "nav-link desktop-link", onClick: () => this.scrollHome('como-funciona') }, "C\u00F3mo funciona"),
                    (0, preact_mjs_1.h)("a", { class: "nav-link tracking-nav", href: "#/seguimiento", "aria-label": "Mi solicitud" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "search", size: 18 }),
                        (0, preact_mjs_1.h)("span", null, "Mi solicitud")
                    ),
                    this.state.path !== '/solicitar' && (
                        (0, preact_mjs_1.h)("button", { class: "button button-small button-dark header-request", onClick: () => this.start() },
                            "Solicitar",
                            (0, preact_mjs_1.h)("span", { class: "desktop-cta" }, " servicio")
                        )
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
                    "Est\u00E1s de acuerdo con este importe. Las condiciones del servicio todav\u00EDa deben definirse con el prestador. No se realiza ning\u00FAn cobro."
                ),
                (0, preact_mjs_1.h)("p", { class: "tiny muted" },
                    "Prueba de demostración: no se contrata un traslado real."
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

    jumpStep(step) {
        if (this.state.busy || !Number.isInteger(step) || step < 0 || step > this.state.step) return;
        this.set({ step, errors: {}, flash: null });
        this.stash(this.state.draft, step);
        window.scrollTo({ top: 0, behavior: 'instant' });
        this.focusHeading();
    }

    wizard() {
        return (0, preact_mjs_1.h)(simple_request.SimpleRequest, { app: this, toInput: toArgInput, fromInput: fromArgInput });
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
            refreshing: this.state.refreshing, refreshMessage: this.state.refreshMessage, copyMessage: this.state.copyMessage,
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
        const { h } = preact_mjs_1;
        const last = this.lastTrackingToken();
        const recent = this.state.recentRequests ?? [];
        return h('main', { id: 'main', class: 'container lookup-main' }, h('section', { class: 'panel lookup-card' },
            h('span', { class: 'eyebrow' }, 'VOLVÉ CUANDO QUIERAS'),
            h('h1', { tabIndex: -1 }, 'Mis solicitudes'),
            h('p', null, api_js_1.IS_PREVIEW ? 'Abrí tus pruebas guardadas acá, sin copiar enlaces.' : 'Consultá el estado con tu enlace privado.'),
            last && h('a', { class: 'button button-dark last-request', href: `#/seguimiento/${last}` }, 'Abrir mi última solicitud'),
            h('div', { class: 'recent-requests' }, recent.map(r => h('a', { key: r.token, class: 'recent-request', href: `#/seguimiento/${r.token}` },
                h('div', null, h('strong', null, r.code), h('span', null, r.origin, ' → ', r.destination)),
                h(ui_js_1.Badge, { status: r.status }), h(ui_js_1.Icon, { name: 'arrow', size: 17 })))),
            !last && !recent.length && h('div', { class: 'simple-empty' },
                h('p', null, 'Todavía no hiciste una solicitud en este navegador.'),
                h('a', { class: 'button button-primary', href: '#/solicitar' }, 'Solicitar servicio')),
            api_js_1.IS_PREVIEW && h('p', { class: 'tiny muted' }, 'Cada navegador guarda sus propias pruebas. No se comparten entre teléfonos.'),
            h('details', { class: 'simple-extras' }, h('summary', null, 'Tengo un enlace guardado'),
                h('form', { onSubmit: e => this.lookup(e) },
                    h(ui_js_1.Field, { id: 'tracking-link', label: 'Enlace de seguimiento' }, h('input', {
                        id: 'tracking-link', value: this.state.lookup, onInput: e => this.set({ lookup: value(e) }), autoComplete: 'off', spellCheck: false,
                        placeholder: 'Pegá el enlace completo' })), h('button', { class: 'button button-light', type: 'submit' }, 'Abrir solicitud')))));
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
                        api_js_1.IS_PREVIEW && (0, preact_mjs_1.h)('div', { class: 'owner-next' },
                            (0, preact_mjs_1.h)('span', { class: 'eyebrow' }, 'AHORA ESTÁS COMO DUEÑO'),
                            (0, preact_mjs_1.h)('p', null, r.quote_cents === null ? 'Escribí un precio de ejemplo. Después vas a poder aceptarlo como cliente.' : r.quote_accepted_at && r.status === 'quoted' ? 'El cliente aceptó. Revisá disponibilidad, asigná un vehículo y confirmá el servicio.' : 'La propuesta ya está guardada. Abrila como cliente para seguir la prueba.'),
                            r.quote_cents !== null && (0, preact_mjs_1.h)('button', { class: 'button button-dark full', disabled: this.state.busy, onClick: () => void this.previewTracking(r.id) }, 'Ver como cliente', (0, preact_mjs_1.h)(ui_js_1.Icon, { name: 'arrow', size: 17 }))
                        ),
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
                            class: "icon-button",
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
            page = this.requestDetail();
        else if (path === '/admin/solicitudes')
            page = this.requestsPage();
        else if (path === '/admin/vehiculos')
            page = this.vehiclesPage();
        else if (path === '/admin/clientes')
            page = this.customersPage();
        else if (path === '/admin/ajustes')
            page = this.settingsPage();
        else
            page = this.overview();

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
                        }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 18 })),
                        (0, preact_mjs_1.h)("span", { class: "topbar-user" },
                            (0, preact_mjs_1.h)("span", { class: "person-avatar small" }, "OP"),
                            (0, preact_mjs_1.h)("span", null, "Administración",
                                (0, preact_mjs_1.h)("small", null, this.state.user?.email)
                            )
                        ),
                        (0, preact_mjs_1.h)("button", {
                            class: "icon-button mobile-logout",
                            "aria-label": api_js_1.IS_PREVIEW ? "Volver a vista cliente" : "Cerrar sesión",
                            onClick: () => void this.logout()
                        }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "logout", size: 17 }))
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
            (0, preact_mjs_1.h)("span", null, api_js_1.IS_PREVIEW ? (this.state.runtime.temporary ? 'Demo comercial temporal · datos ficticios; no se coordinan viajes reales' : 'Demo comercial · datos ficticios; no se coordinan viajes reales') : 'DEMO COMERCIAL · usá datos de prueba'),
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
            content = this.wizard();
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

        return (0, preact_mjs_1.h)("div", { class: this.state.path === '/solicitar' ? 'request-mode' : '' },
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
            this.state.path !== '/solicitar' && this.footer(),
            this.state.path === '/' && (
                (0, preact_mjs_1.h)("div", {
                    class: `mobile-request-bar${this.state.stickyCta ? ' visible' : ''}`,
                    "aria-hidden": !this.state.stickyCta
                },
                    (0, preact_mjs_1.h)("div", null,
                        (0, preact_mjs_1.h)("strong", null, "¿Listo para trasladar?"),
                        (0, preact_mjs_1.h)("span", null, "Cotización antes de salir")
                    ),
                    (0, preact_mjs_1.h)("button", {
                        tabIndex: this.state.stickyCta ? 0 : -1,
                        class: "button button-primary",
                        onClick: () => this.start()
                    },
                        "Solicitar servicio",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
                    )
                )
            ),
            this.acceptanceDialog()
        );
    }
}

const root = document.getElementById('app');
if (root)
    (0, preact_mjs_1.render)((0, preact_mjs_1.h)(App, null), root);

}};const cache={};function load(key){if(cache[key])return cache[key].exports;const m={exports:{}};cache[key]=m;defs[key](p=>load(p.startsWith('./')?p.slice(2):p),m,m.exports);return m.exports;}load('app.js');})();