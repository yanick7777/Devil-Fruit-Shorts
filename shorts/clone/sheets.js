import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawMane } from '/engine/fruits3.js';
import { SETS } from '/shorts/clone/story.js';
export const sheet = makeSheet({ title: 'MANE MANE NO MI', fruit: drawMane, cols: [['body', '#f08a2a'], ['stripes', '#fff0c8'], ['swirl', '#a04a00'], ['outline', '#1b1530']], note: 'From your design: two orange striped gourd fruits side by side with curly stems. No face or limbs.',
  cast: [['bonclay', 'grin', 'cheer'], ['bonclay', 'grin', 'punch'], ['mechanic', 'shock', 'shrug'], ['farmer', 'calm', 'idle'], ['brute', 'hit', 'punch'], ['luffy', 'grin', 'cheer']], sets: SETS, BG });
