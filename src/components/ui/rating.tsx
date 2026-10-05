import * as React from "react";
import { faDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

function Star({ fill }: { fill: number }) {
  const id = React.useId();
  return (
    <svg viewBox="0 0 24 24" className="size-[1em]" aria-hidden>
      <defs>
        <linearGradient id={id}>
          <stop offset={`${fill * 100}%`} stopColor="currentColor" />
          <stop offset={`${fill * 100}%`} stopColor="transparent" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${id})`}
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        d="M12 3.6l2.3 4.9 5.2.7-3.8 3.7.95 5.3L12 15.7l-4.65 2.5.95-5.3-3.8-3.7 5.2-.7z"
      />
    </svg>
  );
}

export function Rating({
  value,
  count,
  size = "sm",
  className,
  showValue = true,
}: {
  value: number;
  count?: number;
  size?: "sm" | "md";
  className?: string;
  showValue?: boolean;
}) {
  return (
    <div
      className={cn("flex items-center gap-1.5 text-clay", size === "sm" ? "text-[0.78rem]" : "text-[0.95rem]", className)}
      itemProp="aggregateRating"
      itemScope
      itemType="https://schema.org/AggregateRating"
    >
      <span className={cn("flex items-center gap-[2px]", size === "md" && "gap-0.5")} aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} fill={Math.max(0, Math.min(1, value - i))} />
        ))}
      </span>
      {showValue ? (
        <span className="font-medium text-ink" itemProp="ratingValue">
          {faDigits(value.toFixed(1))}
        </span>
      ) : null}
      {typeof count === "number" ? (
        <span className="text-ink-faint">
          (<span itemProp="ratingCount">{faDigits(count)}</span> نظر)
        </span>
      ) : null}
      <span className="sr-only">{`امتیاز ${value.toFixed(1)} از ۵`}</span>
    </div>
  );
}

export function Monogram({
  name,
  tone = "sage",
  className,
}: {
  name: string;
  tone?: "sage" | "clay" | "olive" | "sand";
  className?: string;
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const tones = {
    sage: "bg-sage/12 text-sage",
    clay: "bg-clay/14 text-clay",
    olive: "bg-olive/18 text-moss",
    sand: "bg-sand/80 text-ink-soft",
  } as const;
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-semibold ring-1 ring-inset ring-white/60",
        tones[tone],
        className ?? "size-11 text-[0.92rem]",
      )}
    >
      {initials}
    </span>
  );
}
