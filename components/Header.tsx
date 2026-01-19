"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import whatWeDoData from "@/content/what_we_do.json";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/", type: "link" },
    { label: "Capabilities", type: "dropdown" },
    { label: "Careers", href: "/careers", type: "link" },
    { label: "About", href: "/about", type: "link" },
    { label: "Contact", href: "/#contact", type: "link" },
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCapabilityClick = (slug: string) => {
    setMenuOpen(false);
    setCapabilitiesOpen(false);
    router.push(`/capabilities/${slug}`);
  };

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-");
  };

  return (
    <header className="vf-site-header">
      <div className="vf-header-inner">
        <Link href="/">
          <Image
            src="/vf-logo.jpg"
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
          <ul className={`vf-nav-list ${menuOpen ? "open" : ""}`}>
            {navItems.map((item) => {
              if (item.type === "link") {
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href!}
                      onClick={(e) => {
                        if (item.href === "/#contact") {
                          handleContactClick(e);
                        } else {
                          setMenuOpen(false);
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              } else if (item.type === "dropdown") {
                return (
                  <li
                    key={item.label}
                    className={`vf-nav-item-dropdown ${capabilitiesOpen ? "open" : ""}`}
                  >
                    <button
                      className="vf-nav-dropdown-toggle"
                      onClick={() => setCapabilitiesOpen(!capabilitiesOpen)}
                      aria-expanded={capabilitiesOpen}
                    >
                      {item.label}
                      <span>▼</span>
                    </button>
                    <div className="vf-nav-dropdown-menu">
                      {whatWeDoData.items.map((capability) => (
                        <button
                          key={capability.id}
                          className="vf-nav-dropdown-item"
                          onClick={() =>
                            handleCapabilityClick(
                              generateSlug(capability.title)
                            )
                          }
                        >
                          {capability.title}
                        </button>
                      ))}
                    </div>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}