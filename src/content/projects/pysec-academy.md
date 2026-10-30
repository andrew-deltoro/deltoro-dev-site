---
title: "PySEC Academy"
kicker: "A Python curriculum for security analysts"
summary: "A browser-based Python learning platform for people who defend things. Real Python runs client-side through Pyodide, with Supabase auth and row-level security so each learner's progress stays private."
category: "Security"
year: "2026"
status: "Live"
role: "Curriculum, platform, frontend, auth model"
timeline: "Several weeks, still expanding"
stack:
  - "Python"
  - "Pyodide / WebAssembly"
  - "Supabase"
  - "JavaScript"
  - "Row-level security"
liveUrl: "https://pysec-academy.netlify.app"
cover: "/images/projects/pysec-academy"
coverAlt: "PySEC Academy landing screen with a lesson track sidebar and a guided versus self-guided path choice"
gallery:
  - src: "/images/projects/pysec-lesson-1440.webp"
    alt: "A PySEC lesson on hashing and integrity showing example Python code and a prompt for the learner's approach"
    caption: "Lessons ask for a plan before showing the expert answer. The friction is the teaching method."
featured: true
order: 2
service: "automation-ai"
prove:
  - "I can design a learning experience, not just a page that displays text."
  - "I know how to run untrusted code in a browser without putting a server at risk."
  - "I can implement per-user data isolation properly, with database-level policy rather than frontend hiding."
---

## The problem

Most security analysts can read a log and explain what happened. Fewer can write the ten lines of Python that would have caught it automatically. The gap is not intelligence; it is that most Python courses are built for future software engineers, not for people working in a SOC.

I built the course I wanted while studying for Security+ — short, security-flavored lessons that end with a working script.

## What I built

PySEC Academy is a static frontend with a real Python runtime inside it. [Pyodide](https://pyodide.org/) compiles Python to WebAssembly, so learners execute code in their own browser. There is no server-side execution path to secure, which is a meaningful design decision for a platform that runs arbitrary learner code.

- **A guided track** covering hashing, log triage with regex, encoding and decoding, layered decoding, HTTP recon, and building tooling against Supabase.
- **A self-guided mode** where a learner names a topic and gets a lesson built around it.
- **Downloadable scripts** so a lesson can graduate into Cursor or VS Code instead of dying in a browser tab.
- **Supabase auth** with row-level security policies so progress is scoped to the authenticated user at the database layer.
- **An AI tutor** behind a Supabase edge function, rather than an API key sitting in client-side JavaScript.

## The design decision that mattered

The original temptation was a Python execution backend. It would have been easier and it would have been a liability: a public endpoint that runs arbitrary code is a standing invitation.

Pyodide removes that entire class of risk. The tradeoff is bundle size and startup time, so the app degrades into an IDE-style mode when the engine cannot load, and says so plainly instead of pretending the lesson is broken.

## What I learned

Curriculum design is harder than the code. A lesson that explains hashing is easy to write and easy to forget. A lesson that asks the learner to predict what changes when one byte changes, then runs the code to settle the argument, is the one that sticks.

I also learned to respect the failure states. Offline engine, expired session, no Supabase connection — each one needed an honest message and a path forward, not a spinner.

## Note on the public demo

The live site is the real application. Supabase-backed features (accounts, saved progress, AI tutor) require a Supabase project, and the app lets a visitor connect their own. The lessons and the in-browser Python engine work without one.
