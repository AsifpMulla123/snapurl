// import type { Metadata } from "next";
// import SignupForm from "@/components/SignupForm";

// export const metadata: Metadata = {
//   title: "Sign up — SnapURL",
//   description:
//     "Create a free SnapURL account to track referrers, location, and device data for every link you share.",
// };

// export default function SignupPage() {
//   return <SignupForm />;
// }

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Sign up — SnapURL",
  description:
    "Create a free SnapURL account to track referrers, location, and device data for every link you share.",
};

export default async function SignupPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <SignupForm />;
}
