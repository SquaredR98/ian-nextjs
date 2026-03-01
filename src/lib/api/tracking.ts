import { apiClient } from "./client";
import { apiPath } from "./config";

export const trackingApi = {
	click: (data: {
		location: string;
		click_type: string;
		provider_id: number;
	}) =>
		apiClient.post<{ success: boolean }>(
			apiPath("/api/tracking/click", "/store-click"),
			data,
		),
};
