// app/careers/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import careers from "../../content/careers.json";
import Link from "next/link";

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

        {/* Three stacked cards – each with title, text, and buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {/* Our Culture */}
          <div
            className="vf-card"
            style={{
              padding: "32px",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div>
              <h3 className="vf-h3" style={{ marginBottom: "16px" }}>Our Culture</h3>
              <p className="vf-body">
                At ValorForge, we cultivate a disciplined, mission-first environment where integrity, service, and stewardship drive every decision. Our veteran-led team thrives on trust, collaboration, and excellence—building solutions that matter.
              </p>
            </div>
            <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
              <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
            </div>
          </div>

          {/* Our Benefits */}
          <div
            className="vf-card"
            style={{
              padding: "32px",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div>
              <h3 className="vf-h3" style={{ marginBottom: "16px" }}>Our Benefits</h3>
              <p className="vf-body">
                We offer competitive compensation, comprehensive health coverage, flexible remote/hybrid options, professional development support, and meaningful work-life balance—because our team’s mission deserves the best support.
              </p>
            </div>
            <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
              <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
            </div>
          </div>

          {/* Our Opportunities */}
          <div
            className="vf-card"
            style={{
              padding: "32px",
              minHeight: "280px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
            }}
          >
            <div>
              <h3 className="vf-h3" style={{ marginBottom: "16px" }}>Our Opportunities</h3>
              <p className="vf-body">
                Join us in high-impact roles across software engineering, program management, AI alignment, and strategic delivery. Work on real missions, grow with cutting-edge technology, and contribute to outcomes that matter.
              </p>
            </div>
            <div className="vf-section-bottom" style={{ justifyContent: "center", gap: "20px", marginTop: "20px" }}>
              <Link href="/#contact" className="vf-btn vf-btn-primary">Contact</Link>
              <Link href="/careers" className="vf-btn vf-btn-ghost">Back to Top</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}