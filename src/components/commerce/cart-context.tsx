"use client";

import * as React from "react";
import { products, type Product } from "@/data/products";

export type CartLine = { slug: string; qty: number };
export type ResolvedLine = CartLine & { product: Product };

export const FREE_SHIPPING_AT = 2000000;
export const COUPON = { code: "YOGAHOME10", off: 0.1 };

type CartState = {
  lines: CartLine[];
  wishlist: string[];
  open: boolean;
  couponApplied: boolean;
};

type CartApi = CartState & {
  resolved: ResolvedLine[];
  count: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  wishCount: number;
  isWished: (slug: string) => boolean;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  setOpen: (v: boolean) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
};

const CartContext = React.createContext<CartApi | null>(null);

const KEY = "yogahome.mock.v1";

function readStore(): Pick<CartState, "lines" | "wishlist" | "couponApplied"> {
  if (typeof window === "undefined") return { lines: [], wishlist: [], couponApplied: false };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { lines: [], wishlist: [], couponApplied: false };
    const parsed = JSON.parse(raw) as Partial<CartState>;
    return {
      lines: Array.isArray(parsed.lines) ? parsed.lines.filter((l) => products.some((p) => p.slug === l.slug)) : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist.filter((s) => products.some((p) => p.slug === s)) : [],
      couponApplied: Boolean(parsed.couponApplied),
    };
  } catch {
    return { lines: [], wishlist: [], couponApplied: false };
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<CartState>({ lines: [], wishlist: [], open: false, couponApplied: false });
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setState((s) => ({ ...s, ...readStore() }));
    setHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        KEY,
        JSON.stringify({ lines: state.lines, wishlist: state.wishlist, couponApplied: state.couponApplied }),
      );
    } catch {
      /* storage disabled — the mock cart keeps working in memory */
    }
  }, [state.lines, state.wishlist, state.couponApplied, hydrated]);

  React.useEffect(() => {
    document.documentElement.style.overflow = state.open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [state.open]);

  const api = React.useMemo<CartState & CartApi>(() => {
    const resolved: ResolvedLine[] = state.lines.flatMap((line) => {
      const product = products.find((p) => p.slug === line.slug);
      return product ? [{ ...line, product }] : [];
    });
    const subtotal = resolved.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const discount = state.couponApplied ? Math.round(subtotal * COUPON.off) : 0;
    const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_AT ? 0 : 120000;
    return {
      ...state,
      resolved,
      count: resolved.reduce((sum, l) => sum + l.qty, 0),
      subtotal,
      discount,
      shipping,
      total: Math.max(0, subtotal - discount + shipping),
      wishCount: state.wishlist.length,
      isWished: (slug: string) => state.wishlist.includes(slug),
      add: (slug: string, qty = 1) =>
        setState((s) => {
          const found = s.lines.find((l) => l.slug === slug);
          const stock = products.find((p) => p.slug === slug)?.stock ?? 99;
          const lines = found
            ? s.lines.map((l) => (l.slug === slug ? { ...l, qty: Math.min(stock, l.qty + qty) } : l))
            : [...s.lines, { slug, qty: Math.min(stock, qty) }];
          return { ...s, lines, open: true };
        }),
      setQty: (slug: string, qty: number) =>
        setState((s) => {
          const stock = products.find((p) => p.slug === slug)?.stock ?? 99;
          const safe = Math.max(1, Math.min(stock, qty));
          return { ...s, lines: s.lines.map((l) => (l.slug === slug ? { ...l, qty: safe } : l)) };
        }),
      remove: (slug: string) => setState((s) => ({ ...s, lines: s.lines.filter((l) => l.slug !== slug) })),
      clear: () => setState((s) => ({ ...s, lines: [], couponApplied: false })),
      toggleWish: (slug: string) =>
        setState((s) => ({
          ...s,
          wishlist: s.wishlist.includes(slug) ? s.wishlist.filter((x) => x !== slug) : [...s.wishlist, slug],
        })),
      setOpen: (open: boolean) => setState((s) => ({ ...s, open })),
      applyCoupon: (code: string) => {
        const ok = code.trim().toUpperCase().replace(/\s+/g, "") === COUPON.code;
        setState((s) => ({ ...s, couponApplied: ok }));
        return ok;
      },
      removeCoupon: () => setState((s) => ({ ...s, couponApplied: false })),
    };
  }, [state]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
