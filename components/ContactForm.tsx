// components/ContactForm.tsx
"use client";

import { useState, useRef, FormEvent } from "react";

const WEB3FORMS_KEY = "027f833b-0442-48e9-9b29-184a71f3a057";
const THROTTLE_MS = 30_000; // 30 seconds between submissions

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const lastSubmitRef = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < THROTTLE_MS) {
      setStatus("error");
      return;
    }
    lastSubmitRef.current = now;

    setSubmitting(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", "New contact from ValorForge Solutions website");
    formData.append("from_name", "ValorForge Website");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <div className="vf-form" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h3 className="vf-h3" style={{ color: "var(--accent)", marginBottom: "12px" }}>
          Message Sent
        </h3>
        <p className="vf-body" style={{ maxWidth: "none" }}>
          Thank you for reaching out. We&apos;ll be in touch shortly.
        </p>
        <button
          className="vf-btn vf-btn-primary"
          style={{ marginTop: "16px" }}
          onClick={() => setStatus("idle")}
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="vf-form"
    >
      {/* Honeypot for spam bots */}
      <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

      {/* Name & Organization – side-by-side on desktop, stacked on mobile */}
      <div className="vf-form-row">
        <label>
          Name
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            maxLength={100}
          />
        </label>

        <label>
          Organization
          <input
            name="organization"
            type="text"
            placeholder="Your company or organization (optional)"
            maxLength={100}
          />
        </label>
      </div>

      {/* Email & Phone – side-by-side on desktop, stacked on mobile */}
      <div className="vf-form-row">
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
            maxLength={100}
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            type="tel"
            placeholder="Your phone number"
            maxLength={20}
          />
        </label>
      </div>

      {/* Message */}
      <label>
        Message
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us about your needs or project..."
          maxLength={2000}
        />
      </label>

      {/* Error message */}
      {status === "error" && (
        <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>
          Something went wrong. Please try again or email us directly at{" "}
          <a href="mailto:contact@valorforgesolutions.com" style={{ color: "var(--accent)" }}>
            contact@valorforgesolutions.com
          </a>.
        </p>
      )}

      {/* Send Button */}
      <button
        className="vf-btn vf-btn-primary"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
}