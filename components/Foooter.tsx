// components/Footer.tsx
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
        <div className="vf-footer-right">
          <Link href="#what-we-do">What We Do</Link>
          <Link href="#who-we-serve">Who We Serve</Link>
          <Link href="#ai-alignment">AI Alignment</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}