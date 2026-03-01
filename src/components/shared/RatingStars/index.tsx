import "./styles.css";

interface RatingStarsProps {
  rating: number;
  count?: number;
  className?: string;
}

export function RatingStars({ rating, count, className }: RatingStarsProps) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <span className={`rating-stars ${className || ""}`}>
      {stars.map((filled, i) => (
        <span key={i} className={filled ? "rating-star" : "rating-star-empty"}>
          ★
        </span>
      ))}
      {count !== undefined && (
        <span className="rating-count">({count})</span>
      )}
    </span>
  );
}
