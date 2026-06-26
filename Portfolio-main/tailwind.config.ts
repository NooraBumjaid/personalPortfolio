import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/globals.css",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#070b14",
          surface: "#0f172a",
          card: "rgba(15, 23, 42, 0.72)",
          border: "rgba(45, 212, 191, 0.14)",
          accent: "#2dd4bf",
          "accent-dim": "#14b8a6",
          cyan: "#38bdf8",
          purple: "#818cf8",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0, 255, 170, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 170, 0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(ellipse at top, rgba(0, 255, 170, 0.08), transparent 60%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
