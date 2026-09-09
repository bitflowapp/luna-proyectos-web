# LUNA Proyectos — web comercial

La página propone una conversación sobre un problema de negocio y la respalda con software construido. El destino del contacto es el Instagram oficial: https://www.instagram.com/lunaaproyectos. No se agregaron teléfonos ni correos sin verificar.

## Proyectos y límites de las afirmaciones

| Proyecto | Qué se demuestra | Estado que comunica la web | Evidencia |
| --- | --- | --- | --- |
| TABA | Tienda, gestión de pedidos y reparto como partes de un sistema | Demostración funcional; no se afirma actividad en producción | Seis capturas nuevas de la aplicación en showcase local, con datos sintéticos y conexiones externas bloqueadas |
| OFICIO | Agenda, trabajos, presupuestos con materiales, PDF y cobros | App en demostración | Tres capturas auténticas de Android; datos contrastados con el seed ficticio y funciones revisadas en el código |
| Bit Flow | Desarrollo a medida vendido y exclusivo | CASO VENDIDO / PROYECTO PRIVADO | Venta y exclusividad confirmadas por el propietario; existencia del software revisada localmente. No se publica material privado |
| Catálogo digital | Explorar categorías, productos y armar una consulta | Demo pública | Dos capturas nuevas del sitio público y CTA PROBAR DEMO |

La demo del catálogo está en https://bitflowapp.github.io/luna-catalogo-demo-preview/. No se presenta como checkout de pagos. Se comprobó la navegación pública sin enviar mensajes ni realizar compras.

Los importes, nombres y cantidades visibles dentro de las demos son datos de ejemplo de esas aplicaciones. No son métricas, ingresos o resultados de LUNA ni de clientes. Las pantallas se optimizaron a WebP; no se dibujaron interfaces falsas ni se alteraron datos para mejorar los casos. `EVIDENCE.json` registra hashes y procedencia de cada captura publicada.

## Decisiones comerciales

- Primer bloque: qué hacemos, para qué sirve, evidencia visual y dos acciones diferentes: ver proyectos o contar un problema.
- Proyectos grandes, con necesidad, solución y estado. Los selectores de TABA y OFICIO cambian capturas reales; el visor permite ampliarlas.
- Bit Flow tiene tratamiento sobrio, sin botones de compra, demo, repositorio, precios, identidad del cliente ni workflow.
- Los servicios se explican desde situaciones reconocibles: pedidos por mensaje, información dispersa, tareas repetidas y trabajo desde el celular.
- Proceso en seis pasos, Marco y Sofía como personas detrás de LUNA, preguntas frecuentes y cierre directo a Instagram.
- No hay formularios que simulen enviar información. Tampoco píxeles, cookies propias, testimonios, métricas de adopción ni promesas de ahorro.
- No se encontraron retratos cuya autorización comercial pudiera verificarse. Se usa una composición tipográfica; no se generaron caras.
- El video de OFICIO disponible incluía placas de producción sin terminar. Se eligieron capturas limpias para esta publicación.

## Auditoría comercial independiente del recorrido de implementación

Evaluación heurística de cuatro perfiles simulados. **No es un test con personas reales ni una medición de conversión.** Se inspeccionaron el primer viewport y los accesos a proyectos/contacto, y después el caso relevante para cada perfil.

| Perfil simulado | ¿Qué hace LUNA? | ¿Es software real? | ¿Qué podría servirme? | ¿Cómo contacto? |
| --- | --- | --- | --- | --- |
| Dueño de comercio | Apps y sistemas para ordenar y vender | TABA y sus pantallas, más catálogo para probar | Pedidos, tienda y organización del negocio | “Contanos qué querés resolver” y contacto por Instagram |
| Técnico | Herramientas para organizar el trabajo | OFICIO muestra agenda, presupuesto y cobros reales de demo | Reunir trabajos y pendientes | CTA de OFICIO y CTA final |
| Dueño de pequeña empresa | Sistemas a medida y automatizaciones | TABA conecta partes; Bit Flow acredita un desarrollo exclusivo vendido | Herramientas internas e información centralizada | Hablemos / Contarnos el problema |
| Visita desde Instagram | Software para trabajo real | Pantallas dentro del primer bloque, rotuladas como demo | Reconocer su problema o explorar los cuatro casos | CTA visible en el hero, sin pedir conocimientos técnicos |

Conclusión heurística: las cuatro respuestas tienen una ruta explícita y breve. Se corrigieron la extensión del título móvil, el contraste espacial de las notas sobre demos y la navegación por teclado antes del cierre. La hipótesis comercial debe validarse luego con consultas reales; no se atribuyen tiempos ni resultados de usuarios inventados.

## Material para Instagram

- `social/instagram-feed-1080x1350.png`: publicación vertical con una captura real de la web.
- `social/instagram-story-1080x1920.png`: historia con la versión móvil real.
- `social/luna-og.png`: composición horizontal, también exportada como JPEG para enlaces compartidos.
- `screenshots-desktop/` y `screenshots-mobile/`: capturas de la web y de sus secciones.

Acción sugerida para el lanzamiento: colocar la URL pública en la bio de @lunaaproyectos. Para usar la historia, añadir en Instagram un sticker de enlace con esa misma URL. Los archivos ya están listos; no se publicaron posts ni se enviaron mensajes.

Copy opcional para acompañar la publicación:

> Hay trabajos que se complican porque la herramienta no acompaña. En LUNA construimos apps, sistemas y automatizaciones alrededor de cómo trabaja cada negocio. En la web podés ver proyectos reales y probar un catálogo. No hace falta que vengas con una app pensada: podés venir con un problema.
