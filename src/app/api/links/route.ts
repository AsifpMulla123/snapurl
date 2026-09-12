import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { checkUrlSafety } from "@/lib/url-safety";
import { createLinkRateLimit } from "@/lib/rate-limit";
import { customAlphabet } from "nanoid";

const generateSlug = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  7,
);

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const identifier =
    session?.user.id ?? request.headers.get("x-forwarded-for") ?? "anonymous";
  const { success } = await createLinkRateLimit.limit(identifier);

  if (!success) {
    return NextResponse.json(
      { error: "Too many links created. Please try again in a minute." },
      { status: 429 },
    );
  }
  const body = await request.json();
  const { originalUrl, customSlug } = body;

  if (!originalUrl) {
    return NextResponse.json(
      { error: "originalUrl is required" },
      { status: 400 },
    );
  }
  const safetyCheck = await checkUrlSafety(originalUrl);
  if (!safetyCheck.safe) {
    return NextResponse.json(
      { error: safetyCheck.reason || "This URL cannot be shortened" },
      { status: 400 },
    );
  }
  const slug = customSlug || generateSlug();

  const existingLink = await prisma.link.findUnique({
    where: { slug },
  });

  if (existingLink) {
    return NextResponse.json(
      { error: "This slug is already taken" },
      { status: 409 },
    );
  }

  const link = await prisma.link.create({
    data: {
      slug,
      originalUrl,
      userId: session?.user.id,
    },
  });

  return NextResponse.json(link, { status: 201 });
}
