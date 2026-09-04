import { UserPlus, Search, Sparkles, BookmarkCheck, ExternalLink } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your profile",
    body: "Tell SCOUT your grade, location, interests, and academic or career goals. This helps SCOUT understand what types of opportunities may be relevant to you.",
  },
  {
    icon: Search,
    title: "Explore opportunities",
    body: "Browse scholarships, internships, programs, volunteer opportunities, and other opportunities available to students in the Capital Region of New York.",
  },
  {
    icon: Sparkles,
    title: "Find opportunities that fit",
    body: "SCOUT uses the information in your profile to help you discover opportunities that may be a good fit. Matches are meant to help you narrow your search, not make the decision for you.",
  },
  {
    icon: BookmarkCheck,
    title: "Save opportunities",
    body: "Found something you're interested in? Save it to your account so you can easily come back to it later.",
  },
  {
    icon: ExternalLink,
    title: "Apply through the official source",
    body: "When you're ready, SCOUT connects you to the official opportunity source. Always review the official requirements, eligibility rules, and deadlines before applying.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        How SCOUT works
      </h1>

      <p className="mt-3 text-ink-soft">
        SCOUT helps students in New York&apos;s Capital Region discover
        scholarships, internships, programs, volunteer opportunities, and
        other opportunities in one place. Instead of searching across
        countless websites, SCOUT helps you find opportunities that may fit
        your interests and goals.
      </p>

      <div className="mt-10 space-y-8">
        {STEPS.map((step, i) => {
          const Icon = step.icon;

          return (
            <div key={step.title} className="flex gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brass-soft text-sm font-semibold text-[#8A6520]">
                {i + 1}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-[#8A6520]" />
                  <p className="font-display text-base font-semibold">
                    {step.title}
                  </p>
                </div>

                <p className="mt-1 text-sm text-ink-soft">
                  {step.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-xl border border-line bg-white p-6">
        <p className="font-display text-base font-semibold">
          A note on accuracy
        </p>

        <p className="mt-2 text-sm text-ink-soft">
          SCOUT is designed to make finding opportunities easier, but it does
          not guarantee that you are eligible for an opportunity or that an
          opportunity is still accepting applications. Always check the
          official source for the most current eligibility requirements,
          application details, and deadlines before applying.
        </p>
      </div>
    </div>
  );
}