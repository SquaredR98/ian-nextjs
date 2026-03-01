import Link from "next/link";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { CategoryCTA } from "@/components/shared/CategoryCTA";
import { Accordion } from "@/components/shared/Accordion";
import type { Specialty, FAQItem } from "@/lib/types";

export function LawyersContent({
  specialties,
  faqs,
}: {
  specialties: Specialty[];
  faqs: FAQItem[];
}) {
  return (
    <section className="law-page">
      <div className="law-hero">
        <div className="law-hero-inner">
          <h1 className="law-hero-title">Law Firms &amp; Attorneys</h1>
          <p className="law-hero-subtitle">
            Connect with experienced personal injury attorneys and law firms
            ready to fight for your rights.
          </p>
        </div>
      </div>

      <div className="law-page-inner">
        <div className="law-grid">
          {specialties.map((spec) => (
            <SpecialtyCard key={spec.id} specialty={spec} />
          ))}
        </div>
      </div>

      <CategoryCTA
        title="Need Legal Representation?"
        description="Find experienced personal injury attorneys ready to fight for you. Get the justice and compensation you deserve with trusted legal professionals."
        primaryHref="/find-a-provider?categoryId=2"
        primaryLabel="Find an Attorney"
        secondaryHref="/contact-us"
        secondaryLabel="Contact Us"
      />

      {faqs.length > 0 && (
        <div className="law-faq">
          <div className="law-faq-inner">
            <span className="law-faq-label">Common Questions</span>
            <h2 className="law-faq-title">
              Frequently Asked Questions About Legal Services
            </h2>
            <Accordion items={faqs} className="law-faq-accordion" />
          </div>
        </div>
      )}
    </section>
  );
}

function SpecialtyCard({ specialty }: { specialty: Specialty }) {
  const href = `/find-a-provider?categoryId=2&specialityId=${specialty.id}`;

  return (
    <Link href={href} className="law-card">
      <div className="law-card-img-wrap">
        <FallbackImage
          src={resolveImageUrl(specialty.image_url ?? "")}
          alt={specialty.name}
          width={400}
          height={260}
          className="law-card-img"
          fallbackType="specialty"
          fallbackText={specialty.name}
        />
        <div className="law-card-overlay" />
      </div>
      <div className="law-card-body">
        <h3 className="law-card-name">{specialty.name}</h3>
        {specialty.description && (
          <p className="law-card-desc">{specialty.description}</p>
        )}
        <span className="law-card-cta">Find Attorneys &rarr;</span>
      </div>
    </Link>
  );
}
