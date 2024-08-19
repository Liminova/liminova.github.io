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
	excerpt: string | undefined;
	tags: Array<string> | undefined;
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
		/* eslint-disable */
		return raw
			.map(({ url, frontmatter, excerpt }) => ({
				title: frontmatter.title,
				url,
				author: frontmatter.author,
				excerpt,
				date: formatDate(frontmatter.date),
				tags: frontmatter.tags,
			}
			))
			.sort((a, b) => b.date.time - a.date.time);
		/* eslint-enable */
	},
});
