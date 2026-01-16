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
      // NEW: role="region" for better screen reader context
      role="region"
      // NEW: aria-roledescription to clarify it's a carousel
      aria-roledescription="carousel"
    >
      {/* Previous button – add touch target size & better focus */}
      <button
        type="button"
        aria-label="Previous slide"
        className="vf-car-btn min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={prev}
      >
        ‹
      </button>

      <div className="vf-car-viewport">
        <div
          className="vf-car-track"
          // NEW: aria-live="polite" so screen readers announce slide changes
          aria-live="polite"
        >
          {visible.map((item) => (
            <article
              key={item.id}
              className="vf-card vf-card-active"
              // NEW: role="group" + aria-roledescription for card grouping
              role="group"
              aria-roledescription="carousel slide"
            >
              <h3 className="vf-card-title">{item.title}</h3>
              <p className="vf-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Next button – same touch & focus improvements */}
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