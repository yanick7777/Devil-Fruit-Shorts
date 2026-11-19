import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.brown;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['sumo', 'smug', 'idle'], ['sumo', 'shock', 'shrug'], ['blackMaria', 'smug', 'idle'], ['blackMaria', 'grin', 'raise'], ['sanji', 'shout', 'punch'], ['robin', 'calm', 'idle'], ['robin', 'smug', 'raise'], ['host', 'grin', 'shrug']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['attic', 'rays:sky', 'dewGarden', 'fernJungle', 'stoneSteps', 'wanoStreet', 'webHall', 'warehouse', 'volcano', 'museumNight', 'dinoValley', 'pleasureHall', 'backyard']);
  fruitSheet(c, 'KUMO KUMO NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'brown' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (spider brown) stands in. No face or limbs.');
}
