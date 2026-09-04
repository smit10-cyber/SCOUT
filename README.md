# SCOUT

A personalized opportunity-discovery platform for high-school students — scholarships,
internships, research, summer programs, competitions, and more, matched to your grade,
interests, and location.

## What's in this MVP

- **Landing page** with hero, category tiles, "how it works," and a **Capital Region, NY
  spotlight** (Albany / Rensselaer / Saratoga / Schenectady counties)
- **Explore** — search, filters (category, grade, remote, free/paid, "no experience
  required," Capital Region), and an instant match-score preview
- **Opportunity detail pages** with eligibility, verification status, required materials,
  and a link to the official source
- **Dashboard**, **Saved** (with status buckets), **Application Tracker**, **Profile**,
  **Report an opportunity**, and an **Admin** area for managing/verifying listings
- A transparent, rule-based **matching engine** (`lib/matching.ts`) — every point in a
  match score maps to a human-readable reason, never a black box
- A full **Prisma schema** (`prisma/schema.prisma`) ready to swap in for the static data
  the MVP currently runs on

## Data sources — read this before adding more opportunities

**The live site shows only real, sourced opportunities.** `lib/opportunities.ts`
(`getAllOpportunities()`) reads exclusively from `lib/regional-data.ts` — fictional
placeholder records used only during early UI development live in `lib/demo-data.ts` and
are intentionally excluded from that function so nothing fake is ever shown to a real
visitor. If you need placeholder data while building a new feature, import
`demoOpportunities` directly in your own dev/test code; don't wire it back into
`getAllOpportunities()`.

**`lib/regional-data.ts`** holds 10 real opportunities today, each sourced from the
organization's own official page (see each record's `sourceUrl`):

| Opportunity | Organization | Category |
|---|---|---|
| Universal Scholarship Application | Community Foundation for the Greater Capital Region | Scholarship |
| Summer@Rensselaer Pre-College Programs | RPI (Troy) | Summer Program |
| PREFACE Summer Engineering Design Program | RPI (Troy) | Summer Program |
| U.S. Senate Youth Program — NY Delegate Selection | NYSED | Fellowship |
| Hospital Volunteer Program | Ellis Medicine (Schenectady) | Volunteer |
| Health Career Scholarship | Hudson Mohawk AHEC | Scholarship |
| MASH Camp — Health Career Exposure | Hudson Mohawk AHEC | Summer Program |
| Health Career Job Shadows & Internships | Hudson Mohawk AHEC | Internship |
| College in the High School | Hudson Valley Community College (Troy) | Other (dual enrollment) |
| Junior Science & Humanities Symposium — NY-Upstate | JSHS / National Science Teaching Assoc. | Competition |

Where an organization hasn't published an exact deadline for the next cycle, the record
uses `deadline: null` plus a `deadlineNote` explaining what's known instead of inventing
a date. Every record also has an `availabilityWindow` — a plain-language description of
*when* the opportunity runs or when applications typically open (e.g. "Rolling admissions
year-round," "Runs during the summer; program dates TBD"), which is separate from the
hard deadline and is shown on both the card and the detail page.

**This is a starting point, not a complete catalog** — real opportunities exist beyond
these 10. Adding more should follow the same rule the whole product is built around:
source every field from the organization's own page, mark
`verificationStatus: "NEEDS_VERIFICATION"` until someone has actually confirmed the
current cycle's details, and never fabricate a deadline, award amount, availability
window, or eligibility rule that isn't published somewhere.

### Update cadence

`lib/constants.ts` exports `CATALOG_LAST_REVIEWED` and `CATALOG_REVIEW_CADENCE_DAYS`
(currently 14). The landing page's Capital Region section displays this date and cadence
directly to visitors. **Whoever maintains this catalog should re-check every listing at
least every 2 weeks** — confirm deadlines haven't changed, check `NEEDS_VERIFICATION`
records against the official source again, mark anything that's closed as `EXPIRED`, and
bump `CATALOG_LAST_REVIEWED` to the date of that review (even on a week where nothing
changed) so the "last reviewed" date on the site stays honest.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL (Neon or Supabase free tier both work)
npx prisma migrate dev --name init
npm run dev
```

Open http://localhost:3000.

The app currently reads opportunity data from the static files above and profile/saved
state from `localStorage` (see `lib/useProfile.ts`, `lib/useSavedOpportunities.ts`) — the
Prisma schema is in place but not yet wired into the app. That's intentional: it's the
next milestone (see below), and keeping static data in the meantime meant the whole UI
could be built and clicked through end-to-end without a live database.

## What's next (in order)

1. **Wire Prisma to real Postgres.** Point `lib/opportunities.ts` at
   `prisma.opportunity.findMany()`/`findUnique()` instead of the static arrays; both
   functions already have that swap called out in a comment.
2. **Production data persistence.** Supabase email/password authentication is now wired into
   sign-up and sign-in. Profile data is synced to the authenticated user's Auth metadata.
   Saved opportunities are browser-local but scoped to the signed-in account ID, so accounts
   on the same device do not share saves.
3. **Cross-device saved applications.** Move Saved/Profile/Application Tracker persistence to
   the existing Prisma models or Supabase Postgres tables once the database is connected.
4. **Secure the admin area.** The admin UI is still a prototype and must be protected by
   server-side role checks before being used by real administrators. Do not treat a hidden
   navigation link as authorization.
5. **Deadline reminders, calendar view, AI assistant** — Version 2/3 per the original
   product plan.

## Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Prisma · PostgreSQL
(once connected) · lucide-react for icons

## Project structure

```
app/                  routes (App Router)
  explore/            search + filters + detail pages
  dashboard/, saved/, profile/, tracker/, report/
  admin/              opportunity management (needs auth gating — see above)
  sign-in/, sign-up/  UI-only stubs pending Auth.js
components/
  ui/                 Button, CompassMark (logo)
  layout/             Navbar, Footer
  opportunity/        OpportunityCard, MatchBadge, VerificationBadge, FilterPanel
lib/
  matching.ts         explainable match-scoring engine
  demo-data.ts        fictional dev/demo opportunities — NOT included in getAllOpportunities();
                       import directly only if you need placeholder data for a new feature
  regional-data.ts    real, sourced Capital Region, NY opportunities (the live catalog)
  category-style.ts   per-category accent colors used by cards + landing tiles
  constants.ts        shared constants (CAPITAL_REGION_TAG, CATALOG_LAST_REVIEWED,
                       CATALOG_REVIEW_CADENCE_DAYS) — kept separate from opportunities.ts
                       to avoid a circular import with demo-data.ts/regional-data.ts
  opportunities.ts    single accessor other code should import from — reads only
                       regional-data.ts
  useProfile.ts, useSavedOpportunities.ts   localStorage-backed state (temporary)
prisma/
  schema.prisma       full data model
  seed.ts             starting point for a real seed script
types/
  index.ts            shared TypeScript types mirroring the Prisma schema
```


## Deploying the live site

1. Create a Supabase project and enable **Email** authentication. Hosted Supabase projects require email confirmation by default, so students should confirm their email before signing in. Configure your production site URL and redirect URL in Supabase Auth settings. Supabase password authentication docs: https://supabase.com/docs/guides/auth/passwords
2. Copy `.env.example` to `.env.local` for local development and add your Supabase project URL and publishable/anon key.
3. Deploy the `scout` folder to Vercel (or another Next.js host).
4. Add the same two `NEXT_PUBLIC_...` variables to the host's Environment Variables.
5. Build with `npm run build` and start with `npm run start` (the host normally runs these automatically).
6. In Supabase Auth URL Configuration, set the Site URL to your live domain and allow that same domain plus `/dashboard` as a redirect URL.

Do not put a Supabase service-role key in the browser or in `NEXT_PUBLIC_` variables. Only use the public/publishable/anon key client-side.
