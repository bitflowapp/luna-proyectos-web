import { WaLink } from "./chat";
import {
  MARCO_CREDENTIAL,
  PRICING,
  SUPPORT_DETAIL,
  TESTIMONIALS,
  isPending,
} from "./content";
import "./trust.css";

/**
 * ¿Cuánto sale? Muestra "desde $" y plazo solo cuando están cargados en
 * content.ts; si no, promete el valor en la primera charla.
 */
export function Pricing() {
  return (
    <section
      className="pricing container section-space"
      id="precios"
      aria-labelledby="pricing-title"
    >
      <p className="eyebrow">
        <span className="dot" /> SIN SORPRESAS
      </p>
      <h2 id="pricing-title">
        ¿Cuánto sale?
        <br />
        <em>Te lo decimos antes de empezar.</em>
      </h2>
      <ul className="pricing-grid">
        {PRICING.map((item) => (
          <li key={item.key}>
            <article className="pricing-card">
              <h3>{item.title}</h3>
              <p>{item.blurb}</p>
              <dl>
                <div>
                  <dt>Desde</dt>
                  <dd>
                    {isPending(item.from)
                      ? "Te pasamos un valor orientativo en la primera charla"
                      : item.from}
                  </dd>
                </div>
                <div>
                  <dt>Plazo típico</dt>
                  <dd>
                    {isPending(item.weeks)
                      ? "Según el alcance; lo estimamos juntos"
                      : `${item.weeks} semanas`}
                  </dd>
                </div>
              </dl>
              <WaLink
                source={`precio-${item.key}`}
                message={item.message}
                className="button wa"
              >
                Consultar este valor
              </WaLink>
            </article>
          </li>
        ))}
      </ul>
      <ul className="pricing-terms">
        <li>
          <strong>Primera charla sin cargo.</strong> Nos contás, escuchamos, y
          vos decidís si seguimos.
        </li>
        <li>
          <strong>Pago por etapas.</strong> No se paga todo de golpe: se
          acuerda por etapas del trabajo.
        </li>
        <li>
          <strong>Soporte después de entregar.</strong>{" "}
          {isPending(SUPPORT_DETAIL)
            ? "Acordamos con vos cómo mantenerlo y mejorarlo, por escrito y antes de empezar."
            : SUPPORT_DETAIL}
        </li>
      </ul>
    </section>
  );
}

/** Datos verificables y espacio para testimonios reales (vacío = no se muestra nada inventado). */
export function SocialProof() {
  return (
    <section
      className="proof container"
      aria-labelledby="proof-title"
    >
      <h2 id="proof-title" className="proof-title">
        Con quién hablás, <em>sin vueltas.</em>
      </h2>
      <ul className="proof-facts">
        <li>
          <strong>De Neuquén.</strong>
          <span>Trabajamos acá, para negocios de acá.</span>
        </li>
        <li>
          <strong>Personas reales.</strong>
          <span>Te responden Marco y Sofía, quienes lo construyen.</span>
        </li>
        <li>
          <strong>Un sistema a medida vendido y entregado.</strong>
          <span>Bit Flow, privado: respetamos a su cliente.</span>
        </li>
        <li>
          <strong>Perfil técnico.</strong>
          <span>{MARCO_CREDENTIAL}</span>
        </li>
      </ul>
      {TESTIMONIALS.length > 0 && (
        <ul className="proof-quotes" aria-label="Opiniones de clientes">
          {TESTIMONIALS.map((t) => (
            <li key={t.name}>
              <blockquote>“{t.quote}”</blockquote>
              <p>
                <strong>{t.name}</strong> · {t.business}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
