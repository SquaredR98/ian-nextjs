import type { GoogleReview } from "@/lib/types";
import { RatingStars } from "@/components/shared/RatingStars";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface GoogleReviewsProps {
  reviews: GoogleReview[];
  overallRating: number;
  googleCid?: string;
  className?: string;
}

export function GoogleReviews({
  reviews,
  overallRating,
  googleCid,
  className,
}: GoogleReviewsProps) {
  return (
    <div className={cn("google-reviews", className)}>
      <GoogleReviewsHeader
        overallRating={overallRating}
        reviewCount={reviews.length}
      />
      <div className="google-reviews-list">
        {reviews.map((review, i) => (
          <ReviewCard key={i} review={review} />
        ))}
      </div>
      {googleCid && <ReviewCTA googleCid={googleCid} />}
    </div>
  );
}

function GoogleReviewsHeader({
  overallRating,
  reviewCount,
}: {
  overallRating: number;
  reviewCount: number;
}) {
  return (
    <div className="google-reviews-header">
      <FallbackImage
        src="/images/g-reviews.png"
        alt="Google Reviews"
        width={24}
        height={24}
        className="google-reviews-icon"
        fallbackType="generic"
      />
      <span className="google-reviews-score">{overallRating.toFixed(1)}</span>
      <RatingStars rating={Math.round(overallRating)} />
      <span className="google-reviews-count">({reviewCount} reviews)</span>
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <div className="google-review-card">
      <div className="google-review-card-header">
        <FallbackImage
          src={review.avatar}
          alt={review.author}
          width={40}
          height={40}
          className="google-review-avatar"
          fallbackType="avatar"
          fallbackText={review.author}
        />
        <div className="google-review-meta">
          <span className="google-review-author">{review.author}</span>
          <RatingStars rating={review.rating} />
        </div>
      </div>
      <p className="google-review-text">{review.text}</p>
      {review.relative_time && (
        <span className="google-review-time">{review.relative_time}</span>
      )}
    </div>
  );
}

function ReviewCTA({ googleCid }: { googleCid: string }) {
  return (
    <a
      href={`https://search.google.com/local/writereview?placeid=${googleCid}`}
      target="_blank"
      rel="noopener noreferrer"
      className="google-reviews-cta"
    >
      Review us on Google
    </a>
  );
}
