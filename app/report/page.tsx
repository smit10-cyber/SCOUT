"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const REPORT_TYPES = [
  "Expired opportunity",
  "Incorrect deadline",
  "Incorrect eligibility",
  "Broken link",
  "Suspicious / scam opportunity",
  "Other incorrect information",
];

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold">Thanks for the report</h1>
        <p className="mt-2 text-ink-soft">
          Our team reviews every report before it changes what other students see.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-16 sm:px-6">
      <h1 className="font-display text-2xl font-semibold">Report incorrect information</h1>
      <p className="mt-2 text-ink-soft">
        Help keep SCOUT accurate. Reports go to an admin for review before anything changes.
      </p>

      <form
        className="mt-8 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft">
            What&apos;s wrong?
          </label>
          <select required className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm">
            <option value="">Select a reason</option>
            {REPORT_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink-soft">
            Details (optional)
          </label>
          <textarea
            rows={4}
            placeholder="Anything that would help us verify this?"
            className="w-full rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm placeholder:text-muted"
          />
        </div>
        <Button type="submit">Submit report</Button>
      </form>
    </div>
  );
}
