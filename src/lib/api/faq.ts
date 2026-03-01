import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { FAQItem } from "@/lib/types";
import { normalizeFaq } from "./normalizers";

export const faqApi = {
	getAll: async (categoryId?: string): Promise<{ data: FAQItem[] }> => {
		const qs = categoryId !== undefined ? `?categoryId=${categoryId}` : "";

		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: FAQItem[] }>(
				apiPath("/api/faq", "/faqs") + qs,
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/faq", "/faqs") + qs,
		);
		return {
			data: (raw.data ?? []).map(normalizeFaq),
		};
	},
};
