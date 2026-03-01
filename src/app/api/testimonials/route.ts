import { NextResponse } from "next/server";
import { mockTestimonials } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockTestimonials });
}
