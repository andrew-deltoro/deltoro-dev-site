---
title: "We tested six directional strategies on 175 Hyperliquid perps"
date: 2026-10-07
draft: false
tags: ["quant", "hyperliquid", "research"]
categories: ["Trading"]
summary: "Six strategies tested. Five rejected. One shipped. The full story with all the bugs."
---

# We tested six directional strategies on 175 Hyperliquid perps. Here's what happened.

For the last two months I've been building a market-neutral statistical
arbitrage bot on Hyperliquid. It works. It earns roughly 0.35%/month on
$3,100 of capital, with a Sharpe around 0.6. Small, but real.

The obvious question, given how much infrastructure we've built, was:
**can we add a second strategy that makes real directional money?**

This is the story of testing six of them. Every single one failed. Here
are the numbers, the bugs, and why I think this outcome is more instructive
than a success story would have been.

## The infrastructure

Before testing anything, we had:
- A live pairs-trading bot on Hyperliquid (delta-neutral, cointegration-based)
- A walk-forward backtest framework using PyMC for MAP fitting
- Access to HL's public API for candles, funding, order book
- A systemd-based deployment on a $20/month VPS
- The Skylark Financial Liquidity Proxy (FLP) as a macro regime signal

Two weeks of work, maybe 4,000 lines of Python.

## Strategy 1: Dynamic beta via Kalman filter

**Thesis**: The bot refits cointegration β every 4 hours. Between refits, β
is frozen. If β drifts intra-cycle, the hedge ratio is stale. A Kalman filter
tracks β continuously.

**Result**: On crypto pairs (fast mean reversion, ~24h half-life), Kalman
cut spread std by 16× and pushed ADF p-value from 0.009 to 0.0000. On semis
pairs (~100h half-life), Kalman made things worse.

**Outcome**: Shipped live with a gating rule — Kalman for fast pairs, static
fit for slow pairs. Estimated +15% improvement on the pairs strategy. Under
observation. This is the only strategy that survived.

## Strategy 2: Basket cointegration via Johansen

**Thesis**: Pairs cointegration finds relationships between 2 assets. Johansen
generalizes to K assets. Maybe the L1 sector as a whole has a stationary
linear combination that we can trade as a basket.

**Result**: On a 90-day window, the L1 group showed rank=1 with ADF p=0.0000.
But when we ran 60/90/120-day rolling windows, rank was unstable — sometimes
0, sometimes 1, sometimes 2. The single good window was an artifact.

**Conclusion**: The structure isn't stable enough to trade. Rejected.

## Strategy 3: Macro FLP as a directional filter

**Thesis**: The Skylark FLP classifies liquidity regimes (Favorable < 50,
Transitional 50-65, Defensive > 65). Trade long in Favorable, short in
Defensive. Sit flat in Transitional.

**Result**: FLP has been stuck between 55 and 69 for the entire 22-month
sample. The Favorable regime never triggered. The strategy made 1 trade
in 3 years on BTC.

**Bug**: We realized the FAVORABLE threshold was calibrated on 2018-2022
data, when FLP spent real time below 50. In the current regime, the level-based
signal is dead.

**Retry**: Tested velocity (FLP 30d change) and quantile (rolling 1y terciles).
Both underperformed trend-only baseline. FLP quantile-only Sharpe: 0.48 on BTC,
0.20 on ETH, 0.43 on SOL — noise.

**Conclusion**: Monthly FLP is a macro descriptor, not a directional signal.
Rejected.

## Strategy 4: Time-series trend following

**Thesis**: The classic. Long above the moving average, short below. Dual-MA
ensemble (50/100/200). 2×ATR stops.

**Iterations**: This took six versions. Each one fixed a bug in the previous.

- **v1/v2**: Reported Sharpe of 4.7-5.7. Not real — the equity concatenation
  was multiplying fold returns incorrectly.
- **v3**: Fixed concatenation, added fees. Reported Sharpe of 0.5-0.9.
  But the fees were recorded in `trades[]` and never subtracted from equity.
- **v4**: Fixed fee accounting. Tested 29 hand-picked coins. Median Sharpe
  0.24, but an equal-weight portfolio of all 29 hit Sharpe 1.35.
- **v5**: Fixed the hand-picking bias. Fetched 195 HL perps, walk-forward
  every quarter with trailing-Sharpe coin selection. OOS Sharpe: **0.42**.
- **v6**: Combined with cross-sectional momentum. Best config Sharpe: **0.20**.

**Final honest number**: Trend-following on Hyperliquid perps, with realistic
fees and no look-ahead bias, produces Sharpe ~0.42 OOS. That's below BTC
buy-and-hold (0.88). Rejected.

## The bugs

Every one of these was caught by comparing the simulated equity to the
positions list. What we found:

1. **Equity concat bug** — concatenating fold-equity curves without
   multiplying by prior fold's terminal value. Creates fake 100% drawdowns.
2. **Fees-in-trades-only** — fees stored in the trade log but not subtracted
   from the running equity. Silent 1-2% inflation per trade.
3. **Annualization exponent** — `equity[-1] ** (365/n)` should be
   `equity[-1] ** (periods_per_year/n_periods)`. Reported Sharpe 3,117 due
   to this bug alone.
4. **Survivorship bias** — hand-picked coins that exist today. Dead coins
   from 2023-2024 aren't in the sample.
5. **Forward-fill on delisting** — delisted coins freeze at last price,
   contributing zero return but still eligible for selection.

The corrected code produces numbers 10-100× smaller than the buggy versions.
This is normal. Every quant goes through this. The question is whether
you notice.

## Why everything failed

The unified reason is structural. Crypto is a highly competitive market
for *directional* strategies. Every retail trader, every quant fund, every
HFT shop is trying to predict price. The edges that survive are small and
get arbitraged away quickly.

Market-neutral stat-arb works because it's the *boring* corner of the
market. Institutional money can't be bothered with a $250 pair trade on
HL when they're moving $50M in BTC perp. The edge is small but real, and
it's ours to take.

Directional strategies need either an information advantage we don't have,
or a model advantage that would take years to develop. Neither is
achievable at retail scale.

## What we're doing next

Two things:

1. **Keep the pairs bot running.** It earns small money, it's live, and it
   works. The Kalman upgrade is under observation.

2. **Microstructure edge research.** We now have a live recorder pulling
   HL order book + trade flow + Kalshi 15-minute BTC direction prices every
   30 seconds. In two weeks, we'll have ~40,000 observations of:
   - Order flow imbalance (OFI) on HL
   - Taker buy/sell ratio over rolling 5-minute windows
   - Kalshi 15-minute directional pricing

   If HL microstructure predicts Kalshi's 15-minute contracts with >55%
   accuracy, we have a tradeable edge. This is the only untested hypothesis
   left.

## The uncomfortable truth about leverage

Before we close, one note. Reading this, you might ask: if we can't find
directional edge, why not just leverage the pairs bot?

The answer is Kelly. At 30 trades of live data, our estimate of Sharpe is
0.6 ± 0.4. The lower bound of that interval is nearly zero. Leveraging a
strategy whose true Sharpe might be 0.2 is how accounts blow up. Real
quant funds run 2-3x leverage on strategies with 500+ trades of history
and Sharpe > 1.5. We don't have that evidence yet.

If the bot continues to perform over the next 100 trades, we'll revisit
leverage with real data. Not before.

## Takeaways

1. **Six strategies tested. Five rejected. One shipped.**
2. **Realistic Sharpe for retail trend-following on crypto: 0.4–0.9.**
   Not 3.0. If you see a backtest with Sharpe > 2.0 and no obvious
   explanation, look for bugs.
3. **Market-neutral is where the retail edge lives.** Directional is
   dominated by institutions.
4. **The infrastructure is the real asset.** It lets you test an idea
   per day instead of per month.
5. **Every failure narrows the search.** We now know 5 strategies that
   don't work at this scale. That's information.
