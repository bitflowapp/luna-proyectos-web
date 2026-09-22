# Flete 0.5 · Solicitud corta y seguimiento sin callejón sin salida

Alcance: demostración comercial por navegador. No es una operación remota real.

## Cambios

- Se reemplazan seis pantallas del formulario por tres: recorrido; qué y cuándo; contacto y envío. Origen/destino ya ingresados en portada no vuelven a pedirse. La pantalla final sólo pide nombre y celular: WhatsApp alternativo, correo y ampliación del resumen son opcionales.
- Fotos, tamaño, bultos y observaciones se agrupan en una sección opcional. No se quitan validaciones ni datos de pasajeros, regreso programado o servicios especiales.
- El borrador de la versión anterior migra a tres pasos manteniendo payload y token. No se borra IndexedDB ni se reinician datos previos.
- Después de enviar aparece, junto al estado, una acción para cotizar esa misma solicitud como dueño. Tras guardar el precio, el panel ofrece volver como cliente. Aceptar precio no confirma ni cobra el servicio.
- Actualizar informa junto al botón si no hubo cambios, si cambió el estado o si falló la consulta.
- Copiar ya no invita a compartir una URL local como si sirviera en otro teléfono. La respuesta aparece junto al control. Si el navegador bloquea Clipboard, se muestra un campo seleccionable y se enfoca para copia manual. No se afirma que se haya copiado si la API rechaza.
- Mis solicitudes recupera solicitudes creadas por el visitante en IndexedDB, incluso en otra pestaña del mismo navegador. Se excluyen los ejemplos iniciales y solicitudes vencidas. El acceso por token no se sustituye por códigos públicos. Se mantiene el atajo de la última solicitud para las pruebas antiguas.
- Se elimina el pie comercial largo del formulario. Los detalles operativos del recorrido se pueden desplegar sin cargar de texto la pantalla principal.

## Verificación

Las pruebas de regresión se adaptan al nuevo recorrido (no se eliminan aserciones sobre cotización, concurrencia, persistencia, privacidad o aislamiento). Se agregan seis escenarios de integración, incluyendo bloqueo deliberado de Clipboard, recuperación sin enlaces, servicios distintos y migración de borrador.

El contenedor de revisión impide navegación HTTP con ERR_BLOCKED_BY_ADMINISTRATOR. Allí se ejecuta únicamente una comprobación visual/funcional con HTML inyectado y el adaptador temporal. La navegación HTTP nativa, IndexedDB y Chromium/WebKit se comprueban por separado en GitHub Actions antes de integrar; el resultado exacto se registra en el PR. La URL pública se prueba después de publicar.

## Límites

Datos ficticios locales, sin backend remoto, sincronización entre teléfonos, autenticación de producción, pagos, mensajes enviados ni GPS. No se certifica Safari en iPhone físico. Un enlace de una prueba de un navegador no abre esa solicitud en un navegador independiente. La migración recupera datos del navegador actual; no puede recuperar datos guardados en otro dispositivo.
