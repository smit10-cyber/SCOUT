"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CompassMark from "@/components/ui/CompassMark";
import { Button } from "@/components/ui/Button";
import { signIn } from "@/lib/auth";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await signIn(email.trim().toLowerCase(), password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't sign you in. Check your email and password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-16 sm:px-6">
      <CompassMark className="h-8 w-8 text-brass" />
      <h1 className="mt-4 font-display text-2xl font-semibold">Sign in to SCOUT</h1>
      <p className="mt-1.5 text-center text-sm text-muted">
        Sign in to access your profile, saved opportunities, and application tracker.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            placeholder="Your password"
            className={inputClass}
            required
          />
        </label>

        {error && <p className="rounded-lg bg-clay-soft px-3 py-2.5 text-sm text-clay">{error}</p>}

        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-ink underline underline-offset-2">
          Create one
        </Link>
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink/40 focus:outline-none";
