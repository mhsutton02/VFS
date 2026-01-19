"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import navData from "@/content/nav.json";

const sectionIdForHref = (href: string) => {
  // strip leading slash and hash
  const clean = href.replace(/^\/|^#/, "");
  switch (clean) {
    case "":
    case "home":
      return "hero";
    case "what-we-do":
      return "what-we-do";
    case "who-we-serve":
      return "who-we-serve";
    case "ai-alignment":
      return "ai-alignment";
    case "giving-back":
      return "giving-back";
    case "about":
      return "about";
    case "careers":
      return "careers"; // if you add a careers section later; otherwise falls back to route
    case "contact":
    case "contact-us":
      return "contact";
    default:
      return null;
  }
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const closeAll = () => {
    setMobileOpen(false);
    setDropdownOpen(false);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToHomeSection = (id: string) => {
    if (pathname === "/") {
      scrollToId(id);
      closeAll();
    } else {
      router.push(`/#${id}`);
      // allow time for navigation, then scroll
      setTimeout(() => scrollToId(id), 50);
      closeAll();
    }
  };

  const handleContact = (e: React.MouseEvent) => {
    e.preventDefault();
    goToHomeSection("contact");
  };

  const handleHome = () => {
    goToHomeSection("hero");
  };

  // close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) closeAll();
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // close on Escape
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
        <Link href="/" onClick={handleHome} aria-label="ValorForge Solutions Home">
          <Image
            src="/assets/img/vf-logo.jpg"
            alt="ValorForge Solutions Logo"
            width={120}
            height={60}
            className="vf-logo"
            priority
          />
        </Link>

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
              if (item.type === "dropdown" && item.submenu) {
                return (
                  <li
                    key={item.label}
                    className={`vf-nav-item-dropdown ${dropdownOpen ? "open" : ""}`}
                  >
                    <button
                      className="vf-nav-dropdown-toggle"
                      onClick={() => setDropdownOpen((v) => !v)}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <span aria-hidden="true">{dropdownOpen ? "▲" : "▼"}</span>
                    </button>
                    <ul className="vf-nav-dropdown-menu" role="menu">
                      {item.submenu.map((sub) => (
                        <li key={sub.label} role="none">
                          <Link
                            href={sub.href}
                            className="vf-nav-dropdown-item"
                            onClick={closeAll}
                            role="menuitem"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              }

              // Home top
              if (item.type === "home") {
                return (
                  <li key={item.label}>
                    <button onClick={handleHome}>{item.label}</button>
                  </li>
                );
              }

              // Contact scroll
              if (item.type === "contact") {
                return (
                  <li key={item.label}>
                    <button onClick={handleContact}>{item.label}</button>
                  </li>
                );
              }

              // Other items: try to scroll to home sections; fall back to route
              if (item.type === "route") {
                const sectionId = sectionIdForHref(item.href);
                if (sectionId) {
                  return (
                    <li key={item.label}>
                      <button onClick={() => goToHomeSection(sectionId)}>
                        {item.label}
                      </button>
                    </li>
                  );
                }
                // fallback: normal navigation (e.g., standalone pages)
                return (
                  <li key={item.label}>
                    <Link href={item.href} onClick={closeAll}>
                      {item.label}
                    </Link>
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