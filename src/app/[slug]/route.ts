import { NextRequest, NextResponse } from "next/server";
import { resolveLink, queueClickEvent } from "@/lib/redirect-link";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const link = await resolveLink(slug);

  if (!link || link.isBlocked) {
    return NextResponse.redirect(new URL("/link-not-found", request.url));
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  await queueClickEvent({
    linkId: link.id,
    referrer: request.headers.get("referer"),
    userAgent: request.headers.get("user-agent"),
    ip,
  });

  return NextResponse.redirect(link.originalUrl);
}
