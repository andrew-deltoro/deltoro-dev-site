---
title: "Jev"
kicker: "An analysis-only adaptive trading service"
summary: "A read-only Python service on a Linux VPS that reads Hyperliquid market data, classifies the regime, and lets JEV choose a bounded strategy profile. It cannot place orders — deliberately."
category: "AI"
year: "2026"
status: "In development"
role: "Architecture, market data, JEV integration, journal"
timeline: "Ongoing R&D · v0.2.1"
stack:
  - "Python"
  - "Hyperliquid API"
  - "SQLite/WAL"
  - "LLM integration"
  - "Docker"
repoUrl: "https://github.com/andrew-deltoro/hyperliquid-jev-bot"
cover: "/images/projects/jev"
coverAlt: "Diagram of Jev showing market ingestion, persistent memory, bounded tool use, and scheduled reviews on a VPS"
featured: false
order: 9
service: "automation-ai"
prove:
  - "I can build a long-running service with real state, scheduled work, and failure handling."
  - "I treat AI as a component with boundaries, not an autonomous authority over money."
  - "I can be precise about what a system does not do — which is often the most important part."
---

## The problem

Discretionary trading decisions are inconsistent. The same setup gets taken on a Tuesday and skipped on a Thursday, and nobody can reconstruct why.

I wanted a system that could classify the market regime, choose from a small set of bounded strategies, and keep a journal of every decision. The interesting constraint was safety: an LLM should be allowed to reason about strategy selection, but it should not be able to move money.

## What it is

Jev — the **Hyperliquid JEV Adaptive Bot** — is a read-only analysis service for a Linux VPS. Version 0.2.1 runs continuously, polls public Hyperliquid data, and writes every decision to a local journal.

- **Market discovery** across native perpetuals, HIP-3 DEX perpetual metadata, and spot registry entries. Spot analysis is explicitly unsupported.
- **Live ingestion** of completed one-minute candles over read-only HTTP. No WebSocket feed or order-book liquidity measurement yet.
- **Regime classification** into trend, range, volatility expansion, and shock conditions, using transparent heuristics rather than a black box.
- **Bounded strategy selection**: trend pullback, volatility breakout, range mean reversion, and liquidity-sweep reversal. JEV selects a joint strategy/profile choice, with routing refresh, minimum dwell, and cached state to prevent constant switching.
- **A JEV adapter** with strict response validation, timeouts, a rolling-hour call cap, and no silent substitution when live data is unavailable.
- **A SQLite/WAL journal** that records inputs, model decisions, reason codes, candidates, and hypothetical sizing across restarts.
- **A forward-only scoreboard** with deterministic baseline lanes and a JEV policy lane, modeled costs, and unresolved-path tracking.
- **Six-hour evidence reviews** that build context-matched memory for JEV and propose challenger strategies without promoting them automatically.

## What it deliberately cannot do

This release has no wallet signer, no exchange-order adapter, no private account reader, no live authorization switch, and no withdrawal capability. It cannot place an order.

That is the design. A model that is good at pattern description is not a risk management system, and I did not want to discover the difference with real money. Any future execution layer would be a separate, explicitly authorized component with its own limits.

## The honest status

This is R&D, not a product. The scoreboard is hypothetical and forward-only; it is not a backtest approval engine or a proven profitable system. The recursive-improvement idea needs far more evaluation, and I have less time to prompt and tune it than the project deserves.

## What I learned

Reliability is ordinary engineering. The model is one component; the rest is process supervision, retries, timeouts, structured logs, and being able to see what the agent did and why.

Prompting gets the attention. State management and failure handling are where this kind of service actually lives or dies.
