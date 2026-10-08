export type Locale = 'en' | 'ru';

export type CaseSlug = 'workforce-attrition' | 'scailium-observability';

export type Link = {
  label: string;
  href: string;
};

export type Metric = {
  label: string;
  value: string;
};

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  paragraphs: string[];
  stack?: string[];
  compact?: boolean;
};

export type Award = {
  id: 'startup-hackathon-2021' | 'leaders-digital-transformation-2023';
  event: string;
  title: string;
  copy: string[];
  team: string;
  certificatePdf: string;
  certificateImage: string;
};

export type Recommendation = {
  initials: string;
  name: string;
  relationship: string;
  quote: string;
  profileUrl: string;
  translated: boolean;
};

export type PortfolioContent = {
  locale: Locale;
  seo: {
    title: string;
    description: string;
  };
  navigation: Array<{ id: string; label: string }>;
  cvMenu: {
    label: string;
    compact: string;
    extended: string;
  };
  hero: {
    eyebrow: string;
    name: string;
    role: string;
    summary: string;
    location: string;
    primaryAction: string;
    secondaryAction: string;
  };
  evidenceStrip: Metric[];
  selectedWorkTitle: string;
  experienceTitle: string;
  experience: ExperienceEntry[];
  technical: {
    title: string;
    groups: Array<{ title: string; items: string[] }>;
  };
  teaching: {
    title: string;
    entries: Array<{
      heading: string;
      period: string;
      paragraphs: string[];
      proof?: string;
      link?: Link;
    }>;
  };
  publicWork: {
    title: string;
    featured: {
      label: string;
      title: string;
      copy: string;
      metric: string;
      link: Link;
    };
    channels: Array<{ name: string; metric: string; href: string }>;
  };
  awardsTitle: string;
  awards: Award[];
  recommendationsTitle: string;
  recommendations: Recommendation[];
  recommendationNote?: string;
  education: {
    title: string;
    institution: string;
    period: string;
    degree: string;
    details: string;
    thesis: string;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  contact: {
    title: string;
    copy: string;
    location: string;
    links: Link[];
  };
  footer: string;
};

export type CaseSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  subsections?: Array<{ title: string; paragraphs: string[] }>;
};

export type CaseStudy = {
  locale: Locale;
  slug: CaseSlug;
  seo: {
    title: string;
    description: string;
  };
  label: string;
  title: string;
  intro: string;
  details: Array<{ label: string; value: string }>;
  metrics?: Metric[];
  diagram: {
    variant: 'attrition' | 'observability';
    labels: string[];
    caption: string;
  };
  sections: CaseSection[];
  backLabel: string;
  adjacent: {
    label: string;
    title: string;
    href: string;
  };
};

export type CvContent = {
  locale: Locale;
  name: string;
  role: string;
  email: string;
  location: string;
  summary: string;
  links: Link[];
  skills: Array<{ title: string; items: string[] }>;
};
