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
    ]
  }
})
