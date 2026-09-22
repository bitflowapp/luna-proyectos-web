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
};

function blankPayload() {
    return { kind: 'freight', origin: '', destination: '', when: 'asap', scheduled_at: null,
        details: { description: '', cargo_size: 'Mediana', quantity: 1, needs_help: false, helpers: 1,
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
    return `Hola ${request.payload.contact.name}, te escribimos de ${business}. La cotización de tu solicitud ${request.code} (${exports.serviceLabels[request.payload.kind]}), de ${request.payload.origin} a ${request.payload.destination}, es ${money(request.quote_cents)} ARS. Fecha: ${dateText(request.payload.scheduled_at)}. Respondé este mensaje para coordinar y confirmar disponibilidad. El servicio todavía no está confirmado.`;
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
