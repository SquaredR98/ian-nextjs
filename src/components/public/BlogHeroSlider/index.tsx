"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { cn } from "@/lib/utils/cn";
import "./styles.css";

const AUTO_ROTATE_MS = 6000;

interface BlogHeroSliderProps {
  posts: BlogPost[];
}

export function BlogHeroSlider({ posts }: BlogHeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % posts.length);
  }, [posts.length]);

  useEffect(() => {
    if (paused || posts.length <= 1) return;
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [paused, next, posts.length]);

  if (posts.length === 0) return null;

  return (
    <section
      className="blog-hero-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {posts.map((post, i) => (
        <Slide key={post.id} post={post} isActive={i === active} />
      ))}

      {posts.length > 1 && (
        <div className="blog-hero-dots">
          {posts.map((_, i) => (
            <button
              key={i}
              className={cn("blog-hero-dot", i === active && "blog-hero-dot-active")}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Slide({ post, isActive }: { post: BlogPost; isActive: boolean }) {
  return (
    <div className={cn("blog-hero-slide", isActive && "blog-hero-slide-active")}>
      <div className="blog-hero-slide-bg">
        <FallbackImage
          src={resolveImageUrl(post.featured_image)}
          alt={post.title}
          width={1400}
          height={500}
          className="blog-hero-slide-img"
          fallbackType="blog"
          fallbackText={post.title}
        />
      </div>
      <div className="blog-hero-slide-overlay" />
      <div className="blog-hero-slide-content">
        {post.categories.length > 0 && (
          <div className="blog-hero-slide-cats">
            {post.categories.slice(0, 2).map((cat) => (
              <span key={cat} className="blog-hero-slide-cat">{cat}</span>
            ))}
          </div>
        )}
        <h2 className="blog-hero-slide-title">{post.title}</h2>
        <p className="blog-hero-slide-excerpt">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="blog-hero-slide-cta">
          Read More
          <svg className="blog-hero-slide-arrow" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.19l-2.72-2.72a.75.75 0 011.06-1.06l4 4a.75.75 0 010 1.06l-4 4a.75.75 0 11-1.06-1.06l2.72-2.72H3.75A.75.75 0 013 10z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
