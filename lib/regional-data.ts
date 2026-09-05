import { Opportunity } from "@/types";

/**
 * REAL OPPORTUNITIES — Capital Region, NY (Albany, Rensselaer, Saratoga,
 * Schenectady counties).
 *
 * Every record here is sourced from the organization's own official page
 * (see `sourceUrl`). Where the organization has not yet published an exact
 * deadline for the upcoming cycle, `deadline` is left `null` and
 * `deadlineNote` explains what's known instead — we do not invent dates,
 * amounts, or eligibility rules that aren't stated by the source.
 *
 * `verificationStatus` is VERIFIED only where the current cycle's own
 * details were confirmed directly on the official page; details that are
 * carried over from a typical/annual pattern (rather than an explicitly
 * published date for the *next* cycle) are marked NEEDS_VERIFICATION so
 * the student is prompted to double-check on the official site before
 * relying on it.
 */
export const regionalOpportunities: Opportunity[] = [
  {
    id: "region-cfgcr-universal-scholarship",
    title: "Universal Scholarship Application",
    organization: "The Community Foundation for the Greater Capital Region",
    category: "SCHOLARSHIP",
    description:
      "One application screens students against more than 30 separate scholarship funds administered by the Community Foundation, several of which are restricted to Albany, Rensselaer, Saratoga, or Schenectady County residents (for example the Capital Region Chamber Chuck Steiner Memorial Scholarship and the Beta Psi Scholarship). The system matches each applicant to the funds they qualify for based on answers given in the application.",
    eligibilityText:
      "Varies by fund — the application determines which of the 30+ scholarships you qualify for based on your county, school, intended major, and other criteria. Several funds are restricted to Albany, Rensselaer, Saratoga, or Schenectady County residents.",
    tags: ["any major", "community service", "leadership"],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, Rensselaer, Saratoga & Schenectady Counties, NY",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "The 2026 application window has closed. The Foundation says to check back in December for the next cycle.",
    availabilityWindow: "Reopens each December for the following year's cycle.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: ["Transcript", "Recommendation letter (for some funds)"],
    applicationProcessText:
      "Create an account with a personal (not school) email address and complete the Foundation's Universal Application. The system will show which of the 30+ funds you qualify for.",
    officialUrl: "https://www.grantinterface.com/Home/Logon?urlkey=cfgcrs",
    sourceUrl: "https://www.cfgcr.org/scholarships/scholarship-opportunities/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-08-31",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-rpi-summer-rensselaer",
    title: "Summer@Rensselaer Pre-College Programs",
    organization: "Rensselaer Polytechnic Institute (RPI)",
    category: "SUMMER_PROGRAM",
    description:
      "A set of non-credit, faculty-led summer enrichment programs held on RPI's Troy campus, covering fields such as aerospace engineering, architecture, and other STEM and design topics. Both residential and commuter/online formats are offered depending on the specific program, and programs run one or two weeks.",
    eligibilityText:
      "Primarily for rising freshmen through seniors; graduating seniors may also apply. International students are welcome. Prerequisites vary by individual program.",
    tags: ["engineering", "technology", "architecture", "stem"],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Troy, NY (Rensselaer County) — some programs also offered online",
    remote: "HYBRID",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: "2027-04-15",
    deadlineNote:
      "RPI's site lists April 15 as the typical application deadline, with a June 1 registration/payment deadline and a July 1 deadline for remaining paperwork — confirm exact 2027 dates on the official page once published.",
    availabilityWindow:
      "Applications typically open in winter; programs run for 1–2 weeks during the summer (June–August).",
    startDate: null,
    durationText: "1–2 weeks depending on program",
    experienceRequired: "NONE",
    requiredMaterials: ["Unofficial high school transcript", "Letter(s) of recommendation"],
    applicationProcessText:
      "Apply through the Summer@Rensselaer portal; required materials vary slightly by individual program.",
    officialUrl: "https://summer.rpi.edu/",
    sourceUrl: "https://pre-college.admissions.rpi.edu/summerrensselaer/about-summerrensselaer",
    verificationStatus: "NEEDS_VERIFICATION",
    lastVerifiedAt: "2026-08-31",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-rpi-preface",
    title: "PREFACE — RPI Summer Engineering Design Program",
    organization: "Rensselaer Polytechnic Institute (RPI)",
    category: "SUMMER_PROGRAM",
    description:
      "A summer engineering-design experience for rising juniors and seniors, running since 1978. Students work with RPI faculty and researchers across engineering, science, management, and humanities on project-based work exploring a yearly theme (this year: artificial intelligence).",
    eligibilityText:
      "Rising junior or senior high school students interested in pursuing engineering or technology, with demonstrated leadership strengths.",
    tags: ["engineering", "technology", "leadership", "stem"],
    gradeMin: 11,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Troy, NY (Rensselaer County)",
    remote: "IN_PERSON",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote: "Exact 2027 application deadline not yet posted — check the official page.",
    availabilityWindow: "Runs during the summer; specific 2027 dates not yet posted.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through RPI's Pre-College Initiatives office; see the official page for the current cycle's requirements.",
    officialUrl:
      "https://pre-college.admissions.rpi.edu/pipeline-initiatives/preface-rpi-summer-engineering-design-program",
    sourceUrl:
      "https://pre-college.admissions.rpi.edu/pipeline-initiatives/preface-rpi-summer-engineering-design-program",
    verificationStatus: "NEEDS_VERIFICATION",
    lastVerifiedAt: "2026-08-31",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-nysed-senate-youth",
    title: "U.S. Senate Youth Program — New York Delegate Selection",
    organization: "New York State Education Department (NYSED)",
    category: "FELLOWSHIP",
    description:
      "NYSED selects two New York high school students each year to represent the state at the national U.S. Senate Youth Program's Washington Week, a nonpartisan program on America's political process. NYSED is headquartered in Albany and administers the statewide selection, so Capital Region students apply through the same statewide process as anywhere else in New York.",
    eligibilityText:
      "Any New York high school junior or senior who holds a qualifying leadership position (e.g. student body or class officer, or a similar civic/educational leadership role) during the current academic year. A school principal nominates candidates.",
    tags: ["leadership", "civics", "public policy", "government"],
    gradeMin: 11,
    gradeMax: 12,
    gpaRequirement: null,
    location: "New York State (statewide; administered from Albany)",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: 10000,
    deadline: "2026-12-01",
    deadlineNote:
      "December 1, 2026 is the national deadline for states to submit delegate selections — NYSED's own internal nomination deadline for New York students is typically earlier, so check with your principal and NYSED's page soon.",
    availabilityWindow:
      "Nominate through your principal in fall 2026; Washington Week itself runs March 6–13, 2027.",
    startDate: "2027-03-06",
    durationText: "1 week (Washington Week: March 6–13, 2027) plus the nomination/selection process",
    experienceRequired: "SOME",
    requiredMaterials: ["Principal nomination", "Leadership verification"],
    applicationProcessText:
      "Ask your school principal about nominating you — NYSED's statewide competition is run through school nominations rather than direct student applications.",
    officialUrl:
      "https://www.nysed.gov/standards-instruction/william-randolph-hearst-foundation-united-states-senate-youth-program",
    sourceUrl:
      "https://www.nysed.gov/standards-instruction/news/now-accepting-applications-2026-us-senate-youth-program",
    verificationStatus: "NEEDS_VERIFICATION",
    lastVerifiedAt: "2026-08-31",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-ellis-medicine-volunteer",
    title: "Hospital Volunteer Program",
    organization: "Ellis Medicine",
    category: "VOLUNTEER",
    description:
      "Ellis Medicine places volunteers across its Schenectady-area campuses (Ellis Hospital, Bellevue Woman's Center, Mohawk Harbor) in roles like office/clerical support, ICU and ER greeting, nursing unit support, and gift shop assistance.",
    eligibilityText:
      "Open to high school juniors and seniors. Volunteers commit to a minimum of 4 hours per week for at least 6 months.",
    tags: ["medicine", "health", "community service"],
    gradeMin: 11,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Schenectady, NY",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote: "Rolling — applications are accepted on an ongoing basis, not tied to a cycle.",
    availabilityWindow: "Rolling admissions year-round; volunteers commit for a minimum of 6 months.",
    startDate: null,
    durationText: "Ongoing, min. 4 hrs/week for 6+ months",
    experienceRequired: "NONE",
    requiredMaterials: ["Volunteer application"],
    applicationProcessText:
      "Apply online through Ellis Medicine's volunteer portal, or call Volunteer Services at 518-243-4009 for more information.",
    officialUrl: "https://www.volgistics.com/ex/portal.dll/ap?ap=2041044150",
    sourceUrl: "https://www.ellismedicine.org/pages/volunteers.aspx",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-hmahec-health-career-scholarship",
    title: "Health Career Scholarship",
    organization: "Hudson Mohawk AHEC",
    category: "SCHOLARSHIP",
    description:
      "An annual scholarship supporting high school seniors and adult learners newly entering an approved health professions training certificate or degree program in New York State.",
    eligibilityText:
      "Must reside within, or be a graduating senior from, a high school within the Hudson Mohawk AHEC service region: Albany, Essex, Fulton, Hamilton, Montgomery, Rensselaer, Saratoga, Schenectady, Warren, or Washington County.",
    tags: ["medicine", "health", "any major"],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, Rensselaer, Saratoga & Schenectady Counties, NY (and 6 other counties)",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "The 2026 scholarship cycle is now closed. Recipients were announced mid-2026 — check the official page for when the next cycle opens.",
    availabilityWindow:
      "The 2026 cycle is closed; based on this year's pattern, expect the next cycle to open in winter/spring.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Contact Hudson Mohawk AHEC (aguyette-blackmer@hmahec.org) for next cycle's application details.",
    officialUrl: "https://www.hmahec.org/high-school-students",
    sourceUrl: "https://www.hmahec.org/high-school-students",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-hmahec-mash-camp",
    title: "MASH Camp — Health Career Exposure",
    organization: "Hudson Mohawk AHEC",
    category: "SUMMER_PROGRAM",
    description:
      "A hands-on, interactive health career exposure camp where students learn directly from local health professionals about their training and day-to-day work across a range of medical fields.",
    location: "Latham, NY (Hudson Mohawk AHEC) — camp sites vary by session",
    eligibilityText: "Open to students in grades 8–12 in the Hudson Mohawk AHEC service region.",
    tags: ["medicine", "health"],
    gradeMin: 8,
    gradeMax: 12,
    gpaRequirement: null,
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "The official page currently lists Summer 2026 camps as open for applications, which may not yet reflect Summer 2027 — check the MASH Camp page directly for current dates.",
    availabilityWindow: "Summer program — check the official MASH Camp page for 2027 session dates.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText: "Apply through the MASH Camp page on Hudson Mohawk AHEC's website.",
    officialUrl: "https://www.hmahec.org/mash-camp-summer-2026",
    sourceUrl: "https://www.hmahec.org/high-school-students",
    verificationStatus: "NEEDS_VERIFICATION",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-hmahec-job-shadow",
    title: "Health Career Job Shadows & Internships",
    organization: "Hudson Mohawk AHEC",
    category: "INTERNSHIP",
    description:
      "Places students with local health professionals to observe and learn about health-related careers firsthand, aiming to give early exposure that supports entering the healthcare field.",
    eligibilityText:
      "Students in grades 8–12 residing in Albany, Essex, Fulton, Montgomery, Hamilton, Rensselaer, Saratoga, Schenectady, Warren, or Washington County.",
    tags: ["medicine", "health"],
    gradeMin: 8,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Latham, NY (Hudson Mohawk AHEC) — placement sites vary across the region",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote: "Rolling — applications are accepted on an ongoing basis, not tied to a cycle.",
    availabilityWindow: "Rolling admissions year-round.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: ["Two references", "One letter of reference", "Resume"],
    applicationProcessText:
      "Apply via Hudson Mohawk AHEC's online form. Gather your two reference contacts, one reference letter, and resume before starting the application.",
    officialUrl: "https://www.surveymonkey.com/r/GRBK52J",
    sourceUrl: "https://www.hmahec.org/high-school-students",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-hvcc-college-in-high-school",
    title: "College in the High School",
    organization: "Hudson Valley Community College (HVCC)",
    category: "OTHER",
    description:
      "Take real, full college courses for credit — either taught within your own high school by a certified instructor, or online through HVCC — and apply the credits toward a future degree at HVCC or most other colleges and universities.",
    eligibilityText:
      "Designed for 11th and 12th grade students. Students entering 9th grade may also register with school administrator approval. Courses run year-round (fall, spring, summer).",
    tags: ["any major", "dual enrollment", "academic"],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Troy, NY (Rensselaer County), plus partner high schools across the Capital Region",
    remote: "HYBRID",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "Enrollment follows each term's school calendar rather than one annual deadline — contact cihs@hvcc.edu for the current term's registration window.",
    availabilityWindow: "Year-round — fall, spring, and summer terms, each with its own registration window.",
    startDate: null,
    durationText: "Per college course term",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Enroll through your high school's College in the High School partnership, or contact cihs@hvcc.edu directly.",
    officialUrl: "https://www.hvcc.edu/programs/highschool/cihs/index.html",
    sourceUrl: "https://www.hvcc.edu/programs/highschool/cihs/index.html",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "region-jshs-ny-upstate",
    title: "Junior Science & Humanities Symposium — NY-Upstate Region",
    organization: "National Junior Science and Humanities Symposium (JSHS)",
    category: "COMPETITION",
    description:
      "A free, Department of Defense–sponsored STEM research competition where students present original independent research at a university-hosted regional symposium (previously held at the University at Albany) for a chance to advance to nationals and compete for scholarships.",
    eligibilityText:
      "Students in grades 9–12 enrolled in public, private, or home school in the NY-Upstate region are eligible. No cost to register or participate.",
    tags: ["research", "stem", "biology", "engineering"],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, NY (University at Albany has hosted the NY-Upstate regional)",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: 4500,
    deadline: null,
    deadlineNote:
      "The official page states: \"Information and dates for 2026-27 regional events will be posted in the fall of 2026\" — symposium date and application deadline are both listed as TBD as of this writing.",
    availabilityWindow:
      "Regional symposia are typically held in winter (Jan–Feb) ahead of the national event in the spring; 2026–27 dates are posted in fall 2026.",
    startDate: null,
    durationText: null,
    experienceRequired: "SOME",
    requiredMaterials: ["Original research project/abstract"],
    applicationProcessText:
      "Find your region and register at jshs.org once the 2026-27 regional page is updated with dates.",
    officialUrl: "https://jshs.org/region/new-york-upstate/",
    sourceUrl: "https://jshs.org/region/new-york-upstate/",
    verificationStatus: "NEEDS_VERIFICATION",
    lastVerifiedAt: "2026-09-01",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },
  {
    id: "coca-cola-scholars-2027",
    title: "Coca-Cola Scholars Program",
    organization: "Coca-Cola Scholars Foundation",
    category: "SCHOLARSHIP",
    description:
      "A national achievement-based scholarship for high school seniors. 150 students are selected each year to receive a $20,000 college scholarship.",
    eligibilityText:
      "High school students graduating during the 2026–2027 academic year who meet the program's eligibility requirements.",
    tags: [
      "scholarship",
      "leadership",
      "community service",
      "academic achievement",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: 20000,
    deadline: "2026-09-30",
    deadlineNote:
      "Application closes September 30, 2026 at 5:00 PM Eastern.",
    availabilityWindow:
      "2027 application is open August 3 through September 30, 2026.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the official Coca-Cola Scholars Foundation application.",
    officialUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    sourceUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "bae-systems-software-intern-high-school-2027",
    title: "Software Intern (High School) – Summer 2027",
    organization: "BAE Systems, Inc.",
    category: "INTERNSHIP",
    description:
      "A paid software engineering internship for students graduating high school before Summer 2027 and entering an undergraduate computer science, computer engineering, or related program.",
    eligibilityText:
      "Must graduate high school before Summer 2027, enroll in an undergraduate CS, CE, or related program, have programming experience in C, C++, Java, or Python, be a U.S. citizen, and be eligible for a U.S. Department of Defense security clearance.",
    tags: [
      "computer science",
      "software",
      "programming",
      "engineering",
      "technology",
      "python",
      "java",
      "c++",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Southern New Hampshire",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-09-26",
    deadlineNote:
      "Current listing expires September 26, 2026.",
    availabilityWindow:
      "Summer 2027 internship; current recruitment began August 26, 2026.",
    startDate: "2027-06-01",
    durationText: "Summer 2027",
    experienceRequired: "SOME",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the current BAE Systems internship listing.",
    officialUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    sourceUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "ualbany-in-high-school-2026-2027",
    title: "UAlbany in the High School",
    organization: "University at Albany",
    category: "OTHER",
    description:
      "A college-credit program that allows qualified high school students to earn University at Albany credit while still in high school.",
    eligibilityText:
      "Available to qualified high school students through participating high schools. Course eligibility and requirements vary.",
    tags: [
      "college credit",
      "dual enrollment",
      "academic",
      "college preparation",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, NY / Participating High Schools",
    remote: "HYBRID",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: "2026-11-06",
    deadlineNote:
      "Fall registration runs September 7 through November 6, 2026. Full-year registration runs through December 11, 2026.",
    availabilityWindow:
      "Currently registering for the 2026–2027 academic year.",
    startDate: "2026-09-07",
    durationText: "Varies by course",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students must register through the UAlbany in the High School program and participating school.",
    officialUrl:
      "https://www.albany.edu/uhs",
    sourceUrl:
      "https://epay.albany.edu/C21455_ustores/web/store_main.jsp?STOREID=13",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "capital-district-high-school-science-bowl-2027",
    title: "Capital District High School Regional Science Bowl",
    organization: "U.S. Department of Energy National Science Bowl",
    category: "COMPETITION",
    description:
      "A regional high school science and mathematics competition hosted at GE Global Research in Niskayuna.",
    eligibilityText:
      "High school students participating as members of a school team. A teacher or approved coach must handle the team registration.",
    tags: [
      "science",
      "stem",
      "math",
      "physics",
      "chemistry",
      "biology",
      "earth science",
      "competition",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Niskayuna, NY",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-11-23",
    deadlineNote:
      "Coach preregistration opens October 5, 2026 at noon Eastern. Team 1 registration must be submitted before November 24, 2026.",
    availabilityWindow:
      "2027 regional competition; registration opens October 5, 2026.",
    startDate: "2027-03-06",
    durationText: "One-day regional competition",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students participate through a school team. A coach must complete the school and team registration process.",
    officialUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    sourceUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "seaside-sustainability-high-school-internship",
    title: "Seaside Sustainability High School Internship",
    organization: "Seaside Sustainability",
    category: "INTERNSHIP",
    description:
      "A flexible environmental internship where high school students can work on sustainability, environmental science, research, education, communications, and other projects.",
    eligibilityText:
      "High school students may apply. The organization supports both local and virtual interns, with roles depending on current projects and team needs.",
    tags: [
      "environment",
      "sustainability",
      "environmental science",
      "research",
      "leadership",
      "virtual",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States / Virtual",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "No single current deadline is listed; the organization states that it is continually looking for part-time interns.",
    availabilityWindow:
      "Ongoing internship opportunities; availability depends on current projects.",
    startDate: null,
    durationText: "Part-time; varies by project",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Review current internship opportunities and apply through Seaside Sustainability.",
    officialUrl:
      "https://www.seasidesustainability.org/internship-details",
    sourceUrl:
      "https://www.seasidesustainability.org/internship-details",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },
  {
    id: "coca-cola-scholars-2027",
    title: "Coca-Cola Scholars Program",
    organization: "Coca-Cola Scholars Foundation",
    category: "SCHOLARSHIP",
    description:
      "A national achievement-based scholarship for high school seniors. 150 students are selected each year to receive a $20,000 college scholarship.",
    eligibilityText:
      "High school students graduating during the 2026–2027 academic year who meet the program's eligibility requirements.",
    tags: [
      "scholarship",
      "leadership",
      "community service",
      "academic achievement",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: 20000,
    deadline: "2026-09-30",
    deadlineNote:
      "Application closes September 30, 2026 at 5:00 PM Eastern.",
    availabilityWindow:
      "2027 application is open August 3 through September 30, 2026.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the official Coca-Cola Scholars Foundation application.",
    officialUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    sourceUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "bae-systems-software-intern-high-school-2027",
    title: "Software Intern (High School) – Summer 2027",
    organization: "BAE Systems, Inc.",
    category: "INTERNSHIP",
    description:
      "A paid software engineering internship for students graduating high school before Summer 2027 and entering an undergraduate computer science, computer engineering, or related program.",
    eligibilityText:
      "Must graduate high school before Summer 2027, enroll in an undergraduate CS, CE, or related program, have programming experience in C, C++, Java, or Python, be a U.S. citizen, and be eligible for a U.S. Department of Defense security clearance.",
    tags: [
      "computer science",
      "software",
      "programming",
      "engineering",
      "technology",
      "python",
      "java",
      "c++",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Southern New Hampshire",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-09-26",
    deadlineNote:
      "Current listing expires September 26, 2026.",
    availabilityWindow:
      "Summer 2027 internship; current recruitment began August 26, 2026.",
    startDate: "2027-06-01",
    durationText: "Summer 2027",
    experienceRequired: "SOME",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the current BAE Systems internship listing.",
    officialUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    sourceUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "ualbany-in-high-school-2026-2027",
    title: "UAlbany in the High School",
    organization: "University at Albany",
    category: "OTHER",
    description:
      "A college-credit program that allows qualified high school students to earn University at Albany credit while still in high school.",
    eligibilityText:
      "Available to qualified high school students through participating high schools. Course eligibility and requirements vary.",
    tags: [
      "college credit",
      "dual enrollment",
      "academic",
      "college preparation",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, NY / Participating High Schools",
    remote: "HYBRID",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: "2026-11-06",
    deadlineNote:
      "Fall registration runs September 7 through November 6, 2026. Full-year registration runs through December 11, 2026.",
    availabilityWindow:
      "Currently registering for the 2026–2027 academic year.",
    startDate: "2026-09-07",
    durationText: "Varies by course",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students must register through the UAlbany in the High School program and participating school.",
    officialUrl:
      "https://www.albany.edu/uhs",
    sourceUrl:
      "https://epay.albany.edu/C21455_ustores/web/store_main.jsp?STOREID=13",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "capital-district-high-school-science-bowl-2027",
    title: "Capital District High School Regional Science Bowl",
    organization: "U.S. Department of Energy National Science Bowl",
    category: "COMPETITION",
    description:
      "A regional high school science and mathematics competition hosted at GE Global Research in Niskayuna.",
    eligibilityText:
      "High school students participating as members of a school team. A teacher or approved coach must handle the team registration.",
    tags: [
      "science",
      "stem",
      "math",
      "physics",
      "chemistry",
      "biology",
      "earth science",
      "competition",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Niskayuna, NY",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-11-23",
    deadlineNote:
      "Coach preregistration opens October 5, 2026 at noon Eastern. Team 1 registration must be submitted before November 24, 2026.",
    availabilityWindow:
      "2027 regional competition; registration opens October 5, 2026.",
    startDate: "2027-03-06",
    durationText: "One-day regional competition",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students participate through a school team. A coach must complete the school and team registration process.",
    officialUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    sourceUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "seaside-sustainability-high-school-internship",
    title: "Seaside Sustainability High School Internship",
    organization: "Seaside Sustainability",
    category: "INTERNSHIP",
    description:
      "A flexible environmental internship where high school students can work on sustainability, environmental science, research, education, communications, and other projects.",
    eligibilityText:
      "High school students may apply. The organization supports both local and virtual interns, with roles depending on current projects and team needs.",
    tags: [
      "environment",
      "sustainability",
      "environmental science",
      "research",
      "leadership",
      "virtual",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States / Virtual",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "No single current deadline is listed; the organization states that it is continually looking for part-time interns.",
    availabilityWindow:
      "Ongoing internship opportunities; availability depends on current projects.",
    startDate: null,
    durationText: "Part-time; varies by project",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Review current internship opportunities and apply through Seaside Sustainability.",
    officialUrl:
      "https://www.seasidesustainability.org/internship-details",
    sourceUrl:
      "https://www.seasidesustainability.org/internship-details",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },
  {
    id: "coca-cola-scholars-2027",
    title: "Coca-Cola Scholars Program",
    organization: "Coca-Cola Scholars Foundation",
    category: "SCHOLARSHIP",
    description:
      "A national achievement-based scholarship for high school seniors. 150 students are selected each year to receive a $20,000 college scholarship.",
    eligibilityText:
      "High school students graduating during the 2026–2027 academic year who meet the program's eligibility requirements.",
    tags: [
      "scholarship",
      "leadership",
      "community service",
      "academic achievement",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: 20000,
    deadline: "2026-09-30",
    deadlineNote:
      "Application closes September 30, 2026 at 5:00 PM Eastern.",
    availabilityWindow:
      "2027 application is open August 3 through September 30, 2026.",
    startDate: null,
    durationText: null,
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the official Coca-Cola Scholars Foundation application.",
    officialUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    sourceUrl:
      "https://www.coca-colascholarsfoundation.org/apply/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "bae-systems-software-intern-high-school-2027",
    title: "Software Intern (High School) – Summer 2027",
    organization: "BAE Systems, Inc.",
    category: "INTERNSHIP",
    description:
      "A paid software engineering internship for students graduating high school before Summer 2027 and entering an undergraduate computer science, computer engineering, or related program.",
    eligibilityText:
      "Must graduate high school before Summer 2027, enroll in an undergraduate CS, CE, or related program, have programming experience in C, C++, Java, or Python, be a U.S. citizen, and be eligible for a U.S. Department of Defense security clearance.",
    tags: [
      "computer science",
      "software",
      "programming",
      "engineering",
      "technology",
      "python",
      "java",
      "c++",
    ],
    gradeMin: 12,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Southern New Hampshire",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-09-26",
    deadlineNote:
      "Current listing expires September 26, 2026.",
    availabilityWindow:
      "Summer 2027 internship; current recruitment began August 26, 2026.",
    startDate: "2027-06-01",
    durationText: "Summer 2027",
    experienceRequired: "SOME",
    requiredMaterials: [],
    applicationProcessText:
      "Apply through the current BAE Systems internship listing.",
    officialUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    sourceUrl:
      "https://career.albany.edu/jobs/bae-systems-inc-software-intern-high-school-summer-2027-onsite/",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },

  {
    id: "ualbany-in-high-school-2026-2027",
    title: "UAlbany in the High School",
    organization: "University at Albany",
    category: "OTHER",
    description:
      "A college-credit program that allows qualified high school students to earn University at Albany credit while still in high school.",
    eligibilityText:
      "Available to qualified high school students through participating high schools. Course eligibility and requirements vary.",
    tags: [
      "college credit",
      "dual enrollment",
      "academic",
      "college preparation",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Albany, NY / Participating High Schools",
    remote: "HYBRID",
    cost: "PAID",
    costAmount: null,
    award: null,
    deadline: "2026-11-06",
    deadlineNote:
      "Fall registration runs September 7 through November 6, 2026. Full-year registration runs through December 11, 2026.",
    availabilityWindow:
      "Currently registering for the 2026–2027 academic year.",
    startDate: "2026-09-07",
    durationText: "Varies by course",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students must register through the UAlbany in the High School program and participating school.",
    officialUrl:
      "https://www.albany.edu/uhs",
    sourceUrl:
      "https://epay.albany.edu/C21455_ustores/web/store_main.jsp?STOREID=13",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "capital-district-high-school-science-bowl-2027",
    title: "Capital District High School Regional Science Bowl",
    organization: "U.S. Department of Energy National Science Bowl",
    category: "COMPETITION",
    description:
      "A regional high school science and mathematics competition hosted at GE Global Research in Niskayuna.",
    eligibilityText:
      "High school students participating as members of a school team. A teacher or approved coach must handle the team registration.",
    tags: [
      "science",
      "stem",
      "math",
      "physics",
      "chemistry",
      "biology",
      "earth science",
      "competition",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "Niskayuna, NY",
    remote: "IN_PERSON",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: "2026-11-23",
    deadlineNote:
      "Coach preregistration opens October 5, 2026 at noon Eastern. Team 1 registration must be submitted before November 24, 2026.",
    availabilityWindow:
      "2027 regional competition; registration opens October 5, 2026.",
    startDate: "2027-03-06",
    durationText: "One-day regional competition",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Students participate through a school team. A coach must complete the school and team registration process.",
    officialUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    sourceUrl:
      "https://science.osti.gov/wdts/nsb/Regional-Competitions/High-School-Regionals/New-York/NY_New-York-State-Capital-District-High-School-Regional-Science-Bowl",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: "Capital Region, NY",
  },

  {
    id: "seaside-sustainability-high-school-internship",
    title: "Seaside Sustainability High School Internship",
    organization: "Seaside Sustainability",
    category: "INTERNSHIP",
    description:
      "A flexible environmental internship where high school students can work on sustainability, environmental science, research, education, communications, and other projects.",
    eligibilityText:
      "High school students may apply. The organization supports both local and virtual interns, with roles depending on current projects and team needs.",
    tags: [
      "environment",
      "sustainability",
      "environmental science",
      "research",
      "leadership",
      "virtual",
    ],
    gradeMin: 9,
    gradeMax: 12,
    gpaRequirement: null,
    location: "United States / Virtual",
    remote: "REMOTE",
    cost: "FREE",
    costAmount: null,
    award: null,
    deadline: null,
    deadlineNote:
      "No single current deadline is listed; the organization states that it is continually looking for part-time interns.",
    availabilityWindow:
      "Ongoing internship opportunities; availability depends on current projects.",
    startDate: null,
    durationText: "Part-time; varies by project",
    experienceRequired: "NONE",
    requiredMaterials: [],
    applicationProcessText:
      "Review current internship opportunities and apply through Seaside Sustainability.",
    officialUrl:
      "https://www.seasidesustainability.org/internship-details",
    sourceUrl:
      "https://www.seasidesustainability.org/internship-details",
    verificationStatus: "VERIFIED",
    lastVerifiedAt: "2026-09-05",
    isDemoData: false,
    regionTag: null,
  },
];
