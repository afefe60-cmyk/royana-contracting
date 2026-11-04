import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{json,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#070d18",
          night: "#0d1728",
          card: "rgba(18, 30, 52, 0.75)",
          "card-hover": "rgba(26, 44, 76, 0.9)",
          primary: "#2563eb",
          "primary-glow": "#3b82f6",
          accent: "#00d2ff",
          cyan: "#00d2ff",
          "cyan-dark": "#0284c7",
          "cyan-light": "#e0f2fe",
          border: "rgba(56, 189, 248, 0.15)",
          "border-glow": "rgba(56, 189, 248, 0.4)",
          muted: "#94a3b8",
          dim: "#64748b",
          light: "#f8fafc",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(0, 210, 255, 0.25)",
        "glow-lg": "0 0 40px rgba(0, 210, 255, 0.4)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #00d2ff 0%, #3a7bd5 100%)",
        "secondary-gradient": "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
