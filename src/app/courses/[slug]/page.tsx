import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { courseBySlug, courses, moduleMinutes, totalLessons } from "@/data/courses";
import { serviceBySlug } from "@/data/services";
import { team } from "@/data/about";
import { Section, Badge, SectionHeading } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { Rating, Monogram } from "@/components/ui/rating";
import { Accordion, AccordionItem, Tabs } from "@/components/ui/overlays";
import { CourseCard } from "@/components/cards";
import { EnrollButton } from "@/components/course/enroll";
import { Reveal } from "@/components/bits/motion";
import { faDate, faDigits, faHours, faMinutes, price as faPrice, ratingLabel } from "@/lib/format";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return { title: "دوره پیدا نشد" };
  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: { images: [{ url: course.media }] },
  };
}

const kindIcon = {
  ویدیو: (
    <svg viewBox="0 0 24 24" className="size-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="5.5" width="18" height="13" rx="3" />
      <path d="M10.5 9.8l4 2.2-4 2.2z" fill="currentColor" stroke="none" />
    </svg>
  ),
  متن: (
    <svg viewBox="0 0 24 24" className="size-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M6 4.5h12v15H6z" strokeLinejoin="round" />
      <path d="M9 9h6M9 12.5h6M9 16h3.5" strokeLinecap="round" />
    </svg>
  ),
  تمرین: (
    <svg viewBox="0 0 24 24" className="size-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M4 12h3l2-5 3 10 2-5h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  پرسش: (
    <svg viewBox="0 0 24 24" className="size-[1.05rem]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.8 9.5a2.3 2.3 0 1 1 3 2.2c-.6.3-.8.7-.8 1.3" strokeLinecap="round" />
      <circle cx="12" cy="16.4" r=".7" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const service = serviceBySlug(course.serviceSlug);
  const instructor = team.find((t) => t.name === course.instructor);
  const related = courses.filter((c) => c.slug !== course.slug && (c.category === course.category || c.serviceSlug === course.serviceSlug)).slice(0, 3);
  const discount = course.oldPrice ? Math.round((1 - course.price / course.oldPrice) * 100) : 0;
  const curriculumMinutes = moduleMinutes(course);

  return (
    <>
      {/* --------------------------------- hero -------------------------------- */}
      <header className="noise relative isolate overflow-hidden bg-sage-900 pt-28 pb-14 text-cream lg:pt-36 lg:pb-20">
        <div aria-hidden className="absolute inset-0">
          <Media src={course.poster} alt="" sizes="100vw" className="size-full" imgClassName="opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-900 via-sage-900/90 to-sage-900/60" />
        </div>

        <div className="container-x relative z-10">
          <Breadcrumbs items={[{ label: "دوره‌ها", href: "/courses" }, { label: course.category, href: `/courses?category=${encodeURIComponent(course.category)}` }, { label: course.title }]} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="dark" size="md" className="ring-1 ring-inset ring-cream/20">{course.category}</Badge>
                <Badge tone="dark" size="md" className="bg-cream/15 ring-1 ring-inset ring-cream/20">{course.level}</Badge>
                {course.new ? <Badge tone="clay" size="md" className="bg-clay text-cream">جدید</Badge> : null}
                {discount > 0 ? <Badge tone="clay" size="md" className="bg-clay/25 text-clay-soft">{faDigits(discount)}٪ تخفیف</Badge> : null}
              </div>

              <h1 className="mt-6 text-[2.1rem] leading-[1.32] font-semibold sm:text-[2.7rem]">{course.title}</h1>
              <p className="mt-4 text-[1rem] leading-[1.9] text-sage-soft/90">{course.tagline}</p>
              <p className="mt-5 max-w-2xl text-[0.94rem] leading-[2.05] text-cream/70">{course.summary}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-[0.85rem] text-cream/70">
                <Rating value={course.rating} count={course.ratings} className="text-clay-soft" />
                <span className="text-cream/35">·</span>
                <span>{ratingLabel(course.rating)}</span>
                <span className="text-cream/35">·</span>
                <span>{faDigits(course.students)} هنرجو</span>
                <span className="text-cream/35">·</span>
                <span>{course.kind}</span>
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-cream/[.08] p-3 ring-1 ring-inset ring-cream/12 backdrop-blur-sm">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full">
                  {instructor ? (
                    <Image src={instructor.image} alt={course.instructor} fill sizes="48px" className="object-cover" />
                  ) : (
                    <Monogram name={course.instructor} tone="sand" className="size-12 rounded-full bg-cream/15 text-cream" />
                  )}
                </span>
                <span>
                  <span className="block text-[0.72rem] text-cream/55">مربی دوره</span>
                  <span className="block text-[0.92rem] font-medium text-cream">{course.instructor}</span>
                </span>
                <span className="ms-auto hidden text-[0.78rem] text-cream/55 sm:block">{course.instructorRole}</span>
              </div>
            </div>

            {/* video-style preview card */}
            <Reveal y={30}>
              <div className="overflow-hidden rounded-[1.8rem] bg-cream/8 ring-1 ring-inset ring-cream/15 backdrop-blur-sm">
                <div className="group relative aspect-[16/10] overflow-hidden">
                  <Media src={course.media} alt={course.title} sizes="(max-width:1024px) 92vw, 40vw" className="size-full" imgClassName="transition-transform duration-[1.4s] group-hover:scale-105" />
                  <div className="absolute inset-0 grid place-items-center bg-sage-900/35">
                    <button
                      type="button"
                      className="grid size-16 place-items-center rounded-full bg-cream/92 text-sage shadow-[var(--shadow-lift)] transition-transform duration-500 hover:scale-105"
                      aria-label="پیش‌نمایش ویدیوی معرفی دوره"
                    >
                      <svg viewBox="0 0 24 24" className="size-6 translate-x-[1px]" fill="currentColor" aria-hidden>
                        <path d="M8 5.5l11 6.5L8 18.5z" />
                      </svg>
                    </button>
                  </div>
                  <span className="absolute bottom-3 start-3 rounded-full bg-sage-900/70 px-3 py-1 text-[0.72rem] text-cream backdrop-blur">
                    پیش‌نمایش رایگان · {course.kind}
                  </span>
                </div>
                <div className="grid grid-cols-3 text-center [&>*+*]:border-s [&>*+*]:border-cream/12">
                  {[
                    { l: "مدت", v: faHours(course.hours) },
                    { l: "جلسات", v: `${faDigits(totalLessons(course))}` },
                    { l: "سطح", v: course.level },
                  ].map((s) => (
                    <div key={s.l} className="px-2 py-4">
                      <p className="text-[0.7rem] text-cream/50">{s.l}</p>
                      <p className="mt-1.5 text-[0.88rem] font-medium text-cream">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </header>

      {/* --------------------------------- body -------------------------------- */}
      <Section className="pt-14 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_20.5rem] lg:gap-14">
          <div className="flex flex-col gap-12">
            <Tabs
              defaultValue="about"
              items={[
                {
                  value: "about",
                  label: "درباره دوره",
                  content: (
                    <div className="flex flex-col gap-8">
                      {course.description.map((p, i) => (
                        <p key={i} className="text-[0.98rem] leading-[2.2] text-ink-soft">{p}</p>
                      ))}
                      <div className="rounded-[1.6rem] bg-shell/70 p-6">
                        <h2 className="text-[1.05rem] font-semibold text-ink">پس از پایان این دوره</h2>
                        <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                          {course.outcomes.map((o) => (
                            <li key={o} className="flex gap-3 text-[0.9rem] leading-[1.95] text-ink-soft">
                              <span className="mt-1.5 grid size-4 shrink-0 place-items-center rounded-full bg-sage/12 text-sage">
                                <svg viewBox="0 0 24 24" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="3.4" aria-hidden>
                                  <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              </span>
                              {o}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-[1.05rem] font-semibold text-ink">پیش‌نیازها</h2>
                        <ul className="mt-4 flex flex-col gap-2.5">
                          {course.requirements.map((r) => (
                            <li key={r} className="flex items-start gap-3 text-[0.9rem] leading-[1.95] text-ink-soft">
                              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ),
                },
                {
                  value: "curriculum",
                  label: "سرفصل‌ها",
                  content: (
                    <div>
                      <p className="mb-5 text-[0.86rem] text-ink-soft">
                        {faDigits(course.modules.length)} بخش · {faDigits(totalLessons(course))} جلسه ·{" "}
                        {faHours(Math.round((curriculumMinutes / 60) * 10) / 10)} محتوای ضبط‌شده
                      </p>
                      <Accordion type="single" collapsible defaultValue={course.modules[0]?.title} className="flex flex-col gap-3">
                        {course.modules.map((m, mi) => (
                          <AccordionItemWrapper key={m.title} module={m} index={mi} />
                        ))}
                      </Accordion>
                    </div>
                  ),
                },
                {
                  value: "reviews",
                  label: "نظر هنرجویان",
                  content: (
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-wrap items-center gap-6 rounded-[1.4rem] bg-shell/70 p-6">
                        <div className="flex flex-col">
                          <span className="text-[2.4rem] leading-none font-semibold text-sage">{faDigits(course.rating.toFixed(1))}</span>
                          <Rating value={course.rating} showValue={false} className="mt-2" />
                          <span className="mt-1.5 text-[0.76rem] text-ink-faint">{faDigits(course.ratings)} نظر ثبت‌شده</span>
                        </div>
                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const pct = star === 5 ? 78 : star === 4 ? 17 : star === 3 ? 4 : star === 2 ? 1 : 0;
                            return (
                              <div key={star} className="flex items-center gap-3 py-1">
                                <span className="w-10 text-[0.76rem] text-ink-soft">{faDigits(star)} ستاره</span>
                                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
                                  <span className="block h-full rounded-full bg-olive/70" style={{ width: `${pct}%` }} />
                                </span>
                                <span className="w-8 text-end text-[0.72rem] text-ink-faint">{faDigits(pct)}٪</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {course.reviews.map((r) => (
                        <figure key={r.name} className="rounded-[1.4rem] border border-ink/8 bg-white/60 p-5">
                          <figcaption className="flex items-center gap-3">
                            <Monogram name={r.name} tone={r.rating > 4 ? "sage" : "sand"} />
                            <span className="flex-1">
                              <span className="block text-[0.9rem] font-medium text-ink">{r.name}</span>
                              <span className="block text-[0.75rem] text-ink-faint">{r.city} · {faDate(r.date)}</span>
                            </span>
                            <Rating value={r.rating} showValue={false} />
                          </figcaption>
                          <blockquote className="mt-3.5 text-[0.9rem] leading-[2] text-ink-soft">{r.text}</blockquote>
                        </figure>
                      ))}
                      <p className="text-[0.78rem] text-ink-faint">
                        نظرها نمونه‌اند و برای این نسخه نمایشی نوشته شده‌اند.
                      </p>
                    </div>
                  ),
                },
                {
                  value: "faq",
                  label: "پرسش‌های متداول",
                  content: (
                    <Accordion type="single" collapsible className="flex flex-col gap-3">
                      {course.faq.map((f, i) => (
                        <AccordionItem key={f.q} value={`faq-${i}`} title={f.q}>
                          {f.a}
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ),
                },
              ]}
            />

            {instructor ? (
              <div className="rounded-[1.8rem] border border-ink/8 bg-white/60 p-6 lg:p-8">
                <p className="eyebrow">مربی دوره</p>
                <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="relative aspect-[4/5] w-36 shrink-0 overflow-hidden rounded-[1.3rem]">
                    <Image src={instructor.image} alt={instructor.name} fill sizes="150px" className="object-cover" />
                  </div>
                  <div>
                    <h2 className="text-[1.2rem] font-semibold text-ink">{instructor.name}</h2>
                    <p className="mt-1 text-[0.84rem] text-olive">{instructor.role}</p>
                    <p className="mt-4 text-[0.9rem] leading-[2.05] text-ink-soft">{instructor.bio}</p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {instructor.certifications.map((c) => (
                        <li key={c}><Badge tone="neutral">{c}</Badge></li>
                      ))}
                    </ul>
                    <Link href="/about" className="link-underline mt-5 inline-block text-[0.85rem] font-medium text-sage">
                      تیم ما را بشناسید
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* ------------------------------ purchase card ----------------------------- */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.8rem] border border-ink/8 bg-white/80 shadow-[var(--shadow-lift)]">
              <div className="bg-sage px-6 py-5 text-cream">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[0.74rem] text-cream/60">هزینه دوره</p>
                    {course.oldPrice ? <p className="mt-1 text-[0.8rem] text-cream/50 line-through">{faPrice(course.oldPrice)}</p> : null}
                    <p className="mt-0.5 text-[1.55rem] font-semibold leading-tight">{faPrice(course.price)}</p>
                  </div>
                  {discount > 0 ? <Badge tone="dark" className="bg-clay text-cream">{faDigits(discount)}٪−</Badge> : null}
                </div>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-cream/70">
                  پرداخت در محل، کارت‌به‌کارت یا اقساط ۳ ماهانه — در نسخه واقعی.
                </p>
              </div>

              <div className="flex flex-col gap-4 p-6">
                <EnrollButton title={course.title} price={course.price} className="w-full" />
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">سؤال درباره این دوره</Link>
                </Button>

                <ul className="mt-2 flex flex-col gap-3 border-t border-ink/8 pt-5">
                  {[
                    { l: "قالب", v: course.kind },
                    { l: "مدت کل", v: faHours(course.hours) },
                    { l: "تعداد جلسات", v: `${faDigits(totalLessons(course))} جلسه` },
                    { l: "دسترسی", v: "۱۲ ماه" },
                    { l: "گواهی", v: "بله، پس از ارزیابی پایان" },
                  ].map((row) => (
                    <li key={row.l} className="flex items-center justify-between gap-3 text-[0.85rem]">
                      <span className="text-ink-faint">{row.l}</span>
                      <span className="font-medium text-ink">{row.v}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-1 flex flex-col gap-2.5 rounded-2xl bg-shell/70 p-4">
                  {course.included.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-ink-soft">
                      <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-olive" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                        <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>

                {service ? (
                  <Link
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-dashed border-ink/15 px-4 py-3.5 text-[0.84rem] text-ink-soft transition-colors hover:border-sage/40 hover:text-ink"
                  >
                    پس از دوره: کلاس گروهی {service.name}
                    <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                      <path d="M19 12H5" strokeLinecap="round" />
                      <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </div>

            <p className="mt-4 px-2 text-[0.75rem] leading-relaxed text-ink-faint">
              ثبت‌نام در این نسخه نمایشی است؛ هیچ پرداخت، درگاه یا پایگاه‌داده‌ای وجود ندارد.
            </p>
          </aside>
        </div>
      </Section>

      {/* -------------------------------- related -------------------------------- */}
      {related.length ? (
        <Section className="py-14 lg:py-20">
          <SectionHeading eyebrow="مسیر بعدی" title="دوره‌هایی که هنرجویان این را هم دیدند" link={{ label: "همه دوره‌ها", href: "/courses" }} />
          <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}

function AccordionItemWrapper({ module: m, index }: { module: { title: string; summary: string; lessons: { title: string; minutes: number; kind: keyof typeof kindIcon; free?: boolean }[] }; index: number }) {
  return (
    <AccordionItem
      value={m.title}
      title={
        <span className="flex flex-wrap items-center gap-3">
          <span className="latin text-[0.7rem] tracking-[.2em] text-olive">{String(index + 1).padStart(2, "0")}</span>
          {m.title}
        </span>
      }
      meta={`${faDigits(m.lessons.length)} جلسه · ${faMinutes(m.lessons.reduce((s, l) => s + l.minutes, 0))}`}
    >
      <p className="mb-4 text-[0.84rem] italic text-ink-faint">{m.summary}</p>
      <ul className="flex flex-col divide-y divide-ink/8">
        {m.lessons.map((l) => (
          <li key={l.title} className="flex items-center gap-3.5 py-3 first:pt-0 last:pb-0">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-shell text-ink-soft">{kindIcon[l.kind]}</span>
            <span className="flex-1 text-[0.89rem] text-ink">{l.title}</span>
            {l.free ? <Badge tone="olive">پیش‌نمایش رایگان</Badge> : null}
            <span className="text-[0.76rem] text-ink-faint">{faMinutes(l.minutes)}</span>
          </li>
        ))}
      </ul>
    </AccordionItem>
  );
}
