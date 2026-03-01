import Link from "next/link";
import type { BlogPost, BlogPostSummary } from "@/lib/types";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { Badge } from "@/components/shared/Badge";
import { FallbackImage } from "@/components/shared/FallbackImage";
import "./styles.css";
import { cn } from "@/lib/utils/cn";

interface BlogPostCardProps {
  post: BlogPost | BlogPostSummary;
  className?: string;
}

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  return (
    <article className={cn("blog-card", className)}>
      <BlogCardImage
        src={post.featured_image}
        alt={post.title}
        slug={post.slug}
      />
      <div className="blog-card-body">
        <BlogCardCategories categories={post.categories} />
        <h3 className="blog-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card-excerpt">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="blog-card-link">
          Know More &rarr;
        </Link>
      </div>
    </article>
  );
}

function BlogCardImage({
  src,
  alt,
  slug,
}: {
  src: string;
  alt: string;
  slug: string;
}) {
  return (
    <Link href={`/blog/${slug}`} className="blog-card-image-wrap">
      <FallbackImage
        src={resolveImageUrl(src)}
        alt={alt}
        width={400}
        height={250}
        className="blog-card-image"
        fallbackType="blog"
        fallbackText={alt}
      />
    </Link>
  );
}

function BlogCardCategories({ categories }: { categories: string[] }) {
  return (
    <div className="blog-card-categories">
      {categories.map((cat) => (
        <Badge key={cat} variant="primary">
          {cat}
        </Badge>
      ))}
    </div>
  );
}
