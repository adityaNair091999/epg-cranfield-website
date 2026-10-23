# "Sync Publications" button in Sanity Studio

A one-click button inside Studio (top bar → **Sync Publications**) that pulls new
papers from OpenAlex into Sanity. Same additive logic as the script/Action: it
**only adds** new papers, never edits or removes existing ones.

How it fits together:

```
Studio button  ──POST──▶  this Worker (holds the Sanity write token)  ──▶  Sanity
```

The write token lives **only in the Worker** (a secret), never in the browser.

## One-time setup

You need: a Sanity **Editor** token, and the Cloudflare CLI (`npx wrangler`, logged
into the account that hosts the site).

### 1. Deploy the Worker
```bash
cd worker-pubsync
npx wrangler login            # once; opens the browser (pick the account with the site)
npx wrangler deploy           # creates https://maple-pubsync.<your-subdomain>.workers.dev
```
Note the URL it prints (your subdomain is `get-fpl`, so it'll be
`https://maple-pubsync.get-fpl.workers.dev`).

### 2. Give the Worker its secrets
```bash
npx wrangler secret put SANITY_WRITE_TOKEN     # paste the Sanity Editor token
npx wrangler secret put TRIGGER_SECRET         # optional: any random string (a basic gate)
```

### 3. Point the Studio button at the Worker
In **`studio/.env`** add:
```
SANITY_STUDIO_PUBSYNC_URL=https://maple-pubsync.get-fpl.workers.dev
# only if you set TRIGGER_SECRET above:
SANITY_STUDIO_PUBSYNC_SECRET=the-same-random-string
```

### 4. Redeploy the Studio
```bash
cd studio
npx sanity deploy
```

Open the Studio → **Sync Publications** → **Check for new (dry run)** to test, then
**Sync now** to add. New papers land in the Publications list (feature/edit them
there as usual — the sync won't touch your edits).

## Notes
- `ALLOWED_ORIGIN` in `wrangler.toml` restricts calls to the Studio origin. Change
  it if your Studio URL differs.
- The action is additive + idempotent, so the secret gate is a light precaution,
  not a hard security boundary — worst case of an unauthorized trigger is a
  harmless re-sync. Tighten with Cloudflare Access later if you want.
- Prefer no Worker? The same sync also runs **daily** and via the GitHub Actions
  **Run workflow** button (see `scripts/README.md`).
