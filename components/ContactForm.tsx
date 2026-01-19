import React from "react";

export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="bot-field"
      style={{ display: "grid", gap: "12px", maxWidth: "640px", margin: "0 auto", textAlign: "left" }}
    >
      {/* Netlify form-name hidden field */}
      <input type="hidden" name="form-name" value="contact" />
      {/* Honeypot field (hidden) */}
      <input type="text" name="bot-field" style={{ display: "none" }} aria-hidden="true" tabIndex={-1} />

      <label className="vf-body">
        Your Name
        <input
          type="text"
          name="name"
          required
          className="vf-input"
          placeholder="Jane Doe"
          style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
        />
      </label>

      <label className="vf-body">
        Email
        <input
          type="email"
          name="email"
          required
          className="vf-input"
          placeholder="jane@example.com"
          style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
        />
      </label>

      <label className="vf-body">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="vf-input"
          placeholder="Tell us about your mission and challenges…"
          style={{ width: "100%", padding: "10px", borderRadius: "8px" }}
        />
      </label>

      <button type="submit" className="vf-btn vf-btn-primary" style={{ alignSelf: "start" }}>
        Submit
      </button>
    </form>
  );
}