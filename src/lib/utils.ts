import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number, locale: string = "ar"): string {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-US").format(num);
}

export function buildWhatsAppUrl(phone: string = "966508805861", message: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, "");
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function buildPhoneUrl(phone: string = "+966508805861"): string {
  const cleanPhone = phone.replace(/[^\d+]/g, "");
  return `tel:${cleanPhone}`;
}
