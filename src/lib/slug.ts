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
