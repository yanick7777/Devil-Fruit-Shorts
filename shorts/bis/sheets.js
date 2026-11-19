import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.orange;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['ninja', 'smug', 'idle'], ['ninja', 'shock', 'punch'], ['cracker', 'grin', 'idle'], ['cracker', 'shock', 'shrug'], ['luffy', 'grin', 'cheer'], ['luffy', 'smug', 'idle'], ['host', 'grin', 'shrug'], ['host', 'smug', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['bakery', 'rays:tan', 'cookieJar', 'bakeryOven', 'cakeStage', 'candyTown', 'paradeGround', 'sweetHall', 'forge', 'rainCafe', 'drizzleTown', 'mirrorWorld', 'snackAisle']);
  fruitSheet(c, 'BISU BISU NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'orange' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (biscuit orange) stands in. No face or limbs.');
}
