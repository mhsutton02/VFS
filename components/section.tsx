"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

interface SectionItem {
  id?: string;
  title: string;
  body?: string;
  href?: string;
}

interface SectionData {
  title?: string;
  intro?: string;
  items?: SectionItem[];
}

interface SectionProps {
  data: SectionData;
  children?: React.ReactNode;
}

export function Section({ data, children }: SectionProps) {
  const router = useRouter();
  const pathname = usePathname();

  const titleToSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const getDerivedHref = (title: string): string | undefined => {
    const isWhatWeDo = (data.title || "").toLowerCase().includes("what we do");
    if (isWhatWeDo) {
      const slug = titleToSlug(title);
      const overrides: Record<string, string> = {
        "modernization-and-integration": "modernization-integration",
        "program-delivery-pmo": "program-delivery",
      };
      const path = overrides[slug] ?? slug;
      return `/capabilities/${path}`;
    }

    // For who-we-serve, ai-alignment, giving-back, and about sections
    return "/coming-soon";
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleNavigation = (href?: string) => {
    if (!href) return;

    const isHash = href.startsWith("#") || href.startsWith("/#");
    if (isHash) {
      const id = href.replace("/#", "").replace("#", "");
      if (pathname === "/") {
        scrollToId(id);
      } else {
        router.push(`/#${id}`);
      }
      return;
    }

    router.push(href);
  };

  const onKeyActivate =
    (href?: string) =>
    (e: React.KeyboardEvent) => {
      if (!href) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleNavigation(href);
      }
    };

  return (
    <section className="vf-section">
      <div className="vf-container">
        {/* Intro */}
        {(data.title || data.intro) && (
          <div className="vf-section-intro">
            {data.title && <h2 className="vf-section-title">{data.title}</h2>}
            {data.intro && (
              <p className="vf-section-intro-text">{data.intro}</p>
            )}
          </div>
        )}

        {/* Cards */}
        {Array.isArray(data.items) && data.items.length > 0 && (
          <div className="vf-section-cards">
            {data.items.map((item) => {
              const preferredHref = item.href;
              const derivedHref = getDerivedHref(item.title);
              const href = preferredHref ?? derivedHref;

              return (
                <div
                  key={item.id ?? item.title}
                  className="vf-section-card"
                  role={href ? "button" : undefined}
                  tabIndex={href ? 0 : undefined}
                  onClick={href ? () => handleNavigation(href) : undefined}
                  onKeyDown={href ? onKeyActivate(href) : undefined}
                  aria-label={
                    href ? `${item.title} — view details` : undefined
                  }
                >
                  <h3 className="vf-section-card-title">{item.title}</h3>
                  {item.body && (
                    <p className="vf-section-card-body">{item.body}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Optional custom children below cards */}
        {children}
      </div>
    </section>
  );
}