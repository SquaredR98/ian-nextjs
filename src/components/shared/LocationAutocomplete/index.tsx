"use client";

import { useRef, useEffect } from "react";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface LocationAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (lat: number, lng: number, formatted: string) => void;
  placeholder?: string;
  className?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Enter location",
  className,
}: LocationAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!window.google?.maps?.places || !inputRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"],
      componentRestrictions: { country: "us" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const formatted = place.formatted_address || place.name || "";
        onChange(formatted);
        onPlaceSelect?.(lat, lng, formatted);
      }
    });

    // Reposition Google's .pac-container to align with the .search-fields form
    const input = inputRef.current;
    const reposition = () => {
      const form = input.closest(".search-fields");
      const pac = document.querySelector(".pac-container") as HTMLElement | null;
      if (!form || !pac) return;
      const rect = form.getBoundingClientRect();
      pac.style.left = `${rect.left}px`;
      pac.style.width = `${rect.width}px`;
      pac.style.top = `${rect.bottom + 4}px`;
    };

    input.addEventListener("input", reposition);
    input.addEventListener("focus", () => setTimeout(reposition, 100));
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);

    return () => {
      input.removeEventListener("input", reposition);
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [onChange, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      type="text"
      className={cn("location-autocomplete", className)}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
