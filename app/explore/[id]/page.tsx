import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  DollarSign,
  GraduationCap,
  Clock,
  Clock3,
  FileText,
  ExternalLink,
  Flag,
} from "lucide-react";
import { getOpportunityById, getAllOpportunities } from "@/lib/opportunities";
import VerificationBadge from "@/components/opportunity/VerificationBadge";
import { LinkButton } from "@/components/ui/Button";

export function generateStaticParams() {
  return getAllOpportunities().map((o) => ({ id: o.id }));
}

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opp = getOpportunityById(id);
  if (!opp) notFound();

  const eligibilityTier =
    opp.verificationStatus === "EXPIRED"
      ? { label: "Likely Not Eligible — Expired", dot: "🔴" }
      : opp.gpaRequirement
      ? { label: "Review Requirements", dot: "🟡" }
      : { label: "Strong Match Potential", dot: "🟢" };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/explore" className="text-sm text-ink-soft hover:text-ink hover:underline">
        ← Back to Explore
      </Link>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <VerificationBadge status={opp.verificationStatus} />
        {opp.isDemoData && (
          <span className="rounded-full bg-paper-dim px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-muted">
            Demo data — for development preview only
          </span>
        )}
        {opp.regionTag && !opp.isDemoData && (
          <span className="rounded-full bg-brass-soft px-2.5 py-1 text-xs font-medium text-[#8A6520]">
            {opp.regionTag}
          </span>
        )}
      </div>

      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight">{opp.title}</h1>
      <p className="mt-1.5 text-lg text-ink-soft">{opp.organization}</p>

      <div className="mt-6 rounded-xl border border-line bg-white p-5">
        <p className="text-sm font-semibold">
          {eligibilityTier.dot} {eligibilityTier.label}
        </p>
        <p className="mt-1.5 text-sm text-muted">
          This is a guide, not a guarantee — always confirm eligibility and requirements on the
          official application before applying.
        </p>
      </div>

      {opp.availabilityWindow && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-line bg-sky-soft/60 p-4">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-sky" strokeWidth={2} />
          <div>
            <p className="text-sm font-semibold text-ink">When</p>
            <p className="mt-0.5 text-sm text-ink-soft">{opp.availabilityWindow}</p>
          </div>
        </div>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Fact icon={GraduationCap} label="Grades" value={`${opp.gradeMin}–${opp.gradeMax}`} />
        <Fact
          icon={MapPin}
          label="Location"
          value={opp.remote === "REMOTE" ? "Remote" : opp.location ?? "—"}
        />
        <Fact
          icon={DollarSign}
          label="Cost"
          value={
            opp.cost === "FREE"
              ? "Free"
              : opp.costAmount != null
              ? `$${opp.costAmount}`
              : "Paid — amount not published"
          }
        />
        <Fact
          icon={Calendar}
          label="Deadline"
          value={formatDate(opp.deadline) ?? opp.deadlineNote ?? "TBD"}
        />
        {opp.durationText && <Fact icon={Clock} label="Duration" value={opp.durationText} />}
        {opp.award != null && (
          <Fact icon={DollarSign} label="Award" value={`$${opp.award.toLocaleString()}`} />
        )}
      </div>

      <Section title="About this opportunity">
        <p className="text-ink-soft">{opp.description}</p>
      </Section>

      <Section title="Eligibility">
        <p className="text-ink-soft">{opp.eligibilityText}</p>
        {opp.gpaRequirement != null && (
          <p className="mt-2 text-sm text-ink-soft">
            <strong>Minimum GPA:</strong> {opp.gpaRequirement.toFixed(1)}
          </p>
        )}
      </Section>

      {opp.requiredMaterials.length > 0 && (
        <Section title="Required materials">
          <ul className="list-inside list-disc space-y-1 text-ink-soft">
            {opp.requiredMaterials.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Section>
      )}

      {opp.applicationProcessText && (
        <Section title="How to apply">
          <p className="text-ink-soft">{opp.applicationProcessText}</p>
        </Section>
      )}

      <Section title="Verification">
        <div className="flex items-center gap-2 text-sm text-ink-soft">
          <FileText className="h-4 w-4 text-muted" />
          {opp.lastVerifiedAt
            ? `Information last checked against the official source on ${formatDate(opp.lastVerifiedAt)}.`
            : "Not yet verified against the official source."}
        </div>
        {opp.sourceUrl && (
          <a
            href={opp.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 text-sm text-ink underline underline-offset-2"
          >
            View official source <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </Section>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <LinkButton href={opp.officialUrl} external variant="primary">
          Go to official application <ExternalLink className="h-4 w-4" />
        </LinkButton>
        <LinkButton href="/saved" variant="secondary">
          Save opportunity
        </LinkButton>
      </div>

      <button className="mt-8 flex items-center gap-1.5 text-sm text-muted hover:text-clay">
        <Flag className="h-3.5 w-3.5" />
        Report incorrect information
      </button>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-line bg-white p-3.5">
      <div className="flex items-center gap-1.5 text-xs text-muted">
        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
        {label}
      </div>
      <p className="mt-1 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8 border-t border-line pt-6">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-2.5 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
