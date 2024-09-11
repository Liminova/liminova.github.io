import { createContentLoader } from "vitepress";
import { formatDate } from "./theme/yanami/libs";

export interface Post {
	title: string;
	url: string;
	author: string;
	date: {
		original: string;
		time: number;
		string: string;
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
			.sort((a, b) => b.date.time - a.date.time);
	},
});
