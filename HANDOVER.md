# Handover — MAPLE Research Group website

Everything someone needs to take over **www.maple-research.uk**, and what the
current maintainer (Aditya Nair) must do before leaving Cranfield.

For day-to-day editing (adding members, papers, news), see **Part B of
[README.md](README.md)**. This document covers the accounts, settings and
automations behind the site.

---

## 1. How it fits together

```
 Editors ──Publish──▶ Sanity (content) ──webhook──▶ Cloudflare deploy hook
                                                          │
 Developer ──push to main──▶ GitHub ──────────────────────┤
                                                          ▼
                                   Cloudflare Workers Builds (npm run build)
                                                          │
                                                          ▼
                                   www.maple-research.uk  (static site)

 GitHub Actions (daily 03:00 UTC) ──▶ OpenAlex ──▶ adds NEW papers to Sanity
 Contact form ──▶ Web3Forms ──▶ email inbox
```

- The site is **static**: pages are built from Sanity content at build time.
  Publishing in Sanity triggers a rebuild (about 1–2 minutes).
- There is **no server, database or PHP** to maintain.

---

## 2. Everything the site depends on

| Service | Used for | Manage at | Currently owned by |
| --- | --- | --- | --- |
| **Domain** `maple-research.uk` | The web address | Cloudflare → Domain Registration | Live Cloudflare account; renews yearly (~£5) on Aditya's card; registrant contact = Aditya's Gmail |
| **Cloudflare** (live account, Workers subdomain `get-fpl`) | Hosting, DNS, HTTPS, builds, deploy hook | dash.cloudflare.com → Workers & Pages → `epg-cranfield-website` | Aditya's personal Gmail login |
| **GitHub** | Code, publication-sync job, secrets | github.com/adityaNair091999/epg-cranfield-website | Aditya's personal GitHub |
| **Sanity** (project ID `7hpg0m0e`, Studio `energy-power-cranfield.sanity.studio`) | All content + the editor | sanity.io/manage | Aditya; organisation "Marine AI and Process Laboratory for Energy" is on a **trial ending ~21 Nov 2026** |
| **Web3Forms** | Delivers contact-form messages by email | web3forms.com dashboard | Aditya's email account |
| **Google Search Console** | Google indexing, sitemap | search.google.com/search-console (property `maple-research.uk`) | Aditya's Google account |
| **Cloudflare Web Analytics** | Visitor statistics | The tracker token in `src/layouts/Base.astro` | An **older** Cloudflare account (not the live one) |
| **YouTube** | Gallery videos (embedded links) | YouTube Studio | Whoever uploaded each video — check each gallery link |

Other Cloudflare accounts existed during setup (subdomains `aditya-nair-817` and
`aditya-nair2-817`). They no longer host anything. **Only the `get-fpl` account
matters.** Netlify was used briefly and has been deleted.

---

## 3. Key settings (enough to recreate anything)

### Cloudflare — Worker `epg-cranfield-website` (live account)
- **Settings → Build:** repository `adityaNair091999/epg-cranfield-website`,
  production branch `main`, build `npm run build`, deploy `npx wrangler deploy`,
  root `/`. **Builds for preview branches: on.**
- **API token** (on *both* the Production and Previews Base tabs): the
  "Workers Builds" token. It must include **Account.Artifacts** permissions,
  because **Build cache** is on; an older token without them made builds fail.
- **Variables:** `PUBLIC_SANITY_PROJECT_ID` = `7hpg0m0e`,
  `PUBLIC_SANITY_DATASET` = `production`, `PUBLIC_SANITY_API_VERSION` =
  `2024-01-01`, `PUBLIC_WEB3FORMS_ACCESS_KEY` = the Web3Forms key.
- **Deploy hook:** "Sanity publish", branch `main` (its URL is in the Sanity
  webhook; treat it like a password).
- **Domains:** `www.maple-research.uk` (the official address) and
  `maple-research.uk`.

### Cloudflare — domain `maple-research.uk`
- **SSL/TLS → Edge Certificates → Always Use HTTPS: on** (http → https).
- **DNS:** keep the `google-site-verification=…` **TXT** record. Deleting it
  removes Search Console access.

### Sanity (sanity.io/manage → project)
- **API → Webhooks → "Rebuild site on publish":** URL = the Cloudflare deploy
  hook, dataset `production`, triggers **Create, Update, Delete**, method POST,
  **Drafts off**.
- **API → Tokens:** "Publication Sync" (**Editor**) is used by GitHub Actions.
  "Netlify read" (Viewer) is an unused leftover and can be deleted.
- **Schema changes** (fields in `studio/schemaTypes/`) only reach the editor
  after `npx sanity deploy` is run from the `studio/` folder.

### GitHub
- **Secret** `SANITY_WRITE_TOKEN` = the Sanity "Publication Sync" token.
- **Workflow** `.github/workflows/sync-publications.yml` (see §4).

### Search engines
- `public/robots.txt` points to `/sitemap-index.xml`, which is generated on every
  build and lists every page at its official `https://www.maple-research.uk/…/`
  address. It has been submitted in Search Console.
- Every page has a canonical tag and all internal links end in `/`, so Google
  doesn't treat `/news` and `/news/` as duplicates.

---

## 4. Automations — what runs on its own, and how to check it

| What | When | Check it at |
| --- | --- | --- |
| Rebuild after **Publish** in Sanity | Every publish (~1–2 min) | Cloudflare → project → **Deployments** |
| Deploy after a **code change** | Every push / merge to `main` | Cloudflare → **Deployments** |
| **Preview** link for a pull request | Every PR (Cloudflare comments the link) | The PR page on GitHub |
| **Publication sync** (OpenAlex → Sanity) | Daily 03:00 UTC, or manually | GitHub → **Actions** → *Sync publications* |

The **publication sync** only *adds* papers that are missing from the site.
They must have a DOI and be a journal article, review or conference paper. It
**never edits or deletes** existing entries, so manual corrections are safe. To
run it now, open **Actions → Sync publications → Run workflow** and untick *dry
run*. Details: [scripts/README.md](scripts/README.md).

---

## 5. How to hand each piece over

**Do this first:** get a **shared group email address** (ask Cranfield IT for a
group mailbox) and use it as the new owner everywhere. Then nothing depends on
one person again.

1. **Cloudflare (hosting + domain).** Manage Account → **Members** → invite the
   group email as **Super Administrator**. In **Domain Registration →
   maple-research.uk**, change the **contact email** to the group email. In
   **Billing**, add a **group or department payment method**, or the domain
   lapses when the current card does.
2. **GitHub (code).** Create a GitHub **Organization** for the group → in the
   repo, **Settings → Transfer ownership** to it. Afterwards:
   - in Cloudflare → **Settings → Build → Git repository → Manage**, reconnect
     the repository at its new location;
   - in **Settings → Secrets and variables → Actions**, confirm
     `SANITY_WRITE_TOKEN` is still there (re-add it if not).
3. **Sanity (content).** sanity.io/manage → **Members** → invite the group email
   as **Administrator**. **Before the trial ends (~21 Nov 2026)**, check what the
   Free plan includes (Billing / Plan) and choose a plan.
4. **Web3Forms (contact form).** Either change the **recipient email** in the
   Web3Forms dashboard (no code change), or create a new access key under the
   group email and replace `PUBLIC_WEB3FORMS_ACCESS_KEY` in Cloudflare →
   Variables (then redeploy).
5. **Google Search Console.** Settings → **Users and permissions** → add the
   group email as **Owner**.
6. **YouTube.** Any gallery video on a personal channel: move or re-upload it to a group channel, then update
   the links in Sanity → **Home Page → Gallery**.
7. **Web Analytics.** In the live Cloudflare account, **Web Analytics → Add a
   site** → copy its token → replace the token in `src/layouts/Base.astro`.

---

## 6. Before-I-leave checklist

- [ ] Group email created and used as the new owner everywhere below
- [ ] Cloudflare: group email is **Super Administrator**
- [ ] Domain: contact email + **renewal payment** moved to the group/department
- [ ] GitHub: repo transferred (or group added as owner); Cloudflare Git
      connection and `SANITY_WRITE_TOKEN` checked afterwards
- [ ] Sanity: group email is **Administrator**; plan decided before the trial ends
- [ ] Web3Forms: messages go to the group inbox
- [ ] Search Console: group email is **Owner**
- [ ] YouTube gallery videos moved to a group channel
- [ ] Web Analytics moved to the live Cloudflare account
- [ ] Content backup: from `studio/` run
      `npx sanity dataset export production backup.tar.gz` and store it safely
- [ ] Remove my personal accounts only **after** everything above is confirmed

---

## 7. Lessons learned (save the next person some time)

- **Publish, don't just edit.** An orange dot in Sanity means unpublished
  changes. Only published content reaches the website.
- **Paper DOIs go in a news post's *Link* field**, never in the *Slug*.
- **Links typed into Sanity:** a trailing `/` is optional (the site adds it),
  but **capital letters matter**. `/Research` is a broken link; use `/research/`.
- **Logos** need a **transparent PNG or SVG**. A JPG always has a solid
  background.
- **Google is slow to catch up.** New page titles take days and the favicon can
  take weeks. Use Search Console → URL Inspection → **Request indexing** to
  hurry a page.
- **Sanity document IDs must not contain dots.** Sanity treats them as private,
  so the public website can't see them.
- **Several Cloudflare accounts exist** from setup; only the `get-fpl` one hosts
  the site.
