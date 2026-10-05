export type Testimonial = {
  id: string;
  name: string;
  city: string;
  tone: "sage" | "clay" | "olive" | "sand";
  rating: number;
  text: string;
  context: { kind: "دوره" | "کلاس یوگا" | "ماساژ" | "مدیتیشن" | "محصول فروشگاه"; label: string; href: string };
  date: string;
  verified: boolean;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "مریم احمدی",
    city: "قائم‌شهر",
    tone: "sage",
    rating: 5,
    text: "سه بار بود که یوگا را شروع کردم و رها کردم. اینجا دلیلش را فهمیدم: گروه‌های کوچک و مربی‌ای که واقعاً نگاه می‌کند. بعد از دو ماه، خوابم عوض شد.",
    context: { kind: "دوره", label: "یوگا از صفر؛ دوره پایه ۸ هفته‌ای", href: "/courses/yoga-foundations-8" },
    date: "2026-09-18",
    verified: true,
  },
  {
    id: "t2",
    name: "حسین موسوی",
    city: "آمل",
    tone: "clay",
    rating: 5,
    text: "ماساژ بافت عمقی بعد از فصل سخت کار در کارگاه، چیزی بود که لازم داشتم. فشار را دقیق تنظیم کردند و توضیح دادند هر مرحله چه کاری انجام می‌شود.",
    context: { kind: "ماساژ", label: "ماساژ عمقی بافت · ۷۵ دقیقه", href: "/services/massage" },
    date: "2026-09-02",
    verified: true,
  },
  {
    id: "t3",
    name: "نگار رحیمی",
    city: "تنکابن",
    tone: "olive",
    rating: 5,
    text: "در دوره ماساژ سوئدی شرکت کردم. مهم‌ترین چیزی که گرفتم چیدمان بدن خودم بود؛ بعد از شش ماه کار، مچم درد نمی‌گیرد.",
    context: { kind: "دوره", label: "ماساژ سوئدی؛ تکنیک‌های آرامش", href: "/courses/swedish-relaxation" },
    date: "2026-08-21",
    verified: true,
  },
  {
    id: "t4",
    name: "سمانه قاسمی",
    city: "قائم‌شهر",
    tone: "sand",
    rating: 5,
    text: "جلسه مدیتیشن غروب را برای کنجکاوی آمدم و حالا عضو منظم هستم. سکوت اجباری نیست و مربی با کلمات ساده راهنمایی می‌کند.",
    context: { kind: "مدیتیشن", label: "جلسه گروهی مدیتیشن", href: "/services/meditation" },
    date: "2026-08-09",
    verified: true,
  },
  {
    id: "t5",
    name: "رویا عباسی",
    city: "بابل",
    tone: "clay",
    rating: 5,
    text: "پروتکل فیشیال را از صفر تا پایان یاد گرفتم و الان در سالن خودم اجرا می‌کنم. چک‌لیست چاپی هنوز روی میز کارم است.",
    context: { kind: "دوره", label: "پروتکل پاکسازی صورت", href: "/courses/facial-protocol-pro" },
    date: "2026-07-28",
    verified: true,
  },
  {
    id: "t6",
    name: "مهسا زارع",
    city: "ساری",
    tone: "sage",
    rating: 4,
    text: "مت چوب‌پنبه‌ای را از فروشگاه خریدم. دو ماه هر روز استفاده می‌کنم و هنوز لبه‌اش باز نشده. راهنمای نگهداری داخل جعبه نکته خوبی بود.",
    context: { kind: "محصول فروشگاه", label: "مت یوگا چوب‌پنبه و لاستیک طبیعی", href: "/shop/cork-yoga-mat" },
    date: "2026-07-12",
    verified: true,
  },
  {
    id: "t7",
    name: "پریسا نوری",
    city: "قائم‌شهر",
    tone: "olive",
    rating: 5,
    text: "کلاس وینیاسا عصر، تنها یک ساعتی است در روز که گوشی را نگاه نمی‌کنم. فضای سالن با نور طبیعی فرق زیادی دارد.",
    context: { kind: "کلاس یوگا", label: "وینیاसा · مقدماتی تا متوسط", href: "/services/yoga" },
    date: "2026-06-30",
    verified: true,
  },
  {
    id: "t8",
    name: "کاوه اسدی",
    city: "چالوس",
    tone: "sand",
    rating: 5,
    text: "بسته تمرین خانگی را برای همسرم خریدم؛ کیفیت ابزار همان چیزی است که در کلاس استفاده می‌کنند و دسترسی یک‌ماهه به دوره، ارزش خرید را بالا برد.",
    context: { kind: "محصول فروشگاه", label: "بسته تمرین خانگی", href: "/shop/home-practice-kit" },
    date: "2026-06-15",
    verified: false,
  },
  {
    id: "t9",
    name: "بهاره فتحی",
    city: "رامسر",
    tone: "sage",
    rating: 5,
    text: "کارگاه سنگ داغ، ایمنی را جدی گرفت. دمای سنگ، تست پوست و چیدمان را دقیق یاد گرفتم؛ همان چیزی که در دوره‌های دیگر کوتاه از آن رد می‌شدند.",
    context: { kind: "دوره", label: "بافت عمقی و سنگ داغ", href: "/courses/deep-tissue-and-hot-stone" },
    date: "2026-05-27",
    verified: true,
  },
  {
    id: "t10",
    name: "یاسر حق‌دوست",
    city: "تهران",
    tone: "clay",
    rating: 5,
    text: "قبلاً شب‌ها قرص گیاهی می‌خوردم. برنامه ۲۱ روزه تنفس و خواب، ساده بود و جواب داد. فایل‌های صوتی را آفلاین روی گوشی نگه داشته‌ام.",
    context: { kind: "دوره", label: "تنفس برای خواب؛ برنامه ۲۱ روزه", href: "/courses/breath-and-sleep" },
    date: "2026-05-10",
    verified: true,
  },
];

export const contextFilters = ["همه", "دوره‌ها", "کلاس یوگا", "ماساژ", "مدیتیشن", "محصول فروشگاه"] as const;

export const aggregate = {
  courses: 4.9,
  studio: 4.8,
  shop: 4.7,
  reviews: 1268,
};
