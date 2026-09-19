import PublicNav from "@/components/PublicNav";

export const metadata = {
  title: "Privacy Policy — SnapURL",
  description: "How SnapURL collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <PublicNav />
      <main className="bg-white px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-medium text-[#191c1e]">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-[#5f6a6b]">
            Last updated: September 2026
          </p>

          <div className="mt-8 flex flex-col gap-6 text-[#43474e]">
            <section>
              <h2 className="font-medium text-[#191c1e]">1. What we collect</h2>
              <p className="mt-2 text-sm">
                When you create an account, we collect your name, email, and a
                securely hashed password. When you create a short link, we store
                the destination URL and the slug. When someone clicks a short
                link, we log the referrer, an approximate location (derived from
                IP address), device type, browser, and timestamp — this is the
                analytics data shown to the link&apos;s owner.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">2. How we use it</h2>
              <p className="mt-2 text-sm">
                Click data is used solely to power the analytics dashboard shown
                to the account that created the link. We do not sell or share
                this data with third parties for advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">3. Data security</h2>
              <p className="mt-2 text-sm">
                Passwords are securely hashed, never stored in plain text. All
                traffic is encrypted over HTTPS. Submitted URLs are screened
                against known threat sources before a link is created.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">
                4. Third-party services
              </h2>
              <p className="mt-2 text-sm">
                We use third-party infrastructure providers (hosting, database,
                caching, and IP-based geolocation) to operate SnapURL. These
                providers process data only as needed to deliver the service.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">5. Your choices</h2>
              <p className="mt-2 text-sm">
                You can delete any link you own at any time, which removes its
                associated click data. You can stop using SnapURL at any time.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">6. Contact</h2>
              <p className="mt-2 text-sm">
                Questions about this policy? Reach out via the contact
                information on our homepage.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
