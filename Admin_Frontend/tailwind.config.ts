import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: {
          primary: "#C41E3A",
          bright: "#FF3B4E",
          hover: "#A01830",
          deep: "#8F0E22",
          tint: "#FFF0F1",
          tint2: "#FFE3E6",
        },
        charcoal: {
          DEFAULT: "#1A1A2E",
          light: "#4A4A6A",
        },
        grey: {
          soft: "#F4F5F7",
          mid: "#E8E9EC",
        },
        status: {
          green: "#1E9E5A",
          greenTint: "#E4F8EE",
          amber: "#B26B00",
          amberTint: "#FFF4E0",
          blue: "#3550C4",
          blueTint: "#EAEFFF",
          purple: "#7C3AED",
          purpleTint: "#F3E8FF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        xs: "8px",
        sm: "12px",
        md: "16px",
        lg: "22px",
        xl: "28px",
        "2xl": "34px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(26,26,46,.05), 0 1px 1px rgba(26,26,46,.03)",
        card: "0 4px 14px rgba(26,26,46,.06), 0 1px 3px rgba(26,26,46,.04)",
        modal: "0 14px 36px rgba(26,26,46,.14)",
        red: "0 4px 12px rgba(196,30,58,.22)",
      },
    },
  },
  plugins: [],
};
export default config;
