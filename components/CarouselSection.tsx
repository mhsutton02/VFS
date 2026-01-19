"use client";

import Link from "next/link";
// ...existing imports...

export function CarouselSection({
  id,
  imageSrc,
  imageAlt,
  title,
  intro,
  ctaText,
  ctaHref = "/construction",
  items,
}) {
  return (
    <section id={id} className="vf-section vf-section-alt">
      {/* ...existing code... */}
      <div className="vf-section-bottom">
        <Link href={ctaHref} className="vf-btn vf-btn-primary">
          {ctaText}
        </Link>
      </div>
      {/* ...existing code... */}
    </section>
  );
}