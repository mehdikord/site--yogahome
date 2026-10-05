import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

const FA_TO_LA = Array.from({ length: 10 }, (_, i) => String.fromCharCode(0x06f0 + i)).join("");
const AR_TO_LA = Array.from({ length: 10 }, (_, i) => String.fromCharCode(0x0660 + i)).join("");

/** normalises persian text so search matching is forgiving about ی/ک، نیم‌فاصله و ارقام */
export function normalizeFa(input: string) {
  return input
    .replace(/[یى]/g, "ی")
    .replace(/[ك]/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/[۰-۹]/g, (d) => String(FA_TO_LA.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_TO_LA.indexOf(d)))
    .replace(/[«»().،\-_/]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function matches(query: string, ...fields: string[]) {
  const q = normalizeFa(query);
  if (!q) return true;
  const haystack = normalizeFa(fields.join(" "));
  return q.split(" ").every((token) => haystack.includes(token));
}

/** stable pseudo-random from a string — keeps mock data deterministic between renders */
export function hashOf(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
