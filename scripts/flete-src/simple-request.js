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
