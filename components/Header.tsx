"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#what-we-do", label: "What We Do" },
    { href: "/#who-we-serve", label: "Who We Serve" },
    { href: "/#ai-alignment", label: "AI Alignment" },
    { href: "/#giving-back", label: "Giving Back" },
    { href: "/#about", label: "About" },
    { href: "/#contact", label: "Contact" },
    { href: "/careers", label: "Careers" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    
    if (href.includes("#") && pathname !== "/") {
      router.push(href);
    }
  };

  return (
    <header className="vf-site-header">
      <div className="vf-header-inner">
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/img/vf-logo.jpg"
            alt="ValorForge Solutions"
            width={180}
            height={60}
            className="vf-logo"
            priority
          />
        </Link>

        <button
          className="vf-nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>

        <nav>
          <ul className={`vf-nav-list ${menuOpen ? "vf-nav-list-open" : ""}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}