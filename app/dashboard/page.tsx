"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Flame,
  Clock,
  DollarSign,
  Microscope,
  Briefcase,
} from "lucide-react";
import { useProfile } from "@/lib/useProfile";
import { getAllOpportunities } from "@/lib/opportunities";
import { scoreOpportunity } from "@/lib/matching";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { useSavedOpportunities } from "@/lib/useSavedOpportunities";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const { profile, loaded } = useProfile();
  const { isSaved, toggleSave } = useSavedOpportunities();
  const opportunities = useMemo(() => getAllOpportunities(), []);

  const scored = useMemo(
    () =>
      opportunities
        .map((o) => ({
          opp: o,
          match: scoreOpportunity(o, profile),
        }))
        .filter((r) => !r.match.disqualified)
        .sort((a, b) => b.match.score - a.match.score),
    [opportunities, profile]
  );

  const matchCount = scored.length;

  const totalAward = scored.reduce(
    (sum, r) => sum + (r.opp.award ?? 0),
    0
  );

  const researchCount = scored.filter(
    (r) => r.opp.category === "RESEARCH"
  ).length;

  const internshipCount = scored.filter(
    (r) => r.opp.category === "INTERNSHIP"
  ).length;

  const strongMatchCount = scored.filter(
    (r) => r.match.tier === "STRONG"
  ).length;

  // Read once on mount rather than during render, so the component stays a
  // pure function of props/state (Date.now() is impure).
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
  }, []);

  const upcomingDeadlines = opportunities
    .filter((o) => o.deadline)
    .sort(
      (a, b) =>
        new Date(a.deadline!).getTime() -
        new Date(b.deadline!).getTime()
    )
    .slice(0, 3);

  if (loaded && !profile.grade) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">
          Finish your profile first
        </h1>

        <p className="mt-2 text-ink-soft">
          Add your grade and interests so SCOUT can calculate personalized
          matches.
        </p>

        <Link href="/profile">
          <Button className="mt-6">Complete your profile</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        Welcome back{profile.displayName ? `, ${profile.displayName}` : ""} 👋
      </h1>

      <div className="mt-6 rounded-xl border border-line bg-white p-6">
        <p className="font-display text-lg font-semibold">
          {matchCount} opportunit
          {matchCount === 1 ? "y" : "ies"} match your profile
        </p>

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <Stat
            icon={Flame}
            label={`${strongMatchCount} strong matches`}
          />

          <Stat
            icon={Clock}
            label={`${upcomingDeadlines.length} deadlines coming up`}
          />

          <Stat
            icon={DollarSign}
            label={`$${totalAward.toLocaleString()} in scholarship opportunities`}
          />

          <Stat
            icon={Microscope}
            label={`${researchCount} research opportunities`}
          />

          <Stat
            icon={Briefcase}
            label={`${internshipCount} internships`}
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-display text-lg font-semibold">
            Recommended for you
          </h2>

          {matchCount > 4 && (
            <Link
              href="/explore?matches=profile"
              className="text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              View all {matchCount} matches →
            </Link>
          )}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {scored.slice(0, 4).map(({ opp, match }) => (
            <OpportunityCard
              key={opp.id}
              opportunity={opp}
              match={match}
              saved={isSaved(opp.id)}
              onSave={toggleSave}
            />
          ))}
        </div>

        {matchCount > 4 && (
          <div className="mt-5 text-center sm:hidden">
            <Link
              href="/explore?matches=profile"
              className="text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              View all {matchCount} matches →
            </Link>
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">
          Deadlines coming up
        </h2>

        <div className="mt-4 divide-y divide-line rounded-xl border border-line bg-white">
          {upcomingDeadlines.map((o) => {
            const days =
              now != null
                ? Math.ceil(
                    (new Date(o.deadline!).getTime() - now) /
                      (1000 * 60 * 60 * 24)
                  )
                : null;

            return (
              <Link
                key={o.id}
                href={`/explore/${o.id}`}
                className="flex items-center justify-between p-4 hover:bg-paper-dim"
              >
                <span className="font-medium text-ink">
                  {o.title}
                </span>

                <span className="text-sm text-muted">
                  {days == null
                    ? "…"
                    : days > 0
                    ? `${days} days`
                    : "Deadline passed"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-4 w-4 text-brass" />
      {label}
    </span>
  );
}