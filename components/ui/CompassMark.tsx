export default function CompassMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="16" r="1.6" fill="currentColor" />
      <path d="M16 6L19 15L16 26L13 15L16 6Z" fill="currentColor" />
      <path d="M6 16L15 13L16 16L15 19L6 16Z" fill="currentColor" opacity="0.45" />
      <path d="M26 16L17 19L16 16L17 13L26 16Z" fill="currentColor" opacity="0.45" />
    </svg>
  );
}
