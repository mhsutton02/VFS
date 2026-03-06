// app/error.tsx
"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#f5f5f5",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "520px", padding: "0 24px" }}>
        <p
          style={{
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#f5b74a",
            marginBottom: "12px",
          }}
        >
          Something went wrong
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: "0 0 16px",
          }}
        >
          Unexpected Error
        </h1>
        <p style={{ fontSize: "16px", color: "#a1a1a1", marginBottom: "32px" }}>
          We hit a snag loading this page. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            display: "inline-block",
            padding: "14px 32px",
            borderRadius: "18px",
            background: "#f5b74a",
            color: "#0a0a0a",
            fontWeight: 600,
            fontSize: "15px",
            textDecoration: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
