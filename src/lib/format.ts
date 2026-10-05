const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/** converts latin digits inside any string to persian digits */
export function faDigits(input: string | number) {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** 12500000 -> «۱۲٬۵۰۰٬۰۰۰» */
export function faNumber(input: number) {
  const grouped = Math.round(input)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "٬");
  return faDigits(grouped);
}

export function price(value: number) {
  return `${faNumber(value)} تومان`;
}

/** price in toman, compacted for tight UI: 12٬5 میلیون */
export function priceCompact(value: number) {
  if (value >= 100000) {
    const m = value / 1000000;
    return `${faDigits(m % 1 === 0 ? m.toFixed(0) : m.toFixed(1))} میلیون تومان`;
  }
  if (value >= 1000) return `${faNumber(Math.round(value / 1000))} هزار تومان`;
  return price(value);
}

export function faPercent(value: number) {
  return `${faDigits(value)}٪`;
}

const dateFmt = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const monthFmt = new Intl.DateTimeFormat("fa-IR", {
  calendar: "persian",
  year: "numeric",
  month: "long",
});

export function faDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function faMonth(iso: string) {
  return monthFmt.format(new Date(iso));
}

/** 95 -> «۱ ساعت و ۳۵ دقیقه» */
export function faMinutes(total: number) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h && m) return `${faDigits(h)} ساعت و ${faDigits(m)} دقیقه`;
  if (h) return `${faDigits(h)} ساعت${m ? ` و ${faDigits(m)} دقیقه` : ""}`;
  return `${faDigits(m)} دقیقه`;
}

export function faHours(hours: number) {
  const whole = Math.floor(hours);
  const half = Math.round((hours - whole) * 60);
  if (whole && half) return `${faDigits(whole)} ساعت و ${faDigits(half)} دقیقه`;
  if (whole) return `${faDigits(whole)} ساعت`;
  return `${faDigits(half)} دقیقه`;
}

/** 12800 -> «۱۲٫۸ هزار» — keeps big counters short and legible */
export function faCount(n: number) {
  if (n >= 1000000) return faDigits((Math.round((n / 1000000) * 10) / 10).toFixed(1)).replace(".", "٫") + " میلیون";
  if (n >= 1000) return faDigits((Math.round((n / 100) / 10) * 1).toFixed(1)).replace(".", "٫") + " هزار";
  return faDigits(n);
}

export function ratingLabel(value: number) {
  if (value >= 4.8) return "استثنایی";
  if (value >= 4.5) return "عالی";
  if (value >= 4) return "خیلی خوب";
  return "خوب";
}
