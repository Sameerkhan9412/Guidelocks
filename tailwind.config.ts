import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#111111",
      gold: "#D4AF37",
      light: "#f8f8f8"
      },
    },
  },
  plugins: [],
};

export default config;