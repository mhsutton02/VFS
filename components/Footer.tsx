import Link from "next/link";

export function Footer() {
  return (
    <footer className="vf-site-footer">
      <div className="vf-container vf-footer-inner">
        <div>
          <div className="vf-footer-title">ValorForge Solutions</div>
          <div className="vf-footer-sub">
            Veteran-owned SDVOSB • Rockwall, TX
          </div>
        </div>

        {/* Footer links – add touch targets + focus states (#2 & #6) */}
        <div className="vf-footer-right">
          <Link
            href="/#what-we-do"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            What We Do
          </Link>
          <Link
            href="/#who-we-serve"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Who We Serve
          </Link>
          <Link
            href="/#ai-alignment"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            AI Alignment
          </Link>
          <Link
            href="/#about"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            About
          </Link>
          <Link
            href="/#contact"
            className="min-w-touch min-h-touch px-touch py-2 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Contact
          </Link>
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