"""One-time transfer of the locally reviewed build. No network or credentials.
The delta is transport only; the website serves ordinary JS and CSS, not a delta loader.
"""
from pathlib import Path
import base64, gzip, hashlib, json, shutil
src = Path('.release/flete-v3')
dst = Path('public/demos/flete')
parts = [dst / f'bundle-b954c193fce9-{i:02}.bin' for i in range(1,11)]
base = b''.join(p.read_bytes() for p in parts)
assert hashlib.sha256(base).hexdigest() == 'b954c193fce98adc3dce7da6dfd579ad619f09bbf0da82b5df37660e60baab73'
encoded = ''.join((src / f'{i:02}.txt').read_text() for i in range(1,13))
compressed = base64.b64decode(encoded, validate=True)
assert hashlib.sha256(compressed).hexdigest() == 'aff701e74ce4241ed3c3c5ffc733fe7a1ef6def291e05cb8b0cff27619464b98'
patch = json.loads(gzip.decompress(compressed))
old = json.loads(gzip.decompress(base))
outputs = {}
for key in ('javascript','css'):
    value = ''.join(old[key][op[0]:op[1]] if isinstance(op,list) else op for op in patch[key]['operations'])
    assert hashlib.sha256(value.encode()).hexdigest() == patch[key]['sha256']
    outputs[key] = value
# Focus correction also present in the delivered TypeScript source and locally rebuilt artifact.
assert outputs['javascript'].count('.quick-card .field-error input') == 1
outputs['javascript'] = outputs['javascript'].replace('.quick-card .field-error input', '.quick-card input[aria-invalid="true"]')
assert hashlib.sha256(outputs['javascript'].encode()).hexdigest() == '3dcd3ff910c81c368fafdf66ced4f52bb6c61f0ae73e5dba5c09d20146d152e6'
assert hashlib.sha256(outputs['css'].encode()).hexdigest() == 'eda93720cb4446434d9f8f2c05f168a6e2667cd49ef10ae1b08ae3f26c5feeff'
manifest = {'version':'0.3.0','mode':'browser-demo','productionReady':False,'storage':'IndexedDB: same-browser only','files':[]}
for key, prefix, ext in [('javascript','app','js'),('css','styles','css')]:
    value = outputs[key].encode(); digest = hashlib.sha256(value).hexdigest(); name=f'{prefix}-{digest[:12]}.{ext}'
    (dst/name).write_bytes(value)
    manifest['files'].append({'file':name,'sha256':digest,'bytes':len(value)})
for name in ('index.html','boot-check.js'):
    shutil.copyfile(src/name,dst/name)
boot=(dst/'boot-check.js').read_bytes()
assert hashlib.sha256(boot).hexdigest() == 'a7ab5875a85e495fa1cc0e118ede81ad49cf24a37fb3ec54c41e5fd31971f134'
manifest['files'].append({'file':'boot-check.js','sha256':hashlib.sha256(boot).hexdigest(),'bytes':len(boot)})
(dst/'release.json').write_text(json.dumps(manifest,indent=2)+'\n')
for part in parts: part.unlink()
(dst/'README.md').write_text('''# Flete · Presentación comercial 0.3.0\n\nPortada con recorrido rápido, CTA móvil, preguntas frecuentes, controles de demo separados, aceptación de cotización y seguimiento contextual.\n\n**Demostración local al navegador, no operación real.** IndexedDB conserva el nombre de base de v0.2 para mantener los ejemplos existentes. Sin Supabase, pagos, GPS ni cuentas reales. El panel es un rol de demostración. Usar datos ficticios.\n\nAceptar una cotización registra la aceptación del importe vigente: no confirma un viaje, no reserva una unidad ni genera un cobro. El operador confirma disponibilidad por separado. Una recotización invalida la aceptación anterior y una propuesta desactualizada se rechaza.\n\nLos archivos JS/CSS estándar tienen nombres por hash e integridad SRI; release.json identifica el build. Ya no se depende de DecompressionStream ni de diez descargas binarias para abrir la página. La política de contenido impide llamadas a APIs desde esta presentación.\n\nPrueba guiada: #/demo. Panel: #/admin. El frontend completo y el backend independiente siguen en el paquete fuente Flete v0.3.0; no se publican secretos ni datos de otros clientes.\n\nPruebas: tests/flete-preview.spec.ts usa HTTP e IndexedDB nativos en Chromium y WebKit. El resultado de la ejecución consta en GitHub Actions, no implica validación en un iPhone físico ni certificación de producción.\n\nPreact conserva su licencia MIT en LICENSE.preact.\n''')
print('FLETE_RELEASE_VERIFIED='+json.dumps(manifest))
