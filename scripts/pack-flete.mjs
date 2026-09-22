import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { Script } from 'node:vm';

export function buildFleteBundle({ version = '0.5.0' } = {}) {
  const moduleOrder = [
    'vendor/preact.mjs',
    'business-config.js',
    'domain.js',
    'build-mode.js',
    'preview-store.js',
    'api.js',
    'ui.js',
    'commercial.js',
    'tracking.js',
    'simple-request.js',
    'app.js'
  ];

  let bundle = "(()=>{'use strict';const defs={";
  for (let i = 0; i < moduleOrder.length; i++) {
    const modName = moduleOrder[i];
    const modFile = path.join('scripts/flete-src', modName);
    const code = fs.readFileSync(modFile, 'utf8');
    const args = 'require,module,exports';
    bundle += `"${modName}":function(${args}){\n${code}\n}`;
    if (i + 1 < moduleOrder.length) {
      bundle += ',';
    }
  }
  bundle += "};const cache={};function load(key){if(cache[key])return cache[key].exports;const m={exports:{}};cache[key]=m;defs[key](p=>load(p.startsWith('./')?p.slice(2):p),m,m.exports);return m.exports;}load('app.js');})();";

  // Calculate hashes
  const jsBuffer = Buffer.from(bundle, 'utf8');
  const jsSha256 = crypto.createHash('sha256').update(jsBuffer).digest('hex');
  const jsSha384 = crypto.createHash('sha384').update(jsBuffer).digest('base64');
  const jsFileName = `app-${jsSha256.slice(0, 12)}.js`;

  // Read CSS
  // Check if we have source CSS in scripts/flete-src/styles.css or in public
  let cssContent;
  if (fs.existsSync('scripts/flete-src/styles.css')) {
    cssContent = fs.readFileSync('scripts/flete-src/styles.css', 'utf8');
  } else {
    // Find current styles-*.css in public/demos/flete
    const fleteFiles = fs.readdirSync('public/demos/flete');
    const existingCss = fleteFiles.find(f => f.startsWith('styles-') && f.endsWith('.css'));
    cssContent = fs.readFileSync(path.join('public/demos/flete', existingCss), 'utf8');
  }

  const cssBuffer = Buffer.from(cssContent, 'utf8');
  const cssSha256 = crypto.createHash('sha256').update(cssBuffer).digest('hex');
  const cssSha384 = crypto.createHash('sha384').update(cssBuffer).digest('base64');
  const cssFileName = `styles-${cssSha256.slice(0, 12)}.css`;

  // Read boot-check.js
  const bootBuffer = fs.readFileSync('public/demos/flete/boot-check.js');
  const bootSha256 = crypto.createHash('sha256').update(bootBuffer).digest('hex');
  const bootSha384 = crypto.createHash('sha384').update(bootBuffer).digest('base64');

  // Fail before overwriting a good build if a source has invalid JavaScript.
  new Script(jsBuffer.toString('utf8'), { filename: jsFileName });

  // Clean old app-*.js and styles-*.css in public/demos/flete
  const fleteFiles = fs.readdirSync('public/demos/flete');
  for (const f of fleteFiles) {
    if ((f.startsWith('app-') && f.endsWith('.js')) || (f.startsWith('styles-') && f.endsWith('.css'))) {
      fs.unlinkSync(path.join('public/demos/flete', f));
    }
  }

  // Write new app-*.js and styles-*.css
  fs.writeFileSync(path.join('public/demos/flete', jsFileName), jsBuffer);
  fs.writeFileSync(path.join('public/demos/flete', cssFileName), cssBuffer);

  // Update release.json
  const releaseManifest = {
    version,
    mode: 'browser-demo',
    projectStatus: 'DEMO_READY',
    scope: 'COMMERCIAL_DEMO',
    productionReady: false,
    storage: 'IndexedDB: same-browser only',
    sourceFiles: [...moduleOrder, 'styles.css'].map(file => ({
      file: `scripts/flete-src/${file}`,
      sha256: crypto.createHash('sha256').update(fs.readFileSync(`scripts/flete-src/${file}`)).digest('hex'),
    })),
    files: [
      {
        file: jsFileName,
        sha256: jsSha256,
        bytes: jsBuffer.length
      },
      {
        file: cssFileName,
        sha256: cssSha256,
        bytes: cssBuffer.length
      },
      {
        file: 'boot-check.js',
        sha256: bootSha256,
        bytes: bootBuffer.length
      }
    ]
  };
  fs.writeFileSync('public/demos/flete/release.json', JSON.stringify(releaseManifest, null, 2) + '\n');

  // Update index.html with new filenames and SRI
  let indexHtml = fs.readFileSync('public/demos/flete/index.html', 'utf8');
  indexHtml = indexHtml.replace(/href="styles-[a-f0-9]+\.css"/, `href="${cssFileName}"`);
  indexHtml = indexHtml.replace(/src="app-[a-f0-9]+\.js"/, `src="${jsFileName}"`);
  indexHtml = indexHtml.replace(/<link rel="stylesheet" href="styles-[^"]+" integrity="[^"]+" crossorigin="anonymous">/,
    `<link rel="stylesheet" href="${cssFileName}" integrity="sha384-${cssSha384}" crossorigin="anonymous">`);
  indexHtml = indexHtml.replace(/<script defer src="app-[^"]+" integrity="[^"]+" crossorigin="anonymous"><\/script>/,
    `<script defer src="${jsFileName}" integrity="sha384-${jsSha384}" crossorigin="anonymous"></script>`);
  indexHtml = indexHtml.replace(/<meta name="flete-release" content="[^"]+">/,
    `<meta name="flete-release" content="${version}">`);
  indexHtml = indexHtml.replace(/<meta name="description" content="[^"]+">/,
    '<meta name="description" content="Demo comercial de fletes, cargas y traslados de pasajeros. Probá una solicitud, su cotización y el panel del dueño con datos ficticios. No se realizan viajes ni cobros.">');
  indexHtml = indexHtml.replace(/<title>[^<]+<\/title>/,
    '<title>Flete · Demo comercial · Presentación interactiva</title>');

  fs.writeFileSync('public/demos/flete/index.html', indexHtml);

  // Update README.md version if needed
  let readme = fs.readFileSync('public/demos/flete/README.md', 'utf8');
  readme = readme.replace(/^# Flete · (?:Demo )?comercial \d+\.\d+\.\d+$/m, `# Flete · Demo comercial ${version}`);
  fs.writeFileSync('public/demos/flete/README.md', readme);

  console.log(`Successfully built Flete v${version}:`);
  console.log(`  JS:  ${jsFileName} (${jsBuffer.length} bytes, sha256: ${jsSha256})`);
  console.log(`  CSS: ${cssFileName} (${cssBuffer.length} bytes, sha256: ${cssSha256})`);
}

if (process.argv[1]?.endsWith('pack-flete.mjs')) {
  buildFleteBundle();
}
