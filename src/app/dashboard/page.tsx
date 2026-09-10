import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import NewLinkForm from "@/components/NewLinkForm";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const links = await prisma.link.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { clickEvents: true },
      },
    },
  });

  return (
    <main className="min-h-screen bg-[#f7f9fb] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#191c1e]">Your links</h1>
          <NewLinkForm />
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e0e3e5] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#e0e3e5] bg-[#f7f9fb]">
              <tr>
                <th className="px-6 py-3 font-medium text-[#43474e]">
                  Short link
                </th>
                <th className="px-6 py-3 font-medium text-[#43474e]">
                  Destination
                </th>
                <th className="px-6 py-3 font-medium text-[#43474e]">Clicks</th>
                <th className="px-6 py-3 font-medium text-[#43474e]">
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr
                  key={link.id}
                  className="border-b border-[#e0e3e5] last:border-0 hover:bg-[#f7f9fb]"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/dashboard/${link.slug}`}
                      className="font-medium text-[#00685f] hover:underline"
                    >
                      /{link.slug}
                    </Link>
                  </td>
                  <td className="max-w-xs truncate px-6 py-4 text-[#43474e]">
                    {link.originalUrl}
                  </td>
                  <td className="px-6 py-4 text-[#191c1e]">
                    {link._count.clickEvents}
                  </td>
                  <td className="px-6 py-4 text-[#43474e]">
                    {link.createdAt.toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {links.length === 0 && (
            <p className="px-6 py-10 text-center text-[#6f797a]">
              You haven&apos;t created any links yet.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
