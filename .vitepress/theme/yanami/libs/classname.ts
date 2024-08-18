import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge all kinds of class names into a single string and remove conflicting tailwind classes.
 */
export function classname(...inputs: Array<ClassValue>): string {
	return twMerge(clsx(inputs));
}
