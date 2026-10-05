import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { productBySlug, products, relatedProducts, productReviews } from "@/data/products";
import { serviceBySlug } from "@/data/services";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { Rating, Monogram } from "@/components/ui/rating";
import { ProductGallery, QuantityPicker } from "@/components/shop/gallery";
import { AddToCartButton, WishlistButton } from "@/components/commerce/product-actions";
import { ProductCard } from "@/components/cards";
import { Reveal } from "@/components/bits/motion";
import { faDate, faDigits, price as faPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return { title: "محصول پیدا نشد" };
  return {
    title: product.name,
    description: product.excerpt,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const reviews = productReviews(product);
  const service = product.linkedService ? serviceBySlug(product.linkedService) : undefined;
  const related = relatedProducts(product, 3);

  return (
    <>
      <div className="bg-sage-900 pt-28 pb-6 text-cream lg:pt-32">
        <div className="container-x">
          <Breadcrumbs
            items={[
              { label: "فروشگاه", href: "/shop" },
              { label: product.category, href: `/shop?category=${encodeURIComponent(product.category)}` },
              { label: product.name },
            ]}
          />
        </div>
      </div>

      <Section className="pt-10 lg:pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <Reveal>
            <ProductGallery images={product.images} name={product.name} />
          </Reveal>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="olive">{product.category}</Badge>
              {discount > 0 ? <Badge tone="clay" className="bg-clay text-cream">{faDigits(discount)}٪ تخفیف</Badge> : null}
              {product.stock > 6 ? <Badge tone="sage">موجود</Badge> : <Badge tone="neutral">فقط {faDigits(product.stock)} عدد</Badge>}
            </div>

            <h1 className="mt-5 text-[1.85rem] leading-[1.4] font-semibold text-ink lg:text-[2.25rem]">{product.name}</h1>
            <p className="latin mt-2 text-[0.78rem] tracking-[.16em] text-ink-faint">{product.latin}</p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <Rating value={product.rating} count={product.reviews} size="md" />
              <a href="#reviews" className="text-[0.82rem] text-sage underline-offset-4 hover:underline">خواندن نظرها</a>
            </div>

            <p className="mt-6 text-[1rem] leading-[2.1] text-ink-soft">{product.excerpt}</p>

            <div className="mt-7 flex flex-wrap items-end gap-4 rounded-[1.5rem] bg-shell/70 p-5">
              <div>
                <p className="text-[0.75rem] text-ink-faint">قیمت</p>
                <div className="mt-1 flex items-end gap-3">
                  <span className="text-[1.75rem] font-semibold leading-none text-ink">{faPrice(product.price)}</span>
                  {product.oldPrice ? <span className="pb-1 text-[0.85rem] text-ink-faint line-through">{faPrice(product.oldPrice)}</span> : null}
                </div>
              </div>
              <span className="ms-auto text-[0.78rem] text-ink-soft">ارسال رایگان بالای ۲ میلیون تومان</span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <AddToCartButton slug={product.slug} name={product.name} size="lg" label="افزودن به سبد خرید" className="min-w-[13.5rem] flex-1" />
              <WishlistButton slug={product.slug} withLabel className="rounded-full px-5 py-3" />
            </div>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-[0.88rem] leading-[1.9] text-ink-soft">
                  <svg viewBox="0 0 24 24" className="mt-1 size-4 shrink-0 text-olive" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                    <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-ink/8 pt-6 text-[0.8rem] text-ink-soft">
              {["پرداخت در محل", "۷ روز مهلت بازگشت", "راهنمای استفاده داخل بسته", "پشتیبانی پس از خرید"].map((t) => (
                <span key={t} className="rounded-full bg-white/70 px-3 py-1.5 shadow-[var(--shadow-inset)]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------ details tabs-lite ----------------------------- */}
      <Section className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-14">
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-[1.35rem] font-semibold text-ink">درباره این محصول</h2>
              <div className="mt-4 flex flex-col gap-4">
                {product.description.map((p, i) => (
                  <p key={i} className="text-[0.95rem] leading-[2.15] text-ink-soft">{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-[1.35rem] font-semibold text-ink">طرز استفاده</h2>
              <ol className="mt-5 flex flex-col gap-3">
                {product.usage.map((u, i) => (
                  <li key={u.title} className="flex gap-4 rounded-[1.25rem] bg-white/60 p-4 shadow-[var(--shadow-inset)]">
                    <span className="latin grid size-8 shrink-0 place-items-center rounded-full bg-sage/10 text-[0.72rem] text-sage">
                      {faDigits(i + 1)}
                    </span>
                    <span>
                      <span className="block text-[0.95rem] font-medium text-ink">{u.title}</span>
                      <span className="mt-1 block text-[0.87rem] leading-[1.95] text-ink-soft">{u.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 rounded-2xl border border-dashed border-ink/15 px-5 py-4 text-[0.83rem] leading-[1.95] text-ink-faint">
                {product.care}
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[1.6rem] border border-ink/8 bg-white/60">
              <h2 className="border-b border-ink/8 px-6 py-4 text-[1rem] font-semibold text-ink">مشخصات فنی</h2>
              <dl className="flex flex-col divide-y divide-ink/8 px-6">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-6 py-3.5">
                    <dt className="text-[0.85rem] text-ink-faint">{s.label}</dt>
                    <dd className="text-end text-[0.88rem] font-medium text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap gap-1.5 border-t border-ink/8 px-6 py-4">
                {product.tags.map((t) => (
                  <Badge key={t} tone="neutral">#{t}</Badge>
                ))}
              </div>
            </div>

            {service ? (
              <Link
                href={`/services/${service.slug}`}
                className="group mt-5 flex items-center gap-4 rounded-[1.5rem] bg-sage p-5 text-cream transition-colors duration-500 hover:bg-sage-700"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
                  <Media src={service.cover} alt={service.name} sizes="56px" className="size-full" />
                </span>
                <span className="flex-1">
                  <span className="block text-[0.75rem] text-cream/60">استفاده حرفه‌ای در کلاس</span>
                  <span className="mt-1 block text-[0.95rem] font-medium">جلسات {service.name} خانه یوگا</span>
                </span>
                <svg viewBox="0 0 24 24" className="size-4 transition-transform duration-500 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M19 12H5" strokeLinecap="round" />
                  <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            ) : null}
          </div>
        </div>
      </Section>

      {/* --------------------------------- reviews -------------------------------- */}
      <Section id="reviews" className="bg-gradient-to-b from-transparent via-shell/45 to-transparent py-14 lg:py-20">
        <SectionHeading eyebrow="نظر خريداران" title={`${faDigits(product.reviews)} نظر درباره ${product.name}`} />
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.name} className={cn("rounded-[1.4rem] bg-white/70 p-5 shadow-[var(--shadow-inset)]")}>
              <figcaption className="flex items-center gap-3">
                <Monogram name={r.name} tone={r.rating > 4 ? "sage" : "sand"} />
                <span className="flex-1">
                  <span className="flex items-center gap-2 text-[0.9rem] font-medium text-ink">
                    {r.name}
                    {r.verified ? <Badge tone="olive">خرید تأییدشده</Badge> : null}
                  </span>
                  <span className="mt-0.5 block text-[0.75rem] text-ink-faint">{r.city} · {faDate(r.date)}</span>
                </span>
                <Rating value={r.rating} showValue={false} />
              </figcaption>
              <blockquote className="mt-3.5 text-[0.9rem] leading-[2] text-ink-soft">{r.text}</blockquote>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-[0.78rem] text-ink-faint">نظرها نمونه‌اند؛ در نسخه واقعی پس از ثبت سفارش جمع‌آوری می‌شوند.</p>
      </Section>

      {/* -------------------------------- related --------------------------------- */}
      <Section className="py-14 lg:py-20">
        <SectionHeading eyebrow="شاید بپسندید" title="محصولات هم‌خانواده" link={{ label: "همه فروشگاه", href: "/shop" }} />
        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
