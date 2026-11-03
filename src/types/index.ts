export interface StatItem {
  id: string;
  value: number | null;
  suffix: string;
  label_ar: string;
  label_en: string;
  visible: boolean;
}

export interface Credentials {
  commercial_registration: string | null;
  vat_number: string | null;
  classification: {
    grade: string | null;
    field: string | null;
  };
  documents: Array<{
    title_ar: string;
    title_en: string;
    file_url: string;
    thumbnail?: string;
  }>;
}

export interface ContactInfo {
  phone: string;
  phone_display: string;
  phone_alt: string;
  phone_alt_display: string;
  whatsapp: string;
  email: string;
}

export interface AddressInfo {
  city_ar: string;
  city_en: string;
  street_ar: string;
  street_en: string;
  country_ar: string;
  country_en: string;
  google_maps_url: string;
}

export interface WorkingHours {
  days_ar: string;
  days_en: string;
  time_ar: string;
  time_en: string;
}

export interface SocialLinks {
  instagram: string | null;
  x: string | null;
  linkedin: string | null;
  snapchat: string | null;
  tiktok: string | null;
}

export interface WhyUsItem {
  id: string;
  title_ar: string;
  title_en: string;
  desc_ar: string;
  desc_en: string;
  visible: boolean;
}

export interface BadgeItem {
  id: string;
  text_ar: string;
  text_en: string;
  visible: boolean;
}

export interface SiteSettings {
  stats: StatItem[];
  credentials: Credentials;
  contact: ContactInfo;
  address: AddressInfo;
  working_hours: WorkingHours;
  social: SocialLinks;
  why_us: WhyUsItem[];
  badges: BadgeItem[];
}

export interface ServiceStep {
  title: string;
  desc: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  title_ar: string;
  title_en: string;
  short_desc_ar: string;
  short_desc_en: string;
  icon: string;
  scope_ar: string[];
  scope_en: string[];
  steps_ar: ServiceStep[];
  steps_en: ServiceStep[];
  faqs_ar: FAQItem[];
  faqs_en: FAQItem[];
}

export interface SecondaryService {
  slug: string;
  title_ar: string;
  title_en: string;
  short_desc_ar: string;
  short_desc_en: string;
  icon: string;
  specs_ar: string[];
  specs_en: string[];
  applications_ar: string[];
  applications_en: string[];
}

export interface Project {
  id: string;
  title_ar: string;
  title_en: string;
  category: "restoration" | "construction" | "mep" | "consulting";
  city_ar: string;
  city_en: string;
  location_ar: string;
  location_en: string;
  year?: string;
  client_type_ar?: string;
  client_type_en?: string;
  featured: boolean;
  draft: boolean;
  thumbnail: string;
  before_image?: string | null;
  after_image?: string | null;
  gallery: string[];
  challenge_ar: string;
  challenge_en: string;
  solution_ar: string;
  solution_en: string;
  scope_ar: string[];
  scope_en: string[];
  outcome_ar: string;
  outcome_en: string;
}

export interface Testimonial {
  id: string;
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  company_ar?: string;
  company_en?: string;
  text_ar: string;
  text_en: string;
  rating: number;
  project_title_ar?: string;
  project_title_en?: string;
  visible: boolean;
}

export interface ClientPartner {
  id: string;
  name_ar: string;
  name_en: string;
  logo: string;
  visible: boolean;
}

export interface LocalSeoPage {
  slug: string;
  meta_title_ar: string;
  meta_title_en: string;
  meta_desc_ar: string;
  meta_desc_en: string;
  h1_ar: string;
  h1_en: string;
  intro_ar: string;
  intro_en: string;
  key_points_ar: string[];
  key_points_en: string[];
  faqs_ar: FAQItem[];
  faqs_en: FAQItem[];
}

export interface BlogPost {
  slug: string;
  title_ar: string;
  title_en: string;
  summary_ar: string;
  summary_en: string;
  author_ar: string;
  author_en: string;
  date: string;
  read_time_ar: string;
  read_time_en: string;
  category_ar: string;
  category_en: string;
  thumbnail: string;
  draft: boolean;
  content_ar: string;
  content_en: string;
}
