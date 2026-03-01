"use client";

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
	const { data: providers, isLoading } = useSWR(
		"featured-providers",
		fetchFeaturedProviders,
	);

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
