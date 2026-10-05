import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, hover = false, ...props }: React.ComponentProps<"div"> & { hover?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "relative overflow-hidden rounded-[1.6rem] bg-white/70 shadow-[var(--shadow-inset),var(--shadow-soft)]",
        hover && "card-hover",
        className,
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-body" className={cn("p-5 sm:p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="card-title" className={cn("text-[1.05rem] leading-relaxed font-semibold", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="card-desc" className={cn("text-[0.9rem] leading-[1.95] text-ink-soft", className)} {...props} />;
}

export function Field({
  label,
  hint,
  error,
  required,
  className,
  children,
  id,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="flex items-center gap-1.5 text-[0.86rem] font-medium text-ink">
        {label}
        {required ? <span className="text-clay">*</span> : null}
      </label>
      {children}
      {error ? <p className="text-[0.78rem] text-clay">{error}</p> : hint ? <p className="text-[0.78rem] text-ink-faint">{hint}</p> : null}
    </div>
  );
}

const control =
  "w-full rounded-xl border border-ink/12 bg-cream/60 px-4 py-3 text-[0.92rem] text-ink transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-ink-faint/80 hover:border-ink/22 focus:border-moss/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-moss/12";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input data-slot="input" className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea data-slot="textarea" className={cn(control, "min-h-32 resize-y leading-[2]", className)} {...props} />;
}

export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(control, "h-12 cursor-pointer appearance-none bg-cream/60 pe-10 text-[0.88rem]", className)}
        {...props}
      >
        {children}
      </select>
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-3.5 my-auto size-4 text-ink-faint"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function Checkbox({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  count?: number;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5 text-[0.88rem] text-ink-soft transition-colors hover:text-ink">
      <span
        className={cn(
          "grid size-[1.15rem] shrink-0 place-items-center rounded-[0.42rem] border transition-all duration-300",
          checked ? "border-sage bg-sage text-cream" : "border-ink/20 bg-white group-hover:border-ink/40",
        )}
      >
        <svg viewBox="0 0 24 24" className={cn("size-3", checked ? "opacity-100" : "opacity-0")} fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
          <path d="M5 13l4 4 10-10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="flex-1">{label}</span>
      {typeof count === "number" ? <span className="text-[0.76rem] text-ink-faint">{count}</span> : null}
    </label>
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-3 py-1.5 text-[0.88rem] text-ink-soft"
    >
      <span>{label}</span>
      <span
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors duration-300",
          checked ? "bg-sage" : "bg-ink/15",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-4 rounded-full bg-white shadow transition-all duration-300",
            checked ? "end-1" : "end-6",
          )}
        />
      </span>
    </button>
  );
}
