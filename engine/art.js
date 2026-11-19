// Canvas 2D art kit for the flat Bitmoji-style look: thick navy outlines, flat fills, thin white rim light.
export const OL = '#1b1530';
export const FONT = '"Lilita One", "Arial Black", sans-serif';
export const COL = { pink: '#ff5fa2', gold: '#ffc931', blue: '#4fb3ff', purple: '#b07cff', green: '#5fe07a', red: '#ff4a3d', orange: '#ff9a2e', white: '#ffffff' };
export const BANNER = { pink: ['#ff8cbc', '#ea5f98', '#d9487f'], gold: ['#ffd65a', '#f5ad1b', '#d98f0f'], blue: ['#7cc8ff', '#3c8fe0', '#2a6fc0'], green: ['#8ee87c', '#3fb85a', '#2c9445'], red: ['#ff8a6a', '#e8402e', '#c22e20'] };

export function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
export function rrect(x, X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
export function fs(x, fill, lw = 12, stroke = OL) { x.fillStyle = fill; x.fill(); if (lw) { x.lineWidth = lw; x.strokeStyle = stroke; x.lineJoin = 'round'; x.lineCap = 'round'; x.stroke(); } }
export const hash = (n) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };

// ======================= characters =======================
export const LOOKS = {
  doflamingo: { skin: '#e8b48a', skinD: '#cc9670', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'short', shadesPink: true, grinWide: true,
          top: 'shirtCape', cloth: '#f4f4f8', clothD: '#c9c9d6', heartCol: null, stripes: '#9fb2d6', pants: '#f0a95a', shoe: '#2a2026', boots: false, arm: '#f4f4f8', cuff: '#f4f4f8', cape: true, capeCol: '#ff6fb0', capeLine: '#ff9fcc' },
  lumberjack: { skin: '#e8b48a', skinD: '#cc9670', hair: '#7a4a2a', hairL: '#a26d45', hairStyle: 'bald', beard: true, hat: 'beanie',
          top: 'plaid', cloth: '#c0392b', clothD: '#1b1530', pants: '#3f6fb5', shoe: '#6b4630', boots: true, arm: '#c0392b' },
  chef: { skin: '#f0b98a', skinD: '#d39c6c', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'wavy', hat: 'chef', stache2: true,
          top: 'apron', cloth: '#ffffff', clothD: '#d9dde6', inner: '#c0392b', pants: '#4a4a58', shoe: '#2a2026', boots: true, arm: '#ffffff', sleeveSkin: true },
  corazon: { skin: '#f3d0ae', skinD: '#d9b08c', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'curly', hat: 'hood', hoodColor: '#8a1f3a', clown: true, fringe: true, cigarette: true,
          top: 'shirtCape', cloth: '#f6d3df', clothD: '#e9b3c6', heartCol: '#e8608e', pants: '#f4f4f6', shoe: '#2a2026', boots: false, arm: '#f6d3df', cuff: '#f6d3df', cape: true, hoodStrings: true },
  lawKid: { skin: '#e6b48a', skinD: '#c99872', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'messy', hat: 'fluffy', spots: true,
          top: 'tee', cloth: '#e8c860', clothD: '#c9a63e', inner: '#e8c860', pants: '#4a4a58', shoe: '#6b4630', sleeveSkin: true },
  brute: { skin: '#e0a477', skinD: '#c4875c', hair: '#e8402e', hairL: '#ff8a6a', hairStyle: 'mohawk', earring: true,
          top: 'tank', cloth: '#2a2730', clothD: '#1b1820', pants: '#5d6b3a', shoe: '#2a2026', boots: true, arm: '#e0a477' },
  whitebeard: { skin: '#e8b07a', skinD: '#cc935e', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'bandana', bandana: '#1f1c26', stache: true, scars: true,
          top: 'coat', cloth: '#f4f4f8', clothD: '#cfd0dc', inner: '#e8b07a', innerD: '#cc935e', pants: '#2c3248', shoe: '#2a2026', boots: true, cuff: '#f4f4f8', arm: '#f4f4f8' },
  blackbeard: { skin: '#d9a27a', skinD: '#bb8460', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'bandana', bandana: '#c0392b', beard: true,
          top: 'coat', cloth: '#2a2730', clothD: '#1b1820', inner: '#f2efe6', innerD: '#cfc8b8', pants: '#3a3340', shoe: '#2a2026', boots: true, cuff: '#2a2730' },
  luffyKid: { skin: '#f3c08a', skinD: '#dca06a', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'messy', hat: 'straw', eyeScar: true,
          top: 'tee', cloth: '#d8342c', clothD: '#a92620', inner: '#d8342c', pants: '#3f6fb5', shorts: true, shoe: '#c9934f', boots: false, sleeveSkin: true },
  gunner: { skin: '#c98d64', skinD: '#ab7049', hair: '#2a1d18', hairL: '#4d362c', hairStyle: 'bald', shades: true, goatee: true,
          top: 'vest', cloth: '#4f7a3a', clothD: '#3a5c2a', inner: '#8e8e99', pants: '#5a4a3a', shoe: '#2a2026', boots: true, arm: '#8e8e99', sleeveSkin: true },
  host: { skin: '#f6c690', skinD: '#e2a673', hair: '#1d1a26', hairL: '#4a4560', hairStyle: 'messy', glasses: true,
          top: 'hoodie', cloth: '#22a99a', clothD: '#178274', inner: '#ffffff', innerD: '#d9dde6', pants: '#3b4f7a', shoe: '#e9e6f0', cuff: '#178274' },
  host_g2: null, host_g5: null,
  enemy: { skin: '#d9a27a', skinD: '#bb8460', hair: '#2a1d18', hairL: '#4d362c', hairStyle: 'bandana', beard: true,
           top: 'stripes', cloth: '#ffffff', clothD: '#2c3e78', inner: '#c0392b', innerD: '#962a1f', pants: '#7a5236', shoe: '#2a2026', boots: true, arm: '#ffffff', sleeveSkin: true },
  ace: { skin: '#f3bd85', skinD: '#dc9d66', hair: '#1f1a22', hairL: '#3d3443', hairStyle: 'wavy', freckles: true, hat: 'cowboy', top: 'bare', beads: true, pants: '#2a2730', shorts: true, shoe: '#2a2026', boots: true, arm: '#f3bd85' },
  sugar: { skin: '#f8d5b8', skinD: '#e0b498', hair: '#5fc8c0', hairL: '#9ee6df', hairStyle: 'bob',
          top: 'dress', cloth: '#f4a9c4', clothD: '#d9789c', dots: '#ffffff', inner: '#ffffff', pants: '#f8d5b8', shoe: '#5a2a3a', boots: false, arm: '#f8d5b8', cuff: null },
  builder: { skin: '#d9a27a', skinD: '#bb8460', hair: '#7a4a2a', hairL: '#a26d45', hairStyle: 'bald', beard: true, hat: 'hardhat',
          top: 'vest', cloth: '#ff7a1a', clothD: '#e85a00', inner: '#8a8f9c', pants: '#3f5f95', shoe: '#6b4630', boots: true, arm: '#8a8f9c', sleeveSkin: true },
  usopp: { skin: '#c98d64', skinD: '#ab7049', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'curly', goggles: true, longNose: true,
          top: 'overalls', cloth: '#c9a46a', clothD: '#a5834e', pants: '#c9a46a', shoe: '#6b4630', boots: true, arm: '#c98d64' },
  kid: { skin: '#f3c6a0', skinD: '#dca684', hair: '#7a4a2a', hairL: '#a26d45', hairStyle: 'messy',
          top: 'tee', cloth: '#ffcf3a', clothD: '#e0a90f', inner: '#ffcf3a', pants: '#3f6fb5', shorts: true, shoe: '#e8402e', boots: false, sleeveSkin: true },
  zala: { skin: '#f6d8c0', skinD: '#dcb8a0', hair: '#3a5ad8', hairL: '#6a8af0', hairStyle: 'curlyBig', lips: true,
          top: 'strappy', cloth: '#3a2a26', clothD: '#2a1e1a', pants: '#3a2a26', flare: true, shoe: '#3a2a26', boots: false, arm: '#3a2a26', cuff: '#e0d4b8', furCuff: true, glove: '#3a2a26' },
  nami: { skin: '#f6cba4', skinD: '#e0aa82', hair: '#ff8a2e', hairL: '#ffb070', hairStyle: 'long',
          top: 'tank', cloth: '#ffffff', clothD: '#d9dde6', pants: '#3f6fb5', shoe: '#c9934f', boots: false, arm: '#f6cba4' },
  captain: { skin: '#e8b48a', skinD: '#cc9670', hair: '#9a9aa8', hairL: '#c8c8d6', hairStyle: 'wavy', hat: 'tricorn', stache2: true,
          top: 'coat', cloth: '#b5223a', clothD: '#8a1a2c', inner: '#f4f1ea', innerD: '#cfc8b8', pants: '#2a2730', shoe: '#2a2026', boots: true, cuff: '#d9b44a' },
  blackMaria: { skin: '#f6dcc8', skinD: '#dcbaa4', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'bun', hairpins: true, lips: true, kiseru: true,
          top: 'coat', cloth: '#5a2a6a', clothD: '#3f1a4a', inner: '#c0392b', innerD: '#962a1f', pants: '#5a2a6a', shoe: '#2a2026', boots: false, cuff: '#5a2a6a' },
  robin: { skin: '#f0c8a8', skinD: '#d6a888', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'long',
          top: 'tee', cloth: '#7a5ab5', clothD: '#5a3f8a', inner: '#7a5ab5', pants: '#f4f1ea', shoe: '#2a2026', boots: true, sleeveSkin: true },
  sanji: { skin: '#f3c8a0', skinD: '#d9a880', hair: '#f2cf55', hairL: '#ffe58a', hairStyle: 'sideSweep', curlyBrow: true, cigarette: true,
          top: 'coat', cloth: '#22202a', clothD: '#14121a', inner: '#ffffff', innerD: '#d9dde6', pants: '#22202a', shoe: '#14121a', boots: false, cuff: '#22202a' },
  sumo: { skin: '#e8b48a', skinD: '#cc9670', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'topknot',
          top: 'bare', pants: '#e8b48a', shoe: '#e8b48a', boots: false, arm: '#e8b48a' },
  hawkins: { skin: '#f3d8bc', skinD: '#d9b89c', hair: '#e8c860', hairL: '#fff0a8', hairStyle: 'long', eyeLines: true, crossNecklace: true,
          top: 'ruffle', cloth: '#f2f0f6', clothD: '#cfcbe0', cloakCol: '#2a2a30', armArmor: true, pants: '#7a5ad8', plaidPants: 'rgba(60,40,140,0.6)', shoe: '#e0dcf0', boots: false, arm: '#f2f0f6', cuff: '#f2f0f6', glove: '#8a5a3c' },
  killer: { skin: '#f3c8a0', skinD: '#d9a880', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'long', hat: 'killerMask',
          top: 'tee', cloth: '#1f1c26', clothD: '#14121a', dots: '#ffffff', inner: '#1f1c26', pants: '#3f6fb5', shoe: '#2a2026', boots: true, sleeveSkin: true },
  boxer: { skin: '#c98d64', skinD: '#ab7049', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short',
          top: 'tank', cloth: '#e8402e', clothD: '#b52a1f', pants: '#e8402e', shorts: true, shoe: '#f4f4f8', boots: true, arm: '#c98d64' },
  caribou: { skin: '#9a6a4a', skinD: '#7a5034', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'spikyLong', grinWide: true, goatee: true,
          top: 'robe', cloth: '#e0e0d0', clothD: '#c0c0b0', cloakCol: '#1f1f24', cloakLining: '#a8b82a', fur: true, pants: '#c84a32', shoe: '#5a3a26', boots: false, arm: '#e0e0d0', cuff: '#e0e0d0' },
  franky: { skin: '#f3c09a', skinD: '#d9a07a', hair: '#3fa8ff', hairL: '#8fd0ff', hairStyle: 'pompadour', shades: true,
          top: 'vest', cloth: '#e8402e', clothD: '#ffcf3a', inner: '#f3c09a', pants: '#3f6fb5', shorts: true, shoe: '#c9934f', boots: false, arm: '#f3c09a', sleeveSkin: true },
  fisher: { skin: '#e8b48a', skinD: '#cc9670', hair: '#7a4a2a', hairL: '#a26d45', hairStyle: 'bald', beard: true, hat: 'souwester',
          top: 'coat', cloth: '#ffcf2e', clothD: '#e8b005', inner: '#3f6fb5', innerD: '#2a4f8a', pants: '#3f6fb5', shoe: '#2a3a2a', boots: true, cuff: '#ffcf2e' },
  cracker: { skin: '#f0d2bc', skinD: '#d4b29c', hair: '#8a4ab5', hairL: '#b47ae0', hairStyle: 'wavy', grinWide: true, faceScar: true, braids: true,
          top: 'bare', crackerLegs: true, crackerBelt: true, sideCape: true, shoulderPad: true, glove: '#6b4630', pants: '#6b4630', shoe: '#6b4630', arm: '#f0d2bc' },
  luffy: { skin: '#f3c08a', skinD: '#dca06a', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'messy', hat: 'straw', eyeScar: true,
          top: 'vest', cloth: '#d8342c', clothD: '#a92620', inner: '#f3c08a', pants: '#3f6fb5', shorts: true, shoe: '#c9934f', boots: false, arm: '#f3c08a', sleeveSkin: true },
  ninja: { skin: '#e8b48a', skinD: '#cc9670', hair: '#2a2a36', hairL: '#3d3443', hairStyle: 'bald', hat: 'hood', hoodColor: '#2a2a36', ninjaMask: true,
          top: 'tee', cloth: '#2a2a36', clothD: '#1b1b26', inner: '#2a2a36', pants: '#2a2a36', shoe: '#1b1b26', boots: true, sleeveSkin: false, arm: '#2a2a36' },
  marco: { skin: '#f0c49a', skinD: '#d6a47a', hair: '#f2cf55', hairL: '#ffe58a', hairStyle: 'pineapple', tattoo: true,
          top: 'vest', cloth: '#7a5ab5', clothD: '#5a3f8a', inner: '#f0c49a', pants: '#3a3a5a', shoe: '#c9934f', boots: false, arm: '#7a5ab5' },
  viking: { skin: '#f0c4a0', skinD: '#d6a480', hair: '#d8642c', hairL: '#f08a4a', hairStyle: 'bald', beard: true, hat: 'viking',
          top: 'vest', cloth: '#8a5a3c', clothD: '#6b4630', inner: '#5a6a3a', pants: '#5a4a3a', shoe: '#3a2a20', boots: true, arm: '#5a6a3a' },
  bartolomeo: { skin: '#f0d0b0', skinD: '#d6b090', hair: '#4fc85a', hairL: '#8fe88a', hairStyle: 'crest', sharpTeeth: true, piercings: true,
          top: 'coat', cloth: '#5a3a6a', clothD: '#3f2a4a', inner: '#f0d0b0', innerD: '#d6b090', pants: '#3a3a46', shoe: '#2a2026', boots: true, cuff: '#d9c8a8', feathers: false },
  luchador: { skin: '#d9a27a', skinD: '#bb8460', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'bald', hat: 'luchador',
          top: 'tank', cloth: '#3f6fb5', clothD: '#2a4f8a', pants: '#3f6fb5', shoe: '#e8402e', boots: true, arm: '#d9a27a' },
  gunko: { skin: '#f6dcc8', skinD: '#dcbaa4', hair: '#f2e2c8', hairL: '#fff4e0', hairStyle: 'bald', hat: 'holyHood',
          top: 'coat', cloth: '#f4f0e6', clothD: '#d9d0bc', inner: '#d9b44a', innerD: '#b8942a', pants: '#f4f0e6', shoe: '#d9b44a', boots: true, cuff: '#d9b44a' },
  knight: { skin: '#e8b48a', skinD: '#cc9670', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'bald', hat: 'knightHelm',
          top: 'coat', cloth: '#b8bcc8', clothD: '#8a8e9a', inner: '#e8402e', innerD: '#b52a1f', pants: '#8a8e9a', shoe: '#5a5e6a', boots: true, cuff: '#8a8e9a', arm: '#b8bcc8' },
  buggy: { skin: '#f8e8dc', skinD: '#e0c8b8', hair: '#5ab8e8', hairL: '#9ad8ff', hairStyle: 'long', hat: 'tricorn', clownNose: true, lips: true, grinWide: true,
          top: 'coat', cloth: '#d8342c', clothD: '#a92620', inner: '#f4f1ea', innerD: '#cfc8b8', pants: '#5a3a8a', pantsStripes: '#f4f4f4', shoe: '#2a2026', boots: true, cuff: '#ffcf3a' },
  ronin: { skin: '#e8b48a', skinD: '#cc9670', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'topknot', hat: 'kasa', stache2: true,
          top: 'coat', cloth: '#5a6a8a', clothD: '#3f4a6a', inner: '#e8dcc0', innerD: '#c9b89a', pants: '#3a3346', shoe: '#8a6a4a', boots: false, cuff: '#5a6a8a' },
  sabo: { skin: '#f7cc9c', skinD: '#e2ab78', hair: '#f2cf55', hairL: '#ffe58a', hairStyle: 'curly', hat: 'top', scar: true,
          top: 'coat', cloth: '#2f4f8f', clothD: '#223a6c', inner: '#f4f1ea', innerD: '#cfc8b8', cravat: true, pants: '#3a3340', shoe: '#6b4630', boots: true, cuff: '#f4f1ea' },
};


// ---- Charlotte Cracker pieces (matched to the user's reference): lumpy biscuit flaps, puffy ball pants, dotted side cape, shoulder pad
export function biscuitBlob(x, cx, cy, r, seed = 0) { // lumpy cloud-shaped biscuit with dock holes, like the ones on Cracker's belt
  x.beginPath(); const n = 11; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2, a2 = (i + 0.5) / n * Math.PI * 2, rr = r * (0.86 + 0.08 * Math.sin(i * 2.7 + seed));
    if (i === 0) x.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); else x.quadraticCurveTo(cx + Math.cos(a2 - Math.PI / n) * r * 1.12, cy + Math.sin(a2 - Math.PI / n) * r * 1.12, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  x.closePath(); fs(x, '#d9a84a', Math.max(4, r * 0.08));
  x.lineWidth = Math.max(2, r * 0.05); x.strokeStyle = '#9a6a24'; for (let i = 0; i < 4; i++) { const hx = cx + Math.cos(i * 1.9 + seed) * r * 0.45, hy = cy + Math.sin(i * 1.9 + seed) * r * 0.45; x.beginPath(); x.ellipse(hx, hy, r * 0.09, r * 0.07, 0, 0, 7); x.stroke(); }
}
function puffBall(x, cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); fs(x, '#e8e8ee', 11); x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.clip();
  x.beginPath(); x.moveTo(cx - r, cy + r * 0.1); for (let i = 0; i < 5; i++) { const px = cx - r + (i + 0.5) * r * 0.4; x.quadraticCurveTo(px, cy - r * 0.35, px + r * 0.2, cy + r * 0.1); } x.lineTo(cx + r, cy + r); x.lineTo(cx - r, cy + r); x.closePath(); fs(x, '#8fd36a', 7);
  x.beginPath(); x.moveTo(cx - r, cy + r * 0.25); for (let i = 0; i < 5; i++) { const px = cx - r + (i + 0.5) * r * 0.4; x.quadraticCurveTo(px, cy - r * 0.15, px + r * 0.2, cy + r * 0.25); } x.lineTo(cx + r, cy + r); x.lineTo(cx - r, cy + r); x.closePath(); fs(x, '#e0508a', 7);
  x.fillStyle = '#8fd36a'; for (let i = 0; i < 5; i++) { x.beginPath(); x.arc(cx - r * 0.7 + i * r * 0.35, cy + r * 0.62, r * 0.06, 0, 7); x.fill(); } x.restore(); }
function crackerLegs(x, L) {
  x.beginPath(); x.moveTo(300, 1100); x.lineTo(470, 1100); x.quadraticCurveTo(560, 1400, 520, 1560); x.quadraticCurveTo(470, 1500, 430, 1560); x.quadraticCurveTo(380, 1490, 340, 1560); x.quadraticCurveTo(250, 1450, 300, 1100); fs(x, '#b05ab8', 10); // purple drape
  for (const [x0, x1] of [[250, 350], [410, 510]]) { x.beginPath(); x.moveTo(x0, 1250); x.lineTo(x1, 1250); x.lineTo(x1 - 6, 1580); x.lineTo(x0 + 6, 1580); x.closePath(); fs(x, '#6b4630', 12);
    rrect(x, x0 + 8, 1400, x1 - x0 - 16, 22, 6); fs(x, '#e8c84a', 5); rrect(x, x0 + 8, 1440, x1 - x0 - 16, 22, 6); fs(x, '#e8c84a', 5);
    x.beginPath(); x.ellipse((x0 + x1) / 2 + (x0 < 380 ? -14 : 14), 1600, 76, 36, 0, 0, 7); fs(x, '#6b4630', 12); }
  puffBall(x, 250, 1180, 140); puffBall(x, 510, 1180, 140);
}
function sideCape(x) { // long pink cape with white dots hanging from the figure's right shoulder (viewer's left)
  x.beginPath(); x.moveTo(250, 640); x.quadraticCurveTo(80, 900, 60, 1650); x.lineTo(240, 1640); x.quadraticCurveTo(230, 1100, 330, 700); x.closePath(); fs(x, '#e0508a', 11);
  x.save(); x.clip(); x.fillStyle = '#ffffff'; for (let i = 0; i < 9; i++) { x.beginPath(); x.ellipse(120 + (i % 2) * 70, 800 + i * 95, 12, 22, 0.2, 0, 7); x.fill(); } x.restore();
}
function shoulderPad(x) { x.save(); x.translate(250, 640); x.rotate(-0.3); x.beginPath(); x.ellipse(0, 0, 130, 110, 0, Math.PI, 0); x.lineTo(130, 30); x.lineTo(-130, 30); x.closePath(); fs(x, '#e8508a', 11);
  x.beginPath(); x.ellipse(0, 10, 150, 40, 0, 0, 7); fs(x, '#d9c84a', 9); x.beginPath(); for (let i = 0; i < 4; i++) x.arc(-75 + i * 50, -20, 26, Math.PI, 0); x.lineWidth = 8; x.strokeStyle = '#8fd36a'; x.stroke(); x.restore(); }
function crackerBelt(x) { rrect(x, 228, 1030, 304, 50, 14); fs(x, '#c0306a', 10);
  for (const [bx, r] of [[250, 0.3], [380, 0], [510, -0.3]]) { x.beginPath(); x.arc(bx, 1080, 26, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); x.lineWidth = 7; x.strokeStyle = '#e8c84a'; x.stroke(); biscuitBlob(x, bx, 1170, 95, bx); } }
function crackerHair(x, L) { // two long coiled purple tails flaring out to the sides
  for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 180); x.bezierCurveTo(380 + sd * 260, 150, 380 + sd * 300, 60, 380 + sd * 360, 20); x.lineWidth = 54; x.strokeStyle = OL; x.lineCap = 'round'; x.stroke(); x.lineWidth = 38; x.strokeStyle = L.hair; x.stroke();
    x.lineWidth = 6; x.strokeStyle = L.hairL; for (let k = 0; k < 5; k++) { const u = 0.2 + k * 0.15, px = 380 + sd * (150 + 210 * u), py = 180 - 160 * u; x.beginPath(); x.moveTo(px - 14, py - 14); x.lineTo(px + 14, py + 14); x.stroke(); } }
}

// Full-body figure. Canvas 1000x1900; local coords are offset by (120,110); the head is centred at local (380,330).
// Feet rest on canvas y = FEET. pose: idle | hold | sip | raise | punch | cheer | shrug | holdUp
export const FIG = { W: 1000, H: 1900, OX: 120, OY: 110, FEET: 1745, HEAD: [380, 330] };
const SH = { L: [262, 690], R: [498, 690] };
export const POSES = {
  idle:   { L: [[226, 880], [222, 1060], 'round'], R: [[534, 880], [538, 1060], 'round'] },
  hold:   { L: [[226, 880], [222, 1060], 'round'], R: [[585, 900], [480, 880], 'round'] },
  sip:    { L: [[226, 880], [222, 1060], 'round'], R: [[600, 800], [470, 560], 'round'] },
  raise:  { L: [[140, 620], [165, 420], 'open'], R: [[534, 880], [538, 1060], 'round'] },
  punch:  { L: [[226, 880], [222, 1060], 'round'], R: [[660, 700], [820, 690], 'fist'] },
  cheer:  { L: [[165, 560], [155, 390], 'fist'], R: [[595, 560], [605, 390], 'fist'] },
  shrug:  { L: [[165, 830], [105, 720], 'open'], R: [[595, 830], [655, 720], 'open'] },
  holdUp: { L: [[226, 880], [222, 1060], 'round'], R: [[640, 760], [620, 560], 'open'] },
};
// hand / head position of a figure drawn with its feet at (cx, fy), scale s, optionally mirrored
export function figPoint(lx, ly, cx, fy, s, flip = false) { const dx = (lx + FIG.OX - FIG.W / 2) * s; return [cx + (flip ? -dx : dx), fy + (ly + FIG.OY - FIG.FEET) * s]; }

function drawLegs(x, L) {
  const pants = L.pants, shoe = L.shoe;
  for (const [x0, x1] of [[262, 372], [388, 498]]) {
    x.beginPath(); x.moveTo(x0, 1060); x.lineTo(x1, 1060); x.lineTo(x1 - 6, 1580); x.lineTo(x0 + 6, 1580); x.closePath(); fs(x, pants, 12);
    if (L.shorts) { x.beginPath(); x.rect(x0 + 10, 1330, x1 - x0 - 20, 250); fs(x, L.skin, 10); x.beginPath(); x.moveTo(x0, 1330); x.lineTo(x1, 1330); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
    if (L.boots) { x.beginPath(); x.rect(x0 + 4, 1440, x1 - x0 - 8, 145); fs(x, shoe, 11); }
    x.beginPath(); x.ellipse((x0 + x1) / 2 + (x0 < 380 ? -14 : 14), 1600, 76, 36, 0, 0, 7); fs(x, shoe, 12);
    if (!L.boots) { x.beginPath(); x.ellipse((x0 + x1) / 2 + (x0 < 380 ? -14 : 14), 1622, 74, 14, 0, 0, Math.PI); x.lineWidth = 12; x.strokeStyle = '#f4f4f4'; x.stroke(); }
  }
  if (L.flare) for (const [x0, x1] of [[262, 372], [388, 498]]) { x.beginPath(); x.moveTo(x0 + 6, 1380); x.lineTo(x0 - 24, 1585); x.lineTo(x1 + 24, 1585); x.lineTo(x1 - 6, 1380); x.closePath(); fs(x, L.pants, 10); }
  if (L.plaidPants) { for (const [x0, x1] of [[262, 372], [388, 498]]) { x.save(); x.beginPath(); x.moveTo(x0, 1060); x.lineTo(x1, 1060); x.lineTo(x1 - 6, 1580); x.lineTo(x0 + 6, 1580); x.closePath(); x.clip(); x.fillStyle = L.plaidPants; for (let k = x0; k < x1; k += 36) x.fillRect(k, 1060, 10, 520); for (let k = 1080; k < 1580; k += 44) x.fillRect(x0, k, x1 - x0, 10); x.restore(); } }
  if (L.pantsStripes) { x.save(); for (const [x0, x1] of [[262, 372], [388, 498]]) { x.beginPath(); x.moveTo(x0, 1060); x.lineTo(x1, 1060); x.lineTo(x1 - 6, 1580); x.lineTo(x0 + 6, 1580); x.closePath(); x.save(); x.clip(); x.strokeStyle = L.pantsStripes; x.lineWidth = 9; for (let k = x0 + 14; k < x1; k += 26) { x.beginPath(); x.moveTo(k, 1060); x.lineTo(k, 1580); x.stroke(); } x.restore(); } x.restore(); }
  x.lineWidth = 6; x.strokeStyle = 'rgba(0,0,0,0.2)'; x.beginPath(); x.moveTo(318, 1150); x.lineTo(320, 1250); x.moveTo(444, 1150); x.lineTo(442, 1250); x.stroke(); // fold lines
}
function drawCloak(x, L) { // long smooth cloak from the shoulders to the ground; optional spotted lining and fur collar
  x.beginPath(); x.moveTo(250, 600); x.quadraticCurveTo(0, 900, -20, 1660); x.lineTo(780, 1660); x.quadraticCurveTo(760, 900, 510, 600); x.closePath(); fs(x, L.cloakCol, 12);
  if (L.cloakLining) { x.beginPath(); x.moveTo(260, 640); x.quadraticCurveTo(60, 950, 50, 1640); x.lineTo(710, 1640); x.quadraticCurveTo(700, 950, 500, 640); x.closePath(); fs(x, L.cloakLining, 8);
    x.save(); x.clip(); x.fillStyle = '#2a2014'; for (let i = 0; i < 46; i++) { x.beginPath(); x.ellipse(40 + (i * 131) % 680, 660 + ((i * 197) % 1000), 18, 26, 0.3, 0, 7); x.fill(); } x.restore(); }
  if (L.fur) { x.beginPath(); for (let i = 0; i <= 16; i++) { const a = Math.PI * (1.05 + i / 16 * 0.9), r = i % 2 ? 300 : 270; x.lineTo(380 + Math.cos(a) * r, 520 + Math.sin(a) * r * 0.9); } x.lineTo(560, 640); x.lineTo(200, 640); x.closePath(); fs(x, '#f4f4f8', 10); }
}
function drawCape(x, L) { // huge black-purple feather coat draped from the shoulders
  const pts = [];
  for (let i = 0; i <= 18; i++) { const t = i / 18, px = lerpN(250, 20, t) - Math.sin(t * Math.PI) * 60, py = lerpN(560, 1620, t); pts.push([px + (i % 2 ? -40 : 0), py]); }
  for (let i = 0; i <= 12; i++) { const t = i / 12; pts.push([lerpN(20, 740, t), 1620 + (i % 2 ? 50 : 0)]); }
  for (let i = 18; i >= 0; i--) { const t = i / 18, px = lerpN(510, 740, t) + Math.sin(t * Math.PI) * 60, py = lerpN(560, 1620, t); pts.push([px + (i % 2 ? 40 : 0), py]); }
  // feathers rising behind the shoulders and head
  for (let i = 0; i <= 14; i++) { const a = Math.PI * (1.0 + i / 14), r = i % 2 ? 250 : 215; pts.push([380 - Math.cos(a) * r, 700 + Math.sin(a) * r * 0.9]); }
  x.beginPath(); pts.forEach(([px, py], k) => (k ? x.lineTo(px, py) : x.moveTo(px, py))); x.closePath(); fs(x, L.capeCol || '#2b2238', 12);
  x.save(); x.clip(); x.lineWidth = 7; x.strokeStyle = L.capeLine || '#51456a'; x.lineCap = 'round';
  for (let i = 0; i < 26; i++) { const px = 60 + (i * 97) % 640, py = 620 + ((i * 211) % 900); x.beginPath(); x.moveTo(px, py); x.quadraticCurveTo(px + 30, py + 40, px + 10, py + 90); x.stroke(); }
  x.restore();
}
function lerpN(a, b, t) { return a + (b - a) * t; }
function drawTorso(x, L) {
  const torso = () => { x.beginPath(); x.moveTo(236, 1090); x.lineTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 1090); x.closePath(); };
  if (L.top === 'hoodie') {
    x.beginPath(); x.moveTo(262, 670); x.bezierCurveTo(262, 590, 498, 590, 498, 670); x.lineTo(470, 700); x.lineTo(290, 700); x.closePath(); fs(x, L.clothD, 12); // hood
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(316, 640); x.quadraticCurveTo(380, 712, 444, 640); x.closePath(); fs(x, L.inner, 10);
    x.beginPath(); x.moveTo(298, 642); x.quadraticCurveTo(380, 760, 462, 642); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.lineWidth = 7; x.strokeStyle = '#f2f2f2'; for (const dx of [345, 415]) { x.beginPath(); x.moveTo(dx, 700); x.lineTo(dx + (dx < 380 ? -4 : 4), 800); x.stroke(); x.beginPath(); x.arc(dx + (dx < 380 ? -4 : 4), 806, 8, 0, 7); fs(x, '#f2f2f2', 5); }
    x.beginPath(); x.moveTo(290, 1000); x.lineTo(300, 930); x.lineTo(460, 930); x.lineTo(470, 1000); x.lineWidth = 9; x.strokeStyle = L.clothD; x.stroke(); // pocket
    rrect(x, 230, 1050, 300, 50, 18); fs(x, L.clothD, 11); // hem band
  } else if (L.top === 'stripes') {
    torso(); fs(x, L.cloth, 12); x.save(); torso(); x.clip(); x.fillStyle = L.clothD; for (let y = 660; y < 1100; y += 56) x.fillRect(200, y, 360, 26); x.restore();
    torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.rect(232, 1020, 296, 60); fs(x, L.inner, 10); x.beginPath(); x.moveTo(500, 1050); x.lineTo(560, 1150); x.lineTo(520, 1160); x.lineTo(480, 1070); fs(x, L.inner, 9); // sash
  } else if (L.top === 'coat') {
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(560, 1330); x.lineTo(200, 1330); x.closePath(); fs(x, L.cloth, 12); // long coat
    x.beginPath(); x.moveTo(318, 640); x.lineTo(442, 640); x.lineTo(430, 1080); x.lineTo(330, 1080); x.closePath(); fs(x, L.inner, 10);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 - sd * 62, 640); x.lineTo(380 - sd * 110, 700); x.lineTo(380 - sd * 70, 760); x.lineTo(380 - sd * 52, 1080); x.lineTo(380 - sd * 62, 1080); x.closePath(); fs(x, L.clothD, 10); }
    x.lineWidth = 7; x.strokeStyle = L.clothD; x.beginPath(); x.moveTo(240, 1200); x.lineTo(260, 1320); x.moveTo(520, 1200); x.lineTo(500, 1320); x.stroke();
    if (L.hearts) { for (const [hx, hy] of [[352, 690], [408, 740], [356, 800], [404, 860], [352, 920], [408, 980], [358, 1040]]) { x.save(); x.translate(hx, hy); x.beginPath(); x.moveTo(0, 14); x.bezierCurveTo(-26, -2, -12, -22, 0, -8); x.bezierCurveTo(12, -22, 26, -2, 0, 14); x.fillStyle = '#d6303e'; x.fill(); x.restore(); } }
    if (L.cravat) { x.beginPath(); x.moveTo(350, 648); x.lineTo(410, 648); x.lineTo(395, 720); x.lineTo(380, 760); x.lineTo(365, 720); x.closePath(); fs(x, '#f7f4ee', 8); }
  } else if (L.top === 'shirtCape') {
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(300, 640); x.lineTo(380, 760); x.lineTo(460, 640); x.lineTo(500, 700); x.lineTo(380, 800); x.lineTo(260, 700); x.closePath(); fs(x, L.cloth, 9); // big collar
    x.beginPath(); x.moveTo(330, 640); x.lineTo(380, 740); x.lineTo(430, 640); x.closePath(); fs(x, L.skin, 7);
    x.fillStyle = '#1b1530'; for (const yy of [820, 900, 980]) { x.beginPath(); x.arc(380, yy, 7, 0, 7); x.fill(); }
    x.beginPath(); x.moveTo(380, 780); x.lineTo(380, 1090); x.lineWidth = 4; x.strokeStyle = L.clothD; x.stroke();
    if (L.heartCol) for (const [hx, hy, r] of [[290, 760, -0.3], [470, 770, 0.3], [310, 870, 0.2], [455, 880, -0.2], [285, 980, 0.1], [470, 990, -0.3], [330, 1060, 0.3], [440, 1050, 0]]) { x.save(); x.translate(hx, hy); x.rotate(r); x.scale(1.2, 1.2); x.beginPath(); x.moveTo(0, 14); x.bezierCurveTo(-26, -2, -12, -22, 0, -8); x.bezierCurveTo(12, -22, 26, -2, 0, 14); x.fillStyle = L.heartCol; x.fill(); x.restore(); }
    if (L.stripes) { x.save(); torso(); x.clip(); x.strokeStyle = L.stripes; x.lineWidth = 6; for (let k = 240; k < 530; k += 34) { x.beginPath(); x.moveTo(k, 640); x.lineTo(k, 1100); x.stroke(); } x.restore(); torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); x.beginPath(); x.moveTo(330, 640); x.lineTo(380, 760); x.lineTo(430, 640); x.closePath(); fs(x, L.skin, 7); }
    if (L.hoodStrings) for (const [sx, ex] of [[345, 335], [415, 430]]) { x.beginPath(); x.moveTo(sx, 600); x.quadraticCurveTo(sx - 10, 800, ex, 960); x.lineWidth = 14; x.strokeStyle = L.hoodColor || '#8a1f3a'; x.lineCap = 'round'; x.stroke();
      x.save(); x.translate(ex, 990); x.scale(1.4, 1.4); x.beginPath(); x.moveTo(0, 20); x.bezierCurveTo(-26, 0, -14, -22, 0, -8); x.bezierCurveTo(14, -22, 26, 0, 0, 20); fs(x, L.hoodColor || '#8a1f3a', 4); x.restore(); }
  } else if (L.top === 'plaid') {
    torso(); fs(x, L.cloth, 12); x.save(); torso(); x.clip(); x.fillStyle = 'rgba(27,21,48,0.45)'; for (let k = 200; k < 560; k += 80) x.fillRect(k, 600, 30, 520); for (let k = 640; k < 1120; k += 80) x.fillRect(200, k, 360, 30); x.restore();
    torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); rrect(x, 228, 1040, 304, 52, 14); fs(x, '#6b4630', 11);
  } else if (L.top === 'apron') {
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(290, 760); x.lineTo(470, 760); x.lineTo(500, 1100); x.lineTo(260, 1100); x.closePath(); fs(x, '#f4f4f8', 10);
    x.beginPath(); x.moveTo(330, 640); x.lineTo(380, 700); x.lineTo(430, 640); fs(x, L.inner, 9); // red neck scarf
    x.lineWidth = 6; x.strokeStyle = '#c9cdd6'; x.beginPath(); x.moveTo(340, 900); x.lineTo(420, 900); x.stroke();
  } else if (L.top === 'tank') {
    torso(); fs(x, L.skin, 12);
    x.beginPath(); x.moveTo(270, 700); x.lineTo(316, 640); x.quadraticCurveTo(380, 700, 444, 640); x.lineTo(490, 700); x.lineTo(524, 1090); x.lineTo(236, 1090); x.closePath(); fs(x, L.cloth, 11);
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#6b4630', 11);
  } else if (L.top === 'tee') {
    torso(); fs(x, L.cloth, 12);
    if (L.dots) { x.save(); torso(); x.clip(); x.fillStyle = L.dots; for (let yy = 660; yy < 1100; yy += 64) for (let xx = 220 + (yy / 64 % 2) * 32; xx < 540; xx += 64) { x.beginPath(); x.arc(xx, yy, 14, 0, 7); x.fill(); } x.restore(); torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
    x.beginPath(); x.moveTo(318, 640); x.quadraticCurveTo(380, 700, 442, 640); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
    x.lineWidth = 7; x.strokeStyle = L.clothD; x.beginPath(); x.moveTo(280, 900); x.quadraticCurveTo(300, 980, 290, 1060); x.moveTo(480, 900); x.quadraticCurveTo(460, 980, 470, 1060); x.stroke();
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#8a5a3c', 11);
  } else if (L.top === 'vest') {
    torso(); fs(x, L.inner, 12);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 650); x.lineTo(380 + sd * 60, 650); x.lineTo(380 + sd * 40, 1090); x.lineTo(380 + sd * 146, 1090); x.closePath(); fs(x, L.cloth, 11); }
    x.fillStyle = L.clothD; for (const yy of [760, 860]) for (const sd of [-1, 1]) { rrect(x, 380 + sd * 95 - 26, yy, 52, 40, 8); fs(x, L.clothD, 7); }
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#3a2a20', 11); x.beginPath(); x.arc(560, 1080, 1, 0, 7);
  } else if (L.top === 'ruffle') { // white ruffled shirt with a high collar, cravat and a black cross
    torso(); fs(x, L.cloth, 12);
    x.beginPath(); for (let i = 0; i <= 10; i++) x.lineTo(232 + i * 29.6, 1090 + (i % 2 ? 30 : 0)); x.lineTo(524, 1060); x.lineTo(236, 1060); x.closePath(); fs(x, L.cloth, 8);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 60, 640); x.lineTo(380 + sd * 120, 540); x.lineTo(380 + sd * 150, 650); x.closePath(); fs(x, L.cloth, 8); }
    x.beginPath(); x.moveTo(340, 660); x.quadraticCurveTo(300, 760, 340, 860); x.lineTo(380, 820); x.lineTo(420, 860); x.quadraticCurveTo(460, 760, 420, 660); x.closePath(); fs(x, '#f8f6ee', 8);
    x.fillStyle = '#1b1530'; x.fillRect(368, 860, 24, 110); x.fillRect(335, 890, 90, 22);
  } else if (L.top === 'robe') { // long light robe with flared sleeves and a red X on the chest
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(560, 1250); x.lineTo(200, 1250); x.closePath(); fs(x, L.cloth, 12);
    x.beginPath(); x.moveTo(320, 640); x.quadraticCurveTo(380, 720, 440, 640); fs(x, L.skin, 8);
    x.strokeStyle = '#c0283a'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(300, 760); x.lineTo(460, 940); x.moveTo(460, 760); x.lineTo(300, 940); x.stroke();
    for (const [cx, cy] of [[300, 760], [460, 760], [300, 940], [460, 940]]) { x.beginPath(); x.arc(cx, cy, 14, 0, 7); x.fillStyle = '#c0283a'; x.fill(); }
  } else if (L.top === 'strappy') { // bare midriff, dark bikini top, criss-cross straps with a ring, fur-trimmed bolero
    torso(); fs(x, L.skin, 12);
    for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 60, 760, 62, 48, 0, 0, 7); fs(x, L.cloth, 8); }
    x.strokeStyle = L.cloth; x.lineWidth = 14; x.beginPath(); x.moveTo(320, 660); x.lineTo(380, 640); x.lineTo(440, 660); x.moveTo(330, 800); x.lineTo(470, 1040); x.moveTo(430, 800); x.lineTo(290, 1040); x.moveTo(380, 640); x.lineTo(380, 900); x.stroke();
    x.beginPath(); x.arc(380, 900, 36, 0, 7); x.lineWidth = 12; x.stroke();
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 650); x.lineTo(380 + sd * 120, 650); x.quadraticCurveTo(380 + sd * 100, 780, 380 + sd * 130, 880); x.lineTo(380 + sd * 150, 880); x.closePath(); fs(x, '#e0d4b8', 8); }
    rrect(x, 228, 1040, 304, 30, 10); fs(x, '#14121a', 8);
  } else if (L.top === 'dress') { // short dress with a flared skirt
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(530, 960); x.lineTo(620, 1300); x.quadraticCurveTo(380, 1350, 140, 1300); x.lineTo(230, 960); x.closePath(); fs(x, L.cloth, 12);
    if (L.dots) { x.save(); x.clip(); x.fillStyle = L.dots; for (let yy = 700; yy < 1340; yy += 70) for (let xx = 160 + (yy / 70 % 2) * 35; xx < 620; xx += 70) { x.beginPath(); x.arc(xx, yy, 13, 0, 7); x.fill(); } x.restore(); }
    x.beginPath(); x.moveTo(300, 640); x.quadraticCurveTo(380, 740, 460, 640); x.lineTo(470, 660); x.quadraticCurveTo(380, 780, 290, 660); x.closePath(); fs(x, L.inner || '#ffffff', 8);
    rrect(x, 232, 940, 296, 40, 14); fs(x, L.clothD, 9);
  } else if (L.top === 'overalls') { // bare chest under a bib with straps
    torso(); fs(x, L.skin, 12);
    x.beginPath(); x.moveTo(290, 820); x.lineTo(470, 820); x.lineTo(500, 1090); x.lineTo(260, 1090); x.closePath(); fs(x, L.cloth, 11);
    for (const [a, b] of [[300, 640], [460, 640]]) { x.beginPath(); x.moveTo(a, b); x.lineTo(a < 380 ? 310 : 450, 830); x.lineWidth = 34; x.strokeStyle = OL; x.stroke(); x.lineWidth = 22; x.strokeStyle = L.cloth; x.stroke(); }
    x.beginPath(); x.rect(330, 880, 100, 70); fs(x, L.clothD, 7);
  } else { // bare chest
    torso(); fs(x, L.skin, 12);
    x.lineWidth = 6; x.strokeStyle = L.skinD; x.beginPath(); x.moveTo(380, 760); x.lineTo(380, 1000); x.moveTo(290, 790); x.quadraticCurveTo(330, 815, 370, 790); x.moveTo(390, 790); x.quadraticCurveTo(430, 815, 470, 790); x.stroke();
    x.beginPath(); x.moveTo(300, 860); x.lineTo(460, 860); x.moveTo(305, 930); x.lineTo(455, 930); x.lineWidth = 5; x.stroke();
    rrect(x, 228, 1040, 304, 52, 14); fs(x, '#e8822e', 11); rrect(x, 345, 1036, 70, 60, 10); fs(x, '#ffd34d', 9); // belt + buckle
  }
  if (L.tattoo) { x.save(); x.translate(380, 820); x.strokeStyle = '#3f5fc0'; x.lineWidth = 16; x.lineCap = 'round'; x.beginPath(); x.moveTo(-70, -70); x.lineTo(70, 70); x.moveTo(70, -70); x.lineTo(-70, 70); x.stroke(); x.beginPath(); x.arc(0, -10, 44, 0, 7); x.fillStyle = '#3f5fc0'; x.fill(); x.beginPath(); x.moveTo(-60, -40); x.quadraticCurveTo(0, -20, 60, -40); x.lineWidth = 12; x.strokeStyle = '#3f5fc0'; x.stroke(); x.restore(); }
  if (L.feathers) { for (let i = 0; i < 16; i++) { const a = Math.PI * (0.95 + i / 15 * 1.1), fx = 380 + Math.cos(a) * 190, fy = 700 + Math.sin(a) * 70 + 40; x.beginPath(); x.ellipse(fx, fy, 34, 52, a + Math.PI / 2, 0, 7); fs(x, i % 2 ? '#2e2a38' : '#1f1c26', 7); } }
  // white rim light on the upper-left edge
  x.beginPath(); x.moveTo(240, 1000); x.lineTo(238, 730); x.quadraticCurveTo(242, 664, 296, 650); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
}
function drawArms(x, L, pose) {
  const P = POSES[pose] || POSES.idle, armCol = L.arm || L.cloth || L.skin;
  for (const side of ['L', 'R']) {
    const [sx, sy] = SH[side], [[ex, ey], [hx, hy], hand] = P[side];
    x.lineCap = 'round'; x.lineJoin = 'round';
    x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineTo(hx, hy);
    x.lineWidth = 86; x.strokeStyle = OL; x.stroke(); x.lineWidth = 64; x.strokeStyle = armCol; x.stroke();
    if (L.sleeveSkin) { x.beginPath(); x.moveTo(ex, ey); x.lineTo(hx, hy); x.lineWidth = 64; x.strokeStyle = L.skin; x.stroke(); x.beginPath(); x.moveTo(sx, sy); x.lineTo(ex, ey); x.lineWidth = 64; x.strokeStyle = armCol; x.stroke(); }
    if (L.heartCol) { for (const [ax, ay] of [[sx + (ex - sx) * 0.35, sy + (ey - sy) * 0.35], [sx + (ex - sx) * 0.78, sy + (ey - sy) * 0.78], [ex + (hx - ex) * 0.5, ey + (hy - ey) * 0.5]]) { x.save(); x.translate(ax, ay); x.beginPath(); x.moveTo(0, 12); x.bezierCurveTo(-22, -2, -10, -18, 0, -6); x.bezierCurveTo(10, -18, 22, -2, 0, 12); x.fillStyle = L.heartCol; x.fill(); x.restore(); } }
    // cuff + hand
    const ang = Math.atan2(hy - ey, hx - ex);
    x.save(); x.translate(hx, hy); x.rotate(ang);
    if (L.cuff) { rrect(x, -30, -36, L.furCuff ? 40 : 26, 72, 10); fs(x, L.cuff, 8); }
    x.beginPath();
    if (hand === 'open') { x.ellipse(28, 0, 40, 36, 0, 0, 7); fs(x, L.glove || L.skin, 10); for (const k of [-24, -8, 8, 24]) { x.save(); x.translate(64, k); x.rotate(k * 0.012); rrect(x, -12, -10, 40, 20, 10); fs(x, L.glove || L.skin, 7); x.restore(); } }
    else { x.arc(26, 0, 40, 0, 7); fs(x, L.glove || L.skin, 10); if (hand === 'fist') { x.lineWidth = 6; x.strokeStyle = OL; for (const k of [-16, 4]) { x.beginPath(); x.moveTo(48, k); x.lineTo(60, k + 6); x.stroke(); } } }
    x.restore();
  }
}

// expr: smug | grin | shock | shout | sad | worried | hit | calm | yuck
export function drawPerson({ who = 'host', expr = 'calm', mouth = 0, blink = false, pose = 'idle' }) {
  const L = LOOKS[who], c = mk(FIG.W, FIG.H), x = c.getContext('2d');
  x.translate(FIG.OX, FIG.OY);
  if (L.cape) drawCape(x, L);
  if (L.hairStyle === 'long') { // long wavy hair hanging behind the head down past the shoulders
    x.beginPath(); x.moveTo(380, 100); x.bezierCurveTo(60, 100, 90, 500, 110, 700); for (let i = 0; i < 7; i++) x.quadraticCurveTo(140 + i * 80, 800 + (i % 2) * 40, 180 + i * 80, 760 + (i % 2 ? 0 : 50));
    x.bezierCurveTo(670, 500, 700, 100, 380, 100); x.closePath(); fs(x, L.hair, 12);
  }
  if (L.cloakCol) drawCloak(x, L);
  if (L.braids) crackerHair(x, L);
  if (L.sideCape) sideCape(x);
  if (L.crackerLegs) crackerLegs(x, L); else drawLegs(x, L);
  drawTorso(x, L);
  if (L.crackerBelt) crackerBelt(x);
  // ---- neck ----
  x.beginPath(); x.moveTo(325, 520); x.lineTo(325, 636); x.quadraticCurveTo(380, 660, 435, 636); x.lineTo(435, 520); x.closePath(); fs(x, L.skin, 10);
  x.beginPath(); x.moveTo(330, 560); x.quadraticCurveTo(380, 600, 430, 560); x.lineTo(430, 530); x.lineTo(330, 530); x.closePath(); x.fillStyle = L.skinD; x.fill();
  if (L.beads) for (let i = 0; i < 13; i++) { const a = Math.PI * (0.15 + 0.7 * i / 12); x.beginPath(); x.arc(380 - Math.cos(a) * 95, 640 + Math.sin(a) * 70, 15, 0, 7); fs(x, '#d8342c', 6); }
  // ---- ears + head ----
  for (const ex of [168, 592]) { x.beginPath(); x.ellipse(ex, 345, 34, 50, 0, 0, 7); fs(x, L.skin, 11); }
  const head = () => { x.beginPath(); x.moveTo(168, 320); x.bezierCurveTo(168, 115, 592, 115, 592, 320); x.bezierCurveTo(592, 470, 520, 560, 380, 566); x.bezierCurveTo(240, 560, 168, 470, 168, 320); x.closePath(); };
  head(); fs(x, L.skin, 12);
  if (L.beard) { x.beginPath(); x.moveTo(176, 380); x.bezierCurveTo(190, 520, 280, 600, 380, 604); x.bezierCurveTo(480, 600, 570, 520, 584, 380); x.bezierCurveTo(560, 470, 480, 470, 380, 470); x.bezierCurveTo(280, 470, 200, 470, 176, 380); fs(x, L.hair, 11); }
  // ---- eyes ----
  const ey = 360, eyes = [285, 475];
  const lid = blink ? 1 : ({ yuck: 1, smug: 0.48, grin: 0.3, shock: 0, shout: 0.12, sad: 0.35, worried: 0.1, hit: 1, calm: 0.4 })[expr];
  const look = ({ yuck: [0, 0], smug: [14, 6], grin: [0, 4], shock: [0, 0], shout: [0, 2], sad: [-6, 10], worried: [-10, 0], hit: [0, 0], calm: [6, 4] })[expr];
  eyes.forEach((ex, i) => {
    x.beginPath(); x.ellipse(ex, ey + 30, 56, 26, 0, 0.15 * Math.PI, 0.85 * Math.PI); x.lineWidth = 9; x.strokeStyle = L.skinD; x.stroke(); // tan eye bags
    if (expr === 'hit' || expr === 'yuck') { // squeezed >< eyes
      x.beginPath(); const s = i ? -1 : 1; x.moveTo(ex - 40 * s, ey - 30); x.lineTo(ex + 30 * s, ey); x.lineTo(ex - 40 * s, ey + 30); x.lineWidth = 13; x.strokeStyle = OL; x.stroke();
    } else {
      const rx = 54, ry = expr === 'shock' || expr === 'worried' ? 50 : 42;
      x.save(); x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.fillStyle = '#fff'; x.fill(); x.clip();
      const pr = expr === 'shock' ? 13 : expr === 'worried' ? 17 : 23;
      x.beginPath(); x.arc(ex + look[0], ey + look[1], pr, 0, 7); x.fillStyle = '#16101a'; x.fill();
      x.beginPath(); x.arc(ex + look[0] - 7, ey + look[1] - 8, 6, 0, 7); x.fillStyle = '#fff'; x.fill();
      if (lid > 0) { x.fillStyle = L.skin; x.fillRect(ex - rx - 5, ey - ry - 5, rx * 2 + 10, (ry * 2 + 10) * lid); }
      x.restore();
      x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, 7); x.lineWidth = 11; x.strokeStyle = OL; x.stroke();
      if (lid > 0) { const ly = ey - ry - 5 + (ry * 2 + 10) * lid; x.beginPath(); x.moveTo(ex - rx - 4, ly + 3); x.quadraticCurveTo(ex, ly - 6, ex + rx + 4, ly + 3); x.lineWidth = 15; x.stroke(); }
    }
    const by = ({ yuck: -66, smug: i ? -82 : -72, grin: -84, shock: -104, shout: -70, sad: -82, worried: -96, hit: -80, calm: -80 })[expr];
    const tilt = ({ yuck: i ? 0.25 : -0.25, smug: i ? -0.08 : 0.06, grin: 0, shock: 0, shout: i ? -0.3 : 0.3, sad: i ? 0.25 : -0.25, worried: i ? 0.3 : -0.3, hit: i ? -0.2 : 0.2, calm: 0.02 })[expr];
    x.save(); x.translate(ex, ey + by); x.rotate(tilt);
    x.beginPath(); x.moveTo(-64, 6); x.quadraticCurveTo(0, -14, 64, 2); x.lineWidth = 24; x.strokeStyle = who === 'sabo' ? '#b88a2c' : OL; x.stroke(); x.restore();
  });
  
  if (L.earring) { x.beginPath(); x.arc(170, 400, 18, 0, 7); x.lineWidth = 8; x.strokeStyle = '#ffd34d'; x.stroke(); }
  if (L.clown) { for (const ex of [285, 475]) { x.fillStyle = '#2a3f99'; x.beginPath(); x.moveTo(ex - 30, 400); x.lineTo(ex + 30, 400); x.lineTo(ex, 470); x.closePath(); x.fill(); x.fillStyle = '#1b1530'; x.beginPath(); x.moveTo(ex - 12, 318); x.lineTo(ex + 12, 318); x.lineTo(ex, 270); x.closePath(); x.fill(); } }
  if (L.spots) { x.fillStyle = 'rgba(255,255,255,0.75)'; for (const [sx, sy, r] of [[230, 250, 30], [520, 470, 34], [300, 500, 22], [470, 230, 20]]) { x.beginPath(); x.ellipse(sx, sy, r, r * 0.8, 0.4, 0, 7); x.fill(); } }
  if (L.goatee) { x.beginPath(); x.moveTo(330, 520); x.quadraticCurveTo(380, 610, 430, 520); x.quadraticCurveTo(380, 545, 330, 520); fs(x, L.hair, 9); }
  if (L.eyeScar) { x.lineWidth = 6; x.strokeStyle = '#a5523e'; x.beginPath(); x.moveTo(440, 418); x.quadraticCurveTo(478, 430, 512, 418); x.stroke(); for (const k of [455, 478, 500]) { x.beginPath(); x.moveTo(k, 410); x.lineTo(k + 4, 430); x.stroke(); } }
  if (L.shadesPink) { for (const ex of [285, 475]) { x.beginPath(); x.ellipse(ex, 360, 82, 52, 0, 0, 7); fs(x, '#ff8fa8', 9, '#f4f4f8'); x.beginPath(); x.ellipse(ex, 360, 82, 52, 0, 0, 7); x.lineWidth = 4; x.strokeStyle = OL; x.stroke(); x.beginPath(); x.moveTo(ex - 50, 335); x.lineTo(ex - 20, 335); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke(); }
    x.beginPath(); x.moveTo(367, 352); x.lineTo(393, 352); x.lineWidth = 9; x.strokeStyle = '#f4f4f8'; x.stroke(); }
  if (L.shades) { for (const ex of [285, 475]) { rrect(x, ex - 74, 316, 148, 92, 34); fs(x, '#1c1a26', 10); x.beginPath(); x.moveTo(ex - 50, 336); x.lineTo(ex - 20, 336); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.75)'; x.stroke(); }
    x.beginPath(); x.moveTo(359, 350); x.lineTo(401, 350); x.lineWidth = 10; x.strokeStyle = OL; x.stroke(); }
  if (L.scar) { x.beginPath(); x.moveTo(430, 290); x.bezierCurveTo(560, 270, 580, 380, 545, 440); x.bezierCurveTo(500, 450, 440, 420, 430, 380); x.closePath(); x.fillStyle = 'rgba(214,120,110,0.45)'; x.fill(); }
  if (L.glasses) { // small round glasses
    x.lineWidth = 8; x.strokeStyle = OL;
    for (const ex of eyes) { x.beginPath(); x.arc(ex, ey + 4, 66, 0, 7); x.fillStyle = 'rgba(190,230,255,0.16)'; x.fill(); x.stroke();
      x.beginPath(); x.moveTo(ex - 34, ey - 34); x.lineTo(ex - 14, ey - 50); x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke(); x.lineWidth = 8; x.strokeStyle = OL; }
    x.beginPath(); x.moveTo(351, ey - 4); x.quadraticCurveTo(380, ey - 22, 409, ey - 4); x.stroke();
    x.beginPath(); x.moveTo(219, ey - 6); x.lineTo(172, ey - 18); x.moveTo(541, ey - 6); x.lineTo(588, ey - 18); x.stroke();
  }
  if (expr === 'yuck') { x.fillStyle = 'rgba(110,200,90,0.45)'; for (const cx of [262, 498]) { x.beginPath(); x.ellipse(cx, 445, 52, 30, 0, 0, 7); x.fill(); } }
  // nose + mouth
  x.beginPath(); x.moveTo(372, 400); x.quadraticCurveTo(402, 428, 392, 450); x.quadraticCurveTo(382, 460, 368, 450); x.lineWidth = 9; x.strokeStyle = OL; x.stroke();
  x.lineWidth = 10;
  const open = Math.max(mouth, { shock: 0.7, shout: 0.85, hit: 0.6, worried: 0.25 }[expr] || 0);
  if (open > 0.05) {
    const mw = expr === 'grin' ? 70 : 52, mh = 10 + 46 * open;
    x.beginPath();
    if (expr === 'grin' || expr === 'smug') { x.moveTo(385 - mw, 478); x.quadraticCurveTo(385, 488, 385 + mw, 474); x.quadraticCurveTo(385 + mw * 0.7, 480 + mh * 1.2, 385, 482 + mh * 1.2); x.quadraticCurveTo(385 - mw * 0.8, 480 + mh, 385 - mw, 478); }
    else if (expr === 'worried' || expr === 'sad') { x.moveTo(330, 500 + mh * 0.3); x.quadraticCurveTo(385, 470 - mh * 0.4, 440, 500 + mh * 0.3); x.quadraticCurveTo(385, 500 + mh * 0.6, 330, 500 + mh * 0.3); }
    else x.ellipse(385, 492, mw * 0.72, mh * 0.85, 0, 0, 7);
    x.save(); fs(x, '#5a1f2a', 10); x.clip();
    x.beginPath(); x.ellipse(385, 504 + mh, mw * 0.6, mh * 0.6, 0, 0, 7); x.fillStyle = '#ef7b8b'; x.fill();
    x.restore();
  } else if (expr === 'sad') { x.beginPath(); x.moveTo(345, 498); x.quadraticCurveTo(385, 474, 425, 498); x.stroke(); }
  else if (expr === 'grin') { x.beginPath(); x.moveTo(318, 470); x.quadraticCurveTo(385, 530, 452, 466); x.stroke(); }
  else if (expr === 'yuck') { x.beginPath(); x.moveTo(320, 492); for (let k = 1; k <= 6; k++) x.lineTo(320 + k * 22, k % 2 ? 474 : 498); x.stroke(); x.beginPath(); x.ellipse(400, 510, 22, 26, 0, 0, Math.PI); x.fillStyle = '#ef7b8b'; x.fill(); x.lineWidth = 8; x.stroke(); }
  else if (expr === 'calm') { x.beginPath(); x.moveTo(345, 488); x.quadraticCurveTo(385, 496, 425, 486); x.stroke(); }
  else { x.beginPath(); x.moveTo(330, 486); x.quadraticCurveTo(370, 498, 415, 486); x.quadraticCurveTo(440, 478, 452, 462); x.stroke(); }
  if (L.clown) { x.beginPath(); x.moveTo(296, 474); x.quadraticCurveTo(385, 566, 474, 470); x.quadraticCurveTo(512, 450, 530, 400); x.moveTo(296, 474); x.quadraticCurveTo(258, 452, 240, 404); x.lineWidth = 15; x.strokeStyle = '#c42a3a'; x.lineCap = 'round'; x.stroke(); }
  if (L.cigarette) { x.save(); x.translate(440, 500); x.rotate(0.25); rrect(x, 0, -9, 90, 18, 6); fs(x, '#ffffff', 6); x.fillStyle = '#ff7a2e'; x.fillRect(80, -7, 10, 14); x.restore(); x.lineWidth = 6; x.strokeStyle = 'rgba(220,220,230,0.8)'; x.beginPath(); x.moveTo(530, 520); x.quadraticCurveTo(560, 470, 540, 430); x.quadraticCurveTo(520, 390, 550, 350); x.stroke(); }
  if (L.grinWide) { x.beginPath(); x.moveTo(290, 470); x.quadraticCurveTo(385, 575, 480, 470); x.quadraticCurveTo(385, 500, 290, 470); fs(x, '#ffffff', 9); x.lineWidth = 4; x.strokeStyle = OL; for (const tx of [330, 360, 390, 420, 450]) { x.beginPath(); x.moveTo(tx, 482); x.lineTo(tx, 515 - Math.abs(tx - 390) * 0.3); x.stroke(); } }
  if (L.stache2) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(385, 462); x.quadraticCurveTo(385 + sd * 60, 448, 385 + sd * 92, 470); x.quadraticCurveTo(385 + sd * 110, 486, 385 + sd * 96, 494); x.lineWidth = 14; x.strokeStyle = '#3a2a20'; x.lineCap = 'round'; x.stroke(); } }
  if (L.stache) { for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380, 444);
    x.quadraticCurveTo(380 + sd * 170, 432, 380 + sd * 285, 280); x.quadraticCurveTo(380 + sd * 230, 476, 380, 480); x.closePath(); fs(x, '#ffffff', 9); } }
  if (L.freckles) { x.fillStyle = '#b8683e'; for (const cx of [262, 498]) for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(cx - 26 + (i % 3) * 24 + (i > 2 ? 12 : 0), 432 + (i > 2 ? 18 : 0), 5, 0, 7); x.fill(); } }
  // ---- hair ----
  x.beginPath();
  if (L.hairStyle === 'messy') {
    x.moveTo(156, 350); x.bezierCurveTo(130, 230, 150, 160, 190, 130);
    const tufts = [[170, 95], [230, 120], [250, 55], [310, 100], [350, 30], [400, 92], [460, 40], [490, 105], [560, 70], [555, 140], [620, 150]];
    for (const [tx, ty] of tufts) x.lineTo(tx, ty);
    x.bezierCurveTo(630, 220, 612, 300, 604, 350); x.lineTo(586, 340); x.lineTo(575, 250);
    // fringe falling over the forehead in spikes
    [[540, 290], [520, 225], [470, 285], [445, 220], [395, 300], [370, 222], [320, 280], [300, 222], [250, 270], [235, 230], [190, 290], [176, 345]].forEach(([fx, fy]) => x.lineTo(fx, fy));
    x.closePath();
  } else if (L.hairStyle === 'wavy') {
    x.moveTo(150, 360); x.bezierCurveTo(110, 70, 650, 70, 610, 360);
    for (let i = 0; i <= 8; i++) x.lineTo(600 - i * 55, i % 2 ? 300 : 240);
    x.closePath();
  } else if (L.hairStyle === 'curly' || L.hairStyle === 'long') {
    x.moveTo(140, 380); x.bezierCurveTo(100, 70, 660, 70, 620, 380); x.quadraticCurveTo(600, 300, 560, 250);
    x.quadraticCurveTo(450, 250, 380, 225); x.quadraticCurveTo(300, 255, 210, 250); x.quadraticCurveTo(170, 300, 140, 380); x.closePath();
  } else if (L.hairStyle === 'short') {
    x.moveTo(170, 330); x.bezierCurveTo(150, 110, 610, 110, 590, 330); x.quadraticCurveTo(560, 230, 470, 215); x.quadraticCurveTo(380, 200, 290, 220); x.quadraticCurveTo(200, 240, 170, 330); x.closePath();
  } else if (L.hairStyle === 'mohawk') {
    x.moveTo(330, 300); [[318, 220], [300, 120], [345, 150], [350, 40], [395, 120], [420, 30], [440, 140], [490, 90], [458, 220], [430, 300]].forEach(([mx, my]) => x.lineTo(mx, my)); x.closePath();
  } else if (L.hairStyle === 'bob') { // jaw-length bob with straight bangs
    x.moveTo(130, 520); x.bezierCurveTo(70, 60, 690, 60, 630, 520); x.lineTo(560, 520); x.lineTo(578, 300); x.lineTo(182, 300); x.lineTo(200, 520); x.closePath();
  } else if (L.hairStyle === 'topknot') { // slicked-back hair with a topknot
    x.moveTo(170, 300); x.bezierCurveTo(160, 110, 600, 110, 590, 300); x.quadraticCurveTo(380, 230, 170, 300); x.closePath();
    x.moveTo(330, 130); x.quadraticCurveTo(300, 40, 380, 30); x.quadraticCurveTo(460, 40, 430, 130); x.closePath();
  } else if (L.hairStyle === 'bun') { // long hair pulled into a tall bun
    x.moveTo(150, 380); x.bezierCurveTo(100, 70, 660, 70, 610, 380); x.quadraticCurveTo(560, 230, 380, 210); x.quadraticCurveTo(200, 230, 150, 380); x.closePath();
    x.moveTo(250, 120); x.bezierCurveTo(200, -60, 560, -60, 510, 120); x.closePath();
  } else if (L.hairStyle === 'sideSweep') { // blond hair swept over one eye
    x.moveTo(160, 330); x.bezierCurveTo(140, 90, 620, 90, 600, 330); x.lineTo(590, 470); x.quadraticCurveTo(470, 440, 400, 300); x.quadraticCurveTo(300, 250, 200, 300); x.closePath();
  } else if (L.hairStyle === 'pompadour') { // big blue pompadour
    x.moveTo(170, 300); x.bezierCurveTo(130, 120, 260, 60, 330, 80); x.bezierCurveTo(420, -40, 720, 0, 640, 150); x.quadraticCurveTo(600, 230, 590, 300); x.quadraticCurveTo(380, 210, 170, 300); x.closePath();
  } else if (L.hairStyle === 'wild') { // long messy hair down to the shoulders
    x.moveTo(130, 560); x.lineTo(110, 380); x.bezierCurveTo(60, 60, 700, 60, 650, 380); x.lineTo(640, 560); x.lineTo(590, 470); x.lineTo(580, 300); x.quadraticCurveTo(380, 200, 180, 300); x.lineTo(170, 470); x.closePath();
  } else if (L.hairStyle === 'spikyLong') { // tall spiky hair flaring up and back
    x.moveTo(150, 360); [[120, 240], [60, 160], [170, 170], [140, 60], [250, 120], [270, 10], [350, 100], [400, -10], [450, 100], [530, 20], [540, 130], [640, 80], [600, 190], [700, 200], [610, 280], [610, 360]].forEach(([a, b]) => x.lineTo(a, b));
    x.quadraticCurveTo(470, 250, 380, 240); x.quadraticCurveTo(270, 250, 150, 360); x.closePath();
  } else if (L.hairStyle === 'pineapple') { // short sides with a tall tuft on top
    x.moveTo(175, 320); x.bezierCurveTo(170, 190, 260, 170, 330, 175); [[300, 110], [345, 130], [350, 40], [395, 120], [430, 50], [440, 140], [490, 100], [470, 180]].forEach(([a, b]) => x.lineTo(a, b));
    x.bezierCurveTo(560, 180, 600, 230, 588, 320); x.quadraticCurveTo(380, 240, 175, 320); x.closePath();
  } else if (L.hairStyle === 'curlyBig') { // huge curly hair cloud
    x.moveTo(120, 520); for (let i = 0; i <= 22; i++) { const a = Math.PI * (0.85 + i / 22 * 1.3), r = 320 + (i % 2 ? 30 : -10); x.lineTo(380 + Math.cos(a) * r, 300 + Math.sin(a) * r * 0.9); }
    x.lineTo(640, 520); x.lineTo(580, 520); x.quadraticCurveTo(600, 250, 470, 220); x.quadraticCurveTo(380, 250, 300, 220); x.quadraticCurveTo(170, 260, 180, 520); x.closePath();
  } else if (L.hairStyle === 'crest') { // tall crest of hair sweeping straight up
    x.moveTo(250, 260); x.quadraticCurveTo(230, 40, 340, -120); x.quadraticCurveTo(420, -60, 520, -150); x.quadraticCurveTo(560, 60, 510, 260); x.quadraticCurveTo(380, 210, 250, 260); x.closePath();
  } else if (L.hairStyle === 'bald') { x.moveTo(380, 330);
  } else { // bandana
    x.moveTo(160, 300); x.bezierCurveTo(150, 100, 610, 100, 600, 300); x.quadraticCurveTo(380, 250, 160, 300); x.closePath();
  }
  fs(x, L.hairStyle === 'bandana' ? (L.bandana || '#7b3fb5') : L.hair, 12);
  if (L.hairStyle === 'curlyBig') { x.lineWidth = 6; x.strokeStyle = L.hairL; for (let i = 0; i < 40; i++) { const a = Math.PI * (0.9 + (i % 20) / 20 * 1.2), r = i < 20 ? 280 : 200; x.beginPath(); x.arc(380 + Math.cos(a) * r, 300 + Math.sin(a) * r * 0.9, 18, 0, 5); x.stroke(); } }
  if (L.hairStyle === 'bald') { x.beginPath(); x.arc(300, 190, 40, Math.PI * 1.1, Math.PI * 1.6); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke(); }
  if (L.hairStyle === 'bandana' && !L.bandana) { x.fillStyle = '#fff'; for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(220 + (i % 5) * 80 + (i > 4 ? 40 : 0), 190 + (i > 4 ? 45 : 0), 9, 0, 7); x.fill(); }
    x.beginPath(); x.moveTo(600, 260); x.lineTo(690, 230); x.lineTo(670, 300); x.closePath(); fs(x, '#7b3fb5', 10); }
  if (L.hairStyle === 'bandana' && L.bandana) { x.beginPath(); x.moveTo(600, 260); x.lineTo(700, 250); x.lineTo(660, 320); x.closePath(); fs(x, L.bandana, 10); }
  x.lineWidth = 8; x.strokeStyle = L.hairL;
  if (!['bandana', 'bald', 'mohawk', 'short'].includes(L.hairStyle)) { x.beginPath(); x.moveTo(250, 150); x.quadraticCurveTo(330, 110, 420, 125); x.stroke(); x.beginPath(); x.moveTo(470, 140); x.quadraticCurveTo(530, 160, 560, 210); x.stroke(); }
  // thin white rim light along the upper-left edge
  if (!L.hat) { x.beginPath(); x.ellipse(380, 330, 226, 215, 0, Math.PI * 1.06, Math.PI * 1.48); x.lineWidth = 9; x.strokeStyle = '#fff'; x.stroke(); }
  if (L.hat === 'hardhat') {
    x.beginPath(); x.moveTo(170, 270); x.bezierCurveTo(170, 40, 590, 40, 590, 270); x.closePath(); fs(x, '#ffcf2e', 12); rrect(x, 140, 250, 480, 46, 20); fs(x, '#f2b705', 11);
    x.beginPath(); x.moveTo(380, 70); x.lineTo(380, 250); x.lineWidth = 26; x.strokeStyle = '#f2b705'; x.stroke(); x.beginPath(); x.arc(380, 160, 210, Math.PI * 1.15, Math.PI * 1.4); x.lineWidth = 9; x.strokeStyle = 'rgba(255,255,255,0.7)'; x.stroke();
  }
  if (L.hat === 'tricorn') {
    x.beginPath(); x.moveTo(110, 260); x.quadraticCurveTo(380, 330, 650, 260); x.quadraticCurveTo(600, 120, 520, 140); x.quadraticCurveTo(380, -40, 240, 140); x.quadraticCurveTo(160, 120, 110, 260); x.closePath(); fs(x, '#22202a', 12);
    x.beginPath(); x.moveTo(140, 250); x.quadraticCurveTo(380, 310, 620, 250); x.lineWidth = 12; x.strokeStyle = '#d9b44a'; x.stroke();
    x.beginPath(); x.arc(380, 175, 34, 0, 7); fs(x, '#f4f4f4', 7); x.fillStyle = OL; for (const ex of [367, 393]) { x.beginPath(); x.arc(ex, 172, 7, 0, 7); x.fill(); }
  }
  if (L.hairpins) for (const [px, py, r] of [[260, 40, -0.6], [500, 40, 0.6]]) { x.save(); x.translate(px, py); x.rotate(r); rrect(x, -8, -90, 16, 140, 6); fs(x, '#d9b44a', 5); x.beginPath(); x.arc(0, -96, 20, 0, 7); fs(x, '#e8303c', 5); x.restore(); }
  if (L.kiseru) { x.save(); x.translate(430, 500); x.rotate(0.35); rrect(x, 0, -7, 200, 14, 6); fs(x, '#3a2a20', 5); rrect(x, 190, -22, 30, 30, 6); fs(x, '#d9b44a', 5); x.restore(); }
  if (L.curlyBrow) { x.beginPath(); x.arc(300, 270, 16, 0, Math.PI * 1.6); x.lineWidth = 8; x.strokeStyle = '#c99a2e'; x.stroke(); }
  if (L.ninjaMask) { x.beginPath(); x.moveTo(170, 400); x.quadraticCurveTo(380, 380, 590, 400); x.bezierCurveTo(580, 520, 500, 580, 380, 586); x.bezierCurveTo(260, 580, 180, 520, 170, 400); x.closePath(); fs(x, '#2a2a36', 10); }
  if (L.faceScar) { x.beginPath(); x.moveTo(190, 250); x.lineTo(330, 470); x.lineWidth = 16; x.strokeStyle = '#a0603e'; x.lineCap = 'round'; x.stroke(); for (const k of [0.3, 0.55, 0.8]) { const px = 190 + 140 * k, py = 250 + 220 * k; x.beginPath(); x.moveTo(px - 18, py + 10); x.lineTo(px + 18, py - 10); x.lineWidth = 7; x.stroke(); } }
  if (L.eyeLines) { x.lineWidth = 8; x.strokeStyle = '#1b1530'; for (const ex of [285, 475]) for (let k = -1; k <= 1; k++) { x.beginPath(); x.moveTo(ex + k * 22, 250); x.lineTo(ex + k * 22, 300); x.stroke(); } }
  if (L.crossNecklace) { x.fillStyle = '#5a2a20'; x.fillRect(372, 610, 16, 44); x.fillRect(360, 622, 40, 14); }
  if (L.sharpTeeth) { x.beginPath(); x.moveTo(300, 470); x.quadraticCurveTo(385, 560, 470, 470); x.closePath(); fs(x, '#ffffff', 8); x.lineWidth = 4; x.strokeStyle = OL; x.beginPath(); for (let i = 0; i < 7; i++) { const tx = 310 + i * 25; x.moveTo(tx, 476); x.lineTo(tx + 12, 500); x.lineTo(tx + 25, 476); } x.stroke(); }
  if (L.piercings) { x.fillStyle = '#d9dce6'; for (const [px, py] of [[160, 360], [165, 395], [600, 360], [400, 455]]) { x.beginPath(); x.arc(px, py, 9, 0, 7); x.fill(); x.lineWidth = 3; x.strokeStyle = OL; x.stroke(); } }
  if (L.clownNose) { x.beginPath(); x.arc(390, 430, 52, 0, 7); fs(x, '#e8302e', 9); x.beginPath(); x.arc(372, 412, 14, 0, 7); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fill(); }
  if (L.lips) { x.beginPath(); x.ellipse(385, 488, 34, 12, 0, 0, 7); x.fillStyle = '#d6303e'; x.fill(); }
  if (L.hat === 'killerMask') { // round striped mask covering the whole face, with breathing holes
    x.beginPath(); x.ellipse(380, 330, 225, 240, 0, 0, 7); fs(x, '#f4f4f8', 12); x.save(); x.clip(); x.fillStyle = '#3f6fb5'; for (let k = -3; k < 4; k++) x.fillRect(360 + k * 90, 60, 44, 600); x.restore();
    x.beginPath(); x.ellipse(380, 330, 225, 240, 0, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); x.fillStyle = OL; for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) { x.beginPath(); x.arc(300 + k * 54, 420 + r * 40, 9, 0, 7); x.fill(); }
  }
  if (L.goggles) { x.beginPath(); x.moveTo(160, 230); x.quadraticCurveTo(380, 170, 600, 230); x.lineWidth = 22; x.strokeStyle = '#5a3a26'; x.stroke(); for (const gx of [300, 460]) { x.beginPath(); x.arc(gx, 205, 46, 0, 7); fs(x, '#7fe0a0', 10); x.beginPath(); x.arc(gx - 12, 192, 10, 0, 7); x.fillStyle = '#fff'; x.fill(); } }
  if (L.longNose) { x.save(); x.translate(390, 430); x.rotate(-0.08); rrect(x, -10, -20, 230, 40, 20); fs(x, L.skin, 9); x.restore(); }
  if (L.hat === 'souwester') { x.beginPath(); x.ellipse(380, 210, 320, 70, 0, 0, Math.PI); x.lineTo(60, 210); x.bezierCurveTo(140, 0, 620, 0, 700, 210); x.closePath(); fs(x, '#ffcf2e', 12); }
  if (L.hat === 'viking') { x.beginPath(); x.moveTo(170, 290); x.bezierCurveTo(170, 60, 590, 60, 590, 290); x.closePath(); fs(x, '#9aa0b0', 12); rrect(x, 160, 250, 440, 50, 20); fs(x, '#c9a64a', 10);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 190, 200); x.quadraticCurveTo(380 + sd * 330, 160, 380 + sd * 320, 20); x.quadraticCurveTo(380 + sd * 280, 130, 380 + sd * 170, 140); x.closePath(); fs(x, '#f4ead2', 9); } }
  if (L.hat === 'luchador') { x.beginPath(); x.moveTo(168, 330); x.bezierCurveTo(168, 90, 592, 90, 592, 330); x.bezierCurveTo(592, 470, 520, 520, 380, 520); x.bezierCurveTo(240, 520, 168, 470, 168, 330); x.closePath(); fs(x, '#e8402e', 12);
    for (const ex of [285, 475]) { x.beginPath(); x.ellipse(ex, 360, 80, 62, 0, 0, 7); fs(x, '#ffcf3a', 8); x.beginPath(); x.ellipse(ex, 360, 56, 42, 0, 0, 7); x.fillStyle = '#fff'; x.fill(); x.beginPath(); x.arc(ex, 362, 18, 0, 7); x.fillStyle = OL; x.fill(); }
    x.beginPath(); x.moveTo(380, 120); x.lineTo(330, 250); x.lineTo(430, 250); x.closePath(); fs(x, '#ffcf3a', 6); }
  if (L.hat === 'knightHelm') { x.beginPath(); x.moveTo(160, 520); x.bezierCurveTo(130, 40, 630, 40, 600, 520); x.closePath(); fs(x, '#b8bcc8', 12); x.fillStyle = '#2a2a36'; x.fillRect(220, 340, 320, 40); for (let k = 0; k < 6; k++) x.fillRect(250 + k * 50, 400, 20, 80);
    x.beginPath(); x.moveTo(380, 60); x.quadraticCurveTo(470, -40, 520, 40); x.lineWidth = 30; x.strokeStyle = '#e8402e'; x.lineCap = 'round'; x.stroke(); }
  if (L.hat === 'holyHood') { x.beginPath(); x.moveTo(130, 560); x.bezierCurveTo(60, -60, 700, -60, 630, 560); x.lineTo(560, 560); x.bezierCurveTo(600, 200, 160, 200, 200, 560); x.closePath(); fs(x, '#f4f0e6', 12);
    x.beginPath(); x.moveTo(200, 560); x.bezierCurveTo(160, 200, 600, 200, 560, 560); x.closePath(); x.fillStyle = 'rgba(20,16,30,0.55)'; x.fill(); x.lineWidth = 10; x.strokeStyle = '#d9b44a'; x.beginPath(); x.moveTo(140, 520); x.bezierCurveTo(80, -20, 680, -20, 620, 520); x.stroke(); }
  if (L.hat === 'kasa') { x.beginPath(); x.moveTo(60, 230); x.lineTo(380, 20); x.lineTo(700, 230); x.quadraticCurveTo(380, 280, 60, 230); x.closePath(); fs(x, '#d9b46a', 12); x.strokeStyle = 'rgba(120,80,30,0.5)'; x.lineWidth = 5; for (let k = -4; k <= 4; k++) { x.beginPath(); x.moveTo(380, 30); x.lineTo(380 + k * 75, 240); x.stroke(); } }
  if (L.hat === 'beanie') {
    x.beginPath(); x.moveTo(180, 300); x.bezierCurveTo(170, 60, 590, 60, 580, 300); x.closePath(); fs(x, '#c0392b', 12); rrect(x, 165, 250, 430, 70, 24); fs(x, '#962a1f', 11); x.beginPath(); x.arc(380, 70, 40, 0, 7); fs(x, '#f4f4f8', 9);
  } else if (L.hat === 'chef') {
    rrect(x, 250, 120, 260, 90, 16); fs(x, '#ffffff', 12);
    x.beginPath(); x.arc(290, 70, 70, 0, 7); x.arc(380, 30, 85, 0, 7); x.arc(470, 70, 70, 0, 7); fs(x, '#ffffff', 12);
    x.beginPath(); x.rect(262, 92, 236, 110); x.fillStyle = '#ffffff'; x.fill();
  } else if (L.hat === 'hood') {
    // smooth black hood, blond hair framing the face, a few feather tufts where the hood meets the cheeks
    if (L.fringe) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 230); x.quadraticCurveTo(380 + sd * 250, 300, 380 + sd * 230, 470); x.lineTo(380 + sd * 205, 440); x.lineTo(380 + sd * 190, 480); x.quadraticCurveTo(380 + sd * 190, 330, 380 + sd * 120, 250); x.closePath(); fs(x, L.hair, 10); }
    x.beginPath(); x.moveTo(140, 470); x.bezierCurveTo(100, 0, 660, 0, 620, 470); x.lineTo(588, 470); x.bezierCurveTo(600, 170, 160, 170, 172, 470); x.closePath(); fs(x, L.hoodColor || '#1f1c26', 12);
    x.beginPath(); x.arc(380, 330, 250, Math.PI * 1.15, Math.PI * 1.42); x.lineWidth = 9; x.strokeStyle = 'rgba(255,255,255,0.5)'; x.stroke();
    if (L.fringe) { x.beginPath(); x.moveTo(192, 330); x.quadraticCurveTo(380, 160, 568, 330);
      [[540, 278], [505, 312], [468, 262], [428, 308], [385, 258], [342, 306], [300, 262], [258, 310], [222, 276]].forEach(([fx, fy]) => x.lineTo(fx, fy)); x.closePath(); fs(x, L.hair, 9);
      x.lineWidth = 6; x.strokeStyle = L.hairL; x.beginPath(); x.moveTo(320, 225); x.lineTo(332, 268); x.moveTo(440, 225); x.lineTo(448, 268); x.stroke(); }
    if (!L.hoodColor) for (const [fx, fy, r] of [[150, 450, 0.3], [170, 500, -0.2], [610, 450, -0.3], [590, 500, 0.2]]) { x.beginPath(); x.ellipse(fx, fy, 26, 44, r, 0, 7); fs(x, '#141119', 6); }
  } else if (L.hat === 'fluffy') {
    x.beginPath(); x.ellipse(380, 210, 250, 150, 0, Math.PI, 0); x.lineTo(630, 260); x.quadraticCurveTo(380, 300, 130, 260); x.closePath(); fs(x, '#f6f2ea', 12);
    x.fillStyle = '#8a5a3c'; for (const [hx, hy] of [[280, 150], [400, 110], [500, 190], [330, 230], [560, 240], [210, 230]]) { x.beginPath(); x.ellipse(hx, hy, 26, 18, 0.3, 0, 7); x.fill(); }
    x.beginPath(); x.rect(140, 236, 480, 34); fs(x, '#f6f2ea', 10);
  } else if (L.hat === 'straw') {
    x.beginPath(); x.ellipse(380, 190, 320, 64, -0.04, 0, 7); fs(x, '#f2c94c', 12);
    x.beginPath(); x.moveTo(236, 192); x.bezierCurveTo(236, 50, 524, 50, 524, 192); x.quadraticCurveTo(380, 214, 236, 192); fs(x, '#f6d466', 12);
    x.beginPath(); x.moveTo(242, 168); x.quadraticCurveTo(380, 196, 518, 168); x.lineWidth = 26; x.strokeStyle = '#c0392b'; x.stroke();
    x.lineWidth = 4; x.strokeStyle = 'rgba(150,110,30,0.5)'; for (let k = 0; k < 6; k++) { x.beginPath(); x.ellipse(380, 190, 300 - k * 40, 58 - k * 7, -0.04, 0.2, 2.9); x.stroke(); }
  } else if (L.hat === 'cowboy') {
    x.beginPath(); x.ellipse(380, 175, 330, 60, -0.05, 0, 7); fs(x, '#e8822e', 12);
    x.beginPath(); x.moveTo(230, 175); x.bezierCurveTo(230, 20, 530, 20, 530, 175); x.quadraticCurveTo(380, 200, 230, 175); fs(x, '#f19a3f', 12);
    x.beginPath(); x.moveTo(236, 150); x.quadraticCurveTo(380, 175, 524, 150); x.lineWidth = 22; x.strokeStyle = '#c0392b'; x.stroke();
    for (let i = 0; i < 7; i++) { x.beginPath(); x.arc(250 + i * 45, 152 + Math.sin(i / 6 * Math.PI) * 10, 9, 0, 7); fs(x, '#ffd34d', 4); }
  } else if (L.hat === 'top') {
    x.beginPath(); x.ellipse(380, 165, 250, 46, 0.04, 0, 7); fs(x, '#26232b', 12);
    rrect(x, 255, -60, 250, 225, 18); fs(x, '#2e2a35', 12);
    x.fillStyle = '#4b6db2'; x.fillRect(262, 115, 236, 30);
    for (const gx of [330, 430]) { x.beginPath(); x.arc(gx, 62, 34, 0, 7); fs(x, '#9bd6ff', 10); x.beginPath(); x.arc(gx - 10, 52, 9, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    x.beginPath(); x.moveTo(364, 62); x.lineTo(396, 62); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  }
  drawArms(x, L, pose);
  if (L.shoulderPad) shoulderPad(x);
  if (L.armArmor) { x.save(); x.translate(510, 700); x.beginPath(); x.ellipse(0, -10, 80, 70, 0, Math.PI, 0); x.lineTo(80, 30); x.lineTo(-80, 30); x.closePath(); fs(x, '#c8287a', 10); x.beginPath(); x.arc(-10, -40, 16, 0, 7); x.fillStyle = 'rgba(255,255,255,0.7)'; x.fill();
    for (let i = 0; i < 4; i++) { rrect(x, -40, 40 + i * 42, 80, 34, 8); fs(x, '#2a2a30', 6); x.fillStyle = '#d9dce6'; for (let k = 0; k < 3; k++) { x.beginPath(); x.arc(-20 + k * 20, 57 + i * 42, 4, 0, 7); x.fill(); } } x.restore(); }
  return c;
}

// ======================= props =======================
export function mug(x, cx, cy, s = 1, t = 0, steam = true, hand = true) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (steam) { x.lineWidth = 10; x.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.strokeStyle = `rgba(255,255,255,${0.75 * (1 - ph)})`; x.beginPath();
    for (let k = 0; k <= 10; k++) { const yy = -90 - k * 10 - ph * 60; x.lineTo(-25 + i * 25 + Math.sin(k * 0.7 + t * 4 + i) * 10, yy); } x.stroke(); } }
  x.beginPath(); x.arc(62, 0, 34, -Math.PI / 2, Math.PI / 2); x.lineWidth = 26; x.strokeStyle = OL; x.stroke(); x.lineWidth = 12; x.strokeStyle = '#ff7eb3'; x.stroke();
  rrect(x, -62, -78, 124, 150, 22); fs(x, '#ff7eb3', 11);
  x.beginPath(); x.ellipse(0, -76, 58, 14, 0, 0, 7); fs(x, '#5a3524', 8);
  x.beginPath(); x.moveTo(-44, -50); x.lineTo(-44, 40); x.lineWidth = 9; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
  if (hand) { x.beginPath(); x.ellipse(-58, 10, 34, 46, 0.2, 0, 7); fs(x, '#f6c690', 10);
  x.lineWidth = 6; x.strokeStyle = OL; for (const yy of [-6, 18]) { x.beginPath(); x.moveTo(-40, yy); x.quadraticCurveTo(-28, yy + 6, -40, yy + 14); x.stroke(); } }
  x.restore();
}

export function fist(x, cx, cy, s = 1, sleeve = '#22a99a', rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  rrect(x, -230, -78, 160, 156, 34); fs(x, sleeve, 12);
  x.beginPath(); x.moveTo(-80, -70); x.lineTo(-80, 70); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(0, 0, 98, 84, 0, 0, 7); fs(x, '#f6c690', 12);
  x.lineWidth = 9; x.strokeStyle = OL;
  for (const yy of [-40, 0, 40]) { x.beginPath(); x.moveTo(42, yy - 20); x.quadraticCurveTo(98, yy, 42, yy + 20); x.stroke(); }
  x.beginPath(); x.moveTo(-40, -62); x.quadraticCurveTo(10, -30, 32, -72); x.stroke();
  x.restore();
}
export function openHand(x, cx, cy, s = 1, sleeve = '#22a99a') {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  rrect(x, -70, 110, 140, 200, 34); fs(x, sleeve, 12);
  x.beginPath(); x.ellipse(0, 50, 92, 86, 0, 0, 7); fs(x, '#f6c690', 12);
  [[-70, -10, -0.5], [-30, -50, -0.15], [15, -58, 0.05], [58, -40, 0.3]].forEach(([fx, fy, r]) => { x.save(); x.translate(fx, fy + 20); x.rotate(r); rrect(x, -20, -70, 40, 100, 20); fs(x, '#f6c690', 10); x.restore(); });
  x.beginPath(); x.ellipse(0, 50, 80, 72, 0, 0.1, Math.PI - 0.1); x.fillStyle = '#f6c690'; x.fill();
  x.save(); x.translate(88, 60); x.rotate(0.7); rrect(x, -18, -55, 36, 80, 18); fs(x, '#f6c690', 10); x.restore();
  x.restore();
}
export function sword(x, cx, cy, rot, s = 1, haki = false) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s);
  if (haki) { x.shadowColor = '#b07cff'; x.shadowBlur = 40; }
  x.beginPath(); x.moveTo(-40, -18); x.lineTo(280, -18); x.lineTo(330, 0); x.lineTo(280, 18); x.lineTo(-40, 18); x.closePath(); fs(x, haki ? '#1d1630' : '#e7eef6', 10);
  x.shadowBlur = 0;
  x.beginPath(); x.moveTo(-10, -5); x.lineTo(268, -5); x.lineWidth = 5; x.strokeStyle = haki ? '#7a5cff' : '#fff'; x.stroke();
  rrect(x, -62, -52, 24, 104, 8); fs(x, '#c99a2e', 9);
  rrect(x, -160, -15, 100, 30, 10); fs(x, '#4a2c3a', 9);
  x.restore();
}
export function bullet(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.beginPath(); x.moveTo(-40, -16); x.lineTo(10, -16); x.quadraticCurveTo(50, 0, 10, 16); x.lineTo(-40, 16); x.closePath(); fs(x, '#e0b04a', 9);
  x.strokeStyle = 'rgba(255,255,255,0.8)'; x.lineWidth = 6; for (let i = 1; i <= 3; i++) { x.beginPath(); x.moveTo(-50 - i * 34, -10 + i * 5); x.lineTo(-74 - i * 34, -10 + i * 5); x.stroke(); }
  x.restore();
}
export function trophy(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  for (const d of [-1, 1]) { x.beginPath(); x.arc(d * 120, -40, 50, d < 0 ? Math.PI * 0.5 : -Math.PI * 0.5, d < 0 ? Math.PI * 1.5 : Math.PI * 0.5); x.lineWidth = 16; x.strokeStyle = OL; x.stroke(); x.lineWidth = 8; x.strokeStyle = '#ffd34d'; x.stroke(); }
  x.beginPath(); x.moveTo(-130, -110); x.lineTo(130, -110); x.quadraticCurveTo(130, 60, 0, 80); x.quadraticCurveTo(-130, 60, -130, -110); x.closePath(); fs(x, '#ffc93a', 12);
  rrect(x, -30, 75, 60, 60, 6); fs(x, '#e0a52a', 10); rrect(x, -90, 130, 180, 46, 12); fs(x, '#8a5a3c', 10);
  x.fillStyle = 'rgba(255,255,255,0.5)'; x.beginPath(); x.ellipse(-70, -40, 16, 50, 0, 0, 7); x.fill();
  x.restore();
}
export function floatie(x, cx, cy, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s);
  x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.ellipse(0, -10, 190, 58, 0, 0, 7, true); fs(x, '#ffe14d', 12);
  x.save(); x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.clip(); x.fillStyle = '#ff5fa2';
  for (const a of [0.3, 1.4, 2.4, 3.5, 4.6, 5.6]) { x.beginPath(); x.moveTo(0, -10); x.arc(0, -10, 400, a, a + 0.45); x.closePath(); x.fill(); } x.restore();
  x.beginPath(); x.ellipse(0, -10, 190, 58, 0, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(0, 0, 330, 120, 0, 0, 7); x.stroke();
  x.restore();
}

// ======================= effects =======================
export function flame(x, cx, by, w, h, t, seed = 0, alpha = 1, palette = ['#e2361f', '#ff8a1d', '#ffd84a']) {
  const wob = (k) => Math.sin(t * (7 + seed % 3) + seed * 1.7 + k) * 0.12;
  x.save(); x.globalAlpha *= alpha;
  palette.forEach((col, li) => {
    const s = [1, 0.72, 0.42][li], ww = w * s, hh = h * s * (1 + wob(li) * 0.8), tipx = cx + Math.sin(t * 5 + seed) * w * 0.25 * s;
    x.beginPath(); x.moveTo(cx - ww / 2, by);
    x.bezierCurveTo(cx - ww * 0.7, by - hh * 0.45, cx - ww * (0.15 - wob(1)), by - hh * 0.65, tipx, by - hh);
    x.bezierCurveTo(cx + ww * (0.2 + wob(2)), by - hh * 0.6, cx + ww * 0.75, by - hh * 0.4, cx + ww / 2, by);
    x.quadraticCurveTo(cx, by + ww * 0.35, cx - ww / 2, by); x.closePath();
    x.fillStyle = col; x.fill();
    if (li === 0) { x.lineWidth = Math.max(4, w * 0.06); x.strokeStyle = OL; x.lineJoin = 'round'; x.stroke(); }
  });
  x.restore();
}
export function glow(x, cx, cy, r, rgb, a = 1) {
  if (r <= 0) return;
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fill();
}
// yellow shine / motion lines radiating around a powered part
export function shineLines(x, cx, cy, r0, r1, t, n = 10, col = '#ffe14d') {
  x.save(); x.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + hash(i) * 0.4, ph = (t * 2.2 + hash(i + 9)) % 1;
    const a0 = r0 + (r1 - r0) * ph * 0.5, a1 = a0 + (r1 - r0) * 0.45;
    x.globalAlpha = 1 - ph; x.lineWidth = 16; x.strokeStyle = OL;
    x.beginPath(); x.moveTo(cx + Math.cos(a) * a0, cy + Math.sin(a) * a0); x.lineTo(cx + Math.cos(a) * a1, cy + Math.sin(a) * a1); x.stroke();
    x.lineWidth = 8; x.strokeStyle = col; x.stroke();
  }
  x.restore();
}
export function speedLines(x, cx, cy, t, n = 14, len = 260, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.lineCap = 'round';
  for (let i = 0; i < n; i++) { const ph = (t * 3 + hash(i)) % 1, y = (hash(i + 3) - 0.5) * 360, xx = -ph * 600;
    x.globalAlpha = 0.8 * (1 - ph); x.lineWidth = 7; x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(xx, y); x.lineTo(xx - len * (0.5 + hash(i)), y); x.stroke(); }
  x.restore();
}
// red-orange impact star
export function impactStar(x, cx, cy, r, rot = 0) {
  if (r <= 0) return;
  x.save(); x.translate(cx, cy); x.rotate(rot);
  const star = (rr, k) => { x.beginPath(); for (let i = 0; i < 20; i++) { const a = i / 20 * Math.PI * 2, q = i % 2 ? rr * 0.48 : rr * (0.85 + 0.3 * hash(i + k)); x.lineTo(Math.cos(a) * q, Math.sin(a) * q); } x.closePath(); };
  star(r, 1); fs(x, '#ff4a2d', Math.max(5, r * 0.06)); star(r * 0.62, 2); fs(x, '#ffb02e', 0); star(r * 0.32, 3); fs(x, '#fff3a0', 0);
  x.restore();
}
export function glowRing(x, cx, cy, r, a, col = '255,240,170') {
  if (a <= 0) return;
  x.save(); x.globalAlpha = a; x.lineWidth = 34 * a + 6; x.strokeStyle = `rgba(${col},1)`; x.shadowColor = `rgba(${col},1)`; x.shadowBlur = 40;
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.restore();
}
// emotion marks: '!?' (red + yellow) or '?' (purple)
export function mark(x, kind, cx, cy, s = 1, rot = 0) {
  if (s <= 0) return;
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(s, s); x.font = `150px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  const glyphs = kind === '!?' ? [['!', -34, '#ff3b3b'], ['?', 34, '#ffd23f']] : [['?', 0, '#b07cff']];
  for (const [g, dx, col] of glyphs) { x.lineWidth = 22; x.strokeStyle = OL; x.strokeText(g, dx, 0); x.fillStyle = col; x.fillText(g, dx, 0); }
  x.restore();
}
// pink Japanese sound marks (ゴ) floating in a diagonal stack
export function gogo(x, cx, cy, t, s = 1, n = 3) {
  x.save(); x.font = `bold ${130 * s}px "WenQuanYi Zen Hei", "IPAGothic", sans-serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round';
  for (let i = 0; i < n; i++) { const px = cx + i * 70 * s, py = cy + i * 120 * s + Math.sin(t * 3 + i) * 10;
    x.save(); x.translate(px, py); x.rotate(-0.15 + Math.sin(t * 2 + i) * 0.05); x.scale(1 + 0.06 * Math.sin(t * 6 + i), 1 + 0.06 * Math.sin(t * 6 + i));
    x.lineWidth = 18 * s; x.strokeStyle = OL; x.strokeText('ゴ', 0, 0); x.fillStyle = '#ff6fb0'; x.fillText('ゴ', 0, 0); x.restore(); }
  x.restore();
}
export function sparkle(x, cx, cy, r, col = '#fff') {
  if (r <= 0) return;
  x.save(); x.translate(cx, cy); x.beginPath();
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4, rr = i % 2 ? r * 0.28 : r; x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  x.closePath(); x.fillStyle = col; x.fill(); x.restore();
}
export function dust(x, W, H, t, n = 26, col = '255,255,255') {
  for (let i = 0; i < n; i++) {
    const px = (hash(i) * W + Math.sin(t * 0.4 + i) * 40 + t * 12 * (hash(i + 1) - 0.5) * 4 + W) % W;
    const py = (hash(i + 2) * H - t * (14 + hash(i + 3) * 26) + H * 10) % H;
    x.fillStyle = `rgba(${col},${0.25 + 0.35 * hash(i + 4)})`; x.beginPath(); x.arc(px, py, 3 + hash(i + 5) * 6, 0, 7); x.fill();
  }
}
export function bubble(x, cx, cy, r) { x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 6; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke(); x.beginPath(); x.arc(cx - r * 0.35, cy - r * 0.35, r * 0.22, 0, 7); x.fillStyle = '#fff'; x.fill(); }
export function sweat(x, cx, cy, s = 1) { x.save(); x.translate(cx, cy); x.scale(s, s); x.beginPath(); x.moveTo(0, -40); x.quadraticCurveTo(30, 0, 0, 22); x.quadraticCurveTo(-30, 0, 0, -40); fs(x, '#8fd3ff', 7); x.restore(); }
// a little sun (Flame Emperor)
export function sun(x, cx, cy, r, t) {
  if (r <= 0) return;
  for (let i = 0; i < 16; i++) { const a = i / 16 * 6.283 + t * 0.7; x.save(); x.translate(cx + Math.cos(a) * r * 0.82, cy + Math.sin(a) * r * 0.82); x.rotate(a + Math.PI / 2); flame(x, 0, 0, r * 0.5, r * 0.75, t, i); x.restore(); }
  const g = x.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r); g.addColorStop(0, '#fff6b0'); g.addColorStop(0.5, '#ffc93a'); g.addColorStop(1, '#ff7a1f');
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = g; x.fill(); x.lineWidth = Math.max(6, r * 0.04); x.strokeStyle = OL; x.stroke();
  x.lineWidth = Math.max(4, r * 0.03); x.strokeStyle = 'rgba(230,90,20,0.8)';
  for (let i = 0; i < 4; i++) { x.beginPath(); x.arc(cx, cy, r * (0.35 + i * 0.15), t * (1 + i * 0.3) + i, t * (1 + i * 0.3) + i + 2); x.stroke(); }
  x.beginPath(); x.arc(cx, cy, r * 0.88, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = r * 0.06; x.strokeStyle = 'rgba(255,255,255,0.85)'; x.stroke();
}
export function firefly(x, cx, cy, s, t, i) {
  const tw = 0.75 + 0.25 * Math.sin(t * 9 + i);
  glow(x, cx, cy, 70 * s * tw, '255,170,60', 0.8);
  x.beginPath(); x.arc(cx, cy, 17 * s, 0, 7); x.fillStyle = '#ffd84a'; x.fill(); x.lineWidth = 5; x.strokeStyle = OL; x.stroke();
  sparkle(x, cx + 10 * s, cy - 12 * s, 9 * s * tw);
}
// generic dark fruit silhouette (unnamed, no identifiable design)
export function fruitSilhouette(x, cx, cy, r, k) {
  x.save(); x.translate(cx, cy);
  x.beginPath();
  if (k % 3 === 0) x.arc(0, 0, r, 0, 7);
  else if (k % 3 === 1) x.ellipse(0, 0, r * 0.8, r, 0.3, 0, 7);
  else { x.moveTo(0, -r); x.bezierCurveTo(r * 1.2, -r, r, r, 0, r); x.bezierCurveTo(-r, r, -r * 1.2, -r, 0, -r); }
  fs(x, '#2b2140', 8, '#140f22');
  x.beginPath(); x.moveTo(0, -r * 0.95); x.quadraticCurveTo(r * 0.2, -r * 1.35, r * 0.4, -r * 1.25); x.lineWidth = 10; x.strokeStyle = '#140f22'; x.stroke();
  x.beginPath(); x.arc(-r * 0.2, r * 0.05, r * 0.35, 0.5, 5.5); x.lineWidth = 6; x.strokeStyle = 'rgba(160,130,220,0.35)'; x.stroke();
  x.restore();
}
export function globe(x, cx, cy, r, t) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#3fa7e8'; x.fill(); x.clip();
  x.fillStyle = '#7fd36a';
  for (let i = 0; i < 6; i++) { const lon = ((i / 6 + t * 0.12) % 1) * 2 - 1, px = cx + Math.sin(lon * Math.PI) * r, w = Math.cos(lon * Math.PI) * r * 0.35;
    if (Math.cos(lon * Math.PI) > 0) { x.beginPath(); x.ellipse(px, cy + (hash(i) - 0.5) * r, Math.abs(w), r * (0.2 + hash(i + 1) * 0.2), 0, 0, 7); x.fill(); } }
  x.restore();
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx, cy, r, r * 0.3, 0, 0, 7); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.4)'; x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.85, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = 12; x.strokeStyle = 'rgba(255,255,255,0.8)'; x.stroke();
}

// ======================= HUD pieces =======================
export function drawBanner(text, color = 'pink') {
  const [c0, c1, tail] = BANNER[color], w = 860, h = 240, c = mk(w, h), x = c.getContext('2d');
  x.beginPath(); x.moveTo(40, 70); x.lineTo(130, 80); x.lineTo(130, 190); x.lineTo(50, 205); x.lineTo(75, 140); x.closePath(); fs(x, tail, 10);
  x.beginPath(); x.moveTo(w - 40, 60); x.lineTo(w - 130, 70); x.lineTo(w - 130, 180); x.lineTo(w - 50, 195); x.lineTo(w - 75, 125); x.closePath(); fs(x, tail, 10);
  rrect(x, 100, 45, w - 200, 140, 26); const g = x.createLinearGradient(0, 45, 0, 185); g.addColorStop(0, c0); g.addColorStop(1, c1); fs(x, g, 12);
  x.fillStyle = 'rgba(255,255,255,0.35)'; rrect(x, 120, 58, w - 240, 26, 13); x.fill();
  let size = 96; x.font = `${size}px ${FONT}`; while (x.measureText(text).width > w - 270) { size -= 4; x.font = `${size}px ${FONT}`; }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineWidth = 17; x.strokeStyle = OL; x.lineJoin = 'round'; x.strokeText(text, w / 2, 122); x.fillStyle = '#fff'; x.fillText(text, w / 2, 122);
  sparkle(x, 110, 40, 16); sparkle(x, w - 120, 190, 12);
  return c;
}
// corner overlays
export function scopeOverlay(x, cx, cy, r, t, inner) {
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = 'rgba(20,40,30,0.9)'; x.fill(); x.clip(); inner(x); x.restore();
  x.lineWidth = 14; x.strokeStyle = OL; x.beginPath(); x.arc(cx, cy, r, 0, 7); x.stroke(); x.lineWidth = 6; x.strokeStyle = '#5fe07a'; x.stroke();
  x.lineWidth = 4; x.strokeStyle = 'rgba(95,224,122,0.9)'; x.beginPath(); x.moveTo(cx - r, cy); x.lineTo(cx + r, cy); x.moveTo(cx, cy - r); x.lineTo(cx, cy + r); x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.45, 0, 7); x.stroke();
  const a = t * 2; x.beginPath(); x.moveTo(cx, cy); x.arc(cx, cy, r, a, a + 0.5); x.closePath(); x.fillStyle = 'rgba(95,224,122,0.18)'; x.fill();
}
export function meterOverlay(x, X, Y, h, pct, label) {
  rrect(x, X, Y, 90, h, 26); fs(x, '#2a2140', 12);
  const fh = (h - 24) * pct; rrect(x, X + 12, Y + h - 12 - fh, 66, Math.max(fh, 1), 18);
  const g = x.createLinearGradient(0, Y + h, 0, Y); g.addColorStop(0, '#ff4a2d'); g.addColorStop(1, '#ffd84a'); x.fillStyle = g; x.fill();
  x.font = `58px ${FONT}`; x.textAlign = 'center'; x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = OL;
  const txt = `${Math.round(pct * 100)}%`; x.strokeText(txt, X + 45, Y - 30); x.fillStyle = '#fff'; x.fillText(txt, X + 45, Y - 30);
  if (label) { x.font = `40px ${FONT}`; x.strokeText(label, X + 45, Y + h + 52); x.fillStyle = '#ffc931'; x.fillText(label, X + 45, Y + h + 52); }
}
export function magnifier(x, cx, cy, r, t, inner) {
  x.save(); x.translate(cx + r * 0.7, cy + r * 0.7); x.rotate(-Math.PI / 4); rrect(x, -26, 0, 52, r * 0.9, 20); fs(x, '#8a5a3c', 12); x.restore();
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, 7); x.fillStyle = '#efe4ff'; x.fill(); x.clip();
  x.lineWidth = 10; x.strokeStyle = 'rgba(176,124,255,0.55)'; x.beginPath();
  for (let a = 0; a < Math.PI * 8; a += 0.1) { const rr = r * a / (Math.PI * 8); x.lineTo(cx + Math.cos(a + t * 2) * rr, cy + Math.sin(a + t * 2) * rr); } x.stroke();
  inner(x); x.restore();
  x.beginPath(); x.arc(cx, cy, r, 0, 7); x.lineWidth = 18; x.strokeStyle = OL; x.stroke(); x.lineWidth = 9; x.strokeStyle = '#ffd34d'; x.stroke();
  x.beginPath(); x.arc(cx, cy, r * 0.82, Math.PI * 1.1, Math.PI * 1.4); x.lineWidth = 10; x.strokeStyle = 'rgba(255,255,255,0.9)'; x.stroke();
}
// pedestal for the FORMS stage
export function pedestal(x, cx, cy, label, lit) {
  x.beginPath(); x.ellipse(cx, cy + 40, 120, 34, 0, 0, Math.PI); x.lineTo(cx - 120, cy); x.fillStyle = '#5b3b8f'; x.fill();
  x.beginPath(); x.moveTo(cx - 120, cy); x.lineTo(cx - 120, cy + 40); x.ellipse(cx, cy + 40, 120, 34, 0, Math.PI, 0, true); x.lineTo(cx + 120, cy); x.lineWidth = 10; x.strokeStyle = OL; x.stroke();
  x.beginPath(); x.ellipse(cx, cy, 120, 34, 0, 0, 7); fs(x, lit ? '#a77ee8' : '#8a63c9', 10);
  x.setLineDash([14, 12]); x.beginPath(); x.ellipse(cx, cy, 96, 24, 0, 0, 7); x.lineWidth = 5; x.strokeStyle = 'rgba(255,255,255,0.75)'; x.stroke(); x.setLineDash([]);
  x.font = `50px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 13; x.strokeStyle = OL;
  x.strokeText(label, cx, cy + 112); x.fillStyle = lit ? '#ffe14d' : '#ffc931'; x.fillText(label, cx, cy + 112);
}
export function progressBar(x, cx, cy, w, pct, label) {
  rrect(x, cx - w / 2, cy - 38, w, 76, 38); fs(x, '#2a2140', 12);
  if (pct > 0) { rrect(x, cx - w / 2 + 12, cy - 26, (w - 24) * pct, 52, 26); x.fillStyle = '#ffd23f'; x.fill(); x.fillStyle = 'rgba(255,255,255,0.45)'; rrect(x, cx - w / 2 + 22, cy - 20, Math.max(0, (w - 44) * pct), 12, 6); x.fill(); }
  if (label) { x.font = `56px ${FONT}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 14; x.strokeStyle = OL; x.strokeText(label, cx, cy + 4); x.fillStyle = '#fff'; x.fillText(label, cx, cy + 4); }
}
// host gear variants (same character, different colours)
LOOKS.host_g2 = { ...LOOKS.host, skin: '#ff9a96', skinD: '#e2716d' };
LOOKS.host_g5 = { ...LOOKS.host, hair: '#ffffff', hairL: '#d9e0ff', cloth: '#f4f4f8', clothD: '#cfd0dc', inner: '#ffffff', pants: '#e3e3ec', cuff: '#cfd0dc', shoe: '#ffffff' };
export function heart(x, cx, cy, r, col = '#e8303c') {
  if (r <= 0) return;
  x.save(); x.translate(cx, cy); x.beginPath(); x.moveTo(0, r * 0.9);
  x.bezierCurveTo(-r * 1.4, -r * 0.1, -r * 0.6, -r * 1.1, 0, -r * 0.35); x.bezierCurveTo(r * 0.6, -r * 1.1, r * 1.4, -r * 0.1, 0, r * 0.9);
  fs(x, col, 6); x.fillStyle = 'rgba(255,255,255,0.6)'; x.beginPath(); x.arc(-r * 0.45, -r * 0.35, r * 0.18, 0, 7); x.fill(); x.restore();
}
LOOKS.lawKid_cured = { ...LOOKS.lawKid, spots: false };
