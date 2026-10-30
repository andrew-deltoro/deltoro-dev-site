# deltoro.dev — Launch Checklist

Everything needed to take the site from this folder to a live business page, in order.

## 0. Decisions to make first (30 minutes)

- [ ] **Legal name to publish.** "Andrew Del Toro" or a business name such as "Del Toro IT". The site currently uses your name, which is the right choice for a solo consultant.
- [ ] **Email strategy.** Free Cloudflare forwarding to Gmail (fast, receive-only) or a paid mailbox at Zoho (~$1/mo) or Google Workspace (~$7/mo).
- [ ] **Phone.** Email-only for now, or a Google Voice number. The site has a phone field but hides it while empty.
- [ ] **Booking tool.** Cal.com free plan is enough.
- [ ] **Travel radius.** Recommend the Coachella Valley (Palm Springs to Indio) included; beyond that, hourly plus mileage. You plan to expand beyond the valley, so keep the travel rule explicit.
- [ ] **Minimum engagement.** Recommend $750.

## 1. Deploy (30–60 minutes)

The domain already points at GitHub Pages, so do not change DNS.

- [ ] Confirm which repository currently publishes deltoro.dev: GitHub → the repo → Settings → Pages. It is **andrew-deltoro/deltoro-dev-site** (the Hugo site).
- [ ] Back up the old Hugo site:

      git clone https://github.com/andrew-deltoro/deltoro-dev-site.git ~/deltoro-old-site

- [ ] In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- [ ] From this folder:

      git init
      git add .
      git commit -m "Rebuild deltoro.dev as an IT & security consulting site"
      git branch -M main
      git remote add origin https://github.com/andrew-deltoro/deltoro-dev-site.git
      git push -u origin main

  If git says **remote origin already exists**, correct it instead of adding another:

      git remote set-url origin https://github.com/andrew-deltoro/deltoro-dev-site.git

  If git asks for a **username and password**, do not type your GitHub account password. GitHub
  stopped accepting it. Run gh auth login once (GitHub.com → HTTPS → browser) and then
  gh auth setup-git, or use a fine-grained personal access token with Contents: read and write.

  This working copy has already been rebased onto the old Hugo history and the remote URL is
  correct, so the push should fast-forward:

      git push -u origin main

  If you are starting from a fresh clone and the push is rejected as non-fast-forward, back up the
  old repo and use git push --force-with-lease origin main.

- [ ] Wait for the Actions workflow to go green (about two minutes).
- [ ] Confirm **Settings → Pages → Custom domain** still shows deltoro.dev and **Enforce HTTPS** is on.
- [ ] Open https://deltoro.dev/ in a private window. Hard-refresh if the old site is cached.
- [ ] Verify https://deltoro.dev/work/pysiem/ and https://deltoro.dev/sitemap-index.xml.

If the workflow fails with a Pages error, check that **Settings → Pages → Source** is **GitHub Actions**,
not "Deploy from a branch." The old Hugo workflow will be replaced by the new one when you force-push.

## 2. Email on the domain (15 minutes)

DNS is on Cloudflare, so this is straightforward. You can only receive with this setup; replies will still come from Gmail unless you add a paid mailbox.

- [ ] Cloudflare dashboard → deltoro.dev → **Email → Email Routing → Enable**.
- [ ] Add custom address **hello@deltoro.dev** → destination **adeltoro702@gmail.com**.
- [ ] Open the verification email in Gmail and click the link.
- [ ] Send a test from a different account to hello@deltoro.dev and confirm it arrives.
- [ ] Edit src/data/site.ts: change the email value to hello@deltoro.dev.
- [ ] Update the address in public/llms.txt and public/.well-known/security.txt.
- [ ] Run npm run build, commit, and push.

**If you want to send as hello@deltoro.dev:** sign up for Zoho Mail Lite or Google Workspace, add the domain, and replace the Cloudflare MX records with the provider's. Keep the existing SPF and DKIM records and do not run two mail providers at once.

## 3. Contact form (15 minutes)

- [ ] Create a free Formspree account and a new form.
- [ ] Copy the endpoint (looks like https://formspree.io/f/abcdwxyz).
- [ ] Set formEndpoint in src/data/site.ts.
- [ ] Rebuild and deploy.
- [ ] Submit a real test from a phone or a private window. Confirm the redirect to /thanks/ and the email notification.
- [ ] Check the spam folder and mark the notification as not spam.
- [ ] The privacy page automatically switches its wording when an endpoint is set.

Formspree free tier is 50 submissions per month. That is plenty to start.

## 4. Booking (15 minutes)

- [ ] Create a Cal.com account with Google Calendar connected.
- [ ] Create an event: **Intro call**, 20 minutes, video, Monday–Friday 9:00–17:00 America/Los_Angeles, 10-minute buffer.
- [ ] Add two required questions: business name, and "what is the problem you want to fix?"
- [ ] Copy the public link and set bookingUrl in src/data/site.ts.
- [ ] Rebuild, deploy, and test the booking flow on mobile.

Optional: once booking is live, change the main hero button to the booking link. The contact page already shows a direct-booking card.

## 4b. V1CE NFC card and printed QR (15 minutes)

The card's NFC tag opens https://link.v1ce.co/andrew-deltoro and the printed QR decodes to
https://link.v1ce.co/asvpdmguow/842173, which redirects to the same profile. Both need to point at
the new site.

- [ ] Sign in at https://app.v1ce.co.
- [ ] Create a **Direct link** (Links → Create link → Direct link) to https://deltoro.dev/card.
- [ ] Go to Settings → NFC Cards → your bamboo card → Unlink, then Assign the new direct link.
- [ ] Tap the card and scan the printed QR. Both should open deltoro.dev/card.
- [ ] If the QR still opens the old profile, contact V1CE support with the message in docs/v1ce-card.md.
- [ ] Update the old profile website from the Netlify URL to https://deltoro.dev while you are there.

## 5. Search and local presence (45 minutes)

- [ ] Add https://deltoro.dev to Google Search Console (domain property, DNS verification through Cloudflare).
- [ ] Submit https://deltoro.dev/sitemap-index.xml.
- [ ] Add the site to Bing Webmaster Tools.
- [ ] Create a Google Business Profile as a **service-area business**. Do not show a street address if you work from home.
  - Category: Computer support and services (or IT consultant).
  - Service area: Palm Springs, Palm Desert, La Quinta, Indio.
  - Website: https://deltoro.dev.
  - Description: use the positioning statement from the assessment.
- [ ] Update LinkedIn: headline, About, website field.
- [ ] Update GitHub profile: website field and pinned repos (PySIEM, PySEC Academy, this site).
- [ ] Add deltoro.dev to your email signature.

## 6. Proof assets (first 30 days)

- [ ] Get a professional headshot (natural light, plain background, shoulders up, no heavy filter).
- [ ] Add it to the About page and optionally the homepage credential section.
- [ ] After the first paid engagement, ask for a testimonial with permission to use name, business, and role.
- [ ] Write one real case study with the client's approval. Use the same structure as the project pages: problem, constraints, what changed, result.
- [ ] Redact a real checkup report and offer it as a sample download.
- [ ] Add the testimonial section to the homepage and services page.

## 7. Business admin (before the first $2,500 engagement)

- [ ] Get quotes for technology E&O / professional liability and cyber liability. Expect roughly $500–$1,500/year for a solo consultant. Full walkthrough: docs/insurance-and-contracts.md.
- [ ] Have an MSA and SOW reviewed. Minimum terms: scope, deliverables, exclusions, client responsibilities, fees and late fees, limitation of liability, confidentiality, data handling, IP ownership, termination.
- [ ] Decide sole proprietor vs LLC with a CPA. California LLCs pay an $800 minimum franchise tax.
- [ ] Set up invoicing (Stripe Invoicing, Wave, or Invoice Ninja) and a separate bank account.
- [ ] Create a simple project folder template: scope, access checklist, findings, handover, invoice.
- [ ] Write your incident rule: what you do if you suspect a breach during an engagement, and who the client calls first.

## 8. Content to add after launch

- [ ] Two or three specific articles, not generic tips:
  - How to test whether your backup actually works
  - What DMARC enforcement actually changes for a small business
  - The five account settings I check first in Microsoft 365
- [ ] A "Working together" page: what you need from the client, response times, communication norms, and what happens if the scope changes.
- [ ] A sample report PDF.
- [ ] A short FAQ entry about insurance once the policy is bound.

## 9. Analytics (optional, after launch)

The site has no analytics and no cookies. If you add Plausible, Fathom, or Cloudflare Web Analytics:

- [ ] Add the script to src/layouts/BaseLayout.astro.
- [ ] Update the privacy page and the footer line that currently says "No trackers."
- [ ] Do not add Google Analytics or advertising pixels; they undercut the privacy claim and add weight for very little value at this stage.

## 10. Ongoing maintenance

- [ ] Monthly: check the contact form and booking link still work; review Search Console for errors.
- [ ] Quarterly: run npm outdated, update Astro and dependencies, run npm run check and npm run build.
- [ ] Quarterly: re-check that all project demo links still return 200.
- [ ] After every engagement: add or update a case study, ask for a testimonial, and review your actual hours against the quote.

## Current state (what is already done)

- [x] Site built, designed, and content written for twelve projects and seven services.
- [x] Security+ badge integrated and linked to Credly.
- [x] Required team language present verbatim on the homepage and services page.
- [x] Pricing, FAQ, about, contact, checkup, privacy, 404, sitemap, robots, llms.txt, and social images.
- [x] GitHub Pages workflow and Netlify configuration included.
- [x] Accessibility audit clean, performance verified, no broken internal links.
- [ ] Everything above that is not checked.
