import { NextResponse } from "next/server";
import { mockBlogCategories } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockBlogCategories });
}
