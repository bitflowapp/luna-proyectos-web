import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { SITE, media } from "./content";
import "./App.css";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Brand() {
  return (
    <a
      tabIndex={0}
      className="brand"
      href="#inicio"
      aria-label="LUNA Proyectos, inicio"
    >
      <span>
        LUNA<span className="brand-dot">·</span>
      </span>
      <span className="brand-sub">PROYECTOS</span>
    </a>
  );
}
function ContactLink({
  children,
  className = "button blue",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      tabIndex={0}
      className={className}
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <Arrow diagonal />
    </a>
  );
}
type Shot = { src: string; mobile?: string; alt: string; label: string };
const tabaShots: Shot[] = [
  {
    src: "taba-desktop",
    mobile: "taba-mobile",
    alt: "Tienda de TABA con categorías de bebidas, productos y botones para agregar al pedido",
    label: "Tienda",
  },
  {
    src: "taba-business",
    mobile: "taba-business-mobile",
    alt: "Panel de gestión de TABA con un pedido sintético y las acciones para prepararlo",
    label: "Gestión",
  },
  {
    src: "taba-rider",
    mobile: "taba-rider-mobile",
    alt: "Vista de reparto de TABA en modo de demostración local",
    label: "Reparto",
  },
];
const oficioShots: Shot[] = [
  {
    src: "oficio-agenda",
    alt: "Agenda real de OFICIO con tres trabajos y saldos de ejemplo",
    label: "Agenda",
  },
  {
    src: "oficio-presupuesto",
    alt: "Presupuesto de OFICIO con mano de obra y materiales de demostración",
    label: "Presupuesto",
  },
  {
    src: "oficio-cobros",
    alt: "Pantalla de cobros de OFICIO con saldos ficticios",
    label: "Cobros",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tabaIndex, setTabaIndex] = useState(0);
  const [oficioIndex, setOficioIndex] = useState(0);
  const [expandedShot, setExpandedShot] = useState<Shot | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const shotOpener = useRef<HTMLButtonElement | null>(null);
  const openShot = (shot: Shot, trigger: HTMLButtonElement) => {
    shotOpener.current = trigger;
    trigger.focus();
    setExpandedShot(shot);
    dialog.current?.showModal();
  };
  const taba = tabaShots[tabaIndex];
  const oficio = oficioShots[oficioIndex];
  return (
    <>
      <a tabIndex={0} className="skip-link" href="#contenido">
        Ir al contenido
      </a>
      <header className="header" id="inicio">
        <div className="container nav-row">
          <Brand />
          <button
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "Cerrar" : "Menú"}
            <span aria-hidden="true">{menuOpen ? "−" : "+"}</span>
          </button>
          <nav
            id="navigation"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Principal"
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setMenuOpen(false);
                document
                  .querySelector<HTMLButtonElement>(".menu-toggle")
                  ?.focus();
              }
            }}
          >
            <a
              tabIndex={0}
              href="#proyectos"
              onClick={() => setMenuOpen(false)}
            >
              Proyectos
            </a>
            <a
              tabIndex={0}
              href="#como-trabajamos"
              onClick={() => setMenuOpen(false)}
            >
              Cómo trabajamos
            </a>
            <a tabIndex={0} href="#nosotros" onClick={() => setMenuOpen(false)}>
              Somos LUNA
            </a>
            <a
              tabIndex={0}
              className="nav-contact"
              href="#contacto"
              onClick={() => setMenuOpen(false)}
            >
              Hablemos <Arrow diagonal />
            </a>
          </nav>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="dot" /> SOFTWARE A MEDIDA · NEUQUÉN, ARGENTINA
            </p>
            <h1 id="hero-title">
              Software para
              <br />
              trabajo <em>real.</em>
            </h1>
            <p className="hero-description">
              Construimos apps, sistemas y automatizaciones para ordenar tu
              negocio, vender y trabajar mejor.
            </p>
            <div className="hero-actions">
              <a tabIndex={0} className="button blue" href="#proyectos">
                Ver proyectos <Arrow />
              </a>
              <a tabIndex={0} className="text-link" href="#contacto">
                Contanos qué querés resolver <Arrow diagonal />
              </a>
            </div>
            <p className="hero-note">
              No hace falta que sepas de tecnología.
              <br />
              Empecemos por cómo trabajás hoy.
            </p>
          </div>
          <div className="hero-evidence">
            <div className="evidence-topline">
              <span>PANTALLAS REALES · DEMO</span>
              <span>01 — TABA / OFICIO</span>
            </div>
            <button
              className="hero-browser image-button"
              onClick={(event) => openShot(tabaShots[0], event.currentTarget)}
              aria-label="Ampliar captura real de TABA"
            >
              <div className="window-bar">
                <span className="window-dots" aria-hidden="true">
                  ● ● ●
                </span>
                <span>TABA · Tienda</span>
                <span aria-hidden="true">↗</span>
              </div>
              <picture>
                <source
                  media="(max-width: 600px)"
                  srcSet={media("taba-mobile")}
                />
                <img
                  src={media("taba-desktop")}
                  alt={tabaShots[0].alt}
                  width="1440"
                  height="1000"
                  fetchPriority="high"
                />
              </picture>
            </button>
            <button
              className="hero-phone image-button"
              onClick={(event) => openShot(oficioShots[0], event.currentTarget)}
              aria-label="Ampliar captura real de OFICIO"
            >
              <img
                src={media("oficio-agenda")}
                alt={oficioShots[0].alt}
                width="540"
                height="960"
              />
            </button>
            <div className="evidence-caption">
              <span className="dot" />
              <span>
                Pantallas reales.
                <br />
                <strong>Datos de demostración.</strong>
              </span>
              <span className="caption-arrow" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </section>
        <div
          className="project-index container"
          aria-label="Proyectos destacados"
        >
          <span>HECHOS EN LUNA</span>
          <a tabIndex={0} href="#taba">
            TABA <span>01</span>
          </a>
          <a tabIndex={0} href="#oficio">
            OFICIO <span>02</span>
          </a>
          <a tabIndex={0} href="#bit-flow">
            BIT FLOW <span>03</span>
          </a>
          <a tabIndex={0} href="#catalogo">
            CATÁLOGO <span>04</span>
          </a>
        </div>

        <section
          className="projects container section-space"
          id="proyectos"
          aria-labelledby="projects-title"
        >
          <div className="section-heading">
            <p className="eyebrow">DEL PROBLEMA AL PRODUCTO</p>
            <div className="heading-row">
              <h2 id="projects-title">
                Menos promesas.
                <br />
                <em>Más software para ver.</em>
              </h2>
              <p>
                Cada negocio trabaja distinto.
                <br />
                Estos proyectos muestran lo que pasa cuando la herramienta se
                construye alrededor de ese trabajo.
              </p>
            </div>
          </div>
          <article
            className="project taba-project"
            id="taba"
            aria-labelledby="taba-title"
          >
            <div className="project-meta">
              <span>01 / COMERCIO Y LOGÍSTICA</span>
              <span className="badge">DEMOSTRACIÓN FUNCIONAL</span>
            </div>
            <div className="project-heading">
              <h3 id="taba-title">
                TABA<span className="blue-dot">.</span>
              </h3>
              <p>
                Del pedido a la entrega.
                <br />
                <strong>Un negocio conectado.</strong>
              </p>
            </div>
            <div className="case-copy">
              <div>
                <span className="mini-label">EL PROBLEMA</span>
                <p>
                  Tomar pedidos es solo el principio. El negocio también
                  necesita prepararlos, organizar el reparto y mantener
                  informado a quien compra.
                </p>
              </div>
              <div>
                <span className="mini-label">LO QUE CONSTRUIMOS</span>
                <p>
                  Una tienda, un panel de gestión y una vista para repartidores.
                  Distintas partes de un mismo sistema, con estados y
                  seguimiento del pedido.
                </p>
              </div>
            </div>
            <div className="product-viewer">
              <div className="viewer-toolbar">
                <div className="view-controls" aria-label="Pantallas de TABA">
                  {tabaShots.map((shot, index) => (
                    <button
                      key={shot.label}
                      aria-pressed={tabaIndex === index}
                      onClick={() => setTabaIndex(index)}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
                <span className="viewer-hint">
                  EXPLORÁ LAS PANTALLAS <span aria-hidden="true">↙</span>
                </span>
              </div>
              <button
                className="screen-expand image-button taba-screen"
                onClick={(event) => openShot(taba, event.currentTarget)}
                aria-label={`Ampliar ${taba.label} de TABA`}
              >
                <picture>
                  <source
                    media="(max-width: 600px)"
                    srcSet={media(taba.mobile!)}
                  />
                  <img
                    src={media(taba.src)}
                    alt={taba.alt}
                    width="1440"
                    height="1000"
                    loading="lazy"
                  />
                </picture>
                <span className="expand-label">
                  Ampliar <Arrow diagonal />
                </span>
              </button>
            </div>
            <div className="project-footnote">
              <p>
                Capturas reales en modo demo. Pedidos y recorridos de ejemplo;
                no representan actividad en producción.
              </p>
              <a tabIndex={0} className="text-link" href="#contacto">
                Quiero conectar mi negocio <Arrow diagonal />
              </a>
            </div>
          </article>

          <article
            className="project oficio-project"
            id="oficio"
            aria-labelledby="oficio-title"
          >
            <div className="project-meta">
              <span>02 / TRABAJO COTIDIANO</span>
              <span className="badge">APP EN DEMOSTRACIÓN</span>
            </div>
            <div className="oficio-layout">
              <div className="oficio-copy">
                <h3 id="oficio-title">
                  OFICIO<span className="blue-dot">.</span>
                </h3>
                <h4>
                  Tu trabajo ya tiene
                  <br />
                  bastante movimiento.
                  <br />
                  <em>Dale un lugar.</em>
                </h4>
                <p>
                  Clientes por un lado. Presupuestos por otro. Y ese cobro que
                  quedó pendiente.
                </p>
                <p>
                  Construimos una app para reunir la agenda, los trabajos, los
                  materiales y los cobros. Con presupuestos en PDF y perfiles
                  para distintos oficios.
                </p>
                <ol className="oficio-journey">
                  <li>
                    <span>01</span> Mirá qué tenés para hoy.
                  </li>
                  <li>
                    <span>02</span> Armá el presupuesto del trabajo.
                  </li>
                  <li>
                    <span>03</span> Registrá lo que cobraste.
                  </li>
                </ol>
                <a tabIndex={0} className="text-link" href="#contacto">
                  Hablemos de tu forma de trabajar <Arrow diagonal />
                </a>
              </div>
              <div className="oficio-stage">
                <div className="view-controls" aria-label="Pantallas de OFICIO">
                  {oficioShots.map((shot, index) => (
                    <button
                      key={shot.label}
                      aria-pressed={oficioIndex === index}
                      onClick={() => setOficioIndex(index)}
                    >
                      {shot.label}
                    </button>
                  ))}
                </div>
                <button
                  className="oficio-phone image-button"
                  onClick={(event) => openShot(oficio, event.currentTarget)}
                  aria-label={`Ampliar ${oficio.label} de OFICIO`}
                >
                  <img
                    src={media(oficio.src)}
                    alt={oficio.alt}
                    width="540"
                    height="960"
                    loading="lazy"
                  />
                  <span className="expand-label">
                    Ampliar <Arrow diagonal />
                  </span>
                </button>
                <p className="small-note">
                  App real · Capturas con datos ficticios
                </p>
              </div>
            </div>
          </article>

          <article
            className="project private-project"
            id="bit-flow"
            aria-labelledby="bitflow-title"
          >
            <div className="project-meta">
              <span>03 / DESARROLLO EXCLUSIVO</span>
              <span className="private-label">CASO VENDIDO</span>
            </div>
            <div className="private-layout">
              <div>
                <h3 id="bitflow-title">
                  BIT FLOW<span aria-hidden="true">↗</span>
                </h3>
                <p className="private-subtitle">
                  Un sistema hecho para
                  <br />
                  <em>un negocio en particular.</em>
                </p>
              </div>
              <div className="private-copy">
                <span className="badge">PROYECTO PRIVADO</span>
                <p>
                  Desarrollamos y vendimos un sistema a medida para organizar un
                  flujo técnico de trabajo en una herramienta propia.
                </p>
                <p className="private-disclaimer">
                  Este proyecto fue desarrollado exclusivamente para un cliente
                  y no se encuentra disponible comercialmente.
                </p>
                <div className="private-rule">
                  <svg
                    width="17"
                    height="19"
                    viewBox="0 0 20 22"
                    fill="none"
                    aria-hidden="true"
                  >
                    <rect
                      x="2"
                      y="9"
                      width="16"
                      height="11"
                      rx="2"
                      stroke="currentColor"
                    />
                    <path d="M6 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" />
                  </svg>
                  Su trabajo es privado. Lo respetamos.
                </div>
              </div>
            </div>
          </article>

          <article
            className="project catalog-project"
            id="catalogo"
            aria-labelledby="catalog-title"
          >
            <div className="project-meta">
              <span>04 / VIDRIERA DIGITAL</span>
              <span className="badge live-badge">
                <span className="dot" /> DEMO PÚBLICA
              </span>
            </div>
            <div className="catalog-layout">
              <div>
                <h3 id="catalog-title">
                  Tu catálogo.
                  <br />
                  <em>A un enlace.</em>
                </h3>
                <p>
                  Para que tus productos no se pierdan entre publicaciones y
                  mensajes.
                </p>
                <p>
                  Una tienda para explorar por categoría, ver productos y armar
                  una consulta. La demo ya está online: podés recorrerla ahora.
                </p>
                <a
                  tabIndex={0}
                  className="button blue demo-link"
                  href={SITE.catalog}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PROBAR DEMO <Arrow diagonal />
                </a>
                <p className="small-note">
                  Abre el catálogo de demostración en otra pestaña.
                </p>
              </div>
              <div className="catalog-stage">
                <button
                  className="image-button catalog-screen"
                  onClick={(event) =>
                    openShot(
                      {
                        src: "catalog-desktop",
                        mobile: "catalog-mobile",
                        alt: "Catálogo digital real con categorías de indumentaria y tecnología",
                        label: "Catálogo digital",
                      },
                      event.currentTarget,
                    )
                  }
                  aria-label="Ampliar captura del catálogo digital"
                >
                  <div className="window-bar">
                    <span className="window-dots" aria-hidden="true">
                      ● ● ●
                    </span>
                    <span>Catálogo digital · LUNA</span>
                    <span aria-hidden="true">↗</span>
                  </div>
                  <picture>
                    <source
                      media="(max-width: 600px)"
                      srcSet={media("catalog-mobile")}
                    />
                    <img
                      src={media("catalog-desktop")}
                      alt="Demo pública de catálogo digital: productos, categorías y carrito de consulta"
                      width="1440"
                      height="1000"
                      loading="lazy"
                    />
                  </picture>
                </button>
                <p className="small-note">
                  Captura del sitio público. Precios y disponibilidad a
                  consultar.
                </p>
              </div>
            </div>
          </article>
        </section>

        <section
          className="services section-space"
          id="soluciones"
          aria-labelledby="services-title"
        >
          <div className="container">
            <p className="eyebrow">¿DÓNDE SE TRABA EL TRABAJO?</p>
            <div className="heading-row">
              <h2 id="services-title">
                La solución empieza
                <br />
                <em>por lo que te pasa.</em>
              </h2>
              <p>
                Una app, un sistema o una tarea que se resuelve sola. Elegimos
                la herramienta después de entender el problema.
              </p>
            </div>
            <div className="problem-grid">
              {[
                [
                  "01",
                  "“Me piden todo por mensaje.”",
                  "Catálogos y tiendas online para mostrar productos y ordenar pedidos.",
                  "CATÁLOGOS / E-COMMERCE",
                ],
                [
                  "02",
                  "“Tengo la información por todos lados.”",
                  "Sistemas y paneles para reunir el trabajo, los pendientes y la información del negocio.",
                  "SISTEMAS / HERRAMIENTAS INTERNAS",
                ],
                [
                  "03",
                  "“Cargo lo mismo una y otra vez.”",
                  "Automatizaciones e integraciones para conectar herramientas y evitar tareas repetidas.",
                  "AUTOMATIZACIONES / INTEGRACIONES",
                ],
                [
                  "04",
                  "“Necesito trabajar desde el celular.”",
                  "Apps pensadas para registrar, consultar y resolver tareas donde sucede el trabajo.",
                  "APLICACIONES A MEDIDA",
                ],
              ].map(([number, title, description, label]) => (
                <div className="problem" key={number}>
                  <span className="problem-number">
                    {number}
                    <Arrow diagonal />
                  </span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="mini-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="process container section-space"
          id="como-trabajamos"
          aria-labelledby="process-title"
        >
          <p className="eyebrow">CÓMO TRABAJAMOS</p>
          <div className="heading-row">
            <h2 id="process-title">
              Primero, escuchamos.
              <br />
              <em>Después, construimos.</em>
            </h2>
            <p>
              Hablás con las personas que van a trabajar en tu proyecto. Con
              pasos claros y sin vueltas innecesarias.
            </p>
          </div>
          <ol className="process-list">
            {[
              ["Nos contás", "Cómo trabajás hoy y qué te gustaría resolver."],
              [
                "Entendemos",
                "Ordenamos el problema y definimos qué hace falta.",
              ],
              [
                "Diseñamos",
                "Le damos forma a una solución que puedas entender.",
              ],
              [
                "Construimos y probamos",
                "La convertimos en software y revisamos cómo funciona.",
              ],
              [
                "Implementamos",
                "La ponemos en marcha en tu contexto de trabajo.",
              ],
              [
                "Acompañamos",
                "Acordamos cómo seguir, mantener y mejorar la herramienta.",
              ],
            ].map(([title, detail], index) => (
              <li key={title}>
                <span className="process-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="team container"
          id="nosotros"
          aria-labelledby="team-title"
        >
          <div className="team-signature" aria-hidden="true">
            <span>Marco</span>
            <em>& Sofía</em>
            <span className="signature-caption">
              DOS PERSONAS. UN PROYECTO EN COMÚN.
            </span>
          </div>
          <div className="team-copy">
            <p className="eyebrow">LAS PERSONAS DETRÁS DE LUNA</p>
            <h2 id="team-title">
              Somos Marco y Sofía.
              <br />
              <em>Un gusto.</em>
            </h2>
            <p>
              LUNA es nuestro proyecto. Nos interesa entender qué hay detrás de
              cada negocio y construir algo que tenga sentido para quien lo usa.
            </p>
            <p>
              Del otro lado de la conversación estamos nosotros. Podés contarnos
              el problema como te salga.
            </p>
            <ContactLink className="text-link">
              Conocenos en Instagram
            </ContactLink>
          </div>
        </section>

        <section
          className="faq container section-space"
          aria-labelledby="faq-title"
        >
          <h2 id="faq-title">
            Antes de hablar,
            <br />
            <em>tal vez te preguntes.</em>
          </h2>
          <div className="faq-list">
            <details>
              <summary>
                ¿Necesito tener una app pensada?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                No. Podés contarnos qué tarea te lleva tiempo, dónde se pierde
                información o qué querés organizar. A partir de eso vemos si el
                software puede ayudarte.
              </p>
            </details>
            <details>
              <summary>
                ¿Puedo pedir algo distinto a estos proyectos?
                <span aria-hidden="true">+</span>
              </summary>
              <p>
                Sí. Son ejemplos de trabajo construido. Tu solución se define
                según tu negocio; los desarrollos exclusivos, como Bit Flow,
                pertenecen a su contexto y no se ofrecen a terceros.
              </p>
            </details>
            <details>
              <summary>
                ¿Cómo se define el presupuesto?<span aria-hidden="true">+</span>
              </summary>
              <p>
                Primero necesitamos entender el alcance. Después podemos
                conversar sobre una propuesta, sus etapas y qué incluye. No hace
                falta llegar con un documento técnico.
              </p>
            </details>
          </div>
        </section>

        <section
          className="brand-idea container"
          aria-label="Nuestra forma de empezar"
        >
          <p className="eyebrow">TODO PUEDE EMPEZAR CON UNA CONVERSACIÓN</p>
          <p className="idea-statement">
            No hace falta que vengas
            <br />
            con una app pensada.
            <br />
            <em>Podés venir con un problema.</em>
          </p>
          <span className="idea-arrow" aria-hidden="true">
            ↙
          </span>
        </section>
        <section
          className="contact"
          id="contacto"
          aria-labelledby="contact-title"
        >
          <div className="container contact-layout">
            <div>
              <p className="eyebrow">HABLEMOS DE TU NEGOCIO</p>
              <h2 id="contact-title">
                ¿Hay algo que podría
                <br />
                funcionar <em>mejor?</em>
              </h2>
              <p>
                Contanos cómo lo resolvés hoy.
                <br />
                No necesitás saber cómo construirlo.
              </p>
            </div>
            <div className="contact-action">
              <ContactLink className="button cream">
                Contarnos el problema
              </ContactLink>
              <span>
                Escribinos por Instagram
                <br />
                <strong>@lunaaproyectos</strong>
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer container">
        <Brand />
        <p>
          Software para trabajo real.
          <br />
          <span>Neuquén, Argentina.</span>
        </p>
        <a
          tabIndex={0}
          className="text-link"
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram <Arrow diagonal />
        </a>
        <span className="copyright">
          © {new Date().getFullYear()} LUNA Proyectos
        </span>
      </footer>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="lightbox-title"
        onClose={() => shotOpener.current?.focus()}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>(
            'button, [tabindex="0"]',
          );
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="lightbox-toolbar">
          <h2 id="lightbox-title">
            {expandedShot?.label} <span>· Captura real</span>
          </h2>
          <button
            className="lightbox-close"
            onClick={() => dialog.current?.close()}
            aria-label="Cerrar captura ampliada"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>
        </div>
        {expandedShot && (
          <div
            className="lightbox-scroll"
            tabIndex={0}
            role="region"
            aria-label="Captura ampliada, desplazable con el teclado"
          >
            <picture>
              {expandedShot.mobile && (
                <source
                  media="(max-width: 600px)"
                  srcSet={media(expandedShot.mobile)}
                />
              )}
              <img src={media(expandedShot.src)} alt={expandedShot.alt} />
            </picture>
          </div>
        )}
        <p className="lightbox-caption">
          Pantalla auténtica de demostración. Los datos de ejemplo no
          representan resultados de clientes.
        </p>
      </dialog>
    </>
  );
}
export default App;
