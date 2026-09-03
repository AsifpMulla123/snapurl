import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

interface QueuedClick {
  linkId: string;
  referrer: string | null;
  userAgent: string | null;
  ip: string | null;
  timestamp: string;
}

function parseDevice(userAgent: string | null): string {
  if (!userAgent) return "unknown";
  if (/mobile/i.test(userAgent)) return "mobile";
  if (/tablet/i.test(userAgent)) return "tablet";
  return "desktop";
}

function parseBrowser(userAgent: string | null): string {
  if (!userAgent) return "unknown";
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Edge")) return "Edge";
  return "other";
}

async function getGeoData(ip: string | null) {
  if (!ip || ip === "127.0.0.1") {
    return { country: null, city: null };
  }

  try {
    const res = await fetch(`https://freeipapi.com/api/json/${ip}`);
    const data = await res.json();
    return {
      country: data.countryName || null,
      city: data.cityName || null,
    };
  } catch {
    return { country: null, city: null };
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const BATCH_SIZE = 50;
  const rawEvents = (await redis.lpop<QueuedClick>(
    "click-queue",
    BATCH_SIZE,
  )) as QueuedClick[] | null;

  if (!rawEvents || rawEvents.length === 0) {
    return NextResponse.json({ processed: 0 });
  }

  const events: QueuedClick[] = rawEvents;

  const enrichedEvents = await Promise.all(
    events.map(async (event) => {
      const { country, city } = await getGeoData(event.ip);
      return {
        linkId: event.linkId,
        referrer: event.referrer,
        device: parseDevice(event.userAgent),
        browser: parseBrowser(event.userAgent),
        country,
        city,
        timestamp: new Date(event.timestamp),
      };
    }),
  );

  await prisma.clickEvent.createMany({
    data: enrichedEvents,
  });

  return NextResponse.json({ processed: enrichedEvents.length });
}
