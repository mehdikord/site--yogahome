import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/data/services";
import { courses } from "@/data/courses";
import { Section, SectionHeading } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { ServiceCard, CourseCard } from "@/components/cards";
import { Reveal } from "@/components/bits/motion";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "خدمات",
  description:
    "یوگا، ماساژ، پاکسازی و مراقبت از پوست و مدیتیشن در خانه یوگا قائمشهر — بسته‌ها، ساعات برگزاری و رزرو جلسه.",
  alternates: { canonical: "/services" },
};

const steps = [
  { title: "انتخاب خدمت", text: "از میان چهار مسیر اصلی، آنچه امروز به آن نیاز دارید را انتخاب کنید." },
  { title: "مشاوره کوتاه", text: "بیست دقیقه گفت‌وگوی تلفنی یا حضوری، رایگان و بدون تعهد." },
  { title: "رزرو زمان", text: "نوبت شما در تقویم مجموعه ثبت و یک روز قبل یادآوری می‌شود." },
  { title: "ادامه مسیر", text: "پس از جلسه اول، برنامه پیشنهادی ماهانه را دریافت می‌کنید." },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="خدمات خانه یوگا"
        title="هر آنچه در این چهار دیوار انجام می‌شود"
        lead="کلاس‌های یوگا و مدیتیشن، ماساژ تخصصی و پاکسازی پوست — با گروه‌های کوچک، زمان‌بندی مشخص و مربیانی که شما را شخصاً می‌شناسند."
        image="/img/yoga-class.jpg"
        imageAlt="کلاس گروهی یوگا در سالن"
        breadcrumbs={[{ label: "خدمات" }]}
        size="lg"
        chips={["۹ سال تجربه", "گروه حداکثر ۸ نفر", "مشاوره اولیه رایگان", "پارکینگ نزدیک"]}
        actions={
          <>
            <Button asChild size="lg">
              <Link href="/contact">رزرو جلسه</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-cream hover:bg-cream/12 hover:text-cream">
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr">{site.phone}</a>
            </Button>
          </>
        }
      />

      <Section className="pt-16 lg:pt-20">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 90}>
              <ServiceCard service={service} size="lg" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="روند کار" title="از اولین تماس تا جلسه منظم" />
            <ol className="mt-9 flex flex-col">
              {steps.map((step, i) => (
                <Reveal key={step.title} delay={i * 80}>
                  <li className="flex gap-5 border-b border-ink/8 py-5 last:border-0">
                    <span className="latin pt-1 text-[0.78rem] tracking-[.2em] text-olive">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block text-[1rem] font-medium text-ink">{step.title}</span>
                      <span className="mt-1.5 block text-[0.88rem] leading-[1.95] text-ink-soft">{step.text}</span>
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <Reveal y={34}>
            <div className="grain-frame relative aspect-[4/4.4] overflow-hidden rounded-[2rem] shadow-[var(--shadow-lift)]">
              <Image src="/img/studio.jpg" alt="فضای داخلی سالن" fill sizes="(max-width:1024px) 92vw, 38vw" className="object-cover" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-cream/92 p-5">
                <p className="text-[0.8rem] text-ink-faint">ساعات کاری</p>
                <ul className="mt-2 flex flex-col gap-1.5 text-[0.86rem] text-ink">
                  {site.hours.map((h) => (
                    <li key={h.day} className="flex justify-between gap-4">
                      <span>{h.day}</span>
                      <span className="text-ink-soft">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section className="py-14 lg:py-20">
        <SectionHeading
          eyebrow="مسیر یادگیری"
          title="اگر می‌خواهید خودتان یاد بگیرید"
          lead="برای هر خدمت، یک دوره تخصصی هم داریم؛ مناسب کسانی که می‌خواهند فراتر از مصرف‌کننده بروند."
          link={{ label: "همه دوره‌ها", href: "/courses" }}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {["yoga", "massage", "skincare"].map((slug) => (
            <CourseCard key={slug} course={courses.find((c) => c.serviceSlug === slug)!} />
          ))}
        </div>
      </Section>
    </>
  );
}
