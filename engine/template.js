// Shared shot builders for the fixed parts of every short: hook + bite (desk room), "don't panic", "out of every fruit",
// fruit reveal, the techniques stage, the outro and the final desk shot. Each short passes its own fruit, sets, colours and effects;
// the middle (powers, peak, twist, users, joke) stays fully custom in the short's story.js.
import * as A from './art.js';
import { F, ease, prog, lerp, pop, person, deskFront, halo, evolve } from './kit.js';

export function timing(TL) {
  const L = Object.fromEntries(TL.lines.map((l) => [l.id, l]));
  const W = (id, re) => { const l = L[id], w = l.words.find((w) => re.test(w.w)); if (!w) throw new Error(`word ${re} not in ${id}`); return l.start + w.t; };
  const end = (id) => L[id].start + L[id].dur, st = (id) => L[id].start;
  const shots = [], add = (o) => shots.push(o);
  const addSplit = (o, tSplit, cam2, name2) => {
    const S0 = o.t0;
    const wrap = (fn) => fn && function (x, S) { const P = new Proxy(S, { get: (t, k) => (k === 't0' ? S0 : k === 't' ? S.T - S0 : t[k]), set: (t, k, v) => { t[k] = v; return true; } }); return fn.call(this, x, P); };
    add({ ...o, t1: tSplit });
    add({ ...o, name: name2, t0: tSplit, cam: cam2, banners: [], sfx: [], draw: wrap(o.draw), hud: wrap(o.hud) });
  };
  const finish = () => { shots.sort((a, b) => a.t0 - b.t0); for (let i = 0; i < shots.length - 1; i++) if (shots[i + 1].t0 > shots[i].t1) shots[i].t1 = shots[i + 1].t0;   // no gaps between shots
    shots.forEach((s, i) => { s.i = i; s.sfx = (s.sfx || []).map(([t, n]) => [s.t0 + t, n]); }); return shots; };
  return { L, W, end, st, shots, add, addSplit, finish };
}

// o: { fruit(x,cx,cy,R,rot,opts), biteCol, biteFx(x,S,k,h) , desc, calmBg, seaHue, revealBg, revealName, revealBanner, bannerCol, haloRgb, revealFx(x,S) }
export function opening(T, o) {
  const { W, end, st, add } = T;
  const tDrop = 0.55, tShock = 0.9, tBite = W('hook', /^bite/), s2 = tBite - 0.4;
  add({ name: `Hook (desk room): host sips coffee, ${o.desc} drops onto the plate, wide-eyed shock with !?`, t0: 0, t1: s2, bg: 'desk',
    cam: [[1.0, 540, 980, 0], [1.07, 540, 950, 0]], sfx: [[0.1, 'sip'], [tDrop - 0.25, 'fall'], [tDrop + 0.3, 'thunk'], [tShock, 'shock']],
    draw(x, S) {
      const h = person(x, S, 'host', S.t < tShock ? 'calm' : 'shock', 540, 1900, 0.8, { pose: S.t > 0.05 && S.t < 0.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S);
      o.fruit(x, 290, lerp(-200, 1340, ease.outBounce(prog(S.t, tDrop - 0.3, tDrop + 0.3))), 80, S.T * 0.6, { shadow: false });
      if (S.t > tDrop + 0.3 && S.t < tDrop + 0.3 + 7 * F) S.shake = 0.6;
      if (S.t > tShock) A.mark(x, '!?', h.head[0] + 230, h.head[1] - 230, pop(S.T, tShock));
    } });
  add({ name: `The bite (desk close-up): dip, bite, disgusted face; ${o.biteDesc}; ${o.bannerCol} YOUR FRUIT banner`, t0: s2, t1: end('hook'), bg: 'desk',
    cam: [[1.4, 500, 1010, 0.02], [1.5, 490, 1000, 0.035]], banners: [['YOUR FRUIT', o.bannerCol, W('hook', /^fruit/) - 0.1, end('hook')]],
    sfx: [[tBite - s2, 'crunch'], [tBite - s2 + 0.3, o.biteSfx || 'shimmer'], [W('hook', /^weird/) - s2, 'yuck']],
    draw(x, S) {
      const bt = tBite - s2, bitten = S.t >= bt, atMouth = S.t > bt - 0.35 && S.t < bt + 0.45, dip = S.t > bt - 2 * F && S.t < bt ? 16 : 0;
      const k = prog(S.t, bt + 0.25, bt + 0.6);
      if (bitten && o.biteBehind) o.biteBehind(x, S, k);
      const h = person(x, S, 'host', bitten ? 'yuck' : 'calm', 540, 1900, 0.8, { pose: atMouth ? 'sip' : 'hold' });
      deskFront(x, S); A.mug(x, 830, 1330, 0.75, S.T, true, false);
      const fx = h.hand.R[0] - 18, fy = h.hand.R[1] - 48 + dip; o.fruit(x, fx, fy, 56, S.T * 0.4, { shadow: false });
      if (bitten) { x.beginPath(); x.arc(fx + 40, fy - 10, 22, 0, 7); x.fillStyle = o.biteCol || '#f3ecff'; x.fill(); x.lineWidth = 6; x.strokeStyle = A.OL; x.stroke();
        if (o.biteFx) o.biteFx(x, S, k, h); A.mark(x, '!?', 820, 560, pop(S.T, S.t0 + bt + 0.1)); }
      S.flash = Math.max(S.flash, 0.45 * (1 - prog(S.t, bt, bt + 0.25)) * (bitten ? 1 : 0));
    } });
  add({ name: `Don't panic (${o.calmDesc}): the host calms down and holds up the bitten fruit`, t0: st('calm'), t1: end('calm'), bg: o.calmBg,
    cam: [[1.06, 540, 1000, -0.02], [1.12, 540, 990, 0.01]], sfx: [[0, 'whoosh'], [W('calm', /^Devil/) - st('calm'), 'shimmer']],
    draw(x, S) {
      const tj = W('calm', /^just/) - S.t0;
      const h = person(x, S, 'host', S.t < tj ? 'worried' : 'calm', 520, 1760, 0.8, { talk: true, seed: 1, pose: 'holdUp' });
      if (S.t < tj) A.sweat(x, h.head[0] + 190, h.head[1] - 60, pop(S.T, S.t0 + 0.3));
      o.fruit(x, h.hand.R[0] + 20, h.hand.R[1] - 70, 58, S.T * 0.4, { shadow: false });
      const td = W('calm', /^Devil/) - S.t0; A.sparkle(x, h.hand.R[0] - 20, h.hand.R[1] - 160, 36 * Math.sin(Math.PI * prog(S.t, td, td + 0.6)));
    } });
  const tName = W('name', o.nameRe) - 0.15;
  add({ name: `Out of every fruit: ${o.seaHue} rays, pink ゴ marks, spinning globe, dark unnamed fruit silhouettes`, t0: st('sea'), t1: tName, bg: `rays:${o.seaHue}`,
    cam: [[1.0, 540, 900, 0], [1.1, 540, 880, 0.04]], sfx: [[0, 'whoosh'], [0.1, 'rumble']],
    draw(x, S) {
      A.globe(x, 540, 860, 230 * pop(S.T, S.t0 + 0.05), S.T);
      for (let i = 0; i < 6; i++) { const a = i / 6 * 6.283 + S.T * 0.6, p = pop(S.T, S.t0 + 0.12 + i * 0.18); if (p > 0) A.fruitSilhouette(x, 540 + Math.cos(a) * 380, 860 + Math.sin(a) * 300, 70 * p, i + o.seed); }
      A.gogo(x, 110, 330, S.T, pop(S.T, S.t0 + 0.1)); A.gogo(x, 800, 1020, S.T + 1, 0.7 * pop(S.T, S.t0 + 0.6));
    } });
  const tThat = o.revealEnd ? o.revealEnd : W('type', /^that/) - 0.1;
  add({ name: `Fruit reveal (${o.revealDesc}): the fruit spins in a halo; ${o.bannerCol} ${o.revealBanner} banner`, t0: tName, t1: tThat, bg: o.revealBg,
    cam: [[1.05, 540, 900, 0.02], [1.16, 540, 880, 0]], banners: [[o.revealBanner, o.bannerCol, tName + 0.1, tThat]], sfx: [[0, 'whoosh'], [0.1, 'ding'], [0.3, 'shimmer']],
    draw(x, S) {
      halo(x, 540, 900, 470, o.haloRgb, S.T);
      if (o.revealFx) o.revealFx(x, S);
      o.fruit(x, 540, 900 + Math.sin(S.T * 2) * 14, 240 * pop(S.T, S.t0), S.t * 0.7);
      for (let i = 0; i < 6; i++) { const ph = (S.T * 0.7 + i / 6) % 1; A.sparkle(x, 540 + Math.cos(i * 1.7) * 360, 880 + Math.sin(i * 2.3) * 360, 36 * Math.sin(Math.PI * ph)); }
    } });
  return { tThat };
}

// four pedestals that pop on the given word times; labels[3] is the peak (gold halo)
export function stage(T, o) {
  const { add } = T, pw = o.times, lvl = pw[3] + 0.4;
  add({ name: `Techniques stage (${o.desc}): ${o.labels.join(', ')} pop onto pedestals, the bar fills, LEVEL UP`, t0: o.t0, t1: o.t1, bg: o.bg,
    cam: [[1.0, 540, 980, 0], [1.08, 560, 920, 0.03]], sfx: [[0, 'whoosh'], ...pw.map((t) => [t - o.t0, 'pop']), [lvl - o.t0, 'levelup']],
    draw(x, S) {
      const xs = [165, 415, 665, 915], lit = pw.filter((t) => S.T >= t).length;
      const fill = lit === 0 ? 0 : (lit - 1) / 4 + 0.25 * ease.outCubic(prog(S.T, pw[lit - 1], pw[lit - 1] + 0.3));
      A.progressBar(x, 540, 560, 900, fill, S.T > lvl ? 'LEVEL UP!' : o.bar);
      if (S.T > lvl) A.shineLines(x, 540, 560, 470, 620, S.T, 12);
      xs.forEach((px, i) => {
        if (i === lit - 1) halo(x, px, 860, 210, i === 3 ? '255,220,90' : o.haloRgb, S.T);
        A.pedestal(x, px, 990, o.labels[i], i < lit);
        const p = pop(S.T, pw[i]); if (p > 0) o.icon(x, i + 1, px, 860 + Math.sin(S.T * 2 + i) * 10, 0.62 * p, S.T);
        else { x.font = `110px ${A.FONT}`; x.textAlign = 'center'; x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillText('?', px, 900); }
      });
    } });
}
// evolve transition used at the start of each power shot (returns true while it is playing)
export function evolveIn(x, S, a, b, icon, cy = 760) {
  if (S.t >= 0.5) return false;
  A.glowRing(x, 540, cy, 300 * prog(S.t, 0, 0.5), 1 - prog(S.t, 0.2, 0.5)); evolve(x, S, a, b, 540, cy, 1.4, 0.45, icon); return true;
}

export function ending(T, o) {
  const { L, st, add } = T, TL = o.TL;
  const tDesk = st('outro') + L.outro.voStart + L.outro.voDur + 0.35;
  add({ name: 'Outro (purple rays): host with big ? marks, the fruit bouncing in; pink NEXT? banner', t0: st('outro'), t1: tDesk, bg: 'rays:purple',
    cam: [[1.0, 540, 960, 0], [1.1, 540, 930, 0.03]], banners: [['NEXT?', 'pink', st('outro') + 0.3, tDesk]], sfx: [[0, 'whoosh'], [0.3, 'pop'], [0.8, 'pop'], [1.4, 'pop']],
    draw(x, S) {
      A.gogo(x, 90, 300, S.T, 0.8 * pop(S.T, S.t0 + 0.2));
      person(x, S, 'host', 'smug', 540, 1760, 0.8, { pop: S.t0 + 0.05, talk: true, seed: 12, pose: 'shrug' });
      A.mark(x, '?', 200, 640, 1.3 * pop(S.T, S.t0 + 0.8), -0.2); A.mark(x, '?', 880, 600, 1.1 * pop(S.T, S.t0 + 1.4), 0.25);
      const p = pop(S.T, S.t0 + 2.0); if (p > 0) o.fruit(x, 860, 1200 - Math.abs(Math.sin(S.T * 4)) * 60, 70 * p, S.T, { shadow: false });
    } });
  add({ name: 'Back in the desk room: host sips coffee, steam rising', t0: tDesk, t1: TL.duration, bg: 'desk',
    cam: [[1.12, 540, 1000, 0], [1.18, 540, 990, 0]], sfx: [[0.2, 'sip']],
    draw(x, S) {
      const h = person(x, S, 'host', 'calm', 540, 1900, 0.8, { seed: 13, pose: S.t > 0.25 && S.t < 1.5 ? 'sip' : 'hold' });
      A.mug(x, h.hand.R[0] + 16, h.hand.R[1] - 8, 1.03, S.T, true, false);
      deskFront(x, S, { plate: true });
    } });
}
