"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function Footer() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const footerLinks = [
    { href: "/", label: "Home" },
    { href: "/#what-we-do", label: "What We Do" },
    { href: "/#who-we-serve", label: "Who We Serve" },
    { href: "/#ai-alignment", label: "AI Alignment" },
    { href: "/#giving-back", label: "Giving Back" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ];

  const handleLinkClick = (href: string) => {
    setMenuOpen(false);
    
    if (href.includes("#") && pathname !== "/") {
      router.push(href);
    }
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
              onClick={() => handleLinkClick(link.href)}
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
                onClick={() => handleLinkClick(link.href)}
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