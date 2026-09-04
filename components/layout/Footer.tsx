import Link from "next/link";
import CompassMark from "@/components/ui/CompassMark";

const COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "All opportunities", href: "/explore" },
      { label: "Scholarships", href: "/explore?category=SCHOLARSHIP" },
      { label: "Internships", href: "/explore?category=INTERNSHIP" },
      { label: "Research", href: "/explore?category=RESEARCH" },
      { label: "Capital Region, NY", href: "/explore?region=capital" },
    ],
  },
  {
    heading: "Account",
    links: [
      { label: "Sign in", href: "/sign-in" },
      { label: "Create account", href: "/sign-up" },
      { label: "Your profile", href: "/profile" },
      { label: "Saved opportunities", href: "/saved" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "How it works", href: "/how-it-works" },
      { label: "Report an opportunity", href: "/report" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 text-ink">
              <CompassMark className="h-6 w-6 text-brass" />
              <span className="font-display text-lg font-semibold">SCOUT</span>
            </div>
            <p className="mt-3 max-w-[22ch] text-sm text-muted">
              Opportunities built for you, not buried in a thousand tabs.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                {col.heading}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-ink hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SCOUT. Not affiliated with any listed organization.</p>
          <p>SCOUT is a discovery aid — always verify eligibility on the official source.</p>
        </div>
      </div>
    </footer>
  );
}
