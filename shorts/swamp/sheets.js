import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.green;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['fisher', 'smug', 'idle'], ['fisher', 'shock', 'shrug'], ['caribou', 'grin', 'idle'], ['caribou', 'shock', 'shrug'], ['franky', 'grin', 'cheer'], ['franky', 'smug', 'idle'], ['host', 'grin', 'shrug'], ['host', 'smug', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['bayou', 'rays:olive', 'lilyPond', 'mangrove', 'marshStage', 'seaFort', 'treasureCave', 'fogMarsh', 'wreckDeck', 'cellarBarrels', 'pantry', 'bubbleGrove', 'schoolHall']);
  fruitSheet(c, 'NUMA NUMA NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'green' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (swamp green) stands in. No face or limbs.');
}
