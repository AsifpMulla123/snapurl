// import type { Metadata } from "next";
// import LoginForm from "@/components/LoginForm";

// export const metadata: Metadata = {
//   title: "Log in — SnapURL",
//   description: "Log in to your SnapURL account to view your link analytics.",
// };

// export default function LoginPage() {
//   return <LoginForm />;
// }

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log in — SnapURL",
  description: "Log in to your SnapURL account to view your link analytics.",
};

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
}
