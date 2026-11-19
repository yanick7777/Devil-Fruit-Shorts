import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawAwa } from '/engine/fruits3.js';
import { SETS } from '/shorts/bubble/story.js';
export const sheet = makeSheet({ title: 'AWA AWA NO MI', fruit: drawAwa, cols: [['body', '#9a8ad8'], ['lit', '#c8bcf0'], ['swirl', '#4a3a8a'], ['stem', '#e8c84a'], ['outline', '#1b1530']], note: 'From your design: flat round lavender fruit covered in swirls, thin yellow stem. No face or limbs.',
  cast: [['farmer', 'calm', 'idle'], ['farmer', 'sad', 'shrug'], ['kalifa', 'smug', 'idle'], ['kalifa', 'shout', 'punch'], ['nami', 'shout', 'raise'], ['host', 'grin', 'shrug'], ['host', 'smug', 'punch'], ['host', 'calm', 'idle']], sets: SETS, BG });
