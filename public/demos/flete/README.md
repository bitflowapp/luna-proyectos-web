# Flete · Presentación interactiva 0.2.0

Build independiente en una carpeta de demostraciones de LUNA. No modifica la portada del sitio ni se conecta a los proyectos de otros clientes.

**No es el backend productivo.** Los datos de prueba viven sólo en este navegador (IndexedDB). Si ese almacenamiento no está disponible, la interfaz avisa que la sesión es temporal. La entrada al panel es un cambio de rol de presentación, no Supabase Auth. No se envían viajes, pagos ni mensajes reales. Usar únicamente datos ficticios.

Recorrido: Solicitar servicio → Completar con datos de ejemplo → Enviar solicitud → Gestionar en el panel → cotizar → asignar vehículo → cambiar estado → seguimiento. Las pruebas pueden reiniciarse desde la barra de la demo.

Paquete: Preact + TypeScript; el mismo frontend del proyecto Flete, con adaptador de presentación explícito. El backend Node/SQLite y el adaptador Supabase permanecen en el proyecto fuente, no en este directorio público.

`index.html` carga diez partes binarias de un bundle gzip de CSS/JavaScript, verifica SHA-256 y lo descomprime mediante la API nativa del navegador. Las partes permiten publicar un artefacto pequeño por la interfaz de Git disponible. No hay evaluación remota ni claves incluidas.

SHA-256 del bundle ensamblado: `b954c193fce98adc3dce7da6dfd579ad619f09bbf0da82b5df37660e60baab73` (55.759 bytes).

QA del proyecto: 67 pruebas Node; 12 recorridos de interfaz; 42 combinaciones de pantalla/viewport. Los recorridos se ejecutaron en Chromium con HTML inyectado: no certifican navegación HTTP, persistencia IndexedDB ni iPhone físico. El flujo productivo con Supabase no está certificado.

Preact se distribuye con su licencia MIT en `LICENSE.preact`.
