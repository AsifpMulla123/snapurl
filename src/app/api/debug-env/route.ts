import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasSecret: !!process.env.BETTER_AUTH_SECRET,
    secretLength: process.env.BETTER_AUTH_SECRET?.length ?? 0,
    hasBaseUrl: !!process.env.BETTER_AUTH_URL,
    baseUrl: process.env.BETTER_AUTH_URL ?? "not set",
  });
}
