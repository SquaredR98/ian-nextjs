import Link from "next/link";
import type { Specialty } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { cn } from "@/lib/utils/cn";
import "./styles.css";

interface PopularSpecialtiesProps {
  specialties: Specialty[];
  className?: string;
}

export function PopularSpecialties({
  specialties,
  className,
}: PopularSpecialtiesProps) {
  return (
    <section className={cn("popular-specialties", className)}>
      <div className="popular-specialties-title">
        <span className="popular-specialties-label">Popular</span>
        <span className="popular-specialties-heading">Specialties</span>
      </div>
      <div className="popular-specialties-row">
        {specialties.map((spec) => (
          <SpecialtyItem key={spec.id} specialty={spec} />
        ))}
      </div>
    </section>
  );
}

const CATEGORY_ID_MAP: Record<string, string> = {
  medical: "1",
  legal: "2",
  service: "3",
};

function SpecialtyItem({ specialty }: { specialty: Specialty }) {
  const iconUrl = specialty.featured_icon_url || specialty.image_url;
  const catId = CATEGORY_ID_MAP[specialty.category] ?? "1";

  return (
    <Link
      href={`/find-a-provider?categoryId=${catId}&specialityId=${specialty.id}`}
      className="popular-specialty-item"
    >
      {iconUrl && (
        <FallbackImage
          src={resolveImageUrl(iconUrl)}
          alt={specialty.name}
          width={64}
          height={64}
          className="popular-specialty-icon"
          fallbackType="specialty"
          fallbackText={specialty.name}
        />
      )}
      <span className="popular-specialty-name">{specialty.name}</span>
    </Link>
  );
}

// Keep the old export name as alias for backward compatibility
export { PopularSpecialties as SpecialtyGrid };
