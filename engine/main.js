// Three.js compositor: painted background card + stage card (parallax, camera moves, shake)
// and an orthographic HUD for banners, corner overlays, captions and flashes.
import * as THREE from 'three';
import * as A from './art.js';
import { BG, BW, BH } from './bgs.js';
import { ease, prog, clamp01, pop } from './kit.js';

const W = 1080, H = 1920, FOV = 30, DIST = (H / 2) / Math.tan(THREE.MathUtils.degToRad(FOV / 2)), F = 1 / 30;
let renderer, scene, cam, hud, hudCam, TL, SHOTS, M = {};
const bgCache = new Map(), bannerCache = new Map();

function tex(canvas) { const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; }
function plane(w, h, order) { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false })); m.renderOrder = order; return m; }
function placeAt(m, z) { const k = (DIST - z) / DIST; m.position.set(0, 0, z); m.scale.set(k, k, 1); }

function bgTex(key) {
  if (!bgCache.has(key)) { const [name, arg] = key.split(':'); bgCache.set(key, tex(BG[name](arg))); }
  return bgCache.get(key);
}

export async function init(timeline) {
  TL = timeline;
  await document.fonts.load('100px "Lilita One"');
  SHOTS = (await import(TL.story || '/shorts/mera-mera/story.js')).buildShots(TL);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c'), antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.autoClear = false;
  scene = new THREE.Scene(); scene.background = new THREE.Color('#222');
  cam = new THREE.PerspectiveCamera(FOV, W / H, 10, 20000);
  hud = new THREE.Scene(); hudCam = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -10, 10);
  M.bg = new THREE.Mesh(new THREE.PlaneGeometry(BW, BH, 24, 40), new THREE.MeshBasicMaterial({ transparent: true, depthTest: false, depthWrite: false })); M.bg.renderOrder = 0;
  M.bgRest = M.bg.geometry.attributes.position.array.slice(); placeAt(M.bg, -420); scene.add(M.bg);
  M.stageC = A.mk(W, H); M.stage = plane(W, H, 1); M.stage.material.map = tex(M.stageC); placeAt(M.stage, 0); scene.add(M.stage);
  M.hudC = A.mk(W, H); M.hud = plane(W, H, 2); M.hud.material.map = tex(M.hudC); hud.add(M.hud);
  // captions: 1-2 words, broken after punctuation
  for (const ln of TL.lines) {
    ln.chunks = []; let cur = [];
    ln.words.forEach((w, i) => { cur.push(w); if (cur.length === 2 || /[.,!?]$/.test(w.w) || i === ln.words.length - 1) { ln.chunks.push(cur); cur = []; } });
  }
  return { shots: SHOTS.length };
}

function shotAt(T) { return SHOTS.find((s) => T >= s.t0 && T < s.t1) || SHOTS[SHOTS.length - 1]; }
function lineAt(T) { return TL.lines.find((l) => T >= l.start && T < l.start + l.dur) || TL.lines[TL.lines.length - 1]; }

export function frame(T) {
  const shot = shotAt(T), ln = lineAt(T), lt = T - ln.start;
  const S = { T, t: T - shot.t0, t0: shot.t0, dur: shot.t1 - shot.t0, shake: 0, flash: 0, flashCol: '255,255,255', speaking: lt > ln.voStart && lt < ln.voStart + ln.voDur };
  M.bg.material.map = bgTex(shot.bg); M.bg.material.needsUpdate = true;
  // ---- stage ----
  const x = M.stageC.getContext('2d'); x.clearRect(0, 0, W, H);
  S.wobble = 0;
  shot.draw(x, S);
  // cartoon wobble: bend the background mesh (Gear 5 style)
  { const pos = M.bg.geometry.attributes.position, r = M.bgRest, w = S.wobble || 0;
    if (w > 0 || M.bgWobbled) { for (let i = 0; i < pos.count; i++) { const px = r[i * 3], py = r[i * 3 + 1];
        pos.array[i * 3] = px + Math.sin(py * 0.006 + T * 5) * 45 * w; pos.array[i * 3 + 1] = py + Math.sin(px * 0.008 + T * 4) * 35 * w; }
      pos.needsUpdate = true; M.bgWobbled = w > 0; } }
  A.dust(x, W, H, T, 22, shot.bg === 'underwater' ? '200,240,255' : '255,255,255');
  M.stage.material.map.needsUpdate = true;
  // ---- camera: smootherstep glide + slow push-in, a punch on every cut, 7-frame shakes ----
  const [a, b] = shot.cam, k = ease.smoother(clamp01(S.t / S.dur));
  const zoom = (a[0] + (b[0] - a[0]) * k) * (1 + 0.07 * (1 - ease.outCubic(prog(S.t, 0, 0.3))));
  const fx = a[1] + (b[1] - a[1]) * k, fy = a[2] + (b[2] - a[2]) * k, fr = Math.round(T * 30);
  const sh = S.shake, j = (n) => Math.sin(fr * 12.9898 + n * 78.233) * 0.5;
  cam.position.set(fx - W / 2 + j(1) * 46 * sh, H / 2 - fy + j(2) * 46 * sh, DIST / zoom);
  cam.rotation.set(0, 0, a[3] + (b[3] - a[3]) * k + j(3) * 0.035 * sh);
  // ---- HUD ----
  const h = M.hudC.getContext('2d'); h.clearRect(0, 0, W, H);
  if (shot.hud) shot.hud(h, S);
  drawBanners(h, T);
  drawCaption(h, ln, lt);
  if (S.flash > 0) { const g = h.createRadialGradient(540, 860, 50, 540, 860, 1300); g.addColorStop(0, `rgba(${S.flashCol},${S.flash})`); g.addColorStop(1, `rgba(${S.flashCol},${S.flash * 0.6})`); h.fillStyle = g; h.fillRect(0, 0, W, H); }
  M.hud.material.map.needsUpdate = true;
  renderer.clear(); renderer.render(scene, cam); renderer.clearDepth(); renderer.render(hud, hudCam);
}

function drawBanners(h, T) {
  for (const s of SHOTS) for (const [text, color, t0, t1, mode] of s.banners || []) {
    if (T < t0 || T >= t1) continue;
    const key = text + color; if (!bannerCache.has(key)) bannerCache.set(key, A.drawBanner(text, color));
    const c = bannerCache.get(key);
    let y = 300, sc = pop(T, t0);
    if (mode === 'slide') { y = -160 + 460 * ease.outBack(prog(T, t0, t0 + 0.28)); sc = 1; }
    sc *= 1 - 0.3 * prog(T, t1 - 0.08, t1);
    h.save(); h.translate(540, y + Math.sin(T * 2) * 4); h.rotate(-0.03 + Math.sin(T * 1.3) * 0.01); h.scale(sc, sc); h.drawImage(c, -c.width / 2, -c.height / 2); h.restore();
  }
}

function drawCaption(h, ln, lt) {
  const ci = ln.chunks.findIndex((c, i) => lt >= c[0].t && (i === ln.chunks.length - 1 || lt < ln.chunks[i + 1][0].t));
  if (ci < 0 || lt > ln.voStart + ln.voDur + 0.3) return;
  const items = ln.chunks[ci].map((w) => ({ ...w, size: w.c ? 136 : 112 }));
  h.textBaseline = 'middle'; h.lineJoin = 'round';
  const widths = items.map((it) => { h.font = `${it.size}px ${A.FONT}`; return h.measureText(it.c ? it.w.toUpperCase() : it.w.toLowerCase()).width; });
  const gap = 30, total = widths.reduce((s, v) => s + v, 0) + gap * (items.length - 1), sc = Math.min(1, 980 / total);
  h.save(); h.translate(540, 1350); h.scale(sc, sc);
  let cx = -total / 2;
  items.forEach((it, i) => {
    const txt = it.c ? it.w.toUpperCase() : it.w.toLowerCase(), ww = widths[i];
    if (lt >= it.t) {
      const p = 0.55 + 0.45 * ease.outBack(prog(lt, it.t, it.t + 5 * F));
      h.save(); h.translate(cx + ww / 2, it.c ? -8 : 0); h.rotate(it.c ? -0.06 : 0); h.scale(p, p);
      h.font = `${it.size}px ${A.FONT}`; h.textAlign = 'center';
      h.fillStyle = 'rgba(10,6,25,0.45)'; h.fillText(txt, 8, 14);                     // drop shadow
      h.lineWidth = 26; h.strokeStyle = A.OL; h.strokeText(txt, 0, 4);
      h.fillStyle = it.c ? A.COL[it.c] : '#fff'; h.fillText(txt, 0, 0);
      h.restore();
    }
    cx += ww + gap;
  });
  h.restore();
}

// for the audio builder and the plan check
export function cues() {
  return {
    duration: TL.duration,
    shots: SHOTS.map((s) => ({ i: s.i, name: s.name, t0: s.t0, t1: s.t1, bg: s.bg, cam: s.cam, banners: (s.banners || []).map((b) => b.slice(0, 3)), twist: !!s.twist })),
    sfx: SHOTS.flatMap((s) => s.sfx),
  };
}
