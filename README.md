# LUNA Proyectos

Web comercial independiente, construida desde cero para mostrar software real y abrir conversaciones con negocios.

**Sitio:** https://marcoluna-nqn.github.io/luna-proyectos-web/

## Desarrollo

Node 24 y npm. Ejecutar `npm ci` y `npm run dev`. Vite sirve el proyecto en `/luna-proyectos-web/`.

Componentes React y TypeScript, Vite, CSS propio y renderizado estático al construir. El navegador usa `preact/compat` para ejecutar los componentes con un runtime pequeño: el bundle final ronda 14 KB gzip. Se eligió tras medir el costo de arranque móvil. La capa de compatibilidad no cambia los componentes ni su API; los recorridos completos se prueban en ambos motores. El HTML ya contiene todo el contenido comercial y SEO antes de ejecutar JavaScript. No hay backend.

Fuentes libres Manrope e Instrument Serif, alojadas en el sitio. Las licencias están en `public/licenses/`. Las imágenes de los productos son capturas de software auténtico, optimizadas a WebP.

## Verificación y publicación

```sh
npm run lint
npm run typecheck
npm run build
npm run test:unit
npx playwright install chromium webkit
npm test
```

En Linux, usar `npx playwright install --with-deps chromium webkit`. `npm test` configura un temporal dentro del proyecto para no depender de la unidad temporal de esta computadora. La matriz tiene cinco tamaños por navegador: 360×800, 390×844, 430×932, 768×1024 y 1440×1000.

`npm run preview -- --host 127.0.0.1 --port 4173` abre la compilación local. Con ese servidor activo, `node scripts/capture-site.mjs` genera las capturas y las piezas sociales; luego se vuelve a construir para incorporar el JPEG social. `node scripts/performance.mjs` genera los informes Lighthouse locales. Para un servidor publicado admite `PERF_URL`.

GitHub Actions verifica lint, tipos, build, contratos y Playwright antes de desplegar `dist` a GitHub Pages. La publicación se activa por un push a `main`. El repositorio y deployment son nuevos; no reemplazan ninguno existente. No hay dominio comprado ni hosting pago.

## Contenido y evidencia

- `src/App.tsx`: contenido y componentes de la página.
- `src/content.ts`: enlaces oficiales y ruta de imágenes.
- `src/App.css` y `src/index.css`: diseño y adaptación móvil.
- `artifacts/README-COMERCIAL.md`: posicionamiento, proyectos y auditoría comercial simulada.
- `artifacts/QA.md`: pruebas, límites y resultados.
- `artifacts/EVIDENCE.json`: procedencia, hashes y tamaños de las once capturas.
- `artifacts/screenshots-desktop/`, `screenshots-mobile/`, `social/`: entregables visuales.

Las fuentes de las aplicaciones están fuera de este repositorio. Los scripts de captura y preparación son herramientas locales de solo lectura, no se ejecutan en CI. El inventario con rutas locales y las capturas crudas están excluidos de Git.

**Bit Flow es un caso vendido y privado.** No añadir capturas, archivos, enlaces de demo, datos de cliente ni procesos privados. No presentarlo como producto disponible.

Referencias de implementación: [despliegue con Vite](https://vite.dev/guide/static-deploy.html#github-pages), [compatibilidad React de Preact](https://preactjs.com/guide/v10/getting-started/#aliasing-react-to-preact), [matrices de Playwright](https://playwright.dev/docs/test-projects).
