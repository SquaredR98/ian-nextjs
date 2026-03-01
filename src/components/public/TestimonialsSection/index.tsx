"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import useSWR from "swr";
import { ArrowRight, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialsApi } from "@/lib/api";
import { RatingStars } from "@/components/shared/RatingStars";
import { FallbackImage } from "@/components/shared/FallbackImage";
import type { Testimonial } from "@/lib/types";
import "./styles.css";

export function TestimonialsSection() {
  const { data } = useSWR("testimonials", () => testimonialsApi.getAll());
  const testimonials: Testimonial[] = data?.data ?? [];

  if (testimonials.length === 0) return null;

  return (
    <section className="testimonials-section">
      <div className="testimonials-section-inner">
        <div className="testimonials-header">
          <span className="testimonials-label">Testimonials</span>
          <h2 className="testimonials-heading">
            What Our Clients Say About Us
          </h2>
          <p className="testimonials-desc">
            Real stories from real people. See how the Injury Assistance Network
            has helped clients connect with trusted professionals and get the
            care they deserve.
          </p>
        </div>
        <TestimonialsCarousel testimonials={testimonials} />
        <div className="testimonials-footer">
          <Link href="/testimonials" className="testimonials-view-all">
            View All Testimonials <ArrowRight size={16} />
          </Link>
          <Link href="/submit-review" className="testimonials-submit-btn shimmer">
            Submit a Review <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonials.length;

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, goNext, total]);

  // Get visible cards: show 3 on desktop, cycling through
  const getVisibleIndices = () => {
    const indices: number[] = [];
    for (let i = 0; i < Math.min(3, total); i++) {
      indices.push((activeIndex + i) % total);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div
      className="testimonials-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonials-track">
        {visibleIndices.map((idx, position) => (
          <TestimonialCard
            key={`${idx}-${position}`}
            testimonial={testimonials[idx]}
            position={position}
          />
        ))}
      </div>
      {total > 1 && (
        <div className="testimonials-nav">
          <button
            className="testimonials-nav-btn"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="testimonials-dots">
            {Array.from({ length: total }, (_, i) => (
              <button
                key={i}
                className={`testimonials-dot ${i === activeIndex ? "testimonials-dot-active" : ""}`}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="testimonials-nav-btn"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  position,
}: {
  testimonial: Testimonial;
  position: number;
}) {
  const { author_name, text, rating, photo_url } = testimonial;
  const initial = author_name.charAt(0).toUpperCase();
  const hasPhoto = !!photo_url && photo_url.startsWith("http");

  // Truncate long testimonial text
  const maxLen = 200;
  const displayText =
    text.length > maxLen ? text.slice(0, maxLen).trimEnd() + "…" : text;

  return (
    <div className={`testimonial-card testimonial-card-pos-${position}`}>
      <div className="testimonial-card-quote">
        <Quote size={28} />
      </div>
      <div className="testimonial-card-stars">
        <RatingStars rating={rating} />
      </div>
      <p className="testimonial-card-text">{displayText}</p>
      <div className="testimonial-card-footer">
        <div className="testimonial-card-author">
          {hasPhoto ? (
            <FallbackImage
              src={photo_url}
              alt={author_name}
              width={44}
              height={44}
              className="testimonial-card-photo"
              fallbackType="avatar"
              fallbackText={author_name}
            />
          ) : (
            <div className="testimonial-card-avatar">{initial}</div>
          )}
          <div className="testimonial-card-author-info">
            <span className="testimonial-card-name">{author_name}</span>
            <span className="testimonial-card-verified">Verified Client</span>
          </div>
        </div>
        <FallbackImage
          src="/images/google-logo.svg"
          alt="Google Review"
          width={28}
          height={28}
          className="testimonial-card-google"
          fallbackType="generic"
        />
      </div>
    </div>
  );
}
