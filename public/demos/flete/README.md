# Flete · Presentación comercial 0.3.1

Portada con recorrido rápido, CTA móvil, preguntas frecuentes, controles de demo separados, aceptación de cotización y seguimiento contextual.

**Demostración local al navegador, no operación real.** IndexedDB conserva el nombre de base de v0.2 para mantener los ejemplos existentes. Sin Supabase, pagos, GPS ni cuentas reales. El panel es un rol de demostración. Usar datos ficticios.

Aceptar una cotización registra la aceptación del importe vigente: no confirma un viaje, no reserva una unidad ni genera un cobro. El operador confirma disponibilidad por separado. Una recotización invalida la aceptación anterior y una propuesta desactualizada se rechaza.

Los archivos JS/CSS estándar tienen nombres por hash e integridad SRI; release.json identifica el build. Ya no se depende de DecompressionStream ni de diez descargas binarias para abrir la página. La política de contenido impide llamadas a APIs desde esta presentación.

Prueba guiada: #/demo. Panel: #/admin. El frontend completo y el backend independiente siguen en el paquete fuente Flete v0.3.0; no se publican secretos ni datos de otros clientes.

Pruebas: tests/flete-preview.spec.ts usa HTTP e IndexedDB nativos en Chromium y WebKit. El resultado de la ejecución consta en GitHub Actions, no implica validación en un iPhone físico ni certificación de producción.

Preact conserva su licencia MIT en LICENSE.preact.
