import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawSeiryu } from '/engine/fruits3.js';
import { SETS } from '/shorts/azure/story.js';
export const sheet = makeSheet({ title: 'UO UO NO MI, MODEL: SEIRYU', fruit: drawSeiryu, cols: [['body', '#3a6ad8'], ['scales', '#0a1a60'], ['leaves', '#f08a2a'], ['outline', '#1b1530']], note: 'From your design: blue scale-patterned fruit with swirls, orange leaves on top. No face or limbs.',
  cast: [['kaido', 'calm', 'idle'], ['kaido', 'grin', 'raise'], ['host', 'shock', 'shrug']], sets: SETS, BG });
