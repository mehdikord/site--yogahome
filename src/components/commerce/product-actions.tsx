"use client";

import * as React from "react";
import { useCart } from "@/components/commerce/cart-context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AddToCartButton({
  slug,
  name,
  size = "md",
  variant = "solid",
  className,
  full = false,
  label = "افزودن به سبد",
}: {
  slug: string;
  name: string;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "soft" | "outline" | "clay";
  className?: string;
  full?: boolean;
  label?: string;
}) {
  const cart = useCart();
  const [added, setAdded] = React.useState(false);

  React.useEffect(() => {
    if (!added) return;
    const t = window.setTimeout(() => setAdded(false), 1800);
    return () => window.clearTimeout(t);
  }, [added]);

  return (
    <Button
      size={size}
      variant={variant}
      className={cn(full && "w-full", added && "bg-moss text-cream", className)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        cart.add(slug);
        setAdded(true);
      }}
      aria-label={`${added ? "افزوده شد" : label} — ${name}`}
    >
      {added ? (
        <>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          به سبد اضافه شد
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M6 8h12l-1 11H7L6 8z" strokeLinejoin="round" />
            <path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" strokeLinecap="round" />
          </svg>
          {label}
        </>
      )}
    </Button>
  );
}

export function WishlistButton({ slug, className, withLabel = false }: { slug: string; className?: string; withLabel?: boolean }) {
  const cart = useCart();
  const active = cart.isWished(slug);
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        cart.toggleWish(slug);
      }}
      className={cn(
        "grid size-9 place-items-center rounded-full border transition-all duration-300",
        active
          ? "border-clay/30 bg-clay/12 text-clay"
          : "border-ink/12 bg-cream/85 text-ink-soft hover:border-ink/25 hover:text-ink",
        withLabel && "w-full gap-2 px-4 text-[0.85rem] font-medium",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className={cn("size-[1.05rem] transition-transform duration-300", active && "scale-110")} fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" aria-hidden>
        <path d="M12 20s-7.5-4.6-7.5-9.5A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" strokeLinejoin="round" />
      </svg>
      {withLabel ? <span>{active ? "در علاقه‌مندی‌ها" : "علاقه‌مندی"}</span> : null}
    </button>
  );
}
