import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawKage } from '/engine/fruits3.js';
import { SETS } from '/shorts/shadow/story.js';
export const sheet = makeSheet({ title: 'KAGE KAGE NO MI', fruit: drawKage, cols: [['body', '#2a2436'], ['swirl', '#7a6a9a'], ['leaves', '#4f9a3a'], ['outline', '#1b1530']], note: 'From your design: black fruit with swirls cradled in big green leaves, curly stem. No face or limbs.',
  cast: [['moria', 'grin', 'idle'], ['moria', 'smug', 'cheer'], ['grunt', 'shock', 'shrug'], ['viking', 'yuck', 'raise'], ['luffy', 'grin', 'punch'], ['boxer', 'shock', 'punch']], sets: SETS, BG });
