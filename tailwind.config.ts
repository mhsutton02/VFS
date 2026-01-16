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
      },

      // ──────────────────────────────────────────────
      // NEW ADDITIONS for mobile optimization priorities
      // #2: Touch targets (WCAG 2.2 recommended min 44–48px)
      // #7: Mobile-first fluid typography to prevent tiny text on small screens
      // ──────────────────────────────────────────────
      minWidth: {
        touch: "48px",      // Use min-w-touch on buttons/links/nav items
      },
      minHeight: {
        touch: "48px",      // Use min-h-touch for tappable areas
      },
      spacing: {
        touch: "12px",      // Comfortable padding helper → px-touch / py-touch
      },
      fontSize: {
        // Fluid typography using clamp() – scales nicely across devices
        'fluid-xs': "clamp(0.75rem, 3.5vw + 0.1rem, 0.875rem)",
        'fluid-sm': "clamp(0.875rem, 4vw + 0.15rem, 1rem)",
        'fluid-base': "clamp(1rem, 4.5vw + 0.2rem, 1.125rem)",
        'fluid-lg': "clamp(1.125rem, 5vw + 0.25rem, 1.25rem)",
        'fluid-xl': "clamp(1.25rem, 5.5vw + 0.3rem, 1.5rem)",
      },
      // Optional: If you want even better contrast/accessibility (#6),
      // you could add a high-contrast mode later via dark mode or custom variant
    }
  },
  plugins: []
};

export default config;