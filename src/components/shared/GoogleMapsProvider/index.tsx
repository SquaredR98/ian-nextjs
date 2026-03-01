"use client";

import { LoadScript } from "@react-google-maps/api";

const GOOGLE_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const LIBRARIES: ("places")[] = ["places"];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  if (!GOOGLE_MAPS_KEY) {
    return <>{children}</>;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_KEY} libraries={LIBRARIES}>
      {children}
    </LoadScript>
  );
}
