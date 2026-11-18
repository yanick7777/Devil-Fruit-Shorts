// Three.js compositor: canvas-drawn billboard cards in a flat illustrated room,
// a perspective camera for punchy moves, and an orthographic HUD for captions.
import * as THREE from 'three';
import * as D from './draw.js';

const W = 1080, H = 1920, FOV = 30;
const DIST = (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
const ease = {
  outCubic: (t) => 1 - Math.pow(1 - t, 3),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: (t) => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
  outBounce: (t) => { const n = 7.5625, d = 2.75; if (t < 1 / d) return n * t * t; if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75; if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375; return n * (t -= 2.625 / d) * t + 0.984375; },
};
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, a, b) => clamp01((t - a) / (b - a));
const hash = (n) => { const s = Math.sin(n * 127.1) * 43758.5453; return s - Math.floor(s); };

let renderer, scene, cam, hud, hudCam, TL, M = {}, texCache = new Map();

function tex(canvas) {
  let t = texCache.get(canvas);
  if (!t) { t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; texCache.set(canvas, t); }
  return t;
}
function card(canvas, order) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: tex(canvas), transparent: true, depthTest: false, depthWrite: false }));
  m.renderOrder = order; m.userData.z = 0; setMap(m, canvas); return m;
}
function setMap(m, canvas) { m.material.map = tex(canvas); m.userData.cw = canvas.width; m.userData.ch = canvas.height; }
// place a card by screen-design coords (center sx, sy in 1080x1920 px), at depth z; it lands
// exactly at those pixels when the camera is at rest, so parallax only appears when it moves.
function place(m, sx, sy, z, s = 1, rot = 0) {
  const k = (DIST - z) / DIST;
  m.position.set((sx - W / 2) * k, (H / 2 - sy) * k, z);
  m.scale.set(m.userData.cw * s * k, m.userData.ch * s * k, 1);
  m.rotation.z = rot;
}

const memo = {};
function cached(key, fn) { return memo[key] || (memo[key] = fn()); }

export async function init(timeline) {
  TL = timeline;
  await document.fonts.load(`100px "Lilita One"`);
  const canvas = document.getElementById('c');
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.autoClear = false;
  scene = new THREE.Scene(); scene.background = new THREE.Color('#9fb8c9');
  cam = new THREE.PerspectiveCamera(FOV, W / H, 10, 20000);
  hud = new THREE.Scene(); hudCam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -10, 10);

  M.wall = card(D.drawWall(1700, 2700), 0);
  M.panel = card(D.drawPanel(960, 1260), 1);
  M.banner = card(cached('b:' + TL.scenes[0].banner, () => D.drawBanner(TL.scenes[0].banner)), 2);
  M.fxBackC = D.mk(W, H); M.fxBack = card(M.fxBackC, 3);
  M.char = card(D.drawCharacter({}), 4);
  M.desk = card(D.drawDesk(1700, 640, 950), 5);
  M.fruit = card(D.drawFruit(), 6);
  M.fxFrontC = D.mk(W, H); M.fxFront = card(M.fxFrontC, 7);
  Object.values(M).forEach((m) => m.isMesh && scene.add(m));

  M.capC = D.mk(W, 420); M.cap = card(M.capC, 10); hud.add(M.cap);
  M.cap.position.set(0, H / 2 - 1215, 0); M.cap.scale.set(W, 420, 1);
  const vg = D.mk(W, H), vx = vg.getContext('2d'); const g = vx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.72);
  g.addColorStop(0, 'rgba(20,10,30,0)'); g.addColorStop(1, 'rgba(20,10,30,0.32)'); vx.fillStyle = g; vx.fillRect(0, 0, W, H);
  M.vig = card(vg, 9); M.vig.scale.set(W, H, 1); hud.add(M.vig);
  M.flash = new THREE.Mesh(new THREE.PlaneGeometry(W, H), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, depthTest: false }));
  M.flash.renderOrder = 11; hud.add(M.flash);
  // caption chunks: break after punctuation or every 3 words
  for (const sc of TL.scenes) {
    sc.chunks = []; let cur = [];
    sc.words.forEach((w, i) => { cur.push(w); if (cur.length === 3 || /[.,!?]$/.test(w.w.replace(/\*/g, '')) || i === sc.words.length - 1) { sc.chunks.push(cur); cur = []; } });
  }
}

function sceneAt(T) {
  let i = TL.scenes.findIndex((s) => T >= s.start && T < s.start + s.dur);
  if (i < 0) i = TL.scenes.length - 1;
  return [TL.scenes[i], i];
}
const wordT = (sc, re) => { const w = sc.words.find((w) => re.test(w.w)); return w ? w.t : 0; };

// ---------------- per-frame ----------------
export function frame(T) {
  const [sc, si] = sceneAt(T), lt = T - sc.start, p = lt / sc.dur;
  const fb = M.fxBackC.getContext('2d'), ff = M.fxFrontC.getContext('2d');
  fb.clearRect(0, 0, W, H); ff.clearRect(0, 0, W, H);
  const st = { shake: 0, flash: 0, expr: sc.expr, charAlpha: 1, fruit: null };

  // ---------- static layout ----------
  place(M.wall, 540, 960, -900);
  place(M.panel, 420, 810, -250);
  const bTex = cached('b:' + sc.banner, () => D.drawBanner(sc.banner)); setMap(M.banner, bTex);
  const bp = ease.outBack(prog(lt, 0, 0.32));
  place(M.banner, 520, 370 + Math.sin(T * 2) * 4, -150, 0.95 * (0.6 + 0.4 * bp), -0.03 + Math.sin(T * 1.3) * 0.01);
  place(M.desk, 540, 1320 + 320, 60);

  // ---------- scene effects ----------
  (FX[sc.id] || (() => {}))(sc, lt, p, fb, ff, st, T);
  if (sc.fire) aura(fb, ff, T, lt, 1);

  // ---------- character ----------
  const speaking = lt > sc.voStart && lt < sc.voStart + sc.voDur;
  let mouth = 0;
  if (speaking) { const m = Math.abs(Math.sin(T * 13.5)) * (0.55 + 0.45 * Math.sin(T * 5.3 + 1)); mouth = m > 0.5 ? 1 : m > 0.18 ? 0.5 : 0; }
  const blink = (T % 3.3) < 0.11;
  const ck = `${sc.char}|${st.expr}|${mouth}|${blink}`;
  setMap(M.char, cached('c:' + ck, () => D.drawCharacter({ who: sc.char, expr: st.expr, mouth, blink })));
  const prev = TL.scenes[si - 1], swap = !prev || prev.char !== sc.char;
  const cp = swap ? ease.outBack(prog(lt, 0, 0.35)) : 1;
  const breathe = 1 + Math.sin(T * 2.4) * 0.008;
  place(M.char, 390, 900 + (1 - cp) * 120 + Math.sin(T * 2.4) * 3, 0, breathe * (0.85 + 0.15 * cp), Math.sin(T * 1.1) * 0.012);
  M.char.material.opacity = st.charAlpha;
  if (swap && si > 0) st.flash = Math.max(st.flash, 0.55 * (1 - prog(lt, 0, 0.18)));

  // ---------- fruit buddy ----------
  const f = st.fruit || fruitHome(T, sc);
  setMap(M.fruit, cached(`f:${f.mood}|${(T % 2.7) < 0.1}`, () => D.drawFruit({ mood: f.mood, blink: (T % 2.7) < 0.1 })));
  place(M.fruit, f.x, f.y, 90, f.s, f.r);
  M.fruit.visible = f.s > 0.01;

  M.fxBack.material.map.needsUpdate = true; M.fxFront.material.map.needsUpdate = true;
  place(M.fxBack, 540, 960, -60); place(M.fxFront, 540, 960, 120);

  // ---------- camera ----------
  const [a, b] = sc.cam, k = ease.inOut(clamp01(p));
  const zoom = lerp(a[0], b[0], k) * (1 + 0.09 * (1 - ease.outCubic(prog(lt, 0, 0.3))));
  const fx = lerp(a[1], b[1], k), fy = lerp(a[2], b[2], k);
  const sh = st.shake, fr = Math.round(T * 30);
  cam.position.set(fx - W / 2 + (hash(fr) - 0.5) * 40 * sh, H / 2 - fy + (hash(fr + 99) - 0.5) * 40 * sh, DIST / zoom);
  cam.rotation.set(0, 0, lerp(a[3], b[3], k) + (hash(fr + 7) - 0.5) * 0.03 * sh);

  // ---------- captions ----------
  drawCaption(sc, lt);
  M.flash.material.opacity = st.flash;

  renderer.clear(); renderer.render(scene, cam); renderer.clearDepth(); renderer.render(hud, hudCam);
}

function fruitHome(T, sc) {
  return { x: 800, y: 790 + Math.sin(T * 2.2) * 14, s: 0.82, r: Math.sin(T * 1.7) * 0.07, mood: sc.id === 'weakness' ? 'sad' : 'happy' };
}

// fire aura hugging the character's silhouette
function aura(fb, ff, T, lt, amt) {
  const a = ease.outCubic(prog(lt, 0, 0.4)) * amt;
  D.glow(fb, 390, 900, 520 * a, 'rgba(255,140,40,A)', 0.55);
  const pts = [];
  for (let i = 0; i <= 10; i++) { const ang = Math.PI * (1.02 + i * 0.096); pts.push([390 + Math.cos(ang) * 255, 820 + Math.sin(ang) * 270 + 30, 130]); }
  pts.push([150, 1180, 170], [630, 1180, 170], [110, 1300, 190], [670, 1300, 190], [230, 1110, 140], [550, 1110, 140]);
  pts.forEach(([x, y, h], i) => D.flame(fb, x, y + 30, h * 0.75 * a, h * 1.5 * a, T, i));
  for (let i = 0; i < 18; i++) { // embers
    const ph = (T * 0.5 + hash(i)) % 1, ex = 150 + hash(i + 3) * 500 + Math.sin(T * 3 + i) * 30, ey = 1300 - ph * 900;
    ff.globalAlpha = a * (1 - ph); ff.fillStyle = i % 2 ? '#ffd84a' : '#ff8a1d'; ff.beginPath(); ff.arc(ex, ey, 7 + hash(i) * 6, 0, 7); ff.fill();
  }
  ff.globalAlpha = 1;
  for (let i = 0; i < 5; i++) D.flame(ff, 140 + i * 130, 1365, 120 * a, 170 * a, T + 2, i + 30);
}

function popSticker(ctx, text, x, y, lt, t0, t1, o = {}) {
  if (lt < t0 || lt > t1) return;
  const s = ease.outBack(prog(lt, t0, t0 + 0.25)) * (1 - ease.outCubic(prog(lt, t1 - 0.12, t1)));
  D.sticker(ctx, text, x, y, { ...o, scale: s });
}

// ---------------- scene effects ----------------
const FX = {
  hook(sc, lt, p, fb, ff, st) {
    const dp = prog(lt, 0.3, 0.85);
    st.fruit = { x: 640, y: lerp(-300, 1312, ease.outBounce(dp)), s: 0.55, r: (1 - dp) * 0.6, mood: 'happy' };
    if (dp >= 1) D.sparkle(ff, 560 + Math.sin(lt * 8) * 6, 1150, 22 * prog(lt, 0.85, 1.1));
  },
  type(sc, lt, p, fb, ff, st, T) {
    const k = ease.inOut(prog(lt, 0, 0.6)), h = { x: 800, y: 790 + Math.sin(T * 2.2) * 14 };
    st.fruit = { x: lerp(640, h.x, k), y: lerp(1312, h.y, k) - Math.sin(k * Math.PI) * 200, s: lerp(0.55, 0.82, k), r: k * Math.PI * 2, mood: 'happy' };
    const tf = wordT(sc, /Flame/);
    popSticker(ff, 'LOGIA TYPE', 540, 1030, lt, 0.45, tf - 0.05, { bg: '#ff6fa8', rot: -0.06, size: 70 });
    popSticker(ff, 'FLAME-FLAME FRUIT', 540, 1030, lt, tf, sc.dur, { bg: '#ffb12e', rot: 0.04, size: 66 });
  },
  power(sc, lt, p, fb, ff) {
    const t1 = wordT(sc, /create/), t2 = wordT(sc, /control/), t3 = wordT(sc, /become/);
    popSticker(ff, 'CREATE', 540, 1030, lt, t1, t2, { bg: '#ffb12e', rot: -0.05, size: 76 });
    popSticker(ff, 'CONTROL', 540, 1030, lt, t2, t3, { bg: '#ff6fa8', rot: 0.05, size: 76 });
    popSticker(ff, 'BECOME FIRE', 540, 1030, lt, t3, sc.dur, { bg: '#e2361f', rot: -0.03, size: 76 });
  },
  intangible(sc, lt, p, fb, ff, st) {
    const sp = prog(lt, 0.3, 0.85);
    if (sp > 0 && sp < 1) { D.sword(ff, lerp(-350, 1400, sp), 820, 0.05); st.charAlpha = Math.abs(sp - 0.5) < 0.22 ? 0.55 : 1; }
    for (let i = 0; i < 3; i++) { const bp = prog(lt, 1.05 + i * 0.12, 1.5 + i * 0.12); if (bp > 0 && bp < 1) D.bullet(ff, lerp(-120, 1250, bp), 900 + i * 90); }
    if (lt > 1.15 && lt < 1.9) ['WHIFF!'].forEach(() => popSticker(ff, 'WHIFF!', 790, 640, lt, 1.2, 1.9, { bg: '#ffffff', fg: '#ff6fa8', rot: 0.12, size: 60 }));
    const th = wordT(sc, /Haki/);
    if (lt > th) { st.expr = 'shock'; st.shake = 0.8 * (1 - prog(lt, th, th + 0.35)); }
    popSticker(ff, 'HAKI CAN HIT YOU!', 540, 1030, lt, th, sc.dur, { bg: '#3b2556', rot: -0.05, size: 64 });
  },
  fist(sc, lt, p, fb, ff, st, T) {
    const a = ease.outBack(prog(lt, 0.0, 0.25));
    const len = ease.outCubic(prog(lt, 0.2, 0.7)) * 1000 * (1 - 0.15 * prog(lt, sc.dur - 0.5, sc.dur));
    st.shake = 1.2 * (1 - prog(lt, 0.2, 1.6));
    D.glow(fb, 700, 1000, 600 * (len / 1000), 'rgba(255,120,30,A)', 0.6);
    ff.save(); ff.translate(640, 1000); ff.rotate(Math.PI / 2 - 0.12);
    for (let i = 0; i < 6; i++) D.flame(ff, (hash(i) - 0.5) * 120, 40 + i * 20, 330 - i * 30, len * (1 - i * 0.08), T, i + 50);
    ff.restore();
    for (let i = 0; i < 14; i++) { const ph = (T * 1.4 + hash(i)) % 1; ff.fillStyle = '#ffd84a'; ff.globalAlpha = 1 - ph; ff.beginPath(); ff.arc(660 + ph * 600, 1000 + (hash(i + 5) - 0.5) * 300 - ph * 120, 10, 0, 7); ff.fill(); }
    ff.globalAlpha = 1;
    D.fist(ff, 610, 1010, 0.9 * a);
    st.fruit = { x: 860, y: 520 + Math.sin(T * 9) * 10, s: 0.62, r: 0.2, mood: 'happy' };
  },
  flies(sc, lt, p, fb, ff, st, T) {
    const te = wordT(sc, /explode/);
    for (let i = 0; i < 24; i++) {
      const born = 0.1 + hash(i) * 0.6, tb = te + hash(i + 40) * 0.5;
      if (lt < born) continue;
      const ang = hash(i + 1) * 6.28 + T * (0.6 + hash(i + 2) * 0.6), rad = 260 + hash(i + 3) * 230;
      const x = 420 + Math.cos(ang) * rad * 1.0, y = 860 + Math.sin(ang) * rad * 0.9 + Math.sin(T * 3 + i) * 20;
      if (lt < tb) {
        const s = ease.outBack(prog(lt, born, born + 0.3)), tw = 0.75 + 0.25 * Math.sin(T * 9 + i);
        D.glow(ff, x, y, 60 * s * tw, 'rgba(200,255,90,A)', 0.8);
        ff.beginPath(); ff.arc(x, y, 13 * s, 0, 7); ff.fillStyle = '#f4ffb0'; ff.fill(); ff.lineWidth = 5; ff.strokeStyle = D.OL; ff.stroke();
      } else {
        const e = prog(lt, tb, tb + 0.55);
        if (e < 1) { D.glow(ff, x, y, 160 * e + 30, 'rgba(255,150,40,A)', 1 - e); D.flame(ff, x, y + 50, 90 * (1 - e * 0.5), 150 * Math.sin(e * Math.PI) + 20, T, i); ff.beginPath(); ff.arc(x, y, 120 * e, 0, 7); ff.lineWidth = 10 * (1 - e); ff.strokeStyle = '#ffd84a'; ff.stroke(); }
      }
    }
    if (lt > te) st.shake = 0.6 * (1 - prog(lt, te, te + 0.9));
  },
  emperor(sc, lt, p, fb, ff, st, T) {
    const g = ease.outCubic(prog(lt, 0.1, sc.dur * 0.7)), th = prog(lt, sc.dur - 0.5, sc.dur);
    const r = (60 + 190 * g) * (1 + ease.outCubic(th) * 5), cy = lerp(400, 820, th);
    st.shake = 0.25 + 0.6 * g + th * 2;
    D.glow(fb, 540, cy, r * 2.4, 'rgba(255,150,40,A)', 0.7);
    for (let i = 0; i < 14; i++) { const ang = i / 14 * 6.283 + T * 0.8; ff.save(); ff.translate(540 + Math.cos(ang) * r * 0.82, cy + Math.sin(ang) * r * 0.82); ff.rotate(ang + Math.PI / 2); D.flame(ff, 0, 0, r * 0.55, r * 0.8, T, i); ff.restore(); }
    const gr = ff.createRadialGradient(540 - r * 0.3, cy - r * 0.3, r * 0.1, 540, cy, r);
    gr.addColorStop(0, '#fff6b0'); gr.addColorStop(0.5, '#ffc93a'); gr.addColorStop(1, '#ff7a1f');
    ff.beginPath(); ff.arc(540, cy, r, 0, 7); ff.fillStyle = gr; ff.fill(); ff.lineWidth = 12; ff.strokeStyle = D.OL; ff.stroke();
    ff.lineWidth = 9; ff.strokeStyle = 'rgba(230,90,20,0.8)';
    for (let i = 0; i < 4; i++) { ff.beginPath(); ff.arc(540, cy, r * (0.35 + i * 0.15), T * (1 + i * 0.3) + i, T * (1 + i * 0.3) + i + 2); ff.stroke(); }
    st.flash = Math.max(st.flash, ease.outCubic(prog(lt, sc.dur - 0.22, sc.dur)) * 0.95);
    st.fruit = { x: 880, y: 1080 + Math.sin(T * 9) * 6, s: 0.6, r: -0.2, mood: 'happy' };
  },
  ace(sc, lt, p, fb, ff, st, T) {
    aura(fb, ff, T, lt, 0.55);
    popSticker(ff, 'FIRE FIST ACE', 540, 1030, lt, wordT(sc, /Fire/), sc.dur, { bg: '#e2361f', rot: -0.05, size: 72 });
  },
  sabo(sc, lt, p, fb, ff, st, T) {
    const tc = wordT(sc, /Colosseum/) - 0.15, ta = wordT(sc, /ate/);
    const tp = ease.outBack(prog(lt, tc, tc + 0.35)) * (1 - prog(lt, sc.dur - 0.3, sc.dur));
    if (tp > 0) { D.glow(fb, 800, 1000, 260 * tp, 'rgba(255,230,120,A)', 0.8); D.trophy(ff, 800, 1010, 0.75 * tp); }
    const h = fruitHome(T, sc), k = ease.inOut(prog(lt, tc, tc + 0.4)), e = ease.inOut(prog(lt, ta, ta + 0.35));
    let x = lerp(h.x, 800, k), y = lerp(h.y, 880 + Math.sin(T * 4) * 6, k), s = 0.82 - 0.27 * k;
    x = lerp(x, 390, e); y = lerp(y, 920, e); s = s * (1 - e);
    st.fruit = { x, y, s, r: e * 3, mood: 'happy' };
    if (lt > ta + 0.3) popSticker(ff, 'CHOMP!', 220, 760, lt, ta + 0.3, sc.dur, { bg: '#ffffff', fg: '#ff6fa8', rot: -0.15, size: 60 });
  },
  weakness(sc, lt, p, fb, ff, st, T) {
    const h = fruitHome(T, sc), pin = ease.outBack(prog(lt, 0, 0.3));
    st.fruit = { ...h, y: h.y + 40, s: 0.82 * pin };
    const lvl = lerp(1980, 1080, ease.outCubic(prog(lt, 0.35, 1.6)));
    ff.beginPath(); ff.moveTo(-20, H + 20);
    for (let x = -20; x <= W + 20; x += 20) ff.lineTo(x, lvl + Math.sin(x / 70 + T * 3) * 18 + Math.sin(x / 33 - T * 2) * 8);
    ff.lineTo(W + 20, H + 20); ff.closePath();
    ff.globalAlpha = 0.86; ff.fillStyle = '#3f97d6'; ff.fill(); ff.globalAlpha = 1; ff.lineWidth = 12; ff.strokeStyle = D.OL; ff.stroke();
    ff.beginPath(); for (let x = -20; x <= W + 20; x += 20) ff.lineTo(x, lvl + 30 + Math.sin(x / 70 + T * 3) * 18); ff.lineWidth = 8; ff.strokeStyle = 'rgba(255,255,255,0.7)'; ff.stroke();
    for (let i = 0; i < 16; i++) { const ph = (T * 0.6 + hash(i)) % 1, bx = 80 + hash(i + 1) * 920, by = H - ph * (H - lvl); if (by > lvl + 30) { ff.beginPath(); ff.arc(bx + Math.sin(T * 4 + i) * 12, by, 10 + hash(i + 2) * 14, 0, 7); ff.lineWidth = 6; ff.strokeStyle = 'rgba(255,255,255,0.85)'; ff.stroke(); } }
    popSticker(ff, "CAN'T SWIM!", 540, 1030, lt, wordT(sc, /never/), sc.dur, { bg: '#3f97d6', rot: 0.05, size: 76 });
  },
  outro(sc, lt, p, fb, ff, st, T) {
    const tw = wordT(sc, /you/);
    if (lt > tw) st.expr = 'grin';
    popSticker(ff, 'COMMENT BELOW!', 540, 1030, lt, sc.dur - 1.3, sc.dur + 1, { bg: '#ff6fa8', rot: -0.04, size: 70 });
    for (let i = 0; i < 6; i++) { const ph = (T * 0.5 + hash(i)) % 1; if (lt > 0.5) D.heart(ff, 120 + hash(i + 8) * 840, 1350 - ph * 900, 26 * (1 - ph) + 8); }
  },
};

// ---------------- captions ----------------
function drawCaption(sc, lt) {
  const x = M.capC.getContext('2d'); x.clearRect(0, 0, W, 420);
  const ci = sc.chunks.findIndex((c, i) => lt >= c[0].t && (i === sc.chunks.length - 1 || lt < sc.chunks[i + 1][0].t));
  if (ci < 0 || lt > sc.voStart + sc.voDur + 0.35) { M.cap.material.map.needsUpdate = true; return; }
  const chunk = sc.chunks[ci], size = 112;
  x.font = `${size}px ${D.FONT}`; x.textBaseline = 'middle';
  const items = chunk.map((w) => { const hi = w.w.includes('*'), txt = w.w.replace(/\*/g, ''); return { ...w, hi, txt: hi ? txt.toUpperCase() : txt.toLowerCase() }; });
  const sp = 28; let total = items.reduce((s, it) => s + x.measureText(it.txt).width, 0) + sp * (items.length - 1);
  const anyHi = items.some((i) => i.hi), heartsW = anyHi ? 110 : 0;
  let scale = Math.min(1, 980 / (total + heartsW));
  x.save(); x.translate(W / 2, 210); x.scale(scale, scale);
  let cx = -(total + heartsW) / 2;
  items.forEach((it) => {
    const ww = x.measureText(it.txt).width;
    if (lt >= it.t) {
      const pop = ease.outBack(prog(lt, it.t, it.t + 0.14)), s = 0.5 + 0.5 * pop;
      x.save(); x.translate(cx + ww / 2, it.hi ? -6 : 0); x.scale(s, s); x.rotate(it.hi ? -0.04 : 0);
      x.textAlign = 'center'; x.lineJoin = 'round';
      x.lineWidth = 26; x.strokeStyle = D.OL; x.strokeText(it.txt, 0, 6);
      x.fillStyle = it.hi ? '#ff5fa2' : '#ffffff'; x.fillText(it.txt, 0, 0);
      x.restore();
    }
    cx += ww + sp;
  });
  if (anyHi && lt >= items[items.length - 1].t) {
    const hp = ease.outBack(prog(lt, items[items.length - 1].t + 0.08, items[items.length - 1].t + 0.3));
    D.heart(x, cx + 20, 10, 30 * hp); D.heart(x, cx + 75, 0, 30 * hp);
  }
  x.restore();
  M.cap.material.map.needsUpdate = true;
}
