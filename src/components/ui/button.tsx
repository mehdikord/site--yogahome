import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-out active:scale-[.985] disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-sage text-cream shadow-[0_10px_30px_-14px_rgba(24,36,29,.75)] hover:bg-sage-700",
        clay: "bg-clay text-cream hover:bg-[#9d583e]",
        soft: "bg-sand/70 text-ink hover:bg-sand",
        outline: "border border-ink/15 bg-transparent text-ink hover:border-ink/35 hover:bg-ink/[.04]",
        ghost: "text-ink-soft hover:text-ink hover:bg-ink/[.05]",
        link: "h-auto rounded-none p-0 text-sage underline-offset-8 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.82rem]",
        md: "h-11 px-6 text-[0.92rem]",
        lg: "h-[3.25rem] px-8 text-[0.98rem]",
        icon: "size-10 rounded-full",
        "icon-sm": "size-8 rounded-full",
      },
      motion: {
        none: "",
        magnetic: "will-change-transform",
      },
    },
    defaultVariants: { variant: "solid", size: "md", motion: "none" },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof button> & { asChild?: boolean };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, motion, asChild = false, ...props },
  ref,
) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} data-slot="button" className={cn(button({ variant, size, motion }), className)} {...props} />;
});

/** Arrow that points the correct way in RTL and nudges on hover */
export function ButtonArrow({ dir = "forward", className }: { dir?: "forward" | "back"; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-4 transition-transform duration-500 group-hover/btn:translate-x-[-3px]", className)}
      style={{ transform: dir === "back" ? "scaleX(-1)" : undefined }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
