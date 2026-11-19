import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawHana } from '/engine/fruits3.js';
import { SETS } from '/shorts/flower/story.js';
export const sheet = makeSheet({ title: 'HANA HANA NO MI', fruit: drawHana, cols: [['petals', '#e85a9a'], ['inner', '#f68ab8'], ['centre', '#f4d030'], ['outline', '#1b1530']], note: 'From your design: pink dahlia-shaped fruit, petals with swirls, yellow centre. No face or limbs.',
  cast: [['robin', 'calm', 'idle'], ['robin', 'hit', 'shrug'], ['bandit', 'worried', 'shrug'], ['brute', 'smug', 'idle'], ['host', 'grin', 'holdUp']], sets: SETS, BG });
