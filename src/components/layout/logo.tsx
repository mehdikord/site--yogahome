import Link from "next/link";
import { cn } from "@/lib/utils";

export function LotusMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("size-9", className)} role="img" aria-label="نشان خانه یوگا">
      <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 32c-5.5-2.6-9-7-9-12.4C15.5 22 18 25.6 20 32z" />
        <path d="M20 32c5.5-2.6 9-7 9-12.4C24.5 22 22 25.6 20 32z" />
        <path d="M20 32c-3-4-4.4-8.6-4-13.4.1-1.6.4-3.2.9-4.7.6 1.5 1 3 1.3 4.6.7 4.7 1.3 9.2 1.8 13.5z" />
        <path d="M20 32c3-4 4.4-8.6 4-13.4-.1-1.6-.4-3.2-.9-4.7-.6 1.5-1 3-1.3 4.6-.7 4.7-1.3 9.2-1.8 13.5z" />
        <path d="M6 27.5c4.4 2.8 9 4.2 14 4.5 5-.3 9.6-1.7 14-4.5" />
      </g>
    </svg>
  );
}

export function Logo({
  className,
  tone = "dark",
  compact = false,
  href = "/",
}: {
  className?: string;
  tone?: "dark" | "light";
  compact?: boolean;
  href?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="خانه یوگا و ماساژ قائمشهر — صفحه اصلی"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span
        className={cn(
          "relative grid size-11 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[-6deg]",
          tone === "dark" ? "bg-sage text-cream" : "bg-cream/12 text-cream ring-1 ring-inset ring-cream/25",
        )}
      >
        <LotusMark className="size-6" />
      </span>
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "latin text-[0.98rem]",
              tone === "dark" ? "text-ink" : "text-cream",
            )}
          >
            Yoga Home
          </span>
          <span className={cn("mt-1 text-[0.7rem]", tone === "dark" ? "text-ink-faint" : "text-cream/60")}>
            خانه یوگا و ماساژ · قائم‌شهر
          </span>
        </span>
      ) : null}
    </Link>
  );
}
