import type { Post } from "../../../posts.data";

/**
 * Format a raw date string to a human readable format + Unix timestamp.
 */
export function formatDate(raw: string): Post["date"] {
	const date = new Date(raw);
	date.setUTCHours(12);
	return {
		original: raw,
		unixMilliseconds: Number(date),
		readable: date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}),
	};
}
