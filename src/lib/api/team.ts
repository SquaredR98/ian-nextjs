import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import { resolveImageUrl } from "@/lib/utils/image-url";
import type { TeamMember } from "@/lib/types";

export const teamApi = {
	getAll: async (): Promise<{ data: TeamMember[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: TeamMember[] }>(
				apiPath("/api/team", "/team-members"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<any>(
			apiPath("/api/team", "/team-members"),
		);
		const items = raw.data ?? raw;
		// Backend returns array of { id, name, title, photo, description, bio_sections }
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const members: TeamMember[] = (Array.isArray(items) ? items : []).map((m: any) => ({
			name: m.name || "",
			title: m.title || "",
			photo: resolveImageUrl(m.photo),
			description: m.description || "",
			bio_sections: m.bio_sections || [],
		}));
		return { data: members };
	},
};
