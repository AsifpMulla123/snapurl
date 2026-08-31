import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  const link = await prisma.link.findUnique({
    where: { slug },
  });

  if (!link || link.isBlocked) {
    return NextResponse.redirect(new URL("/link-not-found", request.url));
  }

  return NextResponse.redirect(link.originalUrl);
}
