import type { Post } from "../../../posts.data";

/**
 * Format a date string to a human readable format.
 */
export function formatDate(raw: string): Post["date"] {
	const date = new Date(raw);
	date.setUTCHours(12);
	return {
		original: raw,
		time: Number(date),
		string: date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
	};
}
