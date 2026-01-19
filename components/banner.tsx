"use client";

import Image from "next/image";
import Link from "next/link";
import type { BannerData } from "@/types/section";
import bannerData from "@/content/banner.json";

export function Banner() {
  const data = bannerData as BannerData;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderCta = (cta: BannerData["ctas"][0]) => {
    const className = cta.priority === "primary" ? "vf-btn vf-btn-primary" : "vf-btn vf-btn-secondary";

    if (cta.type === "contact") {
      return (
        <button
          key={cta.label}
          className={className}
          onClick={handleContactClick}
          aria-label={cta.label}
        >
          {cta.label}
        </button>
      );
    }

    if (cta.type === "home") {
      return (
        <button
          key={cta.label}
          className={className}
          onClick={handleHomeClick}
          aria-label={cta.label}
        >
          {cta.label}
        </button>
      );
    }

    return (
      <Link key={cta.label} href={cta.href} className={className} aria-label={cta.label}>
        {cta.label}
      </Link>
    );
  };

  return (
    <section className="vf-banner" aria-labelledby="banner-headline">
      {data.backgroundImage && (
        <Image
          src={data.backgroundImage}
          alt={data.backgroundAlt}
          fill
          className="vf-banner-bg"
          priority
          sizes="100vw"
          quality={75}
        />
      )}
      <div className="vf-banner-content">
        {data.kicker && (
          <div className="vf-banner-kicker" aria-label="Company designation">
            {data.kicker}
          </div>
        )}
        <h1 id="banner-headline" className="vf-banner-headline">
          {data.headline}
        </h1>
        <p className="vf-banner-body">{data.body}</p>
        <div className="vf-banner-ctas" role="group" aria-label="Primary navigation">
          {data.ctas.map(renderCta)}
        </div>
      </div>
    </section>
  );
}