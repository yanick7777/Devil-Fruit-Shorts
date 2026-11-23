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
  blackbeard: { skin: '#b07a52', skinD: '#8a5a3a', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'bandana', bandana: '#3aa8a0', hat: 'tricorn', beard: true, grinWide: true, fit: 1.05,
          top: 'teach', cloakCol: '#1b1820', cloakLining: '#4a4e58', cloakTrim: '#e8c030', pants: '#6aa06a', pantsStripes: '#3a6a3a', shoe: '#1b1820', boots: true, arm: '#d83a48', cuff: '#ffffff' },
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
          top: 'robe', cloth: '#e0e0d0', clothD: '#c0c0b0', cloakCol: '#1f1f24', cloakLining: '#a8b82a', liningSpots: true, fur: true, pants: '#c84a32', shoe: '#5a3a26', boots: false, arm: '#e0e0d0', cuff: '#e0e0d0' },
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
  gunko: { skin: '#f8dcc8', skinD: '#dcbca8', hair: '#4a9ae8', hairL: '#8ac0ff', hairStyle: 'bob', hat: 'goggleCap', faceMask: true,
          top: 'peacoat', cloth: '#22202e', clothD: '#14121a', cloakCol: '#f4b0b8', cloakLining: '#c8484a', pants: '#f8dcc8', bandages: true, shoe: '#3a2e5a', boots: true, tallBoots: true, arm: '#22202e', glove: '#22202e', cuff: null },
  knight: { skin: '#e8b48a', skinD: '#cc9670', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'bald', hat: 'knightHelm',
          top: 'coat', cloth: '#b8bcc8', clothD: '#8a8e9a', inner: '#e8402e', innerD: '#b52a1f', pants: '#8a8e9a', shoe: '#5a5e6a', boots: true, cuff: '#8a8e9a', arm: '#b8bcc8' },
  buggy: { skin: '#f8e8dc', skinD: '#e0c8b8', hair: '#5ab8e8', hairL: '#9ad8ff', hairStyle: 'long', hat: 'tricorn', clownNose: true, lips: true, grinWide: true,
          top: 'coat', cloth: '#d8342c', clothD: '#a92620', inner: '#f4f1ea', innerD: '#cfc8b8', pants: '#5a3a8a', pantsStripes: '#f4f4f4', shoe: '#2a2026', boots: true, cuff: '#ffcf3a' },
  ronin: { skin: '#e8b48a', skinD: '#cc9670', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'topknot', hat: 'kasa', stache2: true,
          top: 'coat', cloth: '#5a6a8a', clothD: '#3f4a6a', inner: '#e8dcc0', innerD: '#c9b89a', pants: '#3a3346', shoe: '#8a6a4a', boots: false, cuff: '#5a6a8a' },
  lucci: { skin: '#f0d0b0', skinD: '#d6b090', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'long', hat: 'top', noGoggles: true, goatee: true,
          top: 'coat', cloth: '#1f1c26', clothD: '#14121a', inner: '#f4f4f8', innerD: '#cfd0dc', cravat: true, pants: '#1f1c26', shoe: '#14121a', boots: true, cuff: '#1f1c26' },
  lucciHybrid: { skin: '#e8a84a', skinD: '#c8862a', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'long', catEars: true, leopardSpots: true, grinWide: true,
          top: 'bare', pants: '#1f1c26', shoe: '#e8a84a', boots: false, arm: '#e8a84a', glove: '#e8a84a' },
  lucciAwake: { skin: '#f0b040', skinD: '#d0902a', hair: '#14121a', hairL: '#4a4458', hairStyle: 'curlyBig', catEars: true, leopardSpots: true, spotCol: '#2a1a10', goatee: true, grinWide: false,
          top: 'bare', whiteChest: true, armBand: true, pants: '#f4f4f8', shoe: '#f0b040', boots: false, arm: '#f0b040', glove: '#f0b040' },
  bandit: { skin: '#c98d64', skinD: '#ab7049', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'short', eyePatch: true, stache2: true,
          top: 'vest', cloth: '#6b4630', clothD: '#4a2f20', inner: '#e8dcc0', pants: '#5a6a3a', shoe: '#3a2a20', boots: true, arm: '#e8dcc0', sleeveSkin: true },
  bege: { skin: '#f0c8a0', skinD: '#d6a880', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short', hat: 'fedora', blueMouth: true, grinWide: true, goatee: true, cigar: true,
          top: 'pinstripe', cloth: '#1b1820', clothD: '#14121a', cloakCol: '#1b1820', cloakLining: '#6b4a30', cloakTrim: '#e8b52e', pants: '#1b1820', pantsStripes: '#f4f4f8', shoe: '#14121a', boots: false, arm: '#1b1820', cuff: '#f4f4f8' },
  grunt: { skin: '#e8b48a', skinD: '#cc9670', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'short', hat: 'sailorCap',
          top: 'tee', cloth: '#f4f4f8', clothD: '#cfd0dc', inner: '#f4f4f8', pants: '#2a4f8a', shoe: '#2a2026', boots: true, sleeveSkin: false, arm: '#f4f4f8' },
  vegapunk: { skin: '#f6dcc0', skinD: '#dcbaa0', hair: '#f4f4f8', hairL: '#ffffff', hairStyle: 'vegaHair', tallDome: true, appleHat: true, fit: 0.74, pinkNose: true, tongue: true, stache: false, stache2: false, vegaStache: true,
          top: 'coat', cloth: '#f8f8fc', clothD: '#d8dce8', inner: '#f8c8d8', innerD: '#e8a8c0', innerDots: '#d8343a', pants: '#1f1c2a', shoe: '#14121a', boots: false, cuff: '#f8f8fc' },
  rival: { skin: '#f3c8a0', skinD: '#d9a880', hair: '#d8642c', hairL: '#f08a4a', hairStyle: 'short', grinWide: false,
          top: 'vest', cloth: '#7a5ab5', clothD: '#5a3f8a', inner: '#ffffff', pants: '#5a5a6a', shoe: '#3a2a20', boots: false, arm: '#ffffff', sleeveSkin: false },
  kalifa: { skin: '#f8dcc8', skinD: '#dcbca8', hair: '#e8c868', hairL: '#fff0a8', hairStyle: 'long', glasses: true, lips: true,
          top: 'blackDress', cloth: '#1b1820', clothD: '#14121a', pants: '#f8dcc8', fishnet: true, shoe: '#14121a', boots: false, arm: '#1b1820', glove: '#1b1820', cuff: null },
  wapol: { skin: '#f0c8a0', skinD: '#d6a880', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'bald', hat: 'hippoHood', metalJaw: true,
          top: 'armorFur', cloth: '#8a96a8', clothD: '#5a6478', cloakCol: '#f0ece0', pants: '#f0a050', shoe: '#5a2a20', boots: true, arm: '#f0ece0', glove: '#5a2a20', cuff: '#f0ece0', sx: 1 },
  mr5: { skin: '#c98d64', skinD: '#ab7049', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'dreads', shades: true, lips: false,
          top: 'number5', cloth: '#5a2a1e', clothD: '#3a1a14', pants: '#7a5040', shoe: '#7a3a26', boots: false, arm: '#5a2a1e', cuff: '#5a2a1e' },
  mr3: { skin: '#e8b88a', skinD: '#cc9670', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'three', hat: 'none3', glasses: true, grinWide: true,
          top: 'stripedVest', cloth: '#4a4ab0', clothD: '#f4f4f8', pants: '#f8f0b8', shoe: '#f4f4f8', boots: false, arm: '#e8b88a' },
  kanjuro: { skin: '#f8f6f0', skinD: '#e0dcd0', hair: '#d8402e', hairL: '#ff7a5a', hairStyle: 'redMane', paleFace: true, grinWide: true,
          top: 'kimonoPink', cloth: '#7fc85a', clothD: '#5aa83a', pants: '#f8f6f0', shoe: '#c0392b', boots: false, arm: '#7fc85a', cuff: '#7fc85a' },
  farmer: { skin: '#e8b48a', skinD: '#cc9670', hair: '#7a4a2a', hairL: '#a26d45', hairStyle: 'short', hat: 'straw',
          top: 'overalls', cloth: '#3f6fb5', clothD: '#2a4f8a', pants: '#3f6fb5', shoe: '#6b4630', boots: true, arm: '#e8b48a' },
  cowboy: { skin: '#d9a27a', skinD: '#bb8460', hair: '#3a2a20', hairL: '#5b4434', hairStyle: 'short', hat: 'cowboy', stache2: true,
          top: 'vest', cloth: '#8a5a3c', clothD: '#6b4630', inner: '#e8dcc0', pants: '#3f6fb5', shoe: '#6b4630', boots: true, arm: '#e8dcc0', sleeveSkin: false },
  mechanic: { skin: '#c98d64', skinD: '#ab7049', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short', hat: 'mechCap',
          top: 'tee', cloth: '#5a6a7a', clothD: '#3a4a5a', inner: '#5a6a7a', pants: '#5a6a7a', shoe: '#2a2026', boots: true, sleeveSkin: true },
  surfer: { skin: '#e8b48a', skinD: '#cc9670', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'messy',
          top: 'tank', cloth: '#ff8a2e', clothD: '#e86a1a', pants: '#3fb8d8', shorts: true, shoe: '#f4f4f8', boots: false, arm: '#e8b48a' },
  critic: { skin: '#f3d8bc', skinD: '#d9b89c', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short', hat: 'beret', stache2: true,
          top: 'tee', cloth: '#1f1c26', clothD: '#14121a', inner: '#1f1c26', pants: '#3a3a46', shoe: '#14121a', boots: false, sleeveSkin: false, arm: '#1f1c26' },
  enel: { skin: '#f8e8dc', skinD: '#e0c8b8', hair: '#f8f8fc', hairL: '#ffffff', hairStyle: 'bald', hat: 'enelCloth', longLobes: true, drumRing: true,
          top: 'enel', pants: '#f8e8dc', shoe: '#f8e8dc', boots: false, arm: '#f8e8dc', cuff: '#d9b44a', fit: 0.9 },
  robin: { skin: '#f6dcc4', skinD: '#dcbca4', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'long', sunglassesUp: true, lips: false,
          top: 'robin', pants: '#f08070', shoe: '#d8343a', boots: false, arm: '#f6dcc4', cuff: '#2a3a9a' },
  orochi: { skin: '#e8b88a', skinD: '#cc9670', hair: '#b040c8', hairL: '#d070e0', hairStyle: 'bald', hat: 'goldCrown', sideTufts: true, grinWide: true,
          top: 'orochi', cloakCol: '#2a2030', cloakLining: '#7a2a5a', pants: '#f8f8fc', shoe: '#f8f8fc', boots: false, arm: '#f4c830', cuff: '#2a2030' },
  chopper: { skin: '#e8b070', skinD: '#c08850', hair: '#e8b070', hairL: '#f0c890', hairStyle: 'bald', hat: 'chopperHat', antlers: true, blueNose: true,
          top: 'chopper', pants: '#e8b070', shoe: '#8a5a30', boots: false, arm: '#e8b070', glove: '#8a5a30', fit: 0.62 },
  chopperMonster: { skin: '#c8783a', skinD: '#8a4a20', hair: '#c8783a', hairL: '#e09050', hairStyle: 'bald', hat: 'chopperHat', antlers: true, blueNose: true, fit: 1.12,
          top: 'shag', pants: '#c8a080', shoe: '#7a6a5a', boots: false, arm: '#c8783a', glove: '#5a3a26' },
  perona: { skin: '#f8e0d8', skinD: '#e0c4b8', hair: '#ff8cc0', hairL: '#ffb8d8', hairStyle: 'twinFringe', twinTails: true, hat: 'peronaCrown', lips: true,
          top: 'perona', pants: '#f8f8fc', stripedLegs: true, shoe: '#d8343a', boots: true, arm: '#f8f8fc', cuff: '#d8343a' },
  yamato: { skin: '#f6dcc4', skinD: '#dcbca4', hair: '#f4f4f8', hairL: '#7fe0d0', hairStyle: 'long', redHorns: true,
          top: 'yamato', pants: '#e8303a', shoe: '#e8c890', boots: false, arm: '#f6dcc4' },
  eustass: { skin: '#f0c8a0', skinD: '#d6a880', hair: '#e8402e', hairL: '#ff8a6a', hairStyle: 'spikyLong', goggles: true, grinWide: true,
          top: 'kid', cloakCol: '#d8302e', fur: false, metalArm: true, pants: '#e8d060', shoe: '#3a2a20', boots: true, arm: '#f0c8a0' },
  moria: { skin: '#f4f4f8', skinD: '#c8c8d8', hair: '#9a3ab0', hairL: '#c86ae0', hairStyle: 'bald', moriaHead: true, sharpTeeth: true,
          top: 'moria', cloakCol: '#2a2a36', pants: '#f08a30', shoe: '#14121a', boots: false, arm: '#2a2a36', glove: '#14121a', cuff: '#4a4ab0' },
  valentine: { skin: '#f8dcc8', skinD: '#dcbca8', hair: '#f2d27a', hairL: '#ffe9a8', hairStyle: 'bob', hat: 'bucketHat', lips: true, earring: true,
          top: 'valentine', pants: '#f8dcc8', shoe: '#f8f8fc', boots: false, arm: '#5a6ad8', glove: '#f8f8fc', cuff: '#5a6ad8', umbrella: true },
  bonclay: { skin: '#e8b88a', skinD: '#cc9670', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short', pompoms: true, grinWide: true, lips: true, swans: true,
          top: 'bonclay', cloakCol: '#f4a8c8', fur: true, pants: '#e8b88a', shoe: '#f8d8e0', boots: false, arm: '#f4a8c8', cuff: '#ffffff' },
  caesar: { skin: '#e8e0e8', skinD: '#c8bcc8', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'wild', longWild: true, goatHorns: true, grinWide: true, lips: true,
          top: 'caesar', pants: '#d8b8f0', shoe: '#d8b8f0', boots: false, arm: '#f4f8fc', glove: '#2a2450', cuff: '#f4f8fc' },
  kizaru: { skin: '#c8946a', skinD: '#a8764e', hair: '#1d1a22', hairL: '#3d3443', hairStyle: 'short', sideburns: true, shadesOrange: true, stubble: true, coatSleeves: true, fit: 1.04,
          top: 'kizaru', cloakCol: '#f4f4f8', cloakLining: '#dcdce4', pants: '#e8b830', pantsStripes: '#fff0a0', shoe: '#f4f4f8', boots: false, arm: '#e8b830', cuff: '#f4e070', glove: '#c8946a' },
  rayleigh: { skin: '#f0c8a0', skinD: '#d6a880', hair: '#f4f4f8', hairL: '#ffffff', hairStyle: 'wavy', glasses: true, beard: true, scar: true,
          top: 'coat', cloth: '#f4f0e6', clothD: '#d8d0c0', inner: '#f4f0e6', innerD: '#d8d0c0', cloakCol: '#5a4a3a', cloakLining: '#3a3028', pants: '#4a4a5a', shoe: '#2a2026', boots: false, arm: '#f4f0e6', cuff: '#f4f0e6' },
  katakuri: { skin: '#e0a878', skinD: '#c08a5a', hair: '#a8305a', hairL: '#d0507a', hairStyle: 'spikyLong', furScarf: true, fit: 1.08,
          top: 'katakuri', pants: '#1b1820', pantsStripes: '#4a4a5a', shoe: '#2a2a36', boots: true, arm: '#e0a878', glove: '#3a2a20', spikeCuffs: true },
  kaido: { skin: '#b07a52', skinD: '#8a5a3a', hair: '#2a2028', hairL: '#4a3a44', hairStyle: 'wild', dreadMane: true, bullHorns: true, beard: true, whiskers: true, fit: 1.0,
          top: 'kaido', cloakCol: '#3a3478', cloakLining: '#2a2458', fur: true, pants: '#5a6a5a', shoe: '#1b1820', boots: true, arm: '#b07a52', spikeCuffs: true, dragonSleeve: true },
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
    if (L.fishnet) { x.save(); x.beginPath(); x.rect(x0 + 6, 1180, x1 - x0 - 12, 400); x.clip(); x.strokeStyle = '#1b1820'; x.lineWidth = 3; for (let k = -12; k < 12; k++) { x.beginPath(); x.moveTo(x0 + k * 18, 1180); x.lineTo(x0 + k * 18 + 200, 1580); x.moveTo(x1 - k * 18, 1180); x.lineTo(x1 - k * 18 - 200, 1580); x.stroke(); } x.restore(); x.fillStyle = '#1b1820'; x.fillRect(x0 + 4, 1180, x1 - x0 - 8, 22); }
  if (L.stripedLegs) { x.save(); x.beginPath(); x.rect(x0 + 6, 1060, x1 - x0 - 12, 520); x.clip(); x.fillStyle = OL; for (let k = 1080; k < 1580; k += 50) x.fillRect(x0, k, x1 - x0, 25); x.restore(); }
  if (L.bandages) { x.strokeStyle = '#f4f4f8'; x.lineWidth = 14; for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(x0 + 6, 1230 + k * 22); x.lineTo(x1 - 6, 1238 + k * 22); x.stroke(); } }
    if (L.boots) { const by = L.tallBoots ? 1320 : 1440; x.beginPath(); x.rect(x0 + 4, by, x1 - x0 - 8, 1585 - by); fs(x, shoe, 11); if (L.tallBoots) { rrect(x, x0 - 10, 1500, x1 - x0 + 20, 40, 10); fs(x, '#6a5a8a', 8); } }
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
    if (L.liningSpots) x.save(); else x.save(), x.beginPath(), x.rect(0, 0, 0, 0); x.clip(); x.fillStyle = '#2a2014'; for (let i = 0; i < 46; i++) { x.beginPath(); x.ellipse(40 + (i * 131) % 680, 660 + ((i * 197) % 1000), 18, 26, 0.3, 0, 7); x.fill(); } x.restore(); }
  if (L.cloakTrim) { x.beginPath(); x.moveTo(250, 600); x.quadraticCurveTo(0, 900, -20, 1660); x.moveTo(510, 600); x.quadraticCurveTo(760, 900, 780, 1660); x.lineWidth = 16; x.strokeStyle = L.cloakTrim; x.stroke(); x.fillStyle = L.cloakTrim; for (let i = 0; i < 8; i++) { const t = i / 8; x.beginPath(); x.arc(lerpN(225, 20, t) - Math.sin(t * Math.PI) * 30, lerpN(700, 1600, t), 12, 0, 7); x.arc(lerpN(535, 740, t) + Math.sin(t * Math.PI) * 30, lerpN(700, 1600, t), 12, 0, 7); x.fill(); } }
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
    if (L.innerDots) { x.save(); x.beginPath(); x.moveTo(318, 640); x.lineTo(442, 640); x.lineTo(430, 1080); x.lineTo(330, 1080); x.closePath(); x.clip(); x.fillStyle = L.innerDots; for (let yy = 670; yy < 1080; yy += 60) for (let xx = 335 + ((yy / 60) % 2) * 30; xx < 440; xx += 60) { x.beginPath(); x.arc(xx, yy, 14, 0, 7); x.fill(); } x.restore(); }
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
  } else if (L.top === 'pinstripe') { // pinstripe suit jacket with a green cravat
    torso(); fs(x, L.cloth, 12); x.save(); torso(); x.clip(); x.strokeStyle = '#f4f4f8'; x.lineWidth = 7; for (let k = 245; k < 530; k += 30) { x.beginPath(); x.moveTo(k, 640); x.lineTo(k, 1100); x.stroke(); } x.restore(); torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.moveTo(330, 640); x.quadraticCurveTo(290, 740, 340, 820); x.lineTo(380, 780); x.lineTo(420, 820); x.quadraticCurveTo(470, 740, 430, 640); x.closePath(); fs(x, '#7fc85a', 9);
  } else if (L.top === 'kizaru') { // yellow pinstripe double-breasted suit, dark green shirt, purple tie, yellow epaulettes
    torso(); fs(x, '#e8b830', 12); x.save(); torso(); x.clip(); x.strokeStyle = '#fff0a0'; x.lineWidth = 9; for (let k = 240; k < 530; k += 34) { x.beginPath(); x.moveTo(k, 640); x.lineTo(k, 1100); x.stroke(); } x.strokeStyle = '#b8861a'; x.lineWidth = 5; for (let k = 257; k < 530; k += 34) { x.beginPath(); x.moveTo(k, 640); x.lineTo(k, 1100); x.stroke(); } x.restore(); torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.moveTo(320, 640); x.lineTo(380, 800); x.lineTo(440, 640); x.closePath(); fs(x, '#2a4a40', 8); x.beginPath(); x.moveTo(370, 660); x.lineTo(390, 660); x.lineTo(398, 770); x.lineTo(380, 800); x.lineTo(362, 770); x.closePath(); fs(x, '#b070e0', 6);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 60, 640); x.lineTo(380 + sd * 10, 840); x.lineTo(380 + sd * 90, 700); x.closePath(); fs(x, '#e8b830', 7); for (const yy of [880, 980]) { x.beginPath(); x.arc(380 + sd * 50, yy, 11, 0, 7); fs(x, '#6b4630', 4); } }
    for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 170, 650, 85, 42, sd * 0.3, 0, 7); fs(x, '#f4e070', 8); x.strokeStyle = '#d8b830'; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(380 + sd * (115 + k * 20), 680); x.lineTo(380 + sd * (125 + k * 20), 745); x.stroke(); } }
    if (L.popCollar) for (const sd of [-1, 1]) { // tall coat collar standing up beside the face: white outside, big grey inside, thin white inner edge
      const P = (px, py) => [380 + sd * px, py];
      x.beginPath(); x.moveTo(...P(250, 720)); x.lineTo(...P(278, 460)); x.lineTo(...P(185, 485)); x.lineTo(...P(80, 700)); x.lineTo(...P(62, 790)); x.quadraticCurveTo(...P(160, 760), ...P(250, 720)); x.closePath(); fs(x, '#f4f4f8', 9);
      x.beginPath(); x.moveTo(...P(200, 492)); x.lineTo(...P(248, 478)); x.lineTo(...P(205, 715)); x.lineTo(...P(98, 712)); x.closePath(); fs(x, '#b4b8c4', 0);
      x.beginPath(); x.moveTo(...P(250, 720)); x.lineTo(...P(278, 460)); x.lineTo(...P(185, 485)); x.lineTo(...P(80, 700)); x.lineTo(...P(62, 790)); x.lineWidth = 9; x.strokeStyle = OL; x.stroke(); }
  } else if (L.top === 'peacoat') { // short double-breasted coat with gold buttons and a high collar
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(540, 1130); x.lineTo(220, 1130); x.closePath(); fs(x, L.cloth, 12);
    x.fillStyle = '#e8b52e'; for (let r = 0; r < 3; r++) for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 55, 760 + r * 110, 16, 0, 7); x.fill(); }
    rrect(x, 300, 560, 160, 110, 20); fs(x, L.cloth, 10);
  } else if (L.top === 'blackDress') { // black high-collar minidress with a fishnet chest panel
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(545, 1180); x.lineTo(215, 1180); x.closePath(); fs(x, '#1b1820', 12);
    x.beginPath(); x.moveTo(330, 650); x.lineTo(430, 650); x.lineTo(400, 860); x.lineTo(360, 860); x.closePath(); fs(x, L.skin, 6); x.save(); x.clip(); x.strokeStyle = '#1b1820'; x.lineWidth = 4; for (let k = -10; k < 10; k++) { x.beginPath(); x.moveTo(300 + k * 22, 640); x.lineTo(440 + k * 22, 870); x.moveTo(460 - k * 22, 640); x.lineTo(320 - k * 22, 870); x.stroke(); } x.restore();
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 60, 640); x.lineTo(380 + sd * 120, 540); x.lineTo(380 + sd * 140, 660); x.closePath(); fs(x, '#1b1820', 8); }
  } else if (L.top === 'armorFur') { // round riveted metal armour with a laced front, white fur cape, purple-and-orange zigzag skirt
    x.beginPath(); x.ellipse(380, 900, 330, 300, 0, 0, 7); fs(x, '#8a96a8', 12); x.fillStyle = '#3a4250'; for (let i = 0; i < 18; i++) { x.beginPath(); x.arc(380 + Math.cos(i / 18 * 6.283) * 290, 900 + Math.sin(i / 18 * 6.283) * 260, 8, 0, 7); x.fill(); }
    x.strokeStyle = '#5a3a26'; x.lineWidth = 9; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(350, 700 + i * 60); x.lineTo(410, 730 + i * 60); x.moveTo(410, 700 + i * 60); x.lineTo(350, 730 + i * 60); x.stroke(); }
    rrect(x, 60, 1120, 640, 40, 10); fs(x, '#5a3a26', 8); x.beginPath(); x.moveTo(80, 1160); for (let i = 0; i <= 10; i++) x.lineTo(80 + i * 60, i % 2 ? 1260 : 1160); x.lineTo(680, 1160); x.closePath(); fs(x, '#7a5ad8', 8);
  } else if (L.top === 'number5') { // long brown coat with a pink scarf and big 5 patches
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(600, 1480); x.lineTo(160, 1480); x.closePath(); fs(x, '#5a2a1e', 12);
    x.beginPath(); x.moveTo(330, 640); x.quadraticCurveTo(320, 760, 380, 800); x.quadraticCurveTo(440, 760, 430, 640); x.closePath(); fs(x, '#f49ab0', 8);
    for (const [bx, by, sz] of [[430, 720, 70], [430, 1260, 120]]) { rrect(x, bx, by, sz, sz * 1.1, 10); x.lineWidth = 10; x.strokeStyle = '#f4f4f8'; x.stroke(); x.font = `bold ${sz * 0.9}px sans-serif`; x.textAlign = 'center'; x.fillStyle = '#f4f4f8'; x.fillText('5', bx + sz / 2, by + sz * 0.9); }
  } else if (L.top === 'stripedVest') { // blue-and-white striped sleeveless jacket, ruffled shirt, pink bow tie
    torso(); fs(x, '#f4f4f8', 12); x.save(); torso(); x.clip(); x.fillStyle = '#4a4ab0'; for (let k = 240; k < 530; k += 44) x.fillRect(k, 640, 22, 460); x.restore(); torso(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
    x.beginPath(); x.moveTo(350, 650); x.lineTo(410, 650); x.lineTo(400, 900); x.lineTo(360, 900); x.closePath(); fs(x, '#ffffff', 6); x.beginPath(); x.moveTo(340, 660); x.lineTo(380, 680); x.lineTo(340, 700); x.closePath(); x.moveTo(420, 660); x.lineTo(380, 680); x.lineTo(420, 700); x.closePath(); fs(x, '#d8346a', 5);
  } else if (L.top === 'kimonoPink') { // pink kimono with yellow lines, green sleeves, big teal bow, yellow hakama skirt
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 1000); x.lineTo(236, 1000); x.closePath(); fs(x, '#f49ac0', 12);
    x.strokeStyle = '#ffd34d'; x.lineWidth = 8; for (const [a, b] of [[260, 300], [320, 360], [440, 400], [500, 460]]) { x.beginPath(); x.moveTo(a, 650); x.lineTo(b, 1000); x.stroke(); }
    x.beginPath(); x.moveTo(320, 640); x.lineTo(380, 760); x.lineTo(440, 640); fs(x, '#5cc45a', 6);
    x.beginPath(); x.moveTo(236, 1000); x.lineTo(524, 1000); x.lineTo(600, 1480); x.lineTo(160, 1480); x.closePath(); fs(x, '#ffd34d', 12); x.strokeStyle = 'rgba(160,110,20,0.6)'; x.lineWidth = 6; for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(250 + k * 45, 1010); x.lineTo(200 + k * 65, 1470); x.stroke(); }
    for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 60, 900, 70, 40, sd * 0.3, 0, 7); fs(x, '#5ad8d0', 8); } x.beginPath(); x.arc(380, 900, 26, 0, 7); fs(x, '#5ad8d0', 6);
  } else if (L.top === 'enel') { // bare chest, blue sash, teal wrap over puffy orange-and-black pants
    torso(); fs(x, L.skin, 12); x.lineWidth = 6; x.strokeStyle = L.skinD; x.beginPath(); x.moveTo(380, 760); x.lineTo(380, 1000); x.moveTo(300, 860); x.lineTo(460, 860); x.moveTo(305, 930); x.lineTo(455, 930); x.stroke();
    x.strokeStyle = '#d9b44a'; x.lineWidth = 6; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 50, 560); x.lineTo(380 + sd * 50, 780); x.stroke(); x.beginPath(); x.arc(380 + sd * 50, 790, 12, 0, 7); fs(x, '#d9b44a', 4); }
    x.beginPath(); x.moveTo(210, 1050); x.lineTo(550, 1050); x.lineTo(640, 1600); x.lineTo(120, 1600); x.closePath(); fs(x, '#f0a030', 12); x.save(); x.clip(); x.fillStyle = '#2a1f3a'; for (const yy of [1200, 1420]) x.fillRect(100, yy, 560, 70); x.fillStyle = '#f0a030'; for (let i = 0; i < 8; i++) for (const yy of [1235, 1455]) { x.beginPath(); x.arc(150 + i * 65, yy, 12, 0, 7); x.fill(); } x.restore();
    x.beginPath(); x.moveTo(230, 1060); x.lineTo(540, 1060); x.lineTo(470, 1450); x.lineTo(380, 1250); x.lineTo(290, 1450); x.closePath(); fs(x, '#5aa0a0', 9); rrect(x, 220, 1020, 320, 60, 16); fs(x, '#4a3ab0', 9);
  } else if (L.top === 'robin') { // blue cropped zip jacket, salmon long skirt
    torso(); fs(x, L.skin, 12); x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 900); x.lineTo(236, 900); x.closePath(); fs(x, '#2a3a9a', 12);
    x.beginPath(); x.moveTo(340, 640); x.lineTo(380, 780); x.lineTo(420, 640); fs(x, L.skin, 6); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 50, 640); x.lineTo(380 + sd * 120, 560); x.lineTo(380 + sd * 120, 680); x.closePath(); fs(x, '#2a3a9a', 8); }
    x.beginPath(); x.moveTo(230, 1000); x.lineTo(530, 1000); x.lineTo(560, 1580); x.lineTo(200, 1580); x.closePath(); fs(x, '#f08070', 12); x.beginPath(); x.moveTo(480, 1020); x.quadraticCurveTo(560, 1250, 520, 1500); x.lineWidth = 30; x.strokeStyle = '#a8d8a8'; x.stroke();
  } else if (L.top === 'orochi') { // yellow kimono with black swirls and a big orange hakama
    x.beginPath(); x.moveTo(200, 720); x.quadraticCurveTo(200, 640, 300, 630); x.lineTo(460, 630); x.quadraticCurveTo(560, 640, 560, 720); x.lineTo(560, 1050); x.lineTo(200, 1050); x.closePath(); fs(x, '#f4c830', 12);
    x.save(); x.clip(); x.strokeStyle = OL; x.lineWidth = 9; for (let i = 0; i < 6; i++) { const cx = 260 + (i % 3) * 120, cy = 760 + Math.floor(i / 3) * 160; for (let k = 0; k < 4; k++) { const a = k / 4 * 6.283; x.beginPath(); x.arc(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20, 28, a, a + 1.6); x.stroke(); } } x.restore();
    x.beginPath(); x.moveTo(330, 630); x.lineTo(380, 760); x.lineTo(430, 630); fs(x, '#c8b890', 6);
    x.beginPath(); x.moveTo(180, 1040); x.lineTo(580, 1040); x.lineTo(680, 1600); x.lineTo(80, 1600); x.closePath(); fs(x, '#f0a020', 12); x.strokeStyle = 'rgba(140,80,10,0.5)'; x.lineWidth = 6; for (let k = 0; k < 9; k++) { x.beginPath(); x.moveTo(220 + k * 40, 1060); x.lineTo(120 + k * 65, 1590); x.stroke(); }
    rrect(x, 330, 1020, 100, 50, 14); fs(x, '#f0a020', 7);
  } else if (L.top === 'perona') { // white top with a ghost face, red capelet with a pink bow, red frilly skirt
    torso(); fs(x, L.skin, 12); x.beginPath(); x.moveTo(250, 680); x.lineTo(510, 680); x.lineTo(500, 920); x.lineTo(260, 920); x.closePath(); fs(x, '#f8f4f8', 10); x.fillStyle = OL; for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 40, 780, 24, 0, 7); x.fill(); } x.beginPath(); x.moveTo(330, 840); x.quadraticCurveTo(380, 900, 430, 840); x.closePath(); x.fill();
    x.beginPath(); x.moveTo(220, 720); x.quadraticCurveTo(380, 600, 540, 720); x.lineTo(560, 830); x.quadraticCurveTo(380, 760, 200, 830); x.closePath(); fs(x, '#d8343a', 10); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 50, 670, 50, 30, sd * 0.3, 0, 7); fs(x, '#ff8cc0', 7); }
    x.beginPath(); x.moveTo(240, 1000); x.lineTo(520, 1000); x.lineTo(600, 1180); x.lineTo(160, 1180); x.closePath(); fs(x, '#d8343a', 12); x.fillStyle = '#ffffff'; for (let i = 0; i < 8; i++) { x.beginPath(); x.arc(190 + i * 56, 1180, 22, 0, Math.PI); x.fill(); } rrect(x, 240, 980, 280, 40, 10); fs(x, '#e8c84a', 7);
  } else if (L.top === 'yamato') { // white sleeveless kimono, purple-and-white rope belt, red hakama
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 1000); x.lineTo(236, 1000); x.closePath(); fs(x, '#f8f8fc', 12);
    x.beginPath(); x.moveTo(330, 640); x.lineTo(380, 760); x.lineTo(430, 640); fs(x, '#d8343a', 6); x.strokeStyle = '#4a4ab0'; x.lineWidth = 12; x.beginPath(); x.moveTo(280, 900); x.quadraticCurveTo(380, 860, 480, 920); x.stroke();
    x.beginPath(); x.moveTo(230, 1000); x.lineTo(530, 1000); x.lineTo(660, 1600); x.lineTo(100, 1600); x.closePath(); fs(x, '#e8303a', 12); x.strokeStyle = 'rgba(120,10,20,0.5)'; x.lineWidth = 6; for (let k = 0; k < 7; k++) { x.beginPath(); x.moveTo(260 + k * 40, 1010); x.lineTo(150 + k * 70, 1590); x.stroke(); }
    for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse(250 + i * 44, 1000, 34, 26, 0.4, 0, 7); fs(x, i % 2 ? '#ffffff' : '#b48ae0', 6); }
  } else if (L.top === 'kid') { // open black vest over a bare chest, double belt, yellow cracked-pattern pants
    torso(); fs(x, L.skin, 12); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 650); x.lineTo(380 + sd * 60, 650); x.lineTo(380 + sd * 70, 1000); x.lineTo(380 + sd * 146, 1000); x.closePath(); fs(x, '#1f1c26', 10); }
    for (const yy of [990, 1040]) { rrect(x, 225, yy, 310, 44, 8); fs(x, '#5a3a26', 8); rrect(x, 355, yy + 4, 50, 36, 6); fs(x, '#d9b44a', 5); }
  } else if (L.top === 'moria') { // huge orange belly with yellow window panes, white frills, black coat
    x.beginPath(); x.ellipse(380, 1150, 420, 420, 0, 0, 7); fs(x, '#f08a30', 14); x.save(); x.clip(); x.fillStyle = '#ffe070'; for (let r = 0; r < 5; r++) for (let k = -3; k <= 3; k++) { const px = 380 + k * 110 - 40, py = 900 + r * 110; x.fillRect(px, py, 80, 80); x.strokeStyle = OL; x.lineWidth = 6; x.strokeRect(px, py, 80, 80); } x.restore();
    x.beginPath(); x.ellipse(380, 1150, 420, 420, 0, 0, 7); x.lineWidth = 14; x.strokeStyle = OL; x.stroke(); rrect(x, 60, 820, 640, 60, 10); fs(x, '#3a3346', 9); rrect(x, 320, 812, 120, 76, 10); fs(x, '#8a8aa0', 7);
    for (let i = 0; i < 3; i++) { x.beginPath(); x.ellipse(380, 690 + i * 40, 230 - i * 20, 50, 0, 0, Math.PI); fs(x, '#e0e4f8', 7); }
  } else if (L.top === 'valentine') { // yellow lemon-print minidress under a short blue jacket
    x.beginPath(); x.moveTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(540, 1150); x.lineTo(220, 1150); x.closePath(); fs(x, '#f4e040', 12);
    x.save(); x.clip(); for (let i = 0; i < 8; i++) { const cx = 280 + (i % 3) * 100, cy = 720 + Math.floor(i / 3) * 140; x.beginPath(); x.arc(cx, cy, 40, 0, 7); fs(x, '#fffbe0', 5); x.strokeStyle = OL; x.lineWidth = 3; for (let k = 0; k < 6; k++) { const a = k / 6 * 6.283; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(a) * 36, cy + Math.sin(a) * 36); x.stroke(); } } x.restore();
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 155, 660); x.lineTo(380 + sd * 60, 650); x.lineTo(380 + sd * 80, 940); x.lineTo(380 + sd * 155, 940); x.closePath(); fs(x, '#5a6ad8', 9); }
  } else if (L.top === 'bonclay') { // blue swirl top, blue striped puffy shorts
    torso(); fs(x, '#3f6fd8', 12); x.strokeStyle = '#8ad8ff'; x.lineWidth = 10; for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 50, 820, 50, 0, 5); x.stroke(); }
    x.beginPath(); x.ellipse(380, 1170, 230, 170, 0, 0, 7); fs(x, '#3a4ab0', 12); x.save(); x.clip(); x.fillStyle = '#8ad8ff'; for (let k = 0; k < 8; k++) x.fillRect(170 + k * 60, 1000, 26, 360); x.restore(); x.beginPath(); x.ellipse(380, 1170, 230, 170, 0, 0, 7); x.lineWidth = 12; x.strokeStyle = OL; x.stroke();
  } else if (L.top === 'chopper') { // furry little body with maroon shorts
    torso(); fs(x, L.skin, 12); x.strokeStyle = L.skinD; x.lineWidth = 5; for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(300 + i * 30, 700 + (i % 2) * 40); x.lineTo(310 + i * 30, 740 + (i % 2) * 40); x.stroke(); }
    x.beginPath(); x.moveTo(230, 1000); x.lineTo(530, 1000); x.lineTo(540, 1300); x.lineTo(220, 1300); x.closePath(); fs(x, '#7a2a40', 12);
  } else if (L.top === 'shag') { // monster point: huge shaggy fur body
    x.beginPath(); for (let i = 0; i < 40; i++) { const a = i / 40 * 6.283, r = i % 2 ? 1 : 0.88; const px = 380 + Math.cos(a) * 330 * r, py = 860 + Math.sin(a) * 300 * r; i ? x.lineTo(px, py) : x.moveTo(px, py); } x.closePath(); fs(x, L.skin, 12);
    x.strokeStyle = L.skinD; x.lineWidth = 6; for (let i = 0; i < 24; i++) { const px = 100 + (i * 113) % 560, py = 600 + (i * 71) % 450; x.beginPath(); x.moveTo(px, py); x.lineTo(px + 10, py + 80); x.stroke(); }
    x.beginPath(); x.moveTo(200, 1090); x.lineTo(560, 1090); x.lineTo(560, 1350); x.lineTo(200, 1350); x.closePath(); fs(x, '#7a2a40', 12);
  } else if (L.top === 'teach') { // bare hairy belly, open red shirt, bead necklaces, yellow sash, gold epaulettes
    x.beginPath(); x.moveTo(250, 680); x.quadraticCurveTo(380, 600, 510, 680); x.quadraticCurveTo(580, 900, 520, 1060); x.lineTo(240, 1060); x.quadraticCurveTo(180, 900, 250, 680); x.closePath(); fs(x, L.skin, 12);
    x.strokeStyle = L.skinD; x.lineWidth = 4; for (let i = 0; i < 18; i++) { const hx = 280 + (i * 53) % 200, hy = 760 + (i * 37) % 260; x.beginPath(); x.moveTo(hx, hy); x.lineTo(hx + 22, hy + 4); x.stroke(); }
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 60, 640); x.lineTo(380 + sd * 150, 640); x.lineTo(380 + sd * 170, 1080); x.lineTo(380 + sd * 110, 1060); x.quadraticCurveTo(380 + sd * 120, 820, 380 + sd * 60, 640); x.closePath(); fs(x, '#d83a48', 10); }
    for (const [r, n, cols] of [[150, 9, ['#5cc45a']], [190, 9, ['#5cc45a', '#6a4ad8']]]) for (let i = 0; i < n; i++) { const a = Math.PI * (0.18 + 0.64 * i / (n - 1)); x.beginPath(); x.arc(380 + Math.cos(a) * r * 0.9, 600 + Math.sin(a) * r * 0.55, 13, 0, 7); fs(x, cols[i % cols.length], 4); }
    x.beginPath(); x.moveTo(220, 1040); x.lineTo(540, 1040); x.lineTo(550, 1110); x.lineTo(210, 1110); x.closePath(); fs(x, '#e8c030', 9); x.beginPath(); x.moveTo(470, 1100); x.lineTo(540, 1300); x.lineTo(490, 1300); x.lineTo(440, 1110); x.closePath(); fs(x, '#e8c030', 7);
    for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 175, 650, 90, 45, sd * 0.3, 0, 7); fs(x, '#e8c030', 8); x.strokeStyle = '#c89a10'; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(380 + sd * (120 + k * 20), 680); x.lineTo(380 + sd * (130 + k * 20), 740); x.stroke(); } }
  } else if (L.top === 'katakuri') { // bare muscular chest with pink stripes, open black vest, studded belt with skull buckle, black pants
    torso(); fs(x, L.skin, 12); x.strokeStyle = L.skinD; x.lineWidth = 5; x.beginPath(); x.moveTo(380, 700); x.lineTo(380, 1010); for (const yy of [820, 890, 960]) { x.moveTo(320, yy); x.lineTo(440, yy); } x.stroke();
    x.fillStyle = '#e84a8a'; for (const dx of [400, 430, 460]) x.fillRect(dx, 680, 14, 330);
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 650); x.lineTo(380 + sd * 95, 650); x.lineTo(380 + sd * 120, 1010); x.lineTo(380 + sd * 150, 1010); x.closePath(); fs(x, '#1b1820', 9); }
    rrect(x, 220, 1000, 320, 56, 10); fs(x, '#3a3a4a', 8); x.fillStyle = '#a8b0c8'; for (let k = 0; k < 8; k++) { x.beginPath(); x.arc(245 + k * 38, 1028, 7, 0, 7); x.fill(); } x.beginPath(); x.arc(380, 1028, 40, 0, 7); fs(x, '#f4f4f8', 7); x.fillStyle = OL; for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 13, 1020, 8, 0, 7); x.fill(); }
  } else if (L.top === 'kaido') { // huge bare muscular torso, scar, white rope belt, purple sash, maroon waistband, chains, grey-green baggy pants
    x.beginPath(); x.moveTo(190, 700); x.quadraticCurveTo(380, 580, 570, 700); x.lineTo(560, 1040); x.lineTo(200, 1040); x.closePath(); fs(x, L.skin, 12);
    x.strokeStyle = L.skinD; x.lineWidth = 6; x.beginPath(); x.moveTo(380, 720); x.lineTo(380, 1020); for (const yy of [850, 920, 990]) { x.moveTo(300, yy); x.quadraticCurveTo(380, yy + 10, 460, yy); } x.moveTo(240, 780); x.quadraticCurveTo(310, 840, 370, 790); x.moveTo(520, 780); x.quadraticCurveTo(450, 840, 390, 790); x.stroke();
    x.beginPath(); x.moveTo(270, 800); x.lineTo(320, 900); x.lineTo(280, 960); x.lineTo(300, 1010); x.lineWidth = 16; x.strokeStyle = '#a86a5a'; x.stroke();
    x.beginPath(); x.moveTo(160, 1020); x.quadraticCurveTo(380, 1080, 600, 1020); x.lineTo(620, 1120); x.quadraticCurveTo(380, 1180, 140, 1120); x.closePath(); fs(x, '#8a5aa8', 9);
    rrect(x, 210, 1060, 340, 90, 10); fs(x, '#7a2a3a', 8); for (let k = 0; k < 6; k++) { x.beginPath(); x.ellipse(250 + k * 52, 1040, 34, 26, 0, 0, 7); fs(x, '#f4f4f8', 6); }
    for (const [dx, sd] of [[400, 1], [430, 1]]) for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(dx, 1150 + k * 50); x.lineTo(dx + 20, 1175 + k * 50); x.lineTo(dx, 1200 + k * 50); x.lineTo(dx - 20, 1175 + k * 50); x.closePath(); fs(x, '#ffffff', 4); }
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 170, 1110); x.quadraticCurveTo(380 + sd * 220, 1260, 380 + sd * 150, 1290); x.lineWidth = 14; x.setLineDash([16, 10]); x.strokeStyle = '#c8b040'; x.stroke(); x.setLineDash([]); }
  } else if (L.top === 'caesar') { // yellow-and-black striped suit under a huge white GAS coat, legs lost in a purple gas cloud
    x.beginPath(); x.moveTo(300, 650); x.lineTo(460, 650); x.lineTo(470, 1250); x.lineTo(290, 1250); x.closePath(); fs(x, '#f2c230', 10); x.save(); x.clip(); x.strokeStyle = '#2a1f1a'; x.lineWidth = 22; for (let k = -6; k < 12; k++) { x.beginPath(); x.moveTo(250, 600 + k * 70); x.lineTo(520, 700 + k * 70); x.stroke(); } x.restore();
    for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 70, 560); x.quadraticCurveTo(380 + sd * 300, 600, 380 + sd * 280, 1300); x.lineTo(380 + sd * 95, 1300); x.quadraticCurveTo(380 + sd * 90, 900, 380 + sd * 60, 640); x.closePath(); fs(x, '#f4f8fc', 12);
      x.save(); x.translate(380 + sd * 150, 860); x.rotate(-0.12); x.font = 'bold 58px "Lilita One"'; x.textAlign = 'center'; x.lineWidth = 8; x.strokeStyle = '#ffffff'; x.strokeText('GAS', 0, 0); x.fillStyle = '#c8304a'; x.fillText('GAS', 0, 0); x.restore(); }
    x.beginPath(); x.moveTo(240, 600); x.quadraticCurveTo(380, 470, 520, 600); x.quadraticCurveTo(380, 560, 240, 600); fs(x, '#e8eef8', 10);
    for (let i = 0; i < 9; i++) { x.beginPath(); x.arc(100 + i * 70, 1320 + (i % 2) * 70 + Math.sin(i * 1.7) * 30, 110 - (i % 3) * 18, 0, 7); fs(x, i % 2 ? '#d8b8f0' : '#eef4ff', 8); }
    for (let i = 0; i < 6; i++) { x.beginPath(); x.arc(170 + i * 85, 1560 + (i % 2) * 50, 120 - (i % 2) * 20, 0, 7); fs(x, i % 2 ? '#eef4ff' : '#d8b8f0', 8); }
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
  if (L.whiteChest) { x.beginPath(); x.moveTo(320, 650); x.quadraticCurveTo(380, 720, 440, 650); x.lineTo(470, 1040); x.quadraticCurveTo(380, 1080, 290, 1040); x.closePath(); fs(x, '#f8f6f0', 6); x.strokeStyle = 'rgba(160,150,140,0.5)'; x.lineWidth = 4; for (let i = 0; i < 8; i++) { x.beginPath(); x.moveTo(330 + (i % 4) * 30, 760 + Math.floor(i / 4) * 120); x.lineTo(340 + (i % 4) * 30, 800 + Math.floor(i / 4) * 120); x.stroke(); } }
  if (L.leopardSpots && L.top === 'bare') { x.save(); x.beginPath(); x.moveTo(236, 1090); x.lineTo(232, 720); x.quadraticCurveTo(236, 650, 300, 638); x.lineTo(460, 638); x.quadraticCurveTo(524, 650, 528, 720); x.lineTo(524, 1090); x.closePath(); x.clip(); x.lineWidth = 7; x.strokeStyle = L.spotCol || '#5a3a1a'; for (let i = 0; i < 18; i++) { const sx = 250 + (i * 71) % 270, sy = 680 + ((i * 113) % 380); if (L.whiteChest && sx > 300 && sx < 460) continue; x.beginPath(); x.ellipse(sx, sy, 22, 16, i, 0, 5.5); x.stroke(); } x.restore(); }
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
  if (L.fit) { x.translate(380, 1635); x.scale(L.fit, L.fit); x.translate(-380, -1635); }
  if (L.cape) drawCape(x, L);
  if (L.hairStyle === 'long') { // long wavy hair hanging behind the head down past the shoulders
    x.beginPath(); x.moveTo(380, 100); x.bezierCurveTo(60, 100, 90, 500, 110, 700); for (let i = 0; i < 7; i++) x.quadraticCurveTo(140 + i * 80, 800 + (i % 2) * 40, 180 + i * 80, 760 + (i % 2 ? 0 : 50));
    x.bezierCurveTo(670, 500, 700, 100, 380, 100); x.closePath(); fs(x, L.hair, 12);
  }
  if (L.hairStyle === 'redMane') { x.beginPath(); x.moveTo(100, 1500); x.bezierCurveTo(60, 400, 80, 60, 380, 50); x.bezierCurveTo(680, 60, 700, 400, 660, 1500); x.closePath(); fs(x, L.hair, 12); }
  if (L.cloakCol) drawCloak(x, L);
  if (L.drumRing) { x.beginPath(); x.arc(380, 260, 420, Math.PI * 0.95, Math.PI * 2.05); x.lineWidth = 16; x.strokeStyle = '#8aa8c8'; x.stroke(); for (const a of [1.05, 1.35, 1.65, 1.95]) { const dx = 380 + Math.cos(a * Math.PI) * 420, dy = 260 + Math.sin(a * Math.PI) * 420; x.beginPath(); x.arc(dx, dy, 80, 0, 7); fs(x, '#f4ead2', 10); x.fillStyle = OL; for (let k = 0; k < 3; k++) { const b = k / 3 * 6.283; x.beginPath(); x.arc(dx + Math.cos(b) * 28, dy + Math.sin(b) * 28, 26, b, b + 2.4); x.lineTo(dx, dy); x.fill(); } } }
  if (L.swans) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 120, 700); x.quadraticCurveTo(380 + sd * 320, 500, 380 + sd * 260, 160); x.lineWidth = 44; x.strokeStyle = OL; x.stroke(); x.lineWidth = 32; x.strokeStyle = '#ffffff'; x.stroke(); x.beginPath(); x.ellipse(380 + sd * 280, 150, 46, 34, 0, 0, 7); fs(x, '#ffffff', 8); x.beginPath(); x.moveTo(380 + sd * 310, 140); x.lineTo(380 + sd * 420, 120); x.lineTo(380 + sd * 310, 165); x.closePath(); fs(x, '#e8c84a', 6); }
  if (L.longWild) { x.beginPath(); x.moveTo(380, 120); const pts = [[150, 160], [60, 330], [120, 380], [20, 560], [110, 560], [60, 760], [200, 640], [230, 800], [300, 620], [460, 620], [530, 800], [560, 640], [700, 760], [650, 560], [740, 560], [640, 380], [700, 330], [610, 160]]; for (const [px, py] of pts) x.lineTo(px, py); x.closePath(); fs(x, L.hair, 10); }
  if (L.twinTails) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 200, 200); x.bezierCurveTo(380 + sd * 380, 300, 380 + sd * 380, 900, 380 + sd * 300, 1150); x.lineTo(380 + sd * 230, 1100); x.bezierCurveTo(380 + sd * 280, 800, 380 + sd * 250, 400, 380 + sd * 150, 260); x.closePath(); fs(x, L.hair, 10); }
  if (L.braids) crackerHair(x, L);
  if (L.sideCape) sideCape(x);
  if (L.crackerLegs) crackerLegs(x, L); else drawLegs(x, L);
  drawTorso(x, L);
  if (L.crackerBelt) crackerBelt(x);
  // ---- neck ----
  x.beginPath(); x.moveTo(325, 520); x.lineTo(325, 636); x.quadraticCurveTo(380, 660, 435, 636); x.lineTo(435, 520); x.closePath(); fs(x, L.skin, 10);
  x.beginPath(); x.moveTo(330, 560); x.quadraticCurveTo(380, 600, 430, 560); x.lineTo(430, 530); x.lineTo(330, 530); x.closePath(); x.fillStyle = L.skinD; x.fill();
  if (L.beads) for (let i = 0; i < 13; i++) { const a = Math.PI * (0.15 + 0.7 * i / 12); x.beginPath(); x.arc(380 - Math.cos(a) * 95, 640 + Math.sin(a) * 70, 15, 0, 7); fs(x, '#d8342c', 6); }
  if (L.tallDome) { x.beginPath(); x.moveTo(200, 260); x.bezierCurveTo(190, -260, 570, -260, 560, 260); x.closePath(); fs(x, L.skin, 12); x.strokeStyle = L.skinD; x.lineWidth = 6; for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(290, -40 + i * 40); x.quadraticCurveTo(380, -60 + i * 40, 470, -40 + i * 40); x.stroke(); } }
  // ---- ears + head ----
  for (const ex of [168, 592]) { x.beginPath(); x.ellipse(ex, 345, 34, 50, 0, 0, 7); fs(x, L.skin, 11); }
  const head = L.longFace ? () => { x.beginPath(); x.moveTo(178, 320); x.bezierCurveTo(178, 105, 582, 105, 582, 320); x.bezierCurveTo(582, 520, 500, 650, 380, 656); x.bezierCurveTo(260, 650, 178, 520, 178, 320); x.closePath(); }
    : () => { x.beginPath(); x.moveTo(168, 320); x.bezierCurveTo(168, 115, 592, 115, 592, 320); x.bezierCurveTo(592, 470, 520, 560, 380, 566); x.bezierCurveTo(240, 560, 168, 470, 168, 320); x.closePath(); };
  head(); fs(x, L.skin, 12);
  if (L.sideburns) { x.save(); head(); x.clip(); x.fillStyle = L.hair; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 215, 200); x.lineTo(380 + sd * 160, 200); x.quadraticCurveTo(380 + sd * 165, 380, 380 + sd * 150, 520); x.lineTo(380 + sd * 205, 470); x.closePath(); x.fill(); } x.restore(); head(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
  if (L.thinBurns) { x.save(); head(); x.clip(); x.fillStyle = L.hair; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 205, 200); x.lineTo(380 + sd * 168, 210); x.quadraticCurveTo(380 + sd * 160, 360, 380 + sd * 150, 470); x.lineTo(380 + sd * 172, 478); x.quadraticCurveTo(380 + sd * 190, 360, 380 + sd * 205, 200); x.closePath(); x.fill(); } x.restore(); head(); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
  if (L.wrinkles) { x.strokeStyle = L.skinD; x.lineWidth = 6; x.lineCap = 'round'; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 70, 445); x.quadraticCurveTo(380 + sd * 95, 500, 380 + sd * 80, 545); x.stroke(); } x.beginPath(); x.moveTo(320, 235); x.lineTo(440, 235); x.moveTo(335, 255); x.lineTo(425, 255); x.stroke(); }
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
  if (L.shadesOrange) { for (const ex of [285, 475]) { x.beginPath(); x.ellipse(ex, 360, 78, 56, 0, 0, 7); fs(x, 'rgba(240,130,60,0.85)', 9); x.beginPath(); x.moveTo(ex - 40, 330); x.lineTo(ex - 10, 330); x.lineWidth = 7; x.strokeStyle = 'rgba(255,255,255,0.7)'; x.stroke(); } x.beginPath(); x.moveTo(363, 352); x.lineTo(397, 352); x.lineWidth = 9; x.strokeStyle = OL; x.stroke(); }
  if (L.stubble) { x.fillStyle = 'rgba(40,30,30,0.45)'; for (let i = 0; i < 40; i++) { const a = Math.PI * (0.15 + 0.7 * (i % 20) / 19), r = 150 + (i % 2) * 25; x.beginPath(); x.arc(380 + Math.cos(a) * r, 420 + Math.sin(a) * r * 0.75, 4, 0, 7); x.fill(); } }
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
  if (L.vegaStache) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(385, 462); x.quadraticCurveTo(385 + sd * 90, 440, 385 + sd * 150, 500); x.quadraticCurveTo(385 + sd * 80, 490, 385, 490); x.closePath(); fs(x, '#f4f4f8', 7); }
  if (L.tongue) { x.beginPath(); x.moveTo(350, 490); x.quadraticCurveTo(330, 760, 385, 820); x.quadraticCurveTo(440, 760, 420, 490); x.closePath(); fs(x, '#f07890', 8); }
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
  } else if (L.hairStyle === 'vegaHair') { // wild white tufts on both sides of a bald head
    for (const sd of [-1, 1]) { x.moveTo(380 + sd * 170, 120); for (let i = 0; i <= 8; i++) { const a = -0.9 + i * 0.25; x.lineTo(380 + sd * (200 + (i % 2 ? 150 : 90)) * Math.cos(a * 0.6), 280 + Math.sin(a) * 260); } x.lineTo(380 + sd * 180, 480); x.closePath(); }
  } else if (L.hairStyle === 'updo') { // hair pulled up into a high bun with a long fringe
    x.moveTo(160, 360); x.bezierCurveTo(130, 110, 630, 110, 600, 360); x.quadraticCurveTo(560, 230, 420, 230); x.quadraticCurveTo(300, 250, 230, 330); x.lineTo(210, 420); x.closePath();
    x.moveTo(280, 150); x.bezierCurveTo(250, 0, 510, 0, 480, 150); x.closePath();
  } else if (L.hairStyle === 'three') { // black hair shaped into a big 3 on top
    x.moveTo(180, 300); x.bezierCurveTo(170, 150, 590, 150, 580, 300); x.quadraticCurveTo(380, 240, 180, 300); x.closePath();
    x.moveTo(340, 200); x.lineTo(420, 200); x.lineTo(420, 130); x.closePath();
  } else if (L.hairStyle === 'dreads') { // wild spiky black dreads
    x.moveTo(170, 330); for (let i = 0; i <= 16; i++) { const a = Math.PI * (1.0 + i / 16), r = i % 2 ? 300 : 230; x.lineTo(380 + Math.cos(a) * r, 300 + Math.sin(a) * r * 0.9); } x.lineTo(590, 330); x.quadraticCurveTo(380, 230, 170, 330); x.closePath();
  } else if (L.hairStyle === 'redMane') { // huge long red hair with a spiky fringe hanging to the floor
    x.moveTo(100, 1500); x.bezierCurveTo(60, 400, 80, 60, 380, 50); x.bezierCurveTo(680, 60, 700, 400, 660, 1500); x.lineTo(560, 1500); x.lineTo(580, 300); x.lineTo(180, 300); x.lineTo(200, 1500); x.closePath();
    x.moveTo(170, 300); for (let i = 0; i <= 10; i++) x.lineTo(170 + i * 42, i % 2 ? 250 : 320); x.closePath();
  } else if (L.hairStyle === 'twinFringe') { // pink straight fringe and long sides
    x.moveTo(150, 520); x.bezierCurveTo(110, 80, 650, 80, 610, 520); x.lineTo(560, 520); x.lineTo(570, 300); x.lineTo(190, 300); x.lineTo(200, 520); x.closePath();
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
  if (L.leopardSpots) { x.fillStyle = L.spotCol || '#5a3a1a'; for (const [sx, sy] of [[230, 240], [530, 250], [210, 440], [550, 450], [300, 180], [460, 180]]) { x.beginPath(); x.ellipse(sx, sy, 16, 12, 0.4, 0, 7); x.fill(); } }
  if (L.eyePatch) { x.beginPath(); x.ellipse(475, 360, 70, 56, 0, 0, 7); fs(x, '#1b1530', 8); x.beginPath(); x.moveTo(170, 250); x.lineTo(590, 410); x.lineWidth = 12; x.strokeStyle = '#1b1530'; x.stroke(); }
  if (L.blueMouth) { x.beginPath(); x.ellipse(385, 480, 120, 80, 0, 0, 7); x.fillStyle = 'rgba(120,170,210,0.45)'; x.fill(); x.fillStyle = 'rgba(60,90,130,0.5)'; for (let i = 0; i < 18; i++) { x.beginPath(); x.arc(300 + (i * 37) % 170, 430 + (i * 23) % 100, 4, 0, 7); x.fill(); } }
  if (L.pinkNose) { x.beginPath(); x.arc(390, 420, 48, 0, 7); fs(x, '#f49ab0', 8); }
  if (L.cigar) { x.save(); x.translate(440, 500); x.rotate(0.2); rrect(x, 0, -14, 130, 28, 10); fs(x, '#8a5a3c', 6); x.fillStyle = '#d9b44a'; x.fillRect(10, -14, 16, 28); x.restore(); x.lineWidth = 10; x.strokeStyle = 'rgba(240,240,250,0.85)'; x.beginPath(); x.moveTo(580, 510); x.quadraticCurveTo(620, 420, 590, 360); x.quadraticCurveTo(560, 300, 610, 240); x.stroke(); }
  if (L.faceMask) { x.beginPath(); x.moveTo(200, 410); x.quadraticCurveTo(385, 380, 570, 410); x.bezierCurveTo(560, 540, 480, 580, 385, 584); x.bezierCurveTo(290, 580, 210, 540, 200, 410); x.closePath(); fs(x, '#f4f4f8', 9); x.strokeStyle = 'rgba(120,120,140,0.6)'; x.lineWidth = 5; for (const yy of [450, 490, 530]) { x.beginPath(); x.moveTo(250, yy); x.lineTo(520, yy); x.stroke(); } }
  if (L.metalJaw) { x.beginPath(); x.moveTo(230, 450); x.lineTo(530, 450); x.lineTo(500, 600); x.lineTo(260, 600); x.closePath(); fs(x, '#a8b0c0', 10); x.strokeStyle = OL; x.lineWidth = 6; for (let k = 0; k < 6; k++) { x.beginPath(); x.moveTo(270 + k * 45, 470); x.lineTo(275 + k * 45, 585); x.stroke(); } x.beginPath(); x.moveTo(240, 520); x.lineTo(520, 520); x.stroke(); }
  if (L.kabuki) { x.strokeStyle = '#d8343a'; x.lineWidth = 12; x.lineCap = 'round'; for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 60, 290); x.quadraticCurveTo(380 + sd * 150, 250, 380 + sd * 200, 300); x.stroke(); x.beginPath(); x.moveTo(380 + sd * 60, 420); x.quadraticCurveTo(380 + sd * 140, 470, 380 + sd * 190, 430); x.stroke(); } }
  if (L.paleFace) { x.fillStyle = 'rgba(255,90,90,0.5)'; for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 140, 440, 28, 0, 7); x.fill(); } }
  if (L.ohMouth) { x.beginPath(); x.ellipse(380, 492, 70, 26, 0, 0, 7); x.fillStyle = L.skin; x.fill(); x.beginPath(); x.ellipse(380, 500, 52, 34, 0, 0, 7); fs(x, '#5a1a2a', 9); x.beginPath(); x.ellipse(380, 484, 40, 10, 0, 0, Math.PI); x.fillStyle = '#ffffff'; x.fill(); x.beginPath(); x.ellipse(380, 500, 58, 40, 0, 0, 7); x.lineWidth = 12; x.strokeStyle = '#8a4a3a'; x.stroke(); }
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
  if (L.catEars) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 120, 150); x.lineTo(380 + sd * 230, -40); x.lineTo(380 + sd * 260, 180); x.closePath(); fs(x, L.skin, 10); x.beginPath(); x.moveTo(380 + sd * 150, 140); x.lineTo(380 + sd * 225, 20); x.lineTo(380 + sd * 240, 160); x.closePath(); x.fillStyle = L.skinD; x.fill(); }
  if (L.hat === 'sailorCap') { x.beginPath(); x.ellipse(380, 170, 230, 70, 0, 0, 7); fs(x, '#ffffff', 12); rrect(x, 200, 150, 360, 70, 30); fs(x, '#ffffff', 11); x.fillStyle = '#2a5ab8'; x.fillRect(205, 196, 350, 18); }
  if (L.hat === 'headset') { x.beginPath(); x.arc(380, 300, 250, Math.PI * 1.05, Math.PI * 1.95); x.lineWidth = 30; x.strokeStyle = '#d9dce6'; x.stroke(); x.lineWidth = 6; x.strokeStyle = OL; x.stroke(); for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 240, 330, 40, 70, 0, 0, 7); fs(x, '#ffcf3a', 9); } x.beginPath(); x.arc(380, 40, 26, 0, 7); fs(x, '#5affe0', 7); }
  if (L.hat === 'fedora') { x.beginPath(); x.ellipse(380, 170, 300, 56, 0, 0, 7); fs(x, '#1b1820', 12); x.beginPath(); x.moveTo(230, 175); x.bezierCurveTo(230, -10, 530, -10, 530, 175); x.closePath(); fs(x, '#1f1c26', 12); x.beginPath(); x.moveTo(380, 30); x.lineTo(380, 90); x.lineWidth = 10; x.strokeStyle = '#14121a'; x.stroke(); }
  if (L.appleHat) { const top = L.tallDome ? -175 : 60; x.beginPath(); x.moveTo(380, top); x.lineTo(380, top - 150); x.lineWidth = 16; x.strokeStyle = '#8a5a3c'; x.stroke(); x.beginPath(); x.moveTo(230, top - 150); x.bezierCurveTo(200, top - 320, 330, top - 330, 380, top - 270); x.bezierCurveTo(430, top - 330, 560, top - 320, 530, top - 150); x.closePath(); fs(x, '#d8343a', 10); x.beginPath(); x.ellipse(380, top - 150, 140, 22, 0, 0, 7); fs(x, '#a8242a', 8); x.beginPath(); x.ellipse(460, top - 310, 40, 18, -0.4, 0, 7); fs(x, '#7fc85a', 6); x.beginPath(); x.ellipse(300, top - 260, 30, 16, -0.5, 0, 7); x.fillStyle = 'rgba(255,255,255,0.6)'; x.fill(); }
  if (L.hat === 'goggleCap') { x.beginPath(); x.moveTo(170, 250); x.bezierCurveTo(150, 20, 610, 20, 590, 250); x.closePath(); fs(x, '#22202e', 12); x.beginPath(); x.moveTo(250, 250); x.quadraticCurveTo(380, 330, 520, 250); x.lineTo(500, 230); x.quadraticCurveTo(380, 280, 270, 230); x.closePath(); fs(x, '#14121a', 8);
    for (const gx of [320, 440]) { x.beginPath(); x.arc(gx, 170, 46, 0, 7); fs(x, '#d9b44a', 9); x.beginPath(); x.arc(gx, 170, 30, 0, 7); fs(x, '#a8e8f0', 5); } x.beginPath(); x.moveTo(366, 170); x.lineTo(394, 170); x.lineWidth = 10; x.strokeStyle = OL; x.stroke(); }
  if (L.hat === 'crown2') { x.beginPath(); x.moveTo(240, 180); x.lineTo(240, 60); x.lineTo(310, 120); x.lineTo(380, 30); x.lineTo(450, 120); x.lineTo(520, 60); x.lineTo(520, 180); x.closePath(); fs(x, '#ffcf3a', 10); for (const gx of [310, 380, 450]) { x.beginPath(); x.arc(gx, 150, 14, 0, 7); fs(x, '#e8303c', 4); } }
  if (L.hat === 'beret') { x.beginPath(); x.ellipse(360, 150, 260, 90, -0.15, 0, 7); fs(x, '#c0392b', 12); x.beginPath(); x.moveTo(360, 70); x.lineTo(360, 40); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
  if (L.hat === 'mechCap') { x.beginPath(); x.moveTo(180, 230); x.bezierCurveTo(170, 60, 590, 60, 580, 230); x.closePath(); fs(x, '#3f6fb5', 12); x.beginPath(); x.ellipse(560, 230, 160, 40, 0.1, 0, 7); fs(x, '#2a4f8a', 10); }
  if (L.hat === 'hippoHood') { x.beginPath(); x.moveTo(110, 520); x.bezierCurveTo(60, 20, 700, 20, 650, 520); x.lineTo(590, 520); x.bezierCurveTo(610, 200, 150, 200, 170, 520); x.closePath(); fs(x, '#f0ece0', 12); x.beginPath(); x.ellipse(380, 120, 170, 70, 0, 0, 7); fs(x, '#f0ece0', 9); for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 130, 70, 32, 0, 7); fs(x, '#f0ece0', 7); x.beginPath(); x.arc(380 + sd * 50, 130, 10, 0, 7); x.fillStyle = OL; x.fill(); } for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 170, 300); x.quadraticCurveTo(380 + sd * 280, 330, 380 + sd * 300, 260); x.lineWidth = 26; x.strokeStyle = '#7a4ad8'; x.stroke(); } }
  if (L.hairStyle === 'three') { x.save(); x.font = 'bold 300px serif'; x.textAlign = 'center'; x.lineWidth = 16; x.strokeStyle = OL; x.strokeText('3', 400, 150); x.fillStyle = '#1d1a22'; x.fillText('3', 400, 140); x.fillStyle = '#5cc45a'; x.fillRect(370, 120, 60, 18); x.restore(); }
  if (L.hat === 'enelCloth') { x.beginPath(); x.moveTo(170, 260); x.bezierCurveTo(160, 60, 600, 60, 590, 260); x.quadraticCurveTo(380, 220, 170, 260); x.closePath(); fs(x, '#f8f8fc', 11); }
  if (L.longLobes) for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 215, 470, 30, 140, 0, 0, 7); fs(x, L.skin, 9); x.beginPath(); x.arc(380 + sd * 215, 600, 16, 0, 7); fs(x, '#d9b44a', 5); }
  if (L.sunglassesUp) for (const sd of [-1, 1]) { x.beginPath(); x.ellipse(380 + sd * 70, 150, 60, 36, 0, 0, 7); fs(x, '#f07030', 8); }
  if (L.hat === 'goldCrown') { x.beginPath(); x.moveTo(250, 140); x.lineTo(250, 20); x.lineTo(320, 70); x.lineTo(380, -10); x.lineTo(440, 70); x.lineTo(510, 20); x.lineTo(510, 140); x.closePath(); fs(x, '#f4c830', 10); x.beginPath(); x.arc(560, 30, 70, 0, 7); fs(x, '#b040c8', 8); }
  if (L.sideTufts) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 200, 220); for (let i = 0; i < 5; i++) x.lineTo(380 + sd * (260 + (i % 2) * 80), 200 + i * 50); x.lineTo(380 + sd * 200, 420); x.closePath(); fs(x, '#b040c8', 8); }
  if (L.hat === 'chopperHat') { if (L.antlers) for (const sd of [-1, 1]) { x.lineCap = 'round'; x.lineWidth = 36; x.strokeStyle = OL; const path = () => { x.beginPath(); x.moveTo(380 + sd * 200, 120); x.lineTo(380 + sd * 330, -60); x.moveTo(380 + sd * 270, 30); x.lineTo(380 + sd * 380, 30); x.moveTo(380 + sd * 300, -10); x.lineTo(380 + sd * 260, -120); }; path(); x.stroke(); x.lineWidth = 24; x.strokeStyle = '#8a5a30'; path(); x.stroke(); }
    x.beginPath(); x.moveTo(140, 300); x.bezierCurveTo(130, -60, 630, -60, 620, 300); x.closePath(); fs(x, '#e8607a', 12); rrect(x, 120, 250, 520, 90, 30); fs(x, '#c84862', 11); x.strokeStyle = '#ffffff'; x.lineWidth = 30; x.lineCap = 'round'; x.beginPath(); x.moveTo(330, 90); x.lineTo(430, 190); x.moveTo(430, 90); x.lineTo(330, 190); x.stroke(); }
  if (L.blueNose) { x.beginPath(); x.ellipse(390, 430, 26, 18, 0, 0, 7); fs(x, '#3f6fd8', 6); }
  if (L.hat === 'peronaCrown') { rrect(x, 290, 0, 180, 110, 10); fs(x, '#1b1530', 9); x.fillStyle = '#d8343a'; for (let k = 0; k < 4; k++) x.fillRect(305 + k * 42, 10, 20, 90); rrect(x, 280, 100, 200, 30, 8); fs(x, '#e8c84a', 6); }
  if (L.bullHorns) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 170); x.quadraticCurveTo(380 + sd * 380, 120, 380 + sd * 330, -170); x.quadraticCurveTo(380 + sd * 300, 40, 380 + sd * 110, 120); x.closePath(); fs(x, '#e8e4d8', 9); }
  if (L.dreadMane) { for (let i = 0; i < 16; i++) { const a = Math.PI * (1.02 + i / 15 * 0.96), r1 = 200, r2 = 300 + (i % 3) * 40; x.beginPath(); x.moveTo(380 + Math.cos(a) * r1, 300 + Math.sin(a) * r1); x.quadraticCurveTo(380 + Math.cos(a + 0.15) * (r2 - 40), 300 + Math.sin(a + 0.15) * (r2 - 40), 380 + Math.cos(a) * r2, 300 + Math.sin(a) * r2); x.lineCap = 'round'; x.lineWidth = 34; x.strokeStyle = OL; x.stroke(); x.lineWidth = 22; x.strokeStyle = L.hair; x.stroke(); } }
  if (L.furNeck) { for (let r = 0; r < 4; r++) { x.beginPath(); for (let i = 0; i <= 18; i++) { const a = Math.PI * (i / 18), rr = (r % 2 ? 1.0 : 0.92); x.lineTo(380 + Math.cos(a) * 280 * rr, 600 - r * 55 + Math.sin(a) * 60 * rr + (i % 2) * 14); } for (let i = 18; i >= 0; i--) { const a = Math.PI * (i / 18); x.lineTo(380 + Math.cos(a) * 260, 600 - r * 55 + 30 + Math.sin(a) * 40); } x.closePath(); fs(x, r % 2 ? '#1b1820' : '#f4ecd8', 7); } }
  if (L.goatHorns) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 50, 120); x.quadraticCurveTo(380 + sd * 40, -40, 380 + sd * 150, -70); x.quadraticCurveTo(380 + sd * 90, -10, 380 + sd * 100, 130); x.closePath(); fs(x, '#a89a4a', 8); }
  if (L.redHorns) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 120, 150); x.quadraticCurveTo(380 + sd * 260, 60, 380 + sd * 200, -80); x.quadraticCurveTo(380 + sd * 190, 40, 380 + sd * 90, 110); x.closePath(); fs(x, '#d8303a', 9); }
  if (L.moriaHead) { x.beginPath(); x.moveTo(330, 150); x.quadraticCurveTo(320, 30, 400, -10); x.quadraticCurveTo(390, 80, 440, 150); x.closePath(); fs(x, '#9a3ab0', 9); for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 150, 140); x.lineTo(380 + sd * 230, 60); x.lineTo(380 + sd * 180, 180); x.closePath(); fs(x, '#f8f8fc', 7); x.beginPath(); x.moveTo(380 + sd * 220, 300); x.lineTo(380 + sd * 320, 230); x.lineTo(380 + sd * 230, 380); x.closePath(); fs(x, L.skin, 7); } }
  if (L.hat === 'bucketHat') { x.beginPath(); x.moveTo(190, 250); x.bezierCurveTo(180, 40, 580, 40, 570, 250); x.closePath(); fs(x, '#f08a30', 12); rrect(x, 150, 230, 460, 40, 16); fs(x, '#d86a20', 9); }
  if (L.pompoms) for (const sd of [-1, 1]) { x.beginPath(); x.arc(380 + sd * 150, 100, 50, 0, 7); fs(x, '#f8f8fc', 8); }
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
    if (!L.noGoggles) for (const gx of [330, 430]) { x.beginPath(); x.arc(gx, 62, 34, 0, 7); fs(x, '#9bd6ff', 10); x.beginPath(); x.arc(gx - 10, 52, 9, 0, 7); x.fillStyle = '#fff'; x.fill(); }
    if (!L.noGoggles) { x.beginPath(); x.moveTo(364, 62); x.lineTo(396, 62); x.lineWidth = 12; x.strokeStyle = OL; x.stroke(); }
  }
  drawArms(x, L, pose);
  if (L.shoulderPad) shoulderPad(x);
  if (L.spikeCuffs) for (const hx of [[160, 1070], [600, 1070]]) { rrect(x, hx[0] - 55, hx[1] - 30, 110, 50, 12); fs(x, '#3a3a4a', 7); for (let k = 0; k < 4; k++) { x.beginPath(); x.moveTo(hx[0] - 45 + k * 30, hx[1] - 30); x.lineTo(hx[0] - 30 + k * 30, hx[1] - 70); x.lineTo(hx[0] - 15 + k * 30, hx[1] - 30); x.closePath(); fs(x, '#c8b040', 5); } }
  if (L.dragonSleeve && (POSES[pose] || POSES.idle).R[1][1] > 1000) { x.save(); x.beginPath(); x.rect(500, 690, 80, 300); x.clip(); for (let r = 0; r < 6; r++) for (let k = 0; k < 2; k++) { x.beginPath(); x.arc(515 + k * 40 + (r % 2) * 20, 720 + r * 45, 22, 0, Math.PI); x.fillStyle = '#e8702e'; x.fill(); x.lineWidth = 4; x.strokeStyle = '#a03a1a'; x.stroke(); } x.restore(); }
  if (L.whiskers) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 40, 470); x.bezierCurveTo(380 + sd * 160, 520, 380 + sd * 40, 760, 380 + sd * 150, 900); x.bezierCurveTo(380 + sd * 220, 980, 380 + sd * 120, 1040, 380 + sd * 170, 1080); x.lineCap = 'round'; x.lineWidth = 16; x.strokeStyle = OL; x.stroke(); x.lineWidth = 9; x.strokeStyle = '#2a2028'; x.stroke(); }
  if (L.furScarf) for (let r = 0; r < 4; r++) { const y = 640 - r * 52; x.beginPath(); for (let i = 0; i <= 22; i++) { const a = Math.PI * (i / 22), w = 300 - r * 30; x.lineTo(380 - Math.cos(a) * w, y + Math.sin(a) * 50 + ((i % 2) ? 22 : 0)); } for (let i = 22; i >= 0; i--) { const a = Math.PI * (i / 22), w = 280 - r * 30; x.lineTo(380 - Math.cos(a) * w, y - 50 + Math.sin(a) * 30 - ((i % 2) ? 18 : 0)); } x.closePath(); fs(x, r % 2 ? '#1b1820' : '#f4ecd8', 7); }
  if (L.coatSleeves) for (const sd of [-1, 1]) { x.beginPath(); x.moveTo(380 + sd * 230, 700); x.quadraticCurveTo(380 + sd * 330, 900, 380 + sd * 320, 1130); x.lineTo(380 + sd * 240, 1140); x.quadraticCurveTo(380 + sd * 250, 920, 380 + sd * 200, 730); x.closePath(); fs(x, L.cloakCol || '#f4f4f8', 10); rrect(x, 380 + sd * 280 - 48, 1110, 96, 70, 16); fs(x, '#f4e070', 8); }
  if (L.metalArm) { x.save(); x.translate(560, 720); for (let i = 0; i < 4; i++) { rrect(x, -50, i * 100, 110, 90, 16); fs(x, '#c8ccd8', 9); x.beginPath(); x.arc(5, i * 100 + 45, 14, 0, 7); fs(x, '#8a8fa0', 4); } rrect(x, -70, 400, 150, 130, 24); fs(x, '#c8ccd8', 10); x.restore(); }
  if (L.umbrella) { x.save(); x.translate(640, 640); x.beginPath(); x.moveTo(0, 0); x.lineTo(60, -440); x.lineWidth = 12; x.strokeStyle = '#d8dce8'; x.stroke(); x.translate(60, -440); x.beginPath(); x.arc(0, 0, 260, Math.PI * 1.05, Math.PI * 1.95); x.closePath(); fs(x, '#f4e040', 10); x.strokeStyle = '#5a4ad8'; x.lineWidth = 16; for (const r of [210, 140, 70]) { x.beginPath(); x.arc(0, 0, r, Math.PI * 1.05, Math.PI * 1.95); x.stroke(); } x.restore(); }
  if (L.armBand) { rrect(x, 480, 760, 90, 60, 8); fs(x, '#4a3a6a', 6); x.beginPath(); x.moveTo(500, 772); x.lineTo(550, 808); x.moveTo(550, 772); x.lineTo(500, 808); x.lineWidth = 6; x.strokeStyle = '#8a7ab0'; x.stroke(); }
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
  const glyphs = kind === '!?' ? [['!', -34, '#ff3b3b'], ['?', 34, '#ffd23f']] : kind === '?' ? [['?', 0, '#b07cff']] : kind === '!' ? [['!', 0, '#ff3b3b']] : [[kind, 0, '#7cc8ff']];
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
