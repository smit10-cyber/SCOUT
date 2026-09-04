"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CompassMark from "@/components/ui/CompassMark";
import { sessionFromAccessToken } from "@/lib/auth";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    async function finish() {
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");
      const expiresIn = params.get("expires_in");
      const expiresAt = params.get("expires_at");

      if (!accessToken || !refreshToken) {
        setError("This confirmation link is missing a valid session. Please sign in manually.");
        return;
      }

      try {
        await sessionFromAccessToken(
          accessToken,
          refreshToken,
          expiresIn ? Number(expiresIn) : undefined,
          expiresAt ? Number(expiresAt) : undefined
        );
        router.replace("/profile");
      } catch (err) {
        setError(err instanceof Error ? err.message : "We couldn't finish confirming your account.");
      }
    }

    void finish();
  }, [router]);

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-24 text-center sm:px-6">
      <CompassMark className="h-8 w-8 text-brass" />
      {error ? (
        <>
          <h1 className="mt-4 font-display text-2xl font-semibold">Confirmation problem</h1>
          <p className="mt-2 text-sm text-muted">{error}</p>
        </>
      ) : (
        <>
          <h1 className="mt-4 font-display text-2xl font-semibold">Confirming your account…</h1>
          <p className="mt-2 text-sm text-muted">One moment while SCOUT signs you in.</p>
        </>
      )}
    </div>
  );
}
