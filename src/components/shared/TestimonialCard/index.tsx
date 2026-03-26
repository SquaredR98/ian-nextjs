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
      {testimonial.source === "google" && (
        <div className="testimonial-card-source">
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Google Review</span>
        </div>
      )}
    </div>
  );
}
