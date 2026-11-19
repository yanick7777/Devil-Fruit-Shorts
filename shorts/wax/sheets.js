import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawDoru } from '/engine/fruits3.js';
import { SETS } from '/shorts/wax/story.js';
export const sheet = makeSheet({ title: 'DORU DORU NO MI', fruit: drawDoru, cols: [['body', '#f4f0e6'], ['swirl', '#c8b890'], ['drips', '#fffaf0'], ['stem', '#4f9a3a']], note: 'From your design: white fruit with pale swirls, top dripping like melted wax, green stem. No face or limbs.',
  cast: [['mechanic', 'calm', 'idle'], ['mechanic', 'worried', 'cheer'], ['mr3', 'grin', 'sip'], ['mr3', 'shock', 'cheer'], ['usopp', 'shout', 'punch'], ['host', 'grin', 'shrug']], sets: SETS, BG });
