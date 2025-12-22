import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{json,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#070b14",
        bg2: "#0b1222",
        surface: "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.12)",
        text: "#f4f6fb",
        muted: "#a7b0c6",
        accent: "#f5b74a",
        accent2: "#2b72ff"
      },
      boxShadow: {
        vf: "0 18px 48px rgba(0,0,0,0.45)",
        vfCard: "0 12px 32px rgba(0,0,0,0.32)",
        vfCardActive: "0 18px 44px rgba(0,0,0,0.45)"
      },
      borderRadius: {
        vf: "18px"
      },
      maxWidth: {
        vf: "1120px"
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;