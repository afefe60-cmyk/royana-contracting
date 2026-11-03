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
          primary: "#0B192C",
          "primary-light": "#162C46",
          secondary: "#1E3E62",
          accent: "#C68B59",
          "accent-hover": "#B57B4B",
          cyan: "#39B5FF",
          "cyan-dark": "#0284C7",
          "cyan-light": "#E0F2FE",
          dark: "#1E293B",
          light: "#F8FAFC",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
