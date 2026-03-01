export type ApiMode = "mock" | "live";

export const apiConfig = {
	mode: (process.env.NEXT_PUBLIC_API_MODE || "mock") as ApiMode,
	get baseUrl() {
		if (this.mode === "live") {
			return (
				process.env.NEXT_PUBLIC_API_URL ||
				"http://localhost:5550/api/v1"
			);
		}
		return "";
	},
	get isLive() {
		return this.mode === "live";
	},
	siteUrl:
		process.env.NEXT_PUBLIC_SITE_URL ||
		"https://www.injuryassistancenetwork.com",
	googleMapsKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
	gaTrackingId:
		process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-66MHN1MFYE",
};

/**
 * Returns the correct path based on API mode.
 * Mock mode: paths go to Next.js internal API routes (/api/xxx)
 * Live mode: paths go to the backend directly (/xxx)
 */
export function apiPath(mockPath: string, livePath: string): string {
	return apiConfig.isLive ? livePath : mockPath;
}
