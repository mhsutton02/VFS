import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{json,mdx}"
  ],
  // Tailwind is used only for accessibility utilities (touch targets, focus rings,
  // fluid type). All visual styling uses the vf-* CSS design system in globals.css.
  theme: {
    extend: {
      colors: {
        accent: "#f5b74a",   // referenced by focus-visible:outline-accent
      },

      // Touch targets – WCAG 2.2 recommended min 44–48px
      minWidth: {
        touch: "48px",      // Use min-w-touch on buttons/links/nav items
      },
      minHeight: {
        touch: "48px",      // Use min-h-touch for tappable areas
      },
      spacing: {
        touch: "12px",      // Comfortable padding helper → px-touch / py-touch
      },
    }
  },
  plugins: []
};

export default config;