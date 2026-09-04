"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useSavedOpportunities } from "@/lib/useSavedOpportunities";
import { getOpportunityById } from "@/lib/opportunities";

const STATUS_STYLE: Record<string, string> = {
  INTERESTED: "bg-paper-dim text-ink-soft",
  APPLYING: "bg-brass-soft text-[#8A6520]",
  SUBMITTED: "bg-[#EAE3F5] text-[#5B3E8C]",
  ACCEPTED: "bg-forest-soft text-forest",
  REJECTED: "bg-clay-soft text-clay",
};

export default function TrackerPage() {
  const { entries } = useSavedOpportunities();

  const rows = useMemo(() => {
    return entries
      .map((e) => ({ entry: e, opp: getOpportunityById(e.opportunityId) }))
      .filter((r) => r.opp)
      .sort((a, b) => {
        const da = a.opp!.deadline ? new Date(a.opp!.deadline).getTime() : Infinity;
        const db = b.opp!.deadline ? new Date(b.opp!.deadline).getTime() : Infinity;
        return da - db;
      });
  }, [entries]);

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">No applications tracked yet</h1>
        <p className="mt-2 text-ink-soft">
          Save an opportunity from Explore to start tracking it here.
        </p>
        <Link
          href="/explore"
          className="mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-ink-soft"
        >
          Explore opportunities
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Application tracker
      </h1>
      <p className="mt-2 text-ink-soft">Sorted by deadline, soonest first.</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper-dim text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Opportunity</th>
              <th className="px-4 py-3 font-medium">Deadline</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {rows.map(({ entry, opp }) => (
              <tr key={entry.opportunityId}>
                <td className="px-4 py-3">
                  <Link href={`/explore/${opp!.id}`} className="font-medium text-ink hover:underline">
                    {opp!.title}
                  </Link>
                  <p className="text-xs text-muted">{opp!.organization}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">
                  {opp!.deadline
                    ? new Date(opp!.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : opp!.deadlineNote ?? "TBD"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLE[entry.status]}`}
                  >
                    {entry.status.charAt(0) + entry.status.slice(1).toLowerCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
