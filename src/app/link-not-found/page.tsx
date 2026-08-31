import Link from "next/link";

export default function LinkNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb] px-4 text-center">
      <h1 className="text-2xl font-semibold text-[#191c1e] mb-2">
        Link not found
      </h1>
      <p className="text-[#43474e] mb-6">
        This link may have expired or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-[#00685f] px-6 py-3 font-medium text-white hover:bg-[#00544d]"
      >
        Go to SnapURL homepage
      </Link>
    </main>
  );
}
