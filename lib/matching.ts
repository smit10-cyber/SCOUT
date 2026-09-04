import { Opportunity, StudentProfile } from "@/types";

export interface MatchReason {
  label: string;
  met: boolean;
}

export interface MatchResult {
  score: number; // 0-100
  tier: "STRONG" | "REVIEW" | "LOW";
  reasons: MatchReason[];
  disqualified: boolean;
}

/**
 * Rule-based, explainable matching. Every point awarded maps to one
 * human-readable reason so the student can see exactly why they got the
 * score — no black box, and no promise of eligibility or acceptance.
 */
export function scoreOpportunity(
  opp: Opportunity,
  profile: StudentProfile
): MatchResult {
  const reasons: MatchReason[] = [];
  let score = 0;
  let disqualified = false;

  // Grade eligibility (25 pts, hard disqualifier if outside range and known)
  if (profile.grade != null) {
    const gradeOk = profile.grade >= opp.gradeMin && profile.grade <= opp.gradeMax;
    reasons.push({ label: "Grade eligible", met: gradeOk });
    if (gradeOk) score += 25;
    else disqualified = true;
  } else {
    reasons.push({ label: "Grade eligible (add your grade to check)", met: false });
  }

  // GPA (10 pts, hard disqualifier if below requirement and both known)
  if (opp.gpaRequirement != null) {
    if (profile.gpa != null) {
      const gpaOk = profile.gpa >= opp.gpaRequirement;
      reasons.push({
        label: `Meets GPA requirement (${opp.gpaRequirement.toFixed(1)}+)`,
        met: gpaOk,
      });
      if (gpaOk) score += 10;
      else disqualified = true;
    } else {
      reasons.push({
        label: `Requires GPA ${opp.gpaRequirement.toFixed(1)}+ (add your GPA to check)`,
        met: false,
      });
    }
  } else {
    score += 10; // no requirement, doesn't block anyone
  }

  // Category preference (20 pts)
  const categoryMatch = profile.preferredCategories.includes(opp.category);
  reasons.push({ label: "Matches a category you're interested in", met: categoryMatch });
  if (categoryMatch) score += 20;

  // Interest overlap (20 pts)
  const interests = [...profile.academicInterests, ...profile.careerInterests].map((i) =>
    i.toLowerCase()
  );
  const tagOverlap = opp.tags.some((tag) => interests.includes(tag.toLowerCase()));
  reasons.push({ label: "Interest match", met: tagOverlap });
  if (tagOverlap) score += 20;

  // Location / remote preference (15 pts)
  let locationOk = false;
  if (profile.remotePreference === "REMOTE_ONLY") {
    locationOk = opp.remote === "REMOTE" || opp.remote === "HYBRID";
  } else if (profile.remotePreference === "IN_PERSON_ONLY") {
    locationOk =
      opp.remote === "IN_PERSON" ||
      opp.remote === "HYBRID" ||
      (!!profile.state && !!opp.location?.includes(profile.state));
  } else {
    locationOk = true;
  }
  reasons.push({ label: "Location eligible", met: locationOk });
  if (locationOk) score += 15;

  // Experience fit (10 pts)
  const experienceOk =
    opp.experienceRequired === "NONE" || profile.hasPriorExperience;
  reasons.push({
    label:
      opp.experienceRequired === "NONE"
        ? "No experience required"
        : "Experience requirement met",
    met: experienceOk,
  });
  if (experienceOk) score += 10;

  if (disqualified) {
    score = Math.min(score, 30);
  }

  const tier: MatchResult["tier"] =
    disqualified || score < 50 ? "LOW" : score < 75 ? "REVIEW" : "STRONG";

  return { score: Math.round(score), tier, reasons, disqualified };
}
