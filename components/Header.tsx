"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import navData from "@/content/nav.json";

const sectionIdForHref = (href: string) => {
  const clean = href.replace(/^\/|^#/, "").toLowerCase();
  switch (clean) {
    case "":
    case "home":
    case "hero":
      return "hero";
    case "what-we-do":
      return "what-we-do";
    case "who-we-serve":
      return "who-we-serve";
    case "ai-alignment":
    case "ai alignment":
      return "ai-alignment";
    case "giving-back":
    case "giving back":
      return "giving-back";
    case "about":
      return "about";
    case "contact":
    case "contact-us":
    case "contact us":
      return "contact";
    default:
      return null;
  }
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeAll = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (label: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const scrollToId = (id: string) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleNavigation = (href: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Check if it's a section link (starts with /#)
    if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "");
      
      if (pathname === "/") {
        // Already on home, just scroll
        scrollToId(sectionId);
      } else {
        // On different page, navigate to home first
        router.push(`/#${sectionId}`);
        setTimeout(() => scrollToId(sectionId), 200);
      }
      closeAll();
      return;
    }

    // Check if it's a section name without hash (from nav.json)
    const sectionId = sectionIdForHref(href);
    if (sectionId) {
      if (pathname === "/") {
        scrollToId(sectionId);
      } else {
        router.push(`/#${sectionId}`);
        setTimeout(() => scrollToId(sectionId), 200);
      }
      closeAll();
      return;
    }

    // It's an external route like /careers
    router.push(href);
    closeAll();
  };

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="vf-site-header">
      <div className="vf-header-inner" ref={navRef}>
        <button
          onClick={(e) => handleNavigation("hero", e)}
          className="vf-logo-button"
          aria-label="ValorForge Solutions Home"
        >
          <Image
            src="/assets/img/vf-logo.jpg"
            alt="ValorForge Solutions Logo"
            width={120}
            height={60}
            className="vf-logo"
            priority
          />
        </button>

        <button
          className="vf-nav-toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <nav aria-label="Main navigation">
          <ul className={`vf-nav-list ${mobileOpen ? "open" : ""}`}>
            {navData.items.map((item) => {
              // Dropdown items
              if (item.type === "dropdown" && item.submenu) {
                const isOpen = openDropdown === item.label;
                return (
                  <li
                    key={item.label}
                    className={`vf-nav-item-dropdown ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="vf-nav-dropdown-toggle"
                      onClick={(e) => toggleDropdown(item.label, e)}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    <ul className="vf-nav-dropdown-menu" role="menu">
                      {item.submenu.map((sub) => (
                        <li key={sub.label} role="none">
                          <button
                            className="vf-nav-dropdown-item"
                            onClick={(e) => handleNavigation(sub.href, e)}
                            role="menuitem"
                          >
                            {sub.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // Regular route/contact items
              if (item.type === "route" || item.type === "contact") {
                return (
                  <li key={item.label}>
                    <button
                      className="vf-nav-list-button"
                      onClick={(e) => handleNavigation(item.href, e)}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              }

              return null;
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}