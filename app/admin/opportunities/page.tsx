"use client";

import { useState } from "react";
import { getAllOpportunities } from "@/lib/opportunities";
import VerificationBadge from "@/components/opportunity/VerificationBadge";
import { VerificationStatus } from "@/types";
import { Button } from "@/components/ui/Button";

// NOTE: This edits an in-memory copy only. Once Prisma is connected, these
// actions become POST/PATCH/DELETE calls to /api/admin/opportunities and the
// list is refetched (or updated optimistically) instead of held in state.
export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState(getAllOpportunities());

  function setVerification(id: string, status: VerificationStatus) {
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, verificationStatus: status, lastVerifiedAt: new Date().toISOString() }
          : o
      )
    );
  }

  function remove(id: string) {
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Manage opportunities
        </h1>
        <Button disabled title="Wire up once the Opportunity API route exists">
          + Add opportunity
        </Button>
      </div>
      <p className="mt-2 text-sm text-muted">
        Changes here are local to this session — connect the Opportunity API routes to persist
        them.
      </p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-line bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-line bg-paper-dim text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {opportunities.map((o) => (
              <tr key={o.id}>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{o.title}</p>
                  <p className="text-xs text-muted">{o.organization}</p>
                </td>
                <td className="px-4 py-3 text-ink-soft">{o.category}</td>
                <td className="px-4 py-3">
                  <VerificationBadge status={o.verificationStatus} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <select
                      value={o.verificationStatus}
                      onChange={(e) => setVerification(o.id, e.target.value as VerificationStatus)}
                      className="rounded-md border border-line bg-white px-2 py-1.5 text-xs"
                    >
                      <option value="VERIFIED">Verified</option>
                      <option value="NEEDS_VERIFICATION">Needs verification</option>
                      <option value="EXPIRED">Expired</option>
                    </select>
                    <button
                      onClick={() => remove(o.id)}
                      className="text-xs font-medium text-clay hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
