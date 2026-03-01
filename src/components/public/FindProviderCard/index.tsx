"use client";

import Link from "next/link";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import type { Provider } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";

interface FindProviderCardProps {
	provider: Provider;
	onLocate: (provider: Provider) => void;
}

export function FindProviderCard({ provider, onLocate }: FindProviderCardProps) {
	return (
		<div className="fp-card">
			<div className="fp-card-row">
				{/* Image */}
				<div className="fp-card-img-col">
					<Link href={`/business/${provider.slug}`}>
						<FallbackImage
							src={resolveImageUrl(provider.logo_url)}
							alt={provider.business_name}
							width={160}
							height={120}
							className="fp-card-img"
							fallbackType="provider"
							fallbackText={provider.business_name}
						/>
					</Link>
				</div>

				{/* Details */}
				<div className="fp-card-details">
					<h5 className="fp-card-name">
						<Link href={`/business/${provider.slug}`}>
							{provider.business_name}
						</Link>
					</h5>

					{provider.address && (
						<p className="fp-card-location">
							<MapPin size={14} />
							<span>{provider.address}</span>
						</p>
					)}

					{provider.distance != null && (
						<span className="fp-card-distance">
							<MapPin size={12} />
							{provider.distance.toFixed(1)} miles away
						</span>
					)}

					<div className="fp-card-meta">
						{(provider.latitude != null && provider.longitude != null) && (
							<button
								type="button"
								className="fp-card-locate"
								onClick={() => onLocate(provider)}
							>
								<MapPin size={14} />
								Locate us on google
							</button>
						)}
					</div>

					{provider.phone && (
						<a href={`tel:${provider.phone}`} className="fp-card-phone">
							<Phone size={14} />
							{provider.phone}
						</a>
					)}

					{provider.website && (
						<a
							href={provider.website.startsWith("http") ? provider.website : `https://${provider.website}`}
							target="_blank"
							rel="noopener noreferrer"
							className="fp-card-visit-btn shimmer"
						>
							Visit Website <ArrowRight size={14} />
						</a>
					)}
				</div>
			</div>
		</div>
	);
}
