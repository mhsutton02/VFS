"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CAPABILITIES_ITEMS = [
  {
    href: "/capabilities/federal-broadband",
    label: "Federal Broadband Programs",
    sections: [
      { href: "/capabilities/federal-broadband#fabric-operations", label: "Fabric Operations Experience" },
      { href: "/capabilities/federal-broadband#federal-programs", label: "Federal Program Expertise" },
      { href: "/capabilities/federal-broadband#stakeholder-engagement", label: "Stakeholder Engagement" },
      { href: "/capabilities/federal-broadband#transition-management", label: "Transition Management" },
      { href: "/capabilities/federal-broadband#open-data", label: "Open Broadband Data" },
    ],
  },
  {
    href: "/capabilities/program-management",
    label: "Program Management & Delivery",
    sections: [
      { href: "/capabilities/program-management#federal-contract-management", label: "Federal Contract Management" },
      { href: "/capabilities/program-management#quality-assurance", label: "Quality Assurance" },
      { href: "/capabilities/program-management#cybersecurity-compliance", label: "Cybersecurity & Compliance" },
      { href: "/capabilities/program-management#license-administration", label: "License Administration" },
      { href: "/capabilities/program-management#cost-optimization", label: "Cost Optimization" },
    ],
  },
];

const NAV_ITEMS = [
  { href: "/leadership", label: "Leadership" },
  { href: "/careers", label: "Careers" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLLIElement>(null);

  // On page navigation, scroll to hash target or top
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "instant" });
      }, 80);
      return () => clearTimeout(timer);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
    setDropdownOpen(false);
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
            {/* Capabilities Dropdown */}
            <li
              ref={dropdownRef}
              className={`vf-nav-dropdown${dropdownOpen ? " open" : ""}`}
            >
              <button
                type="button"
                className="vf-nav-dropdown-trigger min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Capabilities <span className="vf-nav-dropdown-arrow">▾</span>
              </button>
              <div className="vf-nav-dropdown-menu" role="menu">
                {CAPABILITIES_ITEMS.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      role="menuitem"
                      onClick={handleLinkClick}
                      className="vf-nav-dropdown-parent"
                    >
                      {item.label}
                    </Link>
                    {item.sections.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        role="menuitem"
                        onClick={handleLinkClick}
                        className="vf-nav-dropdown-sub"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </li>

            {/* Standard Nav Items */}
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