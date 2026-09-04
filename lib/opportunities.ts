import { Opportunity } from "@/types";
import { regionalOpportunities } from "./regional-data";
import { CAPITAL_REGION_TAG } from "./constants";

/**
 * In the MVP this reads from a static array of real, sourced opportunities
 * (see lib/regional-data.ts — every record cites its official source).
 *
 * Fictional placeholder records used only during development live in
 * lib/demo-data.ts and are intentionally NOT included here, so nothing fake
 * is ever shown to a real visitor. If you're adding test data while
 * building a new feature, import demoOpportunities directly in your own
 * dev/test code — don't wire it back into this function.
 *
 * Once Prisma/Postgres is wired up (see prisma/schema.prisma), swap the
 * body of these functions for `db.opportunity.findMany(...)` /
 * `findUnique(...)` calls — callers elsewhere in the app don't need to
 * change.
 */
export function getAllOpportunities(): Opportunity[] {
  return [...regionalOpportunities];
}

export function getOpportunityById(id: string): Opportunity | undefined {
  return getAllOpportunities().find((o) => o.id === id);
}

export { CAPITAL_REGION_TAG };
