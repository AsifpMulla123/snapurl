import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import ClicksOverTimeChart from "@/components/ClicksOverTimeChart";
import BreakdownChart from "@/components/BreakdownChart";
import { ArrowLeft, TrendingUp, Globe, Smartphone, Link2 } from "lucide-react";

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LinkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { slug } = await params;

  const link = await prisma.link.findUnique({
    where: { slug },
    include: {
      clickEvents: true,
    },
  });

  if (!link || link.userId !== session.user.id) {
    notFound();
  }

  const totalClicks = link.clickEvents.length;

  const referrerCounts: Record<string, number> = {};
  for (const event of link.clickEvents) {
    const source = event.referrer
      ? new URL(event.referrer).hostname.replace("www.", "")
      : "Direct";
    referrerCounts[source] = (referrerCounts[source] || 0) + 1;
  }

  const clicksByDate: Record<string, number> = {};
  for (const event of link.clickEvents) {
    const dateKey = event.timestamp.toISOString().split("T")[0];
    clicksByDate[dateKey] = (clicksByDate[dateKey] || 0) + 1;
  }
  const chartData = Object.entries(clicksByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, clicks]) => ({ date, clicks }));

  const countryCounts: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  for (const event of link.clickEvents) {
    const country = event.country || "Unknown";
    countryCounts[country] = (countryCounts[country] || 0) + 1;

    const device = event.device || "Unknown";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;
  }
  const countryData = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
  const deviceData = Object.entries(deviceCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

  return (
    <>
      <DashboardNav />
      <main className="min-h-screen bg-[#f7f9fb] px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-[#00685f] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <div className="mt-4 flex items-baseline gap-3">
            <h1 className="font-heading text-2xl font-medium text-[#191c1e]">
              /{link.slug}
            </h1>
          </div>
          <p className="mt-1 truncate text-sm text-[#43474e]">
            {link.originalUrl}
          </p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-[#e0e3e5] bg-white p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm text-[#43474e]">
              <TrendingUp className="h-4 w-4 text-[#00685f]" />
              Total Clicks
            </div>
            <p className="font-heading mt-2 text-5xl font-medium text-[#191c1e] sm:text-6xl">
              {totalClicks}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-[#e0e3e5] bg-white p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#43474e]">
              <TrendingUp className="h-4 w-4 text-[#00685f]" />
              Clicks over time
            </div>
            {chartData.length === 0 ? (
              <p className="text-sm text-[#5f6a6b]">No clicks yet</p>
            ) : (
              <ClicksOverTimeChart data={chartData} />
            )}
          </div>

          <div className="mt-6 rounded-2xl border border-[#e0e3e5] bg-white p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#43474e]">
              <Link2 className="h-4 w-4 text-[#00685f]" />
              Referrers
            </div>
            {Object.entries(referrerCounts).length === 0 ? (
              <p className="text-sm text-[#5f6a6b]">No clicks yet</p>
            ) : (
              <ul className="flex flex-col gap-3">
                {Object.entries(referrerCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([source, count]) => {
                    const pct = Math.round((count / totalClicks) * 100);
                    return (
                      <li key={source} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-[#191c1e]">{source}</span>
                          <span className="text-[#43474e]">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[#eceef0]">
                          <div
                            className="h-1.5 rounded-full bg-[#00685f]"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </li>
                    );
                  })}
              </ul>
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#e0e3e5] bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#43474e]">
                <Globe className="h-4 w-4 text-[#00685f]" />
                Top countries
              </div>
              {countryData.length === 0 ? (
                <p className="text-sm text-[#5f6a6b]">No clicks yet</p>
              ) : (
                <BreakdownChart data={countryData} />
              )}
            </div>

            <div className="rounded-2xl border border-[#e0e3e5] bg-white p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-[#43474e]">
                <Smartphone className="h-4 w-4 text-[#00685f]" />
                Devices
              </div>
              {deviceData.length === 0 ? (
                <p className="text-sm text-[#5f6a6b]">No clicks yet</p>
              ) : (
                <BreakdownChart data={deviceData} />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
