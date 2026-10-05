"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

/* ---------------------------------- Accordion --------------------------------- */

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({
  value,
  title,
  meta,
  children,
  className,
}: {
  value: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <AccordionPrimitive.Item
      value={value}
      className={cn(
        "group/acc overflow-hidden rounded-2xl border border-ink/8 bg-white/60 transition-colors duration-300 data-[state=open]:border-ink/15 data-[state=open]:bg-white",
        className,
      )}
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="flex w-full items-center gap-4 p-4 text-start sm:p-5">
          <span className="flex-1 text-[0.98rem] font-medium text-ink">{title}</span>
          {meta ? <span className="hidden text-[0.8rem] text-ink-faint sm:block">{meta}</span> : null}
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-sand/60 text-ink-soft transition-all duration-500 group-hover/acc:bg-sand">
            <svg viewBox="0 0 24 24" className="size-3.5 transition-transform duration-500 group-data-[state=open]/acc:rotate-45" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden data-[state=closed]:animate-[accordion-up_.32s_ease] data-[state=open]:animate-[accordion-down_.36s_cubic-bezier(.22,1,.36,1)]">
        <div className="px-4 pb-5 text-[0.9rem] leading-[2] text-ink-soft sm:px-5">{children}</div>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  );
}

/* ------------------------------------ Tabs ------------------------------------ */

export function Tabs({ defaultValue, items, className }: {
  defaultValue: string;
  className?: string;
  items: { value: string; label: string; content: React.ReactNode }[];
}) {
  return (
    <TabsPrimitive.Root defaultValue={defaultValue} className={cn("flex flex-col gap-6", className)}>
      <TabsPrimitive.List
        className="scrollbar-none flex w-full gap-1.5 overflow-x-auto rounded-full bg-shell/80 p-1.5"
        aria-label="بخش‌های صفحه"
      >
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              "shrink-0 rounded-full px-4 py-2.5 text-[0.86rem] font-medium text-ink-soft transition-all duration-300",
              "data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-[var(--shadow-soft)]",
              "hover:text-ink",
            )}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value} className="animate-[fade-up_.45s_ease-out]">
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}

/* ----------------------------------- Dialog ----------------------------------- */

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  contentClassName,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[70] bg-sage-900/45 backdrop-blur-[3px] data-[state=closed]:animate-[fade-out_.25s_ease] data-[state=open]:animate-[fade-in_.3s_ease]",
            className,
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[80] w-[min(34rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] bg-cream shadow-[var(--shadow-lift)] outline-none data-[state=closed]:animate-[pop-out_.2s_ease] data-[state=open]:animate-[pop-in_.4s_cubic-bezier(.22,1,.36,1)]",
            contentClassName,
          )}
        >
          <div className="flex items-start gap-4 border-b border-ink/8 px-6 py-5">
            <div className="flex-1">
              <DialogPrimitive.Title className="text-[1.05rem] font-semibold text-ink">{title}</DialogPrimitive.Title>
              {description ? (
                <DialogPrimitive.Description className="mt-1 text-[0.84rem] leading-relaxed text-ink-soft">
                  {description}
                </DialogPrimitive.Description>
              ) : null}
            </div>
            <DialogPrimitive.Close
              aria-label="بستن"
              className="grid size-9 place-items-center rounded-full bg-ink/[.05] text-ink-soft transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

/** side sheet — used for the mobile menu, cart and filter drawer */
export function Sheet({
  open,
  onOpenChange,
  title,
  children,
  footer,
  side = "end",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  side?: "end" | "start" | "bottom";
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-sage-900/50 backdrop-blur-[2px] data-[state=closed]:animate-[fade-out_.28s_ease] data-[state=open]:animate-[fade-in_.32s_ease]" />
        <DialogPrimitive.Content
          className={cn(
            "fixed z-[80] flex flex-col bg-cream shadow-[var(--shadow-lift)] outline-none",
            side === "end" &&
              "inset-y-0 end-0 h-full w-[min(27rem,100vw)] data-[state=closed]:animate-[sheet-end-out_.3s_ease] data-[state=open]:animate-[sheet-end-in_.42s_cubic-bezier(.22,1,.36,1)]",
            side === "start" &&
              "inset-y-0 start-0 h-full w-[min(27rem,100vw)] data-[state=closed]:animate-[sheet-start-out_.3s_ease] data-[state=open]:animate-[sheet-start-in_.42s_cubic-bezier(.22,1,.36,1)]",
            side === "bottom" &&
              "inset-x-0 bottom-0 max-h-[88vh] rounded-t-[1.9rem] data-[state=closed]:animate-[sheet-bottom-out_.28s_ease] data-[state=open]:animate-[sheet-bottom-in_.42s_cubic-bezier(.22,1,.36,1)]",
          )}
        >
          <div className="flex items-center gap-4 border-b border-ink/8 px-5 py-4">
            <DialogPrimitive.Title className="flex-1 text-[1rem] font-semibold text-ink">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="بستن"
              className="grid size-9 place-items-center rounded-full bg-ink/[.05] text-ink-soft transition-colors hover:bg-ink/10 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </DialogPrimitive.Close>
          </div>
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
          {footer ? <div className="border-t border-ink/8 bg-shell/50 px-5 py-4">{footer}</div> : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
