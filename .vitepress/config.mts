import { defineConfig } from "vitepress";

export default defineConfig({
	title: "Liminova",
	description: "We are a group of developers and CTF enjoyers!",
	cleanUrls: true,
	markdown: {
		math: true,
	},
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Blog", link: "/blog" },
			{ text: "Contests", link: "/contests" },
		],

		socialLinks: [{ icon: "github", link: "https://github.com/Liminova" }],
		footer: {
			message:
				'八奈見 is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>. Source code available <a href="https://github.com/Liminova/liminova.github.io">here</a>.',
			copyright:
				'Copyright © 2024-present <a href="https://github.com/Liminova">Liminova</a>.',
		},
		externalLinkIcon: true,
	},
	head: [
		["link", { rel: "icon", href: "/favicon/favicon.ico" }],
		["link", { rel: "icon", sizes: "32x32", href: "/favicon/favicon-32x32.png" }],
		["link", { rel: "icon", sizes: "16x16", href: "/favicon/favicon-16x16.png" }],
		["link", { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png" }],
		["link", { rel: "manifest", href: "/favicon/site.webmanifest" }],
	],
	transformPageData(pageData, ctx) {
		const excerpt = pageData.frontmatter.excerpt as string;
		const thumbnail = pageData.frontmatter.thumbnail as string;
		if (!pageData.frontmatter.head) {
			pageData.frontmatter.head = [];
		}
		if (excerpt) {
			pageData.frontmatter.head.push(
				["meta", { property: "description", content: excerpt }],
				["meta", { property: "og:description", content: excerpt }],
				["meta", { property: "twitter:description", content: excerpt }]
			);
		}
		if (thumbnail) {
			pageData.frontmatter.head.push(
				["meta", { property: "og:image", content: thumbnail }],
				["meta", { property: "twitter:image", content: thumbnail }],
				["meta", { name: "twitter:card", content: "summary_large_image" }]
			);
		}
	},
});
