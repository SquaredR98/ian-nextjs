"use client";

import { useState, useEffect, useCallback } from "react";
import { DEFAULT_LOCATION } from "@/lib/utils/constants";

interface GeolocationState {
  city: string;
  latitude: number | null;
  longitude: number | null;
  loading: boolean;
  error: string | null;
}

const hasGeolocation = typeof navigator !== "undefined" && !!navigator.geolocation;

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    city: DEFAULT_LOCATION,
    latitude: null,
    longitude: null,
    loading: hasGeolocation,
    error: hasGeolocation ? null : "Geolocation not available",
  });

  const reverseGeocode = useCallback(
    async (lat: number, lng: number) => {
      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
      if (!key) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
        );
        const data = await res.json();

        if (data.results?.[0]) {
          const components = data.results[0].address_components;
          const cityComp = components.find(
            (c: { types: string[] }) =>
              c.types.includes("locality") ||
              c.types.includes("sublocality")
          );
          const city = cityComp?.long_name || DEFAULT_LOCATION;

          setState({
            city,
            latitude: lat,
            longitude: lng,
            loading: false,
            error: null,
          });
        }
      } catch {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Failed to reverse geocode",
        }));
      }
    },
    []
  );

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        reverseGeocode(latitude, longitude);
      },
      () => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: "Geolocation denied",
        }));
      }
    );
  }, [reverseGeocode]);

  return state;
}
