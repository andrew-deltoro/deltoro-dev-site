---
title: "Hyperliquid Stat Arb Bot"
kicker: "A live pairs-trading experiment, archived honestly"
summary: "A Python statistical-arbitrage bot for Hyperliquid perpetuals. It ran live for about a month, did not produce a result worth continuing, and is archived."
category: "Experiment"
year: "2026"
status: "Archived"
role: "Strategy, engineering, risk controls, evaluation"
timeline: "~1 month live"
stack:
  - "Python"
  - "Hyperliquid API"
  - "Statistics"
  - "Risk controls"
  - "Automated execution"
repoUrl: "https://github.com/andrew-deltoro/hyperliquid-stat-arb-bot"
cover: "/images/projects/hyperliquid"
coverAlt: "Diagram of the Hyperliquid stat-arb bot showing pair selection, z-score signalling, sizing, and execution"
featured: false
order: 10
service: "automation-ai"
disclaimer: "This is a personal research experiment, not financial advice or a solicited trading product. It is not running. The repository README contains performance figures from the project's research phase; they are not a verified live track record and are not presented as one here."
prove:
  - "I can build and operate a system that talks to a live financial API with real capital at risk."
  - "I instrument an experiment so the result can be judged, including when the result is negative."
  - "I can stop something that is not working instead of dressing it up."
---

## The problem

Pairs trading is an old idea: find two assets that historically move together, wait for the spread to diverge, and bet on convergence.

On a perpetual futures exchange, the details that decide whether it works are fees, funding, liquidity, and execution — not the elegance of the statistic. I wanted to find out whether a retail-sized version could clear those costs on Hyperliquid.

## What I built

A Python bot with four parts:

- **Pair selection** using cointegration tests over a rolling window, filtered for liquidity.
- **Signal generation** from the spread z-score, with entry and exit thresholds.
- **Position sizing** capped by account risk, per-market notional limits, leverage ceiling, and a daily loss limit.
- **Execution and logging** against the Hyperliquid API, with a kill switch and a record of every decision.

The repository also includes a testnet mode for dry runs and a non-custodial design: the bot uses a trade-only agent wallet, so funds stay on Hyperliquid and the bot has no withdrawal permission.

## The result

It ran live for about a month. It did not produce a result worth continuing, so I archived it rather than tuning parameters until a backtest looked good.

Parameter search on a month of data is a machine for producing false confidence. Stopping was the correct outcome of the experiment.

## What I learned

The strategy was the least interesting part. Execution quality, fee drag, and the discipline to stop mattered more than the signal.

I also learned to separate "the code works" from "the idea works." The bot did what it was told, reliably. The idea still did not make money, and those are different failures that deserve different responses.

## What I would do next

Longer out-of-sample data, explicit fee and funding modeling from day one, and a paper-trading period before any capital. And a written hypothesis with a falsification condition, so the decision to stop is made before the results are known.
