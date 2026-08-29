"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<{ slug: string } | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setResult(data);
      }
    } catch {
      setError("Could not reach the server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb] px-4">
      <h1 className="text-4xl font-semibold text-[#191c1e] mb-2">
        See who clicks your links.
      </h1>
      <p className="text-[#43474e] mb-8">
        Shorten, track, and understand your audience — for free.
      </p>

      <form onSubmit={handleSubmit} className="flex w-full max-w-xl gap-2">
        <input
          type="url"
          required
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here"
          className="flex-1 rounded-lg border border-[#e0e3e5] bg-white px-4 py-3 text-[#191c1e] outline-none focus:border-[#00685f]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-[#00685f] px-6 py-3 font-medium text-white hover:bg-[#00544d] disabled:opacity-50"
        >
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>

      {error && <p className="mt-4 text-[#ba1a1a]">{error}</p>}

      {result && (
        <div className="mt-6 w-full max-w-xl rounded-lg border border-[#e0e3e5] bg-white p-4">
          <p className="text-sm text-[#43474e] mb-1">Your short link</p>
          <p className="text-lg font-medium text-[#00685f]">
            snapurl.co/{result.slug}
          </p>
          <p className="mt-3 text-sm text-[#43474e]">
            Sign up to see who&apos;s clicking this
          </p>
        </div>
      )}
    </main>
  );
}
