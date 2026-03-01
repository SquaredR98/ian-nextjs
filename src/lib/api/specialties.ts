import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { Specialty, SpecialtyGroup } from "@/lib/types";
import { normalizeSpeciality, normalizeFeaturedToSpecialty } from "./normalizers";

export const specialtiesApi = {
	getAll: async (categoryId?: string): Promise<{ data: Specialty[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: Specialty[] }>(
				apiPath("/api/specialties", "/specialities"),
				{ params: categoryId ? { category: categoryId } : undefined },
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/specialties", "/specialities"),
			{ params: categoryId ? { categoryId } : undefined },
		);
		return {
			data: (raw.data ?? []).map((s) => normalizeSpeciality(s)),
		};
	},

	getFeatured: async (): Promise<{ data: Specialty[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: Specialty[] }>(
				apiPath("/api/specialties", "/featured-specialities"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/specialties", "/featured-specialities"),
		);
		return {
			data: (raw.data ?? []).map(normalizeFeaturedToSpecialty),
		};
	},

	getGrouped: async (categoryId: string): Promise<{ data: SpecialtyGroup[] }> => {
		if (apiConfig.mode === "mock") {
			// Mock: fetch all specialties and group locally
			const res = await apiClient.get<{ data: Specialty[] }>(
				apiPath("/api/specialties", "/specialities"),
				{ params: { category: categoryId } },
			);
			return { data: groupLocally(res.data ?? []) };
		}

		// Live: use the speciality-groups endpoint which returns groups with nested specialties
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/specialties/groups", "/speciality-groups"),
			{ params: { categoryId } },
		);
		const groups = (raw.data ?? []).map((group) => ({
			name: group.name as string,
			specialties: ((group.specialities || []) as Array<Record<string, unknown>>).map(
				(s) => normalizeSpeciality(s as never),
			),
		}));
		return { data: groups };
	},
};

function groupLocally(specialties: Specialty[]): SpecialtyGroup[] {
	const map = new Map<string, Specialty[]>();
	for (const spec of specialties) {
		const key = spec.group ?? "Other";
		const list = map.get(key) ?? [];
		list.push(spec);
		map.set(key, list);
	}
	return Array.from(map.entries()).map(([name, items]) => ({
		name,
		specialties: items,
	}));
}
