# V1CE card: making the NFC tap and printed QR land on deltoro.dev

## What the card does right now

- **NFC tag** opens: https://link.v1ce.co/andrew-deltoro
- **Printed QR** decodes to: https://link.v1ce.co/asvpdmguow/842173
- That QR URL answers with a **301 redirect** to /andrew-deltoro, so both paths currently land on the V1CE profile page, not on this site.
- The V1CE profile still lists **https://andrew-deltoro.netlify.app/** as the website. That needs to change regardless.

## The destination

The site now has a focused card landing page at:

**https://deltoro.dev/card**

It is built for a phone in the hand: name, Security+ badge, a book-a-call button, email, a downloadable contact card, the work, and the free checkup. It is marked noindex so it does not compete with the homepage in search.

If you prefer the homepage, use https://deltoro.dev/ instead. The rest of this document assumes /card.

## How to change it in V1CE

V1CE's dashboard has two relevant tools: **QR Codes** (each QR can point at a profile or a URL) and **Direct links** (a short link that sends a visitor straight to a URL). The printed QR is likely a QR Code record; the NFC chip is the card assignment.

### First, check the QR Codes list

1. Sign in at **https://app.v1ce.co**.
2. Open **QR Codes** and look for the code whose short link ends in **asvpdmguow/842173** (or whose name matches the card).
3. If it is there, edit it and change the destination from **Profile** to **URL**.
4. Enter **https://deltoro.dev/card** and save.
5. Scan the printed QR. If it opens the new page, the QR is done.

If the QR is not listed, it was printed from the card itself and cannot be edited from the QR screen. Use the card reassignment below, then contact support if the QR still opens the profile.

### Then, move the NFC card to a direct link

V1CE's dashboard supports a **Direct link** product: a short link that sends a visitor straight to a URL instead of showing the profile page. The card can then be assigned to that direct link.

1. Sign in at **https://app.v1ce.co**.
2. Go to **Links** (or the page/link list) and choose **Create link**.
3. Pick **Direct link** (V1CE describes it as "one click sends people straight to any website you choose").
4. Set the destination to **https://deltoro.dev/card**.
5. Save it and copy the new V1CE link.
6. Open **Settings → NFC Cards**, find your bamboo card, and open it.
7. Choose **Unlink** from the current andrew-deltoro page.
8. Choose **Assign** and select the new direct link.
9. Save.

Then test both paths:

- Tap the card on the back of a phone. It should open deltoro.dev/card.
- Scan the printed QR with a phone camera. It should open deltoro.dev/card as well.

## If the printed QR still opens the profile

The QR is printed, so the pixels cannot change. What can change is where the URL behind it points. V1CE's help centre says printed QR codes cannot be edited, and that their team re-points legacy cards on request. If reassigning the card fixes the tap but not the QR, send V1CE support this message:

> Hi — I have a V1CE bamboo card and I need both the NFC tap and the printed QR code to open my website instead of my V1CE profile.
>
> Account email: adeltoro702@gmail.com
> Card ID (last 4): [FILL IN FROM THE CARD SLEEVE]
> Current NFC URL: https://link.v1ce.co/andrew-deltoro
> Printed QR URL (decoded): https://link.v1ce.co/asvpdmguow/842173
> Desired destination: https://deltoro.dev/card
>
> I have created a Direct link to that destination. Please re-point the card's NFC link and the printed QR URL to it. If the QR URL cannot be changed, please tell me what the options are.

Support is reachable from the chat widget in the dashboard or the help centre at https://support.v1ce.co.

## Meanwhile, update the profile

Even after the redirect works, the old profile may still be indexed or cached. Sign in and:

- Change the profile website from the Netlify URL to **https://deltoro.dev**.
- Update the bio to the current positioning: "IT and security consulting for small businesses in the Coachella Valley. Security+ certified."
- Add a prominent link labelled **Website** or **Book a call** pointing to https://deltoro.dev/card.
- Update the profile photo if the current one is outdated.

## If you ever rewrite the NFC tag

The chip is usually rewritable with an app such as NFC Tools. You could write https://deltoro.dev/card directly to it and remove V1CE from the tap path entirely. The printed QR would still go through V1CE, so this only helps the tap unless the QR destination is also fixed.

## What I could not do from here

I do not have your V1CE login, so I could not make the dashboard change or contact support on your behalf. The site destination and the instructions are ready; the last step is in your V1CE account.
