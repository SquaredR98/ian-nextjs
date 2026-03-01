"use client";

import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import type { Provider } from "@/lib/types";
import { SearchBar } from "@/components/shared/SearchBar";
import { FindProviderCard } from "@/components/public/FindProviderCard";
import { ProviderMap } from "@/components/public/ProviderMap";
import { Pagination } from "@/components/shared/Pagination";
import { Spinner } from "@/components/shared/Spinner";
import { providersApi } from "@/lib/api";

export function FindAProviderContent() {
	const searchParams = useSearchParams();
	const categoryId = searchParams.get("categoryId") ?? "";
	const specialityId = searchParams.get("specialityId") ?? "";
	const location = searchParams.get("location") ?? "";
	const latitude = searchParams.get("latitude");
	const longitude = searchParams.get("longitude");
	const [page, setPage] = useState(1);
	const [focusedProviderId, setFocusedProviderId] = useState<number | null>(null);

	const cacheKey = `providers-search:${categoryId}:${specialityId}:${location}:${latitude}:${longitude}:${page}`;

	const { data, isLoading, error } = useSWR(cacheKey, () =>
		providersApi.search({
			categoryId: categoryId || undefined,
			specialityId: specialityId || undefined,
			city: location || undefined,
			latitude: latitude ? Number(latitude) : undefined,
			longitude: longitude ? Number(longitude) : undefined,
			page,
		}),
	);

	const handleLocate = useCallback((provider: Provider) => {
		setFocusedProviderId(provider.id);
	}, []);

	const providers = data?.data ?? [];

	return (
		<>
			{/* ── Banner with search bar ── */}
			<section className="fp-banner">
				<div className="fp-banner-inner">
					<h2 className="fp-banner-title">
						Connect With Your Personal Injury Concierge
					</h2>
					<p className="fp-banner-subtitle">MEET I.A.N.</p>
					<div className="fp-banner-search">
						<SearchBar
							defaultCategoryId={categoryId}
							defaultSpecialityId={specialityId}
							defaultLocation={location}
						/>
					</div>
				</div>
			</section>

			{/* ── Results section ── */}
			<section className="fp-results-section">
				<div className="fp-results-container">
					<h2 className="fp-results-heading">Find a Provider</h2>

					{isLoading ? (
						<div className="fp-loading">
							<Spinner size="lg" />
						</div>
					) : error ? (
						<p className="fp-error">
							Something went wrong. Please try again.
						</p>
					) : providers.length === 0 ? (
						<EmptyState />
					) : (
						<>
							<div className="fp-layout">
								<div className="fp-list">
									{providers.map((provider) => (
										<FindProviderCard
											key={provider.id}
											provider={provider}
											onLocate={handleLocate}
										/>
									))}

									{data!.total_pages > 1 && (
										<div className="fp-pagination">
											<Pagination
												currentPage={page}
												totalPages={data!.total_pages}
												onPageChange={setPage}
											/>
										</div>
									)}
								</div>
								<div className="fp-map-wrap">
									<ProviderMap
										providers={providers}
										focusedProviderId={focusedProviderId}
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
}

function EmptyState() {
	return (
		<div className="fp-empty">
			<h2 className="fp-empty-title">No providers found</h2>
			<p className="fp-empty-text">
				Try adjusting your search filters or broadening your location to
				see more results.
			</p>
		</div>
	);
}
