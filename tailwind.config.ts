import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#07080a",
          900: "#0b0d10",
          800: "#12151a",
          700: "#1a1f26",
          600: "#242b34",
        },
        brand: {
          // emerald "market growth" accent
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
        signal: {
          // secondary amber accent
          400: "#fbbf24",
          500: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
