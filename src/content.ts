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

/** Credencial técnica de Marco (texto provisto por LUNA). Se usa en Industria y energía y en Somos LUNA. */
export const MARCO_CREDENTIAL =
  "Marco es ingeniero eléctrico e instrumentista, con experiencia en protección catódica, puesta a tierra y proyectos industriales. Hablamos tu idioma técnico.";

export const isPending = (value: string) => value.includes("[COMPLETAR]");

/**
 * ¿Cuánto sale? Completar `from` ("$350.000") y `weeks` ("3 a 4").
 * Mientras valga [COMPLETAR] la web NO muestra el valor ni el plazo: dice que
 * se pasa en la primera charla. Así nunca se publica un placeholder.
 */
export const PRICING = [
  {
    key: "catalogo",
    title: "Catálogo o tienda",
    blurb: "Tus productos en un enlace, con la consulta que llega por WhatsApp.",
    from: "[COMPLETAR]",
    weeks: "[COMPLETAR]",
    message: "Hola, quiero saber cuánto sale un catálogo o tienda para mi negocio.",
  },
  {
    key: "gestion",
    title: "Sistema de gestión",
    blurb: "Pedidos, stock, clientes y reportes ordenados en un panel.",
    from: "[COMPLETAR]",
    weeks: "[COMPLETAR]",
    message: "Hola, quiero saber cuánto sale un sistema de gestión para mi negocio.",
  },
  {
    key: "app",
    title: "App a medida",
    blurb: "Una app pensada para tu forma de trabajar, desde cero.",
    from: "[COMPLETAR]",
    weeks: "[COMPLETAR]",
    message: "Hola, quiero saber cuánto sale una app a medida para mi negocio.",
  },
] as const;

/** Qué incluye el soporte posterior. [COMPLETAR] con el detalle real; hasta entonces se usa el texto general. */
export const SUPPORT_DETAIL = "[COMPLETAR]";

/**
 * Testimonios reales. Vacío a propósito: no se publica ninguno inventado.
 * Estructura lista: { quote, name, business, photo? } (foto en /public/team/).
 */
export type Testimonial = {
  quote: string;
  name: string;
  business: string;
  photo?: string;
};
export const TESTIMONIALS: Testimonial[] = [];

/**
 * FAQ de objeciones. Respuestas neutrales: no prometen condiciones que LUNA
 * no haya definido. [COMPLETAR] reemplazar por la política real (código,
 * mensualidad, soporte) cuando esté decidida.
 */
export const FAQ_EXTRA = [
  {
    q: "¿Cuánto tarda?",
    a: "Depende de lo que necesites: un catálogo se arma más rápido que un sistema de gestión. En la primera charla te damos un plazo estimado, antes de que decidas nada.",
  },
  {
    q: "¿El código es mío?",
    a: "Lo definimos con vos antes de empezar y queda por escrito: qué te entregamos y con qué derechos de uso. Preguntanos y te lo explicamos con claridad.",
  },
  {
    q: "¿Qué pasa si algo falla?",
    a: "Nos escribís a nosotros, que somos quienes lo hicimos. Qué incluye el soporte posterior lo acordamos por escrito antes de empezar.",
  },
  {
    q: "¿Funciona en el celular?",
    a: "Sí. Lo pensamos para usarse desde el celular, que es donde la mayoría trabaja. Las demos de esta página las podés probar desde tu teléfono.",
  },
  {
    q: "¿Hay que pagar mensualidad?",
    a: "El desarrollo se paga por etapas. Si lo que armamos necesita algo recurrente, como hosting o mantenimiento, te lo explicamos antes de empezar y con el valor a la vista.",
  },
] as const;

/**
 * Fotos del equipo. [COMPLETAR] con la ruta publicada, p. ej.
 * "/luna-proyectos-web/team/marco.webp" (320x320, WebP, en public/team/).
 * Vacío = ilustración con trazo propio.
 */
export const TEAM_PHOTOS: Record<"marco" | "sofia", string> = {
  marco: "",
  sofia: "",
};
