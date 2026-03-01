"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface EmblaCarouselProps {
  children: React.ReactNode;
  slidesPerView?: { base: number; md?: number; lg?: number };
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
}

export function EmblaCarousel({
  children,
  autoplay = false,
  loop = true,
  className,
}: EmblaCarouselProps) {
  const plugins = autoplay
    ? [Autoplay({ delay: 4000, stopOnInteraction: false })]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop, align: "start" }, plugins);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={cn("embla", className)}>
      <div className="embla-viewport" ref={emblaRef}>
        <div className="embla-container">{children}</div>
      </div>
      <CarouselNav onPrev={scrollPrev} onNext={scrollNext} />
    </div>
  );
}

export function EmblaSlide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("embla-slide", className)}>{children}</div>;
}

function CarouselNav({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="embla-nav">
      <button className="embla-nav-btn" onClick={onPrev} aria-label="Previous">
        <ChevronLeft className="embla-nav-icon" />
      </button>
      <button className="embla-nav-btn" onClick={onNext} aria-label="Next">
        <ChevronRight className="embla-nav-icon" />
      </button>
    </div>
  );
}
