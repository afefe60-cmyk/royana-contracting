import React from "react";
import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/conversion/FloatingWhatsApp";
import { MobileBottomBar } from "@/components/conversion/MobileBottomBar";
import { CookieConsent } from "@/components/conversion/CookieConsent";
import { LocalBusinessSchema } from "@/components/seo/SchemaScripts";
import { getSiteSettings } from "@/lib/content";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
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

  return {
    title: {
      default: isAr
        ? "مؤسسة رؤيانا الحديثة للمقاولات | جدة"
        : "Royana Modern Contracting Establishment | Jeddah",
      template: isAr ? "%s | رؤيانا للمقاولات" : "%s | Royana Contracting",
    },
    description: isAr
      ? "مؤسسة مقاولات عامة معتمدة بجدة متخصصة في أعمال الإنشاءات والبناء، الترميم والتشطيبات، شبكات الكهرباء والمياه، والإشراف الهندسي وفق كود البناء السعودي."
      : "Certified general contracting establishment in Jeddah specializing in construction, restoration, MEP infrastructure, and engineering supervision per Saudi Building Code.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}`,
      languages: {
        ar: "https://royana.com.sa/ar",
        en: "https://royana.com.sa/en",
      },
    },
    openGraph: {
      title: isAr
        ? "مؤسسة رؤيانا الحديثة للمقاولات | جدة"
        : "Royana Modern Contracting | Jeddah",
      description: isAr
        ? "نبني بثقة ونرمم بدقة: خدمات المقاولات والترميم والإشراف الهندسي بجدة."
        : "Precision engineering, construction, and restoration services across Jeddah.",
      url: `https://royana.com.sa/${locale}`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات" : "Royana Contracting",
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
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
      className={`${ibmArabic.variable} ${plusJakarta.variable}`}
    >
      <head>
        <LocalBusinessSchema locale={locale} />
      </head>
      <body className={isAr ? "font-arabic" : "font-sans"}>
        <Header
          locale={locale}
          phone={settings.contact.phone}
          phoneDisplay={settings.contact.phone_display}
        />
        <main className="min-h-screen">{children}</main>
        <Footer locale={locale} />

        {/* Global Conversion Enhancers */}
        <FloatingWhatsApp
          phone={settings.contact.whatsapp}
        />
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
