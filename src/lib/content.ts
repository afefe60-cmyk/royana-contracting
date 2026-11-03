import siteSettingsData from "@/../content/site-settings.json";
import servicesData from "@/../content/services.json";
import secondaryServicesData from "@/../content/secondary-services.json";
import testimonialsData from "@/../content/testimonials.json";
import clientsData from "@/../content/clients.json";
import localSeoData from "@/../content/jeddah-contractor.json";
import durratAlArousProject from "@/../content/projects/durrat-al-arus.json";
import draftSampleProject from "@/../content/projects/draft-sample-project.json";
import sampleDraftArticle from "@/../content/blog/sample-draft-article.json";

import type {
  SiteSettings,
  Service,
  SecondaryService,
  Project,
  Testimonial,
  ClientPartner,
  LocalSeoPage,
  BlogPost,
} from "@/types";

const isDev = process.env.NODE_ENV === "development";

export function getSiteSettings(): SiteSettings {
  return siteSettingsData as unknown as SiteSettings;
}

export function getServices(): Service[] {
  return servicesData as unknown as Service[];
}

export function getServiceBySlug(slug: string): Service | undefined {
  return getServices().find((s) => s.slug === slug);
}

export function getSecondaryServices(): SecondaryService[] {
  return secondaryServicesData as unknown as SecondaryService[];
}

export function getSecondaryServiceBySlug(slug: string): SecondaryService | undefined {
  return getSecondaryServices().find((s) => s.slug === slug);
}

export function getProjects(includeDrafts: boolean = isDev): Project[] {
  const allProjects: Project[] = [
    durratAlArousProject as unknown as Project,
    draftSampleProject as unknown as Project,
  ];

  if (!includeDrafts) {
    return allProjects.filter((p) => !p.draft);
  }
  return allProjects;
}

export function getProjectById(id: string, includeDrafts: boolean = isDev): Project | undefined {
  return getProjects(includeDrafts).find((p) => p.id === id);
}

export function getTestimonials(): Testimonial[] {
  const list = (testimonialsData as unknown as Testimonial[]) || [];
  return list.filter((t) => t.visible);
}

export function getClients(): ClientPartner[] {
  const list = (clientsData as unknown as ClientPartner[]) || [];
  return list.filter((c) => c.visible);
}

export function getLocalSeoPages(): LocalSeoPage[] {
  return localSeoData as unknown as LocalSeoPage[];
}

export function getLocalSeoPageBySlug(slug: string): LocalSeoPage | undefined {
  return getLocalSeoPages().find((p) => p.slug === slug);
}

export function getBlogPosts(includeDrafts: boolean = isDev): BlogPost[] {
  const allArticles: BlogPost[] = [sampleDraftArticle as unknown as BlogPost];
  if (!includeDrafts) {
    return allArticles.filter((a) => !a.draft);
  }
  return allArticles;
}

export function getBlogPostBySlug(slug: string, includeDrafts: boolean = isDev): BlogPost | undefined {
  return getBlogPosts(includeDrafts).find((a) => a.slug === slug);
}
