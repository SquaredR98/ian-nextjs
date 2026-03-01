import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./styles.css";

interface CategoryCTAProps {
  label?: string;
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CategoryCTA({
  label = "Need Help After an Injury?",
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CategoryCTAProps) {
  return (
    <section className="cat-cta">
      <div className="cat-cta-inner">
        <span className="cat-cta-label">{label}</span>
        <h2 className="cat-cta-title">{title}</h2>
        <p className="cat-cta-desc">{description}</p>
        <div className="cat-cta-actions">
          <Link href={primaryHref} className="cat-cta-btn-primary">
            {primaryLabel} <ArrowRight size={16} />
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link href={secondaryHref} className="cat-cta-btn-secondary">
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
