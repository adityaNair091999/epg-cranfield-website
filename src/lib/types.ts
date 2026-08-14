// Shared content types used across pages and components.
// These shapes are what every page receives, whether the data comes from a live
// Sanity project or from the built-in sample content.

export interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  style?: 'normal' | 'h2' | 'h3' | 'blockquote';
  listItem?: 'bullet' | 'number';
  children: PortableTextSpan[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
}

export type PortableText = PortableTextBlock[];

export interface Member {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  email: string;
  linkedin?: string;
  googleScholar?: string;
  startYear?: number;
  current: boolean;
}

export interface Publication {
  _id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  abstract?: string;
  bibtex?: string;
  featured: boolean;
}

export interface MediaItem {
  _type: 'image' | 'videoEmbed';
  _key?: string;
  imageUrl?: string; // present for image items
  url?: string; // present for videoEmbed items (YouTube/Vimeo link)
  caption?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug?: string;
  description: string;
  imageUrl: string;
  status: 'ongoing' | 'completed';
  body?: PortableText;
  gallery?: MediaItem[];
  relatedPublications: Array<Pick<Publication, '_id' | 'title' | 'year' | 'doi'>>;
  featured: boolean;
}

export interface NewsPost {
  _id: string;
  title: string;
  date: string;
  slug: string;
  imageUrl?: string;
  body: PortableText;
}

export interface SiteSettings {
  // brand
  groupName?: string;
  groupShortName?: string;
  university?: string;
  navCtaLabel?: string;
  navCtaLink?: string;
  // contact / footer
  addressLines?: string[];
  email?: string;
  phone?: string;
  groupLeadName?: string;
  groupLeadRole?: string;
  charityLine?: string;
  mapEmbedUrl?: string;
  // menu toggles
  showResearch?: boolean;
  showPublications?: boolean;
  showMembers?: boolean;
  showNews?: boolean;
  showOpportunities?: boolean;
  showContact?: boolean;
}

export interface HomePage {
  heroEyebrow?: string;
  heroHeading?: string;
  heroTagline?: string;
  heroPrimaryLabel?: string;
  heroPrimaryLink?: string;
  heroSecondaryLabel?: string;
  heroSecondaryLink?: string;
  heroImageUrl?: string;
  heroVideoUrl?: string;
  heroCaption?: string;
  videosEyebrow?: string;
  videosTitle?: string;
  videos?: Array<{
    _key?: string;
    url?: string;
    title?: string;
    description?: string;
    projectLink?: string;
    papers?: Array<{ _key?: string; label?: string; url?: string }>;
    caption?: string;
  }>;
  researchEyebrow?: string;
  researchTitle?: string;
  newsEyebrow?: string;
  newsTitle?: string;
  publicationsEyebrow?: string;
  publicationsTitle?: string;
  teamEyebrow?: string;
  teamTitle?: string;
}

/** Per-page banner text; keys like researchTitle, researchIntro, researchEyebrow. */
export type PageBanners = Record<string, string | undefined>;

export interface Opportunity {
  _id: string;
  title: string;
  type: 'PhD' | 'Postdoc' | 'Other';
  description: PortableText;
  deadline?: string;
  howToApply: string;
  open: boolean;
}
