import hagemanto from "eslint-plugin-hagemanto";
import tailwind from "eslint-plugin-tailwindcss";
import vue from "eslint-plugin-vue";
import globals from "globals";

export default [
	{ ignores: [".vitepress/cache/**/*.*", ".vitepress/dist/**/*.*", ".vitepress/theme/env.d.ts", "*.config.{ts,js,cjs}"] },
	{ files: ["**/*.{ts,vue,mts}"] },

	...hagemanto({ enablePrettier: true }),
	...vue.configs["flat/essential"],
	...tailwind.configs["flat/recommended"],

	{
		rules: {
			"vue/multi-word-component-names": "off",
			"tailwindcss/no-custom-classname": "off",
			"vue/html-indent": ["error", "tab"],
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
