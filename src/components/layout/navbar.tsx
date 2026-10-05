"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { services } from "@/data/services";
import { courseCategories } from "@/data/courses";
import { productCategories } from "@/data/products";
import { useCart } from "@/components/commerce/cart-context";
import { Sheet } from "@/components/ui/overlays";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { SearchOverlay } from "@/components/layout/search-overlay";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

/* ---------------------------------- icons --------------------------------- */

function Icon({ path, className }: { path: React.ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-[1.15rem]", className)} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {path}
    </svg>
  );
}
const SearchIcon = (p: { className?: string }) => (
  <Icon className={p.className} path={<><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></>} />
);
const HeartIcon = ({ filled, className }: { filled?: boolean; className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("size-[1.15rem]", className)} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 20s-7.5-4.6-7.5-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />
  </svg>
);
const BagIcon = (p: { className?: string }) => (
  <Icon className={p.className} path={<><path d="M6 8h12l-1 11H7L6 8z" /><path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" /></>} />
);

/* --------------------------------- counters -------------------------------- */

function Counter({ value, label, children, onClick }: { value: number; label: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}${value ? ` — ${value} مورد` : ""}`}
      className="relative grid size-10 place-items-center rounded-full text-ink-soft transition-all duration-300 hover:bg-ink/[.06] hover:text-ink"
    >
      {children}
      {value > 0 ? (
        <span className="absolute -top-0.5 -end-0.5 grid min-w-[1.05rem] place-items-center rounded-full bg-clay px-1 text-[0.62rem] font-semibold text-cream">
          {String(value).replace(/[0-9]/g, (d) => String.fromCharCode(0x06f0 + Number(d)))}
        </span>
      ) : null}
    </button>
  );
}

/* ---------------------------------- navbar --------------------------------- */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [panel, setPanel] = React.useState<"services" | "courses" | "shop" | null>(null);
  const cart = useCart();

  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  React.useEffect(() => {
    setMenuOpen(false);
    setPanel(null);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const megaLinks: Record<"services" | "courses" | "shop", { title: string; sub: string; href: string; img?: string }[]> = {
    services: services.map((s) => ({ title: s.name, sub: s.tagline, href: `/services/${s.slug}`, img: s.cover })),
    courses: courseCategories.map((c) => ({ title: c.label, sub: c.text, href: `/courses?category=${encodeURIComponent(c.label)}` })),
    shop: productCategories.map((c) => ({ title: c.label, sub: c.text, href: `/shop?category=${encodeURIComponent(c.label)}`, img: c.image })),
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:start-3 focus:z-[120] focus:rounded-full focus:bg-sage focus:px-5 focus:py-2.5 focus:text-[0.85rem] focus:text-cream"
      >
        پرش به محتوای اصلی
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding,backdrop-filter] duration-500",
          scrolled ? "bg-cream/88 py-2 shadow-[0_1px_0_rgba(34,37,30,.07),0_18px_40px_-30px_rgba(34,37,30,.4)] backdrop-blur-xl" : "bg-transparent py-4",
        )}
        onMouseLeave={() => setPanel(null)}
      >
        <div className={cn("container-x flex items-center gap-4 transition-[height] duration-500", scrolled ? "h-14" : "h-[4.5rem]")}>
          <Logo />

          <nav aria-label="ناوبری اصلی" className="mx-auto hidden items-center gap-0.5 lg:flex">
            {site.nav.map((item) => {
              const key = item.href.replace("/", "") as "services" | "courses" | "shop";
              const hasPanel = key === "services" || key === "courses" || key === "shop";
              return (
                <div key={item.href} className="relative" onMouseEnter={() => hasPanel && setPanel(key)}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[0.92rem] transition-colors duration-300",
                      isActive(item.href) ? "text-ink" : "text-ink-soft hover:text-ink",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 bottom-1 h-px origin-center bg-sage transition-transform duration-500",
                        isActive(item.href) ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className="ms-auto flex items-center gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-ink/10 bg-white/50 px-3.5 py-2 text-[0.82rem] text-ink-faint transition-colors duration-300 hover:border-ink/25 hover:text-ink-soft md:flex"
            >
              <SearchIcon className="size-4" />
              <span>جستجو</span>
              <kbd className="latin ms-2 rounded bg-ink/[.06] px-1.5 py-0.5 text-[0.62rem] text-ink-faint">Ctrl K</kbd>
            </button>
            <span className="md:hidden">
              <Counter value={0} label="جستجو" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </Counter>
            </span>
            <Counter value={cart.wishCount} label="علاقه‌مندی‌ها" onClick={() => (window.location.href = "/shop?wishlist=1")}>
              <HeartIcon filled={cart.wishCount > 0} />
            </Counter>
            <Counter value={cart.count} label="سبد خرید" onClick={() => cart.setOpen(true)}>
              <BagIcon />
            </Counter>
            <Button asChild size="sm" className="hidden ms-1 sm:inline-flex">
              <Link href="/contact">رزرو / مشاوره</Link>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="باز کردن منو"
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/[.06] lg:hidden"
            >
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
            </button>
          </div>
        </div>

        {/* desktop mega panel */}
        {panel ? (
          <div
            className="pointer-events-auto absolute inset-x-0 top-full hidden px-6 pt-2 lg:block"
            onMouseEnter={() => setPanel(panel)}
          >
            <div className="container-x">
              <div className="animate-[fade-up_.35s_cubic-bezier(.22,1,.36,1)] overflow-hidden rounded-[1.6rem] border border-ink/8 bg-cream/95 p-3 shadow-[var(--shadow-lift)] backdrop-blur-xl">
                <div className={cn("grid gap-2", panel === "services" ? "grid-cols-2" : "grid-cols-3")}>
                  {megaLinks[panel].map((item) => (
                    <Link
                      key={item.href + item.title}
                      href={item.href}
                      className="group flex items-start gap-3 rounded-[1.1rem] p-2.5 transition-colors hover:bg-white"
                    >
                      {item.img ? (
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                          <Media src={item.img} alt={item.title} sizes="64px" className="size-full" imgClassName="transition-transform duration-700 group-hover:scale-110" />
                        </span>
                      ) : (
                        <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-sand/70 text-sage">
                          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                          </svg>
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block text-[0.92rem] font-medium text-ink">{item.title}</span>
                        <span className="mt-0.5 block line-clamp-2 text-[0.78rem] leading-relaxed text-ink-faint">{item.sub}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
      <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
}

/* ------------------------------- mobile sheet ------------------------------ */

function MobileMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const pathname = usePathname();
  const [expand, setExpand] = React.useState<"services" | "courses" | "shop" | null>(null);
  const cart = useCart();

  const sections = {
    services: services.map((s) => ({ label: s.name, href: `/services/${s.slug}`, note: s.eyebrow })),
    courses: courseCategories.map((c) => ({ label: c.label, href: `/courses?category=${encodeURIComponent(c.label)}`, note: "" })),
    shop: productCategories.map((c) => ({ label: c.label, href: `/shop?category=${encodeURIComponent(c.label)}`, note: "" })),
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title="فهرست" side="end">
      <nav aria-label="ناوبری موبایل" className="flex flex-col">
        {site.nav.map((item) => {
          const key = item.href.replace("/", "") as keyof typeof sections;
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <div key={item.href} className="border-b border-ink/8 last:border-0">
              <div className="flex items-center">
                <Link
                  href={item.href}
                  onClick={() => onOpenChange(false)}
                  className={cn("flex-1 py-4 text-[1.15rem] font-medium transition-colors", active ? "text-sage" : "text-ink")}
                >
                  {item.label}
                </Link>
                {key in sections ? (
                  <button
                    type="button"
                    aria-expanded={expand === key}
                    aria-label={`نمایش زیرمجموعه‌های ${item.label}`}
                    onClick={() => setExpand(expand === key ? null : (key as "services" | "courses" | "shop"))}
                    className="grid size-9 place-items-center rounded-full bg-shell text-ink-soft"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className={cn("size-4 transition-transform duration-300", expand === key && "rotate-45")}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      aria-hidden
                    >
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </button>
                ) : null}
              </div>
              {expand === key && key in sections ? (
                <div className="mb-4 flex flex-col gap-1 rounded-2xl bg-shell/70 p-2">
                  {sections[key as keyof typeof sections].map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.88rem] text-ink-soft transition-colors hover:bg-white hover:text-ink"
                    >
                      <span>{sub.label}</span>
                      {sub.note ? <span className="text-[0.7rem] text-ink-faint">{sub.note}</span> : null}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>

      <div className="mt-6 grid grid-cols-2 gap-2">
        <Button variant="soft" onClick={() => cart.setOpen(true)} className="w-full">
          سبد خرید ({String(cart.count).replace(/[0-9]/g, (d) => String.fromCharCode(0x06f0 + Number(d)))})
        </Button>
        <Button asChild className="w-full">
          <Link href="/contact" onClick={() => onOpenChange(false)}>رزرو / مشاوره</Link>
        </Button>
      </div>

      <div className="mt-6 rounded-2xl bg-sage p-5 text-cream">
        <p className="text-[0.8rem] text-cream/70">پرسش سریع و رزرو</p>
        <a href={`tel:${site.mobile.replace(/\s/g, "")}`} className="mt-1 block text-[1.15rem] font-semibold tracking-wide" dir="ltr">
          {site.mobile}
        </a>
        <p className="mt-2 text-[0.8rem] leading-relaxed text-cream/70">{site.addressShort}</p>
        <div className="mt-4 flex gap-2">
          {site.socials.slice(0, 3).map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full bg-cream/12 px-3 py-1.5 text-[0.75rem] transition-colors hover:bg-cream/20"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </Sheet>
  );
}

export { SearchIcon, HeartIcon, BagIcon };
