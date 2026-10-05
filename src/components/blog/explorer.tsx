"use client";

import * as React from "react";
import { articles, blogCategories } from "@/data/articles";
import { ArticleCard } from "@/components/cards";
import { Input } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { matches } from "@/lib/utils";
import { faDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

const PAGE = 3;

export function BlogExplorer() {
  const [category, setCategory] = React.useState("همه");
  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(PAGE);

  const list = React.useMemo(() => {
    const filtered = articles
      .filter((a) => (category === "همه" ? true : a.category === category))
      .filter((a) => (query ? matches(query, a.title, a.excerpt, a.category, a.tags.join(" "), a.author.name) : true))
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return filtered;
  }, [category, query]);

  const [featured, ...rest] = list;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="scrollbar-none -mx-5 flex flex-1 gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
          {["همه", ...blogCategories.map((c) => c.label)].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setCategory(label);
                setVisible(PAGE);
              }}
              aria-pressed={category === label}
              className={cn(
                "shrink-0 rounded-full px-4 py-2.5 text-[0.84rem] transition-all duration-300",
                category === label
                  ? "bg-sage text-cream shadow-[var(--shadow-soft)]"
                  : "border border-ink/10 bg-white/60 text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-64">
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4.5 4.5" strokeLinecap="round" />
          </svg>
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
            placeholder="جستجو در مقالات…"
            aria-label="جستجو در مقالات"
            className="h-11 ps-10 text-[0.86rem]"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="mt-10 rounded-[1.6rem] border border-dashed border-ink/15 bg-white/40 p-12 text-center">
          <p className="text-[1rem] font-medium text-ink">مقاله‌ای پیدا نشد</p>
          <Button variant="soft" className="mt-5" onClick={() => { setQuery(""); setCategory("همه"); }}>
            نمایش همه مقالات
          </Button>
        </div>
      ) : (
        <>
          {featured ? (
            <div className="mt-9">
              <ArticleCard article={featured} variant="featured" />
            </div>
          ) : null}

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {rest.slice(0, visible).map((a, i) => (
              <ArticleCard key={a.slug} article={a} priority={i === 0} />
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            {visible < rest.length ? (
              <>
                <Button variant="outline" onClick={() => setVisible((v) => v + PAGE)}>
                  مقالات بیشتر
                </Button>
                <span className="text-[0.78rem] text-ink-faint">
                  {faDigits(Math.min(visible, rest.length))} از {faDigits(rest.length + 1)} مقاله
                </span>
              </>
            ) : (
              <span className="text-[0.8rem] text-ink-faint">به انتهای فهرست رسیدید — {faDigits(list.length)} مقاله در این انتخاب</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
