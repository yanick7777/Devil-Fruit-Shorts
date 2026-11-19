import { drawNeko, NEKO } from '/shorts/leopard/fruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['bandit', 'smug', 'idle'], ['bandit', 'shock', 'shrug'], ['lucci', 'calm', 'idle'], ['lucci', 'smug', 'raise'], ['lucciHybrid', 'grin', 'cheer'], ['lucciAwake', 'grin', 'punch'], ['host', 'grin', 'shrug'], ['host', 'calm', 'idle']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['savanna', 'rays:peach', 'jungleVines', 'rockyOutcrop', 'sixPowers', 'grassPlain', 'courthouse', 'towerRoof', 'futureLab', 'beastCage', 'mindSpiral', 'eggheadIsle', 'catRooftops']);
  fruitSheet(c, 'NEKO NEKO NO MI, MODEL: LEOPARD', (x, cx, cy, R, r) => drawNeko(x, cx, cy, R * 0.9, r), [['body', NEKO.body], ['lit', NEKO.lit], ['spots', NEKO.spot], ['shade', NEKO.shade], ['stem', NEKO.stem], ['outline', '#1b1530']],
    'Wiki: shaped like a leopard\'s head with spots and ears, green T-shaped stem curled at one end. No face or limbs.');
}
