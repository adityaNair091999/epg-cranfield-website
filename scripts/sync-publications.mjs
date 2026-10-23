#!/usr/bin/env node
/**
 * CLI wrapper for the additive publication sync (see lib/sync-core.mjs).
 *
 * Adds ONLY new publications; never updates/overwrites existing ones.
 *
 * Env vars (all optional except the token to write):
 *   SANITY_WRITE_TOKEN   required to WRITE; if omitted, runs in dry-run
 *   DRY_RUN              "true" to list without writing (auto-on when no token)
 *   SANITY_PROJECT_ID / SANITY_DATASET / SANITY_API_VERSION
 *   OPENALEX_AUTHOR_ID / OPENALEX_MAILTO
 */
import { syncPublications } from './lib/sync-core.mjs';

const token = process.env.SANITY_WRITE_TOKEN || '';
const dryRun = process.env.DRY_RUN === 'true' || !token;

const res = await syncPublications({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token,
  authorId: process.env.OPENALEX_AUTHOR_ID,
  mailto: process.env.OPENALEX_MAILTO,
  dryRun,
}).catch((e) => {
  console.error('[sync] ERROR:', e.message || e);
  process.exit(1);
});

console.log(`[sync] existing=${res.existing} openalex=${res.fetched} dryRun=${res.dryRun}`);
if (res.migrated.length) {
  console.log(`[sync] ${res.dryRun ? 'would make visible' : 'made visible'}: ${res.migrated.length} hidden publication(s)`);
  for (const m of res.migrated) console.log(`   ~ ${m.from} -> ${m.to}  ${(m.title || '').slice(0, 70)}`);
}
console.log(`[sync] ${res.dryRun ? 'would add' : 'added'}: ${res.added.length} publication(s)`);
for (const a of res.added) console.log(`   + ${a.year || '----'}  ${a.title.slice(0, 90)}`);
if (res.dryRun) {
  console.log(token
    ? '[sync] DRY RUN — nothing written (untick "dry run" to apply).'
    : '[sync] DRY RUN — nothing written. Set SANITY_WRITE_TOKEN to apply.');
}
