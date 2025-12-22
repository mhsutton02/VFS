// components/Carousel.tsx
"use client";

import { useCarousel } from "@/hooks/useCarousel";

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
    >
      <button
        type="button"
        aria-label="Previous"
        className="vf-car-btn"
        onClick={prev}
      >
        ‹
      </button>
      <div className="vf-car-viewport">
        <div className="vf-car-track">
          {visible.map((item) => (
            <article
              key={item.id}
              className="vf-card vf-card-active"
            >
              <h3 className="vf-card-title">{item.title}</h3>
              <p className="vf-card-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
      <button
        type="button"
        aria-label="Next"
        className="vf-car-btn"
        onClick={next}
      >
        ›
      </button>
    </div>
  );
}