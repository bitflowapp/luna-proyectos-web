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
            "Recorr\u00E9 en 2 a 3 minutos una primera base configurable: lo que vive el cliente y c\u00F3mo administra el due\u00F1o."
        ),
        (0, preact_mjs_1.h)("p", { class: "demo-guide-disclaimer" }, "Recorrido demostrativo con datos ficticios."),
        (0, preact_mjs_1.h)("div", { class: "demo-flow-strip", "aria-label": "Ciclo completo de un servicio" },
            (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "FLUJO OPERATIVO COMPLETO"),
            (0, preact_mjs_1.h)("div", { class: "demo-flow-steps" },
                steps.map(s => (0, preact_mjs_1.h)("div", { class: "demo-flow-step", key: s.num },
                    (0, preact_mjs_1.h)("span", { class: "step-badge" }, s.num),
                    (0, preact_mjs_1.h)("strong", null, s.title),
                    (0, preact_mjs_1.h)("p", null, s.desc)
                ))
            )
        ),
        (0, preact_mjs_1.h)("div", { class: "demo-guide-grid" },
            (0, preact_mjs_1.h)("section", { class: "panel" },
                (0, preact_mjs_1.h)("span", { class: "demo-guide-number" }, "A"),
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "phone", size: 28 }),
                (0, preact_mjs_1.h)("h2", null, "Experiencia del cliente"),
                (0, preact_mjs_1.h)("p", null, "Complet\u00E1 una solicitud con datos de prueba, guard\u00E1 el enlace y prob\u00E1 la aceptaci\u00F3n de cotizaci\u00F3n."),
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
