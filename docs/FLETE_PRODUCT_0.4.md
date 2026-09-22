# Flete 0.4.0 · Simplificación radical de UX

Alcance: `COMMERCIAL_DEMO`. Datos ficticios en IndexedDB del navegador. Sin backend remoto, pagos, GPS ni sincronización entre dispositivos.

La experiencia del cliente tiene tres pantallas:

1. servicio, origen y destino;
2. cuándo y los datos mínimos del traslado;
3. nombre, teléfono y resumen antes de enviar.

Fotos, medidas, observaciones, ayudantes y email quedan detrás de controles de detalle opcional. La portada permite empezar de inmediato y evita llamadas a la acción repetidas.

El seguimiento prioriza estado, cotización y recorrido. El progreso queda plegado. Compartir intenta `navigator.share`, luego portapapeles y finalmente selección manual. Actualizar relee la solicitud sin recargar la página y muestra confirmación.

El panel del dueño muestra nuevas solicitudes, cotizaciones aceptadas y servicios en curso. El detalle ordena cliente, recorrido, fecha y necesidad antes de cotizar, asignar vehículo, cambiar estado y consultar notas internas.

## Verificación

- Chromium: 360, 390, 430, 768 y 1440.
- WebKit: 360, 390, 430, 768 y 1440.
- Flujo completo de solicitud, cotización y aceptación: Chromium 390 y WebKit 390.
- Share nativo simulado y fallback manual comprobados por efecto.
- Actualización comprobada por feedback posterior a la lectura.
- Inputs móviles a 16 px o más y objetivos táctiles críticos de al menos 48 px.
- Doce capturas revisadas en `artifacts/flete-ux-screenshots/`.

La revisión automatizada no equivale a una prueba en un iPhone físico ni a una auditoría WCAG integral.
