// hooks/useNetlifyForm.ts
"use client";

import { FormEvent, useState } from "react";

export function useNetlifyForm(formName: string) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("form-name", formName);

    const body = new URLSearchParams();
    for (const [k, v] of formData.entries()) {
      body.append(k, String(v));
    }

    try {
      setSubmitting(true);
      const res = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body.toString()
      });
      if (res.ok) {
        form.reset();
        setSuccess(true);
      } else {
        // Silent fail – could add error state
      }
    } catch {
      // Silent fail
    } finally {
      setSubmitting(false);
    }
  }

  return { submitting, success, handleSubmit };
}