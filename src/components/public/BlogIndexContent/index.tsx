"use client";

import { useSearchParams, useRouter } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import type { BlogPost, BlogCategory } from "@/lib/types";
import { Pagination } from "@/components/shared/Pagination";
import { Spinner } from "@/components/shared/Spinner";
import { FallbackImage } from "@/components/shared/FallbackImage";
import { resolveImageUrl } from "@/lib/utils/image-url";
import { blogApi } from "@/lib/api";
import { BlogHeroSlider } from "@/components/public/BlogHeroSlider";

export function BlogIndexContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = Number(searchParams.get("page") ?? 1);
  const category = searchParams.get("category") ?? "";

  const postsKey = `blog-posts:${page}:${category}`;
  const { data: postsRes, isLoading: postsLoading } = useSWR(postsKey, () =>
    blogApi.getPosts({
      page,
      category: category || undefined,
    }),
  );
  const { data: categoriesRes } = useSWR("blog-categories", () =>
    blogApi.getCategories(),
  );

  const posts = postsRes?.data ?? [];
  const categories = categoriesRes?.data ?? [];

  // Show hero slider with first 3 posts on page 1 when no category filter
  const showHero = page === 1 && !category && posts.length > 0;
  const heroPosts = showHero ? posts.slice(0, 3) : [];
  const gridPosts = showHero ? posts.slice(3) : posts;
  const relatedPosts = posts.slice(0, 4);

  function handleCategoryChange(slug: string) {
    const params = new URLSearchParams();
    if (slug) params.set("category", slug);
    params.set("page", "1");
    router.push(`/blog?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    params.set("page", String(newPage));
    router.push(`/blog?${params.toString()}`);
  }

  return (
    <>
      {showHero && <BlogHeroSlider posts={heroPosts} />}
      <div className="blog-index">
        <div className="blog-layout">
          <div className="blog-main">
            {postsLoading && <BlogLoadingState />}
            {!postsLoading && gridPosts.length === 0 && !showHero && <BlogEmptyState />}
            {!postsLoading && gridPosts.length > 0 && <BlogGrid posts={gridPosts} />}
            {postsRes && postsRes.total_pages > 1 && (
              <Pagination
                currentPage={postsRes.page}
                totalPages={postsRes.total_pages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          <aside className="blog-sidebar">
            <RelatedPostsSidebar posts={relatedPosts} />
            <CategoriesSidebar
              categories={categories}
              activeSlug={category}
              onSelect={handleCategoryChange}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card">
      <div className="blog-card-image-wrap">
        <FallbackImage
          src={resolveImageUrl(post.featured_image)}
          alt={post.title}
          width={400}
          height={250}
          className="blog-card-image"
          fallbackType="blog"
          fallbackText={post.title}
        />
        <div className="blog-card-dots" />
      </div>
      <div className="blog-card-body">
        <h3 className="blog-card-title">{post.title}</h3>
        {post.categories.length > 0 && (
          <div className="blog-card-categories">
            {post.categories.map((cat) => (
              <span key={cat} className="blog-card-category">
                {cat}
              </span>
            ))}
          </div>
        )}
        <p className="blog-card-excerpt">{post.excerpt}</p>
      </div>
    </Link>
  );
}

function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="blog-grid">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

function RelatedPostsSidebar({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <div className="blog-sidebar-section">
      <h2 className="blog-sidebar-title">Related Post:</h2>
      <div className="blog-related-list">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="blog-related-item"
          >
            <FallbackImage
              src={resolveImageUrl(post.featured_image)}
              alt={post.title}
              width={80}
              height={60}
              className="blog-related-image"
              fallbackType="blog"
              fallbackText={post.title}
            />
            <span className="blog-related-text">{post.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CategoriesSidebar({
  categories,
  activeSlug,
  onSelect,
}: {
  categories: BlogCategory[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  if (categories.length === 0) return null;

  return (
    <div className="blog-sidebar-section">
      <h2 className="blog-sidebar-title">Categories:</h2>
      <ul className="blog-categories-list">
        {categories.map((cat) => (
          <li key={cat.slug} className="blog-category-row">
            <button
              className={
                activeSlug === cat.slug
                  ? "blog-category-link blog-category-link-active"
                  : "blog-category-link"
              }
              onClick={() => onSelect(cat.slug)}
            >
              {cat.name}
            </button>
            <span className="blog-category-count">{cat.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogLoadingState() {
  return (
    <div className="blog-loading">
      <Spinner size="lg" />
    </div>
  );
}

function BlogEmptyState() {
  return (
    <div className="blog-empty">
      <p className="blog-empty-text">No blog posts found.</p>
    </div>
  );
}
