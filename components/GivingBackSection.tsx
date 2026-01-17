// components/GivingBackSection.tsx
import Image from "next/image";
import givingBack from "../content/giving_back.json";

export function GivingBackSection() {
  return (
    <section
      id="giving-back"
      className="vf-section vf-section-alt vf-section-carousels-alt"
    >
      <div className="vf-container vf-section-grid vf-section-grid-even">
        {/* Image frame first (left on desktop, top on mobile) */}
        <div className="vf-section-media">
          <Image
            src="/assets/img/givingback.png"  // your existing image file
            alt={givingBack.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
          />
        </div>

        {/* Text content */}
        <div>
          <h2 className="vf-h2">{givingBack.title}</h2>
          <p className="vf-body">{givingBack.intro}</p>

          {/* CTA at bottom */}
          <div className="vf-section-bottom">
            <a
              href="/contact"
              className="vf-btn vf-btn-ghost min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label={`${givingBack.bottomCta} – Get involved with ValorForge community efforts`}
            >
              {givingBack.bottomCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}