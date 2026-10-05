"use client";

import * as React from "react";
import { cn, clamp } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * Lightweight motion primitives (React Bits style, but calm).
 * All of them: IntersectionObserver / rAF based, reduced-motion aware,
 * no layout thrash and no third-party animation dependency.
 * ------------------------------------------------------------------ */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useInView<T extends HTMLElement>(rootMargin = "0px 0px -12% 0px") {
  const ref = React.useRef<T | null>(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/** scroll-triggered fade + rise */
export function Reveal({
  children,
  delay = 0,
  as,
  className,
  y = 26,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
  y?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const show = reduced || inView;
  return React.createElement(
    as ?? "div",
    {
      ref: ref as React.Ref<HTMLElement>,
      className,
      style: {
        opacity: show ? 1 : 0,
        transform: show ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
        transition: reduced
          ? undefined
          : `opacity .9s cubic-bezier(.22,1,.36,1) ${delay}ms, transform .9s cubic-bezier(.22,1,.36,1) ${delay}ms`,
        willChange: show ? undefined : "opacity, transform",
      },
    },
    children,
  );
}

/** staggered word reveal for headlines */
export function TextReveal({
  text,
  className,
  wordClassName,
  delay = 90,
  as: As = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const reduced = usePrefersReducedMotion();
  const words = text.split(" ");
  return (
    <As className={cn("inline-block", className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className={cn("inline-block", wordClassName)}
          style={
            reduced
              ? undefined
              : {
                  opacity: 0,
                  animation: `word-in .95s cubic-bezier(.22,1,.36,1) ${i * delay}ms both`,
                }
          }
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </As>
  );
}

/** mask-based line reveal for large display type */
export function LineMask({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const reduced = usePrefersReducedMotion();
  return (
    <span ref={ref} className={cn("block overflow-hidden", className)}>
      <span
        className="block"
        style={{
          transform: reduced || inView ? "translateY(0)" : "translateY(105%)",
          opacity: reduced || inView ? 1 : 0,
          transition: `transform 1.05s cubic-bezier(.22,1,.36,1) ${delay}ms, opacity .8s ease ${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}

/** scroll parallax on a single element (translate only) */
export function Parallax({
  children,
  strength = 46,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  React.useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${clamp(progress * -strength, -strength, strength).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, strength]);
  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** animated counters for stats */
export function CountUp({
  to,
  decimals = 0,
  suffix = "",
  duration = 1500,
  className,
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [value, setValue] = React.useState(0);
  const reduced = usePrefersReducedMotion();
  React.useEffect(() => {
    if (!inView || reduced) {
      if (reduced) setValue(to);
      return;
    }
    let raf = 0;
    const startedAt = performance.now();
    const tick = (now: number) => {
      const p = clamp((now - startedAt) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduced]);

  const digits = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  const shown = decimals ? value.toFixed(decimals).replace(".", "٫") : digits;
  return (
    <span ref={ref} className={className}>
      {shown.split("").map((d) => ("0123456789".includes(d) ? String.fromCharCode(0x06f0 + Number(d)) : d)).join("")}
      {suffix}
    </span>
  );
}

/** subtle pointer-following highlight for cards & panels */
export function Spotlight({
  children,
  className,
  intensity = 0.16,
  color = "250 247 241",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  color?: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      onPointerMove={
        reduced
          ? undefined
          : (e) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
              el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
            }
      }
      className={cn("group/spot relative isolate", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(340px circle at var(--spot-x,50%) var(--spot-y,50%), rgba(${color} / ${intensity}), transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}

/** 3D tilt, kept very shallow so it reads as premium, not gimmicky */
export function Tilt({
  children,
  className,
  max = 4,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  return (
    <div
      ref={ref}
      className={cn("[transform-style:preserve-3d] transition-transform duration-500 ease-out", className)}
      onPointerMove={
        reduced
          ? undefined
          : (e) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const x = (e.clientX - r.left) / r.width - 0.5;
              const y = (e.clientY - r.top) / r.height - 0.5;
              el.style.transform = `perspective(1200px) rotateY(${x * max * 2}deg) rotateX(${-y * max * 2}deg) translateZ(0)`;
            }
      }
      onPointerLeave={() => {
        if (ref.current) ref.current.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
      }}
    >
      {children}
    </div>
  );
}

/** infinite organic marquee band */
export function Marquee({
  items,
  className,
  duration = 46,
  reverse = false,
}: {
  items: React.ReactNode[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div className={cn("group/marquee relative flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center gap-10 group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/** breathing organic blobs used behind hero + CTA panels */
export function OrganicBackdrop({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const reduced = usePrefersReducedMotion();
  const blobs = tone === "dark"
    ? ["rgba(167,181,145,.16)", "rgba(179,103,74,.14)", "rgba(250,247,241,.06)"]
    : ["rgba(125,141,97,.16)", "rgba(230,216,194,.5)", "rgba(179,103,74,.08)"];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {blobs.map((color, i) => (
        <span
          key={i}
          className="absolute block rounded-full blur-[70px]"
          style={{
            background: color,
            inlineSize: `${34 + i * 16}rem`,
            blockSize: `${28 + i * 12}rem`,
            insetInlineStart: i === 0 ? "-6rem" : i === 1 ? "48%" : "8%",
            insetBlockStart: i === 0 ? "-10%" : i === 1 ? "38%" : "68%",
            animation: reduced ? undefined : `breathe ${11 + i * 3}s ease-in-out ${i * 1.4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** top reading progress for article pages */
export function ReadingProgress({ className }: { className?: string }) {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? clamp(h.scrollTop / max, 0, 1) : 0);
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
  return (
    <div className={cn("fixed inset-x-0 top-0 z-[60] h-[2px] bg-transparent", className)} aria-hidden>
      <div className="h-full origin-right bg-gradient-to-l from-olive via-moss to-clay transition-[width] duration-150" style={{ width: `${p * 100}%` }} />
    </div>
  );
}

/** gentle image ken-burns wrapper */
export function KenBurns({ src, alt, className, overlay = true }: { src: string; alt: string; className?: string; overlay?: boolean }) {
  const reduced = usePrefersReducedMotion();
  return (
    <div className={cn("grain-frame relative overflow-hidden bg-shell", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        className={cn("size-full object-cover", !reduced && "animate-kenburns")}
      />
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/55 via-sage-900/10 to-transparent" aria-hidden />
      ) : null}
    </div>
  );
}
