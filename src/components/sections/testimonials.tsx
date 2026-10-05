"use client";

import * as React from "react";
import { testimonials, aggregate, contextFilters } from "@/data/testimonials";
import { TestimonialCard } from "@/components/cards";
import { Section, SectionHeading } from "@/components/ui/section";
import { faDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [filter, setFilter] = React.useState<string>("همه");
  const scroller = React.useRef<HTMLDivElement | null>(null);

  const list = React.useMemo(() => {
    if (filter === "همه") return testimonials;
    if (filter === "دوره‌ها") return testimonials.filter((t) => t.context.kind === "دوره");
    return testimonials.filter((t) => t.context.kind === filter);
  }, [filter]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.82, 420);
    el.scrollBy({ left: dir * amount * (document.dir === "rtl" ? -1 : 1), behavior: "smooth" });
  };

  return (
    <Section className="overflow-hidden bg-gradient-to-b from-transparent via-shell/45 to-transparent py-20 lg:py-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="تجربه مهمان‌ها"
          title="۱۲۸ نظر درباره کلاس، دوره و فروشگاه"
          lead="نظرهایی که در فرم پایان جلسه، پنل دوره و پیام‌های اینستاگرام ثبت شده‌اند — بدون سانسور، با همان لحن."
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="نظر قبلی"
            className="grid size-11 place-items-center rounded-full border border-ink/12 bg-white/70 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M5 12h14" strokeLinecap="round" />
              <path d="M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="نظر بعدی"
            className="grid size-11 place-items-center rounded-full border border-ink/12 bg-white/70 text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M19 12H5" strokeLinecap="round" />
              <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-9 flex flex-wrap items-center gap-2">
        {contextFilters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full px-4 py-2 text-[0.82rem] transition-all duration-300",
              filter === f ? "bg-sage text-cream shadow-[var(--shadow-soft)]" : "border border-ink/10 bg-white/60 text-ink-soft hover:border-ink/25 hover:text-ink",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div
        ref={scroller}
        className="scrollbar-none -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 lg:-mx-8 lg:px-8"
      >
        {list.map((item) => (
          <div key={item.id} className="w-[min(88vw,25rem)] shrink-0 snap-start">
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 rounded-[1.6rem] border border-ink/8 bg-white/55 p-6 sm:grid-cols-3">
        {[
          { label: "میانگین امتیاز دوره‌ها", value: aggregate.courses },
          { label: "رضایت از کلاس و خدمات", value: aggregate.studio },
          { label: "امتیاز محصولات فروشگاه", value: aggregate.shop },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-4">
            <span className="text-[1.9rem] font-semibold leading-none text-sage">{faDigits(s.value.toFixed(1))}</span>
            <span className="text-[0.84rem] leading-relaxed text-ink-soft">
              {s.label}
              <span className="mt-1 block text-[0.74rem] text-ink-faint">از ۵</span>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}
