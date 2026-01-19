"use client";

import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);

  const footerLinks = [
    { href: "/#what-we-do", label: "What We Do" },
    { href: "/#who-we-serve", label: "Who We Serve" },
    { href: "/#ai-alignment", label: "AI Alignment" },
    { href: "/#giving-back", label: "Giving Back" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ];

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <footer className="vf-site-footer">
      <div className="vf-container vf-footer-inner">
        <div>
          <div className="vf-footer-title">ValorForge Solutions</div>
          <div className="vf-footer-sub">
            Veteran-owned SDVOSB • Rockwall, TX
          </div>
        </div>

        {/* Desktop footer links */}
        <div className="vf-footer-right vf-footer-desktop">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="vf-footer-link"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile footer toggle */}
        <button
          className="vf-footer-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle footer menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </div>

      {/* Mobile footer menu */}
      {menuOpen && (
        <div className="vf-footer-mobile-menu">
          <nav>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="vf-footer-mobile-link"
                onMouseDown={handleLinkClick}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </footer>
  );
}