"use client";

import { useEffect, useState } from "react";
import { useProfile } from "@/lib/useProfile";
import { CATEGORY_LABELS, Category } from "@/types";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export default function ProfilePage() {
  const { profile, setProfile, loaded } = useProfile();
  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Intentionally loading from localStorage post-mount to avoid an SSR/
    // client hydration mismatch (server has no `window`).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (loaded) setDraft(profile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  function update<K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) {
    setDraft({ ...draft, [key]: value });
    setSaved(false);
  }

  function toggleCategory(cat: Category) {
    const has = draft.preferredCategories.includes(cat);
    update(
      "preferredCategories",
      has
        ? draft.preferredCategories.filter((c) => c !== cat)
        : [...draft.preferredCategories, cat]
    );
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setProfile(draft);
    setSaved(true);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">Your profile</h1>
      <p className="mt-2 text-ink-soft">
        This is what SCOUT uses to calculate your match scores. We only ask for what&apos;s needed
        for matching — nothing more.
      </p>

      <form onSubmit={handleSave} className="mt-8 space-y-8">
        <Field label="Display name">
          <input
            value={draft.displayName}
            onChange={(e) => update("displayName", e.target.value)}
            placeholder="What should we call you?"
            className={inputClass}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Grade">
            <select
              value={draft.grade ?? ""}
              onChange={(e) => update("grade", e.target.value ? Number(e.target.value) : null)}
              className={inputClass}
            >
              <option value="">Select grade</option>
              {[9, 10, 11, 12].map((g) => (
                <option key={g} value={g}>
                  {g}th grade
                </option>
              ))}
            </select>
          </Field>
          <Field label="GPA (optional)">
            <input
              type="number"
              step="0.1"
              min="0"
              max="4.0"
              value={draft.gpa ?? ""}
              onChange={(e) => update("gpa", e.target.value ? Number(e.target.value) : null)}
              placeholder="e.g. 3.7"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="State">
            <input
              value={draft.state ?? ""}
              onChange={(e) => update("state", e.target.value)}
              placeholder="e.g. NY"
              className={inputClass}
            />
          </Field>
          <Field label="Country">
            <input
              value={draft.country ?? ""}
              onChange={(e) => update("country", e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Preferred location (optional)">
          <input
            value={draft.preferredLocation ?? ""}
            onChange={(e) => update("preferredLocation", e.target.value)}
            placeholder="e.g. Capital Region, NY"
            className={inputClass}
          />
        </Field>

        <Field label="Remote preference">
          <div className="flex gap-2">
            {[
              { key: "NO_PREFERENCE", label: "No preference" },
              { key: "REMOTE_ONLY", label: "Remote only" },
              { key: "IN_PERSON_ONLY", label: "In-person only" },
            ].map((opt) => (
              <button
                type="button"
                key={opt.key}
                onClick={() => update("remotePreference", opt.key as typeof draft.remotePreference)}
                className={`flex-1 rounded-md border py-2 text-sm font-medium transition-colors ${
                  draft.remotePreference === opt.key
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink/40"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Academic interests (comma separated)">
          <input
            value={draft.academicInterests.join(", ")}
            onChange={(e) =>
              update(
                "academicInterests",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            placeholder="e.g. biology, computer science"
            className={inputClass}
          />
        </Field>

        <Field label="Career interests (comma separated)">
          <input
            value={draft.careerInterests.join(", ")}
            onChange={(e) =>
              update(
                "careerInterests",
                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
              )
            }
            placeholder="e.g. medicine, engineering"
            className={inputClass}
          />
        </Field>

        <Field label="Preferred opportunity categories">
          <div className="flex flex-wrap gap-1.5">
            {ALL_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  draft.preferredCategories.includes(cat)
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink/40"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </Field>

        <label className="flex items-center gap-2.5 text-sm text-ink-soft">
          <input
            type="checkbox"
            checked={draft.hasPriorExperience}
            onChange={(e) => update("hasPriorExperience", e.target.checked)}
            className="h-4 w-4 rounded border-line accent-[var(--color-ink)]"
          />
          I already have some research, internship, or leadership experience
        </label>

        <div className="flex items-center gap-3 border-t border-line pt-6">
          <Button type="submit">Save profile</Button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-forest">
              <CheckCircle2 className="h-4 w-4" /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink/40 focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label>
      {children}
    </div>
  );
}
