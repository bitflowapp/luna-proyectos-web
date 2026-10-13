// Capturas a 390px de las páginas de prueba. Uso: node design-previews/shots.mjs <carpeta-salida>
import { chromium } from "@playwright/test";
import { pathToFileURL } from "node:url";
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(process.argv[2] ?? join(here, "out"));
mkdirSync(out, { recursive: true });
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: "reduce" });
const jobs = [
  ["a", "", "a-primera-pantalla", false],
  ["b", "", "b-primera-pantalla", false],
  ["c", "", "c-primera-pantalla", false],
  ["c", "?open", "c-burbuja-abierta", false],
  ["a", "", "a-completa", true],
  ["b", "", "b-completa", true],
  ["c", "", "c-completa", true],
];
for (const [page, q, name, full] of jobs) {
  const p = await ctx.newPage();
  await p.goto(pathToFileURL(join(here, `${page}.html`)).href + q);
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: join(out, `${name}.png`), fullPage: full });
  const overflow = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(name, "overflow-x:", overflow);
  await p.close();
}
await browser.close();
