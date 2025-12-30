// components/HeroSection.tsx
import Image from "next/image";
import heroContent from "../content/hero.json";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="vf-section vf-section-hero"
    >
      <div className="vf-container vf-section-grid">
        <div className="relative">
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
          <p className="vf-lead">
            {heroContent.body}
          </p>
        </div>
        <div className="vf-section-media hero-media">
          <Image
            src="/assets/img/hero.jpg"
            alt={heroContent.imageAlt}
            className="vf-media-img"
            width={800}
            height={600}
          />
        </div>
      </div>
      <div className="vf-container vf-section-bottom">
        <a
          href="/contact"
          className="vf-btn vf-btn-ghost"
        >
          {heroContent.bottomCta}
        </a>
      </div>
    </section>
  );
}