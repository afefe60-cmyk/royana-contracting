"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
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

  return (
    <Link
      href={targetPath}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-md border border-slate-300 dark:border-slate-700 hover:border-[#C68B59] hover:text-[#C68B59] transition-colors"
      aria-label={`تبديل اللغة إلى ${targetLabel}`}
    >
      <Globe className="w-4 h-4 text-[#C68B59]" />
      <span>{targetLabel}</span>
    </Link>
  );
}
