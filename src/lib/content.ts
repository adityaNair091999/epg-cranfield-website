// Content access layer.
//
// Every page imports its data from here. Each function fetches from Sanity when
// a project is connected, and otherwise returns the built-in sample content —
// so the exact same page code works in both cases.

import { sanityClient, isSanityConfigured } from './sanity';
import {
  membersQuery,
  publicationsQuery,
  featuredPublicationsQuery,
  projectsQuery,
  featuredProjectsQuery,
  newsQuery,
  recentNewsQuery,
  newsPostQuery,
  opportunitiesQuery,
  siteSettingsQuery,
  homePageQuery,
  pageBannersQuery,
} from './queries';
import {
  sampleMembers,
  samplePublications,
  sampleProjects,
  sampleNews,
  sampleOpportunities,
} from './sampleData';
import type {
  Member,
  Publication,
  Project,
  NewsPost,
  Opportunity,
  SiteSettings,
  HomePage,
  PageBanners,
} from './types';

/**
 * Fetch content.
 *
 * - When a Sanity project is connected, return exactly what Sanity has —
 *   including an empty list. (We do NOT fill empty sections with placeholder
 *   sample content on a live site; that would show papers/people that don't
 *   belong to the group.)
 * - When no Sanity project is configured (local design preview), return the
 *   built-in sample content so the layout can be seen.
 */
async function load<T>(query: string, sample: T[], params?: Record<string, unknown>): Promise<T[]> {
  if (!isSanityConfigured || !sanityClient) return sample;
  try {
    return (await sanityClient.fetch<T[]>(query, params ?? {})) ?? [];
  } catch (err) {
    console.warn('[content] Sanity fetch failed:', err);
    return [];
  }
}

export const getMembers = () => load<Member>(membersQuery, sampleMembers);
export const getPublications = () => load<Publication>(publicationsQuery, samplePublications);
export const getFeaturedPublications = () =>
  load<Publication>(featuredPublicationsQuery, samplePublications.filter((p) => p.featured).slice(0, 3));
export const getProjects = () => load<Project>(projectsQuery, sampleProjects);
export const getFeaturedProjects = () =>
  load<Project>(featuredProjectsQuery, sampleProjects.filter((p) => p.featured).slice(0, 3));
export const getNews = () => load<NewsPost>(newsQuery, sampleNews);
export const getRecentNews = () => load<NewsPost>(recentNewsQuery, sampleNews.slice(0, 3));
export const getOpportunities = () => load<Opportunity>(opportunitiesQuery, sampleOpportunities);

/**
 * Site settings (menu visibility). Returns {} when Sanity isn't configured or
 * no settings document exists — so every tab shows by default (a missing/true
 * value means "visible"; only an explicit false hides a tab).
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured || !sanityClient) return {};
  try {
    return (await sanityClient.fetch<SiteSettings | null>(siteSettingsQuery)) ?? {};
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using defaults:', err);
    return {};
  }
}

/** Home page content (hero + section headings). Returns {} as a safe default. */
export async function getHomePage(): Promise<HomePage> {
  if (!isSanityConfigured || !sanityClient) return {};
  try {
    return (await sanityClient.fetch<HomePage | null>(homePageQuery)) ?? {};
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using defaults:', err);
    return {};
  }
}

/** Interior page banner text. Returns {} as a safe default. */
export async function getPageBanners(): Promise<PageBanners> {
  if (!isSanityConfigured || !sanityClient) return {};
  try {
    return (await sanityClient.fetch<PageBanners | null>(pageBannersQuery)) ?? {};
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using defaults:', err);
    return {};
  }
}

/** Single news post by slug (for the news detail page). */
export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  if (!isSanityConfigured || !sanityClient) {
    return sampleNews.find((n) => n.slug === slug) ?? null;
  }
  try {
    return (await sanityClient.fetch<NewsPost | null>(newsPostQuery, { slug })) ?? null;
  } catch (err) {
    console.warn('[content] Sanity fetch failed:', err);
    return null;
  }
}
