---
title: "RouteBid"
kicker: "A school bus route bidding platform"
summary: "A proof of concept that replaces a paper route-bidding process: admin draft controls, QR driver login, live assignments, CSV/PDF import, test mode, and an export that matches the district's existing process."
category: "Web"
year: "2026"
status: "Proof of concept"
role: "Workflow design, frontend, data model"
timeline: "Several iterations"
client: "Concept for a school district transportation office"
stack:
  - "Supabase"
  - "JavaScript"
  - "CSV/PDF parsing"
  - "QR codes"
liveUrl: "https://dsusd-route-bidding-demo.netlify.app"
cover: "/images/projects/routebid"
coverAlt: "RouteBid live board showing driver assignments, proxy bids, and routes"
featured: false
order: 5
service: "web-tools"
prove:
  - "I can take a messy offline process and model it without changing how the people doing the work think."
  - "I can build role-based flows and admin controls that survive real operational pressure."
  - "I can design a test mode so a high-stakes live event can be rehearsed first."
---

## The problem

School bus routes are often assigned through a paper bid: drivers pick routes in seniority order, an administrator tracks who has taken what, and the result is copied into a spreadsheet afterward. It works until two people pick the same route, a driver is absent, or someone needs to bid by proxy.

The hard part is not a database table. It is preserving the rules and the visible order that make the process feel fair.

## What I built

A role-based web application with three views:

- **Admin** — upload the driver roster as CSV, import route sheets as PDF, start or pause the draft, proxy a bid for an absent driver, and export the final result back to CSV.
- **Driver** — scan a personal QR code, set a password, and bid on an available route. Once a route is taken, it leaves the list.
- **Observer** — a read-only live board for someone who needs to watch without touching anything.

Around those views: a live "connected now" panel, a ranked driver roster showing who has checked in, a queue of routes already taken and by whom, and a test mode that marks every selection as practice so the real draft can be rehearsed.

## The details that made it usable

- **Test mode is prominent.** A banner across the top says selections will not count. A live operational tool that cannot be rehearsed safely is a tool people avoid.
- **Pause is a first-class control.** The administrator can freeze every timer, because a real draft stops when a driver calls in.
- **Export matches the existing process.** The output is a CSV the office already knows how to use, not a proprietary format that requires the tool to survive forever.
- **Proxy bids are labeled.** When an admin bids for a driver, the board says so. Fairness is a UI feature.

## What I learned

Operational software lives or dies on the exceptions. The happy path — twenty drivers pick twenty routes — is easy. The real requirements were the paused draft, the proxy bid, the driver who scanned the wrong QR code, and the export that has to line up with a spreadsheet someone has used for a decade.

## Honest limits

This is a proof of concept using demonstration data. It has not been through a district's procurement, accessibility review, or a live draft. Those would be the next steps before anyone relied on it for a real assignment.
