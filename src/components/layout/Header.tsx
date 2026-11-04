"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { buildPhoneUrl } from "@/lib/utils";
import { trackCallClick } from "@/lib/analytics";

interface HeaderProps {
  locale: string;
  phone?: string;
  phoneDisplay?: string;
}

export function Header({
  locale,
  phone = "+966508805861",
  phoneDisplay = "050 880 5861",
}: HeaderProps) {
  const isAr = locale === "ar";
  const pathname = usePathname() || "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = isAr
    ? [
        { label: "الرئيسية", href: `/${locale}` },
        { label: "خدمات المقاولات", href: `/${locale}/services` },
        { label: "توريد الطبالي", href: `/${locale}/other-sectors` },
        { label: "تركيب المصانع", href: `/${locale}/projects/factory-equipment-installation` },
        { label: "المشاريع", href: `/${locale}/projects` },
        { label: "من نحن", href: `/${locale}/about` },
        { label: "طلب تسعير", href: `/${locale}/contact` },
      ]
    : [
        { label: "Home", href: `/${locale}` },
        { label: "Contracting", href: `/${locale}/services` },
        { label: "Pallets Supply", href: `/${locale}/other-sectors` },
        { label: "Factory Installation", href: `/${locale}/projects/factory-equipment-installation` },
        { label: "Projects", href: `/${locale}/projects` },
        { label: "About", href: `/${locale}/about` },
        { label: "B2B Quote", href: `/${locale}/contact` },
      ];

  const phoneUrl = buildPhoneUrl(phone);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#070d18]/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-b border-sky-400/20"
          : "bg-[#070d18]/80 backdrop-blur-sm border-b border-sky-400/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Logo with Royana Tech cyan drop shadow */}
          <Link
            href={`/${locale}`}
            className="flex items-center focus:outline-none focus:ring-2 focus:ring-[#00d2ff] rounded-lg p-0.5 group"
            aria-label={isAr ? "رؤيانا الحديثة للمقاولات - الصفحة الرئيسية" : "Royana Modern Contracting - Home"}
          >
            <div className="relative h-11 sm:h-14 w-36 sm:w-48 aspect-[3.12/1] transition-transform group-hover:scale-102 drop-shadow-[0_0_12px_rgba(0,210,255,0.25)]">
              <Image
                src="/images/logo-white.webp"
                alt="شعار مؤسسة رؤيانا الحديثة للمقاولات"
                fill
                priority
                className="object-contain object-right"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={isAr ? "التنقل الرئيسي" : "Main Navigation"}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === `/${locale}`
                  ? pathname === `/${locale}`
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-full transition-all relative ${
                    isActive
                      ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                      : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & CTA (Desktop) */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={phoneUrl}
              onClick={() => trackCallClick(phone)}
              className="flex items-center gap-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-[#00d2ff] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-[#0d1728] border border-sky-400/20 flex items-center justify-center text-[#00d2ff] shadow-sm">
                <Phone className="w-4 h-4" />
              </span>
              <span dir="ltr">{phoneDisplay}</span>
            </a>

            <LanguageSwitcher currentLocale={locale} />

            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="sm"
            >
              {isAr ? "اطلب عرض سعر" : "Get a Quote"}
            </Button>
          </div>

          {/* Clean Mobile Controls (Quick Call + Circular Language Icon + Hamburger Menu) */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher currentLocale={locale} variant="circular" />

            <a
              href={phoneUrl}
              onClick={() => trackCallClick(phone)}
              className="w-9 h-9 rounded-full bg-[#0d1728] flex items-center justify-center text-[#00d2ff] border border-sky-400/20 hover:border-[#00d2ff] hover:scale-105 active:scale-95 transition-all shadow-sm"
              aria-label={isAr ? "اتصال هاتفي مباشر" : "Direct Phone Call"}
              title={phoneDisplay}
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة الرئيسية"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] focus:outline-none focus:ring-2 focus:ring-[#00d2ff]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#00d2ff]" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-400/20 bg-[#070d18]/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav
            aria-label={isAr ? "قائمة الجوال" : "Mobile Menu"}
            className="px-4 pt-3 pb-6 space-y-1.5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-sky-400/15 space-y-3">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs text-slate-400 font-semibold">
                  {isAr ? "لغة الموقع:" : "Language:"}
                </span>
                <LanguageSwitcher currentLocale={locale} />
              </div>

              <a
                href={phoneUrl}
                onClick={() => trackCallClick(phone)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#0d1728] border border-sky-400/20 text-white font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-[#00d2ff]" />
                <span dir="ltr">{phoneDisplay}</span>
              </a>

              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="md"
                className="w-full"
              >
                {isAr ? "اطلب عرض سعر الآن" : "Request a Quote Now"}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
