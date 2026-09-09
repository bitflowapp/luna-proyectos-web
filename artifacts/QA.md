# QA — LUNA Proyectos

Fecha: 9 de septiembre de 2026. Proyecto nuevo e independiente.

## Alcance

La QA certifica la web comercial y la fidelidad de la evidencia publicada. No certifica producción, cobros o aceptación comercial de las aplicaciones fuente. No se enviaron mensajes, pedidos ni pagos. No se alteró el Android conectado.

## Matriz

Chromium y WebKit: 360×800, 390×844, 430×932, 768×1024, 1440×1000. Sesiones limpias, movimiento reducido para capturas reproducibles. Las pruebas corren sobre `dist`, incluyendo HTML prerenderizado e hidratación.

La suite completa se guarda en `playwright-results.json`. La matriz local final tiene 60 pruebas; los resultados de CI y del sitio público se registran al publicar. Sus seis recorridos se ejecutan en cada combinación:

1. Claridad del hero, CTA dentro del viewport, evidencia en el primer bloque, imágenes cargadas, ausencia de overflow horizontal, anchors válidos y consola limpia.
2. Cambio real de capturas de TABA y OFICIO; ampliación; tabulación, cierre con Escape y retorno al control que abrió el visor.
3. Skip link por teclado, navegación a proyectos, menú móvil, contacto y FAQ con Enter.
4. Exclusividad de Bit Flow: ambos badges, mensaje de indisponibilidad y ausencia de enlaces, botones, imágenes o videos.
5. Axe: WCAG A/AA, contraste y prácticas de accesibilidad, sin exclusiones para ocultar errores.
6. Título, idioma, canonical, datos estructurados, manifest, sitemap, robots, iconos, imagen social y texto comercial en HTML sin depender de JS.

Tres contratos adicionales verifican hashes de las once imágenes publicadas, prerender comercial y ausencia de archivos privados/binarios en `public`.

## Revisión visual y comercial

Se revisaron capturas reales en desktop, tablet y móviles. Se ajustaron el título móvil, tamaño de lectura, badges de estado, composición del hero, controles de ampliación y espacio de las notas. El visor conserva el tamaño de las pantallas, permite desplazarse con teclado y no muestra controles de la web encima de la interfaz capturada.

La revisión comercial de cuatro perfiles está en `README-COMERCIAL.md`. Es una simulación heurística, no una prueba con usuarios reales. No hay métricas o resultados comerciales inventados.

## Rendimiento

La optimización redujo el JavaScript inicial de aproximadamente 66 KB gzip a 14 KB gzip, manteniendo los componentes React mediante Preact compat. Se entregan dos familias tipográficas en cuatro archivos WOFF2, con preload; imágenes WebP y lazy loading; HTML comercial estático; dimensiones reservadas; sin autoplay, trackers, librerías de animación ni peticiones a terceros en el sitio. Manrope usa tres pesos estáticos para conservar su apariencia en WebKit para Windows.

Medición local Lighthouse tras optimización:

| Métrica | Móvil simulado | Desktop |
| --- | --- | --- |
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2,1 s | 0,4 s |
| CLS | 0 | 0 |
| TBT | 0 ms | 0 ms |

Informes y configuración reproducible en `performance/` y `scripts/performance.mjs`. Son mediciones de laboratorio local y dependen de CPU/red; no son datos de visitantes ni garantías de velocidad en todos los teléfonos.

## Privacidad y límites

- Contacto: únicamente Instagram oficial provisto por el propietario. No se inventaron WhatsApp o email.
- Bit Flow: no se publicó cliente, contrato, precio, captura, código, APK, demo ni workflow. La afirmación de venta/exclusividad proviene del propietario.
- TABA: todas las capturas provienen de showcase local con datos sintéticos. El acceso externo se bloqueó. No se publican métricas de pedidos, GPS de personas ni integraciones de pago supuestamente activas.
- OFICIO: la información visible coincide con la demostración ficticia y su documentación comercial. No se usaron notificaciones del teléfono, fotografías privadas ni videos con placeholders.
- Personas: Marco y Sofía se presentan sin inventar credenciales ni retratos.
- GitHub Pages: `robots.txt` se entrega en el subdirectorio del proyecto. El robots efectivo de la raíz del dominio depende de GitHub/otros proyectos y no se modifica. Sitemap y canonical apuntan a esta web.
- WebKit es el motor probado en Windows/Linux; no equivale a afirmar que se ejecutó Safari en un iPhone físico.

Los bloqueos temporales de la máquina se resolvieron usando los navegadores instalados y un directorio temporal dentro del proyecto. El teléfono y los repositorios fuente no se modificaron.

## Resultado local final

- Lint: PASS, sin errores.
- Typecheck: PASS.
- Build y prerender: PASS.
- Contratos: 3/3 PASS.
- Playwright: 60/60 PASS en Chromium y WebKit, las cinco resoluciones; cero fallos o skips.
- Consola, enlaces internos, imágenes, foco, teclado, contraste y SEO: PASS dentro del alcance probado.
- Evidencia real y exclusividad de Bit Flow: PASS.
- Auditoría comercial simulada: PASS, con los límites indicados en README-COMERCIAL.
