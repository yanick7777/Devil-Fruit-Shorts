import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawOrochi } from '/engine/fruits3.js';
import { SETS } from '/shorts/orochi/story.js';
export const sheet = makeSheet({ title: 'HEBI HEBI NO MI, MODEL: YAMATA NO OROCHI', fruit: drawOrochi, cols: [['body', '#c8287a'], ['swirl', '#5a0838'], ['leaves', '#4f9a3a'], ['outline', '#1b1530']], note: 'From your design: big magenta fruit with swirls and green leaves hanging down from the top. No face or limbs.',
  cast: [['orochi', 'grin', 'idle'], ['orochi', 'shock', 'shrug'], ['ninja', 'worried', 'shrug'], ['host', 'shock', 'shrug']], sets: SETS, BG });
