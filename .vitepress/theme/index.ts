import type { Theme, EnhanceAppContext } from "vitepress";
import Blog from "./yanami/layouts/Blog.vue";
import Contests from "./yanami/layouts/Contests.vue";
import CustomLayout from "./yanami/layouts/CustomLayout.vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";

export default {
	extends: DefaultTheme,
	Layout: CustomLayout,
	enhanceApp({ app }: EnhanceAppContext) {
		app.component("Blog", Blog);
		app.component("Contests", Contests);
	}
} satisfies Theme;
