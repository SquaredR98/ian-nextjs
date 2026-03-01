"use client";

import { useCallback } from "react";
import { trackingApi } from "@/lib/api";

export function useClickTracking() {
  const trackClick = useCallback(
    async (clickType: string, providerId: number) => {
      const location =
        sessionStorage.getItem("locationlatlong") || "";

      try {
        await trackingApi.click({
          location,
          click_type: clickType,
          provider_id: providerId,
        });
      } catch {
        // Silently fail — tracking should not block UX
      }
    },
    []
  );

  return { trackClick };
}
