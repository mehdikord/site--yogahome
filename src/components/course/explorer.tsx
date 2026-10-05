"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { courses, courseCategories, courseLevels, type Course } from "@/data/courses";
import { CourseCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/card";
import { Sheet } from "@/components/ui/overlays";
import { matches } from "@/lib/utils";
import { faDigits } from "@/lib/format";
import { cn } from "@/lib/utils";

type Sort = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

const sorts: { value: Sort; label: string }[] = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "newest", label: "جدیدترین" },
  { value: "rating", label: "بیشترین رضایت" },
  { value: "price-asc", label: "ارزان‌ترین" },
  { value: "price-desc", label: "گران‌ترین" },
];

const priceBands = [
  { label: "همه قیمت‌ها", min: 0, max: Infinity },
  { label: "زیر ۱ میلیون", min: 0, max: 1000000 },
  { label: "۱ تا ۴ میلیون", min: 1000000, max: 4000000 },
  { label: "بالای ۴ میلیون", min: 4000000, max: Infinity },
];

const durations = [
  { label: "هر مدت", hours: 0 },
  { label: "کوتاه · زیر ۸ ساعت", hours: 8 },
  { label: "متوسط · تا ۱۶ ساعت", hours: 16 },
  { label: "طولانی · بالای ۱۶ ساعت", hours: 999 },
];

function sortCourses(list: Course[], sort: Sort) {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => +new Date(b.releasedAt) - +new Date(a.releasedAt));
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    default:
      return copy.sort((a, b) => Number(Boolean(b.popular)) - Number(Boolean(a.popular)) || b.students - a.students);
  }
}

export function CourseExplorer({ initialCategory = "همه" }: { initialCategory?: string }) {
  const router = useRouter();

  const [category, setCategory] = React.useState<string>(initialCategory);
  const [level, setLevel] = React.useState<string>("همه");
  const [kind, setKind] = React.useState<string>("همه");
  const [band, setBand] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [sort, setSort] = React.useState<Sort>("popular");
  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(6);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // category comes from the url (server-rendered), so it stays shareable
  React.useEffect(() => {
    setCategory(initialCategory);
    setVisible(6);
  }, [initialCategory]);

  const results = React.useMemo(() => {
    const filtered = courses.filter((c) => {
      if (category !== "همه" && c.category !== category) return false;
      if (level !== "همه" && c.level !== level) return false;
      if (kind !== "همه" && c.kind !== kind) return false;
      if (c.price < priceBands[band].min || c.price > priceBands[band].max) return false;
      const d = durations[duration].hours;
      if (d === 8 && c.hours > 8) return false;
      if (d === 16 && (c.hours <= 8 || c.hours > 16)) return false;
      if (d === 999 && c.hours <= 16) return false;
      if (query && !matches(query, c.title, c.summary, c.category, c.instructor, c.tagline)) return false;
      return true;
    });
    return sortCourses(filtered, sort);
  }, [category, level, kind, band, duration, sort, query]);

  const activeCount = [category !== "همه", level !== "همه", kind !== "همه", band !== 0, duration !== 0, Boolean(query)].filter(Boolean).length;

  const reset = () => {
    setCategory("همه");
    setLevel("همه");
    setKind("همه");
    setBand(0);
    setDuration(0);
    setQuery("");
    setVisible(6);
    router.replace("/courses");
  };

  const chips = (
    <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0">
      {[{ label: "همه" as const, text: "" }, ...courseCategories].map((c) => (
        <button
          key={c.label}
          type="button"
          onClick={() => {
            setCategory(c.label);
            setVisible(6);
            router.push(c.label === "همه" ? "/courses" : `/courses?category=${encodeURIComponent(c.label)}`);
          }}
          className={cn(
            "shrink-0 rounded-full px-4 py-2.5 text-[0.84rem] transition-all duration-300",
            category === c.label
              ? "bg-sage text-cream shadow-[var(--shadow-soft)]"
              : "border border-ink/10 bg-white/60 text-ink-soft hover:border-ink/25 hover:text-ink",
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );

  const controls = (
    <div className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-2 text-[0.82rem] font-medium text-ink">
        سطح دوره
        <Select value={level} onChange={(e) => { setLevel(e.target.value); setVisible(6); }} className="font-normal">
          <option value="همه">همه سطوح</option>
          {courseLevels.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </Select>
      </label>
      <label className="flex flex-col gap-2 text-[0.82rem] font-medium text-ink">
        قالب آموزش
        <Select value={kind} onChange={(e) => { setKind(e.target.value); setVisible(6); }} className="font-normal">
          <option value="همه">ویدیویی و متنی</option>
          <option value="ویدیویی">ویدیویی</option>
          <option value="متنی">متنی</option>
          <option value="ترکیبی">ترکیبی</option>
        </Select>
      </label>
      <div className="flex flex-col gap-2 text-[0.82rem] font-medium text-ink sm:col-span-2">
        بازه قیمت
        <div className="flex flex-wrap gap-2">
          {priceBands.map((b, i) => (
            <button
              key={b.label}
              type="button"
              onClick={() => { setBand(i); setVisible(6); }}
              className={cn(
                "rounded-xl px-3.5 py-2 text-[0.8rem] font-normal transition-colors duration-300",
                band === i ? "bg-sand text-ink" : "border border-ink/10 bg-white/60 text-ink-soft hover:border-ink/25",
              )}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[0.82rem] font-medium text-ink sm:col-span-2">
        مدت دوره
        <div className="flex flex-wrap gap-2">
          {durations.map((d, i) => (
            <button
              key={d.label}
              type="button"
              onClick={() => { setDuration(i); setVisible(6); }}
              className={cn(
                "rounded-xl px-3.5 py-2 text-[0.8rem] font-normal transition-colors duration-300",
                duration === i ? "bg-sand text-ink" : "border border-ink/10 bg-white/60 text-ink-soft hover:border-ink/25",
              )}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>
      <div className="sm:col-span-2">
        <Button variant="soft" className="w-full" onClick={reset} disabled={activeCount === 0}>
          پاک کردن فیلترها {activeCount ? `(${faDigits(activeCount)})` : ""}
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mt-10 flex flex-col gap-6">
        {chips}

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:max-w-xs">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" strokeLinecap="round" />
            </svg>
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisible(6); }}
              placeholder="جستجو در عنوان، مربی یا موضوع…"
              className="h-11 ps-10 text-[0.86rem]"
              aria-label="جستجو در دوره‌ها"
            />
          </div>

          <label className="flex items-center gap-2 text-[0.82rem] text-ink-soft">
            <span className="hidden sm:inline">مرتب‌سازی</span>
            <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-11 w-[11.5rem] font-normal">
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
          </label>

          <Button variant="outline" size="md" className="ms-auto lg:hidden" onClick={() => setFiltersOpen(true)}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M4 7h16M7 12h10M10 17h4" strokeLinecap="round" />
            </svg>
            فیلترها {activeCount ? `(${faDigits(activeCount)})` : ""}
          </Button>

          <span className="text-[0.82rem] text-ink-faint">{faDigits(results.length)} دوره</span>
        </div>
      </div>

      <div className="mt-9 grid gap-9 lg:grid-cols-[16.5rem_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-28 rounded-[1.6rem] border border-ink/8 bg-white/60 p-5">
            <h2 className="mb-4 text-[0.95rem] font-semibold text-ink">فیلترها</h2>
            {controls}
          </div>
        </aside>

        <div>
          {results.length === 0 ? (
            <div className="rounded-[1.6rem] border border-dashed border-ink/15 bg-white/40 p-12 text-center">
              <p className="text-[1rem] font-medium text-ink">دوره‌ای با این فیلترها پیدا نشد</p>
              <p className="mx-auto mt-2 max-w-md text-[0.86rem] leading-[1.95] text-ink-soft">
                پیشنهاد می‌کنیم سطح یا بازه قیمت را تغییر دهید. اگر دوره‌ای که دنبالش هستید اینجا نیست، برای ما بنویسید تا در برنامه فصل بعد اضافه کنیم.
              </p>
              <Button variant="soft" className="mt-6" onClick={reset}>پاک کردن فیلترها</Button>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {results.slice(0, visible).map((course, i) => (
                  <CourseCard key={course.slug} course={course} priority={i < 2} />
                ))}
              </div>
              {visible < results.length ? (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <Button variant="outline" onClick={() => setVisible((v) => v + 3)}>
                    نمایش دوره‌های بیشتر
                  </Button>
                  <span className="text-[0.78rem] text-ink-faint">
                    {faDigits(visible)} از {faDigits(results.length)}
                  </span>
                </div>
              ) : null}
            </>
          )}

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] bg-shell/70 p-6">
            <p className="max-w-md text-[0.9rem] leading-[1.95] text-ink-soft">
              به دنبال دوره‌ای هستید که در این فهرست نیست؟ موضوع مورد خود را برای ما بنویسید؛ برنامه فصل بعد بر اساس همین درخواست‌ها چیده می‌شود.
            </p>
            <Button asChild variant="solid">
              <Link href="/contact">پیشنهاد موضوع دوره</Link>
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen} title="فیلترها" side="bottom" footer={<Button className="w-full" onClick={() => setFiltersOpen(false)}>نمایش {faDigits(results.length)} دوره</Button>}>
        {controls}
      </Sheet>
    </div>
  );
}
