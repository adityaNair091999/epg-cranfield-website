#!/usr/bin/env node
/**
 * One-off content migration: rename the group to "MAPLE Research Group" in
 * Sanity content (Site Settings, Home Page small line, Page Banner intros, one
 * news post). The Home Page main heading is deliberately left as the full name.
 *
 * Safe by design:
 *   - Touches only the exact fields listed in CHANGES.
 *   - Only changes a field if it still contains the expected old text
 *     (anything edited by hand since is left alone and reported).
 *   - Idempotent: already-renamed fields are skipped.
 *   - Also patches an unpublished draft of the same document, if one exists,
 *     so publishing that draft later doesn't bring the old text back.
 *   - Dry run unless DRY_RUN=false.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=... node scripts/migrations/maple-research-group.mjs            # dry run
 *   SANITY_WRITE_TOKEN=... DRY_RUN=false node scripts/migrations/maple-research-group.mjs
 */

const projectId = process.env.SANITY_PROJECT_ID || '7hpg0m0e';
const dataset = process.env.SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';
const token = process.env.SANITY_WRITE_TOKEN || '';
const dryRun = process.env.DRY_RUN !== 'false';

// get = GROQ path to read the current value; set = Sanity patch path to write it.
const CHANGES = [
  {
    label: 'Site Settings → Group name (header + footer)',
    id: 'siteSettings', get: 'groupName', set: 'groupName',
    from: 'Marine AI and Process Laboratory for Energy', to: 'MAPLE Research Group',
  },
  {
    label: 'Home Page → Small line above heading',
    id: 'homePage', get: 'heroEyebrow', set: 'heroEyebrow',
    from: 'MAPLE', to: 'MAPLE Research Group',
  },
  {
    label: 'Page Banners → News intro',
    id: 'pageBanners', get: 'newsIntro', set: 'newsIntro',
    replace: ['the MAPLE group', 'the MAPLE Research Group'],
  },
  {
    label: 'Page Banners → Opportunities intro',
    id: 'pageBanners', get: 'opportunitiesIntro', set: 'opportunitiesIntro',
    replace: ['the MAPLE group', 'the MAPLE Research Group'],
  },
  {
    label: 'News post "Congratulations to Dr Danlei Yang…" → body',
    id: 'b8e3ac7c-5a46-45d9-96c7-9d7a7bf07c83',
    get: 'body[_key=="deea7aa70ff9"][0].children[_key=="272d549c4d89"][0].text',
    set: 'body[_key=="deea7aa70ff9"].children[_key=="272d549c4d89"].text',
    replace: ['the MAPLE group', 'the MAPLE Research Group'],
  },
];

const base = `https://${projectId}.api.sanity.io/v${apiVersion}/data`;
const auth = { Authorization: `Bearer ${token}` };

async function query(groq, params = {}) {
  const qs = new URLSearchParams({ query: groq });
  for (const [k, v] of Object.entries(params)) qs.set(`$${k}`, JSON.stringify(v));
  const r = await fetch(`${base}/query/${dataset}?${qs}`, { headers: auth });
  if (!r.ok) throw new Error(`Sanity query failed: ${r.status} ${await r.text()}`);
  return (await r.json()).result;
}

async function mutate(mutations) {
  const r = await fetch(`${base}/mutate/${dataset}`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ mutations }),
  });
  if (!r.ok) throw new Error(`Sanity mutate failed: ${r.status} ${await r.text()}`);
  return r.json();
}

function newValue(change, current) {
  if (change.from !== undefined) {
    if (current === change.to) return { skip: 'already done' };
    if (current !== change.from) return { skip: `unexpected current text, left alone: "${current}"` };
    return { value: change.to };
  }
  const [oldText, newText] = change.replace;
  if (typeof current !== 'string') return { skip: 'field not found' };
  if (!current.includes(oldText)) {
    return { skip: current.includes(newText) ? 'already done' : `old text not found, left alone: "${current}"` };
  }
  return { value: current.split(oldText).join(newText) };
}

async function main() {
  if (!token) throw new Error('SANITY_WRITE_TOKEN is required (it is also needed to read drafts).');
  console.log(`[migrate] maple-research-group  dataset=${dataset}  dryRun=${dryRun}\n`);

  const mutations = [];
  for (const change of CHANGES) {
    for (const id of [change.id, `drafts.${change.id}`]) {
      const exists = await query('count(*[_id == $id])', { id });
      if (!exists) continue;
      const current = await query(`*[_id == $id][0].${change.get}`, { id });
      const res = newValue(change, current);
      const tag = id.startsWith('drafts.') ? ' (draft)' : '';
      if (res.skip) {
        console.log(`  - ${change.label}${tag}: skipped — ${res.skip}`);
        continue;
      }
      console.log(`  ✎ ${change.label}${tag}\n      before: ${current}\n      after:  ${res.value}`);
      mutations.push({ patch: { id, set: { [change.set]: res.value } } });
    }
  }

  console.log(`\n[migrate] ${mutations.length} field change(s) ${dryRun ? 'would be made' : 'to apply'}.`);
  if (dryRun) {
    console.log('[migrate] DRY RUN — nothing written. Run with DRY_RUN=false to apply.');
    return;
  }
  if (mutations.length) {
    await mutate(mutations);
    console.log('[migrate] applied.');
  }
}

main().catch((e) => {
  console.error('[migrate] ERROR:', e.message || e);
  process.exit(1);
});
