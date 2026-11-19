import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawHoro } from '/engine/fruits3.js';
import { SETS } from '/shorts/hollow/story.js';
export const sheet = makeSheet({ title: 'HORO HORO NO MI', fruit: drawHoro, cols: [['lobes', '#f4eaa0'], ['swirl', '#b0a050'], ['stem', '#4f9a3a'], ['outline', '#1b1530']], note: 'From your design: pale yellow fruit made of five ghost-shaped lobes with little eyes, curly stem. No mouth or limbs.',
  cast: [['perona', 'grin', 'idle'], ['perona', 'shock', 'shrug'], ['usopp', 'sad', 'shrug'], ['viking', 'smug', 'idle'], ['brute', 'worried', 'shrug'], ['boxer', 'sad', 'shrug']], sets: SETS, BG });
