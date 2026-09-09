import { createServer } from 'vite';
import { createElement } from 'preact';
import { renderToString } from 'preact-render-to-string';
import { readFile, writeFile, readdir } from 'node:fs/promises';
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const markup = renderToString(createElement(App));
  const html = await readFile('dist/index.html', 'utf8');
  const fonts = (await readdir('dist/assets')).filter(file => file.endsWith('.woff2'));
  const preloads = fonts.map(file => `<link rel="preload" href="/luna-proyectos-web/assets/${file}" as="font" type="font/woff2" crossorigin>`).join('');
  await writeFile('dist/index.html', html.replace('</head>', `${preloads}</head>`).replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
  console.log('Static HTML generated for search engines and first paint.');
} finally { await server.close(); }
