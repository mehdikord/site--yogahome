"use client";

import * as React from "react";
import Image from "next/image";
import { Media } from "@/components/ui/media";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [index, setIndex] = React.useState(0);
  const single = images.length <= 1;

  return (
    <div className={cn("flex flex-col gap-4", single && "gap-0")}>
      <div className="grain-frame group relative aspect-square overflow-hidden rounded-[1.8rem] bg-shell">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${name} — نمای ${i + 1}`}
            fill
            sizes="(max-width:1024px) 92vw, 46vw"
            priority={i === 0}
            className={cn(
              "object-cover transition-all duration-700",
              i === index ? "scale-100 opacity-100" : "scale-[1.03] opacity-0",
            )}
          />
        ))}
        {!single ? (
          <>
            <GalleryNav side="prev" onClick={() => setIndex((v) => (v - 1 + images.length) % images.length)} />
            <GalleryNav side="next" onClick={() => setIndex((v) => (v + 1) % images.length)} />
          </>
        ) : null}
      </div>

      {!single ? (
        <div className="grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`نمایش تصویر ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl transition-all duration-300",
                i === index ? "ring-2 ring-sage ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100",
              )}
            >
              <Media src={src} alt="" sizes="120px" className="size-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function GalleryNav({ side, onClick }: { side: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "prev" ? "تصویر قبلی" : "تصویر بعدی"}
      className={cn(
        "absolute top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-cream/85 text-ink opacity-0 shadow-[var(--shadow-soft)] backdrop-blur transition-all duration-300 hover:bg-cream group-hover:opacity-100",
        side === "prev" ? "start-4" : "end-4",
      )}
    >
      <svg viewBox="0 0 24 24" className={cn("size-4", side === "next" && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M19 12H5" strokeLinecap="round" />
        <path d="M11 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** quantity stepper used on the product page */
export function QuantityPicker({ max, onChange }: { max: number; onChange: (v: number) => void }) {
  const [value, setValue] = React.useState(1);
  const set = (v: number) => {
    const next = Math.max(1, Math.min(max, v));
    setValue(next);
    onChange(next);
  };
  return (
    <div className="flex items-center gap-1 rounded-full border border-ink/12 bg-white/70 p-1.5">
      <button type="button" onClick={() => set(value + 1)} disabled={value >= max} aria-label="افزایش" className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-shell disabled:opacity-40">
        <svg viewBox="0 0 24 24" className="size-3.5" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
      </button>
      <span className="min-w-8 text-center text-[0.9rem] font-medium tabular-nums">
        {String(value).replace(/[0-9]/g, (d) => String.fromCharCode(0x06f0 + Number(d)))}
      </span>
      <button type="button" onClick={() => set(value - 1)} disabled={value <= 1} aria-label="کاهش" className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-shell disabled:opacity-40">
        <svg viewBox="0 0 24 24" className="size-3.5" stroke="currentColor" strokeWidth="2" fill="none" aria-hidden><path d="M5 12h14" strokeLinecap="round" /></svg>
      </button>
    </div>
  );
}
