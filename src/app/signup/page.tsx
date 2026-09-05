"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Something went wrong");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#f7f9fb] to-[#eef2f3] px-4">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#00685f]">
            <span className="text-lg font-bold text-white">S</span>
          </div>
          <h1 className="text-2xl font-semibold text-[#191c1e]">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-[#6f797a]">
            Start tracking your links in seconds
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#e0e3e5] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full rounded-lg border border-[#e0e3e5] bg-white px-4 py-2.5 text-[#191c1e] outline-none transition-colors focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-[#e0e3e5] bg-white px-4 py-2.5 text-[#191c1e] outline-none transition-colors focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-[#191c1e]">
                Password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-[#e0e3e5] bg-white px-4 py-2.5 text-[#191c1e] outline-none transition-colors focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-[#ffdad6] px-3 py-2 text-sm text-[#ba1a1a]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-lg bg-[#00685f] px-6 py-2.5 font-medium text-white transition-colors hover:bg-[#00544d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-[#6f797a]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-[#00685f] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
