"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ChevronDown,
  Building2,
  Boxes,
  Factory,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
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
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceCategories = [
    {
      title_ar: "المقاولات العامة والترميم",
      title_en: "General Contracting & Restoration",
      desc_ar: "إنشاءات، ترميم شامل، فحص وتدعيم الهياكل الإنشائية بجدة",
      desc_en: "Turnkey building construction, restoration & structural engineering",
      href: `/${locale}/services`,
      icon: Building2,
      badge_ar: "كود البناء السعودي",
      badge_en: "Saudi Code",
    },
    {
      title_ar: "توريد وتصنيع الطبالي",
      title_en: "Pallets Manufacturing & Supply",
      desc_ar: "طبالي خشبية معالجة (ISPM 15)، بلاستيكية (SFDA)، ومعدنية",
      desc_en: "Heat-treated wooden, hygienic plastic, and heavy-duty steel pallets",
      href: `/${locale}/other-sectors`,
      icon: Boxes,
      badge_ar: "كميات جملة للمستودعات",
      badge_en: "Wholesale & SLA",
    },
    {
      title_ar: "تركيب وتجهيز المصانع",
      title_en: "Factory Machinery & Rigging",
      desc_ar: "رفع الماكينات، صب القواعد الماصة للاهتزاز، ومحاذاة ليزرية",
      desc_en: "Heavy machinery hoisting, vibration foundations & laser alignment",
      href: `/${locale}/projects/factory-equipment-installation`,
      icon: Factory,
      badge_ar: "المدينة الصناعية (مدن)",
      badge_en: "MODON Ready",
    },
  ];

  const primaryNavLinks = isAr
    ? [
        { label: "الرئيسية", href: `/${locale}` },
        { label: "المشاريع", href: `/${locale}/projects` },
        { label: "من نحن", href: `/${locale}/about` },
        { label: "اتصل بنا", href: `/${locale}/contact` },
      ]
    : [
        { label: "Home", href: `/${locale}` },
        { label: "Projects", href: `/${locale}/projects` },
        { label: "About Us", href: `/${locale}/about` },
        { label: "Contact", href: `/${locale}/contact` },
      ];

  const phoneUrl = buildPhoneUrl(phone);

  const isServicesActive =
    pathname.includes("/services") ||
    pathname.includes("/other-sectors") ||
    pathname.includes("/factory-equipment-installation");

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#070d18]/92 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.55)] border-b border-sky-400/20"
          : "bg-[#070d18]/85 backdrop-blur-sm border-b border-sky-400/15"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Logo */}
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

          {/* Desktop Navigation - Concise, Spacious & Elegant */}
          <nav
            aria-label={isAr ? "التنقل الرئيسي" : "Main Navigation"}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
          >
            {/* Home Link */}
            <Link
              href={`/${locale}`}
              className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
                pathname === `/${locale}`
                  ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                  : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
              }`}
            >
              {isAr ? "الرئيسية" : "Home"}
            </Link>

            {/* Services Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                aria-expanded={servicesDropdownOpen}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
                  isServicesActive
                    ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                    : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
                }`}
              >
                <span>{isAr ? "خدماتنا وقطاعاتنا" : "Services & Sectors"}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180 text-[#00d2ff]" : "text-slate-400"
                  }`}
                />
              </button>

              {/* Dropdown Menu Card */}
              {servicesDropdownOpen && (
                <div className="absolute top-full start-0 mt-2 w-96 rounded-2xl bg-[#0b1322] border border-sky-400/25 shadow-[0_15px_40px_rgba(0,0,0,0.7)] backdrop-blur-xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="space-y-1">
                    {serviceCategories.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setServicesDropdownOpen(false)}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-sky-500/10 transition-colors group/item"
                        >
                          <div className="w-10 h-10 rounded-xl bg-[#121e34] border border-sky-400/20 flex items-center justify-center text-[#00d2ff] group-hover/item:border-[#00d2ff] group-hover/item:shadow-[0_0_12px_rgba(0,210,255,0.3)] transition-all flex-shrink-0">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                              <span className="text-sm font-bold text-white group-hover/item:text-[#00d2ff] transition-colors">
                                {isAr ? item.title_ar : item.title_en}
                              </span>
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/20">
                                {isAr ? item.badge_ar : item.badge_en}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-1">
                              {isAr ? item.desc_ar : item.desc_en}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Projects Link */}
            <Link
              href={`/${locale}/projects`}
              className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
                pathname.startsWith(`/${locale}/projects`) && !pathname.includes("factory-equipment-installation")
                  ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                  : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
              }`}
            >
              {isAr ? "المشاريع" : "Projects"}
            </Link>

            {/* About Link */}
            <Link
              href={`/${locale}/about`}
              className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
                pathname === `/${locale}/about`
                  ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                  : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
              }`}
            >
              {isAr ? "من نحن" : "About Us"}
            </Link>

            {/* Contact Link */}
            <Link
              href={`/${locale}/contact`}
              className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-all ${
                pathname === `/${locale}/contact`
                  ? "text-[#00d2ff] bg-sky-500/10 font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                  : "text-slate-300 hover:text-[#00d2ff] hover:bg-white/5"
              }`}
            >
              {isAr ? "اتصل بنا" : "Contact"}
            </Link>
          </nav>

          {/* Actions & CTA (Desktop) - Clean & Spaced */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4">
            <a
              href={phoneUrl}
              onClick={() => trackCallClick(phone)}
              className="flex items-center gap-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-[#00d2ff] transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-[#0d1728] border border-sky-400/20 flex items-center justify-center text-[#00d2ff] shadow-sm">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span dir="ltr">{phoneDisplay}</span>
            </a>

            <LanguageSwitcher currentLocale={locale} />

            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="sm"
              className="shadow-[0_0_20px_rgba(0,210,255,0.3)]"
            >
              {isAr ? "اطلب عرض سعر" : "Get a Quote"}
            </Button>
          </div>

          {/* Mobile Controls */}
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
            <Link
              href={`/${locale}`}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "الرئيسية" : "Home"}
            </Link>

            {/* Mobile Services Group */}
            <div className="py-2 px-1">
              <span className="block px-2 text-xs font-bold text-sky-400 uppercase tracking-wider mb-1.5">
                {isAr ? "الخدمات والقطاعات" : "Services & Sectors"}
              </span>
              <div className="space-y-1 bg-[#121e34]/50 rounded-2xl p-2 border border-sky-400/15">
                {serviceCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
                  >
                    <span>{isAr ? item.title_ar : item.title_en}</span>
                    {isAr ? (
                      <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={`/${locale}/projects`}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "المشاريع" : "Projects"}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "من نحن" : "About Us"}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="block px-3 py-2.5 rounded-xl text-base font-semibold text-slate-200 hover:bg-sky-500/10 hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "اتصل بنا" : "Contact"}
            </Link>

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
