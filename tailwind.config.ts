import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
			colors: {
				// background: "hsl(0, 0%, 100%)",
				// foreground: "hsl(224, 71.4%, 4.1%)",
				// card: "hsl(0, 0%, 100%)",
				// "card-foreground": "hsl(224, 71.4%, 4.1%)",
				// popover: "hsl(0, 0%, 100%)",
				// "popover-foreground": "hsl(224, 71.4%, 4.1%)",
				// primary: "hsl(220.9, 39.3%, 11%)",
				// "primary-foreground": "hsl(210, 20%, 98%)",
				// secondary: "hsl(220, 14.3%, 95.9%)",
				// "secondary-foreground": "hsl(220.9, 39.3%, 11%)",
				// muted: "hsl(220, 14.3%, 95.9%)",
				// "muted-foreground": "hsl(220, 8.9%, 46.1%)",
				// accent: "hsl(220, 14.3%, 95.9%)",
				// "accent-foreground": "hsl(220.9, 39.3%, 11%)",
				// destructive: "hsl(0, 84.2%, 60.2%)",
				// "destructive-foreground": "hsl(210, 20%, 98%)",
				// border: "hsl(220, 13%, 91%)",
				// input: "hsl(220, 13%, 91%)",
				// ring: "hsl(224, 71.4%, 4.1%)",
				// "dark-background": "hsl(224, 71.4%, 4.1%)",
				// "dark-foreground": "hsl(210, 20%, 98%)",
				// "dark-card": "hsl(224, 71.4%, 4.1%)",
				// "dark-card-foreground": "hsl(210, 20%, 98%)",
				// "dark-popover": "hsl(224, 71.4%, 4.1%)",
				// "dark-popover-foreground": "hsl(210, 20%, 98%)",
				// "dark-primary": "hsl(210, 20%, 98%)",
				// "dark-primary-foreground": "hsl(220.9, 39.3%, 11%)",
				// "dark-secondary": "hsl(215, 27.9%, 16.9%)",
				// "dark-secondary-foreground": "hsl(210, 20%, 98%)",
				// "dark-muted": "hsl(215, 27.9%, 16.9%)",
				// "dark-muted-foreground": "hsl(217.9, 10.6%, 64.9%)",
				// "dark-accent": "hsl(215, 27.9%, 16.9%)",
				// "dark-accent-foreground": "hsl(210, 20%, 98%)",
				// "dark-destructive": "hsl(0, 62.8%, 30.6%)",
				// "dark-destructive-foreground": "hsl(210, 20%, 98%)",
				// "dark-border": "hsl(215, 27.9%, 16.9%)",
				// "dark-input": "hsl(215, 27.9%, 16.9%)",
				// "dark-ring": "hsl(216, 12.2%, 83.9%)",
				"primary-light": "#F1F1F3",
				"secondary-light": "#DCDCE2",
				"primary-dark": "#0B0B0e",
				"secondary-dark": "#1A1610",
				"primary-grey": "#B9B9C6",
				"secondary-grey": "#9696A9",
				"tertiary-grey": "#393946",
				"primary-red": "#FF4051",
				"skin-tone": "#FFDEA0",
				"accent-background": "#D1E50C",
			},
			borderRadius: {
				default: "0.5rem",
			},
			fontFamily: {
				poppins: "'Poppins', sans-serif",
				quicksand: "'Quicksand', sans-serif",
				manrope: "'Manrope', sans-serif",
				muli: "'muli', sans-serif",
				b612: "'B612', sans-serif",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
