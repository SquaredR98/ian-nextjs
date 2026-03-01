import type { Testimonial } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { RatingStars } from "@/components/shared/RatingStars";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({
  testimonial,
  className,
}: TestimonialCardProps) {
  return (
    <div className={cn("testimonial-card", className)}>
      <div className="testimonial-card-header">
        <FallbackImage
          src={resolveImageUrl(testimonial.photo_url)}
          alt={testimonial.author_name}
          width={64}
          height={64}
          className="testimonial-card-photo"
          fallbackType="avatar"
          fallbackText={testimonial.author_name}
        />
        <div className="testimonial-card-meta">
          <h4 className="testimonial-card-name">
            {testimonial.author_name}
          </h4>
          <RatingStars rating={testimonial.rating} />
        </div>
      </div>
      <blockquote className="testimonial-card-quote">
        &ldquo;{testimonial.text}&rdquo;
      </blockquote>
    </div>
  );
}
