import * as React from "react";
import Link from "next/link";
import type { Service } from "@/data/services";
import type { Course } from "@/data/courses";
import type { Product } from "@/data/products";
import type { Article } from "@/data/articles";
import type { Testimonial } from "@/data/testimonials";
import { team } from "@/data/about";
import { Media } from "@/components/ui/media";
import { Badge } from "@/components/ui/section";
import { Rating, Monogram } from "@/components/ui/rating";
import { WishlistButton, AddToCartButton } from "@/components/commerce/product-actions";
import { faDigits, faHours, price as faPrice, priceCompact } from "@/lib/format";
import { faMonth } from "@/lib/format";
import { totalLessons } from "@/data/courses";
import { cn } from "@/lib/utils";

/* -------------------------------- shared bits ------------------------------- */

function ArrowChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.85rem] font-medium text-sage transition-colors duration-300 group-hover:text-sage-700">
      {label}
      <span className="grid size-7 place-items-center rounded-full bg-sage/10 transition-all duration-500 group-hover:bg-sage group-hover:text-cream">
        <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
          <path d="M19 12H5" strokeLinecap="round" />
          <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
}

function MetaRow({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1.5 text-[0.78rem] text-ink-faint">
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 ? <span className="size-1 rounded-full bg-ink/20" aria-hidden /> : null}
          <span>{item}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* -------------------------------- service card -------------------------------- */

export function ServiceCard({ service, size = "md" }: { service: Service; size?: "md" | "lg" }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "group card-hover relative flex flex-col overflow-hidden rounded-[1.7rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]",
        size === "lg" && "lg:min-h-[30rem]",
      )}
    >
      <div className={cn("relative w-full overflow-hidden", size === "lg" ? "aspect-[16/11]" : "aspect-[16/10]")}>
        <Media src={service.cover} alt={service.name} sizes="(max-width:768px) 100vw, 33vw" className="size-full" imgClassName="img-zoom" overlay="soft" />
        <span className="absolute bottom-3.5 start-3.5 flex items-center gap-2">
          <Badge tone="dark" size="md">{service.eyebrow}</Badge>
        </span>
        <span className="latin absolute top-4 end-4 text-[0.68rem] text-cream/70">{service.latin}</span>
      </div>
      <div className={cn("flex flex-1 flex-col gap-3 p-5", size === "lg" && "p-6")}>
        <h3 className={cn("text-ink", size === "lg" ? "text-[1.35rem]" : "text-[1.15rem]")}>{service.name}</h3>
        <p className="text-[0.88rem] leading-[1.95] text-ink-soft">{service.summary}</p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <ArrowChip label="مشاهده خدمات" />
          <span className="text-[0.76rem] text-ink-faint">از {priceCompact(Math.min(...service.formats.map((f) => f.price)))}</span>
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------- course card --------------------------------- */

export function CourseCard({ course, priority = false }: { course: Course; priority?: boolean }) {
  const discount = course.oldPrice ? Math.round((1 - course.price / course.oldPrice) * 100) : 0;
  return (
    <article className="group card-hover relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white/75 shadow-[var(--shadow-inset),var(--shadow-soft)]">
      <Link href={`/courses/${course.slug}`} className="relative block aspect-[16/10] overflow-hidden">
        <Media src={course.media} alt={course.title} priority={priority} sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 30vw" className="size-full" imgClassName="img-zoom" overlay="soft" />
        <span className="absolute inset-x-4 bottom-3.5 flex items-center justify-between gap-2">
          <Badge tone="dark">{course.category}</Badge>
          <span className="rounded-full bg-cream/90 px-2.5 py-1 text-[0.72rem] font-medium text-ink">{course.level}</span>
        </span>
        {discount > 0 ? (
          <span className="absolute top-4 start-4 rounded-full bg-clay px-2.5 py-1 text-[0.72rem] font-semibold text-cream">
            {faDigits(discount)}٪ تخفیف
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3.5 p-5">
        <Link href={`/courses/${course.slug}`} className="text-[1.02rem] font-semibold leading-relaxed text-ink transition-colors group-hover:text-sage">
          {course.title}
        </Link>
        <p className="line-clamp-2 text-[0.85rem] leading-[1.9] text-ink-soft">{course.summary}</p>
        <MetaRow
          items={[
            course.kind,
            faHours(course.hours),
            `${faDigits(totalLessons(course))} جلسه`,
            `${faDigits(course.rating)} (${faDigits(course.ratings)})`,
          ]}
        />
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/8 pt-4">
          <div className="flex flex-col">
            {course.oldPrice ? <span className="text-[0.75rem] text-ink-faint line-through">{faPrice(course.oldPrice)}</span> : null}
            <span className="text-[1.02rem] font-semibold text-ink">{faPrice(course.price)}</span>
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="rounded-full bg-sage/8 px-4 py-2 text-[0.82rem] font-medium text-sage transition-colors duration-300 hover:bg-sage hover:text-cream"
          >
            مشاهده دوره
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------- product card ------------------------------- */

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  const low = product.stock <= 6;
  return (
    <article className="group card-hover relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white/75 shadow-[var(--shadow-inset),var(--shadow-soft)]">
      <Link href={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden bg-shell">
        <Media src={product.images[0]} alt={product.name} priority={priority} sizes="(max-width:640px) 90vw, (max-width:1024px) 45vw, 30vw" className="size-full" imgClassName="img-zoom" />
        <span className="absolute top-3 start-3 flex flex-col items-start gap-1.5">
          {discount > 0 ? <Badge tone="clay" size="md" className="bg-clay text-cream">٪{faDigits(discount)}−</Badge> : null}
          {product.badge === "جدید" ? <Badge tone="olive" size="md">جدید</Badge> : null}
          {product.badge === "پرفروش" ? <Badge tone="sand" size="md">پرفروش</Badge> : null}
          {product.badge === "محدود" ? <Badge tone="outline" size="md">ظرفیت محدود</Badge> : null}
        </span>
      </Link>

      <div className="absolute top-3 end-3">
        <WishlistButton slug={product.slug} />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <span className="text-[0.72rem] text-ink-faint">{product.category}</span>
        <Link href={`/shop/${product.slug}`} className="line-clamp-2 text-[0.95rem] font-medium leading-relaxed text-ink transition-colors hover:text-sage">
          {product.name}
        </Link>
        <Rating value={product.rating} count={product.reviews} />
        <div className="mt-auto flex items-center justify-between gap-2 pt-1.5">
          <div className="flex flex-col">
            {product.oldPrice ? <span className="text-[0.72rem] text-ink-faint line-through">{faPrice(product.oldPrice)}</span> : null}
            <span className="text-[0.98rem] font-semibold text-ink">{faPrice(product.price)}</span>
          </div>
          {low ? <span className="text-[0.7rem] text-clay">فقط {faDigits(product.stock)} عدد</span> : null}
        </div>
        <AddToCartButton slug={product.slug} name={product.name} size="sm" variant="soft" className="mt-1 w-full" label="افزودن به سبد" />
      </div>
    </article>
  );
}

/* ------------------------------- article card ------------------------------- */

export function ArticleCard({
  article,
  variant = "default",
  priority = false,
}: {
  article: Article;
  variant?: "default" | "featured" | "compact";
  priority?: boolean;
}) {
  if (variant === "compact") {
    return (
      <article className="group flex items-start gap-4">
        <Link href={`/blog/${article.slug}`} className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-2xl">
          <Media src={article.cover} alt={article.title} sizes="80px" className="size-full" imgClassName="img-zoom" />
        </Link>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-[0.72rem] text-olive">{article.category}</span>
          <Link href={`/blog/${article.slug}`} className="line-clamp-2 text-[0.94rem] font-medium leading-relaxed text-ink transition-colors group-hover:text-sage">
            {article.title}
          </Link>
          <span className="text-[0.72rem] text-ink-faint">{faMonth(article.date)} · {faDigits(article.minutes)} دقیقه مطالعه</span>
        </div>
      </article>
    );
  }

  const featured = variant === "featured";
  return (
    <article
      className={cn(
        "group relative flex overflow-hidden rounded-[1.7rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]",
        featured ? "flex-col lg:flex-row" : "h-full flex-col",
      )}
    >
      <Link
        href={`/blog/${article.slug}`}
        className={cn("relative block overflow-hidden", featured ? "aspect-[16/10] lg:aspect-auto lg:w-[52%]" : "aspect-[16/10]")}
      >
        <Media
          src={article.cover}
          alt={article.title}
          priority={featured || priority}
          sizes={featured ? "(max-width:1024px) 100vw, 52vw" : "(max-width:768px) 100vw, 33vw"}
          className="size-full"
          imgClassName="img-zoom"
          overlay="soft"
        />
        <span className="absolute bottom-4 start-4">
          <Badge tone="dark" size="md">{article.category}</Badge>
        </span>
      </Link>
      <div className={cn("flex flex-1 flex-col gap-3.5 p-5", featured && "justify-center gap-4 p-6 lg:p-9")}>
        <MetaRow items={[faMonth(article.date), `${faDigits(article.minutes)} دقیقه مطالعه`, article.author.name]} />
        <Link
          href={`/blog/${article.slug}`}
          className={cn(
            "font-semibold leading-[1.6] text-ink transition-colors group-hover:text-sage",
            featured ? "text-[1.35rem] lg:text-[1.7rem]" : "text-[1.02rem]",
          )}
        >
          {article.title}
        </Link>
        <p className={cn("text-ink-soft", featured ? "text-[0.94rem] leading-[2]" : "line-clamp-2 text-[0.86rem] leading-[1.9]")}>
          {article.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, featured ? 3 : 2).map((t) => (
              <Badge key={t} tone="neutral">{t}</Badge>
            ))}
          </span>
          <ArrowChip label="خواندن" />
        </div>
      </div>
    </article>
  );
}

/* ----------------------------- testimonial card ----------------------------- */

export function TestimonialCard({ item, className }: { item: Testimonial; className?: string }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col gap-4 rounded-[1.5rem] bg-white/75 p-6 shadow-[var(--shadow-inset),var(--shadow-soft)]",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-7 text-sand-deep" fill="currentColor" aria-hidden>
        <path d="M9.8 5.4C6.4 7 4.6 9.9 4.6 13.6c0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .1.4-1.7 1.7-3.2 3.7-4.4l-2.1-2.4zm9 0c-3.4 1.6-5.2 4.5-5.2 8.2 0 3 1.7 5 4.2 5 2 0 3.5-1.4 3.5-3.3 0-1.9-1.3-3.2-3.1-3.2-.4 0-.7 0-1 .1.4-1.7 1.7-3.2 3.7-4.4l-2.1-2.4z" />
      </svg>
      <blockquote className="flex-1 text-[0.94rem] leading-[2.05] text-ink">{item.text}</blockquote>
      <figcaption className="flex items-center gap-3 border-t border-ink/8 pt-4">
        <Monogram name={item.name} tone={item.tone} />
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 text-[0.88rem] font-medium text-ink">
            {item.name}
            {item.verified ? (
              <svg viewBox="0 0 24 24" className="size-3.5 text-moss" fill="currentColor" aria-label="کاربر تأییدشده">
                <path d="M12 2l2.2 1.7 2.8-.2.9 2.6 2.3 1.6-.9 2.7.3 2.8-2.6 1-1.6 2.3-2.7-.8L12 22l-2.6-1.6-2.7.8-1.6-2.3-2.6-1 .3-2.8-.9-2.7L4.2 8.7l.9-2.6 2.8.2z" />
                <path d="M8.4 12.2l2.4 2.4 4.8-4.8" fill="none" stroke="#faf7f1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
          </span>
          <span className="block text-[0.76rem] text-ink-faint">{item.city}</span>
        </span>
        <Rating value={item.rating} showValue={false} />
      </figcaption>
      <Link
        href={item.context.href}
        className="flex items-center justify-between gap-2 rounded-2xl bg-shell/70 px-4 py-3 text-[0.8rem] text-ink-soft transition-colors duration-300 hover:bg-sand/60 hover:text-ink"
      >
        <span className="flex items-center gap-2">
          <span className="rounded-full bg-white px-2 py-0.5 text-[0.68rem] text-olive">{item.context.kind}</span>
          <span className="line-clamp-1">{item.context.label}</span>
        </span>
        <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M19 12H5" strokeLinecap="round" />
          <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </figure>
  );
}

/* ------------------------------ instructor card ------------------------------ */

export function InstructorCard({ person }: { person: (typeof team)[number] }) {
  return (
    <article className="group card-hover relative flex h-full flex-col overflow-hidden rounded-[1.6rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Media src={person.image} alt={person.name} sizes="(max-width:768px) 90vw, 24vw" className="size-full" imgClassName="img-zoom" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sage-900/85 via-sage-900/30 to-transparent p-4 pt-12">
          <p className="text-[1.02rem] font-semibold text-cream">{person.name}</p>
          <p className="mt-0.5 text-[0.78rem] text-cream/70">{person.role}</p>
        </div>
        <span className="latin absolute top-4 end-4 rounded-full bg-cream/15 px-2.5 py-1 text-[0.62rem] text-cream backdrop-blur-sm">
          {person.latin}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <MetaRow items={[`${faDigits(person.years)} سال تجربه`, person.focus]} />
        <p className="line-clamp-3 text-[0.85rem] leading-[1.95] text-ink-soft">{person.bio}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {person.teaches.map((t) => (
            <li key={t}>
              <Badge tone="sage">{t}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
