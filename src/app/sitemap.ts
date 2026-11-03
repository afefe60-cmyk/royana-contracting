import { MetadataRoute } from "next";
import {
  getServices,
  getSecondaryServices,
  getProjects,
  getBlogPosts,
  getLocalSeoPages,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://royana.com.sa";
  const locales = ["ar", "en"];
  const staticRoutes = [
    "",
    "/services",
    "/projects",
    "/other-sectors",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static Pages for each locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  // Core Services
  const services = getServices();
  for (const locale of locales) {
    for (const srv of services) {
      entries.push({
        url: `${baseUrl}/${locale}/services/${srv.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  // Secondary Sectors
  const secondaryServices = getSecondaryServices();
  for (const locale of locales) {
    for (const sec of secondaryServices) {
      entries.push({
        url: `${baseUrl}/${locale}/other-sectors/${sec.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Published Projects ONLY (draft: false)
  const publishedProjects = getProjects(false);
  for (const locale of locales) {
    for (const p of publishedProjects) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${p.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Published Blog Posts ONLY (draft: false)
  const publishedArticles = getBlogPosts(false);
  for (const locale of locales) {
    for (const a of publishedArticles) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${a.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Local SEO Pages in Jeddah
  const localSeoPages = getLocalSeoPages();
  for (const locale of locales) {
    for (const page of localSeoPages) {
      entries.push({
        url: `${baseUrl}/${locale}/jeddah-contractor/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      });
    }
  }

  return entries;
}
