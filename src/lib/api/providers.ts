import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { Provider, ProviderDetail } from "@/lib/types";
import type { PaginatedResponse } from "@/lib/types";
import { normalizeProvider, normalizeFeaturedSpeciality, normalizeProviderDetail } from "./normalizers";

export const providersApi = {
	getFeatured: async (): Promise<{ data: Provider[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: Provider[] }>(
				apiPath("/api/providers/featured", "/featured-specialities"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/providers/featured", "/featured-specialities"),
		);
		return {
			data: (raw.data ?? []).map(normalizeFeaturedSpeciality),
		};
	},

	boost: (latitude: number, longitude: number) =>
		apiClient.post<{ data: Provider[]; rotate: { id: number[]; state: number[] } }>(
			apiPath("/api/providers/boost", "/boost"),
			{ latitude, longitude },
		),

	search: async (params: {
		categoryId?: string;
		specialityId?: string;
		city?: string;
		latitude?: number;
		longitude?: number;
		page?: number;
	}): Promise<PaginatedResponse<Provider>> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<PaginatedResponse<Provider>>(
				apiPath("/api/providers/search", "/find-provider"),
				{ params: params as Record<string, string | number | undefined> },
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<PaginatedResponse<any>>(
			apiPath("/api/providers/search", "/find-provider"),
			{ params: params as Record<string, string | number | undefined> },
		);
		return {
			...raw,
			data: (raw.data ?? []).map(normalizeProvider),
		};
	},

	getBySlug: async (slug: string): Promise<ProviderDetail> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<ProviderDetail>(
				apiPath(`/api/providers/${slug}`, `/business/${slug}`),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<any>(
			apiPath(`/api/providers/${slug}`, `/business/${slug}`),
		);
		const business = raw.data ?? raw;
		return normalizeProviderDetail(business);
	},

	trackClick: (data: {
		location: string;
		click_type: string;
		provider_id: number;
	}) =>
		apiClient.post<{ success: boolean }>(
			apiPath("/api/tracking/click", "/store-click"),
			data,
		),
};
