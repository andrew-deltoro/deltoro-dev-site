// scripts/quotes-fetch.mjs
//
// Runs server-side (GitHub Action or anywhere with Node 18+), fetches the
// quote universe, ranks by 24h dollar volume and writes a small static JSON
// that the TV can read with one CORS-friendly request.
//
// Output: public/data/quotes.json  (Astro copies public/ to the site root,
// so the TV reads https://deltoro.dev/data/quotes.json)

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const STOCKS = [
  'NVDA', 'TSLA', 'AAPL', 'AMD', 'PLTR', 'SPY', 'QQQ', 'MSFT', 'AMZN',
  'META', 'GOOGL', 'AVGO', 'INTC', 'SOFI', 'RIVN', 'COIN', 'MARA', 'WIX'
];
const PINNED = 'WIX';
const OUT = 'public/data/quotes.json';
const TOP_N = 10;
const STABLES = new Set(['USDT', 'USDC', 'DAI', 'FDUSD', 'TUSD', 'BUSD', 'USDD', 'PYUSD', 'USDE', 'XUSD']);

async function json(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'deltoro-quotes/1.0 (+https://deltoro.dev)' },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

async function stock(sym) {
  try {
    const j = await json(
      `https://query1.finance.yahoo.com/v8/finance/chart/${sym}` +
      '?interval=5m&range=1d&includePrePost=true'
    );
    const r = j?.chart?.result?.[0];
    if (!r) return null;
    const meta = r.meta ?? {};
    const vols = r.indicators?.quote?.[0]?.volume ?? [];
    const vol = vols.reduce((a, v) => a + (typeof v === 'number' ? v : 0), 0);
    const prev = meta.chartPreviousClose ?? meta.previousClose;
    const price = meta.regularMarketPrice;
    const shown = typeof meta.postMarketPrice === 'number' && meta.postMarketPrice > 0
      ? meta.postMarketPrice
      : price;
    if (!price || !vol || !prev) return null;
    return {
      sym,
      price: shown,
      change: ((shown - prev) / prev) * 100,
      dollarVol: price * vol,
      crypto: false
    };
  } catch {
    return null;
  }
}

async function crypto() {
  try {
    const list = await json(
      'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=false'
    );
    return (list ?? [])
      .filter((c) => c?.total_volume && c?.current_price && !STABLES.has(String(c.symbol || '').toUpperCase()))
      .map((c) => ({
        sym: String(c.symbol || '').toUpperCase(),
        price: c.current_price,
        change: c.price_change_percentage_24h ?? 0,
        dollarVol: c.total_volume,
        crypto: true
      }));
  } catch {
    return [];
  }
}

const results = await Promise.all([...STOCKS.map(stock), crypto()]);
const stocks = results.slice(0, STOCKS.length).filter(Boolean);
const coins = results[results.length - 1] ?? [];

const all = [...stocks, ...coins].sort((a, b) => b.dollarVol - a.dollarVol);
const top = all.slice(0, TOP_N);

if (!top.some((t) => t.sym === PINNED)) {
  const wix = all.find((t) => t.sym === PINNED);
  if (wix) {
    top[top.length - 1] = wix;
  }
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(
  OUT,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      source: { stocks: 'yahoo', crypto: 'coingecko' },
      count: top.length,
      items: top
    },
    null,
    2
  ) + '\n'
);

console.log(`wrote ${OUT} with ${top.length} rows`);
