"use client";

import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { courses, courseCategories } from "@/data/courses";
import { products, productCategories } from "@/data/products";
import { articles } from "@/data/articles";
import { stats, site } from "@/data/site";
import { promises, values, studioExperience } from "@/data/about";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ServiceCard, CourseCard, ProductCard, ArticleCard } from "@/components/cards";
import { CountUp, OrganicBackdrop, Parallax, Reveal, Spotlight, usePrefersReducedMotion } from "@/components/bits/motion";
import { faDigits } from "@/lib/format";

/* ================================ 02 · intro ================================ */

export function IntroSection() {
  const reduced = usePrefersReducedMotion();
  return (
    <Section id="intro" className="pt-14 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="grain-frame relative aspect-[4/3.4] overflow-hidden rounded-[2.2rem] shadow-[var(--shadow-lift)]">
              <Image
                src="/img/studio.jpg"
                alt="فضای سالن خانه یوگا با نور طبیعی و چوب"
                fill
                sizes="(max-width:1024px) 92vw, 44vw"
                className={`object-cover ${reduced ? "" : "animate-kenburns"}`}
              />
            </div>
            <Parallax strength={30} className="absolute -bottom-10 -end-4 w-[10.5rem] sm:-end-8 sm:w-[12.5rem]">
              <div className="overflow-hidden rounded-[1.5rem] border-4 border-cream bg-white shadow-[var(--shadow-lift)]">
                <div className="grain-frame relative aspect-[3/4]">
                  <Image src="/img/meditation.jpg" alt="جلسه مدیتیشن با بالش‌های نی‌بافت" fill sizes="190px" className="object-cover" />
                </div>
              </div>
            </Parallax>

            <div className="absolute -top-6 -start-3 hidden rounded-2xl bg-cream/95 px-4 py-3 shadow-[var(--shadow-soft)] sm:block">
              <p className="text-[0.7rem] text-ink-faint">سالن تمرین</p>
              <p className="text-[0.95rem] font-semibold text-ink">۹۶ متر مربع</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="خانه یوگا چیست؟"
            title={
              <>
                یک خانه، سه فضا برای{" "}
                <span className="font-light text-moss">مراقبت از شما</span>
              </>
            }
            lead="خانه یوگا قائمشهر از یک کلاس صبحگاهی کوچک شروع شد و امروز سه فضای مجزا دارد: سالن تمرین، اتاق ماساژ و مراقبت پوست، و یک پلتفرم آموزشی که همان کیفیت را به شهرهای اطراف می‌برد."
            link={{ label: "داستان کامل ما", href: "/about" }}
          />

          <div className="mt-9 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {promises.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="flex gap-3.5">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-sand/70 text-sage">
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[0.95rem] font-medium text-ink">{p.title}</span>
                    <span className="mt-1 block text-[0.85rem] leading-[1.95] text-ink-soft">{p.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 rounded-[1.6rem] bg-shell/70 p-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1.5">
                <span className="text-[1.5rem] font-semibold leading-none text-sage">
                  <CountUp to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} suffix={s.suffix} />
                </span>
                <span className="text-[0.78rem] leading-relaxed text-ink-soft">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* =============================== 03 · services =============================== */

export function ServicesSection() {
  return (
    <Section className="bg-gradient-to-b from-transparent via-shell/40 to-transparent py-20 lg:py-24">
      <SectionHeading
        eyebrow="خدمات"
        title="چهار مسیر، یک مقصد: حالِ خوبِ شما"
        lead="هر خدمت با یک مشاوره کوتاه شروع می‌شود تا بدانید دقیقاً برای چه آمده‌اید و انتظار چه چیزی را داشته باشید."
        link={{ label: "همه خدمات و بسته‌ها", href: "/services" }}
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, i) => (
          <Reveal key={service.slug} delay={i * 90}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ================================ 04 · courses =============================== */

export function CoursesSection() {
  const featured = courses.filter((c) => c.popular || c.new).slice(0, 3);
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <SectionHeading
          eyebrow="دوره‌ها و آموزش"
          title="یادگیری‌ای که در زندگی روزمره به کار می‌آید"
          lead="دوره‌های ویدیویی، متنی و ترکیبی با ساختار هفتگی، بازخورد مربی و دسترسی بلندمدت — برای شهر خودمان و شهرهای اطراف."
        />
        <Button asChild variant="outline" className="w-fit">
          <Link href="/courses">کتابخانه دوره‌ها</Link>
        </Button>
      </div>

      <div className="mt-9 flex flex-wrap gap-2">
        {courseCategories.map((c) => (
          <Link
            key={c.label}
            href={`/courses?category=${encodeURIComponent(c.label)}`}
            className="rounded-full border border-ink/10 bg-white/60 px-4 py-2 text-[0.82rem] text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/40 hover:text-ink"
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {featured.map((course, i) => (
          <Reveal key={course.slug} delay={i * 100}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ================================= 05 · shop ================================= */

export function ShopSection() {
  const picks = [products[0], products[5], products[9], products[13]];
  return (
    <Section className="py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="surface-dark noise relative flex h-full flex-col justify-between overflow-hidden rounded-[2rem] p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute -bottom-24 -start-16 size-72 rounded-full bg-olive/25 blur-3xl" />
            <div>
              <span className="eyebrow text-sage-soft">فروشگاه آرامش</span>
              <h2 className="mt-5 text-[1.9rem] leading-[1.4] text-cream lg:text-[2.25rem]">
                همان ابزاری که در کلاس استفاده می‌کنیم
              </h2>
              <p className="mt-5 text-[0.92rem] leading-[2.1] text-cream/72">
                ما چیزی را می‌فروشیم که خودمان هر روز با آن کار می‌کنیم: مت چوب‌پنبه‌ای، روغن‌های بدون پارافین، بالش مدیتیشن،
                کاسه صوتی و چهار محصول مراقبت پوست که واقعاً استفاده می‌شوند.
              </p>
              <ul className="mt-8 flex flex-col gap-3">
                {productCategories.map((c) => (
                  <li key={c.label}>
                    <Link
                      href={`/shop?category=${encodeURIComponent(c.label)}`}
                      className="group flex items-center justify-between gap-4 rounded-2xl bg-cream/[.07] px-4 py-3 transition-colors duration-300 hover:bg-cream/[.14]"
                    >
                      <span className="text-[0.88rem] text-cream/85">{c.label}</span>
                      <svg viewBox="0 0 24 24" className="size-4 text-cream/50 transition-transform duration-500 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                        <path d="M19 12H5" strokeLinecap="round" />
                        <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-9">
              <Button asChild variant="clay" size="md">
                <Link href="/shop">رفتن به فروشگاه</Link>
              </Button>
              <p className="mt-4 text-[0.75rem] text-cream/45">ارسال رایگان برای سفارش بالای {faDigits(2)} میلیون تومان</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {picks.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90}>
              <ProductCard product={product} />
            </Reveal>
          ))}
          <Reveal delay={200} className="sm:col-span-2">
            <Link
              href="/shop"
              className="group flex items-center justify-between gap-4 rounded-[1.4rem] border border-dashed border-ink/15 bg-white/40 px-6 py-5 transition-colors duration-300 hover:border-sage/40 hover:bg-white/70"
            >
              <span>
                <span className="block text-[0.95rem] font-medium text-ink">۱۴ محصول در فروشگاه</span>
                <span className="mt-1 block text-[0.82rem] text-ink-soft">
                  ابزار یوگا، لوازم ماساژ، مراقبت پوست و اکسسوری‌های آرامش
                </span>
              </span>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage text-cream transition-transform duration-500 group-hover:scale-110">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M19 12H5" strokeLinecap="round" />
                  <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

/* ================================= 06 · why ================================== */

export function WhySection() {
  return (
    <Section className="py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="چرا خانه یوگا"
            title={
              <>
                شش دلیل که مهمان‌ها{" "}
                <span className="font-light text-moss">برمی‌گردند</span>
              </>
            }
            lead="ما بزرگ‌ترین مجموعه شهر نیستیم؛ اما احتمالاً جایی است که بعد از سه ماه، تمرین را رها نمی‌کنید."
          />
          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {values.slice(0, 6).map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <Spotlight className="group rounded-[1.35rem] p-1">
                  <h3 className="flex items-center gap-2.5 text-[1rem] font-medium text-ink">
                    <span className="grid size-7 place-items-center rounded-full bg-sand/70 text-[0.7rem] text-sage">
                      {faDigits(i + 1)}
                    </span>
                    {v.title}
                  </h3>
                  <p className="mt-2.5 text-[0.86rem] leading-[1.95] text-ink-soft">{v.text}</p>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {studioExperience.slice(0, 3).map((exp, i) => (
              <Reveal
                key={exp.title}
                delay={i * 110}
                className={i === 0 ? "col-span-2" : ""}
              >
                <div className="card-hover overflow-hidden rounded-[1.6rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]">
                  <div className={`grain-frame relative overflow-hidden ${i === 0 ? "aspect-[16/8]" : "aspect-[4/3.6]"}`}>
                    <Image src={exp.image} alt={exp.title} fill sizes={i === 0 ? "60vw" : "30vw"} className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-[0.98rem] font-medium text-ink">{exp.title}</h3>
                    <p className="mt-2 text-[0.84rem] leading-[1.9] text-ink-soft">{exp.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div aria-hidden className="pointer-events-none absolute -bottom-10 -start-10 -z-10 size-40 rounded-full bg-clay/10 blur-2xl" />
        </div>
      </div>
    </Section>
  );
}

/* ================================ 08 · articles ============================== */

export function ArticlesSection() {
  const [featured, ...rest] = articles;
  return (
    <Section className="py-20 lg:py-24">
      <SectionHeading
        eyebrow="مجله آرامش"
        title="چیزی که پیش از تمرین خواندن دارد"
        lead="مقالات کوتاه و کاربردی درباره یوگا، مدیتیشن، ماساژ، پوست و سبک زندگی — نوشته مربیان خودِ مجموعه."
        link={{ label: "همه مقالات", href: "/blog" }}
      />
      <div className="mt-11 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <ArticleCard article={featured} variant="featured" />
        </Reveal>
        <div className="flex flex-col gap-5">
          {rest.slice(0, 2).map((article, i) => (
            <Reveal key={article.slug} delay={i * 100}>
              <ArticleCard article={article} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* =============================== 09 · instagram ============================== */

export function SocialSection() {
  const tiles = [
    { src: "/img/yoga-class.jpg", caption: "کلاس صبح، یکشنبه" },
    { src: "/img/p-candle.jpg", caption: "شمع سویی، جدید فروشگاه" },
    { src: "/img/facial.jpg", caption: "پاکسازی تخصصی صورت" },
    { src: "/img/botanical.jpg", caption: "باغچه پشت بام" },
    { src: "/img/p-bowl.jpg", caption: "کاسه صوتی نو" },
    { src: "/img/hero.jpg", caption: "وینیاसा پیش از غروب" },
  ];
  return (
    <Section className="py-16 lg:py-20">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <span className="eyebrow">اینستاگرام</span>
          <h2 className="mt-4 text-[1.7rem] leading-snug text-ink lg:text-[2.05rem]">پشت صحنه خانه یوگا را ببینید</h2>
        </div>
        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noreferrer noopener"
          className="latin flex items-center gap-2.5 rounded-full border border-ink/12 bg-white/60 px-5 py-2.5 text-[0.8rem] text-ink transition-colors duration-300 hover:border-ink/30"
        >
          {site.socials[0].handle}
          <span className="grid size-6 place-items-center rounded-full bg-sage text-cream">
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((tile, i) => (
          <Reveal key={tile.caption} delay={i * 60}>
            <a
              href={site.socials[0].href}
              target="_blank"
              rel="noreferrer noopener"
              className="group relative block aspect-square overflow-hidden rounded-[1.15rem]"
            >
              <Image src={tile.src} alt={tile.caption} fill sizes="(max-width:640px) 50vw, 16vw" className="object-cover transition-transform duration-[1.1s] group-hover:scale-[1.09]" />
              <span className="absolute inset-0 bg-gradient-to-t from-sage-900/75 via-sage-900/0 to-sage-900/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="absolute inset-x-3 bottom-3 translate-y-2 text-[0.74rem] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {tile.caption}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* =============================== 10 · final CTA ============================== */

export function FinalCta() {
  return (
    <Section className="py-16 lg:py-24">
      <Reveal>
        <div className="noise relative overflow-hidden rounded-[2.2rem] bg-sage-900 px-6 py-14 text-cream sm:px-10 lg:px-16 lg:py-20">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(70%_90%_at_20%_0%,rgba(167,181,145,.24),transparent_60%),radial-gradient(60%_80%_at_100%_100%,rgba(179,103,74,.28),transparent_65%)]" />
            <div className="absolute inset-y-0 end-0 hidden w-[42%] lg:block">
              <Image src="/img/p-matfloor.jpg" alt="" fill sizes="40vw" className="object-cover opacity-30 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-l from-sage-900/10 via-sage-900/60 to-sage-900" />
            </div>
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="eyebrow text-sage-soft">رزرو و مشاوره</span>
            <h2 className="mt-5 text-[2rem] leading-[1.4] lg:text-[2.7rem]">
              یک جلسه امتحانی، بدون هزینه و بدون تعهد
            </h2>
            <p className="mt-5 text-[0.95rem] leading-[2.1] text-cream/72">
              کافی است بگویید دنبال چه هستید؛ آرامش، کاهش درد عضلات، شروع یوگا یا یک دوره تخصصی. در بیست دقیقه شما را به
              مسیر درست راهنمایی می‌کنیم — حتی اگر آن مسیر برای امروز، فقط یک نفس عمیق باشد.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="clay">
                <Link href="/contact">رزرو جلسه / مشاوره</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-cream hover:bg-cream/12 hover:text-cream">
                <a href={`tel:${site.mobile.replace(/\s/g, "")}`}>
                  <span dir="ltr">{site.mobile}</span>
                </a>
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-cream/15 pt-6 text-[0.8rem] text-cream/60">
              <span>{site.addressShort}</span>
              <span>شنبه تا پنجشنبه · ۷ تا ۲۱</span>
              <span>پارکینگ عمومی در ۱۰۰ متری</span>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export function TrustStrip() {
  return (
    <div className="container-x">
      <div className="grid gap-4 rounded-[1.5rem] border border-ink/8 bg-white/50 p-5 sm:grid-cols-4">
        {[
          { t: "مشاوره اولیه", d: "رایگان، قبل از هر ثبت‌نام" },
          { t: "گروه کوچک", d: "حداکثر ۸ نفر در هر کلاس" },
          { t: "ارسال سریع", d: "۲ تا ۳ روز کاری در مازندران" },
          { t: "بازگشت کالا", d: "۷ روز، بسته‌بندی باز نشده" },
        ].map((item) => (
          <div key={item.t} className="flex items-start gap-2.5">
            <Badge tone="olive" className="mt-0.5 size-6 justify-center rounded-full p-0">
              <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Badge>
            <span>
              <span className="block text-[0.88rem] font-medium text-ink">{item.t}</span>
              <span className="mt-0.5 block text-[0.78rem] text-ink-soft">{item.d}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
