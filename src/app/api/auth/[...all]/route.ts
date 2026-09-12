import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";
import { authRateLimit } from "@/lib/rate-limit";

const handlers = toNextJsHandler(auth.handler);

export const GET = handlers.GET;

export async function POST(request: NextRequest) {
  const isSensitiveRoute =
    request.nextUrl.pathname.includes("/sign-in") ||
    request.nextUrl.pathname.includes("/sign-up");

  if (isSensitiveRoute) {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    const { success } = await authRateLimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Too many attempts. Please try again later." },
        { status: 429 },
      );
    }
  }

  return handlers.POST(request);
}
