import React from "react";
import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmartAssistantWidget } from "@/components/conversion/SmartAssistantWidget";
import { MobileBottomBar } from "@/components/conversion/MobileBottomBar";
import { CookieConsent } from "@/components/conversion/CookieConsent";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { LocalBusinessSchema } from "@/components/seo/SchemaScripts";
import { getSiteSettings } from "@/lib/content";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateStaticParams() {
  return [{ locale: "ar" }, { locale: "en" }];
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const siteTitle = isAr
    ? "مؤسسة رؤيانا الحديثة للمقاولات | جدة"
    : "Royana Modern Contracting Establishment | Jeddah";

  const siteDescription = isAr
    ? "مقاولات عامة وترميم إنشائي معتمد بالكود السعودي، تجهيز وتركيب خطوط إنتاج المصانع، وتوريد وتصنيع الطبالي الخشبية والبلاستيكية والمعدنية بجدة."
    : "Certified general contracting, villa restoration per Saudi Building Code, turnkey factory machinery rigging, and industrial pallets manufacturing in Jeddah.";

  const shareImageUrl = "https://royana.com.sa/images/og-share.jpg";

  return {
    metadataBase: new URL("https://royana.com.sa"),
    title: {
      default: siteTitle,
      template: isAr ? "%s | رؤيانا للمقاولات" : "%s | Royana Contracting",
    },
    description: siteDescription,
    alternates: {
      canonical: `https://royana.com.sa/${locale}`,
      languages: {
        ar: "https://royana.com.sa/ar",
        en: "https://royana.com.sa/en",
      },
    },
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: `https://royana.com.sa/${locale}`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات" : "Royana Contracting",
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: siteTitle,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDescription,
      images: [shareImageUrl],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const settings = getSiteSettings();

  return (
    <html
      lang={locale}
      dir={isAr ? "rtl" : "ltr"}
      className={`${cairo.variable} ${plusJakarta.variable}`}
    >
      <head>
        <LocalBusinessSchema locale={locale} />
      </head>
      <body className={isAr ? "font-arabic" : "font-sans"}>
        <SplashScreen />
        <Header
          locale={locale}
          phone={settings.contact.phone}
          phoneDisplay={settings.contact.phone_display}
        />
        <main className="min-h-screen">{children}</main>
        <Footer locale={locale} />

        {/* Intelligent Multi-Manager Assistant & WhatsApp Widget */}
        <SmartAssistantWidget locale={locale} />
        
        <MobileBottomBar
          locale={locale}
          phone={settings.contact.phone}
          whatsapp={settings.contact.whatsapp}
        />
        <CookieConsent locale={locale} />
      </body>
    </html>
  );
}
