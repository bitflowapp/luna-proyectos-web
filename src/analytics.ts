import { GOATCOUNTER_CODE } from "./content";

type GoatCounter = {
  count?: (vars: { path: string; title?: string; event?: boolean }) => void;
};
declare global {
  interface Window {
    goatcounter?: GoatCounter;
  }
}

const enabled = () => /^[a-z0-9-]+$/i.test(GOATCOUNTER_CODE);

/** Registra un evento. Nunca lanza: el sitio funciona igual sin analytics. */
export function track(name: string, title?: string) {
  try {
    window.goatcounter?.count?.({ path: name, title: title ?? name, event: true });
  } catch {
    /* sin analytics */
  }
}

/**
 * Carga GoatCounter (si hay código) y escucha clicks en cualquier elemento con
 * `data-track="evento"`. Un solo listener cubre WhatsApp, Instagram y demos.
 * Las campañas (?utm_*, ?ref=) las registra GoatCounter solo.
 */
export function startAnalytics() {
  document.addEventListener(
    "click",
    (event) => {
      const el = (event.target as Element | null)?.closest<HTMLElement>(
        "[data-track]",
      );
      if (el?.dataset.track) track(el.dataset.track, el.dataset.trackLabel);
    },
    { capture: true },
  );
  if (!enabled()) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://gc.zgo.at/count.js";
  script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
  document.head.appendChild(script);
}
