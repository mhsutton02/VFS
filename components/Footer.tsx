// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="vf-site-footer">
      <div className="vf-container vf-footer-inner">
        <div>
          <div className="vf-footer-title">ValorForge Solutions</div>
          <div className="vf-footer-sub">
            SDVOSB · CMMC 2.0 Level 2 Self-Attest · Rockwall, TX
          </div>
          <div className="vf-footer-sub" style={{ marginTop: "4px" }}>
            CAGE: 1P3C5 · UEI: DT8KJHZXVJH5
          </div>
        </div>

        <div className="vf-footer-right">
          <Link
            href="/capabilities/federal-broadband"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Capabilities
          </Link>
          <Link
            href="/leadership"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Leadership
          </Link>
          <Link
            href="/careers"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Careers
          </Link>
          <Link
            href="/#contact"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}