import { apiConfig } from "./config";

interface FetchOptions extends Omit<RequestInit, "body"> {
	params?: Record<string, string | number | undefined>;
}

async function request<T>(
	path: string,
	method: string,
	body?: unknown,
	options: FetchOptions = {},
): Promise<T> {
	const { params, ...fetchOptions } = options;

	let url = `${apiConfig.baseUrl}${path}`;
	if (params) {
		const searchParams = new URLSearchParams();
		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined) searchParams.set(key, String(value));
		});
		const qs = searchParams.toString();
		if (qs) url += `?${qs}`;
	}

	const response = await fetch(url, {
		...fetchOptions,
		method,
		headers: {
			"Content-Type": "application/json",
			...fetchOptions.headers,
		},
		...(body ? { body: JSON.stringify(body) } : {}),
	});

	if (!response.ok) {
		const errorBody = await response.json().catch(() => null);
		throw new Error(
			errorBody?.message ||
				`API Error: ${response.status} ${response.statusText}`,
		);
	}

	const json = await response.json();

	// In mock mode, Next.js API routes return data directly
	// In live mode, the backend wraps in { status, message, data, pagination? }
	if (apiConfig.mode === "live" && json && typeof json.status === "number") {
		if (json.pagination) {
			return {
				data: json.data,
				total: json.pagination.total,
				page: json.pagination.page,
				per_page: json.pagination.perPage,
				total_pages: json.pagination.totalPages,
			} as T;
		}
		return json as T;
	}

	return json as T;
}

export const apiClient = {
	get: <T>(path: string, options?: FetchOptions) =>
		request<T>(path, "GET", undefined, options),

	post: <T>(path: string, body: unknown, options?: FetchOptions) =>
		request<T>(path, "POST", body, options),

	put: <T>(path: string, body: unknown, options?: FetchOptions) =>
		request<T>(path, "PUT", body, options),

	delete: <T>(path: string, options?: FetchOptions) =>
		request<T>(path, "DELETE", undefined, options),
};
