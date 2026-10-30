# V1CE card — resolved

## What was wrong

The printed QR is a legacy card QR, not a dashboard QR. It decodes to:

https://link.v1ce.co/asvpdmguow/842173

and that URL answers with a 301 to the profile:

https://link.v1ce.co/andrew-deltoro

The NFC chip opens the same profile. On the free/legacy dashboard there is no QR-code entry and no NFC settings screen, which is why Co-Work reported 0 QR codes and 0 scans.

## The fix

V1CE does have a page-level **Redirect visitors** control; it is on **Pages → Link**, below Visibility.

- Toggle: **Redirect visitors — on**
- Website address: **https://deltoro.dev/card**
- Save (the setting writes immediately).

The V1CE profile content was also updated:

- Job title: IT & Security Consultant
- Location: Coachella Valley, California
- Website: https://deltoro.dev
- Bio: the current consulting positioning.

## Verified

Unauthenticated requests, so this is what any visitor gets:

    /andrew-deltoro  -> 302  https://deltoro.dev/card
    /asvpdmguow/842173 -> 301 -> /andrew-deltoro -> 302 -> https://deltoro.dev/card

Final response: HTTP 200 from deltoro.dev/card.

So both the NFC tap and the printed QR now land on this site. The QR pixels did not change; the page they point at now redirects. No support ticket, no sticker, and no chip rewrite is required.

## If it ever stops

Open https://app.v1ce.co → Pages → Link → Redirect visitors and confirm the toggle is on and the URL is https://deltoro.dev/card. If V1CE changes plans or removes the setting, use the QR label below or ask support to re-point the card.

## Optional: rewrite the NFC chip anyway

Only do this if you want the tap to bypass V1CE entirely. The redirect already works, so this is optional.

1. Install **NFC Tools** (wakdev) on your phone.
2. Open **Read**, hold the phone against the card, and note the chip type and whether it is writable. Most V1CE cards use NTAG213/215/216.
3. If it is writable: open **Write → Add a record → URL / URI**, enter https://deltoro.dev/card, confirm, then tap **Write** and hold the phone to the card.
4. Test the tap with the phone screen on and off, and from another phone if possible.
5. If NFC Tools says the tag is locked, password-protected, or not writable, stop. The V1CE redirect is already doing the job; do not force or erase the tag.

## QR fallback if V1CE ever fails

docs/card-qr-label.png decodes to https://deltoro.dev/card. Print it about 30 mm wide on white sticker paper and place it over the old QR, or use it on future cards and flyers.

## The page it lands on

https://deltoro.dev/card — a focused, no-index card page with book-a-call, email, save-contact (.vcf), the work, and the free checkup.
