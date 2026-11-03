"use client";

import React, { useRef, useEffect } from "react";
import {
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Ruler,
  FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { BadgeItem } from "@/types";

interface HeroSectionProps {
  locale: string;
  badges?: BadgeItem[];
  whatsappPhone?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export function HeroSection({
  locale,
  badges = [],
  whatsappPhone = "966508805861",
  videoSrc = "/videos/hero-showcase.mp4",
  posterSrc = "/images/video-poster.svg",
}: HeroSectionProps) {
  const isAr = locale === "ar";
  const visibleBadges = badges.filter((b) => b.visible);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        // Autoplay handled safely by browser
        console.log("Autoplay deferral:", err);
      });
    }
  }, []);

  const whatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، أود الاستفسار عن خدمات مؤسسة رؤيانا الحديثة للمقاولات في جدة."
      : "Hello, I would like to inquire about Royana Contracting services in Jeddah."
  );

  return (
    <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] overflow-hidden flex items-center justify-center bg-[#0B192C]">
      {/* 1. Seamless Silent Background Video (strictly no sound and no pause/play controls) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover scale-105"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* 2. Architectural Contrast Protection Layer (Balanced on mobile to make video vivid while keeping text crisp) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/50 to-[#0B192C]/65 sm:via-[#0B192C]/80 sm:to-[#0B192C]/85 z-10 pointer-events-none" />

      {/* Subtle Blueprint Mesh */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #39B5FF 1px, transparent 1px),
            linear-gradient(to bottom, #39B5FF 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* 3. Disciplined Responsive Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-12 sm:py-20 lg:py-24 flex flex-col items-center">
        {/* Verified Badge with Cyan glow */}
        {visibleBadges.length > 0 && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#39B5FF]/50 text-[11px] sm:text-xs font-bold text-white mb-4 sm:mb-6 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39B5FF] animate-pulse" />
            <ShieldCheck className="w-3.5 h-3.5 text-[#39B5FF]" />
            <span>{isAr ? visibleBadges[0].text_ar : visibleBadges[0].text_en}</span>
          </div>
        )}

        {/* Grand Responsive H1 Headline */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-3 sm:mb-6 drop-shadow-md">
          {isAr ? (
            <>
              مقاولات عامة وترميم بجدة:{" "}
              <span className="text-[#39B5FF] drop-shadow-[0_2px_12px_rgba(57,181,255,0.4)]">
                دقة هندسية
              </span>
              ، والتزام معتمد بالكود السعودي
            </>
          ) : (
            <>
              General Contracting & Restoration in Jeddah:{" "}
              <span className="text-[#39B5FF] drop-shadow-[0_2px_12px_rgba(57,181,255,0.4)]">
                Engineered Precision
              </span>
              , Compliant with Saudi Building Code
            </>
          )}
        </h1>

        {/* Concise Subtitle on Mobile to preserve first-fold vertical fit */}
        <p className="text-xs sm:text-base lg:text-lg text-slate-200 leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto drop-shadow-sm font-medium">
          {isAr
            ? "إنشاءات وترميم شامل، صيانة شبكات، وإشراف هندسي ميداني مباشر للفلل والمنشآت بجدة وفق أعلى معايير الجودة والضمان المعتمد."
            : "Turnkey construction, comprehensive villa restoration, MEP utilities, and on-site engineering management across Jeddah in full alignment with the Saudi Building Code."}
        </p>

        {/* Action CTAs: hidden on mobile to avoid duplication with persistent bottom action bar and showcase background video */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-8 sm:mb-10">
          {/* Primary Quote Button: bronze background with navy text */}
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="md"
            className="w-full sm:w-auto shadow-xl py-2.5 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base"
          >
            <span>{isAr ? "اطلب عرض سعر ومعاينة" : "Request a Quote Now"}</span>
            {isAr ? (
              <ArrowLeft className="w-4 h-4 text-[#0B192C]" />
            ) : (
              <ArrowRight className="w-4 h-4 text-[#0B192C]" />
            )}
          </Button>

          {/* WhatsApp Direct CTA */}
          <Button
            href={whatsappUrl}
            external
            variant="whatsapp"
            size="md"
            className="w-full sm:w-auto shadow-xl py-2.5 sm:py-3.5 px-6 sm:px-8 text-sm sm:text-base"
          >
            <MessageCircle className="w-4 h-4 fill-[#0B192C] text-[#0B192C]" />
            <span>{isAr ? "محادثة فورية مع المهندس" : "Chat on WhatsApp"}</span>
          </Button>
        </div>

        {/* Quick Highlights Strip inside the hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 w-full max-w-3xl pt-4 sm:pt-6 border-t border-white/15">
          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-[11px] sm:text-xs text-slate-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "كود البناء السعودي" : "Saudi Code"}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-[11px] sm:text-xs text-slate-200">
            <Ruler className="w-3.5 h-3.5 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "إشراف هندسي ميداني" : "Site Oversight"}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-[11px] sm:text-xs text-slate-200">
            <FileCheck className="w-3.5 h-3.5 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "مقايسة BOQ دقيقة" : "Detailed BOQ"}</span>
          </div>

          <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-[11px] sm:text-xs text-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "ضمان رسمي معتمد" : "Official Warranty"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
