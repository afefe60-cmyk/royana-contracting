import React from "react";

interface LocalBusinessSchemaProps {
  locale: string;
}

export function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const isAr = locale === "ar";

  const schema = {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    name: isAr ? "مؤسسة رؤيانا الحديثة للمقاولات" : "Royana Modern Contracting Establishment",
    image: "https://royana.com.sa/images/logo.png",
    url: "https://royana.com.sa",
    telephone: "+966508805861",
    email: "info@royana.com.sa",
    priceRange: "SAR",
    address: {
      "@type": "PostalAddress",
      streetAddress: isAr
        ? "حي البغدادية، شارع أبو عبدالله الزهري"
        : "Al-Baghdadiyah Dist., Abu Abdullah Al-Zuhri St.",
      addressLocality: isAr ? "جدة" : "Jeddah",
      addressRegion: isAr ? "منطقة مكة المكرمة" : "Makkah Province",
      addressCountry: "SA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "21.4984",
      longitude: "39.1856",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: isAr ? "جدة" : "Jeddah",
      },
      {
        "@type": "AdministrativeArea",
        name: isAr ? "منطقة مكة المكرمة" : "Makkah Province",
      },
    ],
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ServiceSchemaProps {
  title: string;
  description: string;
  url: string;
}

export function ServiceSchema({ title, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Construction & Contracting",
    provider: {
      "@type": "GeneralContractor",
      name: "مؤسسة رؤيانا الحديثة للمقاولات",
      url: "https://royana.com.sa",
    },
    name: title,
    description: description,
    url: url,
    areaServed: {
      "@type": "City",
      name: "Jeddah",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FAQSchemaProps {
  faqs: Array<{ q: string; a: string }>;
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
