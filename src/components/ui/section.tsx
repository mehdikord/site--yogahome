import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  id,
  size = "wide",
  as: As = "section",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  size?: "wide" | "narrow" | "full";
  as?: React.ElementType;
}) {
  return (
    <As id={id} className={cn("relative py-16 md:py-24 lg:py-28", className)}>
      <div className={cn("mx-auto w-full", size === "wide" && "container-x", size === "narrow" && "max-w-4xl px-5")}>
        {children}
      </div>
    </As>
  );
}

const badge = cva("inline-flex items-center gap-1.5 rounded-full text-[0.72rem] font-medium tracking-tight", {
  variants: {
    tone: {
      neutral: "bg-ink/[.06] text-ink-soft",
      sage: "bg-sage/10 text-sage",
      olive: "bg-olive/15 text-moss",
      clay: "bg-clay/12 text-clay",
      sand: "bg-sand/70 text-ink-soft",
      cream: "bg-cream/90 text-ink",
      dark: "bg-sage-900/85 text-cream backdrop-blur",
      outline: "border border-ink/15 text-ink-soft",
    },
    size: { sm: "px-2.5 py-1", md: "px-3.5 py-1.5" },
  },
  defaultVariants: { tone: "neutral", size: "sm" },
});

export function Badge({
  className,
  tone,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badge>) {
  return <span data-slot="badge" className={cn(badge({ tone, size }), className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  link,
  align = "start",
  className,
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  link?: { label: string; href: string };
  align?: "start" | "center";
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow ? (
        <span className={cn("eyebrow", tone === "dark" && "text-sage-soft", align === "center" && "justify-center")}>
          {eyebrow}
        </span>
      ) : null}
      <div className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-5", align === "center" && "flex-col items-center")}>
        <h2
          className={cn(
            "max-w-2xl text-balance text-[1.9rem] leading-[1.35] sm:text-[2.35rem] lg:text-[2.7rem]",
            tone === "dark" ? "text-cream" : "text-ink",
          )}
        >
          {title}
        </h2>
        {link ? (
          <Link
            href={link.href}
            className={cn(
              "link-underline inline-flex items-center gap-2 pb-1 text-[0.92rem] font-medium",
              tone === "dark" ? "text-cream/85 hover:text-cream" : "text-sage hover:text-sage-700",
            )}
          >
            {link.label}
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M19 12H5" strokeLinecap="round" />
              <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : null}
      </div>
      {lead ? (
        <p className={cn("max-w-2xl text-[1rem] leading-[2]", tone === "dark" ? "text-cream/70" : "text-ink-soft")}>{lead}</p>
      ) : null}
    </div>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn("hairline w-full", className)} />;
}

export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-3 py-2", className)} aria-hidden>
      <span className="h-px w-10 bg-ink/12" />
      <svg viewBox="0 0 24 24" className="size-3 text-olive/70" fill="currentColor">
        <path d="M12 4c2.4 2.7 3.6 5.3 3.6 8 0 3.2-1.6 5.3-3.6 4-2-1.3-3.6-.8-3.6-4 0-2.7 1.2-5.3 3.6-8z" />
      </svg>
      <span className="h-px w-10 bg-ink/12" />
    </div>
  );
}
