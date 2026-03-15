import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#1F2937",
        accent: "#C8A951",
        background: "#F9FAFB",
      },
    },
  },
  plugins: [],
};

export default config;