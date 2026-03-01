import { NextResponse } from "next/server";
import { mockBlogPosts } from "@/lib/mock-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = mockBlogPosts.find((p) => p.slug === slug);

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const related = mockBlogPosts
    .filter((p) => p.id !== post.id)
    .slice(0, 3)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content: _content, ...rest }) => rest);

  return NextResponse.json({ data: { ...post, related_posts: related } });
}
