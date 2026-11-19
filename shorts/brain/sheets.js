import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.pink;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['rival', 'smug', 'idle'], ['rival', 'shock', 'shrug'], ['vegapunk', 'calm', 'idle'], ['vegapunk', 'grin', 'raise'], ['host', 'grin', 'shrug'], ['host', 'smug', 'holdUp'], ['host', 'worried', 'idle'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['library', 'rays:indigo', 'bookTower', 'planetarium', 'circuitBoard', 'classroom', 'memoryHall', 'tubeLab', 'cableSky', 'tinyDoor', 'vatLab', 'podRoom', 'examHall']);
  fruitSheet(c, 'NOMI NOMI NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'pink' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (brain pink) stands in. No face or limbs.');
}
