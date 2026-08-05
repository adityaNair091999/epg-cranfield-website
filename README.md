# Energy and Power Group — Website

The official website for the **Energy and Power Group** at Cranfield University,
led by **Dr. Luofeng Huang**. The group researches offshore renewable energy —
floating photovoltaics, wave–structure interaction and computational fluid
dynamics.

This README is written so that **anyone** — including non-technical staff — can
run, edit and publish the website. Follow the steps in order.

---

## Live site & key links

| What | Address |
| --- | --- |
| **Live website** | https://epg-cranfield-website.aditya-nair2-817.workers.dev |
| **Content editor (Sanity Studio)** | https://energy-power-cranfield.sanity.studio |
| **Manage content account** | https://www.sanity.io/manage |
| **Hosting dashboard (Cloudflare)** | https://dash.cloudflare.com → Workers & Pages → `epg-cranfield-website` |
| **Source code (GitHub)** | https://github.com/adityaNair091999/epg-cranfield-website |
| **Developer contact** | Aditya Nair — aditya.nair.817@cranfield.ac.uk |

**How editing works, in one line:** open the Sanity Studio → change something →
click **Publish** → the website updates automatically within about a minute.

---

## 1. Project overview

The website has seven pages: **Home, Research, Publications, Members, News,
Opportunities** and **Contact**. It is designed in a clean, bold "industrial"
engineering style.

All the *content* (people, papers, projects, news, jobs) is stored in a friendly
online editor called **Sanity**. You do **not** need to touch any code to add a
new team member or publish a news post — you just log in to Sanity and fill in a
form. The website automatically shows the latest content.

> **Good to know:** The site ships with realistic **sample content** built in, so
> it looks complete the moment you run it — even before Sanity is connected. Once
> you connect a real Sanity project, the live content replaces the samples.

---

## 2. Tech stack

| Piece            | What it does                                            |
| ---------------- | ------------------------------------------------------- |
| **Astro**        | Builds the fast website (the pages people see).         |
| **Sanity.io**    | The content editor where you add members, papers, etc.  |
| **Cloudflare**   | Hosts the website online, for free.                     |
| **Web3Forms**    | Delivers contact-form messages to email, for free.      |
| **GitHub**       | Stores the code and triggers automatic re-publishing.   |

Project layout:

```
website/
├── src/                  ← the Astro website (pages, components, styles)
│   ├── pages/            ← one file per page
│   ├── components/       ← reusable pieces (cards, nav, footer …)
│   └── lib/             ← where the site fetches content
├── public/               ← images, favicon, sample pictures
├── studio/               ← the Sanity content editor
│   └── schemaTypes/      ← definitions of Member, Publication, etc.
├── sanity-seed/          ← sample content you can load into Sanity
├── wrangler.toml         ← Cloudflare deploy settings (serves the dist/ folder)
├── .env                  ← your Sanity + form keys (kept private, not on GitHub)
└── README.md             ← this file
```

---

## 3. How to run the website on your own computer

You only need to do steps 1–2 **once**.

### Step 1 — Install Node.js

Node.js is the engine that runs the website. Download the **LTS** version from
<https://nodejs.org> and install it (just click through the installer). To check
it worked, open a terminal (Command Prompt on Windows, Terminal on Mac) and type:

```bash
node --version
```

You should see a version number like `v22.x.x`.

### Step 2 — Download the project and install its parts

```bash
# go into the project folder
cd website

# install everything the website needs (takes a minute the first time)
npm install
```

### Step 3 — Start the website

```bash
npm run dev
```

Now open your web browser and go to **<http://localhost:4321>**. You'll see the
full website. Leave the terminal window open while you work; press `Ctrl + C` to
stop it.

> At this point the site uses the built-in **sample content**. To use real,
> editable content, set up Sanity (Section 4) and connect it (Section 8).

---

## 4. Setting up the Sanity content editor (one-time)

1. Go to <https://www.sanity.io> and create a free account.
2. Open a terminal and run:

   ```bash
   cd website/studio
   npm install
   npx sanity login
   npx sanity init --env
   ```

   When asked, choose **"Create new project"**, give it a name (e.g. *Energy and
   Power Group*), and choose the default dataset name **production**. This creates
   a file called `.env` inside `studio/` with your project ID.

3. Load the sample content (optional but recommended so the editor isn't empty):

   ```bash
   npm run import-sample
   ```

4. Open the editor in your browser:

   ```bash
   npm run dev
   ```

   Go to **<http://localhost:3333>** and log in. This is where you add and edit
   all content.

To make the editor available to others online, run `npm run deploy` from the
`studio/` folder — Sanity gives you a shareable web address (a "studio URL").

---

## 5. How to add a new team member

1. Open the Sanity editor (Section 4, or your deployed studio URL) and log in.
2. In the left menu, click **Team Member → +** (create new).
3. Fill in the form:
   - **Name** — e.g. *Jane Smith*
   - **Role** — e.g. *PhD Researcher*
   - **Bio** — a short paragraph about them.
   - **Photo** — click to upload a picture (a square or portrait photo works
     best). *If you leave it blank, the site shows their initials instead.*
   - **Email**, **LinkedIn URL**, **Google Scholar URL** — optional links.
   - **Start Year** — the year they joined.
   - **Current member?** — leave ticked. Untick it later to move them to the
     *Alumni* section.
4. Click **Publish** (bottom right).

The new member appears on the **Members** page (and the homepage team preview)
after the site rebuilds — see Section 9 on publishing.

---

## 6. How to add a publication

1. In the Sanity editor, click **Publication → +**.
2. Fill in:
   - **Title** of the paper.
   - **Authors** — click *Add item* for each author, in order.
   - **Journal / Venue**, **Year**, **DOI URL** (e.g.
     `https://doi.org/10.1016/...`).
   - **Abstract** — the paper's abstract (shown when a visitor clicks "Abstract").
   - **BibTeX** — optional; paste the citation so visitors can copy it.
   - **Featured on homepage?** — tick this to show the paper in the homepage
     "Featured Publications" section (keep it to 2–3 papers).
3. Click **Publish**.

The paper appears on the **Publications** page, and visitors can filter it by
year or search for it.

---

## 7. How to post a news update

1. In the Sanity editor, click **News Post → +**.
2. Fill in:
   - **Title** of the update.
   - **Date** — pick the date.
   - **Slug (URL)** — click **Generate**; this makes the web address
     automatically from the title.
   - **Image** — optional header picture.
   - **Body** — write the announcement. You can add headings, bold text, bullet
     lists and links using the toolbar, just like a word processor.
3. Click **Publish**.

The post appears on the **News** page and (if it's one of the three most recent)
on the homepage.

> **Opportunities** (PhD / postdoc positions) work the same way — use the
> **Opportunity** type, and untick **Open?** when a position is filled.

---

## 8. How the site is hosted (Cloudflare) and how to publish changes

The site is hosted on **Cloudflare** (Workers & Pages), connected to the GitHub
repository. This is already set up — you don't need to redo it. For reference,
the configuration is:

- **Repository:** <https://github.com/adityaNair091999/epg-cranfield-website>
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy` (reads `wrangler.toml`, which serves
  the built `dist/` folder as static files)
- **Build variables** (set in Cloudflare → project → Settings → Variables):

  | Key | Value |
  | --- | --- |
  | `SANITY_PROJECT_ID` | your Sanity project ID (`7hpg0m0e`) |
  | `SANITY_DATASET` | `production` |
  | `PUBLIC_WEB3FORMS_ACCESS_KEY` | your Web3Forms key (for the contact form) |

### Two ways the live site updates

1. **Code changes** → automatic. When code is pushed to GitHub's `main` branch,
   Cloudflare rebuilds and redeploys on its own.
2. **Content changes in Sanity** → the site is built ahead of time, so it needs a
   rebuild to show new content. Either:
   - **Simplest:** in Cloudflare, open the project → **Create deployment / Retry**
     to rebuild after publishing in Sanity, **or**
   - **Automatic:** connect a Cloudflare **deploy hook** to a Sanity **webhook**
     (see Part B6) so every publish rebuilds the site by itself.

### Connecting Sanity to the site locally

To preview real content on your own computer, copy `.env.example` to `.env`, fill
in the values, then run `npm run dev`.

---

## 9. How to connect a custom domain (e.g. energypower.cranfield.ac.uk)

1. Get a domain — either ask **Cranfield IT** for a `*.cranfield.ac.uk`
   subdomain (free, most official), or buy one (cheapest via **Cloudflare
   Registrar**, at wholesale price).
2. In Cloudflare, open the project → **Settings → Domains & Routes → Add Domain**
   and enter your domain.
3. Cloudflare sets up the DNS and a **free HTTPS certificate automatically**. If
   the domain was bought elsewhere, Cloudflare walks you through pointing that
   registrar's DNS at Cloudflare (or ask Cranfield IT to add the record).
4. The site then serves at your custom domain; the `*.workers.dev` address keeps
   working as a backup. Nothing is rebuilt — it's the same site with a new name.

---

# PART B — For Dr. Huang: editing the website (no coding needed)

This part is written for whoever looks after the website content. **You never
touch any code.** You log in to a friendly web page called **Sanity Studio**,
fill in forms, and click **Publish**. The website updates itself.

## B1. How to log in to Sanity to edit content

1. Open your web browser (Chrome, Edge, Safari or Firefox).
2. Go to the **Studio web address**. This is either:
   - the online studio address that ends in **`.sanity.studio`** (if the studio
     has been "deployed" — see the box below), **or**
   - **`http://localhost:3333`** if you are running it on your own computer
     (only works after someone runs `npm run dev` inside the `studio` folder).
3. Click **Log in** and choose the same method (Google / GitHub / email) that was
   used when the project was created.
4. You are now in the editor. Down the **left-hand side** you will see a list:
   **Team Member, Publication, Research Project, News Post, Opportunity**.

> **Tip — make the studio available online (do this once):** on the computer that
> has the project, open a terminal, run `cd website/studio` then
> `npm run deploy`, and pick a name. Sanity gives you a permanent web address
> like `energy-power.sanity.studio` that Dr. Huang can bookmark and use from any
> computer — no software to install.

## B2. How to add a new team member

1. Log in (Part B1). In the left-hand list, click **Team Member**.
2. Click the **pencil-and-paper "+" icon** at the top of the list (its tooltip
   says *Create new Team Member*). A blank form opens on the right.
3. Fill in the boxes:
   - **Name** — type the person's full name, e.g. *Dr. Jane Smith*.
   - **Role** — e.g. *PhD Researcher* or *Postdoc*.
   - **Bio** — a short paragraph about them.
   - **Photo** — click the grey **"Upload"** box, choose a photo from your
     computer, and wait for the little progress bar to finish. *(If you skip
     this, the website shows the person's initials in a coloured square instead —
     that is fine.)*
   - **Email**, **LinkedIn URL**, **Google Scholar URL** — optional.
   - **Start Year** — the year they joined, e.g. *2026*.
   - **Current member?** — leave the **toggle green/on**. Switch it **off** later
     to move them into the website's *Alumni* section instead of deleting them.
4. Click the blue **Publish** button at the **bottom-right**. When it says
   *Published*, you are done.
5. Within about a minute the website rebuilds and the new person appears on the
   **Members** page (see Part B6 on the automatic rebuild).

## B3. How to add a publication

1. In the left-hand list click **Publication**, then the **"+"** icon.
2. Fill in:
   - **Title** — the paper's title.
   - **Authors** — click **Add item** and type one author, then **Add item**
     again for the next, in the order they appear on the paper.
   - **Journal / Venue**, **Year**, and **DOI URL** (the link that starts with
     `https://doi.org/…`).
   - **Abstract** — paste the paper's abstract. Visitors can click *"Abstract"*
     on the website to read it.
   - **BibTeX** — optional; paste the citation so visitors can copy it.
   - **Featured on homepage?** — turn this **on** for the 2–3 most important
     papers you want on the front page.
3. Click **Publish**. The paper appears on the **Publications** page (and the
   homepage if you featured it).

## B4. How to post a news update

1. In the left-hand list click **News Post**, then the **"+"** icon.
2. Fill in:
   - **Title** — the headline.
   - **Date** — click and pick the date from the little calendar.
   - **Slug (URL)** — click the **Generate** button; it fills in the web address
     for you automatically from the title. You don't need to change it.
   - **Image (optional)** — upload a picture if you have one.
   - **Body** — write your announcement. The toolbar lets you add **headings**,
     **bold** text, bullet lists and links, just like Microsoft Word.
3. Click **Publish**. The newest three posts also show on the homepage.

> **Opportunities** (PhD / postdoc adverts) work exactly the same way — use the
> **Opportunity** type, and switch **Open?** off when a position is filled so it
> drops off the *Opportunities* page.

> **Editing something that already exists:** click the item in the list, change
> the boxes, and click **Publish** again. To remove something, open it and use
> the **three-dots menu (⋮) → Delete**.

## B4b. Show or hide a menu tab

You can turn the website's top-menu tabs (Research, Publications, Members, News,
Opportunities, Contact) on or off yourself — no code needed:

1. In the Studio, click **Site Settings** at the top of the left-hand list.
2. Toggle any tab **off** to hide it from the menu, or **on** to show it.
3. Click **Publish**.

Within about a minute the website rebuilds and the menu updates. (The Home page /
logo is always shown.)

## B4c. Editing the home page, headings, footer and brand

Almost everything you see is now editable from the Studio — no code. At the top of
the left-hand list you'll find three settings areas:

- **Home Page** — the big banner headline, tagline, buttons, and the hero
  image/**video** (upload your installed-FPV footage here and it plays in the
  banner), plus the section headings on the home page.
- **Site Settings** — the group name and logo text, the footer address, email,
  phone and group-lead details, the map location, and the menu-tab switches.
- **Page Banners** — the title and intro text at the top of each page (Research,
  Publications, Members, News, Opportunities, Contact).

Edit any field and click **Publish**; the site updates within about a minute. Any
field left blank falls back to a sensible default, so you can't break the layout.

## B5. Changing your mind / undo

Every change is only live after you press **Publish**. If you make a mistake,
Sanity keeps a **history** — open any item, click the **clock / history icon**
at the top-right, and you can see and restore earlier versions.

## B6. How the automatic rebuild works after you publish

The public website is built in advance for speed, so after you **Publish** in
Sanity it needs to **rebuild** to show the change. This is wired up with a
Cloudflare **deploy hook** connected to a Sanity **webhook** (a one-time setup,
described so you understand it — you don't repeat it):

**Step 1 — Get the rebuild link from Cloudflare (the host):**
1. Log in at <https://dash.cloudflare.com> and open the project
   (**Workers & Pages → `epg-cranfield-website`**).
2. Go to **Settings** → find **Deploy hooks** (under the Build settings).
3. Create a deploy hook, name it *Sanity publish*, branch **main**, and **Save**.
4. Copy the URL it gives you. Treat this link like a password.

**Step 2 — Paste it into Sanity so publishing triggers a rebuild:**
1. Go to <https://www.sanity.io/manage> and open the project.
2. Click the **API** tab, scroll to **Webhooks**, and click **Create webhook**.
3. Fill in:
   - **Name:** *Rebuild website on publish*
   - **URL:** paste the Cloudflare deploy-hook link you copied.
   - **Dataset:** `production`
   - **Trigger on:** tick **Create**, **Update** and **Delete**.
   - **HTTP method:** `POST`
   - Leave the filter and projection blank.
4. Click **Save**.

**Step 3 — Test that it works:**
1. In Sanity Studio, change any item (e.g. a Team Member) and press **Publish**.
2. In Cloudflare, open the project's **Deployments** — within a few seconds a
   **new deployment** should start.
3. Wait for it to finish (about a minute) and refresh the public website — your
   change is live.

If nothing happens, re-check that the Cloudflare link was pasted correctly into
the Sanity webhook and that the trigger types are ticked.

## B7. Annual maintenance checklist

A few small things keep the site healthy. Once a year (put a reminder in the
calendar) check:

- [ ] **Domain renewal** — if you use a custom web address (e.g.
      `energypower.cranfield.ac.uk`), make sure it is renewed/still pointing at
      Cloudflare. University web addresses are usually handled by Cranfield IT —
      confirm with them.
- [ ] **Cloudflare account** — log in at <https://dash.cloudflare.com> once so the
      free account stays active; check the project still deploys successfully. The
      Cloudflare free tier is very generous and a small site stays well within it.
- [ ] **Contact form (Web3Forms)** — check messages are still arriving. The free
      Web3Forms plan is fine for normal enquiry volumes; the key is in the
      `PUBLIC_WEB3FORMS_ACCESS_KEY` variable (locally and in Cloudflare).
- [ ] **Sanity free-tier limits** — log in at <https://www.sanity.io/manage>;
      check **Usage** is within the free plan (users, API requests, bandwidth) and
      that the login/owner still belongs to someone in the group.
- [ ] **GitHub repo stays active** — GitHub may flag a repository as inactive
      after a long idle period. If there have been no updates for ~11 months, push
      any tiny change (even editing this README) to keep it active. The repo is at
      <https://github.com/adityaNair091999/epg-cranfield-website>.
- [ ] **Content review** — remove out-of-date opportunities, move departed staff
      to *Alumni* (toggle *Current member?* off), and add the year's new
      publications and news.
- [ ] **Contact details** — confirm the email address and phone number in the
      footer are still correct.
- [ ] **Backups** — from the `studio` folder you can run
      `npx sanity dataset export production backup.tar.gz` to save a full copy of
      all content to your computer. Keep it somewhere safe.

---

## Quick command reference

| I want to…                          | Command (from the folder shown)          |
| ----------------------------------- | ---------------------------------------- |
| Run the website locally             | `npm run dev` (in `website/`)            |
| Build the website for publishing    | `npm run build` (in `website/`)          |
| Preview the built website           | `npm run preview` (in `website/`)        |
| Open the content editor             | `npm run dev` (in `website/studio/`)     |
| Load sample content into Sanity     | `npm run import-sample` (in `studio/`)   |
| Publish the content editor online   | `npm run deploy` (in `website/studio/`)  |

---

## Help

- **Astro docs:** <https://docs.astro.build>
- **Sanity docs:** <https://www.sanity.io/docs>
- **Cloudflare Workers/Pages docs:** <https://developers.cloudflare.com/pages/>

For anything specific to this website, contact the group's web maintainer.
