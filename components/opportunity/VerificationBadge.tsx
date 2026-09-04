import clsx from "clsx";
import { VerificationStatus } from "@/types";

const CONFIG: Record<
  VerificationStatus,
  { label: string; dot: string; text: string; bg: string }
> = {
  VERIFIED: {
    label: "Verified",
    dot: "bg-forest",
    text: "text-forest",
    bg: "bg-forest-soft",
  },
  NEEDS_VERIFICATION: {
    label: "Needs verification",
    dot: "bg-brass",
    text: "text-[#8A6520]",
    bg: "bg-brass-soft",
  },
  EXPIRED: {
    label: "Expired",
    dot: "bg-clay",
    text: "text-clay",
    bg: "bg-clay-soft",
  },
};

export default function VerificationBadge({
  status,
  className,
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const c = CONFIG[status];
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        c.bg,
        c.text,
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
