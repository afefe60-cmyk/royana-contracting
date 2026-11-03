"use client";

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export function hasCookieConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("royana_cookie_consent") === "accepted";
  } catch {
    return false;
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === "undefined") return;
  if (!hasCookieConsent()) {
    return;
  }
  if (window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export function trackWhatsAppClick(page: string) {
  trackEvent("whatsapp_click", {
    page_location: page,
    contact_method: "whatsapp",
  });
}

export function trackCallClick(phone: string) {
  trackEvent("phone_call_click", {
    phone_number: phone,
    contact_method: "phone",
  });
}

export function trackQuoteSubmission(serviceType: string) {
  trackEvent("generate_lead", {
    service_type: serviceType,
    currency: "SAR",
  });
}
