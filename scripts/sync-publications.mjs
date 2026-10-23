#!/usr/bin/env node
/**
 * Additive publication sync: OpenAlex -> Sanity.
 *
 * Adds ONLY new publications. It NEVER updates or overwrites existing ones, so
 * any manual corrections (authors, venue, featured flag, etc.) are preserved.
 * Idempotent: re-running adds nothing new (deterministic _id + createIfNotExists).
 *
 * Google Scholar has no API and can't be scraped reliably, so this uses OpenAlex
 * (free, no key) which holds the author's full published record.
 *
 * Env vars:
 *   SANITY_PROJECT_ID    (default 7hpg0m0e)
 *   SANITY_DATASET       (default production)
 *   SANITY_API_VERSION   (default 2024-01-01)
 *   SANITY_WRITE_TOKEN   required to WRITE; if omitted, runs in dry-run
 *   OPENALEX_AUTHOR_ID   (default A5088146862 — Dr. Luofeng Huang)
 *   OPENALEX_MAILTO      polite-pool contact (default luofeng.huang@cranfield.ac.uk)
 *   DRY_RUN              "true" to list without writing (auto-on when no token)
 */
import { createClient } from '@sanity/client';

const projectId = process.env.SANITY_PROJECT_ID || '7hpg0m0e';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = process.env.SANITY_API_VERSION || '2024-01-01';
const token = process.env.SANITY_WRITE_TOKEN || '';
const authorId = process.env.OPENALEX_AUTHOR_ID || 'A5088146862';
const mailto = process.env.OPENALEX_MAILTO || 'luofeng.huang@cranfield.ac.uk';
const dryRun = process.env.DRY_RUN === 'true' || !token;

// Publication types to include: journal articles, review articles and conference
// papers. Deliberately EXCLUDES book / book-chapter (the lab's book is one manual
// entry — we don't want its 7 chapters as separate rows), reports / course notes
// (grey literature), and all the other noise OpenAlex returns (preprint, dataset,
// erratum, editorial, letter, peer-review, paratext, ...).
const ALLOWED_TYPES = new Set(['article', 'review', 'proceedings-article']);

const norm = (s) => (s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '');
const normDoi = (d) => (d || '').toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '').trim();

/** Rebuild a readable abstract from OpenAlex's inverted index. */
function reconstructAbstract(inv) {
  if (!inv) return '';
  const words = [];
  for (const [w, positions] of Object.entries(inv)) for (const p of positions) words[p] = w;
  return words.join(' ').replace(/\s+/g, ' ').trim();
}

async function fetchOpenAlexWorks() {
  const works = [];
  let cursor = '*';
  while (cursor) {
    const url = `https://api.openalex.org/works?filter=author.id:${authorId}`
      + `&per-page=200&cursor=${encodeURIComponent(cursor)}&mailto=${encodeURIComponent(mailto)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OpenAlex request failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    works.push(...(json.results || []));
    cursor = json.meta?.next_cursor;
    if (!json.results?.length) break;
  }
  return works;
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

async function main() {
  console.log(`[sync] project=${projectId} dataset=${dataset} author=${authorId} dryRun=${dryRun}`);

  // Existing publications — used for de-duplication. We only READ here.
  const existing = await client.fetch(`*[_type == "publication"]{ _id, doi, title }`);
  const existDoi = new Set(existing.map((p) => normDoi(p.doi)).filter(Boolean));
  const existTitle = new Set(existing.map((p) => norm(p.title)).filter(Boolean));
  console.log(`[sync] existing publications in Sanity: ${existing.length}`);

  const works = await fetchOpenAlexWorks();
  console.log(`[sync] OpenAlex works returned: ${works.length}`);

  const toCreate = [];
  const seenDoi = new Set();
  const seenTitle = new Set();
  for (const w of works) {
    if (!ALLOWED_TYPES.has(w.type)) continue;
    const title = (w.display_name || w.title || '').trim();
    if (!title) continue;
    const doi = normDoi(w.doi);
    // Require a DOI. Real journal/conference papers have one; the DOI-less
    // records OpenAlex returns are repository copies / grey literature that
    // duplicate a real (DOI'd) paper, often under a slightly different title —
    // which would otherwise slip past title de-dup and create a duplicate.
    if (!doi) continue;
    const tnorm = norm(title);

    // Skip anything already in Sanity (by DOI, else by title) — never touch it.
    if (doi && existDoi.has(doi)) continue;
    if (existTitle.has(tnorm)) continue;
    // Skip duplicates within this same OpenAlex batch (e.g. preprint + published).
    if ((doi && seenDoi.has(doi)) || seenTitle.has(tnorm)) continue;
    seenDoi.add(doi);
    seenTitle.add(tnorm);

    const authors = (w.authorships || []).map((a) => a.author?.display_name).filter(Boolean);
    const journal = w.primary_location?.source?.display_name || w.host_venue?.display_name || '';
    const idSuffix = (w.id || '').replace(/^https?:\/\/openalex\.org\//, '');

    toCreate.push({
      _id: `pub.oa.${idSuffix}`,
      _type: 'publication',
      title,
      authors,
      journal,
      year: w.publication_year || null,
      doi: w.doi || undefined,
      abstract: reconstructAbstract(w.abstract_inverted_index) || undefined,
      featured: false,
    });
  }

  console.log(`[sync] NEW publications to add: ${toCreate.length}`);
  for (const c of toCreate) console.log(`   + ${c.year || '----'}  ${c.title.slice(0, 90)}`);

  if (dryRun) {
    console.log('[sync] DRY RUN — nothing written. Set SANITY_WRITE_TOKEN to apply.');
    return;
  }
  if (!toCreate.length) {
    console.log('[sync] up to date — nothing to add.');
    return;
  }

  // createIfNotExists = additive + idempotent. No patch/replace of existing docs.
  let tx = client.transaction();
  for (const doc of toCreate) tx = tx.createIfNotExists(doc);
  await tx.commit();
  console.log(`[sync] created ${toCreate.length} new publication(s).`);
}

main().catch((e) => {
  console.error('[sync] ERROR:', e.message || e);
  process.exit(1);
});
