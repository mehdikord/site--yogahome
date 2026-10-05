"use client";

import * as React from "react";
import Link from "next/link";
import { site, legalLinks } from "@/data/site";
import { services } from "@/data/services";
import { courseCategories } from "@/data/courses";
import { productCategories } from "@/data/products";
import { articles } from "@/data/articles";
import { LotusMark } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const socialPaths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: <path d="M20.5 4.5L3.8 11.2c-.7.3-.7 1.2.1 1.4l3.9 1.2 1.5 4.4c.2.7 1 .8 1.5.3l2-2 4 2.9c.6.4 1.3.1 1.4-.6l2.4-13c.1-.8-.6-1.4-1.1-1.2z" />,
  whatsapp: <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20zM9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.5 1-1l-.1-1-1.5-.5-.8.8c-1-.4-1.8-1.2-2.2-2.2l.8-.8-.5-1.5-1-.1c-.5 0-1.2.4-1.2.8z" />,
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M11 9.8l4.2 2.2-4.2 2.2z" />
    </>
  ),
};

function Newsletter() {
  const [state, setState] = React.useState<"idle" | "ok" | "error">("idle");
  const [value, setValue] = React.useState("");
  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault();
        setState(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? "ok" : "error");
      }}
      noValidate
    >
      <div className="flex items-center gap-2 rounded-full border border-cream/20 bg-cream/[.07] p-1.5 ps-4">
        <input
          type="email"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setState("idle");
          }}
          placeholder="ایمیل شما برای نامه هفتگی آرامش"
          aria-label="ایمیل"
          className="min-w-0 flex-1 bg-transparent text-[0.85rem] text-cream placeholder:text-cream/45 focus:outline-none"
        />
        <Button type="submit" size="sm" variant="clay" className="shrink-0">
          عضویت
        </Button>
      </div>
      <p
        className={cn(
          "mt-2 text-[0.75rem] transition-opacity duration-300",
          state === "ok" && "text-olive-soft",
          state === "error" && "text-clay-soft",
          state === "idle" && "text-cream/45",
        )}
        role={state === "error" ? "alert" : undefined}
      >
        {state === "ok"
          ? "ثبت شد — این یک نسخه نمایشی است؛ ایمیلی ارسال نمی‌شود."
          : state === "error"
            ? "قالب ایمیل را بررسی کنید."
            : "هر پنجشنبه: یک تمرین کوتاه، یک نکته مراقبت پوست، یک معرفی محصول."}
      </p>
    </form>
  );
}

function Column({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <h3 className="text-[0.78rem] font-semibold tracking-[.18em] text-cream/50">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-[0.88rem]">{children}</ul>
    </div>
  );
}

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="inline-block text-cream/72 transition-colors duration-300 hover:text-cream">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="noise relative mt-8 overflow-hidden bg-sage-900 text-cream">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-70">
        <div className="absolute -top-40 start-1/4 size-[38rem] rounded-full bg-moss/25 blur-[110px]" />
        <div className="absolute -bottom-56 end-0 size-[30rem] rounded-full bg-clay/18 blur-[120px]" />
      </div>

      <div className="container-x relative z-10">
        <div className="grid gap-12 border-b border-cream/12 py-14 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:gap-10 lg:py-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-full bg-cream/10 text-cream">
                <LotusMark className="size-6" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="latin text-[1rem]">Yoga Home</span>
                <span className="mt-1.5 text-[0.78rem] text-cream/60">{site.name}</span>
              </span>
            </div>
            <p className="mt-5 text-[0.9rem] leading-[2] text-cream/70">{site.claim}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {site.socials.map((s) => (
                <a
                  key={s.key}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid size-10 place-items-center rounded-full bg-cream/[.08] text-cream/80 ring-1 ring-inset ring-cream/12 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream/16 hover:text-cream"
                >
                  <svg viewBox="0 0 24 24" className="size-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
                    {socialPaths[s.key]}
                  </svg>
                </a>
              ))}
            </div>
            <Newsletter />
          </div>

          <Column title="خدمات">
            {services.map((s) => (
              <FootLink key={s.slug} href={`/services/${s.slug}`}>{s.name}</FootLink>
            ))}
            <FootLink href="/services">همه خدمات</FootLink>
          </Column>

          <Column title="دوره‌ها">
            {courseCategories.slice(0, 4).map((c) => (
              <FootLink key={c.label} href={`/courses?category=${encodeURIComponent(c.label)}`}>{c.label}</FootLink>
            ))}
            <FootLink href="/courses">کتابخانه دوره‌ها</FootLink>
          </Column>

          <Column title="فروشگاه و مجله">
            {productCategories.slice(0, 3).map((c) => (
              <FootLink key={c.label} href={`/shop?category=${encodeURIComponent(c.label)}`}>{c.label}</FootLink>
            ))}
            <FootLink href="/shop">همه محصولات</FootLink>
            <li className="mt-2 border-t border-cream/10 pt-3 text-[0.78rem] text-cream/45">از بلاگ</li>
            {articles.slice(0, 2).map((a) => (
              <FootLink key={a.slug} href={`/blog/${a.slug}`}>{a.title}</FootLink>
            ))}
          </Column>
        </div>

        <div className="grid gap-8 border-b border-cream/12 py-9 md:grid-cols-3">
          <div>
            <h3 className="text-[0.78rem] font-semibold tracking-[.18em] text-cream/50">تماس</h3>
            <div className="mt-3.5 flex flex-col gap-2 text-[0.88rem] text-cream/75">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="w-fit transition-colors hover:text-cream">
                {site.phone}
              </a>
              <a href={`tel:${site.mobile.replace(/\s/g, "")}`} dir="ltr" className="w-fit transition-colors hover:text-cream">
                {site.mobile}
              </a>
              <a href={`mailto:${site.email}`} dir="ltr" className="w-fit transition-colors hover:text-cream">
                {site.email}
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[0.78rem] font-semibold tracking-[.18em] text-cream/50">آدرس</h3>
            <p className="mt-3.5 text-[0.88rem] leading-[2] text-cream/75">{site.address}</p>
          </div>
          <div>
            <h3 className="text-[0.78rem] font-semibold tracking-[.18em] text-cream/50">ساعات کاری</h3>
            <ul className="mt-3.5 flex flex-col gap-1.5 text-[0.85rem] text-cream/75">
              {site.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span className="text-cream/55">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 py-7 text-[0.78rem] text-cream/50 md:flex-row">
          <p>© {String(1405).replace(/[0-9]/g, (d) => String.fromCharCode(0x06f0 + Number(d)))} خانه یوگا و ماساژ قائمشهر — همه حقوق محفوظ است.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="transition-colors hover:text-cream/80">{l.label}</Link>
              </li>
            ))}
            <li className="latin tracking-[.2em] text-cream/30">made in qaemshahr</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
