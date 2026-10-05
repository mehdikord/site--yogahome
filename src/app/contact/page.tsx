import type { Metadata } from "next";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { ContactForm } from "@/components/forms/contact-form";
import { Accordion, AccordionItem } from "@/components/ui/overlays";
import { Reveal } from "@/components/bits/motion";
import { LotusMark } from "@/components/layout/logo";

export const metadata: Metadata = {
  title: "تماس با ما و رزرو جلسه",
  description:
    "برای رزرو کلاس یوگا، جلسه ماساژ، پاکسازی پوست یا مشاوره دوره‌ها با خانه یوگا قائمشهر در تماس باشید. مشاوره اولیه رایگان است.",
  alternates: { canonical: "/contact" },
};

const faq = [
  { q: "برای شروع یوگا باید بدنم نرم باشد؟", a: "خیر. انعطاف نتیجه تمرین است، نه پیش‌نیاز آن. برای همه حرکت‌ها نسخه جایگزین با بلوک و تسمه وجود دارد." },
  { q: "چقدر زودتر باید رزرو کنم؟", a: "برای کلاس‌های صبح و پنج‌شنبه‌ها، یک روز قبل کافی است. ظرفیت هر گروه هشت نفر است." },
  { q: "اگر نتوانم در جلسه حاضر شوم؟", a: "تا تا چهار ساعت قبل می‌توانید رایگان لغو یا جابه‌جا کنید. بعد از آن، یک بار جبران در همان هفته انجام می‌شود." },
  { q: "پارکینگ دارید؟", a: "پارکینگ عمومی در ۱۰۰ متری مجموعه هست؛ در ساعات اوج، ورودی کوچه یاس تنها یک‌طرفه است." },
  { q: "دوره‌ها حضوری‌اند یا آنلاین؟", a: "دوره‌های ویدیویی و متنی کاملاً آنلاین‌اند. مسیر شغلی ماساژ و کارگاه‌ها، حضوری با ظرفیت شش نفر." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="تماس و رزرو"
        title="یک گفت‌وگوی بیست‌دقیقه‌ای، رایگان"
        lead="نمی‌دانید از کجا شروع کنید؟ بنویسید یا زنگ بزنید؛ با توجه به هدف، زمان و بودجه‌تان شما را به مسیر درست راهنمایی می‌کنیم."
        image="/img/a-niche.jpg"
        imageAlt="گوشه‌ای آرام از سالن با نور گرم"
        breadcrumbs={[{ label: "تماس با ما" }]}
        chips={site.hours.map((h) => `${h.day} · ${h.time}`)}
      />

      <Section className="pt-14 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <Reveal>
            <div className="rounded-[1.9rem] border border-ink/8 bg-white/70 p-6 shadow-[var(--shadow-inset),var(--shadow-soft)] lg:p-9">
              <SectionHeading eyebrow="فرم تماس" title="برای ما بنویسید" lead="پاسخ‌گویی معمولاً در همان روز کاری انجام می‌شود. این فرم در نسخه نمایشی، داده‌ای جایی ارسال نمی‌کند." />
              <div className="mt-9">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal delay={80}>
              <div className="rounded-[1.6rem] bg-sage p-6 text-cream lg:p-7">
                <p className="text-[0.78rem] text-cream/60">تماس مستقیم</p>
                <div className="mt-4 flex flex-col gap-3">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="text-[1.35rem] font-semibold tracking-wide transition-colors hover:text-cream/80">
                    {site.phone}
                  </a>
                  <a href={`tel:${site.mobile.replace(/\s/g, "")}`} dir="ltr" className="text-[1.05rem] transition-colors hover:text-cream/80">
                    {site.mobile}
                  </a>
                  <a href={`mailto:${site.email}`} dir="ltr" className="text-[0.92rem] text-cream/75 transition-colors hover:text-cream">
                    {site.email}
                  </a>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {site.socials.map((s) => (
                    <a key={s.key} href={s.href} target="_blank" rel="noreferrer noopener" className="rounded-full bg-cream/12 px-3 py-1.5 text-[0.78rem] transition-colors hover:bg-cream/20">
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="rounded-[1.6rem] border border-ink/8 bg-white/70 p-6">
                <h2 className="text-[1rem] font-semibold text-ink">آدرس</h2>
                <p className="mt-3 text-[0.9rem] leading-[2] text-ink-soft">{site.address}</p>
                <p className="mt-2 text-[0.8rem] text-ink-faint">کد پستی: <span dir="ltr">{site.postalCode}</span></p>

                {/* stylised map placeholder — no external tiles, no api */}
                <div className="relative mt-5 aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-shell">
                  <svg viewBox="0 0 320 200" className="absolute inset-0 size-full" aria-hidden>
                    <rect width="320" height="200" fill="#f2ebdf" />
                    <g stroke="#d5c1a4" strokeWidth="1.2" fill="none">
                      <path d="M0 46h320M0 104h320M0 158h320" />
                      <path d="M62 0v200M148 0v200M232 0v200" />
                    </g>
                    <path d="M0 104h320" stroke="#a7b591" strokeWidth="7" opacity=".55" />
                    <path d="M148 0v200" stroke="#a7b591" strokeWidth="5" opacity=".4" />
                    <rect x="18" y="118" width="34" height="28" rx="4" fill="#e6d8c2" />
                    <rect x="242" y="56" width="46" height="34" rx="4" fill="#e6d8c2" />
                    <circle cx="148" cy="104" r="26" fill="#2f4a3b" opacity=".08" />
                  </svg>
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                    <span className="rounded-full bg-sage px-3 py-1.5 text-[0.72rem] whitespace-nowrap text-cream shadow-[var(--shadow-soft)]">خانه یوگا قائمشهر</span>
                    <span className="mt-1 grid size-8 place-items-center rounded-full bg-clay text-cream shadow-[var(--shadow-soft)]">
                      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                        <path d="M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10z" strokeLinejoin="round" />
                        <circle cx="12" cy="11" r="2.2" />
                      </svg>
                    </span>
                  </div>
                  <p className="absolute bottom-2.5 start-3 text-[0.68rem] text-ink-faint">نقشه شماتیک — نسخه نمایشی</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="rounded-[1.6rem] border border-ink/8 bg-white/70 p-6">
                <h2 className="text-[1rem] font-semibold text-ink">ساعات کاری</h2>
                <ul className="mt-4 flex flex-col divide-y divide-ink/8">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex items-center justify-between gap-4 py-3 text-[0.88rem]">
                      <span className="text-ink-soft">{h.day}</span>
                      <span className="font-medium text-ink">{h.time}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-2xl bg-shell/70 px-4 py-3 text-[0.8rem] leading-relaxed text-ink-soft">
                  تعطیلات رسمی و ایام خاص در کانال تلگرام مجموعه اعلام می‌شود.
                </p>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="rounded-[1.6rem] border border-ink/8 bg-white/70 p-6">
                <h2 className="text-[1rem] font-semibold text-ink">خدماتی که رزرو می‌کنید</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Badge tone="sage" size="md">{s.name}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="پرسش‌های متداول" title="چیزی که معمولاً قبل از اولین جلسه می‌پرسید" lead="اگر پاسخ سؤال‌تان اینجا نبود، در فرم تماس بنویسید — کوتاه جواب می‌دهیم." />
            <div className="mt-8 flex items-center gap-3 rounded-2xl bg-shell/70 p-4">
              <LotusMark className="size-9 text-sage" />
              <p className="text-[0.85rem] leading-relaxed text-ink-soft">
                مشاوره اولیه برای همه رایگان است و هیچ تعهدی ایجاد نمی‌کند.
              </p>
            </div>
          </div>
          <Accordion type="single" collapsible className="flex flex-col gap-3">
            {faq.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} title={f.q}>
                {f.a}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>
    </>
  );
}
