"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  ShieldCheck,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Ruler,
  FileCheck,
  Play,
  Pause,
  Volume2,
  VolumeX,
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const whatsappUrl = buildWhatsAppUrl(
    whatsappPhone,
    isAr
      ? "السلام عليكم، أود الاستفسار عن خدمات مؤسسة رؤيانا الحديثة للمقاولات في جدة."
      : "Hello, I would like to inquire about Royana Contracting services in Jeddah."
  );

  return (
    <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] overflow-hidden flex items-center justify-center bg-[#070d18]">
      {/* 1. High-Clarity Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          src={videoSrc}
          poster={posterSrc}
          className="w-full h-full object-cover scale-100 opacity-80 sm:opacity-75 transition-opacity duration-700"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* 2. Royana Tech Contrast Vignette & Soft Gradient Mesh Layer */}
      {/* Header contrast shadow */}
      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#070d18] via-[#070d18]/60 to-transparent z-10 pointer-events-none" />
      {/* Radial soft vignette to maintain clear text focus without crushing the video */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,13,24,0.35)_0%,rgba(7,13,24,0.85)_100%)] z-10 pointer-events-none" />
      {/* Bottom section transition blend */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#070d18] to-transparent z-10 pointer-events-none" />

      {/* Subtle blueprint grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none z-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00d2ff 1px, transparent 1px),
            linear-gradient(to bottom, #00d2ff 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating Video Controller Badge (Bottom Corner) */}
      <div className="absolute bottom-6 start-6 z-20 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070d18]/80 backdrop-blur-md border border-sky-400/25 text-xs text-slate-300 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-semibold text-slate-200">
          {isAr ? "فيديو ميداني مباشر للمشاريع" : "Live Projects Showcase"}
        </span>
        <div className="h-3 w-px bg-slate-700 mx-1" />
        <button
          onClick={togglePlay}
          className="p-1 rounded-full hover:bg-sky-500/20 text-[#00d2ff] transition-colors"
          title={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
          aria-label={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-sky-500/20 text-[#00d2ff] transition-colors"
          title={isMuted ? "تشغيل الصوت" : "كتم الصوت"}
          aria-label={isMuted ? "Unmute Video" : "Mute Video"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 3. Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-14 sm:py-20 lg:py-24 flex flex-col items-center">
        {/* Verified Badge with Cyan glow */}
        {visibleBadges.length > 0 && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121e34]/80 backdrop-blur-md border border-sky-400/30 text-xs font-bold text-[#00d2ff] mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,210,255,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-[#00d2ff]" />
            <span>{isAr ? visibleBadges[0].text_ar : visibleBadges[0].text_en}</span>
          </div>
        )}

        {/* Grand H1 Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-4 sm:mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          {isAr ? (
            <>
              مقاولات عامة وترميم بجدة:{" "}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,210,255,0.35)]">
                دقة هندسية
              </span>
              ، والتزام معتمد بالكود السعودي
            </>
          ) : (
            <>
              General Contracting & Restoration in Jeddah:{" "}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#818cf8] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(0,210,255,0.35)]">
                Engineered Precision
              </span>
              , Compliant with Saudi Building Code
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg lg:text-xl text-slate-200 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
          {isAr
            ? "إنشاءات وترميم شامل، صيانة شبكات، وإشراف هندسي ميداني مباشر للفلل والمنشآت بجدة وفق أعلى معايير الجودة والضمان المعتمد."
            : "Turnkey construction, comprehensive villa restoration, MEP utilities, and on-site engineering management across Jeddah in full alignment with the Saudi Building Code."}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
          <Button
            href={`/${locale}/contact`}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-[0_0_25px_rgba(0,210,255,0.3)]"
          >
            <span>{isAr ? "اطلب عرض سعر ومعاينة" : "Request a Quote Now"}</span>
            {isAr ? (
              <ArrowLeft className="w-5 h-5 text-white" />
            ) : (
              <ArrowRight className="w-5 h-5 text-white" />
            )}
          </Button>

          <Button
            href={whatsappUrl}
            external
            variant="whatsapp"
            size="lg"
            className="w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5 fill-[#070d18] text-[#070d18]" />
            <span>{isAr ? "محادثة فورية مع المهندس" : "Chat on WhatsApp"}</span>
          </Button>
        </div>

        {/* Quick Highlights Strip inside the hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl pt-6 border-t border-sky-400/20">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#121e34]/80 backdrop-blur-md border border-sky-400/20 text-xs sm:text-sm text-slate-200 shadow-md">
            <ShieldCheck className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "كود البناء السعودي" : "Saudi Code"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#121e34]/80 backdrop-blur-md border border-sky-400/20 text-xs sm:text-sm text-slate-200 shadow-md">
            <Ruler className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "إشراف هندسي ميداني" : "Site Oversight"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#121e34]/80 backdrop-blur-md border border-sky-400/20 text-xs sm:text-sm text-slate-200 shadow-md">
            <FileCheck className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "مقايسة BOQ دقيقة" : "Detailed BOQ"}</span>
          </div>

          <div className="flex items-center justify-center gap-2 p-2.5 rounded-2xl bg-[#121e34]/80 backdrop-blur-md border border-sky-400/20 text-xs sm:text-sm text-slate-200 shadow-md">
            <CheckCircle2 className="w-4 h-4 text-[#00d2ff] flex-shrink-0" />
            <span className="font-semibold">{isAr ? "ضمان رسمي معتمد" : "Official Warranty"}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
