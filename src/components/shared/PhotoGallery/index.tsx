"use client";

import { useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface PhotoGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function PhotoGallery({
  images,
  alt = "Gallery image",
  className,
}: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (images.length === 0) return null;

  return (
    <div className={cn("photo-gallery", className)}>
      <GalleryMain
        src={images[selectedIndex]}
        alt={`${alt} ${selectedIndex + 1}`}
      />
      <GalleryThumbnails
        images={images}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
        emblaRef={emblaRef}
        onPrev={scrollPrev}
        onNext={scrollNext}
        alt={alt}
      />
    </div>
  );
}

function GalleryMain({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="photo-gallery-main">
      <FallbackImage
        src={resolveImageUrl(src)}
        alt={alt}
        width={800}
        height={500}
        className="photo-gallery-main-img"
        fallbackType="generic"
        fallbackText={alt}
      />
    </div>
  );
}

function GalleryThumbnails({
  images,
  selectedIndex,
  onSelect,
  emblaRef,
  onPrev,
  onNext,
  alt,
}: {
  images: string[];
  selectedIndex: number;
  onSelect: (i: number) => void;
  emblaRef: React.RefCallback<HTMLDivElement>;
  onPrev: () => void;
  onNext: () => void;
  alt: string;
}) {
  return (
    <div className="photo-gallery-thumbs-wrap">
      <button className="photo-gallery-nav" onClick={onPrev} aria-label="Previous">
        <ChevronLeft className="photo-gallery-nav-icon" />
      </button>
      <div className="photo-gallery-thumbs-viewport" ref={emblaRef}>
        <div className="photo-gallery-thumbs">
          {images.map((img, i) => (
            <button
              key={i}
              className={cn(
                "photo-gallery-thumb",
                i === selectedIndex && "photo-gallery-thumb-active"
              )}
              onClick={() => onSelect(i)}
            >
              <FallbackImage
                src={resolveImageUrl(img)}
                alt={`${alt} thumbnail ${i + 1}`}
                width={100}
                height={75}
                className="photo-gallery-thumb-img"
                fallbackType="generic"
              />
            </button>
          ))}
        </div>
      </div>
      <button className="photo-gallery-nav" onClick={onNext} aria-label="Next">
        <ChevronRight className="photo-gallery-nav-icon" />
      </button>
    </div>
  );
}
