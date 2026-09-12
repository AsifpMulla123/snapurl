import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const BLOCKLIST_URL =
  "https://malware-filter.gitlab.io/malware-filter/phishing-filter-hosts.txt";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch(BLOCKLIST_URL);
  const text = await res.text();

  const domains = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => line.replace(/^0\.0\.0\.0\s+/, ""));

  await redis.del("phishing-blocklist-set");

  const BATCH_SIZE = 5000;
  for (let i = 0; i < domains.length; i += BATCH_SIZE) {
    const batch = domains.slice(i, i + BATCH_SIZE);
    await redis.sadd(
      "phishing-blocklist-set",
      ...(batch as [string, ...string[]]),
    );
  }

  return NextResponse.json({ domainsLoaded: domains.length });
}
