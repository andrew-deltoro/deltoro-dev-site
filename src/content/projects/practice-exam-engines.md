---
title: "Practice Exam Engines"
kicker: "Timed practice tests for public-sector job classifications"
summary: "One reusable exam engine behind three practice tests: 50 to 90 questions, section scoring, randomized answer positions, pause, skip tracking, and immediate explanations."
category: "Web"
year: "2026"
status: "Live"
role: "Exam logic, question structure, interface"
timeline: "Template plus per-exam question banks"
stack:
  - "HTML"
  - "CSS"
  - "JavaScript"
  - "Assessment design"
liveUrl: "https://payroll-specialist-practice-exam.netlify.app"
cover: "/images/projects/payroll-exam"
coverAlt: "Payroll Specialist Practice Exam interface showing a timed 90-question exam, score, and multiple-choice question"
disclaimer: "Independent study tools. Not affiliated with or endorsed by Desert Sands Unified School District or the Los Angeles Community College District."
featured: false
order: 11
service: "web-tools"
prove:
  - "I can build a reusable assessment engine instead of three one-off quizzes."
  - "I think about timing, skipping, and review as part of the learning design."
  - "I can ship a complete browser tool without a backend."
---

## The problem

Public-sector job exams are usually prepared for with a PDF and a highlighter. That does not reproduce the two things that actually decide the result: time pressure and the ability to move on from a question you cannot answer.

I built a timed practice environment that behaves like the real thing, then reused the engine for three different classifications.

## What I built

One exam engine, configured per test:

- **Payroll Specialist** — 90 questions, 90 minutes, LACCD format.
- **Budget Technician** — 50 questions, 50 minutes, DSUSD format.
- **Administrative Specialist** — 50 questions, 50 minutes, DSUSD format.

Shared behavior:

- Immediate right/wrong feedback with a short explanation for every question.
- A running score and a countdown timer.
- **Pause** that locks and blurs the exam, so stepping away does not burn the clock.
- **Answer positions shuffled on every load**, so the learner memorizes the reasoning instead of the letter.
- **Section order randomized** while question numbers stay fixed, which keeps the results table readable.
- **Skip for now** with a tracker, and a clock that stops while a question is skipped and resumes when it is revisited.
- Section-by-section score and time breakdown at the end.

## The design decisions

The engine is deliberately client-side and static. There is no account, no backend, and no data leaving the browser, which makes it cheap to host and easy to hand to someone who just wants to study.

The hard part was not the quiz logic. It was the state model: answered, skipped, paused, running, section boundaries, per-question timing, and a resume path that does not corrupt the score. Most of the work went into the transitions, not the questions.

I also treated the question bank as content, not code. Adding a new classification means adding a bank and a configuration, not rebuilding the interface.

## Try them

- [Payroll Specialist Practice Exam](https://payroll-specialist-practice-exam.netlify.app)
- [Budget Technician Practice Exam](https://comforting-starburst-2f5319.netlify.app)
- [Administrative Specialist Practice Exam](https://gleeful-tarsier-739ee4.netlify.app)

## What I learned

A study tool is a state machine with a teaching purpose. If the timer, the skip behavior, or the review path is confusing, the learner stops trusting the score — and then stops using the tool.
