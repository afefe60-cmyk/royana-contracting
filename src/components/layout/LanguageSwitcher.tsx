"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: string;
  variant?: "default" | "circular";
}

export function LanguageSwitcher({
  currentLocale,
  variant = "default",
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "";
  const targetLocale = currentLocale === "ar" ? "en" : "ar";
  const targetLabel = currentLocale === "ar" ? "English" : "العربية";

  // Replace locale prefix in path
  let targetPath = pathname;
  if (pathname.startsWith(`/${currentLocale}`)) {
    targetPath = pathname.replace(`/${currentLocale}`, `/${targetLocale}`);
  } else {
    targetPath = `/${targetLocale}${pathname}`;
  }

  if (variant === "circular") {
    return (
      <Link
        href={targetPath}
        className="w-9 h-9 rounded-full bg-[#162C46] flex items-center justify-center text-[#39B5FF] border border-[#1E3E62] hover:bg-[#1E3E62] hover:border-[#39B5FF] hover:scale-105 active:scale-95 transition-all shadow-sm"
        aria-label={currentLocale === "ar" ? "تغيير اللغة إلى English" : "Switch language to Arabic"}
        title={targetLabel}
      >
        <Globe className="w-4 h-4" />
        <span className="sr-only">{targetLabel}</span>
      </Link>
    );
  }

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-bold text-white bg-[#162C46] border border-[#1E3E62] rounded-lg hover:border-[#39B5FF] hover:bg-[#1E3E62] transition-all shadow-sm group"
      aria-label={`تبديل اللغة إلى ${targetLabel}`}
    >
      <Globe className="w-4 h-4 text-[#39B5FF] transition-transform group-hover:scale-110" />
      <span className="font-semibold text-slate-100 group-hover:text-white transition-colors">{targetLabel}</span>
    </Link>
  );
}
