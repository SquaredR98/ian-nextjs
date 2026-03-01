import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { Testimonial } from "@/lib/types";
import { normalizeTestimonial } from "./normalizers";

export const testimonialsApi = {
	getAll: async (): Promise<{ data: Testimonial[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: Testimonial[] }>(
				apiPath("/api/testimonials", "/testimonials"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/testimonials", "/testimonials"),
		);
		return {
			data: (raw.data ?? []).map(normalizeTestimonial),
		};
	},
};
