import React from "react";
import { ShieldCheck, MessageCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { BadgeItem } from "@/types";

interface HeroSectionProps {
  locale: string;
  badges?: BadgeItem[];
  whatsappPhone?: string;
}

export function HeroSection({
  locale,
  badges = [],
  whatsappPhone = "966508805861",
}: HeroSectionProps) {
  const isAr = locale === "ar";
  const visibleBadges = badges.filter((b) => b.visible);

  const whatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، أود الاستفسار عن خدمات مؤسسة رؤيانا الحديثة للمقاولات في جدة."
      : "Hello, I would like to inquire about Royana Contracting services in Jeddah."
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 sm:py-24 lg:py-28 border-b border-slate-200">
      {/* Subtle geometric engineering grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0B192C 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Verified Badges from site-settings (strictly conditional) */}
          {visibleBadges.length > 0 && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B192C]/5 border border-[#C68B59]/30 text-xs sm:text-sm font-semibold text-[#0B192C] mb-6">
              <ShieldCheck className="w-4 h-4 text-[#C68B59]" />
              <span>{isAr ? visibleBadges[0].text_ar : visibleBadges[0].text_en}</span>
            </div>
          )}

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B192C] tracking-tight leading-[1.2] sm:leading-[1.18] mb-6">
            {isAr ? (
              <>
                مقاولات عامة وترميم بجدة:{" "}
                <span className="text-[#C68B59]">دقة في التنفيذ</span>، والتزام
                بالمواصفات الهندسية
              </>
            ) : (
              <>
                General Contracting & Restoration in Jeddah:{" "}
                <span className="text-[#C68B59]">Engineered Precision</span> &
                Proven Reliability
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            {isAr
              ? "ننفذ مشاريع الإنشاءات والترميم الشامل، وتحديث شبكات الكهرباء والمياه، والإشراف الهندسي المتكامل للفلل والمنشآت بجدة وفق كود البناء السعودي وضمان رسمي موثق."
              : "Executing turnkey construction, comprehensive villa restoration, MEP utilities, and on-site engineering management across Jeddah in full alignment with the Saudi Building Code."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Quote Button: bronze background with navy text */}
            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>{isAr ? "اطلب عرض سعر الآن" : "Request a Quote Now"}</span>
              {isAr ? (
                <ArrowLeft className="w-5 h-5 text-[#0B192C]" />
              ) : (
                <ArrowRight className="w-5 h-5 text-[#0B192C]" />
              )}
            </Button>

            {/* WhatsApp Direct CTA */}
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5 fill-[#0B192C] text-[#0B192C]" />
              <span>{isAr ? "تواصل فوري عبر واتساب" : "Chat on WhatsApp"}</span>
            </Button>
          </div>

          {/* Localized trust note */}
          <p className="mt-5 text-xs text-slate-500">
            {isAr
              ? "معاينة ميدانية ورفع مساحي وإعداد مقايسة كميات (BOQ) دقيقة لمشروعك في جدة"
              : "On-site inspection, survey, and itemized BOQ preparation for your Jeddah project"}
          </p>
        </div>
      </div>
    </section>
  );
}
