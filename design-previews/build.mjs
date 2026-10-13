// Genera a.html, b.html y c.html (comparación de direcciones visuales).
// Uso: node design-previews/build.mjs
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const WA = "5492996209136";
const H1 = 'Tu negocio, ordenado en una app <em>hecha a tu medida</em>';

const moon = `<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 14.5A8 8 0 0 1 9.5 5a8 8 0 1 0 9.5 9.5Z" fill="currentColor"/></svg>`;
const waIco = `<svg class="wa-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2Zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.300 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.400Z"/></svg>`;

const face = (hair, tint) => `<svg viewBox="0 0 48 48" role="img" aria-label="Ilustración" fill="none" stroke="#20211f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="48" height="48" fill="${tint}" stroke="none"/><circle cx="24" cy="22" r="9"/>${hair}<path d="M20.500 25c1.200 1.500 5.800 1.500 7 0"/><circle cx="20.500" cy="21" r=".6" fill="#20211f"/><circle cx="27.500" cy="21" r=".6" fill="#20211f"/><path d="M8 46c1-8 7-10 16-10s15 2 16 10"/></svg>`;
const marco = face('<path d="M15.500 20c0-7 4-9 8.500-9s8.500 2 8.500 9c-2-3-5-4-8.500-4s-6.500 1-8.500 4Z"/>', "#ffe7a8");
const sofia = face('<path d="M14.500 28c-2-9 1-17 9.500-17s11.500 8 9.500 17M15 22c3-1 7-3 9-6 2 3 6 5 9 6"/>', "#c9d6ff");
const avatars = `<span class="avatars">${marco}${sofia}</span>`;

const stroke = 'fill="none" stroke="#20211f" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
const icons = {
  gastro: `<svg viewBox="0 0 48 48" ${stroke}><circle cx="24" cy="24" r="22" fill="#ffe7a8" stroke="none"/><path d="M14 22h20l-2 11a4 4 0 0 1-4 3h-8a4 4 0 0 1-4-3Z"/><path d="M18 22c0-4 2-7 6-7s6 3 6 7M24 12v3"/></svg>`,
  comercio: `<svg viewBox="0 0 48 48" ${stroke}><circle cx="24" cy="24" r="22" fill="#c9d6ff" stroke="none"/><path d="M12 19l2-6h20l2 6M12 19v16h24V19M12 19c0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0"/><path d="M21 35v-8h6v8"/></svg>`,
  oficios: `<svg viewBox="0 0 48 48" ${stroke}><circle cx="24" cy="24" r="22" fill="#d6ecd0" stroke="none"/><path d="M30 12a7 7 0 0 0-7 9L12 32l4 4 11-11a7 7 0 0 0 9-7l-4 4-4-1-1-4Z"/></svg>`,
  industria: `<svg viewBox="0 0 48 48" ${stroke}><circle cx="24" cy="24" r="22" fill="#f6d2c4" stroke="none"/><path d="M11 36V22l8 5v-5l8 5v-5l8 5v9Z"/><path d="M31 27V13h4v18"/><path d="M33 9c1-1 1-3 0-4"/></svg>`,
};
const rubros = [
  ["gastro", "Gastronomía", "Pedidos, carta y reparto sin perderse en mensajes", "Hola, tengo un negocio de gastronomía y quiero ordenar los pedidos."],
  ["comercio", "Comercio, almacén o kiosco", "Catálogo en un enlace, stock y ventas claras", "Hola, tengo un comercio y quiero un catálogo o sistema para ordenar ventas y stock."],
  ["oficios", "Oficios", "Agenda, presupuestos y cobros en el celular", "Hola, trabajo en un oficio y quiero organizar presupuestos, trabajos y cobros."],
  ["industria", "Industria y energía", "Registros de campo, inspecciones y reportes técnicos", "Hola, tengo una empresa de industria/energía y quiero digitalizar registros de campo o reportes."],
];
const chips = [
  "¿Cuánto sale un catálogo?",
  "¿Sirve para mi kiosco?",
  "¿En cuánto tiempo está?",
];
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const chipList = (extra = "") =>
  `<ul class="chips ${extra}">${chips.map((c) => `<li><a class="chip" href="${wa("Hola, tengo una duda: " + c)}">${c}</a></li>`).join("")}</ul>`;

const header = `<header class="wrap top"><a class="brand" href="#"><b>LUNA<i>·</i></b><small>PROYECTOS</small></a><a class="top-wa" href="${wa("Hola, vengo de la web de LUNA y quiero consultar.")}">${waIco}Escribinos</a></header>`;

const rubrosBlock = `<section class="wrap"><p class="eyebrow">${moon} ¿Qué negocio tenés?</p><h2>Elegí el tuyo y <em>te mostramos algo parecido</em></h2>
<ul class="rubros">${rubros.map(([k, t, d, m]) => `<li><a class="rubro" href="${wa(m)}">${icons[k]}<div><strong>${t}</strong><span>${d}</span></div><i aria-hidden="true">→</i></a></li>`).join("")}</ul></section>`;

const caseBlock = `<section class="wrap"><p class="eyebrow">${moon} Un caso real</p><h2>TABA: <em>de la tienda al reparto</em></h2>
<article class="case"><dl><div><dt>Problema</dt><dd>Los pedidos llegaban por mensaje y se perdían.</dd></div><div><dt>Solución</dt><dd>Una tienda, un panel para preparar y una vista para el repartidor.</dd></div><div><dt>Qué ganás</dt><dd>Pedidos ordenados y menos errores al cargar.</dd></div></dl>
<img src="../public/media/taba-mobile.webp" width="390" height="780" alt="Tienda de TABA en el celular" loading="lazy" style="max-height:340px;object-fit:cover;object-position:top;width:100%">
<a class="btn btn-ghost" href="${wa("Hola, vi TABA y quiero algo parecido para mi negocio.")}">¿Algo así para tu negocio?</a></article></section>`;

const heroA = `<section class="wrap" style="padding-top:28px"><p class="eyebrow">${moon} Neuquén · Cipolletti · Plottier</p><h1>${H1}</h1>
<p class="lead">Hacemos apps y sistemas para comercios, gastronomía, oficios e industria. Contanos qué se te traba y te decimos si tiene arreglo.</p>
<div style="margin-top:26px"><a class="btn btn-wa" href="${wa("Hola, vengo de la web de LUNA y quiero contarles qué necesito.")}">${waIco}Escribinos por WhatsApp</a><span class="btn-sub">Primera charla sin cargo · respondemos Marco y Sofía</span></div>
<div style="margin-top:28px"><p style="font-weight:800;margin:0 0 12px">¿Una duda rápida?</p>${chipList()}</div></section>`;

const bubble = (open) => `<div class="bubble" id="bubble"><div class="bubble-panel" id="panel" ${open ? "" : "hidden"} role="dialog" aria-label="Preguntas rápidas">
<div class="bubble-head">${avatars}<p><strong>¿Tenés una duda?</strong>Escribinos, respondemos nosotros.</p></div>${chipList()}
<a class="btn btn-wa" href="${wa("Hola, tengo una consulta.")}">${waIco}Abrir WhatsApp</a></div>
<button class="bubble-toggle" id="toggle" aria-expanded="${open}" aria-controls="panel">${avatars}<span>¿Tenés una duda?<small>Escribinos por WhatsApp</small></span></button></div>
<script>(()=>{const t=document.getElementById('toggle'),p=document.getElementById('panel');t.addEventListener('click',()=>{const o=p.hidden;p.hidden=!o;t.setAttribute('aria-expanded',o)});if(location.search.includes('open'))t.click()})()</script>`;

const pages = {
  a: {
    title: "Dirección A — Cálida y editorial",
    body: `${header}${heroA}${rubrosBlock}${caseBlock}
<div class="stickybar"><a class="btn btn-wa" href="${wa("Hola, vengo de la web de LUNA.")}">${waIco}Escribinos por WhatsApp</a></div>`,
  },
  b: {
    title: "Dirección B — Conversacional",
    body: `${header}<section class="wrap" style="padding-top:20px"><p class="eyebrow">${moon} Neuquén · Cipolletti · Plottier</p><h1>${H1}</h1>
<div class="chat"><div class="msg">${avatars}<p>Hola, somos Marco y Sofía. ¿Qué se te traba en el negocio?</p></div>
<div class="replies">${chipList()}</div></div></section>${rubrosBlock}${caseBlock}
<div class="composer"><a href="${wa("Hola, vengo de la web de LUNA.")}"><span>Contanos tu problema…</span><b>${waIco}</b></a></div>`,
  },
  c: {
    title: "Dirección C — Editorial + burbuja y chips",
    body: `${header}${heroA}${rubrosBlock}${caseBlock}${bubble(false)}`,
  },
};

for (const [k, p] of Object.entries(pages)) {
  writeFileSync(
    join(here, `${k}.html`),
    `<!doctype html><html lang="es-AR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="robots" content="noindex"><title>${p.title}</title><link rel="stylesheet" href="previews.css"></head><body>${p.body}</body></html>`,
  );
}
console.log("ok");
