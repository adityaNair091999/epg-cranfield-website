import { createClient, type SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

/**
 * Sanity connection.
 *
 * Reads configuration from environment variables. To be robust across local
 * development and the host, we look each value up under several names and in both
 * Astro's `import.meta.env` (used locally, from the .env file) and `process.env`
 * (used by hosts like Cloudflare, which inject dashboard variables into the build):
 *
 *   Project ID : PUBLIC_SANITY_PROJECT_ID  or  SANITY_PROJECT_ID
 *   Dataset    : PUBLIC_SANITY_DATASET      or  SANITY_DATASET     (default: production)
 *   API version: PUBLIC_SANITY_API_VERSION  or  SANITY_API_VERSION (default: 2024-01-01)
 *   Read token : SANITY_API_TOKEN           or  SANITY_READ_TOKEN  (optional, server-only)
 *
 * If the project ID is not set, `sanityClient` is null and the site falls back
 * to the built-in sample content in `sampleData.ts`.
 */
const meta = import.meta.env as Record<string, string | undefined>;
const proc = (((globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
  .process?.env) ?? {}) as Record<string, string | undefined>;

function readEnv(...keys: string[]): string {
  for (const key of keys) {
    const value = meta[key] ?? proc[key];
    if (value && value.trim()) return value.trim();
  }
  return '';
}

export const projectId = readEnv('PUBLIC_SANITY_PROJECT_ID', 'SANITY_PROJECT_ID');
export const dataset = readEnv('PUBLIC_SANITY_DATASET', 'SANITY_DATASET') || 'production';
export const apiVersion =
  readEnv('PUBLIC_SANITY_API_VERSION', 'SANITY_API_VERSION') || '2024-01-01';

// Optional read token. Never referenced by client-side code, so it is not
// bundled to the browser — it is only used for the build-time fetch. Needed only
// if the dataset is set to "private"; a public dataset reads without it.
const token = readEnv('SANITY_API_TOKEN', 'SANITY_READ_TOKEN') || undefined;

// Read FRESH (uncached) data at build time so the site always reflects the very
// latest published content. Sanity's CDN can lag for a short window after a
// publish, and the auto-rebuild (triggered on publish) could read that stale
// cache — which caused a just-added item (e.g. a 4th news post) to be missing
// from the built site. Since we only fetch at build time, not per visitor, the
// CDN gives no real benefit here. Opt back in with PUBLIC_SANITY_USE_CDN=true.
const useCdn = readEnv('PUBLIC_SANITY_USE_CDN') === 'true' && !token;

export const isSanityConfigured = projectId.length > 0;

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({ projectId, dataset, apiVersion, useCdn, token })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Build an image URL from a Sanity image reference. Returns '' if unavailable. */
export function urlForImage(source: unknown): string {
  if (!builder || !source) return '';
  try {
    return builder.image(source as never).auto('format').fit('max').url();
  } catch {
    return '';
  }
}

/**
 * Optimise a Sanity CDN image URL: resize to the width actually displayed and
 * auto-convert to a modern format (WebP/AVIF). Turns multi-MB originals into
 * tens of KB — huge bandwidth saving and faster loads. Non-Sanity URLs (local
 * placeholders) are returned unchanged.
 */
export function cdnImg(url: string | undefined, width: number, quality = 72): string {
  if (!url) return '';
  if (!url.includes('cdn.sanity.io')) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}w=${width}&auto=format&fit=max&q=${quality}`;
}
