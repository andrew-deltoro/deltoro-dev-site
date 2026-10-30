---
title: "Sovereign Capital Engine"
kicker: "A signal pipeline with actual accountability"
summary: "A research dashboard that moves TradingView alerts through a vetted pipeline: screener score, watchlist, signed webhook, position sizing, and trade journal. Built so an alert cannot skip the process."
category: "Automation"
year: "2026"
status: "Live"
role: "Architecture, frontend, webhook backend, risk model"
timeline: "Several iterations"
stack:
  - "Netlify Functions"
  - "Netlify Blobs"
  - "TradingView webhooks"
  - "JavaScript"
liveUrl: "https://sovereign-captial-engine-v2.netlify.app"
cover: "/images/projects/sovereign"
coverAlt: "Sovereign Capital Engine dashboard showing capital and risk controls above a ranked screener"
gallery:
  - src: "/images/projects/sovereign-signals-1440.webp"
    alt: "Live TradingView signals table showing symbols, prices, suggested stops, and unvetted flags"
    caption: "Signals that arrive for symbols the screener never vetted are flagged UNVETTED. That flag is the feature."
featured: true
order: 3
service: "automation-ai"
disclaimer: "This is an educational research tool, not financial advice. It does not guarantee profit and it is not connected to a brokerage account."
prove:
  - "I can design a pipeline with explicit state and an audit trail, not just a page that displays data."
  - "I know how to authenticate a webhook and store its payload safely at the edge."
  - "I think about failure and misuse first — what happens when an alert arrives for a symbol nobody vetted."
---

## The problem

Trading alerts are easy to generate and easy to ignore. A signal arrives, it looks convincing, and it enters the journal without anyone checking whether the symbol passed a screen, whether the position size makes sense, or whether the stop was ever defined.

The interesting engineering problem was not finding candidates. It was making it hard to act on a signal that had not earned it.

## What I built

A five-stage pipeline, visible on the page, that a trade has to move through from left to right:

1. **Screener** ranks candidates out of 100 using trend, momentum, liquidity, and risk factors.
2. **Watchlist** holds the names worth setting an alert on.
3. **TradingView webhook** delivers alerts to a Netlify Function, authenticated with a shared secret.
4. **Review** puts the alert in front of a human with the vetted status attached.
5. **Risk controls** size the position and calculate the maximum loss before anything is logged.

Signals are stored in Netlify Blobs. Alerts for symbols that never passed the screener are marked **UNVETTED** in red. They can still be reviewed — but the system makes the shortcut visible instead of pretending it did not happen.

## The risk model

The dashboard starts from capital and risk per idea: a $1,000 account risking 1% has a $10 maximum loss per trade. From there it applies notional caps by asset class — tighter for penny stocks, looser for bonds — and suggests a stop based on the instrument's volatility.

It is deliberately conservative and deliberately unglamorous. The point is to make the downside legible before the upside gets interesting.

## What I learned

Most of the value is in the pauses. A screener that finds nothing is more useful than one that finds something marginal. A webhook that rejects unsigned payloads is more useful than one that accepts everything quickly.

I also learned how much of this kind of work is state design. The screener, watchlist, alert, and journal are four different stores of truth, and the bugs live in the transitions between them.

## Honest limits

The public demo depends on a third-party market-data API. When that API rejects the request — plan limits, an expired key — the screener says so instead of showing stale or invented data. The live signal table and the risk tools work independently.
