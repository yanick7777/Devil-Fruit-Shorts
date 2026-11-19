import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawJiki } from '/engine/fruits3.js';
import { SETS } from '/shorts/magnet/story.js';
export const sheet = makeSheet({ title: 'JIKI JIKI NO MI', fruit: drawJiki, cols: [['balls', '#3a6ad8'], ['swirl', '#0a1a60'], ['ring', '#f4d030'], ['outline', '#1b1530']], note: 'From your design: cluster of blue swirl balls wrapped in a yellow zigzag ring, green stem. No face or limbs.',
  cast: [['eustass', 'grin', 'idle'], ['eustass', 'grin', 'punch'], ['grunt', 'shock', 'raise'], ['farmer', 'shock', 'holdUp'], ['host', 'smug', 'punch']], sets: SETS, BG });
