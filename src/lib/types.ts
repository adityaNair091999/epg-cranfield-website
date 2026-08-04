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

export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: 'ongoing' | 'completed';
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
  showResearch?: boolean;
  showPublications?: boolean;
  showMembers?: boolean;
  showNews?: boolean;
  showOpportunities?: boolean;
  showContact?: boolean;
}

export interface Opportunity {
  _id: string;
  title: string;
  type: 'PhD' | 'Postdoc' | 'Other';
  description: PortableText;
  deadline?: string;
  howToApply: string;
  open: boolean;
}
