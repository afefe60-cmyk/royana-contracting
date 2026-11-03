"use client";

import React, { useState } from "react";
import { Play, Volume2, ShieldCheck, Film } from "lucide-react";

interface HeroVideoShowcaseProps {
  locale?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export function HeroVideoShowcase({
  locale = "ar",
  videoSrc = "/videos/hero-showcase.mp4",
  posterSrc = "/images/video-poster.svg",
}: HeroVideoShowcaseProps) {
  const isAr = locale === "ar";
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative mt-12 sm:mt-16 max-w-4xl mx-auto">
      {/* Outer Glow Halo with brand cyan */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#39B5FF]/20 via-[#1E3E62]/30 to-[#39B5FF]/20 rounded-3xl blur-xl opacity-75" />

      {/* Main Architectural Player Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0B192C] border-2 border-[#1E3E62] shadow-2xl">
        {/* Architectural Blueprint Corner Brackets in Brand Cyan */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#39B5FF] z-20 pointer-events-none" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#39B5FF] z-20 pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#39B5FF] z-20 pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#39B5FF] z-20 pointer-events-none" />

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-slate-900 flex items-center justify-center">
          <video
            src={videoSrc}
            poster={posterSrc}
            controls
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            {isAr
              ? "متصفحك لا يدعم تشغيل الفيديو المباشر."
              : "Your browser does not support the video tag."}
          </video>
        </div>

        {/* Video Caption & Status Footer */}
        <div className="bg-[#0B192C] px-5 py-3 border-t border-[#1E3E62] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39B5FF] animate-pulse" />
            <span className="font-bold text-white">
              {isAr
                ? "فيديو توثيقي: إشراف هندسي وتنفيذ متكامل لمشاريع جدة"
                : "Project Showcase: Quality Engineering & On-Site Execution in Jeddah"}
            </span>
          </div>
          <div className="text-[11px] text-[#39B5FF] flex items-center gap-1 font-mono">
            <Film className="w-3.5 h-3.5 text-[#39B5FF]" />
            <span>public/videos/hero-showcase.mp4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
