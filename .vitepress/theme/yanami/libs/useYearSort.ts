import type { Post } from "../../../posts.data";

/**
 * Group posts by year.
 *
 * Example:
 * Input
 * ```js
 * [ { date: { original: "2022-01-01" } },
 *   { date: { original: "2023-02-01" } },
 *   { date: { original: "2023-03-01" } },
 *   { date: { original: "2024-01-01" } },
 *   { date: { original: "2024-02-01" } } ]
 * ```
 * Output
 * ```js
 * [
 *   [
 *     { date: { original: "2022-01-01" } }
 *   ],
 *  [
 *     { date: { original: "2023-02-01" } },
 *     { date: { original: "2023-03-01" } }
 *   ],
 *   [
 *     { date: { original: "2024-01-01" } },
 *     { date: { original: "2024-02-01" } } ]
 *   ]
 * ]
 * ```
 */
export function useYearSort(posts: Array<Post>): Array<Array<Post>> {
	const data: Array<Array<Post>> = [];
	let year = "0";
	let index = -1;

	for (const post of posts) {
		if (post.date.original) {
			const y: string = post.date.original.split("-")[0];
			if (y === year) {
				data[index].push(post);
			} else {
				index++;
				data[index] = [];
				data[index].push(post);
				year = y;
			}
		}
	}

	return data;
}
