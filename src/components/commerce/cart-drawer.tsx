"use client";

import * as React from "react";
import Link from "next/link";
import { Sheet } from "@/components/ui/overlays";
import { Button } from "@/components/ui/button";
import { Media } from "@/components/ui/media";
import { Input } from "@/components/ui/card";
import { useCart, FREE_SHIPPING_AT, COUPON } from "@/components/commerce/cart-context";
import { faDigits, price as faPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

function Qty({ value, onChange, max }: { value: number; onChange: (v: number) => void; max: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink/10 bg-white/70 p-1">
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className="grid size-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-shell disabled:opacity-40"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
      <span className="min-w-6 text-center text-[0.85rem] font-medium tabular-nums">{faDigits(value)}</span>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="کاهش تعداد"
        className="grid size-7 place-items-center rounded-full text-ink-soft transition-colors hover:bg-shell disabled:opacity-40"
      >
        <svg viewBox="0 0 24 24" className="size-3.5" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden>
          <path d="M5 12h14" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

export function CartDrawer() {
  const cart = useCart();
  const [step, setStep] = React.useState<"cart" | "details" | "done">("cart");
  const [coupon, setCoupon] = React.useState("");
  const [couponMsg, setCouponMsg] = React.useState<string | null>(null);
  const [order, setOrder] = React.useState({ name: "", phone: "" });
  const [error, setError] = React.useState<string | null>(null);
  const code = React.useMemo(() => `YH-${Math.floor(Math.random() * 8999) + 1000}`, [step === "done"]);

  React.useEffect(() => {
    if (!cart.open) {
      window.setTimeout(() => {
        setStep((s) => (s === "done" ? "cart" : s));
      }, 300);
    }
  }, [cart.open]);

  const shippingProgress = Math.min(100, Math.round(((cart.subtotal - cart.discount) / FREE_SHIPPING_AT) * 100));

  return (
    <Sheet
      open={cart.open}
      onOpenChange={(v) => {
        cart.setOpen(v);
        if (!v) setError(null);
      }}
      title={step === "cart" ? "سبد خرید" : step === "details" ? "تکمیل سفارش (نمایشی)" : "سفارش ثبت شد"}
      side="end"
      footer={
        step === "cart" && cart.resolved.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between text-[0.88rem]">
              <span className="text-ink-soft">مجموع</span>
              <span className="font-semibold text-ink">{faPrice(cart.total)}</span>
            </div>
            <Button className="w-full" onClick={() => setStep("details")}>
              ادامه و ثبت سفارش
            </Button>
            <p className="text-center text-[0.7rem] text-ink-faint">این نسخه نمایشی است؛ پرداخت واقعی انجام نمی‌شود.</p>
          </div>
        ) : step === "details" ? (
          <div className="flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={() => setStep("cart")}>
              بازگشت
            </Button>
            <Button
              className="flex-[2]"
              onClick={() => {
                if (order.name.trim().length < 3) return setError("نام را کامل وارد کنید.");
                if (!/^09\d{9}$/.test(order.phone.replace(/\s|-/g, ""))) return setError("شماره موبایل ۱۱ رقمی و با ۰۹ شروع می‌شود.");
                setError(null);
                setStep("done");
                cart.clear();
              }}
            >
              ثبت نهایی (نمایشی)
            </Button>
          </div>
        ) : null
      }
    >
      {step === "cart" ? (
        cart.resolved.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-14 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-shell text-ink-faint">
              <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                <path d="M6 8h12l-1 11H7L6 8z" />
                <path d="M9.5 8V6.5a2.5 2.5 0 0 1 5 0V8" />
              </svg>
            </span>
            <p className="text-[0.95rem] text-ink">سبد شما هنوز خالی است</p>
            <p className="max-w-[22rem] text-[0.84rem] leading-relaxed text-ink-soft">
              ابزار تمرین، روغن‌ها و محصولات مراقبت پوست در فروشگاه آماده‌اند.
            </p>
            <Button asChild size="sm">
              <Link href="/shop" onClick={() => cart.setOpen(false)}>
                رفتن به فروشگاه
              </Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-shell/70 p-3.5">
              <div className="flex items-center justify-between text-[0.8rem]">
                <span className="text-ink-soft">
                  {shippingProgress >= 100 ? "ارسال رایگان فعال شد" : `${faPrice(FREE_SHIPPING_AT - (cart.subtotal - cart.discount))} تا ارسال رایگان`}
                </span>
                <span className="text-ink-faint">{faDigits(shippingProgress)}٪</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white">
                <div
                  className="h-full rounded-full bg-gradient-to-l from-olive to-sage transition-[width] duration-700"
                  style={{ width: `${Math.max(6, shippingProgress)}%` }}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {cart.resolved.map((line) => (
                <li key={line.slug} className="flex gap-3 rounded-2xl border border-ink/8 bg-white/60 p-3">
                  <Link href={`/shop/${line.slug}`} onClick={() => cart.setOpen(false)} className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                    <Media src={line.product.images[0]} alt={line.product.name} sizes="80px" className="size-full" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/shop/${line.slug}`}
                        onClick={() => cart.setOpen(false)}
                        className="line-clamp-2 text-[0.88rem] font-medium text-ink hover:text-sage"
                      >
                        {line.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => cart.remove(line.slug)}
                        aria-label={`حذف ${line.product.name}`}
                        className="grid size-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors hover:bg-ink/[.06] hover:text-clay"
                      >
                        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
                          <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <Qty value={line.qty} max={line.product.stock} onChange={(v) => cart.setQty(line.slug, v)} />
                      <span className="text-[0.85rem] font-medium text-ink">{faPrice(line.product.price * line.qty)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-ink/8 bg-white/60 p-3.5">
              <p className="text-[0.82rem] font-medium text-ink">کد تخفیف</p>
              <p className="mt-1 text-[0.75rem] text-ink-faint">
                در این نسخه نمایشی کد <span className="latin tracking-wide">{COUPON.code}</span> معادل {faDigits(10)}٪ کار می‌کند.
              </p>
              <div className="mt-2.5 flex gap-2">
                <Input
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    setCouponMsg(null);
                  }}
                  placeholder={COUPON.code}
                  className="h-10 text-[0.85rem]"
                  aria-label="کد تخفیف"
                />
                <Button
                  size="sm"
                  variant="soft"
                  onClick={() => {
                    const ok = cart.applyCoupon(coupon);
                    setCouponMsg(ok ? "کد اعمال شد." : "کد نامعتبر است.");
                  }}
                >
                  اعمال
                </Button>
              </div>
              {cart.couponApplied ? (
                <p className="mt-2 flex items-center justify-between text-[0.78rem] text-moss">
                  <span>تخفیف {faPrice(cart.discount)} اعمال شد</span>
                  <button
                    type="button"
                    className="text-ink-faint underline-offset-4 hover:underline"
                    onClick={() => {
                      cart.removeCoupon();
                      setCouponMsg(null);
                      setCoupon("");
                    }}
                  >
                    حذف
                  </button>
                </p>
              ) : null}
              {couponMsg && !cart.couponApplied ? <p className="mt-2 text-[0.78rem] text-clay">{couponMsg}</p> : null}
            </div>

            <dl className="flex flex-col gap-2 text-[0.85rem]">
              <div className="flex justify-between">
                <dt className="text-ink-soft">جمع کالاها</dt>
                <dd className="text-ink">{faPrice(cart.subtotal)}</dd>
              </div>
              {cart.discount > 0 ? (
                <div className="flex justify-between text-moss">
                  <dt>تخفیف</dt>
                  <dd>− {faPrice(cart.discount)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-ink-soft">ارسال</dt>
                <dd className="text-ink">{cart.shipping === 0 ? "رایگان" : faPrice(cart.shipping)}</dd>
              </div>
            </dl>
          </div>
        )
      ) : step === "details" ? (
        <div className="flex flex-col gap-5 py-2">
          <div className="rounded-2xl bg-clay/10 p-4 text-[0.84rem] leading-[1.9] text-ink-soft">
            ما در این نسخه، درگاه پرداخت نداریم. فرم زیر فقط مسیر انتخاب و تأیید سفارش را نشان می‌دهد.
          </div>
          <label className="flex flex-col gap-2 text-[0.85rem] text-ink">
            نام و نام خانوادگی
            <Input value={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} placeholder="مثلاً مریم احمدی" />
          </label>
          <label className="flex flex-col gap-2 text-[0.85rem] text-ink">
            شماره موبایل
            <Input value={order.phone} onChange={(e) => setOrder({ ...order, phone: e.target.value })} placeholder="09xx xxx xxxx" dir="ltr" inputMode="tel" />
          </label>
          {error ? (
            <p role="alert" className="rounded-xl bg-clay/10 px-3.5 py-2.5 text-[0.82rem] text-clay">
              {error}
            </p>
          ) : null}
          <ul className="flex flex-col gap-2 text-[0.85rem] text-ink-soft">
            <li className="flex items-center gap-2">
              <Dot /> ارسال با پست پیشتاز، ۲ تا ۳ روز کاری
            </li>
            <li className="flex items-center gap-2">
              <Dot /> پرداخت درب منزل در قائم‌شهر و اطراف
            </li>
            <li className="flex items-center gap-2">
              <Dot /> ۷ روز مهلت بازگشت بسته‌بندی‌نشده
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-10 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-sage/12 text-sage">
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p className="text-[1.05rem] font-medium text-ink">سفارش شما ثبت شد</p>
          <p className="max-w-[24rem] text-[0.85rem] leading-[1.95] text-ink-soft">
            کد پیگیری نمایشی: <span className="latin tracking-wider">{code}</span> — در نسخه واقعی، پیامک تأیید و لینک رهگیری ارسال می‌شود.
          </p>
          <Button asChild size="sm" variant="soft" onClick={() => cart.setOpen(false)}>
            <Link href="/shop">بازگشت به فروشگاه</Link>
          </Button>
        </div>
      )}
    </Sheet>
  );
}

function Dot() {
  return <span className={cn("size-1.5 shrink-0 rounded-full bg-olive")} aria-hidden />;
}
