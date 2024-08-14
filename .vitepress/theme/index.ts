import type { EnhanceAppContext, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import Blog from "./yanami/layouts/Blog.vue";
import Contests from "./yanami/layouts/Contests.vue";
import CustomLayout from "./yanami/layouts/CustomLayout.vue";
import goatcounter from "./yanami/plugin/goatcounter";

export default {
	extends: DefaultTheme,
	Layout: CustomLayout,
	enhanceApp({ app }: EnhanceAppContext) {
		app.component("Blog", Blog);
		app.component("Contests", Contests);
		goatcounter({ id: "liminova" });
	},
} satisfies Theme;
