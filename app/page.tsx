import React from "react";
import bannerData from "../content/banner.json";
import heroData from "../content/hero.json";
import whatWeDoData from "../content/what_we_do.json";
import whoWeServeData from "../content/who_we_serve.json";
import aiAlignmentData from "../content/ai_alignment.json";
import givingBackData from "../content/giving_back.json";
import aboutData from "../content/about.json";
import contactData from "../content/contact.json";

import { Banner } from "../components/banner";
import { HeroSection } from "../components/HeroSection";
import { Section } from "../components/section";
import { ContactForm } from "../components/ContactForm";

export default function Home() {
  return (
    <>
      {/* Banner */}
      <div className="vf-block" id="banner">
        <Banner data={bannerData} />
      </div>

      <hr />

      {/* Hero */}
      <div className="vf-block" id="hero">
        <HeroSection data={heroData} />
      </div>

      <hr />

      {/* What We Do */}
      <div className="vf-block" id="what-we-do">
        <Section data={whatWeDoData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />

      {/* Who We Serve */}
      <div className="vf-block" id="who-we-serve">
        <Section data={whoWeServeData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />

      {/* AI Alignment */}
      <div className="vf-block" id="ai-alignment">
        <Section data={aiAlignmentData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />

      {/* Giving Back */}
      <div className="vf-block" id="giving-back">
        <Section data={givingBackData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />

      {/* About */}
      <div className="vf-block" id="about">
        <Section data={aboutData}>
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
            <a href="/#contact" className="vf-btn vf-btn-primary">Contact Us</a>
          </div>
        </Section>
      </div>

      <hr />

      {/* Contact (Section + Form) */}
      <div className="vf-block" id="contact">
        <Section data={contactData}>
          <ContactForm />
          <div className="vf-section-footer">
            <a href="/" className="vf-btn vf-btn-secondary">Home</a>
          </div>
        </Section>
      </div>
    </>
  );
}