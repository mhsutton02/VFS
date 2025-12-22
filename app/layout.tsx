// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ValorForge Solutions",
  description:
    "ValorForge Solutions – Veteran-owned SDVOSB providing strategic IT consulting, AI alignment, and mission-focused technology solutions.",
  openGraph: {
    title: "ValorForge Solutions",
    description:
      "Veteran-owned SDVOSB providing strategic IT consulting, AI alignment, and mission-focused technology solutions.",
    url: "https://valorforge.com/",
    type: "website"
  },
  themeColor: "#070b14"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
