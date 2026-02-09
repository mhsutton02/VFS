// app/not-found.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
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
            404
          </p>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700, marginBottom: "16px" }}>
            Page Not Found
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.6, color: "rgba(245,245,245,0.7)", marginBottom: "32px" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 32px",
              background: "#f5b74a",
              color: "#0a0a0a",
              fontWeight: 600,
              borderRadius: "6px",
              textDecoration: "none",
            }}
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
