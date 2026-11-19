import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.pink;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['knight', 'smug', 'idle'], ['knight', 'shock', 'shrug'], ['gunko', 'calm', 'idle'], ['gunko', 'smug', 'raise'], ['host', 'grin', 'punch'], ['host', 'smug', 'raise'], ['host', 'calm', 'idle'], ['host', 'shock', 'shrug']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['archeryRange', 'rays:rose', 'signposts', 'windyHill', 'compassHall', 'courtyard', 'raceTrack', 'butcherShop', 'railYard', 'cathedral', 'holyPalace', 'giantForest', 'hedgeMaze']);
  fruitSheet(c, 'ARO ARO NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'pink' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (arrow pink) stands in. No face or limbs.');
}
