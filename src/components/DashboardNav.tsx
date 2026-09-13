"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function DashboardNav() {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <nav className="border-b border-[#e0e3e5] bg-white px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00685f]">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="font-semibold text-[#191c1e]">SnapURL</span>
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-[#e0e3e5] px-4 py-2 text-sm font-medium text-[#43474e] transition-colors hover:bg-[#f7f9fb]"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
