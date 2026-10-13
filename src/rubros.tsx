import type { ReactElement } from "react";
import { WaLink } from "./chat";
import "./rubros.css";

const stroke = {
  fill: "none",
  stroke: "#20211f",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Íconos con trazo propio, uno por rubro. */
const ICONS: Record<string, ReactElement> = {
  gastronomia: (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
      <circle cx="24" cy="24" r="22" fill="#ffe7a8" stroke="none" />
      <path d="M14 22h20l-2 11a4 4 0 0 1-4 3h-8a4 4 0 0 1-4-3Z" />
      <path d="M18 22c0-4 2-7 6-7s6 3 6 7M24 12v3" />
    </svg>
  ),
  comercio: (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
      <circle cx="24" cy="24" r="22" fill="#c9d6ff" stroke="none" />
      <path d="M12 19l2-6h20l2 6M12 19v16h24V19M12 19c0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0 0 3 4 3 4 0" />
      <path d="M21 35v-8h6v8" />
    </svg>
  ),
  oficios: (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
      <circle cx="24" cy="24" r="22" fill="#d6ecd0" stroke="none" />
      <path d="M30 12a7 7 0 0 0-7 9L12 32l4 4 11-11a7 7 0 0 0 9-7l-4 4-4-1-1-4Z" />
    </svg>
  ),
  industria: (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...stroke}>
      <circle cx="24" cy="24" r="22" fill="#f6d2c4" stroke="none" />
      <path d="M11 36V22l8 5v-5l8 5v-5l8 5v9Z" />
      <path d="M31 27V13h4v18" />
      <path d="M33 9c1-1 1-3 0-4" />
    </svg>
  ),
};

type Rubro = {
  key: keyof typeof ICONS;
  title: string;
  problem: string;
  solves: string;
  caseHref: string;
  caseLabel: string;
  message: string;
};

const RUBROS: Rubro[] = [
  {
    key: "gastronomia",
    title: "Gastronomía",
    problem: "Los pedidos llegan por mensaje y se pierden entre chats.",
    solves: "Carta online, pedidos ordenados y seguimiento del reparto.",
    caseHref: "#taba",
    caseLabel: "Ver TABA",
    message:
      "Hola, tengo un negocio de gastronomía y quiero ordenar los pedidos y el reparto.",
  },
  {
    key: "comercio",
    title: "Comercio, almacén o kiosco",
    problem: "Hay que contestar precios y stock uno por uno.",
    solves: "Catálogo en un enlace, para que armen la consulta solos.",
    caseHref: "#catalogo",
    caseLabel: "Probar el catálogo",
    message:
      "Hola, tengo un comercio (almacén/kiosco) y quiero un catálogo o sistema para ordenar ventas y stock.",
  },
  {
    key: "oficios",
    title: "Oficios",
    problem: "Presupuestos, trabajos y cobros quedan en el cuaderno.",
    solves: "Agenda, presupuestos en PDF y cobros, desde el celular.",
    caseHref: "#oficio",
    caseLabel: "Ver OFICIO",
    message:
      "Hola, trabajo en un oficio y quiero organizar presupuestos, trabajos y cobros.",
  },
  {
    key: "industria",
    title: "Industria y energía",
    problem: "Los registros de campo se pasan a mano y los reportes tardan.",
    solves:
      "Registros de campo, inspecciones, mantenimiento y reportes técnicos, hechos en el lugar de trabajo.",
    caseHref: "#bit-flow",
    caseLabel: "Ver un sistema técnico",
    message:
      "Hola, tengo una empresa de industria/energía y quiero digitalizar registros de campo, inspecciones o reportes técnicos.",
  },
];

export function Rubros() {
  return (
    <section
      className="rubros container"
      id="rubros"
      aria-labelledby="rubros-title"
    >
      <p className="eyebrow">
        <span className="dot" /> NEUQUÉN, CIPOLLETTI Y PLOTTIER
      </p>
      <h2 id="rubros-title">
        ¿Qué negocio tenés?
        <br />
        <em>Empecemos por el tuyo.</em>
      </h2>
      <ul className="rubros-grid">
        {RUBROS.map((rubro) => (
          <li key={rubro.key}>
            <article className="rubro-card">
              <div className="rubro-icon">{ICONS[rubro.key]}</div>
              <h3>{rubro.title}</h3>
              <p className="rubro-problem">{rubro.problem}</p>
              <p className="rubro-solves">{rubro.solves}</p>
              <div className="rubro-actions">
                <WaLink
                  source={`rubro-${rubro.key}`}
                  message={rubro.message}
                  className="button wa"
                >
                  Contanos de tu negocio
                </WaLink>
                <a
                  className="rubro-case"
                  href={rubro.caseHref}
                  data-track={`rubro-${rubro.key}-caso`}
                >
                  {rubro.caseLabel} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
