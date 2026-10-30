---
title: "FY!RE Real Estate"
kicker: "A conversion-first site with an AI assistant"
summary: "A Los Angeles real-estate site built as a full production-style marketing build: valuation funnel, neighborhood content, mortgage calculator, and an AI assistant on a Cloudflare Workers backend."
category: "Web"
year: "2026"
status: "Concept build"
role: "Design, frontend, AI integration, deployment"
timeline: "Multi-week build"
stack:
  - "Claude API"
  - "Cloudflare Workers"
  - "Netlify"
  - "GitHub CI"
  - "SEO"
liveUrl: "https://fyre-realestate.netlify.app"
cover: "/images/projects/fyre"
coverAlt: "FY!RE Real Estate homepage with a large headline, lime green accents, and a chat assistant launcher"
featured: true
order: 4
service: "web-tools"
disclaimer: "FY!RE is a demonstration brand built to show the full build. It is not a real brokerage, and the phone number and listings are placeholders."
prove:
  - "I can build a complete marketing site, not a hero section and a promise."
  - "I can put an LLM behind a serverless boundary so the API key never reaches the browser."
  - "I can structure content around what a visitor needs to decide, rather than what the business wants to say."
---

## The problem

Real-estate sites tend to fail in the same place: they ask a visitor to call before answering the only question the visitor actually has. A demo build is a useful test of whether I can design the whole path — landing page, valuation request, neighborhood research, and a conversation — instead of stopping at a nice hero.

## What I built

A multi-section marketing site with a coherent visual identity and a lead path that appears at every stage:

- **Hero with a single primary action**: get a home valuation, with a secondary path to talk to someone.
- **Valuation funnel** with address, bedrooms, and square footage, ending in an estimate range and a follow-up request.
- **Neighborhood and listing content** structured for search, with the market context a buyer or seller would actually want.
- **Mortgage calculator** and FAQ content that answers objections before they become support emails.
- **AI assistant** with an instant initial reply, backed by the Claude API through a Cloudflare Worker.

The assistant is deliberately narrow. It answers questions about the process, the neighborhoods, and next steps, and escalates to a human for anything that would require a licensed opinion. A chatbot that confidently invents a listing is worse than no chatbot.

## Why the backend sits where it does

The Claude API key cannot live in client-side JavaScript. Cloudflare Workers puts a small serverless boundary in front of the model, keeps the key server-side, and lets me control the system prompt and request shape without exposing either.

## What I learned

Conversion structure is a content problem before it is a design problem. The valuation form works because it asks for three things, not twelve. The assistant works because it is introduced at the moment a visitor hesitates, not as a floating ornament.

I also learned to design the empty and error states as carefully as the happy path. An estimate that cannot be calculated needs to say why, not return zero.

## Honest limits

This is a demonstration brand. The phone number, listings, and sales figures are placeholders, and the assistant is configured as a general concierge rather than a licensed real-estate advisor.
