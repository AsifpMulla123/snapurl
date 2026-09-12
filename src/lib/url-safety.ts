import { redis } from "@/lib/redis";

const SUSPICIOUS_TLDS = [
  ".zip", ".xyz", ".top", ".click", ".tk", ".pw", ".ws", ".cam", ".ooo",
  ".gq", ".cf", ".ml", ".icu", ".rest", ".surf",
];

function isIpAddress(hostname: string): boolean {
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  return ipv4Pattern.test(hostname);
}

function isPunycode(hostname: string): boolean {
  return hostname.split(".").some((label) => label.startsWith("xn--"));
}

function hasExcessiveHyphensOrRandomness(hostname: string): boolean {
  const labels = hostname.split(".");
  const mainLabel = labels[labels.length - 2] || "";

  const hyphenCount = (mainLabel.match(/-/g) || []).length;
  if (hyphenCount >= 3) return true;

  if (mainLabel.length > 15 && !/[aeiou]/i.test(mainLabel)) return true;

  return false;
}

export async function checkUrlSafety(
  urlString: string
): Promise<{ safe: boolean; reason?: string }> {
  let url: URL;

  try {
    url = new URL(urlString);
  } catch {
    return { safe: false, reason: "Invalid URL format" };
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    return { safe: false, reason: "Only http and https URLs are allowed" };
  }

  const hostname = url.hostname.toLowerCase();

  if (isIpAddress(hostname)) {
    return {
      safe: false,
      reason: "URLs pointing directly to an IP address are not allowed",
    };
  }

  const isBlocked = await redis.sismember("phishing-blocklist-set", hostname);
  if (isBlocked) {
    return { safe: false, reason: "This domain has been flagged as unsafe" };
  }

  if (isPunycode(hostname)) {
    return {
      safe: false,
      reason: "This URL uses characters that could be impersonating another domain",
    };
  }

  if (hasExcessiveHyphensOrRandomness(hostname)) {
    return {
      safe: false,
      reason: "This URL pattern is commonly associated with phishing attempts",
    };
  }

  if (SUSPICIOUS_TLDS.some((tld) => hostname.endsWith(tld))) {
    return {
      safe: false,
      reason: "This URL uses a domain extension commonly associated with abuse",
    };
  }

  return { safe: true };
}