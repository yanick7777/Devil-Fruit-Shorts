import { makeSheet } from '/engine/review.js';
import { BG } from '/engine/bgs.js';
import { drawHito } from '/engine/fruits3.js';
import { SETS } from '/shorts/human/story.js';
export const sheet = makeSheet({ title: 'HITO HITO NO MI', fruit: drawHito, cols: [['cap', '#e0303a'], ['stalk', '#f4ead2'], ['swirl', '#700810'], ['outline', '#1b1530']], note: 'From your design: red mushroom-cap fruit with swirls on a pale stalk, green curly stem. No face or limbs.',
  cast: [['chopper', 'grin', 'cheer'], ['chopperMonster', 'grin', 'raise'], ['chopperMonster', 'shock', 'punch'], ['lumberjack', 'shock', 'shrug'], ['host', 'worried', 'raise']], sets: SETS, BG });
