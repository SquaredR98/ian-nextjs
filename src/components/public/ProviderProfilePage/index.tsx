import Link from "next/link";
import { Globe, Phone } from "lucide-react";
import type { ProviderDetail } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { Badge } from "@/components/shared/Badge";
import { SocialLinks } from "./SocialLinks";

/* ------------------------------------------------------------------ */
/*  Hero section: logo + badges + name + contact grid + social         */
/* ------------------------------------------------------------------ */

export function ProviderHero({ provider }: { provider: ProviderDetail & { id: number } }) {
  return (
    <section className="provider-hero">
      <div className="provider-hero-inner">
        {/* Logo */}
        <div className="provider-hero-logo-wrap">
          <FallbackImage
            src={resolveImageUrl(provider.logo_url)}
            alt={provider.business_name}
            width={96}
            height={96}
            className="provider-hero-logo"
            fallbackType="provider"
            fallbackText={provider.business_name}
          />
        </div>

        {/* Info */}
        <div className="provider-hero-info">
          {provider.specialties.length > 0 && (
            <div className="provider-hero-badges">
              {provider.specialties.map((spec) => (
                <Link
                  key={spec.id}
                  href={`/find-a-provider?categoryId=${spec.category_id}&specialityId=${spec.id}`}
                >
                  <Badge variant={provider.category}>{spec.name}</Badge>
                </Link>
              ))}
            </div>
          )}

          <h1 className="provider-hero-name">{provider.business_name}</h1>

          <p className="provider-hero-address">
            {[provider.address, provider.city, provider.state, provider.zipcode]
              .filter(Boolean)
              .join(", ")}
          </p>

          <div className="provider-hero-actions">
            {provider.website && (
              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="provider-hero-btn"
              >
                <Globe size={14} /> Website
              </a>
            )}
            {provider.phone && (
              <a href={`tel:${provider.phone}`} className="provider-hero-btn">
                <Phone size={14} /> {provider.phone}
              </a>
            )}
          </div>

          <div className="provider-hero-footer">
            {provider.is_verified && (
              <div className="provider-hero-verified">
                <FallbackImage
                  src="/images/ianvarified.png"
                  alt="IAN Verified"
                  width={120}
                  height={40}
                  className="provider-hero-verified-img"
                  fallbackType="generic"
                />
                <span>I.A.N. Verified</span>
              </div>
            )}
            <SocialLinks social={provider.social_media} providerId={provider.id} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Languages & Services                                               */
/* ------------------------------------------------------------------ */

export function ProviderLists({
  languages,
  specialties,
}: {
  languages: string[];
  specialties: { id: number; name: string; category_id: number }[];
}) {
  return (
    <section className="provider-lists">
      {languages.length > 0 && (
        <div className="provider-list-col">
          <h4 className="provider-list-title">Languages</h4>
          <p className="provider-list-items">{languages.join(", ")}</p>
        </div>
      )}
      {specialties.length > 0 && (
        <div className="provider-list-col">
          <h4 className="provider-list-title">Services Provided</h4>
          <p className="provider-list-items">
            {specialties.map((spec) => spec.name).join(", ")}
          </p>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky bottom bar                                                  */
/* ------------------------------------------------------------------ */

export function ProviderStickyBar({ provider }: { provider: ProviderDetail }) {
  return (
    <div className="provider-sticky-bar">
      <div className="provider-sticky-inner">
        <div className="provider-sticky-logo-wrap">
          <FallbackImage
            src={resolveImageUrl(provider.logo_url)}
            alt={provider.business_name}
            width={60}
            height={60}
            className="provider-sticky-logo"
            fallbackType="provider"
            fallbackText={provider.business_name}
          />
        </div>
        <div className="provider-sticky-info">
          <h4 className="provider-sticky-name">{provider.business_name}</h4>
          <p className="provider-sticky-location">
            {provider.city} {provider.zipcode ? `- ${provider.zipcode}` : ""}
          </p>
        </div>
        <div className="provider-sticky-actions">
          {provider.website && (
            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="provider-sticky-btn"
            >
              <Globe size={14} /> website
            </a>
          )}
          {provider.phone && (
            <a href={`tel:${provider.phone}`} className="provider-sticky-btn">
              <Phone size={14} /> {provider.phone}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
