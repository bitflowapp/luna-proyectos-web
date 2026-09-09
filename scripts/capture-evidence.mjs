import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

// Read-only capture of the existing product. Nothing is written to its repository.
const source = resolve(process.env.TABA_SOURCE || '../dev/la-taba-business-panel-automation');
const output = 'artifacts/evidence-local';
await mkdir(output, { recursive: true });
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (pathname === '/runtime-config.js') {
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    return res.end('delete globalThis.__LA_TABA_RUNTIME_CONFIG__;');
  }
  const file = resolve(source, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(source + sep) || /(?:^|[\\/])\.|\.(?:env|pem|key)$/.test(file.slice(source.length + 1))) {
    res.writeHead(403); return res.end();
  }
  try { res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); res.end(await readFile(file)); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise(done => server.listen(4180, '127.0.0.1', done));
const browser = await chromium.launch();
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, serviceWorkers: 'block' });
  // This capture cannot reach a live backend, payment provider or private data.
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4180/?showcase=1#home');
  await page.waitForTimeout(2500);
  await page.locator('[data-showcase-action="close"]').first().click();
  await page.screenshot({ path: `${output}/taba-desktop.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: `${output}/taba-mobile.png` });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const step of ['business', 'rider']) {
    await page.locator('[data-showcase-action="return"]').click();
    await page.locator(`[data-showcase-step="${step}"]`).click();
    await page.waitForTimeout(1200);
    const closer = page.locator('[data-showcase-action="close"]').first();
    if (await closer.isVisible()) await closer.click();
    await page.screenshot({ path: `${output}/taba-${step}.png` });
    await writeFile(`${output}/taba-${step}.txt`, await page.locator('body').innerText());
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `${output}/taba-${step}-mobile.png` });
    await page.setViewportSize({ width: 1440, height: 1000 });
  }
  await writeFile(`${output}/taba-ui.txt`, await page.locator('body').innerText());
  console.log('TABA captured in local showcase mode');
  const catalog = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  const response = await catalog.goto('https://bitflowapp.github.io/luna-catalogo-demo-preview/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await catalog.waitForTimeout(3500);
  console.log('CATALOG HTTP', response.status());
  await catalog.screenshot({ path: `${output}/catalog-desktop.png` });
  await writeFile(`${output}/catalog-ui.txt`, await catalog.locator('body').innerText());
  console.log('CATALOG captured from the public demo');
  await catalog.setViewportSize({ width: 390, height: 844 });
  await catalog.screenshot({ path: `${output}/catalog-mobile.png` });
} finally { await browser.close(); server.close(); }
