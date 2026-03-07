// components/ApplicationForm.tsx
"use client";

import { useState, useRef, FormEvent } from "react";

const WEB3FORMS_KEY = "cc195155-68ba-4e20-8e94-65dd50d09bc4";
const THROTTLE_MS = 60_000; // 60 seconds between submissions

interface ApplicationFormProps {
  jobTitle: string;
  notifyEmails: string[];
}

export function ApplicationForm({ jobTitle, notifyEmails }: ApplicationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const lastSubmitRef = useRef(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const now = Date.now();
    if (now - lastSubmitRef.current < THROTTLE_MS) {
      setErrorMsg("Please wait before submitting again.");
      setStatus("error");
      return;
    }

    setSubmitting(true);
    setStatus("idle");
    setErrorMsg("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Build JSON payload (Web3Forms free plan does not support file uploads)
    const payload: Record<string, string> = {
      access_key: WEB3FORMS_KEY,
      subject: `Application: ${jobTitle} — ${formData.get("name") as string}`,
      from_name: "ValorForge Careers",
      replyto: formData.get("email") as string,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || "—",
      linkedin: (formData.get("linkedin") as string) || "—",
      position: jobTitle,
      resumeText: (formData.get("resumeText") as string) || "—",
      coverLetterText: (formData.get("coverLetterText") as string) || "—",
    };

    lastSubmitRef.current = now;

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        console.error("Web3Forms error:", data);
        setErrorMsg("Submission failed. Please try again or email us directly.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Application form fetch failed:", err);
      setErrorMsg("Network error. Please try again or email us directly.");
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (status === "success") {
    return (
      <div className="vf-form" style={{ textAlign: "center", padding: "48px 24px" }}>
        <h3 className="vf-h3" style={{ color: "var(--accent)", marginBottom: "12px" }}>
          Application Received
        </h3>
        <p className="vf-body" style={{ maxWidth: "none" }}>
          Thank you for applying. We&apos;ll review your materials and be in touch.
        </p>
        <button
          className="vf-btn vf-btn-primary"
          style={{ marginTop: "16px" }}
          onClick={() => setStatus("idle")}
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="vf-form">
      {/* Honeypot */}
      <input type="checkbox" name="botcheck" style={{ display: "none" }} />

      <div className="vf-form-row">
        <label>
          Full Name *
          <input name="name" type="text" required placeholder="Your full name" maxLength={100} />
        </label>
        <label>
          Email *
          <input name="email" type="email" required placeholder="you@example.com" maxLength={100} />
        </label>
      </div>

      <div className="vf-form-row">
        <label>
          Phone
          <input name="phone" type="tel" placeholder="Your phone number" maxLength={20} />
        </label>
        <label>
          LinkedIn
          <input name="linkedin" type="url" placeholder="https://linkedin.com/in/you" maxLength={200} />
        </label>
      </div>

      <label>
        Resume Text *
        <textarea
          name="resumeText"
          rows={10}
          required
          placeholder="Paste your resume text here…"
          maxLength={10000}
        />
        <span style={{ display: "block", fontSize: "13px", color: "var(--fg-muted)", marginTop: "4px" }}>
          Tip: Use an ATS-friendly (Applicant Tracking System) format — plain text with clear
          section headings (Summary, Experience, Education, Skills), no tables or columns,
          and standard job-title keywords so automated screeners can parse your resume accurately.
        </span>
      </label>

      <label>
        Cover Letter
        <textarea
          name="coverLetterText"
          rows={5}
          placeholder="Tell us why you're a great fit for this role (optional)…"
          maxLength={3000}
        />
      </label>

      {status === "error" && errorMsg && (
        <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>
          {errorMsg}{" "}
          <a href="mailto:careers@valorforgesolutions.com" style={{ color: "var(--accent)" }}>
            careers@valorforgesolutions.com
          </a>
        </p>
      )}

      <button className="vf-btn vf-btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
