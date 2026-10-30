# V1CE card: what the screenshots show, and the three ways to fix it

## What the card does right now

- **NFC tap** opens https://link.v1ce.co/andrew-deltoro — your V1CE profile.
- **Printed QR** decodes to https://link.v1ce.co/asvpdmguow/842173, which answers with a **301** to /andrew-deltoro. So the QR also lands on the profile.
- The profile still lists the old Netlify site as its website.

## What your dashboard screenshots show

The Co-Work panel says you have **no QR code and 0 scans**, and that there is no NFC settings screen. That is consistent with the **free / legacy V1CE dashboard**, not ClientCapture OS. The printed QR on the bamboo card is a legacy QR that was generated with the physical card; it is not exposed in your dashboard's QR Code feature.

That explains the confusion: the dashboard's QR builder is empty because the printed QR was never a dashboard QR code. It is a static legacy short link that redirects to your profile.

Co-Work's suggestion to add a QR on the Sharing tab would create a **new** QR code. It would not change the one already printed on the card.

## The three real options

### 1. Ask V1CE support to re-point the legacy QR and NFC link (best)

V1CE's own help centre says they re-point legacy cards for free, usually within one business day. Send this from the support chat in the dashboard or to V1CE support:

> Hi — I have a V1CE bamboo card on the free/legacy plan. My dashboard has no QR code entry and no NFC settings, and Co-Work confirms there is no QR code on the account.
>
> I need the NFC tap and the printed QR to open my website instead of my V1CE profile.
>
> Account email: adeltoro702@gmail.com
> Card ID (last 4): [FILL IN FROM THE CARD SLEEVE]
> Current NFC URL: https://link.v1ce.co/andrew-deltoro
> Printed QR URL: https://link.v1ce.co/asvpdmguow/842173
> Desired destination: https://deltoro.dev/card
>
> Please re-point the card's NFC link and the printed QR short URL to that destination. If the QR cannot be changed, please tell me the options.

You can also ask them to make https://link.v1ce.co/andrew-deltoro itself a direct link to https://deltoro.dev/card. Because the printed QR redirects to that slug, changing what that slug serves would fix the QR without touching the printed code.

### 2. Rewrite the NFC chip yourself (fixes the tap only)

Most V1CE chips are rewritable with an app such as **NFC Tools** (iOS/Android):

1. Open NFC Tools → Write → Add a record → URL.
2. Enter https://deltoro.dev/card.
3. Hold the phone against the card and write.
4. Test the tap before relying on it.

This does not change the printed QR. Do this only if you are comfortable rewriting the tag; if the chip is locked, the write will fail harmlessly.

### 3. Cover the printed QR with a new label (fallback)

I generated a print-ready label at **docs/card-qr-label.png**. It decodes to https://deltoro.dev/card and includes your name and the short URL.

- Print it at about 30 mm wide on white sticker paper.
- Trim it and place it over the old QR on the bamboo card, or use it on future cards, flyers, and a desk sign.
- It is a white label on a bamboo card, so it is a fallback, not the ideal finish.

## Also update the profile

Until the redirect is fixed, the profile is what people see. Sign in at https://app.v1ce.co and:

- Change the website from the old Netlify URL to https://deltoro.dev.
- Update the bio to: "IT and security consulting for small businesses in the Coachella Valley. Security+ certified."
- Add a link labelled **Website** or **Book a call** to https://deltoro.dev/card.

## Do not upgrade just for this

ClientCapture OS is the paid plan with QR management and direct links. It may make the dashboard nicer, but V1CE support can re-point the legacy card without a subscription. Upgrade only if you want the CRM/lead-capture features.

## What I need from you

1. The **last four digits of the card ID** (on the card sleeve) so the support message is actionable.
2. Whether you want me to keep going on the support route, or whether you would rather log in and let me drive the dashboard in a browser session. I will not ask you to paste your password here.

The site destination is live at https://deltoro.dev/card. The only missing piece is V1CE's backend redirect.
