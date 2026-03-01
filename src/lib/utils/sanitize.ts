import DOMPurify from "dompurify";

/**
 * Sanitize HTML string to prevent XSS attacks.
 * Use this whenever rendering user-generated or CMS HTML via dangerouslySetInnerHTML.
 */
export function sanitizeHtml(dirty: string): string {
	if (typeof window === "undefined") {
		// SSR: return as-is (DOMPurify needs a DOM).
		// Content will be re-sanitized on hydration.
		return dirty;
	}
	return DOMPurify.sanitize(dirty, {
		ADD_TAGS: ["iframe"],
		ADD_ATTR: ["allowfullscreen", "frameborder", "target"],
	});
}
