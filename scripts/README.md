# Publication auto-sync (OpenAlex → Sanity)

`sync-publications.mjs` adds **new** publications to Sanity from
[OpenAlex](https://openalex.org) (which holds Dr. Huang's full published record).

**It only ever ADDS.** It never updates or overwrites existing entries, so any
manual corrections (authors, venue, `featured`, abstract…) are safe. Re-running
is harmless — it adds nothing already present.

> Google Scholar has no API and can't be scraped reliably, so OpenAlex is used
> instead. New papers can appear on Scholar a week or two before OpenAlex.

## What counts as "new"
A work from OpenAlex is added only if it is **not already in Sanity** (matched by
DOI, else by title) **and** is a journal article, review article, or conference
paper. Book chapters, the lab book, course notes/reports and other grey literature
are deliberately skipped (see `ALLOWED_TYPES` in the script).

## Run it manually

```bash
# Dry run — lists what WOULD be added, writes nothing (no token needed):
DRY_RUN=true node scripts/sync-publications.mjs

# Apply for real — needs a Sanity write token:
SANITY_WRITE_TOKEN=sk_your_editor_token node scripts/sync-publications.mjs
```

Create the token at **sanity.io/manage → project → API → Tokens** (role: **Editor**).

## Run it automatically
`.github/workflows/sync-publications.yml` runs this **monthly** (and on demand via
the Actions tab). It needs one repository secret:

1. Create a Sanity **Editor** token (as above).
2. GitHub repo → **Settings → Secrets and variables → Actions → New repository
   secret** → name `SANITY_WRITE_TOKEN`, paste the token.

The manual "Run workflow" button defaults to **dry run**; untick it to apply.

New entries created this way are plain (title, authors, journal, year, DOI,
abstract) and `featured: false` — edit/feature them in Studio afterwards; the sync
will never undo those edits.

## Config (env vars, all optional)
| Var | Default |
|---|---|
| `OPENALEX_AUTHOR_ID` | `A5088146862` (Dr. Luofeng Huang) |
| `SANITY_PROJECT_ID` | `7hpg0m0e` |
| `SANITY_DATASET` | `production` |
| `OPENALEX_MAILTO` | `luofeng.huang@cranfield.ac.uk` |
