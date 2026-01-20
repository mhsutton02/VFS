import { Metadata } from "next";
import { Banner } from "@/components/Banner";
import { Section } from "@/components/Section";

import bannerData from "@/content/banner.json";
import careersData from "@/content/careers.json";


export const metadata: Metadata = {
  title: "Careers | ValorForge Solutions",
  description: "Join our team. We're hiring mission-focused technologists.",
  alternates: {
    canonical: "https://valorforge.com/careers",
  },
  openGraph: {
    title: "Careers | ValorForge Solutions",
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
        <Section data={careersData} />
      </div>

      <hr />


    </main>
  );
}