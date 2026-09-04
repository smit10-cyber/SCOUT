import Link from "next/link";
import { getAllOpportunities } from "@/lib/opportunities";
import VerificationBadge from "@/components/opportunity/VerificationBadge";

// TODO(auth): once NextAuth is wired up, gate this whole route in
// middleware.ts by checking `session.user.role === "ADMIN"` and
// redirecting everyone else — do not rely on hiding the nav link alone.
export default function AdminPage() {
  const opportunities = getAllOpportunities();
  const needsReview = opportunities.filter((o) => o.verificationStatus !== "VERIFIED");

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold tracking-tight">Admin</h1>
        <Link
          href="/admin/opportunities"
          className="rounded-lg bg-ink px-4 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          Manage opportunities
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total opportunities" value={opportunities.length} />
        <StatCard label="Need verification" value={needsReview.length} />
        <StatCard label="Open reports" value={0} />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Needs review</h2>
        <div className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
          {needsReview.map((o) => (
            <div key={o.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-medium text-ink">{o.title}</p>
                <p className="text-sm text-muted">{o.organization}</p>
              </div>
              <div className="flex items-center gap-3">
                <VerificationBadge status={o.verificationStatus} />
                <Link
                  href={`/admin/opportunities?edit=${o.id}`}
                  className="text-sm font-medium text-ink underline underline-offset-2"
                >
                  Review
                </Link>
              </div>
            </div>
          ))}
          {needsReview.length === 0 && (
            <p className="p-4 text-sm text-muted">Everything is verified. Nice.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-white p-5">
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
