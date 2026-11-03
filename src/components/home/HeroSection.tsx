import React from "react";
import { ShieldCheck, MessageCircle, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HeroVideoShowcase } from "@/components/home/HeroVideoShowcase";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B192C]/[0.03] via-white to-slate-50 py-16 sm:py-24 border-b border-slate-200">
      {/* Subtle geometric engineering grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #39B5FF 1px, transparent 1px),
            linear-gradient(to bottom, #0B192C 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Verified Badges with Brand Cyan highlight */}
          {visibleBadges.length > 0 && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B192C]/5 border border-[#39B5FF]/40 text-xs sm:text-sm font-bold text-[#0B192C] mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#39B5FF] animate-pulse" />
              <ShieldCheck className="w-4 h-4 text-[#39B5FF]" />
              <span>{isAr ? visibleBadges[0].text_ar : visibleBadges[0].text_en}</span>
            </div>
          )}

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B192C] tracking-tight leading-[1.2] sm:leading-[1.18] mb-6">
            {isAr ? (
              <>
                مقاولات عامة وترميم بجدة:{" "}
                <span className="text-[#0284C7] underline decoration-[#39B5FF] decoration-4 underline-offset-8">
                  دقة هندسية
                </span>
                ، والتزام بأعلى معايير الكود السعودي
              </>
            ) : (
              <>
                General Contracting & Restoration in Jeddah:{" "}
                <span className="text-[#0284C7] underline decoration-[#39B5FF] decoration-4 underline-offset-8">
                  Engineered Precision
                </span>
                , Backed by Saudi Building Code
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-600 leading-relaxed mb-10 max-w-3xl mx-auto">
            {isAr
              ? "ننفذ مشاريع الإنشاءات والترميم الشامل، وتحديث شبكات الكهرباء والمياه، والإشراف الهندسي الميداني المباشر للفلل والمنشآت بجدة وفق أعلى معايير الجودة والضمان المعتمد."
              : "Executing turnkey construction, comprehensive villa restoration, MEP utilities, and on-site engineering management across Jeddah in full alignment with the Saudi Building Code."}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary Quote Button: bronze background with navy text */}
            <Button
              href={`/${locale}/contact`}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              <span>{isAr ? "اطلب عرض سعر ومعاينة" : "Request a Quote Now"}</span>
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
              className="w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5 fill-[#0B192C] text-[#0B192C]" />
              <span>{isAr ? "محادثة فورية مع المهندس" : "Chat on WhatsApp"}</span>
            </Button>
          </div>

          {/* Localized trust note */}
          <p className="mt-4 text-xs text-slate-500">
            {isAr
              ? "معاينة ميدانية ورفع مساحي وإعداد مقايسة كميات (BOQ) دقيقة لمشروعك في جدة"
              : "On-site inspection, survey, and itemized BOQ preparation for your Jeddah project"}
          </p>

          {/* Video Showcase Container in Hero */}
          <HeroVideoShowcase locale={locale} />
        </div>
      </div>
    </section>
  );
}
