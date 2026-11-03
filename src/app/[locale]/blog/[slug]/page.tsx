import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import { getBlogPosts, getBlogPostBySlug } from "@/lib/content";
import { BreadcrumbSchema } from "@/components/seo/SchemaScripts";
import { FinalCTASection } from "@/components/home/FinalCTASection";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts(false);
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of ["ar", "en"]) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const post = getBlogPostBySlug(slug, false);

  if (!post) {
    return { title: isAr ? "المقال غير موجود" : "Article Not Found" };
  }

  const title = isAr ? post.title_ar : post.title_en;
  const description = isAr ? post.summary_ar : post.summary_en;

  return {
    title: `${title} | مدونة رؤيانا للمقاولات`,
    description,
    alternates: {
      canonical: `https://royana.com.sa/${locale}/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://royana.com.sa/${locale}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const isAr = locale === "ar";
  const post = getBlogPostBySlug(slug, false);

  if (!post) {
    notFound();
  }

  const title = isAr ? post.title_ar : post.title_en;
  const summary = isAr ? post.summary_ar : post.summary_en;
  const author = isAr ? post.author_ar : post.author_en;
  const content = isAr ? post.content_ar : post.content_en;

  const breadcrumbs = [
    { name: isAr ? "الرئيسية" : "Home", url: `https://royana.com.sa/${locale}` },
    { name: isAr ? "المدونة" : "Blog", url: `https://royana.com.sa/${locale}/blog` },
    { name: title, url: `https://royana.com.sa/${locale}/blog/${slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    image: `https://royana.com.sa${post.thumbnail}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "مؤسسة رؤيانا الحديثة للمقاولات",
      logo: {
        "@type": "ImageObject",
        url: "https://royana.com.sa/images/logo.png",
      },
    },
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#C68B59] hover:text-[#0B192C] transition-colors mb-6"
            >
              {isAr ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isAr ? "العودة لكافة المقالات" : "Back to Blog"}</span>
            </Link>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B192C] leading-tight mb-6">
              {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 pb-6 border-b border-slate-200">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-4 h-4 text-[#C68B59]" />
                <span>{author}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#C68B59]" />
                <span>{post.date}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#C68B59]" />
                <span>{isAr ? post.read_time_ar : post.read_time_en}</span>
              </span>
            </div>
          </div>

          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-10 border border-slate-200">
            <Image
              src={post.thumbnail}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-slate max-w-none text-base sm:text-lg leading-relaxed text-slate-700">
            <p className="font-semibold text-xl text-[#0B192C] mb-6 leading-relaxed">
              {summary}
            </p>
            <div className="space-y-4">
              {content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      <FinalCTASection locale={locale} />
    </>
  );
}
