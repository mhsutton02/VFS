"use client";

import { usePathname, useRouter } from "next/navigation";
import type { SectionData } from "@/types/section";

interface SectionProps {
  data: SectionData;
  children?: React.ReactNode;
}

export function Section({ data, children }: SectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const scrollToId = (id: string) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const resolveHref = (cta: SectionData["footerCtas"][0]) => {
    if (!cta) return undefined;
    if (cta.href) return cta.href;

    if (cta.type === "home") return "#hero";
    if (cta.type === "contact") return "#contact";

    return undefined;
  };

  const handleNavigation = (href?: string) => {
    if (!href) return;

    if (href === "#hero") {
      if (pathname === "/") {
        scrollToId("hero");
      } else {
        router.push("/#hero");
        setTimeout(() => scrollToId("hero"), 200);
      }
      return;
    }

    if (href === "#contact") {
      if (pathname === "/") {
        scrollToId("contact");
      } else {
        router.push("/#contact");
        setTimeout(() => scrollToId("contact"), 200);
      }
      return;
    }

    if (href.startsWith("#")) {
      scrollToId(href.replace("#", ""));
      return;
    }

    router.push(href);
  };

  const renderCta = (cta: SectionData["footerCtas"][0]) => {
    const href = resolveHref(cta);
    const className =
      cta.priority === "primary" ? "vf-btn vf-btn-primary" : "vf-btn vf-btn-secondary";

    return (
      <button key={cta.label} className={className} onClick={() => handleNavigation(href)}>
        {cta.label}
      </button>
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