import Link from "next/link";
import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import bannerData from "@/content/banner.json";
import contentData from "@/content/capabilities/modernization-integration.json";

export const metadata: Metadata = {
  title: "Modernization & Integration | ValorForge Solutions",
  description: "Integrating legacy platforms with cloud-native architectures.",
};

export default function ModernizationIntegrationPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block" id="content">
        <div className="vf-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Section Title and Intro */}
          {(contentData.title || contentData.intro) && (
<div className="vf-section-intro">
  {contentData.title && <h2 className="vf-section-title">{contentData.title}</h2>}
  {contentData.intro && <p className="vf-section-intro-text">{contentData.intro}</p>}
</div>
          )}
          {/* Cards as links to /coming-soon */}
          {contentData.items && (
            <div className="vf-section-cards" style={{ marginTop: 24 }}>
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
          {/* Buttons */}
          <div
            className="modernization-integration-btns"
            style={{
              marginTop: 32,
              textAlign: "center",
              paddingBottom: 40,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href="/" className="vf-btn vf-btn-primary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Me</a>
          </div>
        </div>
      </div>

      <hr />
    </main>
  );
}