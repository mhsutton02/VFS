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
      // NEW: role="form" + aria-label for better screen reader context
      role="form"
      aria-label="Contact form"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden">
        <label>
          Don’t fill this out: <input name="bot-field" />
        </label>
      </p>

      {/* Name field – larger touch area + focus state */}
      <label>
        Name
        <input
          name="name"
          type="text"
          required
          className="min-w-touch min-h-touch px-touch py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          // NEW: placeholder for better mobile UX (tap to type)
          placeholder="Your full name"
          autoComplete="name"
        />
      </label>

      {/* Organization – optional, same touch/focus */}
      <label>
        Organization
        <input
          name="organization"
          type="text"
          className="min-w-touch min-h-touch px-touch py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="Your company or organization (optional)"
          autoComplete="organization"
        />
      </label>

      {/* Email – same improvements */}
      <label>
        Email
        <input
          name="email"
          type="email"
          required
          className="min-w-touch min-h-touch px-touch py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
          placeholder="your.email@example.com"
          autoComplete="email"
        />
      </label>

      {/* Message textarea – larger touch area, better rows for mobile */}
      <label>
        Message
        <textarea
          name="message"
          required
          rows={6}  // Slightly more rows on mobile for easier typing
          className="min-w-touch min-h-touch px-touch py-3 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent resize-y"
          placeholder="Tell us about your needs or project..."
          autoComplete="off"
        />
      </label>

      {/* Submit button – larger touch target + focus */}
      <button
        className="vf-btn vf-btn-primary min-w-touch min-h-touch px-touch py-touch focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-accent"
        type="submit"
        // NEW: aria-label for clarity if button text changes
        aria-label="Send contact message"
      >
        Send
      </button>
    </form>
  );
}