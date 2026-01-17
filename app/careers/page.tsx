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
      <main className="vf-container" style={{ padding: "80px 20px" }}>
        <h1 className="vf-h1" style={{ textAlign: "center", marginBottom: "40px" }}>
          {careers.title}
        </h1>

        <p className="vf-body" style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 60px" }}>
          {careers.intro}
        </p>

        {/* Three blocks with icons, linking to sections below */}
        <div className="vf-section-grid" style={{ gap: "40px", marginBottom: "80px" }}>
          <Link href="#culture" className="vf-card min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", textDecoration: "none" }}>
            <Image src="/assets/img/icon-culture.png" alt="Our Culture icon" width={80} height={80} style={{ marginBottom: "16px" }} /> {/* Add your icon file */}
            <h3 className="vf-h3">Our Culture</h3>
            <p className="vf-card-body" style={{ textAlign: "center" }}>Click to learn more</p>
          </Link>

          <Link href="#benefits" className="vf-card min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", textDecoration: "none" }}>
            <Image src="/assets/img/icon-benefits.png" alt="Our Benefits icon" width={80} height={80} style={{ marginBottom: "16px" }} /> {/* Add your icon file */}
            <h3 className="vf-h3">Our Benefits</h3>
            <p className="vf-card-body" style={{ textAlign: "center" }}>Click to learn more</p>
          </Link>

          <Link href="#opportunities" className="vf-card min-w-touch min-h-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px", textDecoration: "none" }}>
            <Image src="/assets/img/icon-opportunities.png" alt="Our Opportunities icon" width={80} height={80} style={{ marginBottom: "16px" }} /> {/* Add your icon file */}
            <h3 className="vf-h3">Our Opportunities</h3>
            <p className="vf-card-body" style={{ textAlign: "center" }}>Click to learn more</p>
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