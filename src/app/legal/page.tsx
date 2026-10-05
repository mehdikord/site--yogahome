import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "قوانین و حریم خصوصی",
  description: "نمونه متن قوانین، حریم خصوصی و شرایط مرجوعی خانه یوگا و ماساژ قائمشهر.",
  alternates: { canonical: "/legal" },
};

const blocks = [
  {
    title: "حریم خصوصی",
    items: [
      "این نسخه از سایت کاملاً نمایشی است: هیچ فرمی داده‌ها را جایی ارسال نمی‌کند، پایگاه‌داده‌ای وجود ندارد و کوکی ردیابی ثالثی کار نمی‌شود.",
      "سبد خرید و علاقه‌مندی‌ها فقط در حافظه محلی مرورگر شما نگه داشته می‌شوند و با پاک کردن داده‌های مرورگر از بین می‌روند.",
      "در نسخه واقعی، فقط نام، شماره تماس و توضیح درخواست برای هماهنگی رزرو نگه داشته می‌شود و به درخواست شما حذف می‌گردد.",
    ],
  },
  {
    title: "شرایط رزرو و لغو",
    items: [
      "رزرو کلاس‌ها و جلسات تا چهار ساعت قبل از شروع، بدون هزینه لغو یا جابه‌جا می‌شود.",
      "حاضر نشدن بدون اطلاع، یکی از جلسات بسته را مصرف‌شده محسوب می‌کند.",
      "در صورت لغو از سوی مجموعه (مثلاً بیماری مربی)، جلسه جابه‌جا یا به‌صورت اعتبار در حساب شما ثبت می‌شود.",
    ],
  },
  {
    title: "دوره‌های آموزشی",
    items: [
      "دسترسی به دوره‌ها ۱۲ ماه از تاریخ ثبت‌نام است و قابل منتقل شدن به شخص دیگر نیست.",
      "گواهی پایان دوره، درونی است و مجوز رسمی تدریس یا مطب محسوب نمی‌شود.",
      "تا ۷ روز پس از خرید، اگر کمتر از ۲۰٪ دوره دیده باشید، مبلغ بازگردانده می‌شود.",
    ],
  },
  {
    title: "محصولات فروشگاه",
    items: [
      "تا ۷ روز پس از تحویل، کالا بازنگرفته و در بسته‌بندی اصلی قابل مرجوعی است.",
      "محصولات بهداشتی باز‌شده (سرم، روغن، اسکراب) به دلیل ماهیت مصرفی قابل بازگشت نیستند.",
      "ارسال در قائم‌شهر و اطراف با پیک و در سایر شهرهای مازندران با پست پیشتاز انجام می‌شود.",
    ],
  },
  {
    title: "محدوده مسئولیت",
    items: [
      "محتوای سایت، مقالات و دوره‌ها آموزشی و مراقبتی است و جایگزین تشخیص یا درمان پزشکی نیست.",
      "در شرایط خاص جسمی، بارداری یا بیماری پوستی، پیش از شروع تمرین یا جلسه با پزشک خود مشورت کنید.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="قوانین"
        title="شفاف، کوتاه و بدون اصطلاح حقوقی"
        lead="نمونه متن آماده برای انتشار واقعی؛ پیش از راه‌اندازی باید با قوانین محلی و صنفی تطبیق داده شود."
        image="/img/a-hero-detail.jpg"
        imageAlt="جزئیات فضای سالن"
        breadcrumbs={[{ label: "قوانین و حریم خصوصی" }]}
      />

      <Section className="pt-14 lg:pt-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {blocks.map((b) => (
            <section key={b.title} className="rounded-[1.6rem] border border-ink/8 bg-white/60 p-6 lg:p-7">
              <h2 className="text-[1.1rem] font-semibold text-ink">{b.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {b.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9rem] leading-[2] text-ink-soft">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-shell/70 px-6 py-5">
          <p className="text-[0.88rem] text-ink-soft">سؤالی درباره قوانین دارید؟ قبل از ثبت‌نام بپرسید؛ ترجیح می‌دهیم همه‌چیز روشن باشد.</p>
          <Link href="/contact" className="link-underline text-[0.9rem] font-medium text-sage">تماس با ما</Link>
        </div>
      </Section>
    </>
  );
}
