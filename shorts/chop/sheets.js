import { drawBara, BARA } from '/shorts/chop/fruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['ronin', 'smug', 'idle'], ['ronin', 'shock', 'punch'], ['buggy', 'grin', 'idle'], ['buggy', 'shock', 'shrug'], ['buggy', 'shout', 'punch'], ['host', 'grin', 'shrug'], ['host', 'smug', 'punch'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['carnivalNight', 'rays:amber', 'fruitStall', 'magicStage', 'puzzleRoom', 'zenGarden', 'shootingGallery', 'hauntedHouse', 'confettiArena', 'muddyField', 'bootCamp', 'oldShipNight', 'bathroom']);
  fruitSheet(c, 'BARA BARA NO MI', (x, cx, cy, R, r, i) => drawBara(x, cx, cy, R * 0.9, r, { split: i === 3 ? 0.4 : 0 }), [['body', BARA.body], ['lit', BARA.lit], ['swirl', BARA.swirl], ['shade', BARA.shade], ['leaves', BARA.leaf], ['outline', '#1b1530']],
    'Wiki: an oval purple fruit made of little spherical pieces with swirls, green leaves on top. No face or limbs.', [0, 0.6, 1.2, 1.8], ['front', 'turn', 'turn', 'split']);
}
