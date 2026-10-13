/**
 * Entrada suave al hacer scroll. Solo se activa si hay IntersectionObserver y
 * la persona no pidió menos movimiento. Marca con `data-in` (no con clases:
 * el render de Preact podría pisarlas). Si algo falla, un plan B muestra todo
 * a los pocos segundos: el contenido nunca queda oculto.
 */
export function startReveal() {
  try {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!targets.length) return;
    const root = document.documentElement;
    const show = (el: HTMLElement) => el.setAttribute("data-in", "");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    root.classList.add("reveal-ready");
    targets.forEach((el) => observer.observe(el));
    window.setTimeout(() => {
      targets.forEach(show);
      observer.disconnect();
    }, 6000);
  } catch {
    document.documentElement.classList.remove("reveal-ready");
  }
}
