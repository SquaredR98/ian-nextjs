import { apiClient } from "./client";
import { apiConfig, apiPath } from "./config";

export interface CmsPage {
  id: number;
  page_name: string;
  page_title: string;
  content: string;
}

export const cmsApi = {
  getBySlug: async (slug: string): Promise<CmsPage | null> => {
    if (apiConfig.mode === "mock") {
      return null; // mock mode falls back to hardcoded content
    }

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = await apiClient.get<any>(
        apiPath(`/api/cms/${slug}`, `/cms-page/${slug}`),
      );
      const page = raw.data ?? raw;
      return {
        id: page.id,
        page_name: page.pageName,
        page_title: page.pageTitle ?? page.pageName,
        content: page.pageContent ?? "",
      };
    } catch {
      return null;
    }
  },
};
