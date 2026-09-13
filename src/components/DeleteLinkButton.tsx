"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteLinkButton({ linkId }: { linkId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this link? This cannot be undone.",
    );
    if (!confirmed) return;

    setLoading(true);
    await fetch(`/api/links/${linkId}`, { method: "DELETE" });
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-sm text-[#ba1a1a] hover:underline disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}
