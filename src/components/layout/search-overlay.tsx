"use client";

import * as React from "react";
import Link from "next/link";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { courses } from "@/data/courses";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { services } from "@/data/services";
import { matches, normalizeFa } from "@/lib/utils";
import { price as faPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Media } from "@/components/ui/media";

type Hit = { kind: string; title: string; sub: string; href: string; img: string; meta?: string };

const pool: Hit[] = [
  ...courses.map((c) => ({
    kind: "دوره",
    title: c.title,
    sub: c.category,
    href: `/courses/${c.slug}`,
    img: c.poster,
    meta: faPrice(c.price),
  })),
  ...products.map((p) => ({
    kind: "محصول",
    title: p.name,
    sub: p.category,
    href: `/shop/${p.slug}`,
    img: p.images[0],
    meta: faPrice(p.price),
  })),
  ...articles.map((a) => ({ kind: "مقاله", title: a.title, sub: a.category, href: `/blog/${a.slug}`, img: a.cover })),
  ...services.map((s) => ({ kind: "خدمت", title: s.name, sub: s.tagline, href: `/services/${s.slug}`, img: s.cover })),
];

const suggestions = ["ماساژ عمقی", "مدیتیشن خواب", "مت چوب‌پنبه", "روتین پوستی", "یوگا از صفر"];

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 60);
    else setQuery("");
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  const results = React.useMemo(() => {
    const q = normalizeFa(query);
    if (!q) return [];
    return pool.filter((h) => matches(query, h.title, h.sub, h.kind)).slice(0, 8);
  }, [query]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[90] bg-sage-900/55 backdrop-blur-[3px] data-[state=open]:animate-[fade-in_.25s_ease] data-[state=closed]:animate-[fade-out_.2s_ease]" />
        <DialogPrimitive.Content
          aria-label="جستجو در دوره‌ها، محصولات و مقالات"
          className="fixed left-1/2 top-[min(14vh,8rem)] z-[95] w-[min(44rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-[1.6rem] bg-cream shadow-[var(--shadow-lift)] outline-none data-[state=open]:animate-[search-in_.4s_cubic-bezier(.22,1,.36,1)]"
        >
          <div className="flex items-center gap-3 border-b border-ink/8 px-5 py-4">
            <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجو در دوره‌ها، خدمات، مقالات و محصولات…"
              className="flex-1 bg-transparent text-[0.98rem] text-ink placeholder:text-ink-faint/80 focus:outline-none"
            />
            <DialogPrimitive.Close className="rounded-full bg-ink/[.05] px-3 py-1 text-[0.72rem] text-ink-soft transition-colors hover:bg-ink/10">
              Esc
            </DialogPrimitive.Close>
          </div>

          <div className="max-h-[58vh] overflow-y-auto overscroll-contain p-3">
            {!query ? (
              <div className="p-3">
                <p className="mb-3 text-[0.78rem] text-ink-faint">جستجوهای پیشنهادی</p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuery(s)}
                      className="rounded-full border border-ink/10 bg-white/60 px-3.5 py-1.5 text-[0.82rem] text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group overflow-hidden rounded-2xl border border-ink/8"
                      onClick={() => onOpenChange(false)}
                    >
                      <div className="relative aspect-[4/3]">
                        <Media src={s.cover} alt={s.name} sizes="20vw" className="size-full" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <span className="block px-3 py-2 text-[0.8rem] text-ink">{s.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <p className="p-8 text-center text-[0.9rem] text-ink-soft">
                نتیجه‌ای پیدا نشد. با «ماساژ» یا «یوگا» دوباره امتحان کنید.
              </p>
            ) : (
              <ul className="flex flex-col">
                {results.map((hit) => (
                  <li key={`${hit.kind}${hit.href}`}>
                    <Link
                      href={hit.href}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-white",
                      )}
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-shell">
                        <Media src={hit.img} alt={hit.title} sizes="60px" className="size-full" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.92rem] text-ink">{hit.title}</span>
                        <span className="block truncate text-[0.78rem] text-ink-faint">{hit.sub}</span>
                      </span>
                      <span className="shrink-0 text-[0.78rem] text-ink-faint">{hit.kind}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-ink/8 bg-shell/50 px-5 py-3 text-[0.74rem] text-ink-faint">
            <span>نمونه جستجو — نتیجه‌ها از داده‌های محلی این نسخه نمایشی می‌آیند.</span>
            <span className="latin hidden sm:block">demo search</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
