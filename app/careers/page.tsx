import { Metadata } from "next";
import { Banner } from "../../components/banner";
import { Section } from "../../components/section";

import bannerData from "../../content/banner.json";
import careersData from "../../content/careers.json";


export const metadata: Metadata = {
  title: "Careers | VALOR FORGE Solutions",
  description: "Join our team. We're hiring mission-focused technologists.",
  alternates: {
    canonical: "https://valorforge.com/careers",
  },
  openGraph: {
    title: "Careers | VALOR FORGE Solutions",
    description: "Join our team. We're hiring mission-focused technologists.",
    url: "https://valorforge.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return (
    <main>
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      <div className="vf-block" id="careers">
        <Section data={careersData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />


    </main>
  );
}