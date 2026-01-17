"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "#what-we-do", label: "What We Do" },
  { href: "#who-we-serve", label: "Who We Serve" },
  { href: "#ai-alignment", label: "AI Alignment" },
  { href: "#giving-back", label: "Giving Back" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "/careers", label: "Careers" }
];

export function Header() {
  const [open, setOpen] = useState(false);

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
            src="/assets/img/vf-logo.jpeg"
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
          aria-label="Toggle navigation menu"
          className="vf-nav-toggle min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          onClick={() => {
            setOpen((v) => !v);
            console.log("Menu open state:", !open);
          }}
        >
          Menu
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