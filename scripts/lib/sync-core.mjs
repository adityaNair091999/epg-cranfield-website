/**
 * Additive publication sync core (OpenAlex -> Sanity), dependency-free.
 *
 * Uses only `fetch`, so it runs unchanged in Node 18+ AND in a Cloudflare Worker.
 * Adds ONLY new publications; never updates/overwrites existing ones. Idempotent
 * (deterministic _id + createIfNotExists). Requires a DOI, which avoids the
 * DOI-less repository copies OpenAlex returns that duplicate real papers.
 */

const ALLOWED_TYPES = new Set(['article', 'review', 'proceedings-article']);
const norm = (s) => (s || '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '');
const normDoi = (d) => (d || '').toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, '').trim();

function reconstructAbstract(inv) {
  if (!inv) return '';
  const words = [];
  for (const [w, positions] of Object.entries(inv)) for (const p of positions) words[p] = w;
  return words.join(' ').replace(/\s+/g, ' ').trim();
}

async function sanityQuery({ projectId, dataset, apiVersion }, query) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`
    + `?query=${encodeURIComponent(query)}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Sanity query failed: ${r.status}`);
  return (await r.json()).result;
}

async function sanityMutate({ projectId, dataset, apiVersion, token }, mutations) {
  const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations }),
  });
  if (!r.ok) throw new Error(`Sanity mutate failed: ${r.status} ${await r.text()}`);
  return r.json();
}

async function fetchOpenAlexWorks(authorId, mailto) {
  const works = [];
  let cursor = '*';
  while (cursor) {
    const url = `https://api.openalex.org/works?filter=author.id:${authorId}`
      + `&per-page=200&cursor=${encodeURIComponent(cursor)}&mailto=${encodeURIComponent(mailto)}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`OpenAlex request failed: ${r.status}`);
    const j = await r.json();
    works.push(...(j.results || []));
    cursor = j.meta?.next_cursor;
    if (!j.results?.length) break;
  }
  return works;
}

/**
 * @returns {Promise<{existing:number, fetched:number, added:Array<{title:string,year:number}>, dryRun:boolean}>}
 */
export async function syncPublications(opts = {}) {
  const cfg = {
    projectId: opts.projectId || '7hpg0m0e',
    dataset: opts.dataset || 'production',
    apiVersion: opts.apiVersion || '2024-01-01',
    token: opts.token || '',
  };
  const authorId = opts.authorId || 'A5088146862';
  const mailto = opts.mailto || 'luofeng.huang@cranfield.ac.uk';
  const dryRun = opts.dryRun ?? !cfg.token;

  const existing = await sanityQuery(cfg, `*[_type == "publication"]{ _id, doi, title }`);
  const existDoi = new Set(existing.map((p) => normDoi(p.doi)).filter(Boolean));
  const existTitle = new Set(existing.map((p) => norm(p.title)).filter(Boolean));

  const works = await fetchOpenAlexWorks(authorId, mailto);

  const toCreate = [];
  const seenDoi = new Set();
  const seenTitle = new Set();
  for (const w of works) {
    if (!ALLOWED_TYPES.has(w.type)) continue;
    const title = (w.display_name || w.title || '').trim();
    if (!title) continue;
    const doi = normDoi(w.doi);
    if (!doi) continue; // require a DOI (skips repository/grey-lit duplicates)
    const t = norm(title);
    if (existDoi.has(doi) || existTitle.has(t) || seenDoi.has(doi) || seenTitle.has(t)) continue;
    seenDoi.add(doi);
    seenTitle.add(t);

    toCreate.push({
      _id: `pub.oa.${(w.id || '').replace(/^https?:\/\/openalex\.org\//, '')}`,
      _type: 'publication',
      title,
      authors: (w.authorships || []).map((a) => a.author?.display_name).filter(Boolean),
      journal: w.primary_location?.source?.display_name || w.host_venue?.display_name || '',
      year: w.publication_year || null,
      doi: w.doi || undefined,
      abstract: reconstructAbstract(w.abstract_inverted_index) || undefined,
      featured: false,
    });
  }

  const result = {
    existing: existing.length,
    fetched: works.length,
    added: toCreate.map((c) => ({ title: c.title, year: c.year })),
    dryRun,
  };

  if (dryRun || !toCreate.length) return result;
  await sanityMutate(cfg, toCreate.map((doc) => ({ createIfNotExists: doc })));
  return result;
}
