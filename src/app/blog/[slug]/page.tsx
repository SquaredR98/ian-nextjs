import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { BlogPost } from "@/lib/types";
import { blogApi } from "@/lib/api";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { ProviderSignupCTA } from "@/components/shared/ProviderSignupCTA";
import { PostFeaturedImage, PostHeader, PostContent, PostShareButtons, RelatedPosts } from "@/components/public/BlogPostPage";
import { BlogCommentForm } from "@/components/public/BlogCommentForm";
import "./page.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await blogApi.getBySlug(slug);
    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.featured_image ? [post.featured_image] : [],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    post = await blogApi.getBySlug(slug);
  } catch {
    notFound();
  }

  if (!post) notFound();

  let related: BlogPost[] = [];
  try {
    const res = await blogApi.getPosts({ page: 1 });
    related = (res.data ?? []).filter((p) => p.slug !== slug).slice(0, 3);
  } catch {
    // Silently fail — related posts are non-critical
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />
      <article className="blog-post">
        <PostFeaturedImage src={post.featured_image} alt={post.title} />
        <div className="blog-post-container">
          <PostHeader post={post} />
          <PostContent html={post.content ?? ""} />
          <PostShareButtons post={post} />
          {post.comment_status !== "N" && (
            <BlogCommentForm blogId={post.id} />
          )}
          <RelatedPosts posts={related} />
        </div>
        <ProviderSignupCTA className="blog-post-cta" />
      </article>
    </>
  );
}
