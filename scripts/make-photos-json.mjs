// scripts/make-photos-json.mjs
//
// Rebuilds public/photos.json from the images sitting in public/images/tv/.
// Drop photos in that folder, run this, commit — the TV picks them up on its
// next launch. Order is by filename, so prefix with 01-, 02-, ... to control
// the rotation.

import { readdirSync, writeFileSync, existsSync } from 'node:fs';

const DIR = 'public/images/tv';
const OUT = 'public/photos.json';
const EXTS = /\.(jpe?g|png|webp|avif|bmp|gif)$/i;

if (!existsSync(DIR)) {
  console.error(`No ${DIR} directory. Create it and add photos first.`);
  process.exit(1);
}

const files = readdirSync(DIR)
  .filter((f) => EXTS.test(f))
  .sort();

const items = files.map((file, i) => ({
  file: `/images/tv/${file}`,
  title: file.replace(EXTS, '').replace(/^\d+[-_]?/, ''),
  author: '',
  licence: '',
  // optional: tag for seasonal matching when photos.matchSky is on
  month: []
}));

writeFileSync(OUT, JSON.stringify(items, null, 2) + '\n');
console.log(`wrote ${OUT} with ${items.length} photos`);
