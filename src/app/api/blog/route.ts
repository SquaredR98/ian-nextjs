import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockBlogPosts } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category");
  const perPage = 6;

  let filtered = [...mockBlogPosts];
  if (category) {
    filtered = filtered.filter((p) =>
      p.categories.some((c) => c.toLowerCase() === category.toLowerCase())
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage)// eslint-disable-next-line @typescript-eslint/no-unused-vars
    .map(({ content: _content, ...rest }) => rest);

  return NextResponse.json({
    data,
    meta: {
      current_page: page,
      total_pages: totalPages,
      total,
    },
  });
}
