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
        className="w-9 h-9 rounded-full bg-[#0d1728] flex items-center justify-center text-[#00d2ff] border border-sky-400/20 hover:border-[#00d2ff] hover:bg-sky-500/10 hover:scale-105 active:scale-95 transition-all shadow-sm"
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
      className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-[#0d1728] border border-sky-400/20 rounded-full hover:border-[#00d2ff] hover:bg-sky-500/10 transition-all shadow-sm group"
      aria-label={`تبديل اللغة إلى ${targetLabel}`}
    >
      <Globe className="w-4 h-4 text-[#00d2ff] transition-transform group-hover:scale-110" />
      <span className="font-semibold text-slate-100 group-hover:text-[#00d2ff] transition-colors">{targetLabel}</span>
    </Link>
  );
}
