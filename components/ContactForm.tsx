// components/ContactForm.tsx
"use client";

import { useNetlifyForm } from "../hooks/useNetlifyForm";

export function ContactForm() {
  const { submitting, success, handleSubmit } =
    useNetlifyForm("contact");

  return (
    <>
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="vf-form"
        onSubmit={handleSubmit}
      >
        <input
          type="hidden"
          name="form-name"
          value="contact"
        />
        <p className="hidden">
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" />
          </label>
        </p>
        <label>
          Name
          <input
            name="name"
            type="text"
            required
          />
        </label>
        <label>
          Organization
          <input name="organization" type="text" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
          />
        </label>
        <label>
          Message
          <textarea
            name="message"
            required
            rows={5}
          />
        </label>
        <button
          className="vf-btn vf-btn-primary"
          type="submit"
          disabled={submitting}
        >
          {submitting ? "Sending..." : "Send"}
        </button>
      </form>
      {success && (
        <p className="fineprint mt-2">
          Thank you, we will contact you shortly.
        </p>
      )}
    </>
  );
}