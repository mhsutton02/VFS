// lib/auth.ts — Admin token verification
import crypto from "crypto";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export function makeToken(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/** Verify token — returns true if valid */
export function verifyToken(token: string | null): boolean {
  if (!token || !ADMIN_PASSWORD) return false;
  return token === makeToken(ADMIN_PASSWORD);
}
