import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.grey;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['grunt', 'smug', 'idle'], ['grunt', 'shock', 'shrug'], ['bege', 'smug', 'idle'], ['bege', 'grin', 'raise'], ['host', 'grin', 'shrug'], ['host', 'hit', 'shrug'], ['host', 'smug', 'idle'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['medievalTown', 'rays:lavender', 'castleGate', 'moatBridge', 'battlements', 'mobOffice', 'siegeField', 'dungeon', 'candyCoast', 'crackedWall', 'clinicRoom', 'escapeSea', 'rentHall']);
  fruitSheet(c, 'SHIRO SHIRO NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'grey' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (stone grey) stands in. No face or limbs.');
}
