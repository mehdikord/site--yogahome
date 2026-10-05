# خانه یوگا و ماساژ قائمشهر — Yoga Home

A premium, image-driven, fully RTL Persian multi-page website for a wellness & lifestyle brand:
**یوگا · ماساژ · پاکسازی و مراقبت از پوست · مدیتیشن · دوره‌های آموزشی · فروشگاه محصولات آرامش**.

> The whole experience is front-end only: static/mock data, no database, no auth, no payment gateway, no API.
> Cart, wishlist, filters, enrollment and the contact form are all polished *mock* interactions.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 16.3.8** (App Router, Turbopack, server rendering — *not* `next export`) |
| UI | **React 19.3**, **TypeScript 5.9** (strict) |
| Styling | **Tailwind CSS 4.3** (`@theme` design tokens, no config file needed) |
| Components | **shadcn/ui-style primitives** built on Radix UI (`accordion`, `tabs`, `dialog`, `label`, `slot`) + `cva` |
| Motion | small in-house “React Bits-style” primitives (`Reveal`, `TextReveal`, `Parallax`, `KenBurns`, `Marquee`, `Spotlight`, `Tilt`, `CountUp`, `OrganicBackdrop`) |
| Type | **Vazirmatn** (variable, self-hosted in `public/fonts`) + Cormorant Garamond for Latin accents |
| Icons | inline SVG (no icon library weight) |

## Run it

```bash
npm install
npm run build      # production build (server-rendered, 50+ routes)
npm start          # next start on 0.0.0.0:3000
```

Dev mode: `npm run dev`. Type check only: `npm run typecheck`.

The public domain lives in one place — `src/data/site.ts → site.origin` — and feeds `metadataBase`, `robots.txt` and `sitemap.xml`.

Content/QC helpers used by this repo (they are part of the workflow, all pass):

```bash
python3 scripts/qc.py            # stray scripts / latin leakage inside Persian copy
python3 scripts/fa-digits.py src/data   # latin digits -> persian digits in display strings
python3 scripts/check-images.py  # every /img reference resolves, reports unused assets
```

## Rendering

Everything is server-rendered by `next start`: article/service/course/product pages are static (SSG, `generateStaticParams`),
while `/courses` and `/shop` are dynamic (`ƒ`) because they read `?category=` / `?wishlist=1` on the server — so listing pages,
deep-linked filters and shareable URLs work before any JavaScript runs. Cart, wishlist and enrollment state live in
`localStorage` under one mock key (`yogahome.mock.v1`).

## Pages

| Route | What’s inside |
| --- | --- |
| `/` | Cinematic hero (parallax + ken-burns + word reveal), intro, services, featured courses, shop, why-us, testimonial carousel, journal, Instagram wall, final CTA |
| `/services`, `/services/[slug]` | 4 services (یوگا، ماساژ، مراقبت پوست، مدیتیشن) with hero, intro, benefits, audience, step-by-step session, pricing, weekly schedule, related services and a non-medical disclaimer |
| `/courses`, `/courses/[slug]` | 10 courses, mock filters (category, level, format, price band, duration) + sorting (popular/newest/rating/price), detail page with tabs: description, curriculum (module → lesson rows), reviews, FAQ, sticky enrollment card, mock enrollment dialog |
| `/shop`, `/shop/[slug]` | 14 products, search, category & availability filters, price slider, sorting, mobile filter drawer, gallery, specs, usage, reviews, related items; mock cart drawer with coupon (`YOGAHOME10`), qty steppers, free-shipping progress and a 3-step mock checkout |
| `/blog`, `/blog/[slug]` | Editorial listing with featured post, category chips, search, load-more; article pages with reading progress, rich block renderer (paragraph/heading/quote/list/steps/note/figure), TOC rail, CTA to the matching course/service |
| `/about` | Story, mission & vision, 6 values, achievements, 6-stop visual timeline, team (5 instructors), studio experience, philosophy band |
| `/contact` | Validated mock form (نام، شماره تماس، موضوع، خدمت موردنظر، توضیحات) with success/error states, phone/mobile/email/address/hours, social links, schematic map placeholder, FAQ |
| `/legal`, 404 | Legal placeholders, robots.txt, sitemap.xml, branded not-found page |

## Design language

* **Palette** — deep sage `#2f4a3b` · moss · soft olive `#7d8d61` · warm sand `#e6d8c2` · cream `#faf7f1` · muted clay `#b3674a` · charcoal ink `#22251e`
* Organic shapes, oversized radii, layered soft shadows, film-grain overlays on photography, hairline borders, generous whitespace.
* Motion is intentionally calm: opacity/transform only, IntersectionObserver + `requestAnimationFrame`, and a global `prefers-reduced-motion` kill-switch.
* Numbers, prices and dates are formatted with Persian digits and the Jalali calendar (`Intl` `fa-IR`), and prices are in تومان.

## Structure

```
src/
  app/            # routes: (home) services/ courses/ shop/ blog/ about/ contact/ legal/ + layout, globals.css
  components/
    ui/           # shadcn-style primitives: button, card, field controls, overlays (accordion/tabs/dialog/sheet), rating, media, section
    bits/         # motion primitives (motion.tsx)
    layout/       # navbar (sticky + mega panel + mobile sheet + ⌘K search), footer, page-hero, logo
    commerce/     # cart-context (localStorage mock), cart-drawer, add-to-cart / wishlist buttons
    course/ shop/ blog/ forms/   # per-domain client islands (filters, gallery, enroll dialog, contact form)
    cards.tsx     # service / course / product / article / testimonial / instructor cards
  data/           # services, courses, products, articles, testimonials, about/team, site config
  lib/            # cn, Persian normalisation & matching, Jalali/price formatters
public/
  img/            # 32 studio-shot style images (hero, services, products, team, detail crops)
  fonts/          # self-hosted Vazirmatn variable + Cormorant statics
scripts/          # qc.py, fa-digits.py, check-images.py
```

## Deliberate limits (by spec)

* Enrollment, cart and checkout never call a backend — they resolve locally with mock copy and “نمایشی” labels.
* No medical/therapeutic claims: service pages carry an explicit non-clinical disclaimer.
* Everything is static content; swapping `src/data/*` for a CMS later is the intended upgrade path.
