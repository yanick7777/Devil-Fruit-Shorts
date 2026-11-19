import { drawKumo, KUMO } from '/shorts/spider/fruit.js';
import { fruitSheet, castSheet, bgSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';

export function sheet(c, q) {
  if (q.get('k') === 'cast') return castSheet(c, [['sumo', 'smug', 'idle'], ['sumo', 'shock', 'shrug'], ['blackMaria', 'smug', 'idle'], ['blackMaria', 'grin', 'raise'], ['sanji', 'shout', 'punch'], ['robin', 'calm', 'idle'], ['robin', 'smug', 'raise'], ['host', 'grin', 'shrug']]);
  if (q.get('k') === 'bg') return bgSheet(c, BG, ['attic', 'rays:sky', 'dewGarden', 'fernJungle', 'stoneSteps', 'wanoStreet', 'webHall', 'warehouse', 'volcano', 'museumNight', 'dinoValley', 'pleasureHall', 'backyard']);
  fruitSheet(c, 'KUMO KUMO NO MI', (x, cx, cy, R, r) => drawKumo(x, cx, cy, R * 0.8, r), [['body', KUMO.body], ['lit', KUMO.lit], ['swirl', KUMO.swirl], ['spirals', KUMO.spiral], ['leaves', KUMO.leaf], ['outline', '#1b1530']],
    'Design from your reference: purple, wide top and rounded bottom, dense swirls, two red spirals, green leaves all around. No face or limbs.');
}