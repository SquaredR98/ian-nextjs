import { NextResponse } from "next/server";
import { mockEndorsements } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: mockEndorsements });
}
