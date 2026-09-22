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
    return (0, preact_mjs_1.h)("a", { class: "brand", href: admin ? '#/admin' : '#/', "aria-label": `${name}, inicio` }, (0, preact_mjs_1.h)("span", { class: "brand-mark" }, (0, preact_mjs_1.h)(Icon, { name: "route", size: 25 })), (0, preact_mjs_1.h)("span", { class: "brand-word" }, name, (0, preact_mjs_1.h)("span", { class: "brand-caption" }, admin ? 'PANEL DE OPERACIONES' : 'TRANSPORTE A TU MEDIDA')));
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
