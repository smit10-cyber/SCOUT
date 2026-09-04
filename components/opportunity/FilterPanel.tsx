"use client";

import { CATEGORY_LABELS, Category } from "@/types";
import clsx from "clsx";

export interface Filters {
  categories: Category[];
  grade: number | null;
  remoteOnly: boolean;
  freeOnly: boolean;
  noExperienceOnly: boolean;
  capitalRegionOnly: boolean;
  minGpaOk: boolean; // "only show ones I meet the GPA bar for" — needs profile GPA
}

export const EMPTY_FILTERS: Filters = {
  categories: [],
  grade: null,
  remoteOnly: false,
  freeOnly: false,
  noExperienceOnly: false,
  capitalRegionOnly: false,
  minGpaOk: false,
};

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export default function FilterPanel({
  filters,
  onChange,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
}) {
  function toggleCategory(cat: Category) {
    const has = filters.categories.includes(cat);
    onChange({
      ...filters,
      categories: has
        ? filters.categories.filter((c) => c !== cat)
        : [...filters.categories, cat],
    });
  }

  return (
    <div className="space-y-6 rounded-xl border border-line bg-white p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Category</p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={clsx(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                filters.categories.includes(cat)
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink/40"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Your grade</p>
        <div className="mt-2.5 flex gap-1.5">
          {[9, 10, 11, 12].map((g) => (
            <button
              key={g}
              onClick={() => onChange({ ...filters, grade: filters.grade === g ? null : g })}
              className={clsx(
                "flex-1 rounded-md border py-1.5 text-sm font-medium transition-colors",
                filters.grade === g
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink/40"
              )}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">Quick filters</p>
        <Toggle
          label="Capital Region, NY"
          checked={filters.capitalRegionOnly}
          onChange={(v) => onChange({ ...filters, capitalRegionOnly: v })}
        />
        <Toggle
          label="🌱 No experience required"
          checked={filters.noExperienceOnly}
          onChange={(v) => onChange({ ...filters, noExperienceOnly: v })}
        />
        <Toggle
          label="Remote / online only"
          checked={filters.remoteOnly}
          onChange={(v) => onChange({ ...filters, remoteOnly: v })}
        />
        <Toggle
          label="Free to apply"
          checked={filters.freeOnly}
          onChange={(v) => onChange({ ...filters, freeOnly: v })}
        />
      </div>

      {(filters.categories.length > 0 ||
        filters.grade ||
        filters.remoteOnly ||
        filters.freeOnly ||
        filters.noExperienceOnly ||
        filters.capitalRegionOnly) && (
        <button
          onClick={() => onChange(EMPTY_FILTERS)}
          className="text-xs font-medium text-ink-soft underline underline-offset-2 hover:text-ink"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-ink-soft">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 rounded border-line accent-[var(--color-ink)]"
      />
    </label>
  );
}
