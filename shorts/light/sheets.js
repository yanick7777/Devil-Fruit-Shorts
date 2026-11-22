import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawPika } from '/engine/fruits3.js';
import { SETS } from '/shorts/light/story.js';
export const sheet = makeSheet({ title: 'PIKA PIKA NO MI', fruit: drawPika, cols: [['body', '#f0d030'], ['shade', '#c89a20'], ['swirl', '#8a6a10'], ['stem', '#5ab04a']], note: 'From your design: yellow shield-shaped fruit split into two faces, swirls, star-shaped top, curly green stem with a star leaf. No face or limbs.',
  cast: [['kizaru', 'smug', 'idle'], ['kizaru', 'grin', 'punch'], ['rayleigh', 'smug', 'punch'], ['grunt', 'shock', 'shrug'], ['sanji', 'hit', 'shrug'], ['usopp', 'hit', 'shrug']], sets: SETS, BG });
