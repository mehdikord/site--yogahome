import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { story, mission, vision, values, timeline, achievements, studioExperience, team, meditationLead } from "@/data/about";
import { site } from "@/data/site";
import { Section, SectionHeading, Badge, Divider } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { InstructorCard } from "@/components/cards";
import { CountUp, Parallax, Reveal } from "@/components/bits/motion";
import { faDigits } from "@/lib/format";
import { LotusMark } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "داستان خانه یوگا و ماساژ قائمشهر: از یک اتاق با هشت مت تا سالن تمرین، اتاق ماساژ، پلتفرم آموزشی و فروشگاه. ارزش‌ها، تیم و مسیر ما.",
  alternates: { canonical: "/about" },
};

const valueIcons: Record<string, React.ReactNode> = {
  leaf: <path d="M5 19c0-7 4-11 14-12-1 10-5 13-11 13-1.6 0-2.4-.4-3-1z" />,
  breath: <path d="M4 12h5a3 3 0 1 0-3-3M20 12h-5a3 3 0 1 1 3 3M4 12c0 2 1.4 3 3 3M20 12c0-2-1.4-3-3-3" />,
  hands: <path d="M7 13l3-6 4 8 3-4M4 19h16" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" /></>,
  shield: <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z" />,
  circle: <><circle cx="12" cy="12" r="8" /><path d="M12 4v8l5 3" /></>,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="درباره ما"
        title="خانه‌ای که از یک اتاق هشت‌متری شروع شد"
        lead="ما یک استودیوی کوچک در قائم‌شهریم که روی سه چیز وسواس دارد: نور طبیعی، گروه‌های کوچک و مربیانی که حال شما را جدی می‌گیرند."
        image="/img/studio.jpg"
        imageAlt="فضای داخلی سالن خانه یوگا"
        breadcrumbs={[{ label: "درباره ما" }]}
        size="lg"
        chips={[`از سال ${faDigits(site.founded)}`, "قائم‌شهر · مازندران", "۱۹ مربی و درمانگر"]}
        actions={
          <>
            <Button asChild size="lg" variant="clay"><Link href="/contact">رزرو جلسه معرفی</Link></Button>
            <Button asChild size="lg" variant="ghost" className="text-cream hover:bg-cream/12 hover:text-cream">
              <Link href="/courses">دیدن دوره‌ها</Link>
            </Button>
          </>
        }
      />

      {/* --------------------------------- story -------------------------------- */}
      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="داستان ما" title="چرا «خانه»؟" />
            <div className="mt-7 flex flex-col gap-5">
              {story.map((p, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className={i === 0 ? "text-[1.05rem] leading-[2.15] text-ink" : "text-[0.96rem] leading-[2.15] text-ink-soft"}>{p}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              <div className="rounded-[1.5rem] bg-sage p-6 text-cream">
                <p className="eyebrow text-sage-soft">ماموریت ما</p>
                <p className="mt-4 text-[0.95rem] leading-[2.05]">{mission}</p>
              </div>
              <div className="rounded-[1.5rem] border border-ink/10 bg-white/60 p-6">
                <p className="eyebrow">نگاه ما به آینده</p>
                <p className="mt-4 text-[0.95rem] leading-[2.05] text-ink-soft">{vision}</p>
              </div>
            </div>
          </div>

          <Reveal y={34}>
            <div className="relative">
              <div className="grain-frame relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
                <Image src="/img/yoga-class.jpg" alt="کلاس گروهی در سالن خانه یوگا" fill sizes="(max-width:1024px) 92vw, 46vw" className="object-cover" />
              </div>
              <Parallax strength={26} className="absolute -bottom-9 -start-6 hidden w-40 sm:block">
                <div className="overflow-hidden rounded-[1.4rem] border-4 border-cream bg-white shadow-[var(--shadow-lift)]">
                  <div className="grain-frame relative aspect-[3/4]">
                    <Image src="/img/a-hands.jpg" alt="جزئیات ماساژ" fill sizes="160px" className="object-cover" />
                  </div>
                </div>
              </Parallax>
              <div className="absolute -top-5 -end-4 rounded-2xl bg-cream/95 px-4 py-3 shadow-[var(--shadow-soft)]">
                <p className="text-[0.7rem] text-ink-faint">ظرفیت هر کلاس</p>
                <p className="text-[1.05rem] font-semibold text-sage">۸ نفر</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ------------------------------- milestones ------------------------------- */}
      <Section className="py-14 lg:py-20">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {achievements.map((a, i) => (
            <Reveal key={a.label} delay={i * 70}>
              <div className="h-full rounded-[1.4rem] border border-ink/8 bg-white/60 p-6">
                <p className="text-[2rem] leading-none font-semibold text-sage">{a.value}</p>
                <p className="mt-3 text-[0.95rem] font-medium text-ink">{a.label}</p>
                <p className="mt-2 text-[0.84rem] leading-[1.9] text-ink-soft">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* --------------------------------- values -------------------------------- */}
      <Section className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="ارزش‌ها"
          title="شش قولی که روی دیوار سالن هم نوشته شده"
          lead="این‌ها شعار نیستند؛ بر اساس همین شش مورد تصمیم می‌گیریم چه دوره‌ای بگذاریم، چه محصولی بفروشیم و با چه کسی کار کنیم."
        />
        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 3) * 80}>
              <div className="card-hover group h-full rounded-[1.5rem] bg-white/70 p-6 shadow-[var(--shadow-inset),var(--shadow-soft)]">
                <span className="grid size-11 place-items-center rounded-2xl bg-sand/70 text-sage transition-colors duration-500 group-hover:bg-sage group-hover:text-cream">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {valueIcons[v.icon]}
                  </svg>
                </span>
                <h3 className="mt-5 text-[1.05rem] font-semibold text-ink">{v.title}</h3>
                <p className="mt-2.5 text-[0.88rem] leading-[2] text-ink-soft">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* -------------------------------- timeline ------------------------------- */}
      <Section className="bg-gradient-to-b from-transparent via-shell/50 to-transparent py-16 lg:py-24">
        <SectionHeading eyebrow="مسیر ما" title="نه سال، در شش ایستگاه" align="center" />

        <ol className="relative mt-14 flex flex-col gap-12">
          <span aria-hidden className="absolute bottom-10 top-6 start-[1.1rem] w-px bg-gradient-to-b from-olive/45 via-ink/12 to-transparent md:start-1/2 md:-translate-x-1/2" />
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 60}>
              <li className="relative grid gap-5 ps-10 md:grid-cols-2 md:gap-12 md:ps-0">
                <span className="absolute start-0 top-1.5 grid size-9 place-items-center rounded-full bg-cream ring-1 ring-olive/40 md:start-1/2 md:-translate-x-1/2">
                  <span className="size-2.5 rounded-full bg-olive" />
                </span>
                <div className={i % 2 === 0 ? "md:pe-10 md:text-end" : "md:order-2 md:ps-10"}>
                  <span className="latin text-[0.8rem] tracking-[.2em] text-clay">{t.year}</span>
                  <h3 className="mt-2 text-[1.15rem] font-semibold text-ink">{t.title}</h3>
                  <p className="mt-2.5 text-[0.9rem] leading-[2] text-ink-soft">{t.text}</p>
                </div>
                <div className={i % 2 === 0 ? "md:order-2" : ""}>
                  {t.image ? (
                    <div className="grain-frame relative aspect-[16/10] overflow-hidden rounded-[1.4rem]">
                      <Image src={t.image} alt={t.title} fill sizes="(max-width:768px) 92vw, 44vw" className="object-cover" />
                    </div>
                  ) : null}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------------------------- team --------------------------------- */}
      <Section className="py-16 lg:py-24">
        <SectionHeading
          eyebrow="تیم ما"
          title="کسانی که هر روز آن طرف مت ایستاده‌اند"
          lead="تیم کوچک، اما متخصص. هر مربی در کنار تدریس، هر فصل در یک کارگاه آموزشی شرکت می‌کند."
          link={{ label: "تماس با تیم", href: "/contact" }}
        />
        <div className="mt-11 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 80}>
              <InstructorCard person={person} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-6 grid gap-6 rounded-[1.8rem] bg-white/60 p-6 lg:grid-cols-[16rem_1fr] lg:p-8">
            <div className="grain-frame relative aspect-[4/5] overflow-hidden rounded-[1.4rem] lg:aspect-[4/4.4]">
              <Image src={meditationLead.image} alt={meditationLead.name} fill sizes="(max-width:1024px) 92vw, 16rem" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <Badge tone="olive">مدیتیشن و تنفس</Badge>
              <h3 className="mt-4 text-[1.35rem] font-semibold text-ink">{meditationLead.name}</h3>
              <p className="mt-1 text-[0.85rem] text-ink-faint">{meditationLead.role}</p>
              <p className="mt-4 max-w-2xl text-[0.92rem] leading-[2.1] text-ink-soft">{meditationLead.bio}</p>
              <p className="mt-5 text-[0.95rem] italic text-sage">
                «{team[0].quote}»
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="py-10">
        <Reveal>
          <figure className="grain-frame relative overflow-hidden rounded-[2rem]">
            <div className="relative aspect-[21/9]">
              <Image src="/img/t-team.jpg" alt="تیم خانه یوگا در سالن تمرین" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-sage-900/10 via-sage-900/50 to-sage-900/85" />
            </div>
            <figcaption className="absolute inset-y-0 start-0 flex max-w-md flex-col justify-center gap-3 p-7 text-cream lg:p-12">
              <span className="eyebrow text-sage-soft">یک روز معمولی</span>
              <p className="text-[1.15rem] leading-[1.9] lg:text-[1.5rem]">
                پیش از شروع کلاس صبح، سالن بوی چوب و چای می‌دهد؛ این همان لحظه‌ای است که همه‌چیز برای ما معنی پیدا می‌کند.
              </p>
            </figcaption>
          </figure>
        </Reveal>
      </Section>

      {/* ---------------------------- studio experience --------------------------- */}
      <Section className="py-14 lg:py-20">
        <SectionHeading eyebrow="فضای سالن" title="تجربه‌ای که پیش از اولین حرکت شروع می‌شود" />
        <div className="mt-11 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {studioExperience.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 80}>
              <article className="group card-hover flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]">
                <div className="grain-frame relative aspect-[4/3] overflow-hidden">
                  <Image src={exp.image} alt={exp.title} fill sizes="(max-width:768px) 92vw, 24vw" className="object-cover transition-transform duration-[1.3s] group-hover:scale-[1.07]" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[1rem] font-medium text-ink">{exp.title}</h3>
                  <p className="mt-2.5 text-[0.86rem] leading-[1.95] text-ink-soft">{exp.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------- philosophy ------------------------------ */}
      <Section className="py-12">
        <Reveal>
          <div className="noise relative overflow-hidden rounded-[2.2rem] bg-sage-900 px-7 py-14 text-center text-cream lg:px-16 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(167,181,145,.22),transparent_65%)]" />
            <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
              <LotusMark className="size-12 text-sage-soft" />
              <Divider className="my-7 w-full opacity-30" />
              <p className="text-[1.25rem] leading-[2.05] font-light lg:text-[1.7rem]">
                مراقبت از خود، لوکس بودن نیست؛ یک مهارت روزمره است. کاری که ما می‌کنیم این است که آن را در دسترس، ساده و
                قابل تکرار نگه داریم.
              </p>
              <p className="mt-7 text-[0.85rem] text-cream/55">{team[0].name} — بنیان‌گذار خانه یوگا قائمشهر</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button asChild variant="clay" size="lg"><Link href="/contact">بیا یک جلسه امتحان کن</Link></Button>
                <Button asChild size="lg" variant="ghost" className="text-cream ring-1 ring-inset ring-cream/25 hover:bg-cream/10 hover:text-cream">
                  <Link href="/services">خدمات ما</Link>
                </Button>
              </div>
              <div className="mt-12 grid w-full gap-6 border-t border-cream/12 pt-8 sm:grid-cols-3">
                {achievements.slice(0, 3).map((a) => (
                  <div key={a.label} className="flex flex-col items-center gap-1.5">
                    <span className="text-[1.6rem] font-semibold text-cream">
                      <CountUp to={Number(String(a.value).replace(/[^\d.]/g, "")) || 0} />
                      {String(a.value).replace(/[\d.,٬]/g, "").slice(0, 1)}
                    </span>
                    <span className="text-[0.8rem] text-cream/60">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
