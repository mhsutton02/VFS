"use client";

import Image from "next/image";
import Link from "next/link";
import type { SectionData } from "@/types/section";

interface SectionProps {
  data: SectionData;
  children?: React.ReactNode;
}

export function Section({ data, children }: SectionProps) {
  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const renderCta = (cta: NonNullable<SectionData["footerCtas"]>[0]) => {
    const className = "vf-btn vf-btn-primary";

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

    if (cta.type === "route" && cta.href) {
      return (
        <Link key={cta.label} href={cta.href} className={className}>
          {cta.label}
        </Link>
      );
    }

    return null;
  };

  return (
    <section
      id={data.title.toLowerCase().replace(/\s+/g, "-")}
      className="vf-section"
      aria-labelledby={`${data.title.toLowerCase().replace(/\s+/g, "-")}-title`}
    >
      <div className="vf-container">
        {/* Section Intro */}
        <div className="vf-section-intro">
          <h2
            id={`${data.title.toLowerCase().replace(/\s+/g, "-")}-title`}
            className="vf-section-title"
          >
            {data.title}
          </h2>
          <p className="vf-section-intro-text">{data.intro}</p>
        </div>

        {/* Section Content */}
        <div className="vf-section-content">
          {data.contentType === "text" && data.items && (
            <div className="vf-section-cards">
              {data.items.map((item) => (
                <article key={item.id} id={item.id} className="vf-section-card">
                  <h3 className="vf-section-card-title">{item.title}</h3>
                  {item.body && <p className="vf-section-card-body">{item.body}</p>}
                </article>
              ))}
            </div>
          )}

          {data.contentType === "image" && data.image && (
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={800}
              height={500}
              className="vf-section-image"
              loading="lazy"
              sizes="(max-width: 760px) 100vw, (max-width: 1120px) 90vw, 800px"
            />
          )}

          {data.contentType === "form" && children}
        </div>

        {/* Section Footer */}
        {data.footerCtas && data.footerCtas.length > 0 && (
          <div className="vf-section-footer">
            {data.footerCtas.map(renderCta)}
          </div>
        )}
      </div>
    </section>
  );
}