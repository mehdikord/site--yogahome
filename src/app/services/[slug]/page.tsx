import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/data/services";
import { courses } from "@/data/courses";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/page-hero";
import { Media } from "@/components/ui/media";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/cards";
import { OrganicBackdrop, Parallax, Reveal } from "@/components/bits/motion";
import { site } from "@/data/site";
import { price as faPrice } from "@/lib/format";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return { title: "خدمت پیدا نشد" };
  return {
    title: `${service.name} · خانه یوگا قائمشهر`,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { images: [{ url: service.cover }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const relatedCourses = courses.filter((c) => c.serviceSlug === service.slug).slice(0, 3);
  const relatedServices = services.filter((s) => service.related.includes(s.slug));

  return (
    <>
      {/* ------------------------------- hero ------------------------------- */}
      <header className="noise relative isolate mt-0 overflow-hidden bg-sage-900 pt-28 pb-16 text-cream lg:pt-36 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <Parallax strength={26} className="size-full">
            <Media src={service.hero} alt={service.name} sizes="100vw" className="size-full" imgClassName="opacity-40" priority />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900 via-sage-900/85 to-sage-900/55" />
        </div>
        <OrganicBackdrop tone="dark" className="opacity-50" />

        <div className="container-x relative z-10">
          <Breadcrumbs items={[{ label: "خدمات", href: "/services" }, { label: service.name }]} />

          <div className="mt-8 grid items-end gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <span className="eyebrow text-sage-soft">{service.eyebrow}</span>
              <h1 className="mt-5 text-[2.4rem] leading-[1.24] font-semibold sm:text-[3.1rem] lg:text-[3.7rem]">{service.name}</h1>
              <p className="mt-5 max-w-xl text-[1.1rem] leading-[1.9] text-sage-soft/90">{service.tagline}</p>
              <p className="mt-6 max-w-2xl text-[0.96rem] leading-[2.1] text-cream/70">{service.summary}</p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg" variant="clay">
                  <Link href="/contact">رزرو {service.name === "یوگا" ? "کلاس" : "جلسه"}</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="text-cream hover:bg-cream/12 hover:text-cream">
                  <a href={`tel:${site.mobile.replace(/\s/g, "")}`} dir="ltr">{site.mobile}</a>
                </Button>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {service.formats.map((f) => (
                <div
                  key={f.name}
                  className={`rounded-[1.4rem] p-5 backdrop-blur-sm transition-colors duration-300 ${
                    f.highlight ? "bg-cream text-sage-900" : "bg-cream/10 text-cream ring-1 ring-inset ring-cream/15"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className={`text-[0.95rem] font-medium ${f.highlight ? "text-ink" : "text-cream"}`}>{f.name}</p>
                    {f.highlight ? <Badge tone="clay" className="bg-clay text-cream">پیشنهاد ما</Badge> : null}
                  </div>
                  <p className={`mt-1.5 text-[0.8rem] ${f.highlight ? "text-ink-soft" : "text-cream/60"}`}>{f.detail}</p>
                  <p className={`mt-3.5 text-[1.15rem] font-semibold ${f.highlight ? "text-sage" : "text-cream"}`}>
                    {faPrice(f.price)}
                    <span className={`ms-2 text-[0.75rem] font-normal ${f.highlight ? "text-ink-faint" : "text-cream/50"}`}>/ {f.unit}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------ intro ------------------------------- */}
      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow={`درباره ${service.name}`} title="آنچه در یک جلسه تجربه می‌کنید" />
            <div className="mt-7 flex flex-col gap-5">
              {service.intro.map((p, i) => (
                <Reveal key={i} delay={i * 70}>
                  <p className="text-[0.98rem] leading-[2.15] text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>
            <div className="mt-9 rounded-[1.5rem] bg-shell/70 p-6">
              <p className="text-[0.78rem] font-medium tracking-[.14em] text-olive">برای چه کسانی مناسب است</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {service.audience.map((a) => (
                  <li key={a} className="flex gap-2.5 text-[0.88rem] leading-[1.9] text-ink-soft">
                    <svg viewBox="0 0 24 24" className="mt-1 size-3.5 shrink-0 text-sage" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Reveal y={36}>
            <div className="flex flex-col gap-4">
              <div className="grain-frame relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-soft)]">
                <Media src={service.gallery[0]} alt={`${service.name} — فضای کار`} sizes="(max-width:1024px) 92vw, 45vw" className="size-full" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {service.gallery.slice(1).map((g, i) => (
                  <div key={g} className={`grain-frame relative overflow-hidden rounded-[1.4rem] ${i === 0 ? "aspect-[4/3.2]" : "aspect-[4/3.2]"}`}>
                    <Media src={g} alt={`${service.name} — جزئیات`} sizes="(max-width:768px) 45vw, 22vw" className="size-full" />
                  </div>
                ))}
              </div>
              <p className="rounded-2xl border border-dashed border-ink/15 px-5 py-4 text-[0.8rem] leading-[1.95] text-ink-faint">
                {service.note}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------ benefits ----------------------------- */}
      <Section className="bg-gradient-to-b from-transparent via-shell/45 to-transparent py-18 lg:py-24">
        <SectionHeading
          eyebrow="فایده‌های تمرین"
          title="چه چیزی بعد از جلسه با شما می‌ماند"
          lead="ادعای پزشکی نمی‌کنیم؛ این‌ها بازخوردهایی است که مهمان‌های ما در نظرات پایان جلسه بیش از بقیه نوشته‌اند."
        />
        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {service.benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 80}>
              <div className="card-hover h-full rounded-[1.4rem] bg-white/75 p-6 shadow-[var(--shadow-inset),var(--shadow-soft)]">
                <span className="latin text-[0.72rem] tracking-[.24em] text-olive">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3.5 text-[1.05rem] font-medium text-ink">{b.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-[1.95] text-ink-soft">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------- process ----------------------------- */}
      <Section className="py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="ساختار جلسه" title={`${service.process.length} مرحله، از ورود تا خروج`} lead="زمان‌بندی حدودی هر جلسه؛ سرعت واقعی بسته به شما تنظیم می‌شود." />
            <div className="mt-8 flex flex-wrap gap-2">
              {service.schedule.slice(0, 2).map((s) => (
                <Badge key={s.day} tone="sage" size="md">{s.day} · {s.time}</Badge>
              ))}
            </div>
          </div>

          <ol className="relative flex flex-col gap-2">
            <span aria-hidden className="absolute bottom-8 top-8 start-[1.4rem] w-px bg-gradient-to-b from-olive/50 via-ink/12 to-transparent" />
            {service.process.map((step, i) => (
              <Reveal key={step.step} delay={i * 90}>
                <li className="relative flex gap-6 rounded-[1.4rem] p-4 transition-colors duration-300 hover:bg-white/60">
                  <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-sage text-[0.85rem] font-semibold text-cream shadow-[var(--shadow-soft)]">
                    {step.step}
                  </span>
                  <span className="flex-1">
                    <span className="flex flex-wrap items-center gap-3">
                      <span className="text-[1.05rem] font-medium text-ink">{step.title}</span>
                      <span className="rounded-full bg-sand/70 px-2.5 py-0.5 text-[0.72rem] text-ink-soft">{step.time}</span>
                    </span>
                    <span className="mt-2 block text-[0.9rem] leading-[2] text-ink-soft">{step.text}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------ schedule ----------------------------- */}
      <Section className="py-14">
        <div className="grid gap-8 rounded-[2rem] border border-ink/8 bg-white/60 p-7 lg:grid-cols-[1fr_1.2fr] lg:p-10">
          <div>
            <h2 className="text-[1.5rem] leading-snug text-ink">برنامه هفتگی</h2>
            <p className="mt-4 text-[0.9rem] leading-[2] text-ink-soft">
              ظرفیت هر گروه محدود است. برای رزرو زمان دلخواه، یک روز قبل تماس بگیرید یا از فرم تماس استفاده کنید.
            </p>
            <Button asChild className="mt-7">
              <Link href="/contact">رزرو زمان</Link>
            </Button>
          </div>
          <ul className="flex flex-col divide-y divide-ink/8">
            {service.schedule.map((s) => (
              <li key={s.day + s.time} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-4">
                <span className="text-[0.94rem] font-medium text-ink">{s.day}</span>
                <span className="text-[0.88rem] text-ink-soft">{s.time}</span>
                <Badge tone="olive">{s.kind}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------- related links -------------------------- */}
      {relatedCourses.length ? (
        <Section className="py-12 lg:py-16">
          <SectionHeading eyebrow="آموزش عمیق‌تر" title={`دوره‌های مرتبط با ${service.name}`} link={{ label: "همه دوره‌ها", href: "/courses" }} />
          <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedCourses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section className="py-12 lg:py-16">
        <div className="rounded-[2rem] bg-shell/70 p-8 lg:p-10">
          <h2 className="text-[1.35rem] text-ink">خدمات دیگر مجموعه</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="group flex items-center gap-4 rounded-[1.3rem] bg-white/75 p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl">
                  <Media src={s.cover} alt={s.name} sizes="70px" className="size-full" imgClassName="img-zoom" />
                </span>
                <span>
                  <span className="block text-[0.95rem] font-medium text-ink">{s.name}</span>
                  <span className="mt-1 block line-clamp-2 text-[0.78rem] leading-relaxed text-ink-faint">{s.tagline}</span>
                </span>
              </Link>
            ))}
            <Link href="/contact" className="flex items-center justify-between gap-4 rounded-[1.3rem] border border-dashed border-ink/20 p-4 text-[0.92rem] text-ink-soft transition-colors hover:border-sage/50 hover:text-ink">
              سؤال دارید؟ مشاوره رایگان
              <span className="grid size-9 place-items-center rounded-full bg-sage text-cream">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M19 12H5" strokeLinecap="round" />
                  <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
