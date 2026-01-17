// components/ContactForm.tsx
"use client";

export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="vf-form"
      style={{
        display: "grid",
        gap: "24px",
        background: "rgba(255, 255, 255, 0.04)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius)",
        padding: "32px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      {/* Name & Organization – side-by-side on desktop, stacked on mobile */}
      <div className="vf-contact-meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <label>
          Name
          <input
            name="name"
            type="text"
            required
            placeholder="Your full name"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              background: "rgba(0, 0, 0, 0.18)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Organization
          <input
            name="organization"
            type="text"
            placeholder="Your company or organization (optional)"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              background: "rgba(0, 0, 0, 0.18)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      {/* Email & Phone – side-by-side on desktop, stacked on mobile */}
      <div className="vf-contact-meta" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="your.email@example.com"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              background: "rgba(0, 0, 0, 0.18)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
          />
        </label>

        <label>
          Phone
          <input
            name="phone"
            type="tel"
            placeholder="Your phone number"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "1rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              background: "rgba(0, 0, 0, 0.18)",
              color: "var(--text)",
              boxSizing: "border-box",
            }}
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
          style={{
            width: "100%",
            padding: "14px",
            fontSize: "1rem",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            background: "rgba(0, 0, 0, 0.18)",
            color: "var(--text)",
            resize: "vertical",
            minHeight: "140px",
          }}
        />
      </label>

      {/* Send Button */}
      <button
        className="vf-btn vf-btn-primary"
        type="submit"
        style={{
          width: "100%",
          padding: "16px",
          fontSize: "1.1rem",
          marginTop: "20px",
        }}
      >
        Send
      </button>
    </form>
  );
}