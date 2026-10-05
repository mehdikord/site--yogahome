"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/section";
import { Marquee, OrganicBackdrop, Parallax, Reveal, TextReveal, usePrefersReducedMotion } from "@/components/bits/motion";
import { faDigits } from "@/lib/format";

const trustFacts = [
  "سالن تمرین با نور طبیعی",
  "گروه‌های حداکثر ۸ نفره",
  "مشاوره اولیه رایگان",
  "مربیان دارای گواهی",
];

function NextClassChip() {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream/95 p-3.5 shadow-[var(--shadow-lift)] backdrop-blur">
      <span className="relative grid size-10 place-items-center rounded-full bg-sage/10 text-sage">
        <span className="absolute inset-0 animate-breathe rounded-full bg-sage/15" aria-hidden />
        <svg viewBox="0 0 24 24" className="relative size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8.5v4l2.6 1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[0.72rem] text-ink-faint">جلسه بعدی، امروز</span>
        <span className="text-[0.88rem] font-medium text-ink">وینیاسا · ۱۸:۰۰ — ۳ جا مانده</span>
      </span>
    </div>
  );
}

export function Hero() {
  const reduced = usePrefersReducedMotion();
  return (
    <section className="noise relative isolate overflow-hidden pt-24 pb-10 sm:pt-28 lg:pt-32 lg:pb-16">
      <OrganicBackdrop />

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-14 xl:gap-20">
          {/* ---------------------------- copy column ---------------------------- */}
          <div className="relative z-10">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-[0.78rem] text-ink-soft">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-olive/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-olive" />
                </span>
                امروز باز است — {site.hours[0].time}
              </span>
            </Reveal>

            <h1 className="mt-7 text-[2.55rem] leading-[1.22] font-semibold tracking-tight text-ink sm:text-[3.3rem] lg:text-[3.85rem]">
              <TextReveal text="خانه یوگا و ماساژ" delay={110} />
              <span className="mt-1 block text-sage">
                <TextReveal text="قائم‌شهر" delay={330} />
              </span>
            </h1>

            <Reveal delay={260}>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-[2.15] text-ink-soft">
                <span className="font-medium text-ink">آرامش، تعادل و مراقبت از خود</span> — یوگا و مدیتیشن، ماساژ تخصصی و
                پاکسازی پوست، دوره‌های آموزشی و فروشگاه ابزار تمرین؛ همه در خانه‌ای که برای نفس کشیدن ساخته شده است.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/services">
                    مشاهده خدمات
                    <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover/btn:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                      <path d="M19 12H5" strokeLinecap="round" />
                      <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/courses">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                      <path d="M4 6.5c2.7-1 5.3-1 8 0v12c-2.7-1-5.3-1-8 0v-12z" strokeLinejoin="round" />
                      <path d="M12 6.5c2.7-1 5.3-1 8 0v12c-2.7-1-5.3-1-8 0" strokeLinejoin="round" />
                    </svg>
                    شروع یادگیری
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={420}>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-ink/8 pt-6">
                {trustFacts.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[0.84rem] text-ink-soft">
                    <svg viewBox="0 0 24 24" className="size-4 text-olive" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* --------------------------- visual column --------------------------- */}
          <div className="relative">
            <Reveal y={40} delay={120}>
              <div className="relative">
                {/* organic frame behind the photo */}
                <div
                  aria-hidden
                  className="absolute -inset-4 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_30%_20%,rgba(125,141,97,.28),transparent_70%)] blur-2xl"
                />
                <div className="grain-frame relative aspect-[4/5] overflow-hidden rounded-[2.4rem] shadow-[var(--shadow-lift)] sm:aspect-[5/5.4] lg:aspect-[4/4.7]">
                  <Image
                    src="/img/hero.jpg"
                    alt="تمرین یوگا در سالن نورگیر خانه یوگا قائمشهر"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className={`object-cover ${reduced ? "" : "animate-kenburns"}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-900/45 via-transparent to-transparent" aria-hidden />

                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                    <div className="rounded-2xl bg-sage-900/55 px-3.5 py-2.5 text-cream backdrop-blur-md">
                      <p className="text-[0.7rem] text-cream/65">تمرین صبح</p>
                      <p className="text-[0.88rem] font-medium">هاتا یوگا · ۷:۰۰</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-cream/92 px-3 py-1.5 text-[0.78rem] font-medium text-ink">
                      <svg viewBox="0 0 24 24" className="size-3.5 text-clay" fill="currentColor" aria-hidden>
                        <path d="M12 3.6l2.3 4.9 5.2.7-3.8 3.7.95 5.3L12 15.7l-4.65 2.5.95-5.3-3.8-3.7 5.2-.7z" />
                      </svg>
                      {faDigits("4.9")} رضایت
                    </div>
                  </div>
                </div>

                {/* floating chips, parallax on scroll */}
                <Parallax strength={-26} className="absolute -start-6 top-[18%] hidden w-[16.5rem] lg:block">
                  <NextClassChip />
                </Parallax>
                <Parallax strength={22} className="absolute -end-5 bottom-[14%] hidden lg:block">
                  <div className="relative h-[8.5rem] w-[7.5rem] overflow-hidden rounded-[1.4rem] border-4 border-cream shadow-[var(--shadow-lift)]">
                    <Image src="/img/massage.jpg" alt="اتاق ماساژ با نور گرم" fill sizes="130px" className="object-cover" />
                  </div>
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* keyword band */}
      <div className="mask-fade-x mt-14 border-y border-ink/8 bg-white/40 py-3.5 lg:mt-20">
        <Marquee
          duration={54}
          items={[
            "یوگا",
            "مدیتیشن",
            "ماساژ سوئدی",
            "بافت عمقی",
            "پاکسازی صورت",
            "دوره مربیگری",
            "تنفس و خواب",
            "فروشگاه ابزار تمرین",
            "کارگاه‌های ماهانه",
            "سبک زندگی سالم",
          ].map((word) => (
            <span key={word} className="flex items-center gap-10 text-[0.95rem] text-ink-soft">
              <span>{word}</span>
              <svg viewBox="0 0 24 24" className="size-3 text-olive/60" fill="currentColor" aria-hidden>
                <path d="M12 3c3 3.4 4.5 6.6 4.5 9.8 0 3.6-2 6-4.5 4.6C9.5 18.8 7.5 16.4 7.5 12.8 7.5 9.6 9 6.4 12 3z" />
              </svg>
            </span>
          ))}
        />
      </div>

      <div className="container-x flex justify-center pt-8">
        <a
          href="#intro"
          className="group flex flex-col items-center gap-2 text-[0.72rem] text-ink-faint transition-colors hover:text-ink"
          aria-label="اسکرول به بخش بعدی"
        >
          ادامه
          <span className="relative block h-10 w-px bg-ink/15">
            <span className="absolute inset-x-0 top-0 block h-3 animate-float rounded-full bg-sage" />
          </span>
        </a>
      </div>
    </section>
  );
}

export function HeroBadgeRow() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge tone="olive">خانه یوگا · از ۱۳۹</Badge>
      <Badge tone="sand">قائم‌شهر، مازندران</Badge>
    </div>
  );
}
