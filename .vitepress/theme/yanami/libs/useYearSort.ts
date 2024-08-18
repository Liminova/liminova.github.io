import type { Post } from "../../../posts.data";

/**
 * Sort posts by year.
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
