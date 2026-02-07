"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/#what-we-do", label: "What We Do" },
  { href: "/#who-we-serve", label: "Who We Serve" },
  { href: "/#ai-alignment", label: "AI Alignment" },
  { href: "/#about", label: "About" },
  { href: "/leadership", label: "Leadership" },
  { href: "/#contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // On page navigation, scroll to hash target or top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay so the DOM renders the target section first
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Close mobile menu when any link is clicked
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <header className="vf-site-header">
      <div className="vf-container vf-header-inner" style={{ position: "relative" }}>
        <Link
          href="/"
          aria-label="Go to homepage – ValorForge Solutions"
          className="inline-flex items-center min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={handleLinkClick}
        >
          <Image
            src="/assets/img/vf-logo-v2.png"
            alt="ValorForge Solutions logo"
            className="vf-logo"
            width={240}
            height={120}
            priority
            sizes="(max-width: 768px) 120px, 240px"
          />
        </Link>

        <button
          aria-expanded={open}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          className="vf-nav-toggle min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        <nav aria-label="Primary navigation" className="relative" role="navigation">
          <ul
            className={`vf-nav-list${open ? " vf-nav-list-open" : ""}`}
            aria-hidden={!open}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}