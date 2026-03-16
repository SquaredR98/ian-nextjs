"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import type { Provider } from "@/lib/types";
import { ProviderCard } from "@/components/shared/ProviderCard";
import {
	EmblaCarousel,
	EmblaSlide,
} from "@/components/shared/EmblaCarousel";
import { Spinner } from "@/components/shared/Spinner";
import { providersApi } from "@/lib/api";
import "./styles.css";

async function fetchFeaturedProviders(): Promise<Provider[]> {
	const json = await providersApi.getFeatured();
	return json.data ?? [];
}

export function FeaturedProviders() {
	const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
	const [geoAttempted, setGeoAttempted] = useState(false);

	// Request browser geolocation on mount
	useEffect(() => {
		if (!navigator.geolocation) {
			setGeoAttempted(true);
			return;
		}
		navigator.geolocation.getCurrentPosition(
			(pos) => {
				setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
				setGeoAttempted(true);
			},
			() => {
				// Denied or unavailable — fall back to featured specialities
				setGeoAttempted(true);
			},
			{ timeout: 8000 },
		);
	}, []);

	// Fetch boosted providers when we have coordinates
	const { data: boostedProviders, isLoading: boostLoading } = useSWR(
		coords ? `boost-${coords.lat}-${coords.lng}` : null,
		() => providersApi.boost(coords!.lat, coords!.lng).then((r) => r.data),
	);

	// Fallback: featured specialities (only fetch if no coords or boost returned empty)
	const shouldFallback = geoAttempted && (!coords || (boostedProviders && boostedProviders.length === 0));
	const { data: fallbackProviders, isLoading: fallbackLoading } = useSWR(
		shouldFallback ? "featured-providers" : null,
		fetchFeaturedProviders,
	);

	const providers = boostedProviders && boostedProviders.length > 0
		? boostedProviders
		: fallbackProviders;
	const isLoading = !geoAttempted || boostLoading || (shouldFallback && fallbackLoading);

	return (
		<section className="featured-providers">
			<h2 className="featured-providers-title">Featured Providers</h2>
			<p className="featured-providers-subtitle">
				Explore our vetted personal injury medical service providers and
				attorneys
			</p>
			{isLoading && (
				<div className="featured-providers-loading">
					<Spinner />
				</div>
			)}
			{providers && providers.length > 0 && (
				<EmblaCarousel autoplay loop>
					{providers.map((provider) => (
						<EmblaSlide key={provider.id}>
							<ProviderCard provider={provider} />
						</EmblaSlide>
					))}
				</EmblaCarousel>
			)}
		</section>
	);
}
