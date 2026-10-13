import { useEffect, useRef, useState } from "react";
import { media } from "./content";
import "./carousel.css";

export type CarouselShot = {
  src: string;
  mobile?: string;
  alt: string;
  label: string;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Carrusel táctil de capturas reales. Es un scroller nativo con scroll-snap:
 * el dedo lo arrastra sin JavaScript. Las pestañas (Tienda · Gestión ·
 * Reparto) y el estado activo se sincronizan con el scroll.
 */
export function ShotCarousel({
  shots,
  product,
  variant,
  onOpen,
}: {
  shots: CarouselShot[];
  product: string;
  variant: "wide" | "phone";
  onOpen: (shot: CarouselShot, trigger: HTMLButtonElement) => void;
}) {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = track.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setIndex(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { root, threshold: [0.6] },
    );
    slides.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  const go = (next: number) => {
    setIndex(next);
    const root = track.current;
    const slide = slides.current[next];
    if (!root || !slide) return;
    root.scrollTo({
      left: slide.offsetLeft,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  return (
    <div className={`shots shots-${variant}`}>
      <div className="viewer-toolbar">
        <div className="view-controls" aria-label={`Pantallas de ${product}`}>
          {shots.map((shot, i) => (
            <button
              key={shot.label}
              type="button"
              aria-pressed={index === i}
              onClick={() => go(i)}
            >
              {shot.label}
            </button>
          ))}
        </div>
        <span className="swipe-hint" aria-hidden="true">
          Deslizá para ver más <span className="swipe-arrow">→</span>
        </span>
      </div>
      <div
        className="shots-track"
        ref={track}
        tabIndex={0}
        role="group"
        aria-roledescription="carrusel"
        aria-label={`Pantallas de ${product}`}
      >
        {shots.map((shot, i) => (
          <div
            key={shot.label}
            ref={(el) => {
              slides.current[i] = el;
            }}
            className={`shot-slide${index === i ? " is-active" : ""}`}
            data-index={i}
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${shots.length}: ${shot.label}`}
          >
            <button
              type="button"
              className={
                variant === "wide"
                  ? "screen-expand image-button taba-screen"
                  : "oficio-phone image-button"
              }
              onClick={(event) => onOpen(shot, event.currentTarget)}
              aria-label={`Ampliar ${shot.label} de ${product}`}
            >
              <picture>
                {shot.mobile && (
                  <source
                    media="(max-width: 600px)"
                    srcSet={media(shot.mobile)}
                  />
                )}
                <img
                  src={media(shot.src)}
                  alt={shot.alt}
                  width={variant === "wide" ? 1440 : 540}
                  height={variant === "wide" ? 1000 : 960}
                  loading="lazy"
                  draggable={false}
                />
              </picture>
              <span className="expand-label" aria-hidden="true">
                Ampliar ↗
              </span>
            </button>
          </div>
        ))}
      </div>
      <div className="shots-dots" aria-hidden="true">
        {shots.map((shot, i) => (
          <span key={shot.label} className={index === i ? "is-on" : ""} />
        ))}
      </div>
    </div>
  );
}
