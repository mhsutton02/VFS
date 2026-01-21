import { Metadata } from "next";
import { Banner } from "../../../components/banner";
import bannerData from "../../../content/banner.json";
import contentData from "../../../content/capabilities/cmmc.json";

export const metadata: Metadata = {
  title: "cmmc Compliance & Enclave Services | ValorForge Solutions",
  description: "ValorForge delivers CMMC 2.0 Level 2 readiness with a customer-owned, Microsoft-powered enclave for Controlled Unclassified Information (CUI).",
};

export default function cmmcPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block" id="content">
        <div className="vf-container">
          {/* Section Title and Intro */}
          {(contentData.title || contentData.intro) && (
            <div className="vf-section-intro">
              {contentData.title && <h2 className="vf-section-title">{contentData.title}</h2>}
              {contentData.intro && <p className="vf-section-intro-text">{contentData.intro}</p>}
            </div>
          )}
          {/* Cards as links to /coming-soon */}
          {contentData.items && (
            <div className="vf-section-cards">
              {contentData.items.map((item) => (
                <a
                  href="/coming-soon"
                  key={item.id ?? item.title}
                  className="vf-section-card"
                  style={{ textDecoration: "none" }}
                >
                  <h3 className="vf-section-card-title">{item.title}</h3>
                  {item.body && <p className="vf-section-card-body">{item.body}</p>}
                </a>
              ))}
            </div>
          )}
          {/* Footer Buttons */}
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/coming-soon" className="vf-btn vf-btn-primary">Learn More</a>
            <a href="/#contact" className="vf-btn vf-btn-secondary">Contact Us</a>
          </div>
        </div>
      </div>

      <hr />
    </main>
  );
}