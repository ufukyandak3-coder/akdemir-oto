import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vanta: "#0a0a0a",
        cream: "#FDFBF7",
        accent: "#ff3b30",
      },
      fontFamily: {
        clash: ["var(--font-clash)", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ['"Editorial New"', "ui-serif", "Georgia", "serif"],
      },
      letterSpacing: {
        eyebrow: "0.2em",
      },
      transitionTimingFunction: {
        lux: "cubic-bezier(0.32,0.72,0,1)",
      },
    },
  },
  plugins: [],
};

export default config;
