import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "@/lib/redis";

export const createLinkRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  prefix: "ratelimit:create-link",
  analytics: true,
});

export const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "15 m"),
  prefix: "ratelimit:auth",
  analytics: true,
});
