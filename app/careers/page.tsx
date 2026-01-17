// app/careers/page.tsx
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import careers from "../../content/careers.json";

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

        <div className="vf-section-grid" style={{ gap: "40px" }}>
          {careers.jobs.map((job) => (
            <div
              key={job.id}
              className="vf-card"
              style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <h3 className="vf-card-title" style={{ fontSize: "1.5rem" }}>
                {job.title}
              </h3>
              <div style={{ color: "var(--muted)", fontSize: "0.95rem" }}>
                <strong>Location:</strong> {job.location} • <strong>Type:</strong> {job.type}
              </div>
              <p className="vf-card-body">{job.summary}</p>
              <p style={{ marginTop: "auto", fontWeight: 600 }}>
                How to apply: {job.howToApply}
              </p>
            </div>
          ))}
        </div>

        {/* NEW: Back to Contact CTA */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <a
            href="/#contact"
            className="vf-btn vf-btn-primary min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Back to Contact section on homepage"
          >
            Back to Contact
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}