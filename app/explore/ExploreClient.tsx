"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Opportunity, StudentProfile, Category } from "@/types";
import { scoreOpportunity } from "@/lib/matching";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import FilterPanel, { EMPTY_FILTERS, Filters } from "@/components/opportunity/FilterPanel";
import { CAPITAL_REGION_TAG } from "@/lib/opportunities";
import { useSavedOpportunities } from "@/lib/useSavedOpportunities";

const BLANK_PROFILE: StudentProfile = {
  displayName: "",
  grade: null,
  state: null,
  country: null,
  gpa: null,
  academicInterests: [],
  careerInterests: [],
  preferredCategories: [],
  preferredLocation: null,
  remotePreference: "NO_PREFERENCE",
  hasPriorExperience: false,
};

export default function ExploreClient({ opportunities }: { opportunities: Opportunity[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") as Category | null;
  const initialRegion = searchParams.get("region");

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>({
    ...EMPTY_FILTERS,
    categories: initialCategory ? [initialCategory] : [],
    capitalRegionOnly: initialRegion === "capital",
  });
  const [showFilters, setShowFilters] = useState(false);
  const { isSaved, toggleSave } = useSavedOpportunities();
  const [previewGrade, setPreviewGrade] = useState<number | "">("");

  const profile: StudentProfile | null = previewGrade
    ? { ...BLANK_PROFILE, grade: Number(previewGrade), hasPriorExperience: true }
    : null;

  const filtered = useMemo(() => {
    return opportunities.filter((o) => {
      if (query) {
        const q = query.toLowerCase();
        const haystack = `${o.title} ${o.organization} ${o.tags.join(" ")} ${o.category} ${o.location ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      if (filters.categories.length && !filters.categories.includes(o.category)) return false;
      if (filters.grade && !(filters.grade >= o.gradeMin && filters.grade <= o.gradeMax))
        return false;
      if (filters.remoteOnly && o.remote === "IN_PERSON") return false;
      if (filters.freeOnly && o.cost !== "FREE") return false;
      if (filters.noExperienceOnly && o.experienceRequired !== "NONE") return false;
      if (filters.capitalRegionOnly && o.regionTag !== CAPITAL_REGION_TAG) return false;
      return true;
    });
  }, [opportunities, query, filters]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Explore opportunities
        </h1>
        <p className="mt-2 text-ink-soft">
          Search and filter scholarships, internships, research, and more — including
          opportunities local to the Capital Region.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, organization, subject, or location…"
            className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-muted focus:border-ink/40 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={previewGrade}
            onChange={(e) => setPreviewGrade(e.target.value ? Number(e.target.value) : "")}
            className="rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink-soft focus:border-ink/40 focus:outline-none"
            aria-label="Preview match score for grade"
          >
            <option value="">See match score…</option>
            <option value={9}>I&apos;m in grade 9</option>
            <option value={10}>I&apos;m in grade 10</option>
            <option value={11}>I&apos;m in grade 11</option>
            <option value={12}>I&apos;m in grade 12</option>
          </select>

          <button
            onClick={() => setShowFilters((s) => !s)}
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm font-medium text-ink-soft hover:border-ink/40 md:hidden"
          >
            {showFilters ? <X className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
            Filters
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className={showFilters ? "block" : "hidden md:block"}>
          <FilterPanel filters={filters} onChange={setFilters} />
        </aside>

        <div>
          <p className="mb-4 text-sm text-muted">
            {filtered.length} opportunit{filtered.length === 1 ? "y" : "ies"}
            {previewGrade && " — match scores shown for grade " + previewGrade}
          </p>

          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-white p-10 text-center">
              <p className="font-display text-lg font-semibold">No opportunities match yet</p>
              <p className="mt-1.5 text-sm text-muted">
                Try clearing a filter or searching a broader term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filtered.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opportunity={opp}
                  match={profile ? scoreOpportunity(opp, profile) : undefined}
                  saved={isSaved(opp.id)}
                  onSave={toggleSave}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
