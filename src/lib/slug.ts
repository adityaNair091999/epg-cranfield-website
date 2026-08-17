/** Turn a string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** A project's page slug — its Sanity slug if set, otherwise derived from title. */
export function projectSlug(p: { slug?: string; title: string }): string {
  return p.slug || slugify(p.title);
}

/**
 * A news post's page slug. Uses the Sanity slug only if it's a clean URL segment
 * (letters/numbers/hyphens). If the slug is missing or contains anything else —
 * e.g. someone pasted a DOI URL like "https://doi.org/10.1016/..." into the slug
 * field — it falls back to a slug derived from the title. This keeps a single bad
 * slug from crashing the whole build with "Missing parameter: slug".
 */
export function newsSlug(post: { slug?: string; title: string }): string {
  const s = (post.slug ?? '').trim();
  return s && /^[a-zA-Z0-9-]+$/.test(s) ? s : slugify(post.title);
}
