// app/api/auth/route.ts — Simple password-based admin auth
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

/** Derive a deterministic token from the password so we can verify later */
function makeToken(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

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

/** Verify token middleware helper — returns true if valid */
export function verifyToken(token: string | null): boolean {
  if (!token || !ADMIN_PASSWORD) return false;
  return token === makeToken(ADMIN_PASSWORD);
}
