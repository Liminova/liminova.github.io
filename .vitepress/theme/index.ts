import type { Theme, EnhanceAppContext } from "vitepress";
import Blog from "./yanami/layouts/Blog.vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: EnhanceAppContext) {
        app.component("Blog", Blog);
    }
} satisfies Theme;
