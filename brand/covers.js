// Video covers, 1080x1920. ?f=mera|gum|quake|ope|string|sheet
import { drawPerson, mark, sparkle, glow, OL, FONT, BANNER, drawBanner } from '/engine/art.js';
import { drawFruit } from '/engine/fruit.js';
import { drawGomu } from '/shorts/gum-gum/fruit.js';
import { drawGura } from '/shorts/quake/fruit.js';
import { drawOpe } from '/shorts/ope/fruit.js';
import { drawIto } from '/shorts/string/fruit.js';
import { drawHobi } from '/shorts/hobby/fruit.js';
import { drawSwirlFruit } from '/engine/swirlFruit.js';
import { drawKumo } from '/shorts/spider/fruit.js';
import { drawTori } from '/shorts/phoenix/fruit.js';
import { drawBara } from '/shorts/chop/fruit.js';
import { drawNeko } from '/shorts/leopard/fruit.js';
import { FRUITS3 } from '/engine/fruits3.js';
const f3 = (k) => (x, cx, cy, R, r, o) => FRUITS3[k](x, cx, cy, R * 0.9, r, o);
const sw = (pal) => (x, cx, cy, R, r, o) => drawSwirlFruit(x, cx, cy, R, r, { ...o, pal });

const C = {
  mera:   { rays: ['#ffb24d', '#ff8a1d'], glow: '255,150,40', fruit: drawFruit, who: 'ace', whoExpr: 'smug', lines: [['WHAT IF YOU ATE THE', 84, '#ffffff'], ['FLAME-FLAME', 150, '#ffd84a'], ['FRUIT?', 110, '#ffd84a']], bottom: "ACE'S FRUIT" },
  gum:    { rays: ['#c9a8ff', '#9a6be8'], glow: '200,150,255', fruit: drawGomu, who: 'host_g5', whoExpr: 'grin', lines: [['ITS REAL NAME', 90, '#ffffff'], ["ISN'T GUM-GUM", 140, '#ff5fa2'], ['🤫', 1, '#ffffff']], bottom: 'GEAR 5 SECRET' },
  quake:  { rays: ['#7cc8ff', '#3c8fe0'], glow: '140,200,255', fruit: drawGura, who: 'whitebeard', whoExpr: 'smug', lines: [['THE FRUIT THAT CAN', 88, '#ffffff'], ['DESTROY THE', 140, '#ff4a3d'], ['WORLD', 150, '#ff4a3d']], bottom: 'TREMOR-TREMOR FRUIT' },
  ope:    { rays: ['#ff8a9a', '#e0303e'], glow: '255,120,140', fruit: drawOpe, who: 'corazon', whoExpr: 'grin', lines: [['THIS FRUIT COSTS', 92, '#ffffff'], ['YOUR LIFE', 160, '#ffd84a']], bottom: 'OP-OP FRUIT' },
  string: { rays: ['#dcc6f5', '#a07fd0'], glow: '220,200,255', fruit: drawIto, who: 'doflamingo', whoExpr: 'grin', lines: [['WHAT IF YOU ATE THE', 84, '#ffffff'], ['STRING-STRING', 150, '#ff5fa2'], ['FRUIT?', 110, '#ff5fa2']], bottom: "DOFLAMINGO'S FRUIT" },
  hobby:   { rays: ['#ffb8a8', '#ff7a5c'], glow: '255,150,120', fruit: (x, cx, cy, R, r, o) => drawHobi(x, cx, cy, R, r, { ...o, turn: 0.25 }), who: 'sugar', whoExpr: 'smug', lines: [['ONE TOUCH AND', 96, '#ffffff'], ["YOU'RE A TOY", 140, '#ffd84a']], bottom: 'HOBBY-HOBBY FRUIT' },
  spike:   { rays: ['#c8d88a', '#9ab24a'], glow: '210,230,140', fruit: sw('slate'), who: 'zala', whoExpr: 'smug', lines: [['WHAT IF YOU ATE THE', 84, '#ffffff'], ['SPIKE-SPIKE', 150, '#c9a0ff'], ['FRUIT?', 110, '#c9a0ff']], bottom: 'MISS DOUBLEFINGER' },
  spider:  { rays: ['#a8e4ff', '#78cdf5'], glow: '200,150,255', fruit: (x, cx, cy, R, r, o) => drawKumo(x, cx, cy, R * 0.85, r, o), who: 'blackMaria', whoExpr: 'smug', lines: [['THE OLDEST SPIDER', 92, '#ffffff'], ['EVER FOUND', 140, '#b07cff']], bottom: 'SPIDER-SPIDER FRUIT' },
  straw:   { rays: ['#ffd98a', '#f5b942'], glow: '255,220,120', fruit: sw('gold'), who: 'hawkins', whoExpr: 'calm', lines: [['YOUR PAIN GOES TO', 90, '#ffffff'], ['SOMEONE ELSE', 140, '#ffd84a']], bottom: 'STRAW-STRAW FRUIT' },
  swamp:   { rays: ['#c8d88a', '#9ab24a'], glow: '170,230,140', fruit: sw('green'), who: 'caribou', whoExpr: 'grin', lines: [['A BOTTOMLESS', 100, '#ffffff'], ['SWAMP BODY', 150, '#8fe86a']], bottom: 'SWAMP-SWAMP FRUIT' },
  bis:     { rays: ['#e8d0a8', '#c8a878'], glow: '255,210,140', fruit: sw('orange'), who: 'cracker', whoExpr: 'grin', lines: [['AN ARMY MADE OF', 92, '#ffffff'], ['BISCUITS', 160, '#ffd84a']], bottom: 'BIS-BIS FRUIT' },
  phoenix: { rays: ['#a0f0ff', '#4fd0e8'], glow: '120,220,255', fruit: (x, cx, cy, R, r, o) => drawTori(x, cx, cy, R * 0.92, r, o), who: 'marco', whoExpr: 'smug', lines: [['THE FRUIT THAT', 96, '#ffffff'], ['CAN\'T DIE', 160, '#4fd0ff']], bottom: "MARCO'S PHOENIX" },
  barrier: { rays: ['#b8f5d8', '#6fdcae'], glow: '170,230,255', fruit: sw('blue'), who: 'bartolomeo', whoExpr: 'grin', lines: [['NOTHING CAN', 110, '#ffffff'], ['BREAK IT', 160, '#7cc8ff']], bottom: 'BARRIER-BARRIER FRUIT' },
  arrow:   { rays: ['#ffb0c8', '#f07898'], glow: '255,150,210', fruit: sw('pink'), who: 'gunko', whoExpr: 'smug', lines: [['A HOLY KNIGHT\'S', 96, '#ffffff'], ['SECRET FRUIT', 140, '#ff5fa2']], bottom: 'ARROW-ARROW FRUIT' },
  chop:    { rays: ['#ffc870', '#f09a2a'], glow: '210,160,255', fruit: (x, cx, cy, R, r, o) => drawBara(x, cx, cy, R * 0.85, r, o), who: 'buggy', whoExpr: 'shout', lines: [['SWORDS CAN\'T', 110, '#ffffff'], ['CUT YOU', 160, '#ff4a3d']], bottom: "BUGGY'S FRUIT" },
  leopard: { rays: ['#ffd0b0', '#ffae80'], glow: '255,200,110', fruit: (x, cx, cy, R, r, o) => drawNeko(x, cx, cy, R * 0.9, r, o), who: 'lucciAwake', whoExpr: 'grin', lines: [['LUCCI\'S', 110, '#ffffff'], ['AWAKENING', 150, '#ffd84a']], bottom: 'CAT-CAT FRUIT' },
  castle:  { rays: ['#e0c8ff', '#b898f0'], glow: '255,220,150', fruit: sw('grey'), who: 'bege', whoExpr: 'grin', lines: [['YOUR BODY IS A', 96, '#ffffff'], ['FORTRESS', 160, '#ffd84a']], bottom: 'CASTLE-CASTLE FRUIT' },
  brain:   { rays: ['#a8b0ff', '#6a74e0'], glow: '255,150,210', fruit: sw('pink'), who: 'vegapunk', whoExpr: 'calm', lines: [['A BRAIN THAT', 100, '#ffffff'], ['NEVER STOPS', 150, '#ff8cd0']], bottom: "VEGAPUNK'S FRUIT" },
  bubble:  { rays: ['#c8bcf0', '#9a8ad8'], glow: '220,210,255', fruit: f3('bubble'), who: 'kalifa', whoExpr: 'smug', lines: [['ONE BUBBLE AND', 92, '#ffffff'], ['YOU\'RE POWERLESS', 130, '#7cc8ff']], bottom: 'BUBBLE-BUBBLE FRUIT' },
  munch:   { rays: ['#b07ad8', '#7a3aa8'], glow: '200,150,255', fruit: f3('munch'), who: 'wapol', whoExpr: 'grin', lines: [['HE ATE HIS', 100, '#ffffff'], ['OWN CASTLE', 140, '#ffd84a']], bottom: 'MUNCH-MUNCH FRUIT' },
  bomb:    { rays: ['#ffb24d', '#e8822e'], glow: '255,170,80', fruit: f3('bomb'), who: 'mr5', whoExpr: 'smug', lines: [['HIS BOOGERS', 110, '#ffffff'], ['EXPLODE', 140, '#ff4a3d']], bottom: 'BOMB-BOMB FRUIT' },
  wax:     { rays: ['#fff6dc', '#e8dcc0'], glow: '255,245,210', fruit: f3('wax'), who: 'mr3', whoExpr: 'smug', lines: [['WAX AS HARD', 104, '#ffffff'], ['AS STEEL', 150, '#ffd84a']], bottom: 'WAX-WAX FRUIT' },
  brush:   { rays: ['#e8e4dc', '#b8b0a8'], glow: '240,235,225', fruit: f3('brush'), who: 'kanjuro', whoExpr: 'grin', lines: [['YOUR DRAWINGS', 100, '#ffffff'], ['COME ALIVE', 140, '#ff5fa2']], bottom: 'BRUSH-BRUSH FRUIT' },
  rumble:  { rays: ['#fff08a', '#f4d030'], glow: '255,240,140', fruit: f3('rumble'), who: 'enel', whoExpr: 'smug', lines: [['200 MILLION', 120, '#ffffff'], ['VOLTS', 150, '#3f9bff']], bottom: 'RUMBLE-RUMBLE FRUIT' },
  flower:  { rays: ['#ffc8e0', '#f68ab8'], glow: '255,180,220', fruit: f3('flower'), who: 'robin', whoExpr: 'smug', lines: [['ARMS GROW', 120, '#ffffff'], ['ANYWHERE', 150, '#ff5fa2']], bottom: 'FLOWER-FLOWER FRUIT' },
  orochi:  { rays: ['#f070b0', '#c8287a'], glow: '255,140,200', fruit: f3('orochi'), who: 'orochi', whoExpr: 'grin', lines: [['8 HEADS =', 120, '#ffffff'], ['8 LIVES?', 150, '#ffd84a']], bottom: 'SNAKE-SNAKE: OROCHI' },
  human:   { rays: ['#ff8a8a', '#e0303a'], glow: '255,140,140', fruit: f3('human'), who: 'chopperMonster', whoExpr: 'grin', lines: [['THE REINDEER', 104, '#ffffff'], ['WHO ATE A FRUIT', 120, '#ffd84a']], bottom: 'HUMAN-HUMAN FRUIT' },
  hollow:  { rays: ['#fffbe0', '#f4eaa0'], glow: '255,250,200', fruit: f3('hollow'), who: 'perona', whoExpr: 'grin', lines: [['GHOSTS THAT', 110, '#ffffff'], ['MAKE YOU CRY', 130, '#b07cff']], bottom: 'HOLLOW-HOLLOW FRUIT' },
  wolf:    { rays: ['#ffc070', '#f08a2a'], glow: '255,190,120', fruit: f3('wolf'), who: 'yamato', whoExpr: 'grin', lines: [['A HOLY WOLF', 120, '#ffffff'], ['GUARDIAN', 150, '#7fe0d0']], bottom: 'DOG-DOG: OKUCHI NO MAKAMI' },
  magnet:  { rays: ['#8ab0ff', '#3a6ad8'], glow: '140,190,255', fruit: f3('magnet'), who: 'eustass', whoExpr: 'grin', lines: [['KID\'S', 120, '#ffffff'], ['AWAKENED FRUIT', 130, '#ffd84a']], bottom: 'MAGNET-MAGNET FRUIT' },
  shadow:  { rays: ['#7a6a9a', '#3a2a5a'], glow: '180,140,240', fruit: f3('shadow'), who: 'moria', whoExpr: 'grin', lines: [['HE STEALS', 120, '#ffffff'], ['YOUR SHADOW', 140, '#b07cff']], bottom: 'SHADOW-SHADOW FRUIT' },
  kilo:    { rays: ['#e0809a', '#b0405a'], glow: '255,160,190', fruit: f3('kilo'), who: 'valentine', whoExpr: 'grin', lines: [['1 KG OR', 120, '#ffffff'], ['10,000 KG', 150, '#ffd84a']], bottom: 'KILO-KILO FRUIT' },
  clone:   { rays: ['#ffc070', '#f08a2a'], glow: '255,200,120', fruit: f3('clone'), who: 'bonclay', whoExpr: 'grin', lines: [['STEAL ANYONE\'S', 104, '#ffffff'], ['FACE', 170, '#ff5fa2']], bottom: 'CLONE-CLONE FRUIT' },
};
function rays(x, a, b) { x.fillStyle = b; x.fillRect(0, 0, 1080, 1920); x.fillStyle = a; for (let i = 0; i < 28; i++) { const t = i / 28 * Math.PI * 2; x.beginPath(); x.moveTo(540, 960); x.arc(540, 960, 2400, t, t + Math.PI / 28); x.closePath(); x.fill(); } }
function title(x, text, y, size, fill, rot = -0.03) {
  x.save(); x.translate(540, y); x.rotate(rot); x.font = `${size}px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  let s = size; while (x.measureText(text).width > 980) { s -= 4; x.font = `${s}px ${FONT}`; }
  x.fillStyle = 'rgba(10,6,25,0.5)'; x.fillText(text, 10, 16); x.lineWidth = s * 0.22; x.strokeStyle = OL; x.strokeText(text, 0, 0); x.fillStyle = fill; x.fillText(text, 0, 0); x.restore();
}
function figure(x, who, expr, pose, cx, fy, s, flip) { const im = drawPerson({ who, expr, pose }); x.save(); x.translate(cx, fy); x.scale(flip ? -s : s, s); x.drawImage(im, -500, -1745); x.restore(); return im; }
function cover(x, k) {
  const c = C[k]; rays(x, c.rays[0], c.rays[1]);
  const g = x.createRadialGradient(540, 960, 50, 540, 960, 900); g.addColorStop(0, 'rgba(255,255,255,0.45)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920);
  // characters on either side, faces clear of the fruit
  figure(x, c.who, c.whoExpr, 'shrug', 880, 2120, 0.86, true);
  figure(x, 'host', 'shock', 'shrug', 200, 2120, 0.86, false);
  mark(x, '!?', 370, 700, 1.3, 0.15);
  glow(x, 540, 1130, 380, c.glow, 0.9);
  c.fruit(x, 540, 1130, 215, 0.3, { shadow: false });
  for (const [sx, sy, r] of [[390, 1000, 34], [700, 960, 28], [690, 1330, 24], [380, 1300, 20]]) sparkle(x, sx, sy, r);
  // title block in the top safe area, label above the caption zone
  let y = 280; c.lines.forEach(([t, sz, col], i) => { if (sz < 10) return; title(x, t, y, sz, col, i % 2 ? -0.05 : -0.02); y += sz * 0.95 + 20; });
  title(x, c.bottom, 1470, 92, '#ffffff', 0.02);
}
export function sheet(cv, q) {
  const f = q.get('f') || 'sheet', x = cv.getContext('2d');
  if (f !== 'sheet') { cv.width = 1080; cv.height = 1920; cover(x, f); return; }
  const keys = q.get('keys') ? q.get('keys').split(',') : Object.keys(C); const cols = Math.min(keys.length, 7), rowsN = Math.ceil(keys.length / cols); cv.width = cols * 380 + 20; cv.height = rowsN * 680 + 20; x.fillStyle = '#1b1530'; x.fillRect(0, 0, cv.width, cv.height);
  keys.forEach((k, i) => { const t = document.createElement('canvas'); t.width = 1080; t.height = 1920; cover(t.getContext('2d'), k); x.drawImage(t, 20 + (i % cols) * 380, 20 + Math.floor(i / cols) * 680, 360, 640); });
}
