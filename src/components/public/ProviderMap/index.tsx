"use client";

import { useMemo, useState, useCallback, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Link from "next/link";
import type { Provider } from "@/lib/types";

const MAP_CONTAINER_STYLE: React.CSSProperties = {
	width: "100%",
	height: "100%",
	minHeight: "500px",
};

const DEFAULT_CENTER = { lat: 28.5383, lng: -81.3792 }; // Orlando, FL

interface ProviderMapProps {
	providers: Provider[];
	focusedProviderId: number | null;
}

export function ProviderMap({ providers, focusedProviderId }: ProviderMapProps) {
	const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
	const [map, setMap] = useState<google.maps.Map | null>(null);

	const mappableProviders = useMemo(
		() => providers.filter((p) => p.latitude && p.longitude),
		[providers],
	);

	const center = useMemo(() => {
		if (mappableProviders.length === 0) return DEFAULT_CENTER;
		const avgLat = mappableProviders.reduce((sum, p) => sum + p.latitude!, 0) / mappableProviders.length;
		const avgLng = mappableProviders.reduce((sum, p) => sum + p.longitude!, 0) / mappableProviders.length;
		return { lat: avgLat, lng: avgLng };
	}, [mappableProviders]);

	// Fit bounds when providers change
	useEffect(() => {
		if (!map || mappableProviders.length === 0) return;
		const bounds = new google.maps.LatLngBounds();
		for (const p of mappableProviders) {
			bounds.extend({ lat: p.latitude!, lng: p.longitude! });
		}
		map.fitBounds(bounds);
		// Don't zoom in too far for a single provider
		const listener = google.maps.event.addListenerOnce(map, "idle", () => {
			const zoom = map.getZoom();
			if (zoom && zoom > 15) map.setZoom(15);
		});
		return () => google.maps.event.removeListener(listener);
	}, [map, mappableProviders]);

	// Focus on a specific provider when "Locate us on Google" is clicked.
	// The setState here is intentional — it syncs UI with the external Google Maps
	// pan/zoom action triggered by the parent component's focusedProviderId prop.
	useEffect(() => {
		if (!map || !focusedProviderId) return;
		const provider = mappableProviders.find((p) => p.id === focusedProviderId);
		if (provider?.latitude && provider?.longitude) {
			map.panTo({ lat: provider.latitude, lng: provider.longitude });
			map.setZoom(15);
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSelectedProvider(provider);
		}
	}, [map, focusedProviderId, mappableProviders]);

	const onLoad = useCallback((mapInstance: google.maps.Map) => {
		setMap(mapInstance);
	}, []);

	const onUnmount = useCallback(() => {
		setMap(null);
	}, []);

	const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
	if (!MAPS_KEY) {
		return (
			<div className="provider-map-placeholder">
				<p>Map unavailable — Google Maps API key not configured.</p>
			</div>
		);
	}

	if (mappableProviders.length === 0) {
		return (
			<div className="provider-map-placeholder">
				<p>No map data available for these providers.</p>
			</div>
		);
	}

	return (
		<GoogleMap
			mapContainerStyle={MAP_CONTAINER_STYLE}
			center={center}
			zoom={10}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={{
				streetViewControl: false,
				mapTypeControl: false,
				fullscreenControl: true,
			}}
		>
			{mappableProviders.map((provider) => (
				<Marker
					key={provider.id}
					position={{ lat: provider.latitude!, lng: provider.longitude! }}
					title={provider.business_name}
					onClick={() => setSelectedProvider(provider)}
				/>
			))}

			{selectedProvider && selectedProvider.latitude && selectedProvider.longitude && (
				<InfoWindow
					position={{ lat: selectedProvider.latitude, lng: selectedProvider.longitude }}
					onCloseClick={() => setSelectedProvider(null)}
				>
					<div className="map-info-window">
						<strong>{selectedProvider.business_name}</strong>
						{selectedProvider.address && (
							<p style={{ margin: "4px 0", fontSize: "12px" }}>
								{selectedProvider.address}
							</p>
						)}
						<Link
							href={`/business/${selectedProvider.slug}`}
							style={{ fontSize: "12px", color: "var(--color-ian-primary, #1a56db)" }}
						>
							View Profile
						</Link>
					</div>
				</InfoWindow>
			)}
		</GoogleMap>
	);
}
