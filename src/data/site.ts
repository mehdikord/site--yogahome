export const site = {
  name: "خانه یوگا و ماساژ قائمشهر",
  shortName: "خانه یوگا قائمشهر",
  latinName: "Yoga Home",
  tagline: "آرامش، تعادل و مراقبت از خود",
  claim:
    "مقصد آرامش شما در قلب قائم‌شهر؛ جایی برای تمرین، یادگیری، خرید و زندگی سالم‌تر.",
  /* دامنه واقعی را هنگام دیپلوی همین‌جا عوض کنید؛ همین یک جا کافی است. */
  origin: "https://yogahome.ir",
  city: "قائم‌شهر",
  province: "مازندران",
  founded: 1396,
  phone: "011 342 58 74",
  mobile: "0912 748 5560",
  whatsapp: "0912 748 5560",
  email: "hello@yogahome.ir",
  address: "قائم‌شهر، خیابان آزادی، کوچه یاس، پلاک ۱۲، ساختمان نور، طبقه دوم",
  addressShort: "قائم‌شهر، خیابان آزادی، پلاک ۱۲",
  postalCode: "47609-13215",
  hours: [
    { day: "شنبه تا چهارشنبه", time: "۷:۰۰ صبح تا ۲۱:۰۰" },
    { day: "پنجشنبه", time: "۸:۰۰ صبح تا ۲۰:۰۰" },
    { day: "جمعه", time: "۱۰:۰۰ صبح تا ۱۶:۰۰" },
  ],
  socials: [
    { label: "اینستاگرام", handle: "@yogahome.qaemshahr", href: "https://instagram.com", key: "instagram" },
    { label: "تلگرام", handle: "@yogahome_ir", href: "https://telegram.me", key: "telegram" },
    { label: "واتس‌اپ", handle: "۰۹۱۲ ۷۴۸ ۵۵۶۰", href: "https://wa.me", key: "whatsapp" },
    { label: "یوتیوب", handle: "Yoga Home Channel", href: "https://youtube.com", key: "youtube" },
  ],
  nav: [
    { label: "خانه", href: "/" },
    { label: "خدمات", href: "/services" },
    { label: "دوره‌ها", href: "/courses" },
    { label: "فروشگاه", href: "/shop" },
    { label: "مقالات", href: "/blog" },
    { label: "درباره ما", href: "/about" },
    { label: "تماس با ما", href: "/contact" },
  ],
} as const;

export const stats = [
  { value: 9, suffix: "+", label: "سال تجربه پیوسته" },
  { value: 2400, suffix: "+", label: "مراجعه‌کننده فعال" },
  { value: 38, suffix: "", label: "دوره و کارگاه آموزشی" },
  { value: 4.9, suffix: "", label: "میانگین رضایت از ۵" },
];

export const quickFacts = [
  "سالن تمرین با نور طبیعی و کفپوش چوبی",
  "گروه‌های حداکثر ۸ نفره",
  "مشاوره اولیه رایگان",
  "موسیقی و عطر ملایم در تمام جلسات",
];

export const legalLinks = [
  { label: "قوانین و مقررات", href: "/legal" },
  { label: "حریم خصوصی", href: "/legal" },
  { label: "شرایط مرجوعی", href: "/legal" },
  { label: "پرسش‌های متداول", href: "/contact" },
];
