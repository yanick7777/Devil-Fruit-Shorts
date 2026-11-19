import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawKiro } from '/engine/fruits3.js';
import { SETS } from '/shorts/kilo/story.js';
export const sheet = makeSheet({ title: 'KILO KILO NO MI', fruit: drawKiro, cols: [['body', '#b0405a'], ['swirl', '#4a0a20'], ['stem', '#5cb04a'], ['outline', '#1b1530']], note: 'From your design: maroon-pink barrel / weight-shaped fruit with swirls and a thick green T stem. No face or limbs.',
  cast: [['valentine', 'grin', 'idle'], ['valentine', 'smug', 'raise'], ['grunt', 'worried', 'shrug'], ['cowboy', 'smug', 'idle'], ['luffy', 'grin', 'punch']], sets: SETS, BG });
