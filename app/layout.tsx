// app/layout.tsx – fixed font import
import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';  // ← Correct import for Geist Sans

export const metadata: Metadata = {
  title: "ValorForge Solutions",
  description:
    "ValorForge Solutions – Veteran-owned SDVOSB providing strategic IT consulting, AI alignment, and mission-focused technology solutions.",
  openGraph: {
    title: "ValorForge Solutions",
    description:
      "Veteran-owned SDVOSB providing strategic IT consulting, AI alignment, and mission-focused technology solutions.",
    url: "https://valorforge.com/",
    type: "website",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

// ... imports and metadata/viewport as before

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* ...other head tags... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
}