import { createContentLoader } from "vitepress";
import config from "./config.mjs";
import { formatDate } from "./theme/yanami/libs";

// Don't use TeamMember because "the loaded data
// will be inlined as JSON in the client bundle"
// https://vitepress.dev/guide/data-loading#createcontentloader
export interface PostAuthor {
	name: string;
	avatar: string;
}

export interface Post {
	title: string;
	url: string;
	authors: Array<PostAuthor>;
	date: {
		original: string; // ISO 8601 date string
		unixMilliseconds: number; // Unix timestamp
		readable: string; // Human-readable date string
	};
	description?: string;
	tags?: Array<string>;
	thumbnail?: string;
}

declare const data: Array<Post>;
export { data };

const patterns = ["blog/*.md"];
if (process.env.NODE_ENV !== "production") {
	patterns.push("drafts/*.md");
}

/**
 * Load posts from markdown files.
 */
export default createContentLoader(patterns, {
	excerpt: false,
	transform(raw): Array<Post> {
		const membersData = config.themeConfig?.members;
		if (membersData === undefined) {
			throw new Error("members in config.themeConfig is undefined");
		}

		return raw
			.map(({ url, frontmatter }) => {
				const authors: Array<PostAuthor> = [];
				switch (true) {
					case typeof frontmatter.author === "string": {
						const findResult = membersData.find(
							(member) => member.name === frontmatter.author
						);
						if (!findResult) {
							throw new Error(
								`author ${frontmatter.author} in ${url} not found in \`config.mts\``
							);
						}

						authors.push({ avatar: findResult.avatar, name: findResult.name });
						break;
					}

					case typeof frontmatter.author === "object" &&
						Array.isArray(frontmatter.author): {
						for (const author of frontmatter.author as Array<string>) {
							const findResult = membersData.find((member) => member.name === author);
							if (!findResult) {
								throw new Error(
									`author ${author} in ${url} not found in \`config.mts\``
								);
							}

							authors.push({ avatar: findResult.avatar, name: findResult.name });
						}

						break;
					}

					default:
						throw new Error(
							`type of author must be \`string\` or \`Array<string>\` in ${url}`
						);
				}

				if (authors.length === 0) {
					throw new Error(`author field in ${url} is empty`);
				}

				return {
					title: frontmatter.title as string,
					url,
					authors,
					description: frontmatter.description as string | undefined,
					date: formatDate(frontmatter.date as string),
					tags: frontmatter.tags as Array<string> | undefined,
					thumbnail: frontmatter.thumbnail as string | undefined,
				};
			})
			.sort((a, b) => b.date.unixMilliseconds - a.date.unixMilliseconds);
	},
});
