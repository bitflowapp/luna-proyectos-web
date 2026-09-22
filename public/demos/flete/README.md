# Flete · Demo comercial 0.4.0

PROJECT_STATUS: DEMO_READY
SCOPE: COMMERCIAL_DEMO

Presentación interactiva del flujo de solicitud, cotización, aceptación, seguimiento y panel operativo. Su objetivo es mostrar una primera base configurable para conversar con el prestador.

La solicitud pública se presenta en un máximo de tres pantallas: recorrido, datos mínimos del servicio y contacto/resumen. Los campos secundarios usan despliegue progresivo. En mobile, compartir usa la hoja nativa cuando existe y conserva fallback de portapapeles o selección manual; actualizar relee IndexedDB sin recargar la página y confirma el resultado.

Los recorridos, vehículos, identificadores, nombres de contacto e importes visibles son datos ficticios de demostración. El nombre comercial, cobertura, vehículos reales, choferes, precios, reglas, condiciones y política de cancelación quedan pendientes de personalización con el cliente.

La demo usa IndexedDB únicamente en este navegador. No tiene backend remoto, sincronización entre dispositivos, pagos, facturación ni GPS. El panel funciona con un rol demo y no coordina viajes reales.

Aceptar una cotización sólo registra la interacción de la demo: no confirma un viaje, no reserva una unidad ni genera un cobro. Las condiciones del servicio se definen con el prestador.

Prueba guiada: `#/demo`. Panel: `#/admin`. Los archivos JS/CSS publicados tienen nombres por hash e integridad SRI; `release.json` identifica el build.

Accesibilidad: revisión básica de contraste, teclado y focus verificada en la matriz automatizada; no es una auditoría ni una certificación WCAG integral.

Pruebas: `tests/flete-preview.spec.ts` y `tests/flete-finish.spec.ts` usan HTTP e IndexedDB nativos en Chromium y WebKit, con viewports 360, 390, 430, 768 y 1440. El resultado no equivale a una validación en un iPhone físico ni a una puesta en producción.

Preact conserva su licencia MIT en `LICENSE.preact`.
