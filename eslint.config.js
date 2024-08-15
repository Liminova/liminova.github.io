import hagemanto from "eslint-plugin-hagemanto";
import tailwind from "eslint-plugin-tailwindcss";
import vue from "eslint-plugin-vue";
import globals from "globals";

export default [
	{ ignores: [".vitepress/cache/**/*.*", ".vitepress/theme/env.d.ts", "*.config.{ts,js,cjs}"] },
	{ files: ["**/*.{ts,vue}"] },

	...hagemanto.configs.recommended,
	...vue.configs["flat/essential"],
	...tailwind.configs["flat/recommended"],

	{
		rules: {
			"vue/multi-word-component-names": "off",
		},
	},

	// this must be last to override all other configs
	{
		languageOptions: {
			globals: globals.browser, parserOptions: {
				project: true, parser: "@typescript-eslint/parser", extraFileExtensions: [".vue"]
			}
		}
	},
];