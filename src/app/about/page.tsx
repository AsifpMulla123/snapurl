import Link from "next/link";
import PublicNav from "@/components/PublicNav";

export const metadata = {
  title: "About — SnapURL",
  description: "Why we built SnapURL and who it's for.",
};
export default function AboutPage() {
  return (
    <>
      <PublicNav />
      <main className="bg-white px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-medium text-[#191c1e]">
            About SnapURL
          </h1>
          <div className="mt-6 flex flex-col gap-4 text-[#43474e]">
            <p>
              SnapURL started from a simple frustration: existing link
              shorteners either hide the useful data behind a paywall, or limit
              how many links you can create on a free plan until it&apos;s
              barely usable.
            </p>
            <p>
              We built SnapURL for indie developers and creators who share links
              constantly — on Twitter, LinkedIn, in newsletters — and want to
              know what actually happens after someone clicks. Referrer,
              location, device, and timing data, free from your very first link.
            </p>
            <p>
              SnapURL is an independent, actively developed project. If you run
              into an issue or have feedback, we&apos;d genuinely like to hear
              it.
            </p>
          </div>

          <Link
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-[#00685f] px-6 py-3 font-medium text-white hover:bg-[#00544d]"
          >
            Get started free
          </Link>
        </div>
      </main>
    </>
  );
}
