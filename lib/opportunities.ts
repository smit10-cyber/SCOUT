import { Opportunity } from "@/types";
import { regionalOpportunities } from "./regional-data";
import { CAPITAL_REGION_TAG } from "./constants";

/**
 * Returns opportunities that are accessible to students
 * in the Capital Region.
 *
 * We keep:
 * - Opportunities physically located in the Capital Region
 * - Remote opportunities that students can complete from the Capital Region
 * - National opportunities that do not require students
 *   to physically travel outside the Capital Region
 *
 * We remove:
 * - In-person opportunities that require students to be
 *   physically located outside the Capital Region.
 *
 * Duplicate opportunity IDs are also removed.
 */
export function getAllOpportunities(): Opportunity[] {
  const uniqueOpportunities = new Map<string, Opportunity>();

  for (const opportunity of regionalOpportunities) {
    // Remove BAE Systems because the internship requires
    // students to be physically present in Southern New Hampshire.
    if (opportunity.id === "bae-systems-software-intern-high-school-2027") {
      continue;
    }

    // Prevent duplicate opportunities from appearing.
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