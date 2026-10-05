import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Single image primitive used everywhere.
 * `fill` keeps the layout stable (no CLS) and `sizes` keeps payload small on mobile.
 */
export function Media({
  src,
  alt,
  className,
  imgClassName,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  priority = false,
  overlay = "none",
  zoom = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  overlay?: "none" | "soft" | "bottom" | "dark";
  zoom?: boolean;
}) {
  return (
    <div className={cn("grain-frame relative overflow-hidden bg-shell", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", zoom && "img-zoom", imgClassName)}
      />
      {overlay === "soft" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/45 via-transparent to-transparent" aria-hidden />
      ) : null}
      {overlay === "bottom" ? (
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900/85 via-sage-900/25 to-transparent" aria-hidden />
      ) : null}
      {overlay === "dark" ? <div className="absolute inset-0 bg-sage-900/45" aria-hidden /> : null}
    </div>
  );
}

/** 1:1 / 4:3 aspect helper so cards never jump while images decode */
export function MediaFrame({
  ratio = "4 / 3",
  className,
  children,
}: {
  ratio?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden bg-shell", className)} style={{ aspectRatio: ratio }}>
      {children}
    </div>
  );
}
