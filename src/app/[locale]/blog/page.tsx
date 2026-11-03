import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPosts } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";

  return {
    title: isAr ? "المدونة الهندسية وإرشادات البناء" : "Engineering Blog & Construction Guides",
    description: isAr
      ? "مقالات وإرشادات فنية من مهندسي مؤسسة رؤيانا حول ترميم الفلل، معالجة الرطوبة بجدة، وكود البناء السعودي."
      : "Technical articles and engineering guides from Royana on villa renovation, coastal moisture, and Saudi building codes.",
    alternates: {
      canonical: `https://royana.com.sa/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const isAr = locale === "ar";
  const posts = getBlogPosts();

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "المدونة" : "Blog", url: `https://royana.com.sa/${locale}/blog` },
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="bg-slate-50 py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs sm:text-sm font-bold text-[#C68B59] uppercase tracking-wider">
              {isAr ? "المعرفة والخبرة الهندسية" : "Engineering Knowledge & Insights"}
            </span>
            <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#0B192C]">
              {isAr ? "المدونة والإرشادات الإنشائية" : "Construction & Restoration Blog"}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAr
                ? "مقالات توجيهية وإرشادات متخصصة لملاك العقارات في جدة ومنطقة مكة المكرمة لحماية استثماراتهم الإنشائية."
                : "Practical engineering advice for property owners in Jeddah and Makkah Province."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200 p-8 max-w-2xl mx-auto">
              <h2 className="text-lg font-bold text-[#0B192C] mb-2">
                {isAr ? "جاري إعداد المقالات الهندسية" : "Articles Currently in Curation"}
              </h2>
              <p className="text-sm text-slate-600 mb-6">
                {isAr
                  ? "يقوم فريقنا الهندسي حالياً بكتابة وتدقيق مقالات تخصصية حول كود البناء السعودي ومعالجة رطوبة جدة."
                  : "Our engineering staff is preparing peer-reviewed articles on coastal remediation and building codes."}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C68B59] text-[#0B192C] font-bold text-sm hover:bg-[#B57B4B] transition-colors"
              >
                <span>{isAr ? "استشر مهندسنا مباشرة" : "Consult Our Engineers"}</span>
                {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white hover:border-[#C68B59] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={isAr ? post.title_ar : post.title_en}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C68B59]" />
                          <span>{post.date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#C68B59]" />
                          <span>{isAr ? post.read_time_ar : post.read_time_en}</span>
                        </span>
                      </div>

                      <h2 className="text-lg font-bold text-[#0B192C] mb-3 line-clamp-2">
                        {isAr ? post.title_ar : post.title_en}
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                        {isAr ? post.summary_ar : post.summary_en}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100">
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0B192C] group-hover:text-[#C68B59] transition-colors mt-4"
                    >
                      <span>{isAr ? "قراءة المقال كاملاً" : "Read Full Article"}</span>
                      {isAr ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <FinalCTASection locale={locale} />
    </>
  );
}
