"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  MapPin,
  Calendar,
  DollarSign,
  Bookmark,
  Clock3,
} from "lucide-react";
import { Opportunity, CATEGORY_LABELS } from "@/types";
import { MatchResult } from "@/lib/matching";
import { CATEGORY_STYLE } from "@/lib/category-style";
import MatchBadge from "./MatchBadge";
import { Button } from "@/components/ui/Button";

function formatDeadline(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function OpportunityCard({
  opportunity,
  match,
  onSave,
  saved = false,
}: {
  opportunity: Opportunity;
  match?: MatchResult;
  onSave?: (id: string) => void;
  saved?: boolean;
}) {
  const router = useRouter();
  const style = CATEGORY_STYLE[opportunity.category];
  const metReasons = match?.reasons.filter((r) => r.met).slice(0, 3) ?? [];

  return (
    <div className="lift-on-hover group relative flex flex-col rounded-2xl border border-line bg-white p-5">
      {opportunity.isDemoData ? (
        <span className="absolute right-4 top-4 rounded-full bg-paper-dim px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted">
          Demo data
        </span>
      ) : opportunity.regionTag ? (
        <span className="absolute right-4 top-4 rounded-full bg-brass-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#8A6520]">
          {opportunity.regionTag}
        </span>
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
          >
            <span aria-hidden>{style.emoji}</span>
            {CATEGORY_LABELS[opportunity.category]}
          </span>
          <Link
            href={`/explore/${opportunity.id}`}
            className="mt-2 block font-display text-base font-semibold leading-snug text-ink hover:underline"
          >
            {opportunity.title}
          </Link>
          <p className="mt-1 text-sm text-muted">{opportunity.organization}</p>
        </div>
        {match && <MatchBadge score={match.score} tier={match.tier} />}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-soft">
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          {opportunity.remote === "REMOTE" ? "Remote" : opportunity.location ?? "—"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GraduationCap className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          Grades {opportunity.gradeMin}–{opportunity.gradeMax}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <DollarSign className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          {opportunity.cost === "FREE"
            ? "Free"
            : opportunity.costAmount != null
            ? `$${opportunity.costAmount}`
            : "Paid (see official page)"}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted" strokeWidth={2} />
          {formatDeadline(opportunity.deadline)
            ? `Due ${formatDeadline(opportunity.deadline)}`
            : "Deadline TBD"}
        </span>
      </div>

      {opportunity.availabilityWindow && (
        <p className="mt-2.5 inline-flex items-start gap-1.5 rounded-lg bg-sky-soft px-2.5 py-1.5 text-xs text-[#1F4E7A]">
          <Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {opportunity.availabilityWindow}
        </p>
      )}

      {metReasons.length > 0 && (
        <div className="mt-3 border-t border-line pt-3">
          <p className="text-xs font-medium text-muted">Why you match</p>
          <ul className="mt-1.5 space-y-1">
            {metReasons.map((r) => (
              <li key={r.label} className="flex items-start gap-1.5 text-sm text-ink-soft">
                <span className="mt-0.5 text-forest">✓</span>
                {r.label}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button
          size="sm"
          variant="primary"
          onClick={() => router.push(`/explore/${opportunity.id}`)}
        >
          View opportunity
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => onSave?.(opportunity.id)}
          aria-pressed={saved}
        >
          <Bookmark
            className="h-3.5 w-3.5"
            strokeWidth={2}
            fill={saved ? "currentColor" : "none"}
          />
          {saved ? "Saved" : "Save"}
        </Button>
      </div>
    </div>
  );
}
