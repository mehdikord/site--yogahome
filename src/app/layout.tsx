import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/data/site";
import { CartProvider } from "@/components/commerce/cart-context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/commerce/cart-drawer";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: `${site.name} | ${site.latinName}`,
    template: `%s · ${site.latinName}`,
  },
  description: `${site.name} — ${site.tagline}. کلاس‌ها و دوره‌های یوگا و مدیتیشن، ماساژ، پاکسازی و مراقبت پوست، مقالات آموزشی و فروشگاه محصولات آرامش.`,
  keywords: ["یوگا قائمشهر", "ماساژ قائمشهر", "مدیتیشن", "پاکسازی صورت", "دوره یوگا", "فروشگاه یوگا", "Yoga Home"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: site.latinName,
    title: site.name,
    description: site.claim,
    images: [{ url: "/img/hero.jpg", width: 1408, height: 768, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.claim },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 9,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#18241d" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="antialiased">
      <body className="relative min-h-dvh overflow-x-clip bg-cream">
        {/* ambient page backdrop: very light organic wash, no images, no cost */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_-10%,rgba(167,181,145,.20),transparent_55%),radial-gradient(90%_60%_at_-10%_105%,rgba(230,216,194,.45),transparent_60%)]" />
        </div>

        <CartProvider>
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
