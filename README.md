# SnapURL

**See exactly who clicks your links.**

SnapURL is a modern URL shortener built for developers and creators who actually want to know what happens after someone clicks their link. Unlike most shorteners that paywall analytics behind expensive plans, SnapURL gives you real, actionable data — referrer, location, device, and timing — for free, from your very first click.

🔗 **Live site:** [snapurl-teal.vercel.app](https://snapurl-teal.vercel.app)

---

## Why SnapURL?

Most link shorteners were built for a different era of the internet — one where "how many clicks did I get" was enough. Today, creators and developers share the same link across a dozen platforms and have no idea which one actually drove the traffic.

SnapURL was built to answer one question well: **where did my audience actually come from?**

|                                  | SnapURL | Typical shorteners  |
| -------------------------------- | :-----: | :-----------------: |
| Referrer, geo & device analytics |   ✅    |   ❌ (paywalled)    |
| Generous free tier               |   ✅    | ❌ (heavily capped) |
| No forced upgrade wall           |   ✅    |         ❌          |
| Simple, non-technical UI         |   ✅    |         ✅          |

---

## Features

### Core

- **Instant URL shortening** — no account required to create a short link
- **Custom slugs** — pick your own memorable short code
- **Fast, cached redirects** — Redis-backed caching keeps redirects sub-200ms
- **Clean, canonical short links** — `snapurl.co/yourslug`, not buried under `/api/...`

### Analytics

- **Referrer tracking** — see exactly which platform (Twitter, LinkedIn, etc.) drove each click
- **Geographic breakdown** — country-level insight into your audience, powered by IP geolocation
- **Device & browser breakdown** — know if your audience is on mobile or desktop
- **Clicks-over-time** — a real, interactive line chart of activity, so you know when to post
- **Live dashboard** — every link you own, with click counts, in one place

### Security & Trust

- **Phishing & malware screening** — every submitted URL is checked against a continuously updated threat database (40,000+ known-bad domains) before a link is ever created
- **Heuristic threat detection** — flags punycode/homograph domains, IP-literal URLs, and structurally suspicious patterns even when they're not yet on a blocklist
- **Rate limiting** — sliding-window limits on link creation and login attempts to prevent abuse and brute-force attacks
- **Hardened HTTP headers** — CSP, HSTS, X-Frame-Options, and more, configured for real production use
- **Secure authentication** — powered by Better Auth, with hashed credentials and proper session management

### Product

- **Full account system** — sign up, log in, log out, session-protected dashboard
- **Link management** — create and delete links directly from your dashboard
- **Responsive, accessible design** — WCAG AA color contrast, keyboard-navigable, mobile-first layouts throughout
- **SEO-ready** — per-page metadata, Open Graph tags, sitemap, and robots.txt out of the box

---

## Tech Stack

**Frontend**

- [Next.js 16](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4
- [Recharts](https://recharts.org) for data visualization
- [Lucide](https://lucide.dev) icons

**Backend**

- Next.js API Routes
- [Prisma 7](https://www.prisma.io) ORM
- PostgreSQL (Prisma Postgres)
- [Upstash Redis](https://upstash.com) — caching & rate limiting
- [Better Auth](https://better-auth.com) — authentication

**Infrastructure**

- Hosted on [Vercel](https://vercel.com)
- Scheduled background jobs via [cron-job.org](https://cron-job.org) (click processing, blocklist refresh)
- Geolocation via [Free IP API](https://freeipapi.com)
- Threat data from [malware-filter](https://gitlab.com/malware-filter/malware-filter)

---

## Architecture Highlights

SnapURL isn't just a CRUD app — a few things worth pointing out under the hood:

- **Non-blocking analytics pipeline.** Click events are pushed to a Redis queue instantly on redirect, then batch-processed into Postgres by a scheduled job every minute. This means a link's redirect speed is never affected by analytics logging.
- **Cached redirects.** Link lookups are cached in Redis with a 1-hour TTL, so hot links skip the database entirely after their first hit.
- **Layered link safety.** Every submitted URL passes through IP-literal detection, a 40k+ domain blocklist (stored as a Redis Set for O(1) lookups), punycode detection, and structural heuristics — all before a link is created.
- **Defense in depth on auth.** Route protection happens at two layers: a lightweight cookie check in `proxy.ts`, and a full database-backed session check inside each protected Server Component.

---

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Prisma Postgres](https://www.prisma.io/postgres), free tier)
- An [Upstash Redis](https://upstash.com) database (free tier)

### Installation

```bash
git clone https://github.com/AsifpMulla123/snapurl.git
cd snapurl
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="your-postgres-connection-string"
UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
BETTER_AUTH_SECRET="a-random-32-byte-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CRON_SECRET="a-random-32-byte-secret"
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
```

### Run Locally

```bash
npm run dev
```

Visit **http://localhost:3000**.

### Background Jobs (Production)

Two routes need to be called on a schedule (e.g. via [cron-job.org](https://cron-job.org)) with an `Authorization: Bearer <CRON_SECRET>` header:

| Route                              | Frequency      | Purpose                                 |
| ---------------------------------- | -------------- | --------------------------------------- |
| `POST /api/cron/process-clicks`    | Every 1 minute | Drains the click queue into Postgres    |
| `POST /api/cron/refresh-blocklist` | Every 6 hours  | Refreshes the phishing domain blocklist |

---

## Roadmap

- [ ] Custom domains
- [ ] Password-protected links
- [ ] Link expiration
- [ ] QR code generation
- [ ] Dark mode

---

## License

This project is currently unlicensed for public reuse. All rights reserved.

---

<p align="center">Built with care, one tested feature at a time.</p>
