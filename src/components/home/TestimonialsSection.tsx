import React from "react";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  locale: string;
}

export function TestimonialsSection({
  testimonials,
  locale,
}: TestimonialsSectionProps) {
  const isAr = locale === "ar";
  const activeTestimonials = testimonials.filter((t) => t.visible);

  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 relative z-10 border-t border-sky-400/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
            {isAr ? "شهادات وآراء العملاء" : "Client Testimonials"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white">
            {isAr ? "ماذا يقول عملاؤنا عن تعاملنا؟" : "What Our Clients Say About Royana"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-[#121e34]/75 border border-sky-400/15 hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 backdrop-blur-md shadow-xl flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#00d2ff]">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sky-400/20 mb-3" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{isAr ? item.text_ar : item.text_en}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-sky-400/10">
                <p className="text-sm font-bold text-white">
                  {isAr ? item.name_ar : item.name_en}
                </p>
                <p className="text-xs text-slate-400">
                  {isAr ? item.role_ar : item.role_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
