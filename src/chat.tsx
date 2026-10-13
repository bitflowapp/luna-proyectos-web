import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  QUICK_QUESTIONS,
  buildQualifyMessage,
  WA_MESSAGES,
  questionMessage,
  waLink,
} from "./content";
import type { WaSource } from "./content";
import "./chat.css";

export function WaIcon() {
  return (
    <svg
      className="wa-icon"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.4A10 10 0 1 0 12 2Zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.8-.1 1.4Z"
      />
    </svg>
  );
}

/** Enlace a WhatsApp con mensaje prellenado y evento de analytics. */
export function WaLink({
  source,
  message,
  className = "button wa",
  children,
  icon = true,
}: {
  source: WaSource | string;
  message?: string;
  className?: string;
  children: ReactNode;
  icon?: boolean;
}) {
  const text = message ?? WA_MESSAGES[source as WaSource] ?? WA_MESSAGES.hero;
  return (
    <a
      className={className}
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      data-track={`whatsapp-${source}`}
    >
      {icon && <WaIcon />}
      {children}
    </a>
  );
}

const faceProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "#20211f",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Ilustraciones con trazo propio de Marco y Sofía. Reemplazar por fotos reales
 * en /public/team/ cuando estén listas (ver [COMPLETAR] en el README).
 */
export function TeamAvatars({ only }: { only?: "marco" | "sofia" }) {
  return (
    <span className="team-avatars" aria-hidden="true">
      {only !== "sofia" && (
        <svg {...faceProps}>
          <rect width="48" height="48" fill="#ffe7a8" stroke="none" />
          <circle cx="24" cy="22" r="9" />
          <path d="M15.5 20c0-7 4-9 8.5-9s8.5 2 8.5 9c-2-3-5-4-8.5-4s-6.5 1-8.5 4Z" />
          <path d="M20.5 25c1.2 1.5 5.8 1.5 7 0" />
          <circle cx="20.5" cy="21" r=".6" fill="#20211f" />
          <circle cx="27.5" cy="21" r=".6" fill="#20211f" />
          <path d="M8 46c1-8 7-10 16-10s15 2 16 10" />
        </svg>
      )}
      {only !== "marco" && (
        <svg {...faceProps}>
          <rect width="48" height="48" fill="#c9d6ff" stroke="none" />
          <circle cx="24" cy="22" r="9" />
          <path d="M14.5 28c-2-9 1-17 9.5-17s11.500 8 9.500 17M15 22c3-1 7-3 9-6 2 3 6 5 9 6" />
          <path d="M20.5 25c1.2 1.5 5.8 1.5 7 0" />
          <circle cx="20.5" cy="21" r=".6" fill="#20211f" />
          <circle cx="27.5" cy="21" r=".6" fill="#20211f" />
          <path d="M8 46c1-8 7-10 16-10s15 2 16 10" />
        </svg>
      )}
    </span>
  );
}

/** Chips de preguntas rápidas: cada uno abre WhatsApp con la pregunta escrita. */
export function QuickChips({
  source,
  className = "",
}: {
  source: string;
  className?: string;
}) {
  return (
    <ul className={`chips ${className}`.trim()}>
      {QUICK_QUESTIONS.map((question) => (
        <li key={question}>
          <a
            className="chip"
            href={waLink(questionMessage(question))}
            target="_blank"
            rel="noopener noreferrer"
            data-track={`whatsapp-chip-${source}`}
            data-track-label={question}
          >
            {question}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Único elemento flotante de contacto: una burbuja con Marco y Sofía que
 * despliega preguntas sugeridas y el botón de WhatsApp.
 */
export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event: Event) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div className="bubble" ref={root}>
      <div
        className="bubble-panel"
        id="bubble-panel"
        role="region"
        aria-label="Preguntas rápidas"
        hidden={!open}
      >
        <div className="bubble-head">
          <TeamAvatars />
          <p>
            <strong>¿Tenés una duda?</strong>
            Escribinos, respondemos nosotros.
          </p>
        </div>
        <QuickChips source="burbuja" className="chips-stack" />
        <WaLink source="bubble" className="button wa">
          Abrir WhatsApp
        </WaLink>
      </div>
      <button
        ref={toggle}
        type="button"
        className="bubble-toggle"
        aria-expanded={open}
        aria-controls="bubble-panel"
        data-track={open ? undefined : "burbuja-abrir"}
        onClick={() => setOpen(!open)}
      >
        <TeamAvatars />
        <span>
          {open ? "Cerrar" : "¿Tenés una duda?"}
          <small>
            {open ? "Seguí mirando la web" : "Escribinos por WhatsApp"}
          </small>
        </span>
      </button>
    </div>
  );
}

const RUBROS = [
  "Gastronomía",
  "Comercio, almacén o kiosco",
  "Oficios",
  "Industria y energía",
  "Otro",
];
const URGENCIAS = [
  "Lo antes posible",
  "En uno o dos meses",
  "Estoy viendo opciones",
];

/**
 * Mini formulario opcional. No envía nada: arma el mensaje y lo deja listo en
 * un enlace de WhatsApp. El mensaje se ve antes de abrirlo.
 */
export function QualifyForm() {
  const [rubro, setRubro] = useState("");
  const [problema, setProblema] = useState("");
  const [urgencia, setUrgencia] = useState("");
  const message = buildQualifyMessage(rubro, problema, urgencia);
  return (
    <form
      className="qualify"
      aria-labelledby="qualify-title"
      onSubmit={(event) => event.preventDefault()}
    >
      <h3 id="qualify-title">Si preferís, armá tu mensaje</h3>
      <p className="qualify-hint">
        Es opcional. No se envía nada acá: se abre WhatsApp con el mensaje listo
        para que lo revises.
      </p>
      <label>
        Tu rubro
        <select value={rubro} onChange={(e) => setRubro(e.currentTarget.value)}>
          <option value="">Elegí uno</option>
          {RUBROS.map((r) => (
            <option key={r}>{r}</option>
          ))}
        </select>
      </label>
      <label>
        ¿Qué querés resolver?
        <textarea
          rows={3}
          maxLength={400}
          placeholder="Ej.: me piden todo por mensaje y se me pierden pedidos"
          value={problema}
          onChange={(e) => setProblema(e.currentTarget.value)}
        />
      </label>
      <label>
        ¿Qué tan urgente es?
        <select
          value={urgencia}
          onChange={(e) => setUrgencia(e.currentTarget.value)}
        >
          <option value="">Elegí una</option>
          {URGENCIAS.map((u) => (
            <option key={u}>{u}</option>
          ))}
        </select>
      </label>
      <p className="qualify-preview" aria-live="polite">
        <span>Así va a llegar tu mensaje</span>
        {message}
      </p>
      <WaLink source="formulario" message={message} className="button wa">
        Abrir WhatsApp con este mensaje
      </WaLink>
    </form>
  );
}
