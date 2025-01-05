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
        background: "#0c1422",
        foreground: "var(--foreground)",
        link: "#9DA1A6",
        "link-hover": "#00B0FF",
        blue: '#00B0FF'
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
} satisfies Config;
