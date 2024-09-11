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
	excerpt?: string;
	tags?: Array<string>;
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
	excerpt: true,
	transform(raw): Array<Post> {
		return raw
			.map(({ url, frontmatter, excerpt }) => ({
				title: frontmatter.title as string,
				url,
				author: frontmatter.author as string,
				excerpt,
				date: formatDate(frontmatter.date as string),
				tags: frontmatter.tags as Array<string>,
			}))
			.sort((a, b) => b.date.unixMilliseconds - a.date.unixMilliseconds);
	},
});
