import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { getProjects } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface ProjectsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  const title = isAr
    ? "معرض المشاريع ودراسات الحالة المعتمدة | رؤيانا للمقاولات بجدة"
    : "Projects Showcase & Case Studies | Royana Contracting";

  const description = isAr
    ? "تصفح مشاريع مؤسسة رؤيانا للمقاولات في جدة: أعمال الترميم، الإنشاءات، تركيب المصانع، والتشطيبات الموثقة وفق الكود السعودي."
    : "Explore Royana Contracting portfolio in Jeddah: restoration, construction, factory equipment rigging, and certified engineering projects.";

  const shareImageUrl = "https://royana.com.sa/images/projects/durrat-al-arus-finished.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/projects`,
    },
    openGraph: {
      title,
      description,
      url: `https://royana.com.sa/${locale}/projects`,
      siteName: isAr ? "رؤيانا الحديثة للمقاولات" : "Royana Contracting",
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
      images: [
        {
          url: shareImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImageUrl],
    },
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const projects = getProjects();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "معرض المشاريع" : "Projects", url: `https://royana.com.sa/${locale}/projects` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-[#0d1728]/70 py-16 sm:py-20 border-b border-sky-400/15 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs sm:text-sm font-bold text-[#00d2ff] uppercase tracking-wider mb-3">
              {isAr ? "سجل الإنجاز الهندسي" : "Engineering Portfolio"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-white">
              {isAr ? "معرض الأعمال ومشاريع المقاولات" : "Contracting & Restoration Projects"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              {isAr
                ? "مشاريع حقيقية منفذة وفق أعلى المعايير الفنية والإنشائية، مع توثيق التحديات والحلول الهندسية."
                : "Real projects executed per rigorous technical benchmarks, documenting engineering challenges and outcomes."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-16 bg-[#121e34]/75 rounded-3xl border border-sky-400/15 p-8 backdrop-blur-md">
              <p className="text-base text-slate-300">
                {isAr
                  ? "يتم حالياً تجهيز وتوثيق صور ومعلومات المشاريع الجديدة."
                  : "New project case studies are currently being curated and documented."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-3xl border border-sky-400/15 overflow-hidden bg-[#121e34]/75 backdrop-blur-md hover:border-sky-400/40 hover:bg-[#1a2c4c]/90 hover:-translate-y-1.5 shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-[#0d1728] overflow-hidden">
                      <Image
                        src={project.thumbnail}
                        alt={isAr ? project.title_ar : project.title_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#070d18]/85 backdrop-blur-xs text-xs font-bold text-[#00d2ff] border border-sky-400/20">
                        {isAr ? project.city_ar : project.city_en}
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-[#00d2ff] mb-2 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#00d2ff]" />
                        <span>{isAr ? project.location_ar : project.location_en}</span>
                      </div>

                      <h2 className="text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#00d2ff] transition-colors">
                        {isAr ? project.title_ar : project.title_en}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3 mb-4 font-normal">
                        {isAr ? project.solution_ar : project.solution_en}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-sky-400/10">
                    <Link
                      href={`/${locale}/projects/${project.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#00d2ff] group-hover:text-white transition-colors mt-4"
                    >
                      <span>{isAr ? "عرض دراسة الحالة كاملة" : "Read Full Case Study"}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
