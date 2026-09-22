import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('Published screenshots match the reviewed evidence manifest', async () => {
  const manifest = JSON.parse(await readFile('artifacts/EVIDENCE.json', 'utf8'));
  assert.equal(manifest.assets.length, 11);
  for (const asset of manifest.assets) {
    assert.equal(createHash('sha256').update(await readFile(`public/${asset.file}`)).digest('hex'), asset.outputHash, asset.file);
    assert.ok(!/bit.?flow/i.test(asset.file));
  }
});
test('Production build ships semantic content without JavaScript', async () => {
  const html = await readFile('dist/index.html', 'utf8');
  assert.match(html, /<h1[^>]*>Software para/);
  assert.match(html, /CASO VENDIDO/);
  assert.match(html, /PROYECTO PRIVADO/);
  assert.match(html, /PROBAR DEMO/);
  assert.match(html, /lunaaproyectos/);
});
test('Public payload contains no private project binaries or source bundles', async () => {
  const files = await readdir('public', { recursive: true });
  assert.equal(files.some(file => /\.(apk|aab|zip|env|pem|key|db|sql)$/i.test(file)), false);
  assert.equal(files.some(file => /bit.?flow/i.test(file)), false);
});

test('Flete public bundle contains neutral commercial claims', async () => {
  const fleteFiles = await readdir('public/demos/flete');
  const publishedFiles = fleteFiles.filter(file => file === 'index.html' || /^app-[a-f0-9]+\.js$/i.test(file));
  const published = (await Promise.all(publishedFiles.map(file => readFile(`public/demos/flete/${file}`, 'utf8')))).join('\n').toLowerCase();
  const forbidden = [
    /\bcaba\b/i,
    /\bgba\b/i,
    /palermo/i,
    /belgrano/i,
    /caballito/i,
    /pilar/i,
    /san isidro/i,
    /\bla plata\b/i,
    /production ready/i,
    /live ready/i,
    /seguro de carga/i,
  ];

  for (const pattern of forbidden) assert.equal(pattern.test(published), false, pattern.toString());
  assert.match(published, /demo comercial/);
  assert.match(published, /ejemplo de cotizaci/);
});
