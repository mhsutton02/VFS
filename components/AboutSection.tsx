// components/AboutSection.tsx
import Image from "next/image";
import aboutContent from "../content/about.json";
import { Carousel } from "./Carousel";

export function AboutSection() {
  return (
    <section
      id="about"
      className="vf-section vf-section-alt vf-section-carousels-alt"
    >
      <div className="vf-container vf-section-grid-even">
        {/* Image – optimize for mobile (#1 & #3) */}
        <div className="vf-section-media">
          <Image
            src="/assets/img/generated-image-1.png"
            alt={aboutContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
            // NEW: lazy loading (below fold) – saves mobile data (#3)
            loading="lazy"
            // NEW: responsive sizes – full width on mobile, half on desktop
            sizes="(max-width: 768px) 100vw, 50vw"
            // NEW: quality balance for good compression
            quality={85}
            // Optional: priority=false (default for lazy) – remove if this section is above fold sometimes
          />
        </div>

        <div>
          <h2 className="vf-h2">{aboutContent.title}</h2>
          <p className="vf-body">{aboutContent.intro}</p>

          {/* Carousel – already optimized in Carousel.tsx; add ARIA wrapper for section (#6) */}
          <div role="region" aria-labelledby="about-carousel-heading">
            <h2 id="about-carousel-heading" className="sr-only">
              About carousel content
            </h2>
            <Carousel items={aboutContent.cards} ariaLabel="About carousel" />
          </div>

          {/* CTA button – larger touch target + focus state (#2 & #6) */}
          <div className="vf-section-bottom">
            <a
              href="/contact"
              className="vf-btn vf-btn-ghost min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${aboutContent.bottomCta} – Get in touch with ValorForge Solutions`}
            >
              {aboutContent.bottomCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}