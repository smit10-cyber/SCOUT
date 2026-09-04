"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import CompassMark from "@/components/ui/CompassMark";
import { LinkButton } from "@/components/ui/Button";
import { getAuthSession, signOut } from "@/lib/auth";

const EXPLORE_LINKS = [
  { label: "All opportunities", href: "/explore" },
  { label: "Scholarships", href: "/explore?category=SCHOLARSHIP" },
  { label: "Internships", href: "/explore?category=INTERNSHIP" },
  { label: "Research", href: "/explore?category=RESEARCH" },
  { label: "Summer Programs", href: "/explore?category=SUMMER_PROGRAM" },
  { label: "Competitions", href: "/explore?category=COMPETITION" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    function syncAuth() {
      const session = getAuthSession();
      setSignedIn(Boolean(session));
      setDisplayName(
        typeof session?.user.user_metadata?.displayName === "string"
          ? session.user.user_metadata.displayName
          : ""
      );
    }

    syncAuth();
    window.addEventListener("scout-auth-change", syncAuth);
    return () => window.removeEventListener("scout-auth-change", syncAuth);
  }, []);

  async function handleSignOut() {
    await signOut();
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-ink">
          <CompassMark className="h-6 w-6 text-brass" />
          <span className="font-display text-lg font-semibold tracking-tight">SCOUT</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <div
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setExploreOpen((open) => !open)}
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink"
              aria-expanded={exploreOpen}
            >
              Explore <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {exploreOpen && (
              <div className="absolute left-0 top-full w-56 rounded-lg border border-line bg-white p-1.5 shadow-lg">
                {EXPLORE_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-paper-dim hover:text-ink">
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {signedIn && (
            <>
              <Link href="/dashboard" className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">Dashboard</Link>
              <Link href="/saved" className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">Saved</Link>
              <Link href="/tracker" className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">Tracker</Link>
            </>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {signedIn ? (
            <>
              <Link href="/profile" className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                {displayName ? `Hi, ${displayName}` : "Profile"}
              </Link>
              <button type="button" onClick={handleSignOut} className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                Sign out
              </button>
            </>
          ) : (
            <>
              <LinkButton href="/sign-in" variant="ghost" size="sm">Sign in</LinkButton>
              <LinkButton href="/sign-up" variant="primary" size="sm">Create account</LinkButton>
            </>
          )}
        </div>

        <button className="p-2 text-ink md:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-line bg-paper px-4 pb-4 md:hidden">
          <p className="pt-3 text-xs font-medium uppercase tracking-wide text-muted">Explore</p>
          {EXPLORE_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="block rounded-md px-2 py-2.5 text-sm text-ink-soft hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}

          {signedIn && (
            <>
              <p className="pt-3 text-xs font-medium uppercase tracking-wide text-muted">Your account</p>
              {[
                { label: "Dashboard", href: "/dashboard" },
                { label: "Saved", href: "/saved" },
                { label: "Application tracker", href: "/tracker" },
                { label: "Profile", href: "/profile" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block rounded-md px-2 py-2.5 text-sm text-ink-soft hover:bg-paper-dim" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <button type="button" onClick={handleSignOut} className="mt-2 w-full rounded-md px-2 py-2.5 text-left text-sm text-ink-soft hover:bg-paper-dim">
                Sign out
              </button>
            </>
          )}

          {!signedIn && (
            <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
              <LinkButton href="/sign-in" variant="secondary" size="sm">Sign in</LinkButton>
              <LinkButton href="/sign-up" variant="primary" size="sm">Create account</LinkButton>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
