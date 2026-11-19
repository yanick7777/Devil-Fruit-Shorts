import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawBaku } from '/engine/fruits3.js';
import { SETS } from '/shorts/munch/story.js';
export const sheet = makeSheet({ title: 'BAKU BAKU NO MI', fruit: drawBaku, cols: [['body', '#7a3aa8'], ['lit', '#b07ad8'], ['swirl', '#2a0a50'], ['zigzag', '#ffffff'], ['stem', '#5cc45a']], note: 'From your design: round purple fruit with swirls and a jagged zigzag split, green stem. No face or limbs.',
  cast: [['mechanic', 'calm', 'idle'], ['farmer', 'worried', 'shrug'], ['wapol', 'grin', 'shrug'], ['wapol', 'shock', 'cheer'], ['luffy', 'shout', 'punch'], ['host', 'grin', 'shrug']], sets: SETS, BG });
