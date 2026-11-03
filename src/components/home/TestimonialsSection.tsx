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

  // If empty, hide completely!
  if (activeTestimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
            {isAr ? "شهادات وآراء العملاء" : "Client Testimonials"}
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#0B192C]">
            {isAr ? "ماذا يقول عملاؤنا عن تعاملنا؟" : "What Our Clients Say About Royana"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-[#C68B59]">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-slate-200 mb-3" />
                <p className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{isAr ? item.text_ar : item.text_en}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-sm font-bold text-[#0B192C]">
                  {isAr ? item.name_ar : item.name_en}
                </p>
                <p className="text-xs text-slate-500">
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
