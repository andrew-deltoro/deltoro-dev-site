# Professional email on deltoro.dev — free options

## Short answer

You do not need to buy another domain. You already own **deltoro.dev**. What costs money is the mailbox or the sending service, not the domain.

For a free professional address, you have two practical routes:

1. **Free forwarding** — Cloudflare Email Routing sends `contact@deltoro.dev` to your Gmail. Free, five-minute setup, but replies come from Gmail unless you add a sending service.
2. **Free mailbox** — Zoho Mail Free gives you a real `contact@deltoro.dev` mailbox on the free plan: up to 5 users, one custom domain, 5 GB per user, web and mobile apps. No IMAP/POP/ActiveSync on the free plan, so you use Zoho's apps rather than Gmail.

If you want the address to live inside Gmail (IMAP) and send/receive natively, the cheapest reliable option is a paid mailbox: Zoho Mail Lite (roughly $1–$2/user/month billed annually) or Google Workspace (about $7/user/month).

## Option A — Cloudflare Email Routing (free forwarding)

Your DNS is already on Cloudflare, so this is the simplest route.

1. Open https://dash.cloudflare.com and select deltoro.dev.
2. Go to **Email → Email Routing → Enable**.
3. Add a destination address: `adeltoro702@gmail.com`. Verify it from the email Cloudflare sends.
4. Add a custom address: `contact@deltoro.dev` → destination `adeltoro702@gmail.com`.
5. Cloudflare adds the MX and SPF records automatically. Do not add a second MX provider at the same time.
6. Send a test from an outside account to `contact@deltoro.dev`.

Docs: https://developers.cloudflare.com/email-routing/

Limits: this is **inbound forwarding only**. Cloudflare does not give you an SMTP login, so Gmail's “Send mail as” cannot use it directly. Replies will come from your Gmail address. That is fine for a first launch, but it is not a full branded mailbox.

## Option B — Zoho Mail Free (free mailbox)

This is the best zero-cost option if you want to send *and* receive as `contact@deltoro.dev` without Gmail send-as gymnastics.

- Free forever, up to 5 users.
- One custom domain.
- 5 GB storage per user.
- Webmail and mobile app.
- **No IMAP/POP/ActiveSync** on the free plan, so you cannot connect it to the Gmail app or Apple Mail; use Zoho's own app/webmail.

Setup:

1. Sign up at https://www.zoho.com/mail/ and choose the free plan.
2. Add deltoro.dev and verify it with the TXT record Zoho gives you.
3. Create `contact@deltoro.dev`.
4. Replace the Cloudflare Email Routing MX records with Zoho's MX records, and add Zoho's SPF and DKIM records.
5. Send and receive a test from outside.

Pricing and plan details: https://www.zoho.com/mail/zohomail-pricing.html

Do not run Cloudflare Email Routing and Zoho MX at the same time. Pick one inbound provider.

## Option C — Paid mailbox for Gmail/IMAP

If you want `contact@deltoro.dev` inside Gmail, Apple Mail, or Outlook with normal IMAP sync:

- **Zoho Mail Lite** — roughly $1–$2/user/month billed annually. Cheapest full mailbox with IMAP.
- **Google Workspace** — about $7/user/month. Best if you want Gmail's interface, calendar, and Drive under the domain.
- **Microsoft 365 Business Basic** — comparable to Google Workspace if you prefer Outlook.

These are the only options that give you a normal mailbox experience with the domain in the From line and full sync.

## Option D — ImprovMX (free forwarding alternative)

If you ever move DNS off Cloudflare, ImprovMX offers free forwarding: one domain, 25 aliases, 500 forwarded emails/day. SMTP sending is paid. https://improvemx.com/pricing/

## Recommendation

For your situation, I would do this:

1. **Start with Cloudflare Email Routing** today. It is free, takes minutes, and stops you from losing leads to a Gmail address. Reply from Gmail for now.
2. If the Gmail From line bothers you after the first few clients, move to **Zoho Mail Free** and use Zoho's app. Still $0.
3. Pay only when you want the address inside Gmail or Apple Mail: Zoho Lite first, Google Workspace if you want the full Google ecosystem.

## Current state

The site now uses `contact@deltoro.dev` everywhere. Cloudflare Email Routing is enabled for that address and the catch-all.

If you ever need to change it:

- `email` in `src/data/site.ts`
- the address in `public/llms.txt`
- the address in `public/.well-known/security.txt`
- the vCard at `public/andrew-deltoro.vcf`

Then rebuild and deploy. The contact form, footer, card page, and structured data all read from the same config.

If routing ever breaks, temporarily point the site back to a mailbox you can actually read. A displayed address that cannot receive mail loses leads.
