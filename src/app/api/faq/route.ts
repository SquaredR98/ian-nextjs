import { NextResponse } from "next/server";
import { mockFAQ } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockFAQ });
}
