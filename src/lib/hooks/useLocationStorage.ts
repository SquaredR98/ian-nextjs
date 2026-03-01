"use client";

import { useState, useCallback } from "react";
import { DEFAULT_LOCATION } from "@/lib/utils/constants";

const STORAGE_KEY = "ian.curr_location";
const LAT_LNG_KEY = "locationlatlong";
const LOCATION_KEY = "location___";

export function useLocationStorage() {
  const [location, setLocationState] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_LOCATION;
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LOCATION;
  });

  const setLocation = useCallback((city: string) => {
    setLocationState(city);
    localStorage.setItem(STORAGE_KEY, city);
    sessionStorage.setItem(LOCATION_KEY, city);
  }, []);

  const setLatLng = useCallback((lat: number, lng: number) => {
    sessionStorage.setItem(LAT_LNG_KEY, `${lat},${lng}`);
  }, []);

  const getLatLng = useCallback((): string => {
    return sessionStorage.getItem(LAT_LNG_KEY) || "";
  }, []);

  return { location, setLocation, setLatLng, getLatLng };
}
