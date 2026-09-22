"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommercialHome = CommercialHome;
exports.DemoGuide = DemoGuide;
exports.CommercialFooter = CommercialFooter;
const preact_mjs_1 = require("./vendor/preact.mjs");
const ui_js_1 = require("./ui.js");
const domain_js_1 = require("./domain.js");

const inputValue = (event) => event.currentTarget.value;

function CommercialHome({ business, draft, errors, onDraft, onStart, onQuickSubmit, onScroll }) {
    const hasCoverage = business.coverage.trim() && business.coverage !== domain_js_1.defaultConfig.coverage;
    const contact = (0, domain_js_1.whatsappUrl)(business.whatsapp, 'Hola, quisiera consultar por un traslado.');

    return (0, preact_mjs_1.h)("main", { id: "main", class: "commercial-home" },
        (0, preact_mjs_1.h)("section", { class: "hero container" },
            (0, preact_mjs_1.h)("div", { class: "hero-copy" },
                (0, preact_mjs_1.h)("div", { class: "eyebrow hero-eyebrow" },
                    (0, preact_mjs_1.h)("span", { class: "little-line" }),
                    " TRANSPORTE A TU MEDIDA"
                ),
                (0, preact_mjs_1.h)("h1", { tabIndex: -1 },
                    "Tu traslado,",
                    (0, preact_mjs_1.h)("br", null),
                    (0, preact_mjs_1.h)("em", null, "bien coordinado.")
                ),
                (0, preact_mjs_1.h)("p", null,
                    "Ac\u00E1 pod\u00E9s pedir un flete, carga o traslado y recibir una cotizaci\u00F3n antes de salir. Sin crear cuenta, con seguimiento online y atenci\u00F3n directa con el operador."
                ),
                (0, preact_mjs_1.h)("div", { class: "hero-actions" },
                    (0, preact_mjs_1.h)("button", { class: "button button-primary button-large", onClick: () => onStart() },
                        "Solicitar servicio",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow" })
                    ),
                    (0, preact_mjs_1.h)("button", { class: "text-link how-link", onClick: () => onScroll('como-funciona') },
                        "Ver c\u00F3mo funciona",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "chevron", size: 16 })
                    )
                ),
                (0, preact_mjs_1.h)("div", { class: "hero-assurances" },
                    (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 17 }), " Cotizaci\u00F3n antes de confirmar"),
                    (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 17 }), " Sin crear una cuenta"),
                    (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check", size: 17 }), " Sin cobros autom\u00E1ticos")
                ),
                (0, preact_mjs_1.h)("div", { class: "hero-caption" },
                    (0, preact_mjs_1.h)("span", { class: "caption-line" }),
                    "De la primera consulta al \u00FAltimo kil\u00F3metro."
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "quick-card" },
                (0, preact_mjs_1.h)("div", { class: "quick-card-heading" },
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "EMPEZ\u00C1 POR EL RECORRIDO"),
                    (0, preact_mjs_1.h)("h2", null, "\u00BFDe d\u00F3nde a d\u00F3nde?"),
                    (0, preact_mjs_1.h)("p", null, "Contanos lo esencial. Despu\u00E9s, los detalles.")
                ),
                (0, preact_mjs_1.h)("form", { onSubmit: onQuickSubmit, noValidate: true },
                    (0, preact_mjs_1.h)("fieldset", { class: "quick-kind" },
                        (0, preact_mjs_1.h)("legend", { class: "sr-only" }, "Tipo de servicio"),
                        ['freight', 'passengers', 'special'].map(kind => (0, preact_mjs_1.h)("button", {
                            key: kind,
                            type: "button",
                            "aria-pressed": draft.kind === kind,
                            class: draft.kind === kind ? 'selected' : '',
                            onClick: () => onDraft({ kind })
                        },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: kind === 'freight' ? 'truck' : kind === 'passengers' ? 'users' : 'route', size: 18 }),
                            kind === 'freight' ? 'Flete' : kind === 'passengers' ? 'Pasajeros' : 'Especial'
                        ))
                    ),
                    (0, preact_mjs_1.h)("div", { class: "quick-stops" },
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "quick-origin", label: "Origen", error: errors.origin },
                            (0, preact_mjs_1.h)("input", {
                                id: "quick-origin",
                                autoComplete: "off",
                                placeholder: "Direcci\u00F3n y localidad de salida",
                                maxLength: 240,
                                value: draft.origin,
                                onInput: (e) => onDraft({ origin: inputValue(e) }),
                                "aria-invalid": Boolean(errors.origin),
                                "aria-describedby": errors.origin ? 'quick-origin-hint' : undefined
                            })
                        ),
                        (0, preact_mjs_1.h)(ui_js_1.Field, { id: "quick-destination", label: "Destino", error: errors.destination },
                            (0, preact_mjs_1.h)("input", {
                                id: "quick-destination",
                                autoComplete: "off",
                                placeholder: "Direcci\u00F3n y localidad de llegada",
                                maxLength: 240,
                                value: draft.destination,
                                onInput: (e) => onDraft({ destination: inputValue(e) }),
                                "aria-invalid": Boolean(errors.destination),
                                "aria-describedby": errors.destination ? 'quick-destination-hint' : undefined
                            })
                        )
                    ),
                    (0, preact_mjs_1.h)("button", { class: "button button-dark full", type: "submit" },
                        "Continuar solicitud",
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
                    ),
                    (0, preact_mjs_1.h)("p", { class: "quick-footnote" },
                        (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info", size: 14 }),
                        "Precio y disponibilidad a confirmar antes de viajar."
                    )
                )
            )
        ),
        (0, preact_mjs_1.h)("section", { class: "container confidence-strip", "aria-label": "C\u00F3mo te acompa\u00F1amos" },
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "check" }),
                (0, preact_mjs_1.h)("span", null, "Cotizaci\u00F3n antes", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("strong", null, "de confirmar"))
            ),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock" }),
                (0, preact_mjs_1.h)("span", null, "Sin crear", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("strong", null, "una cuenta"))
            ),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route" }),
                (0, preact_mjs_1.h)("span", null, "Seguimiento", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("strong", null, "paso a paso"))
            ),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "phone" }),
                (0, preact_mjs_1.h)("span", null, "Atenci\u00F3n directa", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("strong", null, "con el operador"))
            )
        ),
        (0, preact_mjs_1.h)("section", { id: "servicios", class: "container services-section" },
            (0, preact_mjs_1.h)("div", { class: "section-heading" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "UN SERVICIO PARA CADA NECESIDAD"),
                    (0, preact_mjs_1.h)("h2", null, "Lo que necesit\u00E1s mover.", (0, preact_mjs_1.h)("br", null), "El viaje que necesit\u00E1s hacer.")
                ),
                (0, preact_mjs_1.h)("p", null, "Eleg\u00ED tu servicio.", (0, preact_mjs_1.h)("br", null), "Nos ocupamos de coordinar los detalles.")
            ),
            (0, preact_mjs_1.h)("div", { class: "services-grid" }, [
                ['freight', 'Fletes y cargas', 'Muebles, cajas y mercadería.', 'Indicá el tamaño, sumá fotos y contanos si necesitás ayuda para cargar.', 'truck'],
                ['passengers', 'Traslado de pasajeros', 'Solo, en grupo o con equipaje.', 'Elegí la cantidad de pasajeros y coordiná un viaje de ida o ida y vuelta.', 'users'],
                ['special', 'Traslados especiales', 'Un recorrido fuera de lo habitual.', 'Describí lo que necesitás para que podamos evaluar una solución a medida.', 'route'],
            ].map(([kind, title, intro, text, icon], index) => (0, preact_mjs_1.h)("button", {
                class: `service-card service-${kind}`,
                onClick: () => onStart(kind),
                key: kind,
                "aria-label": `Solicitar ${title.toLowerCase()}`
            },
                (0, preact_mjs_1.h)("div", { class: "service-card-top" },
                    (0, preact_mjs_1.h)("span", { class: "service-number" }, "0", index + 1),
                    (0, preact_mjs_1.h)("span", { class: "service-icon" }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: icon, size: 28 }))
                ),
                (0, preact_mjs_1.h)("h3", null, title),
                (0, preact_mjs_1.h)("p", null, (0, preact_mjs_1.h)("strong", null, intro), " ", text),
                (0, preact_mjs_1.h)("span", { class: "card-link" },
                    "Solicitar servicio",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
                )
            )))
        ),
        (0, preact_mjs_1.h)("section", { id: "como-funciona", class: "how-section" },
            (0, preact_mjs_1.h)("div", { class: "container" },
                (0, preact_mjs_1.h)("div", { class: "section-heading" },
                    (0, preact_mjs_1.h)("div", null,
                        (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "VOS SAB\u00C9S QU\u00C9 SIGUE"),
                        (0, preact_mjs_1.h)("h2", null, "Menos idas y vueltas.", (0, preact_mjs_1.h)("br", null), "M\u00E1s claridad en cada paso.")
                    ),
                    (0, preact_mjs_1.h)("p", null, "Enviar la solicitud es el comienzo.", (0, preact_mjs_1.h)("br", null), "El viaje se confirma despu\u00E9s de coordinar.")
                ),
                (0, preact_mjs_1.h)("div", { class: "how-grid" }, [
                    ['01', 'Pedí tu servicio', 'Origen, destino, fecha y los datos necesarios para cotizar sin vueltas.'],
                    ['02', 'Revisá la propuesta', 'Conocé el precio y aceptá la cotización antes de avanzar.'],
                    ['03', 'Seguí el traslado', 'El operador confirma el viaje y actualiza su estado hasta finalizar.'],
                ].map(([n, title, text]) => (0, preact_mjs_1.h)("article", { class: "how-step", key: n },
                    (0, preact_mjs_1.h)("span", null, n),
                    (0, preact_mjs_1.h)("h3", null, title),
                    (0, preact_mjs_1.h)("p", null, text)
                ))),
                (0, preact_mjs_1.h)("div", { class: "process-note" },
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "shield", size: 18 }),
                    (0, preact_mjs_1.h)("p", null, "Aceptar una cotizaci\u00F3n no genera un cobro autom\u00E1tico. La disponibilidad y el veh\u00EDculo se confirman directamente con el operador.")
                )
            )
        ),
        (0, preact_mjs_1.h)("section", { id: "cobertura", class: "container coverage-section" },
            (0, preact_mjs_1.h)(ui_js_1.TransportArt, null),
            (0, preact_mjs_1.h)("div", { class: "coverage-copy" },
                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "CADA RECORRIDO ES DIFERENTE"),
                (0, preact_mjs_1.h)("h2", null, "\u00BFHasta d\u00F3nde", (0, preact_mjs_1.h)("br", null), (0, preact_mjs_1.h)("em", null, "necesit\u00E1s llegar?")),
                (0, preact_mjs_1.h)("p", null, hasCoverage ? business.coverage : 'Consultá disponibilidad para tu recorrido. Indicá las localidades de origen y destino; evaluamos el trayecto y confirmamos si podemos realizarlo antes de aceptar el servicio.'),
                (0, preact_mjs_1.h)("div", { class: "coverage-route", "aria-label": "El recorrido se consulta antes de confirmar" },
                    (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)("i", { class: "origin-dot" }), "Tu origen"),
                    (0, preact_mjs_1.h)("span", { class: "coverage-dashes" }),
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 17 }),
                    (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)("i", { class: "destination-dot" }), "Tu destino")
                ),
                (0, preact_mjs_1.h)("p", { class: "tiny coverage-disclaimer" }, "La zona de cobertura y los veh\u00EDculos de esta presentaci\u00F3n se configuran con el negocio. La ilustraci\u00F3n no representa una unidad real."),
                (0, preact_mjs_1.h)("button", { class: "text-link", onClick: () => onScroll('quick-origin') },
                    "Consultar mi recorrido",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 17 })
                )
            )
        ),
        (0, preact_mjs_1.h)("section", { id: "preguntas", class: "container faq-section" },
            (0, preact_mjs_1.h)("div", { class: "faq-heading" },
                (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "ANTES DE ARRANCAR"),
                (0, preact_mjs_1.h)("h2", null, "Algunas respuestas,", (0, preact_mjs_1.h)("br", null), "para viajar tranquilo."),
                (0, preact_mjs_1.h)("p", null, "Lo importante, sin letra chica.")
            ),
            (0, preact_mjs_1.h)("div", { class: "faq-list" }, [
                ['¿Cómo se calcula el precio?', 'El operador revisa el recorrido y los detalles de tu solicitud y carga una cotización personalizada. No hay una tarifa genérica fija ni se cobra al enviar el formulario.'],
                ['¿Puedo programarlo para otro día?', 'Sí. En la solicitud podés elegir fecha y horario de salida. Es una preferencia de viaje: queda sujeta a la disponibilidad que confirme el operador.'],
                ['¿También puedo pedir un traslado de pasajeros?', 'Sí. Elegí “Pasajeros”, indicá cuántas personas viajan, el equipaje y si necesitás ida y vuelta. La unidad y sus plazas se coordinan antes de confirmar.'],
                ['¿Cuándo queda confirmado mi servicio?', 'Primero recibís la cotización. Después de que aceptás el importe propuesto, el operador revisa disponibilidad y confirma el servicio. Podés consultar las novedades en tiempo real desde el enlace de seguimiento.'],
            ].map(([question, answer]) => (0, preact_mjs_1.h)("details", { key: question },
                (0, preact_mjs_1.h)("summary", null,
                    question,
                    (0, preact_mjs_1.h)("span", { class: "faq-plus" }, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "plus", size: 18 }))
                ),
                (0, preact_mjs_1.h)("p", null, answer)
            )))
        ),
        (0, preact_mjs_1.h)("section", { class: "container closing-section" },
            (0, preact_mjs_1.h)("div", { class: "closing-panel" },
                (0, preact_mjs_1.h)("div", null,
                    (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "COORDINEMOS EL PR\u00D3XIMO RECORRIDO"),
                    (0, preact_mjs_1.h)("h2", null, "Vos dec\u00EDs a d\u00F3nde.", (0, preact_mjs_1.h)("br", null), "Empecemos por ah\u00ED."),
                    (0, preact_mjs_1.h)("p", null, "Una solicitud clara. Una propuesta antes de salir.")
                ),
                (0, preact_mjs_1.h)("button", { class: "button button-primary button-large", onClick: () => onStart() },
                    "Solicitar servicio",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow" })
                )
            ),
            (0, preact_mjs_1.h)("div", { class: "contact-strip" },
                (0, preact_mjs_1.h)("span", null, (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "message" }), "\u00BFYa hiciste una solicitud?"),
                (0, preact_mjs_1.h)("a", { class: "text-link", href: "#/seguimiento" },
                    "Consultar el estado",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 16 })
                ),
                contact && (0, preact_mjs_1.h)("a", { class: "text-link", href: contact, target: "_blank", rel: "noopener noreferrer" },
                    "Consultar por WhatsApp",
                    (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "external", size: 16 })
                )
            )
        )
    );
}

function DemoGuide({ temporary, onStart, onExample, onReset, busy }) {
    const steps = [
        { num: '01', title: 'Cliente pide', desc: 'Ingresa origen, destino, fecha y detalles desde el formulario rápido o wizard.' },
        { num: '02', title: 'Dueño recibe', desc: 'La solicitud ingresa al panel en tiempo real en la bandeja de Nuevas.' },
        { num: '03', title: 'Cotiza', desc: 'El operador analiza el recorrido y carga el importe en pesos.' },
        { num: '04', title: 'Cliente acepta', desc: 'Desde su enlace de seguimiento, el cliente revisa el precio y presiona “Aceptar cotización”.' },
        { num: '05', title: 'Dueño confirma', desc: 'El operador ve la cotización aceptada en “Requiere atención” y confirma disponibilidad.' },
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
            "Recorr\u00E9 en 2 a 3 minutos lo que vive el cliente y c\u00F3mo administra el due\u00F1o, desde este mismo navegador."
        ),
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
                (0, preact_mjs_1.h)("p", null, "Abr\u00ED un ejemplo cotizado para ver c\u00F3mo el cliente acepta el precio y luego el due\u00F1o confirma la disponibilidad.")
            ),
            (0, preact_mjs_1.h)("button", { class: "button button-light", onClick: onExample },
                "Ver ejemplo de seguimiento",
                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "route", size: 18 })
            )
        ),
        (0, preact_mjs_1.h)("div", { class: "demo-guide-notice" },
            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "info" }),
            (0, preact_mjs_1.h)("div", null,
                (0, preact_mjs_1.h)("strong", null, "Demostraci\u00F3n interactiva en tu navegador."),
                (0, preact_mjs_1.h)("p", null,
                    temporary ? 'El almacenamiento no está disponible: las pruebas se conservan solo mientras no recargues.' : 'Los datos se guardan en IndexedDB localmente en este navegador. No se envían a servidores remotos ni se sincronizan entre dispositivos.',
                    " El panel opera en modo demostración sin requerir contraseñas. No se realizan cobros ni se despachan viajes reales."
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
