// components/ContactForm.tsx
"use client";

// Use a standard HTML POST to allow Netlify Forms to capture submissions
// This form posts to /success (static page) so the user sees confirmation
// and Netlify records the submission. Client-side JS submission was
// removed because Netlify's build-time detection + form endpoint require
// a regular POST to register form submissions reliably.
export function ContactForm() {
  return (
    <form
      name="contact"
      method="POST"
      action="/success"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className="vf-form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>
      <label>
        Name
        <input name="name" type="text" required />
      </label>
      <label>
        Organization
        <input name="organization" type="text" />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Message
        <textarea name="message" required rows={5} />
      </label>
      <button className="vf-btn vf-btn-primary" type="submit">
        Send
      </button>
    </form>
  );
}