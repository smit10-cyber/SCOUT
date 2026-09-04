"use client";

import { useMemo } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useSavedOpportunities } from "@/lib/useSavedOpportunities";
import { getOpportunityById } from "@/lib/opportunities";
import { SavedStatus } from "@/types";
import VerificationBadge from "@/components/opportunity/VerificationBadge";

const STATUSES: { key: SavedStatus; label: string }[] = [
  { key: "INTERESTED", label: "Interested" },
  { key: "APPLYING", label: "Applying" },
  { key: "SUBMITTED", label: "Submitted" },
  { key: "ACCEPTED", label: "Accepted" },
  { key: "REJECTED", label: "Rejected" },
];

export default function SavedPage() {
  const { entries, setStatus, remove } = useSavedOpportunities();

  const grouped = useMemo(() => {
    const map = new Map<SavedStatus, typeof entries>();
    STATUSES.forEach((s) => map.set(s.key, []));
    entries.forEach((e) => map.get(e.status)?.push(e));
    return map;
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">Nothing saved yet</h1>
        <p className="mt-2 text-ink-soft">
          Opportunities you save while exploring will show up here, organized by status.
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
      <h1 className="font-display text-3xl font-semibold tracking-tight">Saved</h1>
      <p className="mt-2 text-ink-soft">Organize your saved opportunities by where you are.</p>

      <div className="mt-8 space-y-10">
        {STATUSES.map((status) => {
          const items = grouped.get(status.key) ?? [];
          if (items.length === 0) return null;
          return (
            <div key={status.key}>
              <h2 className="font-display text-lg font-semibold">
                {status.label} <span className="text-muted">({items.length})</span>
              </h2>
              <div className="mt-3 divide-y divide-line rounded-xl border border-line bg-white">
                {items.map((entry) => {
                  const opp = getOpportunityById(entry.opportunityId);
                  if (!opp) return null;
                  return (
                    <div
                      key={entry.opportunityId}
                      className="flex flex-wrap items-center justify-between gap-3 p-4"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/explore/${opp.id}`}
                          className="font-medium text-ink hover:underline"
                        >
                          {opp.title}
                        </Link>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                          <span>{opp.organization}</span>
                          <VerificationBadge status={opp.verificationStatus} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={entry.status}
                          onChange={(e) =>
                            setStatus(entry.opportunityId, e.target.value as SavedStatus)
                          }
                          className="rounded-md border border-line bg-white px-2.5 py-1.5 text-sm text-ink-soft focus:border-ink/40 focus:outline-none"
                        >
                          {STATUSES.map((s) => (
                            <option key={s.key} value={s.key}>
                              {s.label}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => remove(entry.opportunityId)}
                          aria-label="Remove from saved"
                          className="rounded-md p-1.5 text-muted hover:bg-paper-dim hover:text-clay"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
