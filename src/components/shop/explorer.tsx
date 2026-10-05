"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { products, productCategories, priceBounds } from "@/data/products";
import { ProductCard } from "@/components/cards";
import { Button } from "@/components/ui/button";
import { Checkbox, Input, Select, Toggle } from "@/components/ui/card";
import { Sheet } from "@/components/ui/overlays";
import { matches, normalizeFa } from "@/lib/utils";
import { faDigits, priceCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

type Sort = "popular" | "newest" | "cheap" | "expensive";

const sorts: { value: Sort; label: string }[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "popular", label: "محبوب‌ترین" },
  { value: "cheap", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
];

export function ShopExplorer({
  initialCategory = "همه",
  initialWishlist = false,
}: {
  initialCategory?: string;
  initialWishlist?: boolean;
}) {
  const router = useRouter();

  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string>(initialCategory);
  const [sort, setSort] = React.useState<Sort>("popular");
  const [maxPrice, setMaxPrice] = React.useState<number>(priceBounds[1]);
  const [inStockOnly, setInStockOnly] = React.useState(false);
  const [wishOnly, setWishOnly] = React.useState(initialWishlist);
  const [drawer, setDrawer] = React.useState(false);

  React.useEffect(() => {
    setCategory(initialCategory);
    setWishOnly(initialWishlist);
  }, [initialCategory, initialWishlist]);

  const wishlist = React.useMemo(() => {
    try {
      const raw = window.localStorage.getItem("yogahome.mock.v1");
      return raw ? ((JSON.parse(raw).wishlist ?? []) as string[]) : [];
    } catch {
      return [];
    }
  }, [wishOnly, drawer]);

  const results = React.useMemo(() => {
    const list = products.filter((p) => {
      if (category !== "همه" && p.category !== category) return false;
      if (p.price > maxPrice) return false;
      if (inStockOnly && p.stock <= 6) return false;
      if (wishOnly && !wishlist.includes(p.slug)) return false;
      if (query && !matches(query, p.name, p.excerpt, p.category, p.tags.join(" "))) return false;
      return true;
    });
    switch (sort) {
      case "newest":
        return [...list].sort((a, b) => (b.badge === "جدید" ? 1 : 0) - (a.badge === "جدید" ? 1 : 0) || b.rating - a.rating);
      case "cheap":
        return [...list].sort((a, b) => a.price - b.price);
      case "expensive":
        return [...list].sort((a, b) => b.price - a.price);
      default:
        return [...list].sort((a, b) => b.reviews - a.reviews);
    }
  }, [category, maxPrice, inStockOnly, wishOnly, wishlist, query, sort]);

  const counts = React.useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) map.set(p.category, (map.get(p.category) ?? 0) + 1);
    return map;
  }, []);

  const active = [category !== "همه", maxPrice < priceBounds[1], inStockOnly, wishOnly, Boolean(query)].filter(Boolean).length;

  const reset = () => {
    setCategory("همه");
    setMaxPrice(priceBounds[1]);
    setInStockOnly(false);
    setWishOnly(false);
    setQuery("");
    router.replace("/shop");
  };

  const filters = (
    <div className="flex flex-col gap-7">
      <div>
        <h3 className="mb-3 text-[0.82rem] font-semibold text-ink">دسته‌بندی</h3>
        <div className="flex flex-col">
          <Checkbox label="همه محصولات" checked={category === "همه"} onChange={() => { setCategory("همه"); router.replace("/shop"); }} count={products.length} />
          {productCategories.map((c) => (
            <Checkbox
              key={c.label}
              label={c.label}
              count={counts.get(c.label)}
              checked={category === c.label}
              onChange={(v) => {
                const next = v ? c.label : "همه";
                setCategory(next);
                router.push(next === "همه" ? "/shop" : `/shop?category=${encodeURIComponent(next)}`);
              }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[0.82rem] font-semibold text-ink">حداکثر قیمت</h3>
        <input
          type="range"
          min={priceBounds[0]}
          max={priceBounds[1]}
          step={50000}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          aria-label="حداکثر قیمت"
          className="yoga-range w-full"
        />
        <div className="mt-2.5 flex items-center justify-between text-[0.78rem] text-ink-soft">
          <span>{priceCompact(priceBounds[0])}</span>
          <span className="rounded-full bg-sand/70 px-2.5 py-1 font-medium text-ink">تا {priceCompact(maxPrice)}</span>
        </div>
      </div>

      <div className="border-t border-ink/8 pt-5">
        <Toggle label="فقط کالاهای موجود" checked={inStockOnly} onChange={setInStockOnly} />
        <Toggle label="فقط علاقه‌مندی‌ها" checked={wishOnly} onChange={(v) => { setWishOnly(v); if (!v) router.replace("/shop"); }} />
      </div>

      <Button variant="soft" onClick={reset} disabled={active === 0}>پاک کردن فیلترها</Button>
    </div>
  );

  return (
    <div className="grid gap-9 lg:grid-cols-[15.5rem_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 rounded-[1.6rem] border border-ink/8 bg-white/60 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[0.95rem] font-semibold text-ink">فیلترها</h2>
            {active ? <span className="rounded-full bg-clay/12 px-2 py-0.5 text-[0.7rem] text-clay">{faDigits(active)} فعال</span> : null}
          </div>
          {filters}
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[13rem] flex-1 sm:max-w-xs">
            <svg viewBox="0 0 24 24" className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-ink-faint" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" strokeLinecap="round" />
            </svg>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`جستجو در ${faDigits(products.length)} محصول…`}
              aria-label="جستجو در محصولات"
              className="h-11 ps-10 text-[0.86rem]"
            />
          </div>

          <label className="flex items-center gap-2 text-[0.82rem] text-ink-soft">
            <span className="hidden sm:inline">مرتب‌سازی</span>
            <Select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-11 w-[9.5rem] font-normal">
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
          </label>

          <Button variant="outline" className="lg:hidden" onClick={() => setDrawer(true)}>
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M4 7h16M7 12h10M10 17h4" strokeLinecap="round" />
            </svg>
            فیلترها{active ? ` (${faDigits(active)})` : ""}
          </Button>

          <span className="ms-auto text-[0.8rem] text-ink-faint">{faDigits(results.length)} نتیجه</span>
        </div>

        {/* category chips, always visible */}
        <div className="scrollbar-none -mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:px-0">
          {[{ label: "همه محصولات" }, ...productCategories.map((c) => ({ label: c.label }))].map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => {
                const next = c.label === "همه محصولات" ? "همه" : c.label;
                setCategory(next);
                router.push(next === "همه" ? "/shop" : `/shop?category=${encodeURIComponent(next)}`);
              }}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-[0.82rem] transition-all duration-300",
                (c.label === "همه محصولات" && category === "همه") || category === c.label
                  ? "bg-sage text-cream"
                  : "border border-ink/10 bg-white/55 text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              {c.label}
            </button>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-8 rounded-[1.6rem] border border-dashed border-ink/15 bg-white/40 p-12 text-center">
            <p className="text-[1rem] font-medium text-ink">محصولی با این انتخاب‌ها نیست</p>
            <p className="mx-auto mt-2 max-w-md text-[0.86rem] leading-[1.95] text-ink-soft">
              بازه قیمت را بازتر کنید یا دسته‌بندی را عوض کنید. اگر محصولی را لازم دارید که اینجا نیست، برای ما بنویسید.
            </p>
            <Button variant="soft" className="mt-6" onClick={reset}>نمایش همه محصولات</Button>
          </div>
        ) : (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p, i) => (
              <ProductCard key={p.slug} product={p} priority={i < 3} />
            ))}
          </div>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-shell/70 px-6 py-5 text-[0.85rem] text-ink-soft">
          <span>
            {query ? <>نتیجه‌ها برای «{normalizeFa(query) || query}»</> : "ارسال رایگان بالای ۲ میلیون تومان · بازگشت تا ۷ روز"}
          </span>
          <span className="latin text-[0.72rem] text-ink-faint">demo store · no backend</span>
        </div>
      </div>

      <Sheet open={drawer} onOpenChange={setDrawer} title="فیلترها" side="bottom" footer={<Button className="w-full" onClick={() => setDrawer(false)}>نمایش {faDigits(results.length)} محصول</Button>}>
        {filters}
      </Sheet>
    </div>
  );
}
