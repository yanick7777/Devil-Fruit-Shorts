import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawGoro } from '/engine/fruits3.js';
import { SETS } from '/shorts/rumble/story.js';
export const sheet = makeSheet({ title: 'GORO GORO NO MI', fruit: drawGoro, cols: [['body', '#f4d030'], ['swirl', '#a07000'], ['bolt stem', '#5cc45a'], ['outline', '#1b1530']], note: 'From your design: spiky yellow fruit with swirls and a green lightning-bolt stem. No face or limbs.',
  cast: [['enel', 'smug', 'idle'], ['enel', 'shock', 'punch'], ['luffy', 'grin', 'punch'], ['grunt', 'shock', 'punch'], ['host', 'grin', 'punch']], sets: SETS, BG });
