"use client";

import React from "react";
import type { StatItem } from "@/types";
import { formatNumber } from "@/lib/utils";

interface StatsBarProps {
  stats: StatItem[];
  locale: string;
}

export function StatsBar({ stats, locale }: StatsBarProps) {
  const isAr = locale === "ar";
  // Filter only visible stats with non-null values
  const activeStats = stats.filter(
    (item) => item.visible && item.value !== null && !isNaN(item.value)
  );

  // If no stats are available, hide completely without any blank space!
  if (activeStats.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={isAr ? "إحصائيات وإنجازات المؤسسة" : "Company Track Record"}
      className="bg-[#0B192C] text-white py-10 border-y border-[#1E3E62]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid gap-8 text-center ${
            activeStats.length === 1
              ? "grid-cols-1"
              : activeStats.length === 2
              ? "grid-cols-2"
              : activeStats.length === 3
              ? "grid-cols-3"
              : "grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {activeStats.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="text-3xl sm:text-5xl font-extrabold text-[#C68B59] flex items-center justify-center gap-0.5">
                <span>{item.suffix}</span>
                <span>{formatNumber(item.value!, locale)}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {isAr ? item.label_ar : item.label_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
