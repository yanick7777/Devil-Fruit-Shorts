import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawFude } from '/engine/fruits3.js';
import { SETS } from '/shorts/brush/story.js';
export const sheet = makeSheet({ title: 'FUDE FUDE NO MI', fruit: drawFude, cols: [['body', '#e8e4dc'], ['swirl', '#3a3346'], ['ink tip', '#14121a'], ['outline', '#1b1530']], note: 'From your design (manga panel): round swirly fruit with a black ink-brush tip on top. No face or limbs.',
  cast: [['surfer', 'calm', 'idle'], ['surfer', 'shock', 'shrug'], ['critic', 'yuck', 'shrug'], ['kanjuro', 'grin', 'holdUp'], ['kanjuro', 'smug', 'idle'], ['host', 'grin', 'punch']], sets: SETS, BG });
