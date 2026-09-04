import Link from "next/link";
import {
  GraduationCap,
  Briefcase,
  Microscope,
  Sun,
  Trophy,
  HeartHandshake,
  ArrowRight,
  UserPlus,
  Sparkles,
  BookmarkCheck,
  BellRing,
  ListChecks,
  MapPinned,
} from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import OpportunityCard from "@/components/opportunity/OpportunityCard";
import { regionalOpportunities } from "@/lib/regional-data";
import { getAllOpportunities } from "@/lib/opportunities";
import { CATEGORY_LABELS, Category } from "@/types";
import { CATALOG_LAST_REVIEWED, CATALOG_REVIEW_CADENCE_DAYS } from "@/lib/constants";

const CATEGORY_TILES: { label: string; cat: Category; icon: typeof GraduationCap; colorText: string; colorBg: string }[] = [
  { label: CATEGORY_LABELS.SCHOLARSHIP, cat: "SCHOLARSHIP", icon: GraduationCap, colorText: "text-sun", colorBg: "bg-sun-soft" },
  { label: CATEGORY_LABELS.INTERNSHIP, cat: "INTERNSHIP", icon: Briefcase, colorText: "text-sky", colorBg: "bg-sky-soft" },
  { label: CATEGORY_LABELS.RESEARCH, cat: "RESEARCH", icon: Microscope, colorText: "text-violet", colorBg: "bg-violet-soft" },
  { label: CATEGORY_LABELS.SUMMER_PROGRAM, cat: "SUMMER_PROGRAM", icon: Sun, colorText: "text-coral", colorBg: "bg-coral-soft" },
  { label: CATEGORY_LABELS.COMPETITION, cat: "COMPETITION", icon: Trophy, colorText: "text-rose", colorBg: "bg-rose-soft" },
  { label: "Volunteer & Leadership", cat: "VOLUNTEER", icon: HeartHandshake, colorText: "text-forest", colorBg: "bg-forest-soft" },
];

const STEPS = [
  { icon: UserPlus, title: "Create your profile", body: "Grade, interests, and what you're looking for — takes about two minutes." },
  { icon: Sparkles, title: "Get personalized matches", body: "SCOUT compares your profile against real eligibility requirements." },
  { icon: BookmarkCheck, title: "Save what fits", body: "Keep a running shortlist and track where you are in each application." },
  { icon: ListChecks, title: "Track your applications", body: "Keep notes, dates, and a checklist for each application in one place." },
  { icon: BellRing, title: "Never miss a deadline", body: "See upcoming deadlines across the opportunities you are tracking." },
];

export default function LandingPage() {
  const all = getAllOpportunities();
  const categoryCount = new Set(all.map((o) => o.category)).size;
  const capitalRegionCount = all.filter((o) => o.regionTag).length;

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brass shadow-sm">
              🧭 Built for Capital Region, NY students
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Find opportunities <span className="text-brass">built for you.</span>
            </h1>
            <p className="mt-5 text-lg text-ink-soft">
              Discover scholarships, internships, research programs, competitions, summer
              programs, and more — all in one place, matched to your grade, interests, and
              location.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/explore" size="lg" className="shadow-md shadow-ink/10">
                Find Opportunities <ArrowRight className="h-4 w-4" />
              </LinkButton>
              <LinkButton href="/how-it-works" variant="secondary" size="lg">
                How It Works
              </LinkButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-soft">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Sparkles className="h-4 w-4 text-brass" /> {all.length} opportunities live right now
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Trophy className="h-4 w-4 text-rose" /> {categoryCount} categories
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium">
                <MapPinned className="h-4 w-4 text-teal" /> {capitalRegionCount} local to the Capital Region
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Explore categories */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Explore opportunities
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORY_TILES.map((tile) => (
            <Link
              key={tile.label}
              href={`/explore?category=${tile.cat}`}
              className="lift-on-hover group flex flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full ${tile.colorBg} transition-transform group-hover:scale-110`}
              >
                <tile.icon className={`h-6 w-6 ${tile.colorText}`} strokeWidth={1.75} />
              </span>
              <span className="text-sm font-medium text-ink-soft group-hover:text-ink">
                {tile.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            How SCOUT works
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className="lift-on-hover relative rounded-2xl border border-line p-5"
              >
                <span className="absolute right-4 top-4 font-display text-3xl font-bold text-paper-dim">
                  {i + 1}
                </span>
                <step.icon className="h-5 w-5 text-brass" strokeWidth={1.75} />
                <p className="mt-3 font-display text-base font-semibold">{step.title}</p>
                <p className="mt-1.5 text-sm text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stop searching */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Stop searching. Start discovering.
            </h2>
            <p className="mt-4 text-ink-soft">
              Right now, finding the right opportunity means checking dozens of separate
              websites — your school counselor&apos;s newsletter, a handful of scholarship search
              engines, a university&apos;s pre-college page, a foundation&apos;s PDF list — and hoping
              you didn&apos;t miss anything.
            </p>
            <p className="mt-3 text-ink-soft">
              SCOUT brings them into one place and tells you which ones you&apos;re actually
              eligible for, so you spend less time searching and more time applying.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <p className="font-display text-sm font-semibold text-muted">Example listing</p>
            <div className="mt-3">
              <OpportunityCard opportunity={regionalOpportunities[1]} />
            </div>
          </div>
        </div>
      </section>

      {/* Capital Region spotlight */}
      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-teal">
                <MapPinned className="h-3.5 w-3.5" /> Local spotlight
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight">
                Opportunities in the Capital Region
              </h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Real, sourced opportunities for students in Albany, Rensselaer, Saratoga, and
                Schenectady counties — verify current details on each official source before
                applying.
              </p>
              <p className="mt-2 text-xs text-muted">
                Catalog last reviewed{" "}
                {new Date(CATALOG_LAST_REVIEWED).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}{" "}
                — reviewed at least every {CATALOG_REVIEW_CADENCE_DAYS} days.
              </p>
            </div>
            <LinkButton href="/explore?region=capital" variant="secondary">
              See all Capital Region opportunities <ArrowRight className="h-4 w-4" />
            </LinkButton>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {regionalOpportunities.map((opp) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
