"use client";

import * as React from "react";
import { Dialog } from "@/components/ui/overlays";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/card";
import { price as faPrice } from "@/lib/format";

export function EnrollButton({
  title,
  price,
  size = "lg",
  className,
}: {
  title: string;
  price: number;
  size?: "md" | "lg";
  className?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState<"form" | "done">("form");
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const code = React.useMemo(() => `ENR-${Math.floor(Math.random() * 8999) + 1000}`, [step]);

  React.useEffect(() => {
    if (!open) window.setTimeout(() => setStep("form"), 320);
  }, [open]);

  return (
    <>
      <Button size={size} className={className} onClick={() => setOpen(true)}>
        ثبت‌نام در دوره
        <span className="ms-1 rounded-full bg-cream/15 px-2 py-0.5 text-[0.72rem] font-normal">{faPrice(price)}</span>
      </Button>

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title={step === "form" ? "ثبت‌نام در دوره" : "ثبت‌نام انجام شد"}
        description={step === "form" ? "این یک نسخه نمایشی است؛ مبلغی پرداخت نمی‌شود و درگاهی وجود ندارد." : undefined}
      >
        {step === "form" ? (
          <div className="flex flex-col gap-4 p-6">
            <div className="rounded-2xl bg-shell/70 p-4">
              <p className="text-[0.9rem] font-medium text-ink">{title}</p>
              <p className="mt-1.5 text-[0.82rem] text-ink-soft">هزینه در نسخه واقعی: {faPrice(price)} — دسترسی ۱۲ ماهه</p>
            </div>
            <label className="flex flex-col gap-2 text-[0.85rem] text-ink">
              نام و نام خانوادگی
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="مثلاً نگار رحیمی" />
            </label>
            <label className="flex flex-col gap-2 text-[0.85rem] text-ink">
              موبایل یا ایمیل
              <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="09xxxxxxxxx" dir="ltr" />
            </label>
            {error ? <p role="alert" className="rounded-xl bg-clay/10 px-3.5 py-2.5 text-[0.82rem] text-clay">{error}</p> : null}
            <Button
              className="mt-1 w-full"
              onClick={() => {
                if (name.trim().length < 3) return setError("نام خود را کامل وارد کنید.");
                const value = contact.trim();
                const ok = /^09\d{9}$/.test(value.replace(/[\s-]/g, "")) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
                if (!ok) return setError("یک شماره موبایل ۱۱ رقمی یا ایمیل معتبر وارد کنید.");
                setError(null);
                setStep("done");
              }}
            >
              ثبت درخواست (نمایشی)
            </Button>
            <p className="text-center text-[0.72rem] text-ink-faint">با ثبت درخواست، هیچ اطلاعاتی جایی ارسال نمی‌شود.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <span className="grid size-14 place-items-center rounded-full bg-sage/12 text-sage">
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden>
                <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <p className="text-[1.02rem] font-medium text-ink">درخواست شما ثبت شد</p>
            <p className="max-w-sm text-[0.86rem] leading-[1.95] text-ink-soft">
              کد پیگیری نمایشی <span className="latin tracking-wider">{code}</span> — در نسخه واقعی، لینک پرداخت و دعوت‌نامه
              گروه پشتیبانی ظرف یک ساعت روز کاری ارسال می‌شود.
            </p>
            <div className="mt-3 flex gap-2">
              <Button variant="soft" size="sm" onClick={() => setOpen(false)}>بستن</Button>
            </div>
          </div>
        )}
      </Dialog>
    </>
  );
}
