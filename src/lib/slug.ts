/** Turn a string into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Normalise an internal link to the page's official address, which always ends
 * in "/" (e.g. "/news" -> "/news/", "/research#x" -> "/research/#x"). Pages are
 * served from "/news/"; "/news" only redirects there, and links to the
 * redirecting form make Google treat the two as duplicates. External links,
 * anchors and file links (anything with a "." in the last segment) are returned
 * unchanged, so links typed into Sanity can use either form.
 */
export function pageHref(href: string): string;
export function pageHref(href: string | undefined): string | undefined;
export function pageHref(href: string | undefined): string | undefined {
  if (!href || !href.startsWith('/') || href.startsWith('//')) return href;
  const m = href.match(/^([^?#]*)(.*)$/)!;
  const [path, rest] = [m[1], m[2]];
  const last = path.split('/').pop() ?? '';
  if (path.endsWith('/') || last.includes('.')) return href;
  return `${path}/${rest}`;
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

/**
 * The external link for a news post (e.g. a paper DOI), or undefined.
 * Prefers the dedicated `link` field, but also falls back to the slug when a DOI
 * URL was pasted there — so the existing "published a paper" posts get a working
 * "Read the paper" link without needing to be re-entered.
 */
export function newsLink(post: { link?: string; slug?: string }): string | undefined {
  if (post.link && post.link.trim()) return post.link.trim();
  const s = (post.slug ?? '').trim();
  return /^https?:\/\//i.test(s) ? s : undefined;
}
