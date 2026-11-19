import { drawTori, TORI } from '/shorts/phoenix/fruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['viking', 'smug', 'idle'], ['viking', 'shock', 'shrug'], ['marco', 'calm', 'idle'], ['marco', 'smug', 'raise'], ['marco', 'grin', 'shrug'], ['host', 'grin', 'shrug'], ['host', 'hit', 'shrug'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['cliffNest', 'rays:cyan', 'tropicalBeach', 'auroraSky', 'blueAltar', 'seaArch', 'fieldHospital', 'sphinxVillage', 'sunsetClouds', 'jailCell', 'marineHQ', 'mobyDeck', 'firstAid']);
  fruitSheet(c, 'TORI TORI NO MI, MODEL: PHOENIX', (x, cx, cy, R, r) => drawTori(x, cx, cy, R * 0.95, r), [['body', TORI.body], ['lit', TORI.lit], ['swirl', TORI.swirl], ['shade', TORI.shade], ['leaves', TORI.leaf], ['outline', '#1b1530']],
    'Official design: a pineapple-shaped fruit, skin split into fruitlets with swirls and prickly tips, crown of (golden) leaves.');
}
