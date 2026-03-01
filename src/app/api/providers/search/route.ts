import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockProviders } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 10;

  let filtered = [...mockProviders];

  if (category) {
    const categoryMap: Record<string, string> = {
      "1": "medical",
      "2": "legal",
      "3": "service",
      "medical-providers": "medical",
      "lawyers": "legal",
      "service-providers": "service",
    };
    const cat = categoryMap[category] || category;
    filtered = filtered.filter((p) => p.category === cat);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / perPage);
  const start = (page - 1) * perPage;
  const data = filtered.slice(start, start + perPage);

  return NextResponse.json({
    data,
    total,
    page,
    per_page: perPage,
    total_pages: totalPages,
  });
}
