import pluginJs from "@eslint/js";
import tailwind from "eslint-plugin-tailwindcss";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";


export default [
	{ignores: [".vitepress/cache/**/*.*", ".vitepress/theme/env.d.ts", "postcss.config.cjs"]},
	{files: ["**/*.{js,mjs,cjs,ts,vue}"]},
	{languageOptions: { globals: globals.browser }},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...tailwind.configs["flat/recommended"],
	...pluginVue.configs["flat/essential"],
	{rules: {"vue/multi-word-component-names": "off", "indent": ["error", "tab"]}},
	{files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];