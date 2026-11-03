"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Only show once per browser session
    try {
      const seen = sessionStorage.getItem("royana_splash_seen");
      if (!seen) {
        setVisible(true);
        // Start fading after 1.2s
        const fadeTimer = setTimeout(() => {
          setFading(true);
        }, 1300);

        // Remove completely after 1.7s
        const removeTimer = setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("royana_splash_seen", "true");
        }, 1750);

        return () => {
          clearTimeout(fadeTimer);
          clearTimeout(removeTimer);
        };
      }
    } catch {
      // Ignore sessionStorage issues in private mode
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => {
        setFading(true);
        setTimeout(() => setVisible(false), 300);
      }}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B192C] transition-opacity duration-500 cursor-pointer select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #39B5FF 1px, transparent 1px),
            linear-gradient(to bottom, #39B5FF 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Center glowing brand beam */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Subtle cyan glow halo */}
        <div className="absolute -inset-4 bg-[#39B5FF]/15 blur-2xl rounded-full pointer-events-none" />

        <div className="relative w-64 sm:w-80 h-24 mb-6 animate-pulse">
          <Image
            src="/images/logo-white.webp"
            alt="رؤيانا الحديثة للمقاولات"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Engineering tagline */}
        <p className="text-xs sm:text-sm font-semibold text-[#39B5FF] tracking-wider mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#39B5FF] animate-ping" />
          <span>هندسة • إنشاءات • ترميم • إشراف</span>
        </p>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-1 bg-[#1E3E62] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#39B5FF] via-[#38BDF8] to-[#C68B59] rounded-full animate-[progress_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
