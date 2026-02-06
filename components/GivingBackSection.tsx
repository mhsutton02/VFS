// components/GivingBackSection.tsx
import Image from "next/image";
import givingBack from "../content/giving_back.json";

export function GivingBackSection() {
  return (
    <section
      id="giving-back"
      className="vf-section vf-bg-gold-accent"
    >
      <div className="vf-container vf-grid-image-right">
        {/* Image frame first (left on desktop, top on mobile) */}
        <div className="vf-section-media">
          <Image
            src="/assets/img/givingback.jpg"  // your existing image file
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

        </div>
      </div>
    </section>
  );
}