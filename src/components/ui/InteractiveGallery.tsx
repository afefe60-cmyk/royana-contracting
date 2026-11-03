"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn, ShieldCheck } from "lucide-react";

interface InteractiveGalleryProps {
  images: string[];
  title?: string;
  badgeLabel?: string;
  isAr?: boolean;
}

export function InteractiveGallery({
  images,
  title,
  badgeLabel,
  isAr = true,
}: InteractiveGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIdx === null) return;
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) =>
          prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null
        );
      }
      if (e.key === "ArrowRight") {
        setActiveIdx((prev) =>
          prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, images.length]);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B192C] flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#39B5FF]" />
            <span>{title}</span>
          </h2>
          {badgeLabel && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              {badgeLabel}
            </span>
          )}
        </div>
      )}

      {/* Grid of images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((imgSrc, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 hover:border-[#39B5FF] hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-[#39B5FF]"
            aria-label={isAr ? `معاينة الصورة ${idx + 1}` : `Preview image ${idx + 1}`}
          >
            <Image
              src={imgSrc}
              alt={title ? `${title} - ${idx + 1}` : `معرض صور ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Subtle hover overlay with zoom icon */}
            <div className="absolute inset-0 bg-[#0B192C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs text-white">
                <ZoomIn className="w-5 h-5" />
              </span>
            </div>
            <span className="absolute bottom-1.5 right-1.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0B192C]/80 backdrop-blur-xs text-white">
              {idx + 1} / {images.length}
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0B192C]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveIdx(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveIdx(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
            aria-label={isAr ? "إغلاق المعاينة" : "Close preview"}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx((prev) =>
                    prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : 0
                  );
                }}
                className="absolute left-2 sm:left-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label={isAr ? "الصورة السابقة" : "Previous image"}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIdx((prev) =>
                    prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : 0
                  );
                }}
                className="absolute right-2 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20"
                aria-label={isAr ? "الصورة التالية" : "Next image"}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Active Image container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[70vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIdx]}
              alt={title || "صورة مكبرة"}
              fill
              priority
              className="object-contain rounded-lg"
            />
          </div>

          {/* Bottom Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-300 bg-black/50 backdrop-blur-xs px-4 py-1.5 rounded-full">
            {activeIdx + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
