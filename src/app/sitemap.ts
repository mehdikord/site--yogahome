import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { courses } from "@/data/courses";
import { products } from "@/data/products";
import { articles } from "@/data/articles";
import { site } from "@/data/site";

const BASE = site.origin;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const statics = [
    "", "/services", "/courses", "/shop", "/blog", "/about", "/contact", "/legal",
  ].map((path) => ({ url: `${BASE}${path || "/"}`, lastModified: now, changeFrequency: "weekly" as const, priority: path ? 0.8 : 1 }));

  const dyn = [
    ...services.map((s) => ({ url: `${BASE}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...courses.map((c) => ({ url: `${BASE}/courses/${c.slug}`, lastModified: new Date(c.releasedAt), changeFrequency: "monthly" as const, priority: 0.9 })),
    ...products.map((p) => ({ url: `${BASE}/shop/${p.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...articles.map((a) => ({ url: `${BASE}/blog/${a.slug}`, lastModified: new Date(a.date), changeFrequency: "yearly" as const, priority: 0.5 })),
  ];

  return [...statics, ...dyn];
}
