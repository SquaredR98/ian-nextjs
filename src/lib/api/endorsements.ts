import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { Endorsement } from "@/lib/types";
import type { PaginatedResponse } from "@/lib/types";
import { normalizeEndorsement } from "./normalizers";

export const endorsementsApi = {
	getAll: async (): Promise<PaginatedResponse<Endorsement>> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<PaginatedResponse<Endorsement>>(
				apiPath("/api/endorsements", "/attorney-endorsements"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<PaginatedResponse<any>>(
			apiPath("/api/endorsements", "/attorney-endorsements"),
			{ params: { perPage: "100" } },
		);
		return {
			...raw,
			data: (raw.data ?? []).map(normalizeEndorsement),
		};
	},
};
