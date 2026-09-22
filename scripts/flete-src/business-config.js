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
