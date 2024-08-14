import defaultTheme from "tailwindcss/defaultTheme";

export default {
	content: [
		"./.vitepress/**/*.{vue,js,ts,jsx,tsx}",
		"./blog/**/*.md",
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
