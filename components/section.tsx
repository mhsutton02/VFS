"use client";

import Link from "next/link";
import type { SectionData } from "@/types/section";

interface SectionProps {
  data: SectionData;
  children?: React.ReactNode;
}

export function Section({ data, children }: SectionProps) {
  const renderCta = (cta: SectionData["footerCtas"][0]) => {
    const className = cta.priority === "primary" ? "vf-btn vf-btn-primary" : "vf-btn vf-btn-secondary";

    if (cta.type === "contact") {
      const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      };
      return (
        <button key={cta.label} className={className} onClick={handleContactClick}>
          {cta.label}
        </button>
      );
    }

    if (cta.type === "home") {
      const handleHomeClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      };
      return (
        <button key={cta.label} className={className} onClick={handleHomeClick}>
          {cta.label}
        </button>
      );
    }

    return (
      <Link key={cta.label} href={cta.href} className={className}>
        {cta.label}
      </Link>
    );
  };

  return (
    <>
      <section className="vf-section" aria-labelledby={`section-${data.title}`}>
        <div className="vf-container">
          <div className="vf-section-intro">
            <h2 id={`section-${data.title}`} className="vf-section-title">
              {data.title}
            </h2>
            <p className="vf-section-intro-text">{data.intro}</p>
          </div>

          {data.items && data.items.length > 0 && (
            <div className="vf-section-cards">
              {data.items.map((item) => (
                <div key={item.id} className="vf-section-card">
                  <h3 className="vf-section-card-title">{item.title}</h3>
                  <p className="vf-section-card-body">{item.body}</p>
                </div>
              ))}
            </div>
          )}

          {children}

          {data.footerCtas && data.footerCtas.length > 0 && (
            <div className="vf-section-footer" role="group" aria-label="Section navigation">
              {data.footerCtas.map(renderCta)}
            </div>
          )}
        </div>
      </section>

      <hr />
    </>
  );
}