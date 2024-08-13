import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: [
		"./.vitepress/**/*.{vue,js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"sans": ["Inter", ...defaultTheme.fontFamily.sans]
			}
		},
	},
	plugins: [],
}
