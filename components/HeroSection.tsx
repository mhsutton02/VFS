// components/HeroSection.tsx
import Image from "next/image";
import heroContent from "../content/hero.json";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="vf-section vf-section-hero"
    >
      <div className="vf-hero-bg">
        <Image
          src="/assets/img/hero.jpg"
          alt={heroContent.imageAlt}
          fill
          style={{ objectFit: 'cover' }}
          priority
          quality={90}
        />
      </div>
      <div className="vf-hero-content">
        <div className="vf-kicker">
          {heroContent.kicker}
        </div>
        <h1 className="vf-h1">
          <span>{heroContent.headlineLine0}</span>
          <br />
          <span className="vf-accent">
            {heroContent.headlineLine1}
          </span>
        </h1>
        <p className="vf-lead" style={{ fontStyle: 'italic' }}>
          {heroContent.body}
        </p>
        <a
          href="/#contact"
          className="vf-btn vf-btn-primary"
        >
          {heroContent.bottomCta}
        </a>
      </div>
    </section>
  );
}