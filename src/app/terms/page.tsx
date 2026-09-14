import PublicNav from "@/components/PublicNav";

export default function TermsPage() {
  return (
    <>
      <PublicNav />
      <main className="bg-white px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-heading text-3xl font-medium text-[#191c1e]">
            Terms of Service
          </h1>
          <p className="mt-2 text-sm text-[#6f797a]">
            Last updated: September 2026
          </p>

          <div className="mt-8 flex flex-col gap-6 text-[#43474e]">
            <section>
              <h2 className="font-medium text-[#191c1e]">1. Using SnapURL</h2>
              <p className="mt-2 text-sm">
                SnapURL lets you shorten URLs and view analytics about clicks on
                those links. You may use the service as long as you comply with
                these terms.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">2. Acceptable use</h2>
              <p className="mt-2 text-sm">
                You may not use SnapURL to create links to content that is
                illegal, fraudulent, phishing, malware, or otherwise harmful. We
                screen submitted URLs against known threat sources and reserve
                the right to remove or block any link at our discretion.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">3. Accounts</h2>
              <p className="mt-2 text-sm">
                You&apos;re responsible for keeping your account credentials
                secure. You must provide accurate information when creating an
                account.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">
                4. Service availability
              </h2>
              <p className="mt-2 text-sm">
                SnapURL is provided on an &quot;as is&quot; basis. We aim for
                high availability but do not guarantee uninterrupted service,
                and are not liable for losses resulting from downtime.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">5. Changes</h2>
              <p className="mt-2 text-sm">
                We may update these terms as the product evolves. Continued use
                of SnapURL after changes means you accept the updated terms.
              </p>
            </section>

            <section>
              <h2 className="font-medium text-[#191c1e]">6. Contact</h2>
              <p className="mt-2 text-sm">
                Questions about these terms? Reach out via the contact
                information on our homepage.
              </p>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
