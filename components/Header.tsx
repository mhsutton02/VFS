"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Scroll to top of page (just landed)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      scrollToTop();
    } else {
      router.push("/");
      setTimeout(() => scrollToTop(), 100);
    }
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleHomeClick = () => {
    if (pathname === "/") {
      scrollToTop();
    } else {
      router.push("/");
      setTimeout(() => scrollToTop(), 100);
    }
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleContactClick = () => {
    if (pathname === "/") {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push("/#contact");
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="vf-site-header">
      <div className="vf-header-inner">
        <button
          onClick={handleLogoClick}
          className="vf-logo-button"
          aria-label="ValorForge Solutions Home"
        >
          <Image
            src="/logo.svg"
            alt="ValorForge Solutions"
            width={120}
            height={54}
            className="vf-logo"
            priority
          />
        </button>

        <button
          className="vf-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav aria-label="Main navigation">
          <ul className={`vf-nav-list ${mobileMenuOpen ? "open" : ""}`}>
            <li>
              <button onClick={handleHomeClick} className="vf-nav-list-button">
                Home ▼
              </button>
            </li>

            <li className={`vf-nav-item-dropdown ${dropdownOpen ? "open" : ""}`}>
              <button
                onClick={toggleDropdown}
                className="vf-nav-list-button vf-nav-dropdown-toggle"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Capabilities <span>▲</span>
              </button>
              <ul className="vf-nav-dropdown-menu" role="menu">
                <li role="none">
                  <button
                    onClick={() => handleNavigation("/capabilities/strategic-it-consulting")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Strategic IT Consulting
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => handleNavigation("/capabilities/modernization-integration")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Modernization &amp; Integration
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => handleNavigation("/capabilities/program-delivery")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Program Delivery &amp; PMO
                  </button>
                </li>
              </ul>
            </li>

            <li>
              <button onClick={() => handleNavigation("/careers")} className="vf-nav-list-button">
                Careers
              </button>
            </li>

            <li>
              <button onClick={handleContactClick} className="vf-nav-list-button">
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}