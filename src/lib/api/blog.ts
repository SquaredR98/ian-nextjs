import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";
import type { BlogPost, BlogCategory } from "@/lib/types";
import type { PaginatedResponse } from "@/lib/types";
import { normalizeBlogPost, normalizeBlogCategory } from "./normalizers";

// Cache category map so we only fetch once per session
let categoryMapCache: Map<number, string> | null = null;

async function getCategoryMap(): Promise<Map<number, string>> {
	if (categoryMapCache) return categoryMapCache;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const res = await apiClient.get<{ data: any[] }>(apiPath("/api/blog/categories", "/blog-categories"));
	const cats = res.data ?? [];
	categoryMapCache = new Map(cats.map((c) => [c.id, c.name]));
	return categoryMapCache;
}

export interface BlogCommentPayload {
	blogId: number;
	name: string;
	email: string;
	message: string;
}

export const blogApi = {
	getPosts: async (params?: { page?: number; category?: string; perPage?: number }): Promise<PaginatedResponse<BlogPost>> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<PaginatedResponse<BlogPost>>(
				apiPath("/api/blog", "/blogs"),
				{ params: params as Record<string, string | number | undefined> },
			);
		}

		// Live mode: fetch raw data and normalize
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<PaginatedResponse<any>>(
			apiPath("/api/blog", "/blogs"),
			{ params: params as Record<string, string | number | undefined> },
		);
		const catMap = await getCategoryMap();
		return {
			...raw,
			data: (raw.data ?? []).map((post: Record<string, unknown>) => normalizeBlogPost(post as never, catMap)),
		};
	},

	getBySlug: async (slug: string): Promise<BlogPost> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<BlogPost>(apiPath(`/api/blog/${slug}`, `/blog/${slug}`));
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<any>(apiPath(`/api/blog/${slug}`, `/blog/${slug}`));
		const catMap = await getCategoryMap();
		// Client returns the full envelope { status, message, data } for non-paginated responses
		const post = raw.data ?? raw;
		return normalizeBlogPost(post, catMap);
	},

	postComment: async (data: BlogCommentPayload): Promise<void> => {
		await apiClient.post(
			apiPath("/api/blog/comment", "/blog-comment"),
			data,
		);
	},

	getCategories: async (): Promise<{ data: BlogCategory[] }> => {
		if (apiConfig.mode === "mock") {
			return apiClient.get<{ data: BlogCategory[] }>(
				apiPath("/api/blog/categories", "/blog-categories"),
			);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const raw = await apiClient.get<{ data: any[] }>(
			apiPath("/api/blog/categories", "/blog-categories"),
		);
		return {
			data: (raw.data ?? []).map(normalizeBlogCategory),
		};
	},
};
