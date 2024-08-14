import prettier from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import vue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
	{
		ignores: [
			".vitepress/cache/**/*.*",
			".vitepress/theme/env.d.ts",
			"postcss.config.cjs",
		],
	},
	{ files: ["**/*.{ts,vue}"] },
	{ languageOptions: { globals: globals.browser } },
	...tseslint.configs.recommended,
	prettier,
	...tailwind.configs["flat/recommended"],
	...vue.configs["flat/essential"],
	{
		rules: {
			"vue/multi-word-component-names": "off",
			indent: ["error", "tab"],
		},
	},
];
