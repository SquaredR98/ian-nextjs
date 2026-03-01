import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockSpecialties } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");

  let data = [...mockSpecialties];
  if (category) {
    data = data.filter((s) => s.category === category);
  }

  return NextResponse.json({ data });
}
