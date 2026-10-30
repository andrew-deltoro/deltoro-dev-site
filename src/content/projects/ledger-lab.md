---
title: "Ledger Lab"
kicker: "Hands-on bookkeeping training, not video lectures"
summary: "An interactive bookkeeping lab with four learning paths — daily operations, reconciliations, payroll, close, and reporting — plus a tutor that explains the reasoning behind a line item."
category: "Web"
year: "2026"
status: "Live"
role: "Curriculum structure, interface, tutor integration"
timeline: "Multi-week build"
stack:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "Instructional design"
liveUrl: "https://full-charge-lab.netlify.app"
cover: "/images/projects/ledger-lab"
coverAlt: "Ledger Lab bank reconciliation lesson with source documents, general ledger, and a reconciliation worksheet"
disclaimer: "A training tool, not accounting or tax advice."
featured: false
order: 12
service: "web-tools"
prove:
  - "I can turn a dry professional skill into a guided, hands-on exercise."
  - "I can build complex stateful forms — reconciliation worksheets — without a framework."
  - "I design for the moment someone gets stuck, not just the happy path."
---

## The problem

Bookkeeping courses tend to be either a video you watch passively or a worksheet with no feedback. Neither builds the reflex that matters: looking at two records that do not agree and working out why.

I wanted a lab where the learner actually prepares the reconciliation, enters the numbers, and gets told what is wrong — with the reasoning, not just the answer.

## What I built

Four learning paths, each with a sequence of labs:

1. **Daily operations** — vendor bills, early-payment discounts, customer payments, AR aging and collections.
2. **Recurring cycle** — bank reconciliation, credit-card reconciliation, payroll register and gross-to-net, payroll liabilities and remittance.
3. **Close and adjustments** — prepaid expenses, accruals, depreciation, and a month-end close capstone.
4. **Reporting and compliance** — manual income statement, balance sheet, sales tax reconciliation, and fixed assets.

Each lab presents source documents, a general ledger, and a worksheet the learner fills in. The worksheet checks the balances and explains the discrepancy instead of just marking it wrong.

There is also a **tutor** that works on highlighted text: select a term or a line item, ask a question, and it explains the reasoning behind that specific thing.

## The design decisions

The labs are built around a consistent document → worksheet → check loop. Once the learner understands one lab, the next one is legible. That consistency is what makes a long curriculum feel navigable.

The worksheet is a stateful form with calculated fields and validation. Doing that without a framework was a deliberate choice: the whole lab loads fast, works on a cheap laptop, and has no build step to rot.

## What I learned

The teaching happens at the error. A wrong number with a good explanation teaches more than a right number with a checkmark, so most of the interface effort went into the feedback.

I also learned how much instructional design is really information architecture. The path names, the order of labs, and the visible progress matter as much as the accounting content.

## Honest limits

This is a training environment built around a fictional company and illustrative numbers. It is not a bookkeeping system, and it is not accounting advice.
