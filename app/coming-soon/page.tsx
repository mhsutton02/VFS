"use client";

import { Metadata } from "next";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <main>
      <div className="vf-block">
        <div className="vf-container">
          <div
            style={{
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <h1 style={{ fontSize: "48px", fontWeight: 900, marginBottom: "16px" }}>
              Coming Soon
            </h1>
            <p style={{ fontSize: "18px", color: "#4b5565", marginBottom: "40px" }}>
              This content is coming soon. Check back later for more information.
            </p>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                padding: "12px 24px",
                background: "#e8f0ff",
                color: "#2b72ff",
                border: "2px solid #2b72ff",
                fontWeight: 700,
                fontSize: "13px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}