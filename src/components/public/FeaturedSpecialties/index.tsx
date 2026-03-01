import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { mockFeaturedSpecialties } from "@/lib/mock-data";
import "./styles.css";

export function FeaturedSpecialties() {
  return (
    <section className="featured-specialties">
      <h2 className="featured-specialties-title">Featured Specialties</h2>
      <div className="featured-specialties-grid">
        {mockFeaturedSpecialties.map((spec) => (
          <div key={spec.name} className="featured-specialty-card">
            <div className="featured-specialty-image-wrap">
              <FallbackImage
                src={resolveImageUrl(spec.image_url)}
                alt={spec.name}
                width={400}
                height={260}
                className="featured-specialty-image"
                fallbackType="specialty"
                fallbackText={spec.name}
              />
            </div>
            <span className="featured-specialty-name">{spec.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
