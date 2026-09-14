// "use client";

// import { useState } from "react";

// export default function Home() {
//   const [url, setUrl] = useState("");
//   const [result, setResult] = useState<{ slug: string } | null>(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setResult(null);
//     setLoading(true);

//     try {
//       const res = await fetch("/api/links", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ originalUrl: url }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//       } else {
//         setResult(data);
//       }
//     } catch {
//       setError("Could not reach the server");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb] px-4">
//       <h1 className="text-4xl font-semibold text-[#191c1e] mb-2">
//         See who clicks your links.
//       </h1>
//       <p className="text-[#43474e] mb-8">
//         Shorten, track, and understand your audience — for free.
//       </p>

//       <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
//         <input
//           type="url"
//           required
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           placeholder="Paste your long URL here"
//           className="flex-1 rounded-lg border border-[#e0e3e5] bg-white px-4 py-3 text-[#191c1e] outline-none focus:border-[#00685f]"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="rounded-lg bg-[#00685f] px-6 py-3 font-medium text-white hover:bg-[#00544d] disabled:opacity-50"
//         >
//           {loading ? "Shortening..." : "Shorten"}
//         </button>
//       </form>

//       {error && <p className="mt-4 text-[#ba1a1a]">{error}</p>}

//       {result && (
//         <div className="mt-6 w-full max-w-xl rounded-lg border border-[#e0e3e5] bg-white p-4">
//           <p className="text-sm text-[#43474e] mb-1">Your short link</p>
//           <p className="text-lg font-medium text-[#00685f]">
//             snapurl.co/{result.slug}
//           </p>
//           <p className="mt-3 text-sm text-[#43474e]">
//             Sign up to see who&apos;s clicking this
//           </p>
//         </div>
//       )}
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import {
  Link2,
  Globe,
  Smartphone,
  Clock,
  Check,
  X,
  Plus,
  ShieldCheck,
  Shield,
  Lock,
} from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ slug: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PublicNav />

      {/* Hero */}
      <main className="relative overflow-hidden bg-[#f7f9fb] px-4">
        {/* Background treatment — soft radial glow, not a flat color */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(0,104,95,0.08), transparent)",
          }}
        />

        <div className="relative mx-auto max-w-3xl pt-20 pb-10 text-center">
          <h1 className="font-heading text-4xl font-medium leading-[1.1] text-[#191c1e] sm:text-6xl">
            See exactly who clicks your links.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#43474e]">
            Shorten any link and get real analytics — referrer, location,
            device, and timing — free, from your very first click.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-xl gap-2"
          >
            <input
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long URL here"
              className="flex-1 rounded-lg border border-[#e0e3e5] bg-white px-4 py-3 text-[#191c1e] outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#00685f] px-6 py-3 font-medium text-white transition-colors hover:bg-[#00544d] disabled:opacity-50"
            >
              {loading ? "Shortening..." : "Shorten"}
            </button>
          </form>

          {!result && !error && (
            <p className="mt-3 text-sm text-[#6f797a]">
              No account needed — paste a link above to try it instantly.
            </p>
          )}

          {error && <p className="mt-4 text-sm text-[#ba1a1a]">{error}</p>}

          {result && (
            <div className="mx-auto mt-6 max-w-xl rounded-xl border border-[#e0e3e5] bg-white p-5 text-left shadow-sm">
              <p className="mb-1 text-sm text-[#43474e]">Your short link</p>
              <p className="text-lg font-medium text-[#00685f]">
                snapurl.co/{result.slug}
              </p>
              <p className="mt-3 border-t border-[#e0e3e5] pt-3 text-sm text-[#43474e]">
                <Link
                  href="/signup"
                  className="font-medium text-[#00685f] hover:underline"
                >
                  Sign up free
                </Link>{" "}
                to see who&apos;s clicking this link
              </p>
            </div>
          )}
        </div>

        {/* Illustration: long URL -> short trackable link */}
        <div className="relative mx-auto max-w-2xl pb-20">
          <svg
            viewBox="0 0 600 160"
            className="w-full"
            role="img"
            aria-label="A long messy link being shortened into a trackable SnapURL link"
          >
            {/* messy long URL, drawn as a jagged line */}
            <path
              d="M 20 80 L 60 65 L 100 90 L 140 70 L 180 85 L 210 75"
              fill="none"
              stroke="#c7cccd"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* arrow */}
            <path
              d="M 250 80 L 290 80 M 278 68 L 290 80 L 278 92"
              fill="none"
              stroke="#00685f"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* short link pill */}
            <rect
              x="330"
              y="60"
              width="130"
              height="40"
              rx="20"
              fill="#00685f"
            />
            <text
              x="395"
              y="85"
              textAnchor="middle"
              fill="white"
              fontSize="15"
              fontFamily="var(--font-sans)"
              fontWeight="500"
            >
              snp.ly/x7K
            </text>

            {/* mini analytics bars, one animated */}
            <g transform="translate(500, 50)">
              <rect x="0" y="30" width="10" height="20" rx="2" fill="#bcc9c6" />
              <rect
                x="16"
                y="18"
                width="10"
                height="32"
                rx="2"
                fill="#bcc9c6"
              />
              <rect x="32" y="6" width="10" height="44" rx="2" fill="#00685f">
                <animate
                  attributeName="height"
                  values="44;30;44"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="6;20;6"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          </svg>
        </div>
      </main>

      {/* How it works */}
      <section className="border-t border-[#e0e3e5] bg-white px-4 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-heading text-center text-3xl font-medium text-[#191c1e]">
            How it works
          </h2>

          <div className="relative mt-16 grid grid-cols-1 gap-12 sm:grid-cols-3">
            {/* connecting line, desktop only */}
            <div className="absolute top-5 left-0 right-0 hidden h-px bg-[#e0e3e5] sm:block" />

            {[
              {
                step: "1",
                title: "Paste your link",
                desc: "Drop in any long URL — no signup needed to get started.",
              },
              {
                step: "2",
                title: "Share it anywhere",
                desc: "Post your short link on Twitter, LinkedIn, or anywhere else.",
              },
              {
                step: "3",
                title: "See who clicked",
                desc: "Sign up free to unlock referrer, location, and device data.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="relative z-10 mx-auto mb-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00685f] bg-white text-sm font-semibold text-[#00685f]">
                  {item.step}
                </div>
                <h3 className="font-heading text-lg font-medium text-[#191c1e]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#43474e]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-[#e0e3e5] bg-[#f7f9fb] px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-heading text-center text-3xl font-medium text-[#191c1e]">
            Analytics that actually matter
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-[#43474e]">
            No artificial link caps, no paywalled data. Real insight into your
            audience, free from day one.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {/* Featured, larger card */}
            <div className="rounded-2xl bg-white p-8 shadow-sm sm:col-span-2 sm:row-span-2">
              <Globe className="h-6 w-6 text-[#00685f]" />
              <h3 className="font-heading mt-4 text-xl font-medium text-[#191c1e]">
                See where your audience really is
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[#43474e]">
                Referrer, country, and device — broken down automatically for
                every link, with no setup required.
              </p>

              {/* mini mock bar chart */}
              <div className="mt-8 flex items-end gap-2">
                {[40, 70, 45, 90, 60, 100, 55].map((h, i) => (
                  <div
                    key={i}
                    className="w-6 rounded-t-sm bg-[#00685f]/80"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between text-xs text-[#6f797a]">
                <span>Mon</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Referrer tracking — mini source breakdown */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Link2 className="h-5 w-5 text-[#00685f]" />
              <h3 className="mt-3 font-medium text-[#191c1e]">
                Referrer tracking
              </h3>
              <p className="mt-1 text-sm text-[#43474e]">
                Know which platform actually drove the click.
              </p>
              <div className="mt-5 flex flex-col gap-2">
                {[
                  { label: "Twitter", pct: 62 },
                  { label: "Direct", pct: 27 },
                  { label: "LinkedIn", pct: 11 },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex items-center gap-2 text-xs text-[#6f797a]"
                  >
                    <span className="w-14 shrink-0">{r.label}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-[#eceef0]">
                      <div
                        className="h-1.5 rounded-full bg-[#00685f]"
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Device breakdown — mini split bar */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <Smartphone className="h-5 w-5 text-[#00685f]" />
              <h3 className="mt-3 font-medium text-[#191c1e]">
                Device breakdown
              </h3>
              <p className="mt-1 text-sm text-[#43474e]">
                Mobile or desktop, at a glance.
              </p>
              <div className="mt-5">
                <div className="flex h-3 overflow-hidden rounded-full">
                  <div className="w-[68%] bg-[#00685f]" />
                  <div className="w-[32%] bg-[#bcc9c6]" />
                </div>
                <div className="mt-2 flex justify-between text-xs text-[#6f797a]">
                  <span>Mobile 68%</span>
                  <span>Desktop 32%</span>
                </div>
              </div>
            </div>

            {/* Timing trends — mini hourly ticks */}
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:col-span-2">
              <Clock className="h-5 w-5 text-[#00685f]" />
              <h3 className="mt-3 font-medium text-[#191c1e]">Timing trends</h3>
              <p className="mt-1 text-sm text-[#43474e]">
                Spot when your links get the most clicks, so you know when to
                post next.
              </p>
              <div className="mt-5 flex h-10 items-end gap-1">
                {[20, 25, 18, 30, 45, 60, 80, 95, 70, 50, 35, 22].map(
                  (h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-sm ${i === 7 ? "bg-[#00685f]" : "bg-[#e0e3e5]"}`}
                      style={{ height: `${h}%` }}
                    />
                  ),
                )}
              </div>
              <p className="mt-2 text-xs text-[#6f797a]">
                Peak activity around 7–8pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="border-t border-[#e0e3e5] bg-white px-4 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 items-center gap-12 sm:grid-cols-2">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00685f]/10">
                <ShieldCheck className="h-5 w-5 text-[#00685f]" />
              </div>
              <h2 className="font-heading mt-5 text-3xl font-medium text-[#191c1e]">
                Every link is checked before it goes live.
              </h2>
              <p className="mt-4 text-[#43474e]">
                SnapURL screens every submitted URL against a live phishing
                database and structural threat patterns before creating a short
                link — so links shared through SnapURL stay trustworthy for the
                people who click them.
              </p>

              <ul className="mt-6 flex flex-col gap-4">
                {[
                  {
                    icon: Shield,
                    title: "Phishing & malware screening",
                    desc: "Every URL is checked against a continuously updated threat database.",
                  },
                  {
                    icon: Lock,
                    title: "Encrypted end-to-end",
                    desc: "All traffic runs over HTTPS, with strict security headers on every page.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Abuse-resistant by design",
                    desc: "Rate limiting stops automated abuse before it starts.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#00685f]" />
                    <div>
                      <p className="font-medium text-[#191c1e]">{item.title}</p>
                      <p className="text-sm text-[#43474e]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual: a URL being scanned/approved */}
            <div className="relative overflow-hidden rounded-2xl border border-[#e0e3e5] bg-[#f7f9fb] p-8">
              <div className="relative overflow-hidden rounded-xl border border-[#e0e3e5] bg-white p-4">
                <p className="truncate font-mono text-sm text-[#43474e]">
                  https://example.com/some-link
                </p>
                <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-transparent via-[#00685f]/15 to-transparent" />
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-[#43474e] animate-check-1">
                <div className="h-2 w-2 rounded-full bg-[#00685f]" />
                Scanning against threat database
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#43474e] animate-check-2">
                <div className="h-2 w-2 rounded-full bg-[#00685f]" />
                Checking for suspicious patterns
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#00685f] animate-check-3">
                <Check className="h-4 w-4" />
                <span className="font-medium">Safe to shorten</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-[#e0e3e5] bg-white px-4 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-heading text-center text-3xl font-medium text-[#191c1e]">
            Why not just use Bitly?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-[#43474e]">
            Most link shorteners save the useful data for their paid tiers. We
            don&apos;t.
          </p>

          <div className="mt-14 overflow-hidden rounded-2xl border border-[#e0e3e5]">
            <div className="grid grid-cols-3 border-b border-[#e0e3e5] bg-[#f7f9fb]">
              <div className="px-6 py-4 text-sm text-[#6f797a]" />
              <div className="px-6 py-4 text-center">
                <span className="font-heading text-sm font-medium text-[#00685f]">
                  SnapURL
                </span>
              </div>
              <div className="px-6 py-4 text-center text-sm text-[#6f797a]">
                Typical shorteners
              </div>
            </div>

            {[
              {
                label: "Referrer, geo & device analytics",
                us: true,
                them: false,
              },
              { label: "Generous free tier", us: true, them: false },
              { label: "No forced upgrade wall", us: true, them: false },
              { label: "Simple, non-technical UI", us: true, them: true },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 transition-colors hover:bg-[#f7f9fb] ${
                  i !== 3 ? "border-b border-[#e0e3e5]" : ""
                }`}
              >
                <div className="px-6 py-4 text-sm text-[#191c1e]">
                  {row.label}
                </div>
                <div className="flex items-center justify-center bg-[#00685f]/4 px-6 py-4">
                  {row.us ? (
                    <Check className="h-5 w-5 text-[#00685f]" />
                  ) : (
                    <X className="h-5 w-5 text-[#ba1a1a]" />
                  )}
                </div>
                <div className="flex items-center justify-center px-6 py-4">
                  {row.them ? (
                    <Check className="h-5 w-5 text-[#6f797a]" />
                  ) : (
                    <X className="h-5 w-5 text-[#e0e3e5]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#e0e3e5] bg-[#f7f9fb] px-4 py-24">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-heading text-center text-3xl font-medium text-[#191c1e]">
            Frequently asked questions
          </h2>

          <div className="mt-12 flex flex-col divide-y divide-[#e0e3e5] rounded-2xl border border-[#e0e3e5] bg-white">
            {[
              {
                q: "Is it really free?",
                a: "Yes. Core analytics — referrer, geography, device, and timing — are free, with no artificial link caps.",
              },
              {
                q: "Do I need an account to shorten a link?",
                a: "No. Anyone can shorten a link instantly. You just need a free account to view its analytics.",
              },
              {
                q: "How is this different from Bitly?",
                a: "Bitly paywalls most useful analytics and limits free links heavily. SnapURL gives real analytics on the free tier from day one.",
              },
              {
                q: "Is my data safe?",
                a: "Every link is checked against a phishing blocklist before it's created, and all traffic runs over HTTPS.",
              },
              {
                q: "What happens if I try to shorten a malicious link?",
                a: "It's rejected immediately. We check every URL against a phishing database and block suspicious patterns before a link is ever created.",
              },
            ].map((item) => (
              <details key={item.q} className="group px-6 py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium text-[#191c1e]">
                  {item.q}
                  <Plus className="h-4 w-4 shrink-0 text-[#00685f] transition-transform duration-200 group-open:rotate-45" />
                </summary>
                <p className="mt-2 text-sm text-[#43474e]">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e0e3e5] bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#00685f]">
                  <span className="text-xs font-bold text-white">S</span>
                </div>
                <span className="font-heading font-medium text-[#191c1e]">
                  SnapURL
                </span>
              </div>
              <p className="mt-3 text-sm text-[#6f797a]">
                Real link analytics, free from day one.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[#191c1e]">Product</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[#6f797a]">
                <li>
                  <Link href="/signup" className="hover:text-[#00685f]">
                    Sign up
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-[#00685f]">
                    Log in
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[#191c1e]">Company</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[#6f797a]">
                <li>
                  <Link href="/about" className="hover:text-[#00685f]">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-[#191c1e]">Legal</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-[#6f797a]">
                <li>
                  <Link href="/terms" className="hover:text-[#00685f]">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-[#00685f]">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-[#e0e3e5] pt-6 text-sm text-[#6f797a]">
            © {new Date().getFullYear()} SnapURL. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
