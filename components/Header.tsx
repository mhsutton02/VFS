// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "#what-we-do", label: "What We Do" },
  { href: "#who-we-serve", label: "Who We Serve" },
  { href: "#ai-alignment", label: "AI Alignment" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vf-site-header">
      <div className="vf-container vf-header-inner">
        <Link
          href="#hero"
          aria-label="Go to landing"
          className="inline-flex items-center"
        >
          <Image
            src="/assets/img/vf-logo.jpeg"
            alt="ValorForge Solutions logo"
            className="vf-logo"
            width={240}
            height={120}
          />
        </Link>

        <button
          aria-expanded={open}
          aria-label="Toggle navigation"
          className="vf-nav-toggle"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>

        <nav aria-label="Primary" className="relative">
          <ul
            className={`vf-nav-list ${
              open ? "vf-nav-list-open" : ""
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
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