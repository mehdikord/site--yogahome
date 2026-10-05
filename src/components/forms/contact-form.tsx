"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/card";
import { services } from "@/data/services";
import { cn } from "@/lib/utils";

type Values = {
  name: string;
  phone: string;
  subject: string;
  service: string;
  message: string;
};

const empty: Values = { name: "", phone: "", subject: "", service: "", message: "" };

export function ContactForm() {
  const [values, setValues] = React.useState<Values>(empty);
  const [errors, setErrors] = React.useState<Partial<Record<keyof Values, string>>>({});
  const [state, setState] = React.useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (key: keyof Values) => (v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 3) next.name = "نام و نام خانوادگی را کامل بنویسید.";
    const phone = values.phone.replace(/[\s-()]/g, "");
    if (!/^(09|0\d{2})\d{7,9}$/.test(phone)) next.phone = "شماره تماس معتبر نیست؛ مثال: ۰۹۱۲۳۴۵۶۷۸۹";
    if (values.subject.trim().length < 3) next.subject = "موضوع را کوتاه مشخص کنید.";
    if (!values.service) next.service = "یک خدمت را انتخاب کنید.";
    if (values.message.trim().length < 15) next.message = "چند خط بیشتر بنویسید تا بهتر راهنمایی‌تان کنیم.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setState("failed");
      return;
    }
    setState("sending");
    // mock request — nothing leaves the browser
    window.setTimeout(() => {
      const ok = values.message.trim().toLowerCase() !== "error";
      setState(ok ? "sent" : "failed");
      if (ok) setValues(empty);
    }, 900);
  };

  if (state === "sent") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-[1.5rem] bg-sage/[.07] px-6 py-14 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-sage/12 text-sage">
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
            <path d="M4 13l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="text-[1.1rem] font-semibold text-ink">پیام شما ثبت شد</p>
        <p className="max-w-md text-[0.9rem] leading-[2] text-ink-soft">
          در نسخه واقعی، کارشناس پذیرش در ساعات کاری با شما تماس می‌گیرد و زمان جلسه را نهایی می‌کند. در این نسخه نمایشی،
          هیچ اطلاعاتی جایی ارسال یا ذخیره نمی‌شود.
        </p>
        <Button variant="soft" onClick={() => setState("idle")}>ارسال پیام دیگر</Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="نام و نام خانوادگی" required error={errors.name} id="name">
          <Input id="name" value={values.name} onChange={(e) => set("name")(e.target.value)} placeholder="مثلاً مریم احمدی" autoComplete="name" />
        </Field>
        <Field label="شماره تماس" required error={errors.phone} id="phone" hint="بدون پیش‌شماره، مثل ۰۹۲۳۴۶۷۸">
          <Input id="phone" value={values.phone} onChange={(e) => set("phone")(e.target.value)} placeholder="0912 345 6789" dir="ltr" inputMode="tel" autoComplete="tel" />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="موضوع" required error={errors.subject} id="subject">
          <Input id="subject" value={values.subject} onChange={(e) => set("subject")(e.target.value)} placeholder="رزرو کلاس صبح" />
        </Field>
        <Field label="خدمت موردنظر" required error={errors.service} id="service">
          <Select id="service" value={values.service} onChange={(e) => set("service")(e.target.value)}>
            <option value="">انتخاب کنید…</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
            <option value="courses">دوره‌ها و آموزش</option>
            <option value="shop">محصولات فروشگاه</option>
            <option value="other">مورد دیگر</option>
          </Select>
        </Field>
      </div>

      <Field label="توضیحات" required error={errors.message} id="message" hint="سابقه تمرین، محدودیت جسمی، زمانی که ترجیح می‌دهید — هرچه بیشتر، بهتر.">
        <Textarea
          id="message"
          value={values.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder="مثلاً: سه ماه است یوگا کار نکرده‌ام و می‌خواهم با کلاس آرام شروع کنم. عصرها بهتر است."
          rows={5}
        />
      </Field>

      <div
        className={cn(
          "flex items-start gap-3 rounded-2xl px-4 py-3 text-[0.84rem] leading-relaxed transition-all duration-300",
          state === "failed" ? "bg-clay/10 text-clay" : "bg-shell/70 text-ink-soft",
        )}
        role={state === "failed" ? "alert" : undefined}
      >
        <svg viewBox="0 0 24 24" className={cn("mt-0.5 size-4 shrink-0", state === "failed" ? "text-clay" : "text-olive")} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
        </svg>
        <span>
          {state === "failed"
            ? "ارسال انجام نشد. فیلدهای مشخص‌شده را بررسی کنید و دوباره امتحان کنید."
            : "این یک فرم نمایشی است: هیچ داده‌ای به سروری ارسال نمی‌شود و پایگاه‌داده‌ای وجود ندارد."}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "sending"}>
          {state === "sending" ? (
            <>
              <svg viewBox="0 0 24 24" className="size-4 animate-spin" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
              </svg>
              در حال ارسال…
            </>
          ) : (
            "ارسال درخواست"
          )}
        </Button>
        <Button type="button" variant="ghost" onClick={() => { setValues(empty); setErrors({}); setState("idle"); }}>
          پاک کردن فرم
        </Button>
      </div>
    </form>
  );
}
