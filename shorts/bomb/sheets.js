import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawBomu } from '/engine/fruits3.js';
import { SETS } from '/shorts/bomb/story.js';
export const sheet = makeSheet({ title: 'BOMU BOMU NO MI', fruit: drawBomu, cols: [['body', '#2a2a5a'], ['swirl', '#e8822e'], ['fuse', '#c99556'], ['outline', '#1b1530']], note: 'From your design: dark navy round fruit with orange swirls and a rope fuse stem. No face or limbs.',
  cast: [['cowboy', 'smug', 'idle'], ['cowboy', 'shock', 'shrug'], ['mr5', 'smug', 'idle'], ['mr5', 'hit', 'cheer'], ['luffy', 'shout', 'punch'], ['host', 'grin', 'shrug']], sets: SETS, BG });
