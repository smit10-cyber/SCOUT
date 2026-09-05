import { Opportunity } from "@/types";
import { regionalOpportunities } from "./regional-data";
import { CAPITAL_REGION_TAG } from "./constants";

/**
 * Returns the real, sourced opportunities used throughout SCOUT.
 *
 * Duplicate opportunity IDs are removed so the same opportunity
 * cannot appear multiple times on the Explore page.
 */
export function getAllOpportunities(): Opportunity[] {
  const uniqueOpportunities = new Map<string, Opportunity>();

  for (const opportunity of regionalOpportunities) {
    if (!uniqueOpportunities.has(opportunity.id)) {
      uniqueOpportunities.set(opportunity.id, opportunity);
    }
  }

  return Array.from(uniqueOpportunities.values());
}

/**
 * Finds one opportunity by its unique ID.
 */
export function getOpportunityById(
  id: string
): Opportunity | undefined {
  return getAllOpportunities().find(
    (opportunity) => opportunity.id === id
  );
}

export { CAPITAL_REGION_TAG };