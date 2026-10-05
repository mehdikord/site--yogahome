import type { Metadata } from "next";
import { Suspense } from "react";
import { courses } from "@/data/courses";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { CourseExplorer } from "@/components/course/explorer";
import { Reveal } from "@/components/bits/motion";
import { faDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "دوره‌ها و آموزش",
  description:
    "دوره‌های تخصصی یوگا، مدیتیشن، ماساژ و مراقبت پوست — با فیلتر سطح، مدت، قیمت و قالب آموزشی. ثبت‌نام در این نسخه نمایشی است.",
  alternates: { canonical: "/courses" },
};

const highlights = [
  { title: "دسترسی بلندمدت", text: "دوره‌ها ۱۲ ماه در دسترس‌اند؛ تمرین شما به یک فصل محدود نمی‌شود." },
  { title: "بازخورد انسانی", text: "پرسش‌های زنده، گروه پشتیبانی و بازبینی ویدیوی عملی در دوره‌های تخصصی." },
  { title: "مسیر مشخص", text: "هر دوره با «پیش‌نیاز» و «بعد از این دوره» تعریف شده تا سردرگم نشوید." },
  { title: "بدون وعده درمانی", text: "ما مهارت آموزش می‌دهیم، نه درمان. جاهای حساس، ارجاع به متخصص می‌دهیم." },
];

export default async function CoursesPage({ searchParams }: PageProps<'/courses'>) {
  const sp = await searchParams;
  const initialCategory = typeof sp.category === "string" ? sp.category : "همه";
  return (
    <>
      <PageHero
        eyebrow="آموزش"
        title="پلتفرم یادگیری خانه یوگا"
        lead={`${faDigits(courses.length)} دوره فعال در شش مسیر آموزشی؛ از اولین نفس در یوگا تا پروتکل حرفه‌ای فیشیال و کار عمیق روی بافت.`}
        image="/img/a-breathe.jpg"
        imageAlt="فضای آموزش"
        breadcrumbs={[{ label: "دوره‌ها" }]}
        size="lg"
        chips={["ویدیویی، متنی و ترکیبی", "پشتیبانی مربی", "گواهی پایان دوره", "دسترسی ۱۲ ماهه"]}
      />

      <Section className="pt-14 lg:pt-16">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 80}>
              <div className="h-full rounded-[1.4rem] border border-ink/8 bg-white/55 p-5">
                <span className="latin text-[0.7rem] tracking-[.22em] text-olive">0{faDigits(i + 1)}</span>
                <h2 className="mt-3 text-[1rem] font-medium text-ink">{h.title}</h2>
                <p className="mt-2 text-[0.85rem] leading-[1.95] text-ink-soft">{h.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Suspense fallback={<div className="mt-10 h-[26rem] animate-pulse rounded-[1.6rem] bg-shell/70" />}>
          <CourseExplorer initialCategory={initialCategory} />
        </Suspense>
      </Section>
    </>
  );
}
