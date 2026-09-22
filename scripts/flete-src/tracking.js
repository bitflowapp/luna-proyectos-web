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

function TrackingView({ tracking: t, error, success, business, preview, busy, lookup, pendingPhotos, onCopy, onRefresh, onManage, onAccept, onRetryPhotos }) {
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
                        "Revisar el enlace",
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
                        (0, preact_mjs_1.h)("p", null, success ? 'Guardá este enlace privado para consultar la cotización y los próximos pasos.' : 'El último estado informado por el operador, en un solo lugar.')
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
                                (0, preact_mjs_1.h)("p", null, awaiting ? 'El importe quedó aceptado. Falta la confirmación del operador; todavía no hay un viaje confirmado ni un cobro.' : descriptions[t.status])
                            )
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
                            (0, preact_mjs_1.h)("button", {
                                class: `button ${t.status === 'quoted' && !accepted ? 'button-light' : 'button-dark'}`,
                                onClick: onCopy
                            },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "copy", size: 18 }),
                                "Copiar enlace privado"
                            ),
                            (0, preact_mjs_1.h)("button", { class: "button button-light", onClick: onRefresh, disabled: busy },
                                (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "refresh", size: 17 }),
                                "Actualizar"
                            )
                        ),
                        lookup && (
                            (0, preact_mjs_1.h)(ui_js_1.Field, { id: "copy-link", label: "Enlace privado para copiar" },
                                (0, preact_mjs_1.h)("input", {
                                    id: "copy-link",
                                    readOnly: true,
                                    value: lookup,
                                    onFocus: (e) => e.currentTarget.select()
                                })
                            )
                        ),
                        (0, preact_mjs_1.h)("p", { class: "privacy-note" },
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "lock", size: 15 }),
                            preview ? 'En esta demo, el enlace funciona sólo en este navegador. No crea un servicio real ni envía mensajes.' : 'Quien tenga este enlace puede ver el recorrido y el estado. No lo compartas públicamente.'
                        )
                    ),
                    (0, preact_mjs_1.h)("aside", { class: "tracking-aside" },
                        (0, preact_mjs_1.h)("section", { class: "panel journey-panel" },
                            (0, preact_mjs_1.h)("h2", null, "El recorrido de tu solicitud"),
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
                preview && (
                    (0, preact_mjs_1.h)("section", { class: "demo-handoff" },
                        (0, preact_mjs_1.h)("div", null,
                            (0, preact_mjs_1.h)("span", { class: "eyebrow" }, "AHORA, PROB\u00C1 EL OTRO LADO"),
                            (0, preact_mjs_1.h)("h3", null, "As\u00ED lo recibe el due\u00F1o del negocio."),
                            (0, preact_mjs_1.h)("p", null, "Abr\u00ED esta solicitud en el panel de operaciones, prepar\u00E1 la cotizaci\u00F3n o confirm\u00E1 el servicio.")
                        ),
                        (0, preact_mjs_1.h)("button", { class: "button button-light", onClick: onManage },
                            "Gestionar en el panel",
                            (0, preact_mjs_1.h)(ui_js_1.Icon, { name: "arrow", size: 18 })
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
