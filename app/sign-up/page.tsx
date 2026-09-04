"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CompassMark from "@/components/ui/CompassMark";
import { Button } from "@/components/ui/Button";
import { signUp } from "@/lib/auth";
import { BLANK_PROFILE } from "@/lib/useProfile";

export default function SignUpPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");

    const name = displayName.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!name) return setError("Please enter your name.");
    if (!normalizedEmail) return setError("Please enter your email address.");
    if (password.length < 8) return setError("Your password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setBusy(true);
    try {
      const profile = { ...BLANK_PROFILE, displayName: name };
      const { session } = await signUp(normalizedEmail, password, name, profile);
      window.localStorage.setItem("scout:profile", JSON.stringify(profile));

      if (session) {
        router.push("/profile");
      } else {
        setMessage("Account created. Check your email to confirm your account, then sign in.");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn't create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-16 sm:px-6">
      <CompassMark className="h-8 w-8 text-brass" />
      <h1 className="mt-4 font-display text-2xl font-semibold">Create your SCOUT account</h1>
      <p className="mt-1.5 text-center text-sm text-muted">
        Save opportunities, build your profile, and keep track of applications in one place.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Display name</span>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            autoComplete="name"
            placeholder="Your name"
            className={inputClass}
            required
          />
        </label>
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
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={inputClass}
            minLength={8}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink-soft">Confirm password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            className={inputClass}
            minLength={8}
            required
          />
        </label>

        {error && <p className="rounded-lg bg-clay-soft px-3 py-2.5 text-sm text-clay">{error}</p>}
        {message && <p className="rounded-lg bg-forest-soft px-3 py-2.5 text-sm text-forest">{message}</p>}

        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-ink underline underline-offset-2">
          Sign in
        </Link>
      </p>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink/40 focus:outline-none";
