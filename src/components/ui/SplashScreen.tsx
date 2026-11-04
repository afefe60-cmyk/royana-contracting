"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Quick sleek intro - fade out after 650ms
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 650);

    // Completely unmount after fade completes (950ms)
    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 950);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        setFading(true);
        setTimeout(() => setVisible(false), 250);
      }}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070d18] transition-opacity duration-500 cursor-pointer select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #00d2ff 1px, transparent 1px),
            linear-gradient(to bottom, #00d2ff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center glowing brand beam */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Subtle cyan glow halo */}
        <div className="absolute -inset-10 bg-[#00d2ff]/25 blur-3xl rounded-full pointer-events-none animate-pulse" />

        <div className="relative w-64 sm:w-80 h-24 mb-6 drop-shadow-[0_0_25px_rgba(0,210,255,0.45)]">
          <Image
            src="/images/logo-white.webp"
            alt="رؤيانا الحديثة للمقاولات"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Engineering tagline */}
        <p className="text-xs sm:text-sm font-semibold text-[#00d2ff] tracking-wider mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00d2ff] animate-ping" />
          <span>هندسة • إنشاءات • ترميم • إشراف</span>
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-56 h-1.5 bg-[#121e34] rounded-full overflow-hidden border border-sky-400/20 shadow-[0_0_15px_rgba(0,210,255,0.2)]">
          <div className="h-full bg-gradient-to-r from-[#00d2ff] via-[#38bdf8] to-[#3a7bd5] rounded-full animate-[progress_1.2s_ease-in-out_infinite]" />
        </div>

        {/* Skip hint */}
        <span className="text-[11px] text-slate-500 mt-4 tracking-wide">
          انقر في أي مكان للتخطي • Click anywhere to skip
        </span>
      </div>
    </div>
  );
}
