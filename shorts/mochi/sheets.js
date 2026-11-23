import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawMochi } from '/engine/fruits3.js';
import { SETS } from '/shorts/mochi/story.js';
export const sheet = makeSheet({ title: 'MOCHI MOCHI NO MI', fruit: drawMochi, cols: [['body', '#f4f2ec'], ['swirl', '#b8ac98'], ['stem', '#4f9a3a'], ['outline', '#1b1530']], note: 'From your design: white bumpy round fruit with swirls, green stem. No face or limbs.',
  cast: [['katakuri', 'calm', 'raise'], ['katakuri', 'smug', 'punch'], ['brute', 'shock', 'punch'], ['grunt', 'worried', 'shrug'], ['luffy', 'grin', 'punch']], sets: SETS, BG });
