export type Category =
  | "SCHOLARSHIP"
  | "INTERNSHIP"
  | "RESEARCH"
  | "SUMMER_PROGRAM"
  | "COMPETITION"
  | "FELLOWSHIP"
  | "VOLUNTEER"
  | "LEADERSHIP"
  | "OTHER";

export type RemoteType = "REMOTE" | "IN_PERSON" | "HYBRID";
export type Cost = "FREE" | "PAID";
export type ExperienceRequired = "NONE" | "SOME" | "SIGNIFICANT";
export type VerificationStatus = "VERIFIED" | "NEEDS_VERIFICATION" | "EXPIRED";
export type SavedStatus =
  | "INTERESTED"
  | "APPLYING"
  | "SUBMITTED"
  | "ACCEPTED"
  | "REJECTED";

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  category: Category;
  description: string;
  eligibilityText: string;
  tags: string[];

  gradeMin: number;
  gradeMax: number;
  gpaRequirement: number | null;

  location: string | null;
  remote: RemoteType;
  cost: Cost;
  costAmount: number | null;
  award: number | null;

  deadline: string | null; // ISO date; null when the org hasn't published an exact date yet
  deadlineNote: string | null; // human-readable fallback, e.g. "Reopens December 2026"
  availabilityWindow: string | null; // when you can apply / when it runs, e.g. "Applications open each December; program runs June–August"
  startDate: string | null;
  durationText: string | null;
  experienceRequired: ExperienceRequired;
  requiredMaterials: string[];
  applicationProcessText: string | null;

  officialUrl: string;
  sourceUrl: string | null;
  verificationStatus: VerificationStatus;
  lastVerifiedAt: string | null;
  isDemoData: boolean;
  regionTag: string | null; // e.g. "Capital Region, NY" — used for local filtering
}

export interface StudentProfile {
  displayName: string;
  grade: number | null;
  state: string | null;
  country: string | null;
  gpa: number | null;
  academicInterests: string[];
  careerInterests: string[];
  preferredCategories: Category[];
  preferredLocation: string | null;
  remotePreference: "REMOTE_ONLY" | "IN_PERSON_ONLY" | "NO_PREFERENCE";
  hasPriorExperience: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  SCHOLARSHIP: "Scholarship",
  INTERNSHIP: "Internship",
  RESEARCH: "Research",
  SUMMER_PROGRAM: "Summer Program",
  COMPETITION: "Competition",
  FELLOWSHIP: "Fellowship",
  VOLUNTEER: "Volunteer",
  LEADERSHIP: "Leadership",
  OTHER: "Other",
};

export const CATEGORY_ICON: Record<Category, string> = {
  SCHOLARSHIP: "GraduationCap",
  INTERNSHIP: "Briefcase",
  RESEARCH: "Microscope",
  SUMMER_PROGRAM: "Sun",
  COMPETITION: "Trophy",
  FELLOWSHIP: "Award",
  VOLUNTEER: "HeartHandshake",
  LEADERSHIP: "Flag",
  OTHER: "Compass",
};
