import Link from "next/link";
import type { Specialty } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface SpecialtyCardProps {
  specialty: Specialty;
  className?: string;
}

export function SpecialtyCard({ specialty, className }: SpecialtyCardProps) {
  const href = `/find-a-provider?category=${specialty.category}&speciality=${specialty.slug}`;

  return (
    <Link href={href} className={cn("specialty-card", className)}>
      {specialty.image_url && (
        <div className="specialty-card-image-wrap">
          <FallbackImage
            src={resolveImageUrl(specialty.image_url)}
            alt={specialty.name}
            width={300}
            height={200}
            className="specialty-card-image"
            fallbackType="specialty"
            fallbackText={specialty.name}
          />
        </div>
      )}
      <span className="specialty-card-title">{specialty.name}</span>
    </Link>
  );
}
