import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

interface LinkData {
  id: string;
  originalUrl: string;
  isBlocked: boolean;
}

export async function resolveLink(slug: string): Promise<LinkData | null> {
  const cached = await redis.get<LinkData>(`link:${slug}`);

  if (cached) return cached;

  const link = await prisma.link.findUnique({
    where: { slug },
    select: { id: true, originalUrl: true, isBlocked: true },
  });

  if (!link) return null;

  await redis.set(`link:${slug}`, link, { ex: 3600 });

  return link;
}

export async function queueClickEvent(data: {
  linkId: string;
  referrer: string | null;
  userAgent: string | null;
  ip: string | null;
}) {
  const clickEvent = {
    ...data,
    timestamp: new Date().toISOString(),
  };

  redis.rpush("click-queue", JSON.stringify(clickEvent)).catch((err) => {
    console.error("Failed to queue click event:", err);
  });
}
