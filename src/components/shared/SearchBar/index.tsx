"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import {
  Search,
  MapPin,
  Stethoscope,
  Scale,
  Wrench,
  Crosshair,
  Loader2,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { specialtiesApi } from "@/lib/api";
import { LocationAutocomplete } from "@/components/shared/LocationAutocomplete";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import type { Specialty } from "@/lib/types";
import "./styles.css";

interface SearchBarProps {
  defaultCategoryId?: string;
  defaultSpecialityId?: string;
  defaultLocation?: string;
  className?: string;
}

interface CategoryTab {
  label: string;
  id: string;
  icon: LucideIcon;
}

const CATEGORY_TABS: CategoryTab[] = [
  { label: "Medical Providers", id: "1", icon: Stethoscope },
  { label: "Law Firms/Attorneys", id: "2", icon: Scale },
  { label: "Service Providers", id: "3", icon: Wrench },
];

const ROTATING_SPECIALTIES = [
  "Chiropractor",
  "Injury Attorney",
  "Orthopedic Surgeon",
  "Physical Therapist",
  "Neurologist",
];

function useRotatingPlaceholder(items: string[], interval = 3000) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  return { text: items[index], visible };
}

export function SearchBar({
  defaultCategoryId = "1",
  defaultSpecialityId = "",
  defaultLocation = "",
  className,
}: SearchBarProps) {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(defaultCategoryId || "1");
  const [specialityId, setSpecialityId] = useState(defaultSpecialityId);
  const [location, setLocation] = useState(defaultLocation);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  function handleCategoryChange(id: string) {
    setCategoryId(id);
    setSpecialityId("");
  }

  const handleLocationChange = useCallback((val: string) => {
    setLocation(val);
    // Clear coords when user manually types (not from autocomplete/geolocation)
    setCoords(null);
  }, []);

  const handlePlaceSelect = useCallback((lat: number, lng: number, formatted: string) => {
    setLocation(formatted);
    setCoords({ lat, lng });
  }, []);

  const handleGeoCoords = useCallback((lat: number, lng: number) => {
    setCoords({ lat, lng });
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSearching(true);
    const params = new URLSearchParams();
    if (categoryId) params.set("categoryId", categoryId);
    if (specialityId) params.set("specialityId", specialityId);
    if (location) params.set("location", location);
    if (coords) {
      params.set("latitude", coords.lat.toFixed(6));
      params.set("longitude", coords.lng.toFixed(6));
    }
    router.push(`/find-a-provider?${params.toString()}`);
  }

  return (
    <div className={cn("search-bar-wrapper", className)}>
      {/* Desktop: pill tabs | Mobile: dropdown */}
      <CategoryTabs active={categoryId} onSelect={handleCategoryChange} />
      <CategoryDropdown active={categoryId} onSelect={handleCategoryChange} />
      <SearchFields
        categoryId={categoryId}
        specialityId={specialityId}
        location={location}
        isSearching={isSearching}
        onSpecialityChange={setSpecialityId}
        onLocationChange={handleLocationChange}
        onPlaceSelect={handlePlaceSelect}
        onGeoCoords={handleGeoCoords}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

/* ─── Desktop pill tabs (hidden on mobile) ─── */
function CategoryTabs({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (val: string) => void;
}) {
  return (
    <div className="search-tabs-desktop">
      {CATEGORY_TABS.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            type="button"
            className={cn(
              "search-tab",
              active === tab.id && "search-tab-active",
            )}
            onClick={() => onSelect(tab.id)}
          >
            <Icon className="search-tab-icon" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ─── Mobile dropdown (hidden on desktop) ─── */
function CategoryDropdown({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const activeTab = CATEGORY_TABS.find((t) => t.id === active) ?? CATEGORY_TABS[0];
  const ActiveIcon = activeTab.icon;

  return (
    <div className="search-tabs-mobile">
      <button
        type="button"
        className="search-mobile-trigger"
        onClick={() => setOpen((prev) => !prev)}
      >
        <ActiveIcon className="w-4 h-4" />
        <span>{activeTab.label}</span>
        <ChevronDown className={cn("w-4 h-4 ml-auto transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="search-mobile-menu">
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                className={cn(
                  "search-mobile-option",
                  active === tab.id && "search-mobile-option-active",
                )}
                onClick={() => {
                  onSelect(tab.id);
                  setOpen(false);
                }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SpecialtyCombobox({
  categoryId,
  value,
  onChange,
  onKeySubmit,
}: {
  categoryId: string;
  value: string;
  onChange: (val: string) => void;
  onKeySubmit: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading } = useSWR(`specialities:${categoryId}`, () =>
    specialtiesApi.getAll(categoryId),
  );
  const specialities: Specialty[] = data?.data ?? [];
  const placeholder = useRotatingPlaceholder(ROTATING_SPECIALTIES);

  const selectedName =
    specialities.find((s) => String(s.id) === value)?.name ?? "";

  const filtered = query
    ? specialities.filter((s) =>
        s.name.toLowerCase().includes(query.toLowerCase()),
      )
    : specialities;

  function handleSelect(id: string) {
    onChange(id === value ? "" : id);
    setQuery("");
    setOpen(false);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    if (!open) setOpen(true);
  }

  function handleFocus() {
    setOpen(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !open) {
      e.preventDefault();
      onKeySubmit();
    }
  }

  const displayValue = open ? query : value ? selectedName : "";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <div className="search-field-group">
          <Search className="search-field-icon" />
          <div className="search-field-input-wrap">
            <input
              ref={inputRef}
              type="text"
              className="search-field-input"
              placeholder=""
              value={displayValue}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            {!displayValue && (
              <span
                className={cn(
                  "search-placeholder",
                  placeholder.visible
                    ? "search-placeholder-visible"
                    : "search-placeholder-hidden",
                )}
              >
                {placeholder.text}
              </span>
            )}
          </div>
          {specialities.length > 0 && (
            <span className="search-specialty-count" title={`${specialities.length} specialties available`}>
              {specialities.length}
            </span>
          )}
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="specialty-dropdown"
        align="start"
        sideOffset={4}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command>
          <CommandList>
            {isLoading ? (
              <div className="specialty-dropdown-loading">
                <Loader2 className="animate-spin h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Loading...</span>
              </div>
            ) : (
              <>
                <CommandEmpty>No specialty found.</CommandEmpty>
                <CommandGroup heading="Popular specialties">
                  {filtered.map((s) => (
                    <CommandItem
                      key={s.id}
                      value={s.name}
                      onSelect={() => handleSelect(String(s.id))}
                      className="specialty-dropdown-item"
                    >
                      {s.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function LocationField({
  value,
  onChange,
  onPlaceSelect,
  onGeoCoords,
}: {
  value: string;
  onChange: (val: string) => void;
  onPlaceSelect: (lat: number, lng: number, formatted: string) => void;
  onGeoCoords: (lat: number, lng: number) => void;
}) {
  const [detecting, setDetecting] = useState(false);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setDetecting(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onGeoCoords(latitude, longitude);
        if (window.google?.maps) {
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              setDetecting(false);
              if (status === "OK" && results?.[0]) {
                const cityComponent = results[0].address_components.find((c) =>
                  c.types.includes("locality"),
                );
                const stateComponent = results[0].address_components.find(
                  (c) => c.types.includes("administrative_area_level_1"),
                );
                const city = cityComponent?.long_name ?? "";
                const state = stateComponent?.short_name ?? "";
                onChange(city && state ? `${city}, ${state}` : city || results[0].formatted_address || "");
              }
            },
          );
        } else {
          setDetecting(false);
          onChange(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
        }
      },
      () => {
        setDetecting(false);
      },
      { timeout: 10000 },
    );
  }, [onChange, onGeoCoords]);

  return (
    <div className="search-field-group">
      <MapPin className="search-field-icon" />
      <LocationAutocomplete
        value={value}
        onChange={onChange}
        onPlaceSelect={onPlaceSelect}
        placeholder="City, State or Zip"
        className="search-field-input"
      />
      <button
        type="button"
        className="search-locate-btn"
        onClick={handleDetectLocation}
        title="Use my location"
        disabled={detecting}
      >
        {detecting ? (
          <Loader2 className="animate-spin h-4 w-4" />
        ) : (
          <Crosshair className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}

function SearchFields({
  categoryId,
  specialityId,
  location,
  isSearching,
  onSpecialityChange,
  onLocationChange,
  onPlaceSelect,
  onGeoCoords,
  onSubmit,
}: {
  categoryId: string;
  specialityId: string;
  location: string;
  isSearching: boolean;
  onSpecialityChange: (val: string) => void;
  onLocationChange: (val: string) => void;
  onPlaceSelect: (lat: number, lng: number, formatted: string) => void;
  onGeoCoords: (lat: number, lng: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleKeySubmit() {
    formRef.current?.requestSubmit();
  }

  return (
    <form ref={formRef} className="search-fields" onSubmit={onSubmit}>
      <SpecialtyCombobox
        categoryId={categoryId}
        value={specialityId}
        onChange={onSpecialityChange}
        onKeySubmit={handleKeySubmit}
      />
      <div className="search-field-divider" />
      <LocationField
        value={location}
        onChange={onLocationChange}
        onPlaceSelect={onPlaceSelect}
        onGeoCoords={onGeoCoords}
      />
      <button
        type="submit"
        className="search-submit-btn shimmer"
        disabled={isSearching}
      >
        {isSearching ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          <>
            <Search className="search-submit-icon" />
            <span>Search</span>
          </>
        )}
      </button>
    </form>
  );
}
