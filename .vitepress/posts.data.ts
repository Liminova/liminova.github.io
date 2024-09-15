import { createContentLoader } from "vitepress";
import { formatDate } from "./theme/yanami/libs";

export interface Post {
	title: string;
	url: string;
	author: string;
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
		return raw
			.map(({ url, frontmatter }) => ({
				title: frontmatter.title as string,
				url,
				author: frontmatter.author as string,
				description: frontmatter.description as string | undefined,
				date: formatDate(frontmatter.date as string),
				tags: frontmatter.tags as Array<string>,
				thumbnail: frontmatter.thumbnail as string | undefined,
			}))
			.sort((a, b) => b.date.unixMilliseconds - a.date.unixMilliseconds);
	},
});
