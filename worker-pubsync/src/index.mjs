// Cloudflare Worker: runs the additive publication sync on demand.
// The "Sync publications" tool in Sanity Studio POSTs here.
//
// The Sanity write token lives here as a Worker secret (SANITY_WRITE_TOKEN),
// so it is never exposed in the browser/Studio bundle.
//
// POST /          -> sync and add new papers
// POST /?dry=1    -> dry run (list only, writes nothing)
import { syncPublications } from '../../scripts/lib/sync-core.mjs';

export default {
  async fetch(request, env) {
    const cors = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Sync-Secret',
      'Access-Control-Max-Age': '86400',
    };
    const json = (body, status = 200) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405);

    // Optional shared-secret gate (set TRIGGER_SECRET to enable).
    if (env.TRIGGER_SECRET && request.headers.get('X-Sync-Secret') !== env.TRIGGER_SECRET) {
      return json({ error: 'Unauthorized.' }, 401);
    }
    if (!env.SANITY_WRITE_TOKEN) {
      return json({ error: 'Worker is missing SANITY_WRITE_TOKEN secret.' }, 500);
    }

    const dryRun = new URL(request.url).searchParams.get('dry') === '1';
    try {
      const result = await syncPublications({ token: env.SANITY_WRITE_TOKEN, dryRun });
      return json(result);
    } catch (e) {
      return json({ error: String(e?.message || e) }, 500);
    }
  },
};
