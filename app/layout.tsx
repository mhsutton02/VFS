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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={GeistSans.className}  // or geistSans.variable if using variable
      suppressHydrationWarning={true}   // ← Add this line
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* other head content */}
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}