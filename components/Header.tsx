// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

// components/Header.tsx – updated NAV_ITEMS
const NAV_ITEMS = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#who-we-serve", label: "Who We Serve" },
  { href: "#ai-alignment", label: "AI Alignment" },
  { href: "#giving-back", label: "Giving Back" },     // ← NEW
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/careers", label: "Careers" }             // ← NEW (page link)
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vf-site-header">
      <div className="vf-container vf-header-inner">
        {/* Logo link – make tappable area larger + focus state */}
        <Link
          href="#hero"
          aria-label="Go to landing – ValorForge Solutions home"
          className="inline-flex items-center min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Image
            src="/assets/img/vf-logo.jpeg"
            alt="ValorForge Solutions logo"
            className="vf-logo"
            width={240}
            height={120}
            // Priority loading for logo (above fold on every page)
            priority
            // Responsive sizes – smaller on mobile to save data
            sizes="(max-width: 768px) 120px, 240px"
          />
        </Link>

        {/* Mobile menu toggle button – larger touch target + focus */}
        <button
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="vf-nav-toggle min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        {/* Navigation – role + ARIA for better semantics */}
        <nav aria-label="Primary navigation" className="relative" role="navigation">
          <ul
            className={`vf-nav-list ${open ? "vf-nav-list-open" : ""}`}
            // Hide from screen readers when closed
            aria-hidden={!open}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {/* Individual nav links – touch target + focus */}
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
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