import Link from "next/link";
import type { Provider } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { RatingStars } from "@/components/shared/RatingStars";
import { Badge } from "@/components/shared/Badge";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface ProviderCardProps {
  provider: Provider;
  className?: string;
}

export function ProviderCard({ provider, className }: ProviderCardProps) {
  return (
    <Link
      href={`/business/${provider.slug}`}
      className={cn("provider-card", className)}
    >
      <ProviderLogo
        src={resolveImageUrl(provider.logo_url)}
        alt={provider.business_name}
      />
      <ProviderInfo provider={provider} />
    </Link>
  );
}

function ProviderLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="provider-card-logo-wrap">
      <FallbackImage
        src={src}
        alt={alt}
        width={80}
        height={80}
        className="provider-card-logo"
        fallbackType="provider"
        fallbackText={alt}
      />
    </div>
  );
}

function ProviderInfo({ provider }: { provider: Provider }) {
  return (
    <div className="provider-card-info">
      <h3 className="provider-card-name">{provider.business_name}</h3>
      <p className="provider-card-location">
        {provider.city}, {provider.state}
      </p>
      <Badge variant={provider.category}>{provider.specialty}</Badge>
      <div className="provider-card-rating">
        <RatingStars rating={provider.rating} count={provider.review_count} />
      </div>
      {provider.is_verified && (
        <span className="provider-card-verified">IAN Verified</span>
      )}
    </div>
  );
}
