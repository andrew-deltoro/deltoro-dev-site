---
title: "Security+ SY0-701 Microlearning Hub"
kicker: "The study tool I built to pass the exam"
summary: "A single-page study environment for CompTIA Security+ SY0-701: domain explorer, quick reference, practice quizzes, performance-based questions, and an acronym library. I built it while studying, then passed."
category: "Security"
year: "2026"
status: "Live"
role: "Research, content, build"
timeline: "Built during exam prep"
stack:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "Instructional design"
liveUrl: "https://comptia-securityplus-studyguide.netlify.app"
cover: "/images/projects/securityplus"
coverAlt: "Security+ SY0-701 study hub showing the six exam domains with their percentage weighting"
featured: false
order: 6
service: "security-audit"
prove:
  - "I can turn a dense body of knowledge into a structure that supports recall, not just reading."
  - "I finish what I start — this was used, not abandoned."
  - "I understand the Security+ domains well enough to teach them, which is a different bar than passing."
---

## The problem

Exam prep defaults to re-reading. Re-reading feels productive and does almost nothing for recall. I wanted a tool that forced me to retrieve answers, especially in the domains where I was weakest — cryptography, incident response order, and the endless acronyms.

## What I built

One page, five modes, no account required:

- **Domain explorer** — the six SY0-701 domains weighted by their exam percentage, each with the concepts that actually appear.
- **Quick reference** — the tables worth memorizing: agreement types, incident response order, OSI layers, control categories.
- **Practice quiz** — questions with explanations, not just right/wrong.
- **PBQs** — performance-based scenarios in the style of the exam, where the answer is a sequence or a configuration rather than a single option.
- **Acronym library** — searchable, because SY0-701 is partly a vocabulary exam.

I used mnemonics where they helped ("Please Do Call Early, Results Last" for the incident response order) and called out the traps the exam actually sets, like swapping containment and eradication.

## Why build it instead of using someone else's guide

Writing the explanations exposed what I did not actually understand. A topic I could read and nod at became obvious the moment I had to write a quiz question and a plausible wrong answer for it.

It also gave me a reason to keep the content honest. If an explanation was wrong, I would fail my own quiz.

## The result

I sat the exam and passed. The site stayed up afterward, because the material is useful beyond one person's prep and because it is a clearer demonstration of understanding than a certificate alone.

## What I learned

Good study material is mostly editorial judgment: what to include, what to leave out, and what misconception to address directly. The code was the easy part.
