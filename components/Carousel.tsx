// components/Carousel.tsx
"use client";

import { useCarousel } from "../hooks/useCarousel";

export interface CarouselItem {
  id: string;
  title: string;
  body: string;
}

interface CarouselProps {
  items: CarouselItem[];
  ariaLabel: string;
}

export function Carousel({ items, ariaLabel }: CarouselProps) {
  const {
    transitioning,
    next,
    prev,
    onMouseEnter,
    onMouseLeave,
    getVisibleItems
  } = useCarousel(items, 5000);

  const visible = getVisibleItems();

  return (
    <div
      className="vf-carousel"
      data-carousel
      aria-label={ariaLabel}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="region"
      aria-roledescription="carousel"
    >
      <button
        type="button"
        aria-label="Previous slide"
        className="vf-car-btn min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={prev}
      >
        ‹
      </button>

      <div className="vf-car-viewport">
        {/* Desktop: rotating 2-at-a-time carousel */}
        <div
          className={`vf-car-track vf-car-track-desktop${transitioning ? " vf-car-track-exit" : " vf-car-track-enter"}`}
          aria-live="polite"
        >
          {visible.map((item) => (
            <article
              key={item.id}
              className="vf-card vf-card-active"
              role="group"
              aria-roledescription="carousel slide"
            >
              <h3 className="vf-card-title">{item.title}</h3>
              <p className="vf-card-body">{item.body}</p>
            </article>
          ))}
        </div>
        {/* Mobile: all items displayed statically */}
        <div className="vf-car-track vf-car-track-mobile">
          {items.map((item) => (
            <article key={item.id} className="vf-card">
              <h3 className="vf-card-title">{item.title}</h3>
              <p className="vf-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      <button
        type="button"
        aria-label="Next slide"
        className="vf-car-btn min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={next}
      >
        ›
      </button>
    </div>
  );
}