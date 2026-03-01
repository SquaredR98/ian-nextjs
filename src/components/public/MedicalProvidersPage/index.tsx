import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { CategoryCTA } from "@/components/shared/CategoryCTA";
import { Accordion } from "@/components/shared/Accordion";
import type { Specialty, SpecialtyGroup, FAQItem } from "@/lib/types";

export function MedicalProvidersContent({
  groups,
  faqs,
}: {
  groups: SpecialtyGroup[];
  faqs: FAQItem[];
}) {
  return (
    <section className="med-page">
      <div className="med-hero">
        <div className="med-hero-inner">
          <h1 className="med-hero-title">Medical Providers</h1>
          <p className="med-hero-subtitle">
            Find trusted medical professionals specializing in personal injury
            treatment — from chiropractors to orthopedic surgeons.
          </p>
        </div>
      </div>

      <div className="med-page-inner">
        {groups.map((group) => (
          <SpecialtyGroupSection key={group.name} group={group} />
        ))}
      </div>

      <CategoryCTA
        title="Find the Right Medical Care"
        description="Connect with trusted medical specialists for your injury recovery. Browse verified providers, compare profiles, and book appointments — all in one place."
        primaryHref="/find-a-provider?categoryId=1"
        primaryLabel="Find a Provider"
        secondaryHref="/contact-us"
        secondaryLabel="Contact Us"
      />

      {faqs.length > 0 && (
        <div className="med-faq">
          <div className="med-faq-inner">
            <span className="med-faq-label">Common Questions</span>
            <h2 className="med-faq-title">
              Frequently Asked Questions About Medical Providers
            </h2>
            <Accordion items={faqs} className="med-faq-accordion" />
          </div>
        </div>
      )}
    </section>
  );
}

function SpecialtyGroupSection({ group }: { group: SpecialtyGroup }) {
  return (
    <div className="med-group">
      <div className="med-group-header">
        <h2 className="med-group-title">{group.name}</h2>
        <span className="med-group-count">
          {group.specialties.length}{" "}
          {group.specialties.length === 1 ? "specialty" : "specialties"}
        </span>
      </div>
      <div className="med-grid">
        {group.specialties.map((spec) => (
          <SpecialtyCard key={spec.id} specialty={spec} />
        ))}
      </div>
    </div>
  );
}

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const href = `/find-a-provider?categoryId=1&specialityId=${specialty.id}`;

  return (
    <Link href={href} className="med-card">
      <div className="med-card-img-wrap">
        <FallbackImage
          src={resolveImageUrl(specialty.image_url ?? "")}
          alt={specialty.name}
          width={400}
          height={260}
          className="med-card-img"
          fallbackType="specialty"
          fallbackText={specialty.name}
        />
        <div className="med-card-overlay" />
      </div>
      <div className="med-card-body">
        <h3 className="med-card-name">{specialty.name}</h3>
        {specialty.description && (
          <p className="med-card-desc">{specialty.description}</p>
        )}
        <span className="med-card-cta">Find Providers &rarr;</span>
      </div>
    </Link>
  );
}
