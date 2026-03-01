import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { CategoryCTA } from "@/components/shared/CategoryCTA";
import { Accordion } from "@/components/shared/Accordion";
import type { Specialty, SpecialtyGroup, FAQItem } from "@/lib/types";

export function ServiceProvidersContent({
  groups,
  faqs,
}: {
  groups: SpecialtyGroup[];
  faqs: FAQItem[];
}) {
  return (
    <section className="svc-page">
      <div className="svc-hero">
        <div className="svc-hero-inner">
          <h1 className="svc-hero-title">Service Providers</h1>
          <p className="svc-hero-subtitle">
            Explore service providers offering financial and practical support
            after an injury.
          </p>
        </div>
      </div>

      <div className="svc-page-inner">
        {groups.map((group) => (
          <SpecialtyGroupSection key={group.name} group={group} />
        ))}
      </div>

      <CategoryCTA
        title="Get the Support You Need"
        description="Explore financial, transportation, and recovery services designed for injury victims. Find the right support to help you through every step of your recovery."
        primaryHref="/find-a-provider?categoryId=3"
        primaryLabel="Find a Provider"
        secondaryHref="/contact-us"
        secondaryLabel="Contact Us"
      />

      {faqs.length > 0 && (
        <div className="svc-faq">
          <div className="svc-faq-inner">
            <span className="svc-faq-label">Common Questions</span>
            <h2 className="svc-faq-title">
              Frequently Asked Questions About Service Providers
            </h2>
            <Accordion items={faqs} className="svc-faq-accordion" />
          </div>
        </div>
      )}
    </section>
  );
}

function SpecialtyGroupSection({ group }: { group: SpecialtyGroup }) {
  return (
    <div className="svc-group">
      <div className="svc-group-header">
        <h2 className="svc-group-title">{group.name}</h2>
        <span className="svc-group-count">
          {group.specialties.length}{" "}
          {group.specialties.length === 1 ? "specialty" : "specialties"}
        </span>
      </div>
      <div className="svc-grid">
        {group.specialties.map((spec) => (
          <SpecialtyCard key={spec.id} specialty={spec} />
        ))}
      </div>
    </div>
  );
}

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const href = `/find-a-provider?categoryId=3&specialityId=${specialty.id}`;

  return (
    <Link href={href} className="svc-card">
      <div className="svc-card-img-wrap">
        <FallbackImage
          src={resolveImageUrl(specialty.image_url ?? "")}
          alt={specialty.name}
          width={400}
          height={260}
          className="svc-card-img"
          fallbackType="specialty"
          fallbackText={specialty.name}
        />
        <div className="svc-card-overlay" />
      </div>
      <div className="svc-card-body">
        <h3 className="svc-card-name">{specialty.name}</h3>
        {specialty.description && (
          <p className="svc-card-desc">{specialty.description}</p>
        )}
        <span className="svc-card-cta">Find Providers &rarr;</span>
      </div>
    </Link>
  );
}
