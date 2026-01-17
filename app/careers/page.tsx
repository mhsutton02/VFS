// app/careers/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import careers from "../../content/careers.json";
import Link from "next/link";
import Image from "next/image";

export default function CareersPage() {
  return (
    <>
      <Header />
      <main className="vf-container" style={{ padding: "80px 20px", maxWidth: "900px" }}>
        <h1 className="vf-h1" style={{ textAlign: "center", marginBottom: "40px" }}>
          {careers.title}
        </h1>

        <p className="vf-body" style={{ textAlign: "center", margin: "0 auto 60px" }}>
          {careers.intro}
        </p>

        {/* Three stacked rectangles – same size, vertical layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px", marginBottom: "80px" }}>
          {/* Culture */}
          <Link
            href="#culture"
            className="vf-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px",
              textDecoration: "none",
              minHeight: "280px",     // ← fixed height for same size
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Image src="/assets/img/icon-culture.png" alt="Our Culture icon" width={80} height={80} style={{ marginBottom: "16px" }} />
            <h3 className="vf-h3">Our Culture</h3>
            <p className="vf-card-body">Click to learn more</p>
          </Link>

          {/* Benefits */}
          <Link
            href="#benefits"
            className="vf-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px",
              textDecoration: "none",
              minHeight: "280px",     // same fixed height
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Image src="/assets/img/icon-benefits.png" alt="Our Benefits icon" width={80} height={80} style={{ marginBottom: "16px" }} />
            <h3 className="vf-h3">Our Benefits</h3>
            <p className="vf-card-body">Click to learn more</p>
          </Link>

          {/* Opportunities */}
          <Link
            href="#opportunities"
            className="vf-card"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "32px",
              textDecoration: "none",
              minHeight: "280px",     // same fixed height
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Image src="/assets/img/icon-opportunities.png" alt="Our Opportunities icon" width={80} height={80} style={{ marginBottom: "16px" }} />
            <h3 className="vf-h3">Our Opportunities</h3>
            <p className="vf-card-body">Click to learn more</p>
          </Link>
        </div>

        {/* Lower sections with placeholder text */}
        <section id="culture" className="vf-section" style={{ marginBottom: "60px" }}>
          <h2 className="vf-h2" style={{ textAlign: "center" }}>Our Culture</h2>
          <p className="vf-body" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Placeholder text for our culture description. Updates coming soon!
          </p>
          <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px" }}>
            <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
            <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
          </div>
        </section>

        <section id="benefits" className="vf-section" style={{ marginBottom: "60px" }}>
          <h2 className="vf-h2" style={{ textAlign: "center" }}>Our Benefits</h2>
          <p className="vf-body" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Placeholder text for our benefits description. Updates coming soon!
          </p>
          <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px" }}>
            <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
            <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
          </div>
        </section>

        <section id="opportunities" className="vf-section">
          <h2 className="vf-h2" style={{ textAlign: "center" }}>Our Opportunities</h2>
          <p className="vf-body" style={{ maxWidth: "800px", margin: "0 auto" }}>
            Placeholder text for our opportunities description. Updates coming soon!
          </p>
          <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px" }}>
            <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
            <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}