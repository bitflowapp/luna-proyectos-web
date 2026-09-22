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
