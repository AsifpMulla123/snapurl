import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardNav from "@/components/DashboardNav";
import NewLinkForm from "@/components/NewLinkForm";
import DeleteLinkButton from "@/components/DeleteLinkButton";
import { Link2 } from "lucide-react";

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
    <>
      <DashboardNav />
      <main className="min-h-screen bg-[#f7f9fb] px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-heading text-2xl font-medium text-[#191c1e]">
                Your links
              </h1>
              <p className="mt-1 text-sm text-[#6f797a]">
                {links.length} {links.length === 1 ? "link" : "links"} tracked
              </p>
            </div>
            <NewLinkForm />
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#e0e3e5] bg-white">
            {links.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-16 text-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#00685f]/10">
                  <Link2 className="h-5 w-5 text-[#00685f]" />
                </div>
                <p className="font-medium text-[#191c1e]">No links yet</p>
                <p className="mt-1 max-w-xs text-sm text-[#6f797a]">
                  Create your first link above to start tracking clicks.
                </p>
              </div>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="border-b border-[#e0e3e5] bg-[#f7f9fb]">
                  <tr>
                    <th className="px-6 py-3 font-medium text-[#43474e]">
                      Short link
                    </th>
                    <th className="px-6 py-3 font-medium text-[#43474e]">
                      Destination
                    </th>
                    <th className="px-6 py-3 font-medium text-[#43474e]">
                      Clicks
                    </th>
                    <th className="px-6 py-3 font-medium text-[#43474e]">
                      Created
                    </th>
                    <th className="px-6 py-3 font-medium text-[#43474e]"></th>
                  </tr>
                </thead>
                <tbody>
                  {links.map((link) => (
                    <tr
                      key={link.id}
                      className="border-b border-[#e0e3e5] transition-colors last:border-0 hover:bg-[#f7f9fb]"
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
                      <td className="px-6 py-4 text-right">
                        <DeleteLinkButton linkId={link.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
