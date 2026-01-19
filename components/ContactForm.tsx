"use client";

export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      action="/success"
      className="vf-form"
    >
      <input type="hidden" name="form-name" value="contact" />

      <div className="vf-form-group">
        <label htmlFor="name" className="vf-label">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="vf-input"
          placeholder="Your full name"
          aria-required="true"
        />
      </div>

      <div className="vf-form-group">
        <label htmlFor="email" className="vf-label">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="vf-input"
          placeholder="your.email@example.com"
          aria-required="true"
        />
      </div>

      <div className="vf-form-group">
        <label htmlFor="phone" className="vf-label">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="vf-input"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="vf-form-group">
        <label htmlFor="message" className="vf-label">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="vf-textarea"
          placeholder="Tell us about your project or inquiry..."
          aria-required="true"
        />
      </div>

      <button type="submit" className="vf-btn vf-btn-primary vf-form-submit">
        Send Message
      </button>
    </form>
  );
}