import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4B40EE",
        secondary: "#7876fe",
        accent: "#3fb76f",
      },
      fontFamily: {
        sans: ['"DM Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
