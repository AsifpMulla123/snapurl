import Link from "next/link";

export default function PublicNav() {
  return (
    <nav className="border-b border-[#e0e3e5] bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00685f]">
            <span className="text-sm font-bold text-white">S</span>
          </div>
          <span className="font-semibold text-[#191c1e]">SnapURL</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-[#43474e] hover:bg-[#f7f9fb]"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#00685f] px-4 py-2 text-sm font-medium text-white hover:bg-[#00544d]"
          >
            Sign up free
          </Link>
        </div>
      </div>
    </nav>
  );
}
