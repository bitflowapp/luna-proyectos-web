export const SITE = {
  url: "https://bitflowapp.github.io/luna-proyectos-web/",
  instagram: "https://www.instagram.com/lunaaproyectos",
  catalog: "https://bitflowapp.github.io/luna-catalogo-demo-preview/",
} as const;
export const media = (name: string) => `/luna-proyectos-web/media/${name}.webp`;

/** Número de WhatsApp de LUNA en formato internacional, sin signos. */
export const WHATSAPP_NUMBER = "5492996209136";

/** Mensajes prellenados por origen. Cada clave también viaja como nombre del evento de analytics. */
export const WA_MESSAGES = {
  header: "Hola, vengo de la web de LUNA y quiero contarles qué necesito.",
  hero: "Hola, vi la web de LUNA y quiero contarles qué se me traba en mi negocio.",
  bubble: "Hola, tengo una consulta.",
  taba: "Hola, vi TABA y quiero algo parecido para mi negocio.",
  oficio: "Hola, vi OFICIO y quiero algo parecido para organizar mi trabajo.",
  catalogo: "Hola, vi el catálogo y quiero uno para mi negocio.",
  contacto: "Hola, vengo de la web de LUNA y quiero contarles mi problema.",
  footer: "Hola, vengo de la web de LUNA.",
} as const;
export type WaSource = keyof typeof WA_MESSAGES;

export const waLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

/** Preguntas rápidas: abren WhatsApp con la pregunta ya escrita. */
export const QUICK_QUESTIONS = [
  "¿Cuánto sale un catálogo?",
  "¿Sirve para mi kiosco?",
  "¿En cuánto tiempo está?",
] as const;
export const questionMessage = (question: string) =>
  `Hola, tengo una duda: ${question}`;

/**
 * Analytics sin cookies (GoatCounter). Mientras el código sea el placeholder
 * el script no se carga y los eventos no hacen nada.
 */
export const GOATCOUNTER_CODE = "[COMPLETAR]";

/** Mensaje del mini formulario: solo arma el texto, no envía nada. */
export function buildQualifyMessage(
  rubro: string,
  problema: string,
  urgencia: string,
) {
  const partes = ["Hola, vengo de la web de LUNA."];
  if (rubro) partes.push(`Mi rubro: ${rubro}.`);
  if (problema.trim()) partes.push(`Quiero resolver: ${problema.trim()}.`);
  if (urgencia) partes.push(`Urgencia: ${urgencia}.`);
  if (partes.length === 1) partes.push("Quiero contarles qué necesito.");
  return partes.join(" ");
}
