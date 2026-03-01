/**
 * Base URL for serving uploaded files (images, documents, etc.)
 * In dev: http://localhost:5550 (backend static files)
 * In prod: https://api.injuryassistancenetwork.com
 */
function getStorageBase(): string {
	if (process.env.NEXT_PUBLIC_STORAGE_URL) return process.env.NEXT_PUBLIC_STORAGE_URL;
	if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/v1\/?$/, "");
	return "https://api.injuryassistancenetwork.com";
}

function getSiteBase(): string {
	return process.env.NEXT_PUBLIC_SITE_URL || "https://www.injuryassistancenetwork.com";
}

export function resolveImageUrl(path: string | null | undefined): string {
	if (!path) return "/images/defaultimg.jpeg";
	if (path.startsWith("http")) return path;

	// Normalize double-slash paths
	const normalized = path.replace(/\/\/+/g, "/");

	// API-served images (uploads/logos/...)
	if (normalized.startsWith("uploads/") || normalized.startsWith("/uploads/")) {
		const clean = normalized.replace(/^\//, "");
		return `${getStorageBase()}/${clean}`;
	}

	// Site-served images (v1/uploads/... or dist/...)
	if (normalized.startsWith("v1/") || normalized.startsWith("dist/")) {
		return `${getSiteBase()}/${normalized}`;
	}

	// Local public images
	if (normalized.startsWith("/")) return normalized;

	return `${getSiteBase()}/${normalized}`;
}
