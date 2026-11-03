# deltoro.dev

The business site for **Andrew Del Toro — IT & Security Consulting** in the Coachella Valley.

It replaces the old Hugo site at deltoro.dev and the Netlify portfolio at andrew-deltoro.netlify.app.
The positioning is simple: a Security+ certified consultant who fixes the security, backup, network, and
automation problems small businesses keep postponing. Fixed fees, plain English, and proof of work.

## Stack

- [Astro](https://astro.build) 7, static output — no client framework, under 300 KB on first load.
- Content collections for the twelve project case studies.
- Self-hosted Archivo and IBM Plex Mono (no Google Fonts request).
- Hand-written CSS design system in `src/styles/global.css`.
- No analytics, no cookies, no third-party trackers.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # preview the production build
npm run check      # Astro + TypeScript diagnostics
```

Node 22 or newer.

## Where to edit things

| What | Where |
| --- | --- |
| Email, phone, LinkedIn, GitHub, booking link, form endpoint | `src/data/site.ts` |
| Services, prices, add-ons, FAQs, process, principles | `src/data/site.ts` |
| Project case studies | `src/content/projects/*.md` |
| Homepage sections | `src/pages/index.astro` |
| Case study template | `src/pages/work/[slug].astro` |
| Design tokens and all styling | `src/styles/global.css` |
| Social preview images | `public/og/*.png` |
| Security+ badge | `public/images/credly-security-plus.png` |

### Contact details

Everything reads from `src/data/site.ts`. The important fields:

```ts
email: 'contact@deltoro.dev',   // forwards to Gmail via Cloudflare Email Routing
phone: '',                        // optional; the UI hides it when empty
bookingUrl: '',                   // e.g. 'https://cal.com/andrew-deltoro/intro-call'
formEndpoint: '',                 // e.g. 'https://formspree.io/f/xxxxxxxx'
```

- With **no form endpoint**, the contact form opens the visitor's email client with the message filled in.
  Nothing is transmitted by the site. This is the current behaviour.
- With a **Formspree (or compatible) endpoint**, the form posts there and redirects to `/thanks/`.
  Update the privacy page note automatically reflects which mode is active.
- With a **booking URL**, the contact page shows a "Book directly" card.

### Adding or editing a project

Create `src/content/projects/my-project.md`. The schema lives in `src/content.config.ts`.

```yaml
---
title: "Project name"
kicker: "One line describing what it is"
summary: "Two sentences used on cards and in search results."
category: "Security"        # Security | AI | Web | Automation | Experiment
year: "2026"
status: "Live"              # Live | In development | Archived | Proof of concept | Concept build | Concept case study
role: "What you did"
timeline: "How long it took"
stack: ["Python", "Flask"]
liveUrl: "https://example.com"   # optional
repoUrl: "https://github.com/..." # optional
cover: "/images/projects/my-project"  # base path for -720.webp and -1440.webp
coverAlt: "Describe the screenshot"
featured: false
order: 11
service: "security-audit"   # optional anchor into /services
disclaimer: "Optional honesty note"
prove:
  - "What this proves for a client"
---

## The problem

...
```

Cover images need two WebP files:

- `public/images/projects/my-project-720.webp` (720 px wide)
- `public/images/projects/my-project-1440.webp` (1440 px wide)

Keep screenshots at 16:10 (1440 × 900) so cards crop cleanly. The existing assets were made with
Playwright against each live site and converted with sharp at quality 80.

**Claims policy:** do not invent clients, testimonials, revenue, or results. The three demonstration
projects (FY!RE, BizFlip, RouteBid) are clearly labeled. Keep it that way. If you add a testimonial,
get written permission and use the person's real name and business.

## Deploy

The domain currently points at GitHub Pages:

- `deltoro.dev` → GitHub Pages IPs (185.199.108–111.153)
- `www.deltoro.dev` → CNAME `andrew-deltoro.github.io` (GitHub's user hostname, not a repo name — correct even though the site lives in `deltoro-dev-site`)
- DNS is hosted on Cloudflare (nameservers `gabriel.ns.cloudflare.com`, `julissa.ns.cloudflare.com`)

So the least disruptive path is to keep GitHub Pages and replace the content. Do not touch DNS.

If the push is failing, read **`docs/deploy-walkthrough.md`** first — it covers the exact error in the
last screenshot (wrong repo name, existing remote, and GitHub password authentication).

### GitHub Pages (recommended)

1. **Back up the current site.** The old Hugo site is in **`andrew-deltoro/deltoro-dev-site`**
   (confirmed: the repo contains `hugo.toml`, `content/`, and `themes/`; there is no
   `andrew-deltoro.github.io` repository).

   ```bash
   git clone https://github.com/andrew-deltoro/deltoro-dev-site.git ~/deltoro-old-site
   ```

2. **Turn on Actions-based Pages.** In that repository: **Settings → Pages → Build and deployment →
   Source: GitHub Actions**.

3. **Push this site to the repository.** From this directory:

   ```bash
   git init
   git add .
   git commit -m "Rebuild deltoro.dev as an IT & security consulting site"
   git branch -M main
   git remote add origin https://github.com/andrew-deltoro/deltoro-dev-site.git
   git push -u origin main
   ```

   If the remote already exists (the usual cause of "remote origin already exists"), correct it
   instead of adding a second one:

   ```bash
   git remote set-url origin https://github.com/andrew-deltoro/deltoro-dev-site.git
   ```

   **Authentication.** GitHub no longer accepts your account password at the git prompt. Either run
   `gh auth login` once (choose GitHub.com → HTTPS → browser) and then `gh auth setup-git`, or create
   a fine-grained personal access token with **Contents: read and write** on this repository and use
   the token as the password. The username is `andrew-deltoro`.

   **The history is already prepared.** This working copy has been rebased onto the old Hugo
   repository history (`origin/main` is an ancestor of the new site commit), and the remote URL is
   already correct. A normal push should fast-forward:

   ```bash
   git push -u origin main
   ```

   If you are working from a fresh clone or an unrelated history and the push is rejected as
   non-fast-forward, back up the old repo and use `git push --force-with-lease origin main`.

4. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
   Wait for the green check, then confirm **Settings → Pages → Custom domain** still says
   `deltoro.dev` and **Enforce HTTPS** is on.

5. Verify:
   - `https://deltoro.dev/` loads the new homepage.
   - `https://deltoro.dev/work/pysiem/` loads a case study.
   - `https://deltoro.dev/sitemap-index.xml` lists the pages.
   - `https://deltoro.dev/robots.txt` points at the sitemap.

The `public/CNAME` file is copied into the build, so the custom domain survives deployments.

> GitHub Pages cannot set custom HTTP security headers. The `public/_headers` file is only used if
> you deploy to Netlify or Cloudflare Pages. GitHub Pages still serves HTTPS and HSTS is applied by
> GitHub for `.dev` domains via the browser preload list.

### Netlify (alternative)

`netlify.toml` is included. Connect the repository, keep the build command `npm run build` and
publish directory `dist`, then move DNS from GitHub Pages to Netlify. You get proper security
headers and Netlify's CDN, but you must change DNS and wait for propagation.

## After deploy

### 1. Email on the domain (configured)

Cloudflare Email Routing is already enabled on deltoro.dev:

- `contact@deltoro.dev` and the catch-all address forward to `adeltoro702@gmail.com`.
- MX and SPF records are live.

If it ever stops, check **Cloudflare → deltoro.dev → Email → Email Routing** and the destination
verification. Cloudflare forwarding is **receive-only**; replies come from Gmail unless you add a
real mailbox. For sending as `contact@deltoro.dev`, use Zoho Mail Lite (~$1–$2/user/month) or
Google Workspace (~$7/user/month).

### 2. Contact form

Create a form at [Formspree](https://formspree.io) (free tier: 50 submissions/month), copy the
endpoint, and set `formEndpoint` in `src/data/site.ts`. Test a real submission from an external
network. The form redirects to `/thanks/` on success.

### 3. Booking

Create a free [Cal.com](https://cal.com) event: 20 minutes, Monday–Friday, 9–5 Pacific, 10-minute
buffer. Put the link in `bookingUrl`. The contact page will show a direct booking card.

### 4. Search engines

- Add the domain to [Google Search Console](https://search.google.com/search-console) and submit
  `https://deltoro.dev/sitemap-index.xml`.
- Do the same in Bing Webmaster Tools.
- Create a Google Business Profile for the service area: **Palm Springs, Palm Desert, La Quinta, and Indio**. Use a service-area business and do not display a street address.
- Update LinkedIn and GitHub profiles to link to `https://deltoro.dev/`.

### 5. Analytics (optional)

There is intentionally none. If you add privacy-friendly analytics (Plausible, Fathom, or
Cloudflare Web Analytics), update `/privacy` and the "No trackers" footer line.

## Quality status (verified October 2026)

- `npm run build`: 22 pages, ~4 MB total including images.
- `npm run check`: 0 errors, 0 warnings, 0 hints.
- axe-core (WCAG 2.1 AA + best practice): 0 violations on all tested page types.
- W3C Nu HTML validator: 0 messages across all pages.
- Core Web Vitals on a local build: LCP well under 1 s, CLS 0.
- Internal link and anchor crawl: no broken links, no duplicate IDs, one `h1` per page.
- All project demo links return HTTP 200.
- Works without JavaScript: navigation and all content remain visible; form falls back to mailto.
- Mobile menu, project filters, checkup scoring, and contact fallback tested in Chromium.

## Things that still need your input

See `docs/launch-checklist.md` and `docs/business-assessment.md`. The short list:

- Decide on the legal entity and insurance before larger engagements. See
  `docs/insurance-and-contracts.md`.
- The V1CE redirect is configured (Pages → Link → Redirect visitors → `https://deltoro.dev/card`).
  Re-check it after any plan change. See `docs/v1ce-card.md`.
- Provide a headshot (the site currently uses the badge and typography instead).
- Set the booking link and form endpoint.
- Switch the email address once `hello@deltoro.dev` is receiving mail.
- Collect two or three real testimonials after the first engagements and add a testimonial section.
- Confirm which Coachella Valley city you want to use in local SEO and on the Google Business
  Profile. The site currently says "Coachella Valley" without a specific city.

## Further reading

- [How the Brave session was used](docs/how-the-brave-session-was-used.md) — the local session-reuse method and its security lessons.
- [V1CE card resolution](docs/v1ce-card.md) — how the printed QR and NFC tap were re-pointed.
- [Insurance and contracts](docs/insurance-and-contracts.md) — E&O, cyber, MSA, and SOW.
- [Email options](docs/email-options.md) — free forwarding and mailbox choices for deltoro.dev.
- [Deploy walkthrough](docs/deploy-walkthrough.md) — GitHub Pages troubleshooting.
