export interface SectionItem {
  id: string;
  title: string;
  body?: string;
  src?: string;
  alt?: string;
}

export interface SectionImage {
  src: string;
  alt: string;
}

export interface SectionCta {
  label: string;
  type: "home" | "route" | "contact";
  href?: string;
  priority?: "primary" | "secondary";
}

export interface SectionData {
  title: string;
  intro: string;
  contentType: "text" | "image" | "form";
  items?: SectionItem[];
  image?: SectionImage;
  footerCtas?: SectionCta[];
}

export interface BannerCta {
  label: string;
  type: "home" | "route" | "contact";
  href: string;
  priority: "primary" | "secondary";
}

export interface BannerData {
  kicker?: string;
  headline: string;
  body: string;
  backgroundImage?: string;
  backgroundAlt: string;
  ctas: BannerCta[];
}