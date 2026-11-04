import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { getSiteSettings, getServices, getLocalSeoPages } from "@/lib/content";
import { buildPhoneUrl } from "@/lib/utils";

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const isAr = locale === "ar";
  const settings = getSiteSettings();
  const services = getServices();
  const localSeoPages = getLocalSeoPages();

  const phoneUrl = buildPhoneUrl(settings.contact.phone);
  const phoneAltUrl = buildPhoneUrl(settings.contact.phone_alt);

  return (
    <footer className="bg-[#050912] text-slate-300 border-t border-sky-400/15 pt-14 pb-24 md:pb-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About & Identity */}
          <div className="space-y-4">
            <Link
              href={`/${locale}`}
              className="inline-block relative w-52 sm:w-60 h-14 drop-shadow-[0_0_12px_rgba(0,210,255,0.25)]"
              aria-label={isAr ? "رؤيانا للمقاولات" : "Royana Contracting"}
            >
              <Image
                src="/images/logo-white.webp"
                alt="مؤسسة رؤيانا الحديثة للمقاولات"
                fill
                className="object-contain object-right"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              {isAr
                ? "مؤسسة مقاولات عامة رائدة في جدة، متخصصة في أعمال الإنشاءات والبناء، الترميم والتشطيبات، وشبكات الكهرباء والمياه، والإشراف الهندسي المتكامل وفق كود البناء السعودي."
                : "A premier general contracting establishment in Jeddah specializing in construction, restoration, MEP infrastructure, and comprehensive engineering management."}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              {settings.social.linkedin && (
                <a
                  href={settings.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0d1728] border border-sky-400/20 flex items-center justify-center text-slate-300 hover:text-[#00d2ff] hover:border-[#00d2ff] hover:bg-sky-500/10 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {settings.social.x && (
                <a
                  href={settings.social.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0d1728] border border-sky-400/20 flex items-center justify-center text-slate-300 hover:text-[#00d2ff] hover:border-[#00d2ff] hover:bg-sky-500/10 transition-all"
                  aria-label="X (Twitter)"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {settings.social.instagram && (
                <a
                  href={settings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#0d1728] border border-sky-400/20 flex items-center justify-center text-slate-300 hover:text-[#00d2ff] hover:border-[#00d2ff] hover:bg-sky-500/10 transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Core Services */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 border-b border-sky-400/20 pb-2 inline-block">
              {isAr ? "خدماتنا الأساسية" : "Core Services"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {services.map((srv) => (
                <li key={srv.slug}>
                  <Link
                    href={`/${locale}/services/${srv.slug}`}
                    className="hover:text-[#00d2ff] transition-colors block py-0.5 text-slate-300"
                  >
                    {isAr ? srv.title_ar : srv.title_en}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={`/${locale}/other-sectors`}
                  className="hover:text-[#00d2ff] transition-colors block py-0.5 text-slate-400"
                >
                  {isAr ? "قطاعات أخرى (طبالي، مصانع، طاقة)" : "Other Sectors (Pallets, Solar, Factory)"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Local Services in Jeddah */}
          <div>
            <h3 className="text-white text-base font-bold mb-4 border-b border-sky-400/20 pb-2 inline-block">
              {isAr ? "خدمات المقاولات في جدة" : "Jeddah Contracting Services"}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {localSeoPages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${locale}/jeddah-contractor/${page.slug}`}
                    className="hover:text-[#00d2ff] transition-colors block py-0.5 text-slate-400"
                  >
                    {isAr ? page.meta_title_ar.split("|")[0].trim() : page.meta_title_en.split("|")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Location */}
          <div className="space-y-3.5 text-sm">
            <h3 className="text-white text-base font-bold mb-4 border-b border-sky-400/20 pb-2 inline-block">
              {isAr ? "بيانات التواصل" : "Contact Details"}
            </h3>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#00d2ff] flex-shrink-0 mt-0.5" />
              <span>
                {isAr
                  ? `${settings.address.city_ar}، ${settings.address.street_ar}`
                  : `${settings.address.city_en}, ${settings.address.street_en}`}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#00d2ff] flex-shrink-0" />
              <div className="flex flex-col">
                <a
                  href={phoneUrl}
                  className="hover:text-[#00d2ff] transition-colors"
                  dir="ltr"
                >
                  {settings.contact.phone_display}
                </a>
                <a
                  href={phoneAltUrl}
                  className="hover:text-[#00d2ff] transition-colors text-xs text-slate-400"
                  dir="ltr"
                >
                  {settings.contact.phone_alt_display}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#00d2ff] flex-shrink-0" />
              <a
                href={`mailto:${settings.contact.email}`}
                className="hover:text-[#00d2ff] transition-colors"
              >
                {settings.contact.email}
              </a>
            </div>

            <div className="flex items-start gap-3 text-xs text-slate-400 pt-1">
              <Clock className="w-4 h-4 text-[#00d2ff] flex-shrink-0 mt-0.5" />
              <div>
                <p>{isAr ? settings.working_hours.days_ar : settings.working_hours.days_en}</p>
                <p>{isAr ? settings.working_hours.time_ar : settings.working_hours.time_en}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-6 border-t border-sky-400/15 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            {isAr
              ? `جميع الحقوق محفوظة © ${new Date().getFullYear()} مؤسسة رؤيانا الحديثة للمقاولات.`
              : `All rights reserved © ${new Date().getFullYear()} Royana Modern Contracting.`}
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "سياسة الخصوصية (PDPL)" : "Privacy Policy (PDPL)"}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/terms`}
              className="hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "الشروط والأحكام" : "Terms & Conditions"}
            </Link>
            <span>•</span>
            <Link
              href={`/${locale}/contact`}
              className="hover:text-[#00d2ff] transition-colors"
            >
              {isAr ? "طلب عرض سعر" : "Request Quote"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
