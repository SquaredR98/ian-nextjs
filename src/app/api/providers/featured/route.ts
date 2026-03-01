import { NextResponse } from "next/server";
import { mockProviders } from "@/lib/mock-data";

export async function GET() {
  const featured = mockProviders.slice(0, 6);
  return NextResponse.json({
    data: featured,
    rotate: {
      id: featured.map((p) => p.id),
      state: featured.map(() => 1),
    },
  });
}
