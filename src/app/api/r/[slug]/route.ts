import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const cached = await redis.get<{
    id: string;
    originalUrl: string;
    isBlocked: boolean;
  }>(`link:${slug}`);

  let linkData = cached;

  if (!linkData) {
    const link = await prisma.link.findUnique({
      where: { slug },
      select: { id: true, originalUrl: true, isBlocked: true },
    });

    if (!link) {
      return NextResponse.redirect(new URL("/link-not-found", request.url));
    }

    linkData = link;

    await redis.set(`link:${slug}`, linkData, { ex: 3600 });
  }

  if (linkData.isBlocked) {
    return NextResponse.redirect(new URL("/link-not-found", request.url));
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : null;

  const clickEvent = {
    linkId: linkData.id,
    referrer: request.headers.get("referer") || null,
    userAgent: request.headers.get("user-agent") || null,
    ip,
    timestamp: new Date().toISOString(),
  };

  redis.rpush("click-queue", JSON.stringify(clickEvent)).catch((err) => {
    console.error("Failed to queue click event:", err);
  });

  return NextResponse.redirect(linkData.originalUrl);
}
