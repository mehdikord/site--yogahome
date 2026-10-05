import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { OrganicBackdrop, Parallax } from "@/components/bits/motion";
import { Badge } from "@/components/ui/section";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-2 text-[0.78rem] text-cream/55">
      <Link href="/" className="transition-colors hover:text-cream">خانه</Link>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          <span aria-hidden className="text-cream/30">/</span>
          {item.href ? (
            <Link href={item.href} className="transition-colors hover:text-cream">{item.label}</Link>
          ) : (
            <span className="text-cream/80">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  breadcrumbs,
  chips,
  actions,
  align = "start",
  size = "md",
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  image: string;
  imageAlt: string;
  breadcrumbs?: { label: string; href?: string }[];
  chips?: string[];
  actions?: React.ReactNode;
  align?: "start" | "center";
  size?: "md" | "lg";
}) {
  return (
    <header
      className={cn(
        "noise relative isolate mt-0 overflow-hidden bg-sage-900 pt-28 text-cream",
        size === "lg" ? "pb-16 lg:pt-40 lg:pb-24" : "pb-14 lg:pt-36 lg:pb-16",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_85%_0%,rgba(167,181,145,.20),transparent_60%)]" />
        <div className="absolute inset-y-0 end-0 hidden w-[46%] lg:block">
          <Parallax strength={18} className="size-full">
            <Image src={image} alt={imageAlt} fill sizes="46vw" className="object-cover opacity-40 mix-blend-luminosity" priority />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-l from-sage-900/25 via-sage-900/70 to-sage-900" />
        </div>
        <div className="absolute inset-0 lg:hidden">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-25" />
          <div className="absolute inset-0 bg-sage-900/80" />
        </div>
      </div>

      <OrganicBackdrop tone="dark" className="opacity-60" />

      <div className={cn("container-x relative z-10", align === "center" && "text-center")}>
        {breadcrumbs ? (
          <div className={cn("mb-7 flex", align === "center" && "justify-center")}>
            <Breadcrumbs items={breadcrumbs} />
          </div>
        ) : null}

        <div className={cn("max-w-2xl", align === "center" && "mx-auto max-w-3xl")}>
          <span className="eyebrow text-sage-soft">{eyebrow}</span>
          <h1
            className={cn(
              "mt-5 text-balance leading-[1.28] font-semibold",
              size === "lg" ? "text-[2.35rem] sm:text-[3rem] lg:text-[3.55rem]" : "text-[2.1rem] sm:text-[2.65rem] lg:text-[3.05rem]",
            )}
          >
            {title}
          </h1>
          {lead ? <p className={cn("mt-6 text-[1rem] leading-[2.1] text-cream/72", size === "lg" && "text-[1.05rem]")}>{lead}</p> : null}

          {chips?.length ? (
            <ul className={cn("mt-7 flex flex-wrap gap-2", align === "center" && "justify-center")}>
              {chips.map((chip) => (
                <li key={chip}>
                  <Badge tone="dark" size="md" className="ring-1 ring-inset ring-cream/15">
                    {chip}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : null}

          {actions ? <div className={cn("mt-9 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}
