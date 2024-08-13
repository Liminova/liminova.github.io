import { createContentLoader } from "vitepress";
import { formatDate } from "./theme/yanami/utils";

export interface Post {
    title: string;
    url: string;
    author: string;
    date: {
        original: string,
        time: number;
        string: string;
    };
    excerpt: string | undefined;
}

declare const data: Post[];
export { data }

export default createContentLoader("blog/*.md", { excerpt: true, transform(raw): Post[] {
    return raw.map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title,
        url,
        author: frontmatter.author,
        excerpt,
        date: formatDate(frontmatter.date)
    })).sort((a, b) => b.date.time - a.date.time);
} });
