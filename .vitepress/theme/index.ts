import type { Theme, EnhanceAppContext } from "vitepress";
import Blogs from "./yanami/layouts/Blogs.vue";
import DefaultTheme from "vitepress/theme";
import "./style.css";

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: EnhanceAppContext) {
        app.component("Blogs", Blogs);
    }
} satisfies Theme;
