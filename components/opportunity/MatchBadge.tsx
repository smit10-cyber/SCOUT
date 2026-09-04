import clsx from "clsx";

const TIER_COLOR: Record<string, { ring: string; text: string }> = {
  STRONG: { ring: "#2F6B4F", text: "#2F6B4F" },
  REVIEW: { ring: "#C9922E", text: "#8A6520" },
  LOW: { ring: "#B5482F", text: "#B5482F" },
};

export default function MatchBadge({
  score,
  tier,
  size = "md",
}: {
  score: number;
  tier: "STRONG" | "REVIEW" | "LOW";
  size?: "sm" | "md" | "lg";
}) {
  const colors = TIER_COLOR[tier];
  const dims = size === "lg" ? 88 : size === "sm" ? 44 : 60;
  const stroke = size === "lg" ? 5 : size === "sm" ? 3 : 4;
  const r = dims / 2 - stroke;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - score / 100);

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: dims, height: dims }}
      role="img"
      aria-label={`${score} percent match`}
    >
      <svg width={dims} height={dims} viewBox={`0 0 ${dims} ${dims}`} className="-rotate-90">
        <circle
          cx={dims / 2}
          cy={dims / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={dims / 2}
          cy={dims / 2}
          r={r}
          fill="none"
          stroke={colors.ring}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span
        className={clsx(
          "absolute font-display font-semibold",
          size === "lg" ? "text-xl" : size === "sm" ? "text-[11px]" : "text-sm"
        )}
        style={{ color: colors.text }}
      >
        {score}%
      </span>
    </div>
  );
}
