import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawWolf } from '/engine/fruits3.js';
import { SETS } from '/shorts/wolf/story.js';
export const sheet = makeSheet({ title: 'INU INU NO MI, MODEL: OKUCHI NO MAKAMI', fruit: drawWolf, cols: [['body', '#f08a2a'], ['swirl', '#8a3a00'], ['leaves', '#8a5a2a'], ['outline', '#1b1530']], note: 'From your design: orange persimmon-like fruit with swirls, brown leaves and a curly stem. No face or limbs.',
  cast: [['yamato', 'grin', 'holdUp'], ['yamato', 'grin', 'raise'], ['grunt', 'shock', 'punch'], ['farmer', 'worried', 'shrug'], ['chef', 'calm', 'raise']], sets: SETS, BG });
