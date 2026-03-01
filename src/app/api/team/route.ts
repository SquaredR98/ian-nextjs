import { NextResponse } from "next/server";
import { mockTeam } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockTeam });
}
