import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
await mkdir('public/media', { recursive: true });
const sources = [
  ...['taba-desktop', 'taba-mobile', 'taba-business', 'taba-business-mobile', 'taba-rider', 'taba-rider-mobile', 'catalog-desktop', 'catalog-mobile'].map(name => ({ name, source: `artifacts/evidence-local/${name}.png`, width: name.includes('mobile') ? 780 : 1440, provenance: name.startsWith('catalog') ? 'Public catalog demo, captured with Playwright' : 'TABA local showcase, synthetic data, remote requests blocked' })),
  ...[['oficio-agenda', '01-hoy-electricidad'], ['oficio-presupuesto', '04-presupuesto'], ['oficio-cobros', '14-cobros']].map(([name, file]) => ({ name, source: `../oficio/artifacts/reel-oficio-v1/prepared-app/${file}.png`, width: 780, provenance: 'OFICIO real Android capture; fictional seed data verified against source' })),
];
const manifest = [];
for (const item of sources) {
  const original = await readFile(item.source);
  const out = `public/media/${item.name}.webp`;
  const info = await sharp(original).resize({ width: item.width, withoutEnlargement: true }).webp({ quality: 87, effort: 6 }).toFile(out);
  manifest.push({ file: `media/${item.name}.webp`, sourceHash: createHash('sha256').update(original).digest('hex'), outputHash: createHash('sha256').update(await readFile(out)).digest('hex'), width: info.width, height: info.height, bytes: info.size, provenance: item.provenance, treatment: 'Resize and WebP encoding only; no interface or data fabrication' });
}
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/EVIDENCE.json', JSON.stringify({ capturedAt: '2026-09-09', bitFlow: 'No source, screenshots, binary, client identity or private workflow included. Sale and exclusivity stated by owner.', assets: manifest }, null, 2) + '\n');
console.log(manifest.map(x => `${x.file}: ${Math.round(x.bytes / 1024)} KB`).join('\n'));
