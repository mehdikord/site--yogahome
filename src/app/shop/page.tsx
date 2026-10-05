import { Suspense } from "react";
import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/layout/page-hero";
import { ShopExplorer } from "@/components/shop/explorer";
import { products, productCategories } from "@/data/products";
import { Reveal } from "@/components/bits/motion";
import { Media } from "@/components/ui/media";
import { faDigits, priceCompact } from "@/lib/format";
import Link from "next/link";

export const metadata: Metadata = {
  title: "فروشگاه محصولات آرامش",
  description:
    "ابزار یوگا، لوازم ماساژ، محصولات مراقبت پوست و اکسسوری‌های آرامش — انتخاب‌شده توسط مربیان خانه یوگا قائمشهر.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<'/shop'>) {
  const sp = await searchParams;
  const initialCategory = typeof sp.category === "string" ? sp.category : "همه";
  const initialWishlist = sp.wishlist === "1";
  const cheapest = Math.min(...products.map((p) => p.price));
  return (
    <>
      <PageHero
        eyebrow="فروشگاه"
        title="ابزار و محصولاتی که خودمان استفاده می‌کنیم"
        lead={`۱۴ محصول دست‌چین در چهار دسته؛ بدون برندهای تبلیغ‌زده، بدون وعده معجزه. قیمت‌ها از ${priceCompact(cheapest)} شروع می‌شود.`}
        image="/img/p-mat.jpg"
        imageAlt="مت یوگا چوب‌پنبه‌ای"
        breadcrumbs={[{ label: "فروشگاه" }]}
        chips={["ارسال رایگان بالای ۲ میلیون", "بازگشت تا ۷ روز", "مشاوره خرید رایگان"]}
      />

      <Section className="pt-12 lg:pt-14">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {productCategories.map((c, i) => (
            <Reveal key={c.label} delay={i * 70}>
              <Link
                href={`/shop?category=${encodeURIComponent(c.label)}`}
                className="group card-hover block overflow-hidden rounded-[1.4rem] bg-white/60"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Media src={c.image} alt={c.label} sizes="(max-width:768px) 90vw, 23vw" className="size-full" imgClassName="img-zoom" overlay="soft" />
                </div>
                <div className="p-5">
                  <h2 className="text-[0.98rem] font-medium text-ink">{c.label}</h2>
                  <p className="mt-2 text-[0.82rem] leading-[1.9] text-ink-soft">{c.text}</p>
                  <p className="mt-3 text-[0.75rem] text-olive">
                    {faDigits(products.filter((p) => p.category === c.label).length)} محصول
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="pb-16 lg:pb-24">
        <Suspense
          fallback={
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[26rem] animate-pulse rounded-[1.5rem] bg-shell/70" />
              ))}
            </div>
          }
        >
          <ShopExplorer initialCategory={initialCategory} initialWishlist={initialWishlist} />
        </Suspense>
      </Section>
    </>
  );
}
