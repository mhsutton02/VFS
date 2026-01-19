import React from "react";
import bannerData from "../content/banner.json";
import whatWeDoData from "../content/what_we_do.json";
import whoWeServeData from "../content/who_we_serve.json";
import aiAlignmentData from "../content/ai_alignment.json";
import givingBackData from "../content/giving_back.json";
import aboutData from "../content/about.json";
import contactData from "../content/contact.json";

import { HeroSection } from "../components/HeroSection";
import { Section } from "../components/Section";
import { ContactForm } from "../components/ContactForm";

export default function Home() {
  return (
    <>
{/* Banner (appears before Hero) */}
<div className="vf-banner" id="banner">
  <div className="vf-container">
    <div className="vf-banner-content">
      {bannerData.kicker && (
        <div className="vf-banner-kicker">{bannerData.kicker}</div>
      )}
      {bannerData.headline && (
        <h2 className="vf-banner-headline">{bannerData.headline}</h2>
      )}
      {bannerData.body && (
        <p className="vf-banner-body">{bannerData.body}</p>
      )}
    </div>
  </div>
</div>

      <hr />

      {/* Hero */}
      <div className="vf-block" id="hero">
        <HeroSection />
      </div>

      <hr />

      {/* What We Do */}
      <div className="vf-block" id="what-we-do">
        <Section data={whatWeDoData} />
      </div>

      <hr />

      {/* Who We Serve */}
      <div className="vf-block" id="who-we-serve">
        <Section data={whoWeServeData} />
      </div>

      <hr />

      {/* AI Alignment */}
      <div className="vf-block" id="ai-alignment">
        <Section data={aiAlignmentData} />
      </div>

      <hr />

      {/* Giving Back */}
      <div className="vf-block" id="giving-back">
        <Section data={givingBackData} />
      </div>

      <hr />

      {/* About */}
      <div className="vf-block" id="about">
        <Section data={aboutData} />
      </div>

      <hr />

      {/* Contact (Section + Form) */}
      <div className="vf-block" id="contact">
        <Section data={contactData}>
          <ContactForm />
        </Section>
      </div>
    </>
  );
}