import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import ClicksOverTimeChart from "@/components/ClicksOverTimeChart";
import BreakdownChart from "@/components/BreakdownChart";
import Link from "next/link";

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
    <main className="min-h-screen bg-[#f7f9fb] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/dashboard"
          className="text-sm text-[#00685f] hover:underline"
        >
          ← Back to dashboard
        </Link>

        <h1 className="mt-4 text-2xl font-semibold text-[#191c1e]">
          /{link.slug}
        </h1>
        <p className="mt-1 truncate text-sm text-[#43474e]">
          {link.originalUrl}
        </p>

        <div className="mt-8 rounded-xl border border-[#e0e3e5] bg-white p-6">
          <p className="text-sm text-[#43474e]">Total Clicks</p>
          <p className="mt-1 text-4xl font-semibold text-[#191c1e]">
            {totalClicks}
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-[#e0e3e5] bg-white p-6">
          <h2 className="mb-4 text-sm font-medium text-[#43474e]">
            Clicks over time
          </h2>
          {chartData.length === 0 ? (
            <p className="text-sm text-[#6f797a]">No clicks yet</p>
          ) : (
            <ClicksOverTimeChart data={chartData} />
          )}
        </div>
        <div className="mt-6 rounded-xl border border-[#e0e3e5] bg-white p-6">
          <h2 className="mb-4 text-sm font-medium text-[#43474e]">Referrers</h2>
          {Object.entries(referrerCounts).length === 0 ? (
            <p className="text-sm text-[#6f797a]">No clicks yet</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {Object.entries(referrerCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([source, count]) => (
                  <li
                    key={source}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-[#191c1e]">{source}</span>
                    <span className="text-[#43474e]">{count}</span>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-[#e0e3e5] bg-white p-6">
            <h2 className="mb-4 text-sm font-medium text-[#43474e]">
              Top countries
            </h2>
            {countryData.length === 0 ? (
              <p className="text-sm text-[#6f797a]">No clicks yet</p>
            ) : (
              <BreakdownChart data={countryData} />
            )}
          </div>

          <div className="rounded-xl border border-[#e0e3e5] bg-white p-6">
            <h2 className="mb-4 text-sm font-medium text-[#43474e]">Devices</h2>
            {deviceData.length === 0 ? (
              <p className="text-sm text-[#6f797a]">No clicks yet</p>
            ) : (
              <BreakdownChart data={deviceData} />
            )}
          </div>
        </div>
        
      </div>
    </main>
  );
}
