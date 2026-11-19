import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.gold;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['boxer', 'smug', 'idle'], ['boxer', 'hit', 'punch'], ['hawkins', 'calm', 'idle'], ['hawkins', 'smug', 'holdUp'], ['killer', 'calm', 'idle'], ['killer', 'shout', 'punch'], ['host', 'grin', 'shrug'], ['host', 'hit', 'shrug']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['barn', 'rays:gold', 'wheatField', 'haystackFarm', 'tarotStage', 'harvestFair', 'boxingGym', 'voodooShop', 'duskField', 'candleRoom', 'cornMaze', 'wanoRoofNight', 'hayLoft']);
  fruitSheet(c, 'WARA WARA NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'gold' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (straw gold) stands in. No face or limbs.');
}
