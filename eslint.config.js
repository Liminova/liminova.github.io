import hagemanto from "eslint-plugin-hagemanto";
import vue from "eslint-plugin-vue";

export default [
	{ name: "yanami/includes", ignores: [".vitepress/cache/**/*.*", ".vitepress/dist/**/*.*", ".vitepress/theme/env.d.ts", "*.config.{ts,js,cjs}"] },
	{ name: "yanami/excludes", files: ["**/*.{ts,vue,mts}"] },

	...hagemanto({
		enableJsx: false,
		vueConfig: vue.configs["flat/essential"],
	}),

	{
		name: "yanami/rules",
		rules: {
			"vue/multi-word-component-names": "off",
			"tailwindcss/no-custom-classname": "off"
		},
	},
];
