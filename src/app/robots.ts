import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/keystatic/"],
    },
    sitemap: "https://royana.com.sa/sitemap.xml",
  };
}
