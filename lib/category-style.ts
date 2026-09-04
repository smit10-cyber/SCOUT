import { Category } from "@/types";

export interface CategoryStyle {
  text: string;
  bg: string;
  emoji: string;
}

/**
 * One accent color per category so students can scan-recognize categories
 * by color, not just label. Colors are the CSS vars defined in globals.css
 * (see the "Category accent palette" block).
 */
export const CATEGORY_STYLE: Record<Category, CategoryStyle> = {
  SCHOLARSHIP: { text: "text-sun", bg: "bg-sun-soft", emoji: "🎓" },
  INTERNSHIP: { text: "text-sky", bg: "bg-sky-soft", emoji: "💼" },
  RESEARCH: { text: "text-violet", bg: "bg-violet-soft", emoji: "🔬" },
  SUMMER_PROGRAM: { text: "text-coral", bg: "bg-coral-soft", emoji: "☀️" },
  COMPETITION: { text: "text-rose", bg: "bg-rose-soft", emoji: "🏆" },
  FELLOWSHIP: { text: "text-teal", bg: "bg-teal-soft", emoji: "🌟" },
  VOLUNTEER: { text: "text-forest", bg: "bg-forest-soft", emoji: "🤝" },
  LEADERSHIP: { text: "text-ink", bg: "bg-paper-dim", emoji: "🚩" },
  OTHER: { text: "text-muted", bg: "bg-paper-dim", emoji: "🧭" },
};
