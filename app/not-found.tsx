// app/not-found.tsx
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="vf-section" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "500px", padding: "0 20px" }}>
          <div className="vf-kicker">404</div>
          <h1 className="vf-h1">Page Not Found</h1>
          <p className="vf-lead">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="vf-btn vf-btn-primary">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
