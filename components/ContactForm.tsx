// components/ContactForm.tsx
"use client";

export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="website"
      className="vf-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Website (leave blank): <input name="website" />
        </label>
      </p>

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
            pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
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

      {/* Send Button */}
      <button
        className="vf-btn vf-btn-primary"
        type="submit"
      >
        Send
      </button>
    </form>
  );
}