import type { Metadata } from "next";
import Link from "next/link";
import { articles, blogCategories } from "@/data/articles";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { BlogExplorer } from "@/components/blog/explorer";
import { Reveal } from "@/components/bits/motion";
import { faMonth } from "@/lib/format";

export const metadata: Metadata = {
  title: "مجله آرامش",
  description:
    "مقالات یوگا، مدیتیشن، ماساژ، مراقبت پوست و سبک زندگی سالم — نوشته مربیان و درمانگران خانه یوگا قائمشهر.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const latest = articles.slice(0, 4);
  return (
    <>
      <PageHero
        eyebrow="مجله"
        title="نوشته‌هایی که پیش از تمرین خواندن دارد"
        lead="درباره حرکت، تنفس، پوست و عادت‌های کوچک. هر مقاله را مربی یا درمانگر خودِ مجموعه نوشته و در پایان، مسیر عملی آن را هم پیشنهاد کرده‌ایم."
        image="/img/botanical.jpg"
        imageAlt="برگ‌های سبز با قطره‌های شبنم"
        breadcrumbs={[{ label: "مقالات" }]}
        size="lg"
        chips={blogCategories.map((c) => c.label)}
      />

      <Section className="pt-12 lg:pt-14">
        <BlogExplorer />
      </Section>

      <Section className="py-14 lg:py-20">
        <div className="grid gap-10 rounded-[2rem] bg-shell/60 p-7 lg:grid-cols-[1fr_1.15fr] lg:p-10">
          <div>
            <SectionHeading eyebrow="تازه‌ها" title="آخرین نوشته‌ها به ترتیب تاریخ" />
            <p className="mt-5 text-[0.9rem] leading-[2] text-ink-soft">
              هر پنجشنبه یک مقاله تازه منتشر می‌شود و در نامه هفتگی مجموعه هم فرستاده می‌شود. اگر موضوعی هست که دوست دارید
              درباره‌اش بنویسیم، برای ما بفرستید.
            </p>
            <Link href="/contact" className="link-underline mt-6 inline-block text-[0.9rem] font-medium text-sage">
              پیشنهاد موضوع مقاله
            </Link>
          </div>
          <ul className="flex flex-col">
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <li className="flex items-center gap-4 border-b border-ink/8 py-4 last:border-0">
                  <span className="latin w-14 shrink-0 text-[0.72rem] text-ink-faint">{faMonth(a.date)}</span>
                  <Link href={`/blog/${a.slug}`} className="flex-1 text-[0.94rem] text-ink transition-colors hover:text-sage">
                    {a.title}
                  </Link>
                  <Badge tone="neutral">{a.category}</Badge>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
