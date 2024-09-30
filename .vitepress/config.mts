import { createHash } from "node:crypto";
import { copyFile, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { type DefaultTheme, defineConfigWithTheme } from "vitepress";

export type ThemeConfig = DefaultTheme.Config & { members?: Array<TeamMember> };

export type TeamMember = Omit<DefaultTheme.TeamMember, "links"> & {
	links: Array<SocialLink>;
};

export interface SocialLink {
	icon: Omit<DefaultTheme.SocialLinkIcon, "svg"> | "osu" | "mail";
	link: string;
}

const assetsCopyQueue: Array<{ src: string; dest: string }> = [];

export default defineConfigWithTheme<ThemeConfig>({
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
			{ text: "Wall of Yanami", link: "/wall-of-yanami" },
		],

		socialLinks: [{ icon: "github", link: "https://github.com/Liminova" }],
		footer: {
			message:
				'八奈見 is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>. Source code available <a href="https://github.com/Liminova/liminova.github.io">here</a>.',
			copyright:
				'Copyright © 2024-present <a href="https://github.com/Liminova">Liminova</a>.',
		},
		externalLinkIcon: true,
		members: [
			{
				avatar: "/rylie.png",
				name: "Rylie",
				title: "resident troller, founder of CTF division",
				links: [
					{ icon: "github", link: "https://github.com/j1nxie" },
					{ icon: "twitter", link: "https://x.com/_lumi9" },
					{ icon: "osu", link: "https://osu.ppy.sh/u/14585583" },
				],
			},
			{
				avatar: "https://avatars.githubusercontent.com/u/107946882?v=4",
				name: "Peachy",
				links: [{ icon: "github", link: "https://github.com/Peachy72" }],
			},
			{
				avatar: "/delnegend.mp4",
				name: "Delnegend",
				links: [
					{ icon: "github", link: "https://github.com/Delnegend" },
					{ icon: "mail", link: "mailto:kiennguyen19323@gmail.com" },
				],
			},
			{
				avatar: "/ellimac.mp4",
				name: "Ellimac",
				links: [{ icon: "github", link: "https://github.com/EllimacH" }],
			},
			{
				avatar: "https://avatars.githubusercontent.com/u/101856461?v=4",
				name: "Maxim",
				links: [{ icon: "github", link: "https://github.com/GHCMaxim" }],
			},
			{
				avatar: "/namspro.png",
				name: "NamSPro",
				title: "founder of competitive programming/gaming division",
				links: [
					{ icon: "github", link: "https://github.com/NamSPro" },
					{ icon: "osu", link: "https://osu.ppy.sh/u/11387006" },
				],
			},
			{
				avatar: "https://avatars.githubusercontent.com/u/92439990?v=4",
				name: "beerpsi",
				links: [{ icon: "github", link: "https://github.com/beer-psi" }],
			},
			{
				avatar: "/sorako.jpg",
				name: "Sorako",
				title: "happy to be here",
				links: [],
			},
		],
	},
	head: [
		["link", { rel: "icon", href: "/favicon/favicon.ico" }],
		["link", { rel: "icon", sizes: "32x32", href: "/favicon/favicon-32x32.png" }],
		["link", { rel: "icon", sizes: "16x16", href: "/favicon/favicon-16x16.png" }],
		["link", { rel: "apple-touch-icon", href: "/favicon/apple-touch-icon.png" }],
		["link", { rel: "manifest", href: "/favicon/site.webmanifest" }],
	],
	transformPageData(pageData, ctx) {
		type Head = Array<[string, Record<string, string>]>;

		const excerpt = pageData.frontmatter.excerpt as string;
		const thumbnail = pageData.frontmatter.thumbnail as string;

		if (typeof pageData.frontmatter.head === "undefined") {
			pageData.frontmatter.head = [];
		}

		if (excerpt) {
			(pageData.frontmatter.head as Head).push(
				["meta", { property: "description", content: excerpt }],
				["meta", { property: "og:description", content: excerpt }],
				["meta", { property: "twitter:description", content: excerpt }]
			);
		}

		if (thumbnail) {
			const outputPath = (() => {
				if (
					thumbnail.startsWith("http") ||
					thumbnail.startsWith("//") ||
					process.env.NODE_ENV !== "production"
				) {
					return thumbnail;
				}

				const inputPath = join(ctx.siteConfig.root, "blog", thumbnail);

				// any/thing/here/image.jpg -> .vitepress/dist/assets/image.sha256.jpg
				const thumbnailHash = createHash("sha256")
					.update(readFileSync(inputPath))
					.digest("base64")
					.slice(0, 8);
				const thumbnailExtension = thumbnail.split(".").pop();
				const thumbnailBasename = basename(thumbnail, thumbnailExtension);
				const thumbnailFilename = `${thumbnailBasename}${thumbnailHash}.${thumbnailExtension}`;
				const destinationPath = join(".vitepress/dist/assets", thumbnailFilename);

				assetsCopyQueue.push({ src: inputPath, dest: destinationPath });

				return join("/assets", thumbnailFilename);
			})();

			(pageData.frontmatter.head as Head).push(
				["meta", { property: "og:image", content: outputPath }],
				["meta", { property: "twitter:image", content: outputPath }],
				["meta", { name: "twitter:card", content: "summary_large_image" }]
			);
		}
	},
	buildEnd() {
		for (const { src, dest } of assetsCopyQueue) {
			copyFile(src, dest, (err) => {
				if (err) {
					throw err;
				}
			});
		}
	},
});
