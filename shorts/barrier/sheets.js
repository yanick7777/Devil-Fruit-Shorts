import { drawSwirlFruit, PALETTES } from '/engine/swirlFruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
const P = PALETTES.blue;
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['luchador', 'smug', 'idle'], ['luchador', 'shout', 'punch'], ['bartolomeo', 'grin', 'idle'], ['bartolomeo', 'shock', 'cheer'], ['bartolomeo', 'sad', 'shrug'], ['host', 'grin', 'shrug'], ['host', 'smug', 'raise'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['iceRink', 'rays:mint', 'crystalCave', 'glassLobby', 'domeArena', 'canyonBridge', 'sheerCliff', 'playground', 'bullRing', 'cityNight', 'rubbleTown', 'fanRoom', 'scrollHall', 'rainyMeadow']);
  fruitSheet(c, 'BARI BARI NO MI', (x, cx, cy, R, r) => drawSwirlFruit(x, cx, cy, R, r, { pal: 'blue' }), [['body', P.body], ['lit', P.lit], ['swirl', P.swirl], ['shade', P.shade], ['stem', P.stem], ['outline', '#1b1530']],
    'The fruit\'s look has never been revealed: a plain round swirl fruit (barrier blue) stands in. No face or limbs.');
}
