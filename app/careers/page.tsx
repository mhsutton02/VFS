// app/careers/page.tsx
import Image from "next/image";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <section id="careers" className="vf-section">
          <div className="vf-container vf-section-grid">
            <div>
              <h1 className="vf-h1">Careers</h1>
              <p className="vf-body">
                We're building a mission-driven team. This page will list
                open roles, hiring priorities, and how to apply. Placeholder
                content for now — check back soon for opportunities.
              </p>
              <div className="vf-section-bottom">
                <a href="mailto:careers@example.com" className="vf-btn">
                  Contact Recruiting
                </a>
              </div>
            </div>
            <div className="vf-section-media">
              <Image
                src="/assets/img/contact1.jpg"
                alt="Careers illustration"
                className="vf-media-img"
                width={800}
                height={600}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
