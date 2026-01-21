"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [homeDropdownOpen, setHomeDropdownOpen] = useState(false);
  const [capabilitiesDropdownOpen, setCapabilitiesDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Scroll to top of page (just landed)
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    if (pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      router.push(`/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
    setMobileMenuOpen(false);
    setHomeDropdownOpen(false);
    setCapabilitiesDropdownOpen(false);
  };

  const handleLogoClick = () => {
    if (pathname === "/") {
      scrollToTop();
    } else {
      router.push("/");
      setTimeout(() => scrollToTop(), 100);
    }
    setMobileMenuOpen(false);
    setHomeDropdownOpen(false);
    setCapabilitiesDropdownOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
    setHomeDropdownOpen(false);
    setCapabilitiesDropdownOpen(false);
  };

  const toggleHomeDropdown = () => {
    setHomeDropdownOpen(!homeDropdownOpen);
    setCapabilitiesDropdownOpen(false);
  };

  const toggleCapabilitiesDropdown = () => {
    setCapabilitiesDropdownOpen(!capabilitiesDropdownOpen);
    setHomeDropdownOpen(false);
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
            src="/assets/img/vf-logo.jpg"
            alt="ValorForge Solutions"
            width={54}
            height={54}
            className="vf-logo"
            priority
          />
          <span className="vf-company-name">ValorForge Solutions</span>
        </button>

        <button
          className="vf-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "≡"}
        </button>

        <nav aria-label="Main navigation">
          <ul className={`vf-nav-list ${mobileMenuOpen ? "open" : ""}`}>
            <li 
              className={`vf-nav-item-dropdown ${homeDropdownOpen ? "open" : ""}`}
              onMouseEnter={() => setHomeDropdownOpen(true)}
              onMouseLeave={() => setHomeDropdownOpen(false)}
            >
              <button
                onClick={(e) => {
                  // On mobile, toggle dropdown. On desktop, go home
                  if (window.innerWidth < 1024) {
                    e.stopPropagation();
                    toggleHomeDropdown();
                  } else {
                    handleLogoClick();
                  }
                }}
                className="vf-nav-list-button vf-nav-dropdown-toggle"
                aria-expanded={homeDropdownOpen}
                aria-haspopup="true"
              >
                Home <span>▼</span>
              </button>
              <ul className="vf-nav-dropdown-menu" role="menu">
                <li role="none">
                  <button
                    onClick={() => scrollToSection("what-we-do")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    What We Do
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("who-we-serve")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Who We Serve
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("ai-alignment")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    AI Alignment
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("giving-back")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Giving Back
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("about")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    About
                  </button>
                </li>
                <li role="none">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </li>

            <li 
              className={`vf-nav-item-dropdown ${capabilitiesDropdownOpen ? "open" : ""}`}
              onMouseEnter={() => setCapabilitiesDropdownOpen(true)}
              onMouseLeave={() => setCapabilitiesDropdownOpen(false)}
            >
              <button
                onClick={toggleCapabilitiesDropdown}
                className="vf-nav-list-button vf-nav-dropdown-toggle"
                aria-expanded={capabilitiesDropdownOpen}
                aria-haspopup="true"
              >
                Capabilities <span>▼</span>
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

                <li role="none">
                  <button
                    onClick={() => handleNavigation("/capabilities/cmmc")}
                    className="vf-nav-dropdown-item"
                    role="menuitem"
                  >
                    CMMC Compliance &amp; Enclave Services
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
              <button onClick={() => scrollToSection("contact")} className="vf-nav-list-button">
                Contact Us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}