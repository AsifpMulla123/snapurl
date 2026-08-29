import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { prisma } from "@/lib/prisma";

const generateSlug = customAlphabet(
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  7,
);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { originalUrl, customSlug } = body;

  if (!originalUrl) {
    return NextResponse.json(
      { error: "originalUrl is required" },
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
    },
  });

  return NextResponse.json(link, { status: 201 });
}
