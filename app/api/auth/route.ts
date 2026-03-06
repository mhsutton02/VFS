// app/api/auth/route.ts — Simple password-based admin auth
import { NextRequest, NextResponse } from "next/server";
import { makeToken } from "../../../lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = makeToken(password);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
