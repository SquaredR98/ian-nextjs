import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { Testimonial } from "@/lib/types";
import { normalizeTestimonial } from "./normalizers";

export const testimonialsApi = {
	getAll: async (): Promise<{ data: Testimonial[]; source?: string }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: Testimonial[] }>(
				apiPath("/api/testimonials", "/testimonials"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<any>(
			apiPath("/api/testimonials", "/testimonials"),
		);
		// Backend returns { source, data: [...] } wrapped in envelope
		const inner = raw.data ?? raw;
		const source: string = inner.source || "manual";
		const items: unknown[] = inner.data ?? (Array.isArray(inner) ? inner : []);
		return {
			source,
			data: items.map((t) => normalizeTestimonial(t as never)),
		};
	},
};
