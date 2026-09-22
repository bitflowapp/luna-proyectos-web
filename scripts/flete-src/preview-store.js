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
        return { id: r.id, code: r.code, created: true, is_demo: true };
    }),
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
