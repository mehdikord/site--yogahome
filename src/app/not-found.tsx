import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LotusMark } from "@/components/layout/logo";
import { site } from "@/data/site";

export default function NotFound() {
  return (
    <section className="noise relative isolate flex min-h-dvh items-center overflow-hidden bg-sage-900 py-28 text-cream">
      <div aria-hidden className="absolute inset-0">
        <Image src="/img/botanical.jpg" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-sage-900 via-sage-900/85 to-sage-900/60" />
      </div>

      <div className="container-x relative z-10">
        <div className="max-w-xl">
          <LotusMark className="size-14 text-sage-soft" />
          <p className="latin mt-8 text-[0.8rem] tracking-[.3em] text-cream/50">404 · out of breath</p>
          <h1 className="mt-4 text-[2.2rem] leading-tight font-semibold sm:text-[2.8rem]">این صفحه پیدا نشد</h1>
          <p className="mt-5 text-[1rem] leading-[2.1] text-cream/72">
            ممکن است نشانی را اشتباه نوشته باشید یا صفحه‌ای که دنبالش بودیم جابه‌جا شده باشد. یک نفس عمیق بکشید و از این‌جا
            ادامه دهید.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="clay">
              <Link href="/">بازگشت به خانه</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-cream ring-1 ring-inset ring-cream/25 hover:bg-cream/10 hover:text-cream">
              <Link href="/services">مشاهده خدمات</Link>
            </Button>
          </div>
          <p className="mt-8 text-[0.84rem] text-cream/50">
            یا با ما تماس بگیرید: <span dir="ltr">{site.mobile}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
