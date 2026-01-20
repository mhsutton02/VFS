import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import bannerData from "@/content/banner.json";
import contentData from "@/content/capabilities/program-delivery.json";

export const metadata: Metadata = {
  title: "Program Delivery & PMO | ValorForge Solutions",
  description: "Disciplined program leadership for on-time, on-budget delivery.",
};

export default function ProgramDeliveryPage() {
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
            <div className="vf-section-intro" style={{ textAlign: "center", marginBottom: 48 }}>
              {contentData.title && <h2 className="vf-h2">{contentData.title}</h2>}
              {contentData.intro && <p className="vf-body">{contentData.intro}</p>}
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
        </div>
      </div>

      <hr />
    </main>
  );
}