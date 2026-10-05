import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { articleBySlug, articles, relatedArticles } from "@/data/articles";
import { Section, Badge } from "@/components/ui/section";
import { Breadcrumbs } from "@/components/layout/page-hero";
import { Media } from "@/components/ui/media";
import { Monogram } from "@/components/ui/rating";
import { ArticleCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { ReadingProgress, Reveal } from "@/components/bits/motion";
import { faDate, faDigits } from "@/lib/format";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) return { title: "مقاله پیدا نشد" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: { type: "article", images: [{ url: article.cover }] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articleBySlug(slug);
  if (!article) notFound();
  const related = relatedArticles(article, 3);

  return (
    <>
      <ReadingProgress />

      <article>
        <header className="relative mt-0 overflow-hidden bg-sage-900 pt-28 pb-10 text-cream lg:pt-36">
          <div aria-hidden className="absolute inset-0">
            <Media src={article.cover} alt="" sizes="100vw" className="size-full" imgClassName="opacity-35" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-900 via-sage-900/88 to-sage-900/55" />
          </div>
          <div className="container-x relative z-10">
            <Breadcrumbs items={[{ label: "مقالات", href: "/blog" }, { label: article.category }, { label: article.title }]} />

            <div className="mt-8 max-w-3xl">
              <Badge tone="dark" size="md" className="ring-1 ring-inset ring-cream/20">{article.category}</Badge>
              <h1 className="mt-5 text-[2rem] leading-[1.35] font-semibold sm:text-[2.6rem] lg:text-[3rem]">{article.title}</h1>
              <p className="mt-6 text-[1.02rem] leading-[2.05] text-cream/72">{article.excerpt}</p>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <span className="flex items-center gap-3">
                  <Monogram name={article.author.name} tone={article.author.avatarTone} className="size-11 bg-cream/12 text-cream text-[0.9rem]" />
                  <span>
                    <span className="block text-[0.9rem] font-medium">{article.author.name}</span>
                    <span className="block text-[0.75rem] text-cream/55">{article.author.role}</span>
                  </span>
                </span>
                <span className="text-[0.82rem] text-cream/60">{faDate(article.date)}</span>
                <span className="text-[0.82rem] text-cream/60">{faDigits(article.minutes)} دقیقه مطالعه</span>
                <span className="flex flex-wrap gap-1.5">
                  {article.tags.map((t) => (
                    <span key={t} className="rounded-full bg-cream/10 px-2.5 py-1 text-[0.72rem] text-cream/70">#{t}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-x">
          <div className="mx-auto grid max-w-[62rem] gap-12 py-14 lg:grid-cols-[1fr_15rem] lg:gap-16 lg:py-20">
            <div className="prose-wellness">
              {article.body.map((block, i) => {
                switch (block.type) {
                  case "h2":
                    return (
                      <Reveal key={i}>
                        <h2 className="mt-11 mb-4 text-[1.4rem] leading-snug font-semibold text-ink lg:text-[1.6rem]">{block.text}</h2>
                      </Reveal>
                    );
                  case "quote":
                    return (
                      <Reveal key={i}>
                        <blockquote className="my-10 rounded-[1.5rem] bg-shell/70 px-7 py-8">
                          <p className="text-[1.08rem] leading-[2] font-medium text-sage">«{block.text}»</p>
                          {block.by ? <footer className="mt-3 text-[0.82rem] text-ink-faint">— {block.by}</footer> : null}
                        </blockquote>
                      </Reveal>
                    );
                  case "ul":
                    return (
                      <Reveal key={i}>
                        <ul className="my-7 flex flex-col gap-3">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-3 text-[0.98rem] leading-[2.05]">
                              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-olive" aria-hidden />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    );
                  case "steps":
                    return (
                      <Reveal key={i}>
                        <ol className="my-8 flex flex-col gap-3">
                          {block.items.map((item, si) => (
                            <li key={item.title} className="flex gap-4 rounded-[1.3rem] bg-white/70 p-5 shadow-[var(--shadow-inset)]">
                              <span className="latin grid size-8 shrink-0 place-items-center rounded-full bg-sage/10 text-[0.72rem] text-sage">
                                {String(si + 1).padStart(2, "0")}
                              </span>
                              <span>
                                <span className="block text-[1rem] font-medium text-ink">{item.title}</span>
                                <span className="mt-1.5 block text-[0.92rem] leading-[2] text-ink-soft">{item.text}</span>
                              </span>
                            </li>
                          ))}
                        </ol>
                      </Reveal>
                    );
                  case "note":
                    return (
                      <Reveal key={i}>
                        <aside className="my-9 flex gap-4 rounded-[1.3rem] border border-clay/25 bg-clay/[.07] p-5">
                          <svg viewBox="0 0 24 24" className="mt-0.5 size-5 shrink-0 text-clay" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                            <circle cx="12" cy="12" r="8.5" />
                            <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
                          </svg>
                          <span>
                            <span className="block text-[0.95rem] font-semibold text-ink">{block.title}</span>
                            <span className="mt-1.5 block text-[0.92rem] leading-[2] text-ink-soft">{block.text}</span>
                          </span>
                        </aside>
                      </Reveal>
                    );
                  case "figure":
                    return (
                      <Reveal key={i}>
                        <figure className="my-10">
                          <div className="grain-frame relative aspect-[16/9] overflow-hidden rounded-[1.5rem]">
                            <Image src={block.src} alt={block.alt} fill sizes="(max-width:1024px) 92vw, 44rem" className="object-cover" />
                          </div>
                          <figcaption className="mt-3 text-[0.8rem] text-ink-faint">{block.caption}</figcaption>
                        </figure>
                      </Reveal>
                    );
                  default:
                    return (
                      <Reveal key={i}>
                        <p className={i === 0 ? "text-[1.06rem] leading-[2.2] text-ink" : undefined}>{block.text}</p>
                      </Reveal>
                    );
                }
              })}

              <div className="mt-12 rounded-[1.6rem] bg-sage p-7 text-cream lg:p-9">
                <p className="text-[0.78rem] text-cream/60">قدم بعدی</p>
                <h2 className="mt-2 text-[1.3rem] font-medium lg:text-[1.5rem]">{article.cta.label}</h2>
                <p className="mt-3 text-[0.92rem] leading-[2] text-cream/72">{article.cta.text}</p>
                <Button asChild variant="clay" className="mt-6">
                  <Link href={article.cta.href}>
                    {article.cta.kind === "course" ? "مشاهده دوره" : article.cta.kind === "shop" ? "رفتن به فروشگاه" : "مشاهده خدمت"}
                  </Link>
                </Button>
              </div>
            </div>

            {/* side rail */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-[1.4rem] border border-ink/8 bg-white/60 p-5">
                  <p className="text-[0.78rem] font-semibold tracking-[.14em] text-ink-faint">در این مقاله</p>
                  <ul className="mt-3.5 flex flex-col gap-2.5 text-[0.84rem]">
                    {article.body
                      .filter((b): b is { type: "h2"; text: string } => b.type === "h2")
                      .map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-ink-soft">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-olive" aria-hidden />
                          {b.text}
                        </li>
                      ))}
                    {article.body.filter((b) => b.type === "h2").length === 0 ? (
                      <li className="text-ink-faint">مقاله کوتاه و بدون سرفصل</li>
                    ) : null}
                  </ul>
                </div>
                <div className="rounded-[1.4rem] bg-shell/70 p-5">
                  <p className="text-[0.84rem] leading-[1.95] text-ink-soft">
                    هر هفته یک مقاله تازه، بدون تبلیغ و بدون ترساندن. در نامه هفتگی عضو شوید.
                  </p>
                  <Link href="/contact" className="link-underline mt-4 inline-block text-[0.85rem] font-medium text-sage">
                    عضویت در نامه آرامش
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <Section className="pb-16 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="text-[1.6rem] text-ink lg:text-[1.9rem]">ادامه بدهید</h2>
          <Link href="/blog" className="link-underline text-[0.9rem] font-medium text-sage">همه مقالات</Link>
        </div>
        <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </Section>
    </>
  );
}
