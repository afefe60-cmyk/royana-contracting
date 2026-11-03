"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
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
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayback = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، أود الاستفسار عن خدمات مؤسسة رؤيانا الحديثة للمقاولات في جدة."
      : "Hello, I would like to inquire about Royana Contracting services in Jeddah."
  );

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] overflow-hidden flex items-center justify-center bg-[#0B192C]">
      {/* 1. Cinematic Full-Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          onLoadedData={() => setVideoLoaded(true)}
          className="w-full h-full object-cover scale-105"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* 2. Architectural Contrast Protection Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B192C] via-[#0B192C]/80 to-[#0B192C]/85 z-10 pointer-events-none" />

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

      {/* 3. Disciplined Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-20 sm:py-28 flex flex-col items-center">
        {/* Verified Badge with Cyan glow */}
        {visibleBadges.length > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#39B5FF]/50 text-xs sm:text-sm font-bold text-white mb-6 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#39B5FF] animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-[#39B5FF]" />
            <span>{isAr ? visibleBadges[0].text_ar : visibleBadges[0].text_en}</span>
          </div>
        )}

        {/* Grand H1 Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.18] mb-6 drop-shadow-md">
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

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-200 leading-relaxed mb-10 max-w-3xl mx-auto drop-shadow-sm font-medium">
          {isAr
            ? "ننفذ مشاريع الإنشاءات والترميم الشامل، وتحديث شبكات الكهرباء والمياه، والإشراف الهندسي الميداني المباشر للفلل والمنشآت بجدة وفق أعلى معايير الجودة والضمان المعتمد."
            : "Executing turnkey construction, comprehensive villa restoration, MEP utilities, and on-site engineering management across Jeddah in full alignment with the Saudi Building Code."}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-12">
          {/* Primary Quote Button: bronze background with navy text */}
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-xl hover:scale-102"
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
            className="w-full sm:w-auto shadow-xl hover:scale-102"
          >
            <MessageCircle className="w-5 h-5 fill-[#0B192C] text-[#0B192C]" />
            <span>{isAr ? "محادثة فورية مع المهندس" : "Chat on WhatsApp"}</span>
          </Button>
        </div>

        {/* Quick Highlights Strip inside the hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-6 border-t border-white/15">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-xs sm:text-sm text-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "كود البناء السعودي" : "Saudi Code"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-xs sm:text-sm text-slate-200">
            <Ruler className="w-4 h-4 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "إشراف هندسي ميداني" : "Site Oversight"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-xs sm:text-sm text-slate-200">
            <FileCheck className="w-4 h-4 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "مقايسة كميات BOQ" : "Detailed BOQ"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 backdrop-blur-xs border border-white/10 text-xs sm:text-sm text-slate-200">
            <CheckCircle2 className="w-4 h-4 text-[#39B5FF] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "ضمان رسمي معتمد" : "Official Warranty"}</span>
          </div>
        </div>
      </div>

      {/* 4. Discrete Video Controls for Accessibility */}
      <div className="absolute bottom-6 end-6 z-20 flex items-center gap-2 bg-[#0B192C]/80 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg">
        <button
          onClick={toggleSound}
          aria-label={isMuted ? "تشغيل صوت الفيديو" : "كتم صوت الفيديو"}
          className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#39B5FF]" />}
        </button>

        <button
          onClick={togglePlayback}
          aria-label={isPlaying ? "إيقاف الفيديو مؤقتاً" : "تشغيل الفيديو"}
          className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-[#39B5FF]" />}
        </button>
      </div>
    </section>
  );
}
