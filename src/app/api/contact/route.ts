import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { success: false, message: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true });
}
