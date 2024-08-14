import type { Theme, EnhanceAppContext } from "vitepress";
import Blog from "./yanami/layouts/Blog.vue";
import Contests from "./yanami/layouts/Contests.vue";
import CustomLayout from "./yanami/layouts/CustomLayout.vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";
import goatcounter from "./yanami/plugin/goatcounter";

export default {
	extends: DefaultTheme,
	Layout: CustomLayout,
	enhanceApp({ app }: EnhanceAppContext) {
		app.component("Blog", Blog);
		app.component("Contests", Contests);
		goatcounter({ id: "liminova" });
	}
} satisfies Theme;
