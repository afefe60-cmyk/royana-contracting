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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = isAr
    ? [
        { label: "الرئيسية", href: `/${locale}` },
        { label: "خدماتنا", href: `/${locale}/services` },
        { label: "المشاريع", href: `/${locale}/projects` },
        { label: "قطاعات أخرى", href: `/${locale}/other-sectors` },
        { label: "من نحن", href: `/${locale}/about` },
        { label: "المدونة", href: `/${locale}/blog` },
        { label: "اتصل بنا", href: `/${locale}/contact` },
      ]
    : [
        { label: "Home", href: `/${locale}` },
        { label: "Services", href: `/${locale}/services` },
        { label: "Projects", href: `/${locale}/projects` },
        { label: "Other Sectors", href: `/${locale}/other-sectors` },
        { label: "About Us", href: `/${locale}/about` },
        { label: "Blog", href: `/${locale}/blog` },
        { label: "Contact", href: `/${locale}/contact` },
      ];

  const phoneUrl = buildPhoneUrl(phone);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200"
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#C68B59] rounded-lg p-1"
            aria-label={isAr ? "رؤيانا الحديثة للمقاولات - الصفحة الرئيسية" : "Royana Modern Contracting - Home"}
          >
            <div className="relative w-48 sm:w-56 h-14">
              <Image
                src="/images/logo.webp"
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
                  className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors ${
                    isActive
                      ? "text-[#C68B59] bg-[#0B192C]/5 font-bold"
                      : "text-slate-700 hover:text-[#0B192C] hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone direct link */}
            <a
              href={phoneUrl}
              onClick={() => trackCallClick(phone)}
              className="flex items-center gap-2 text-xs xl:text-sm font-bold text-slate-700 hover:text-[#C68B59] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[#C68B59]">
                <Phone className="w-4 h-4" />
              </span>
              <span dir="ltr">{phoneDisplay}</span>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Request Quote Button */}
            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="sm"
            >
              {isAr ? "اطلب عرض سعر" : "Get a Quote"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة الرئيسية"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#0B192C]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0B192C]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav
            aria-label={isAr ? "قائمة الجوال" : "Mobile Menu"}
            className="px-4 pt-3 pb-6 space-y-1.5"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-50 hover:text-[#C68B59]"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <a
                href={phoneUrl}
                onClick={() => trackCallClick(phone)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-slate-50 text-slate-900 font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-[#C68B59]" />
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
