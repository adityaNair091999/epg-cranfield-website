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
} from './types';

/**
 * Fetch from Sanity if configured; otherwise return the sample fallback.
 * If a live fetch returns nothing (empty dataset), the sample is used so the
 * page never looks broken.
 */
async function load<T>(query: string, sample: T[], params?: Record<string, unknown>): Promise<T[]> {
  if (!isSanityConfigured || !sanityClient) return sample;
  try {
    const result = await sanityClient.fetch<T[]>(query, params ?? {});
    return result && result.length > 0 ? result : sample;
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using sample content:', err);
    return sample;
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

/** Single news post by slug (for the news detail page). */
export async function getNewsPost(slug: string): Promise<NewsPost | null> {
  if (!isSanityConfigured || !sanityClient) {
    return sampleNews.find((n) => n.slug === slug) ?? null;
  }
  try {
    const post = await sanityClient.fetch<NewsPost | null>(newsPostQuery, { slug });
    return post ?? sampleNews.find((n) => n.slug === slug) ?? null;
  } catch (err) {
    console.warn('[content] Sanity fetch failed, using sample content:', err);
    return sampleNews.find((n) => n.slug === slug) ?? null;
  }
}
