import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			animation: {
				"fade-in": "fade-in 1s ease-in-out",
				"from-bottom-explicit":
					"from-bottom-explicit 3.5s ease-in-out forwards",
			},
			colors: {
				background: "#0c1422",
				foreground: "var(--foreground)",
				link: "#9DA1A6",
				"link-hover": "#00B0FF",
				blue: "#00B0FF",
			},
			container: {
				center: true,
				padding: {
					sm: "20px",
					lg: "40px",
				},
			},
			keyframes: {
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"from-bottom-explicit": {
					"0%": { transform: "translateY(150%)" },
					"10%": { transform: "translateY(0)" },
					"80%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(150%)" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;

