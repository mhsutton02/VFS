// components/Footer.tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="vf-site-footer">
      <div className="vf-container vf-footer-inner">
        <div>
          <div className="vf-footer-title">ValorForge Solutions</div>
          <div className="vf-footer-sub">
            SDVOSB • Rockwall, TX
          </div>
        </div>

        <div className="vf-footer-right">
          <Link
            href="/careers"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Careers
          </Link>
        </div>
      </div>
    </footer>
  );
}