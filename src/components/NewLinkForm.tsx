"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLinkForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalUrl: url }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    setUrl("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste a URL to shorten"
        className="w-64 rounded-lg border border-[#e0e3e5] bg-white px-4 py-2 text-sm text-[#191c1e] outline-none focus:border-[#00685f] focus:ring-2 focus:ring-[#00685f]/10"
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-[#00685f] px-4 py-2 text-sm font-medium text-white hover:bg-[#00544d] disabled:opacity-50"
      >
        {loading ? "Creating..." : "+ New Link"}
      </button>
      {error && (
        <p className="ml-2 self-center text-sm text-[#ba1a1a]">{error}</p>
      )}
    </form>
  );
}
