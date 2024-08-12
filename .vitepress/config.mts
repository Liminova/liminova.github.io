import { defineConfig } from "vitepress";

export default defineConfig({
    title: "Liminova",
    description: "We are a group of developers and CTF enjoyers!",
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: "Home", link: "/" },
            { text: "Blogs", link: "/blogs" }
        ],

        socialLinks: [
            { icon: "github", link: "https://github.com/Liminova" }
        ],
        footer: {
            message: '八奈見 is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>. Source code available <a href="https://github.com/Liminova/liminova.github.io">here</a>.',
            copyright: 'Copyright © 2024-present <a href="https://github.com/Liminova">Liminova</a>.'
        },
    },
});
