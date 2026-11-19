"""Sound design + mix from the shot cues.
usage: python3 tools/sound.py build/<short>/timeline.json build/<short>/cues.json build/<short>/mix.wav

- music: bouncy loop ~6 dB under the voice; STOPS at the twist shot (low hit + sting), a low drone carries on,
  and the music comes back with the joke sting
- SFX at ~50% of voice level, peaks limited to 0.7x the voice peak
- ambience by background: waves + gulls on sea/beach/deck/harbor, wind on the cliff"""
import json, sys, wave
import numpy as np
from scipy import signal

SR = 48000
rng = np.random.default_rng(7)
tl = json.load(open(sys.argv[1])); cues = json.load(open(sys.argv[2]))
N = int((tl["duration"] + 0.3) * SR)

def T(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    e = np.ones(n); na = max(1, min(n, int(a * SR))); e[:na] = np.linspace(0, 1, na)
    if r: e *= np.exp(-np.arange(n) / SR / r)
    return e
def bp(x, lo, hi, o=2): return signal.sosfilt(signal.butter(o, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, o=2): return signal.sosfilt(signal.butter(o, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return signal.sosfilt(signal.butter(o, f, 'high', fs=SR, output='sos'), x)
def sweep(f0, f1, d, shape='sin'):
    t = T(d); f = np.geomspace(f0, f1, len(t)); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) if shape == 'sin' else signal.sawtooth(ph)
def noise(d): return rng.standard_normal(int(d * SR))
def add(buf, x, t, g=1.0):
    i = int(max(0, t) * SR); x = x[: max(0, len(buf) - i)]; buf[i:i + len(x)] += x * g
def norm(x, p=1.0): return x / (np.max(np.abs(x)) + 1e-9) * p
def note(m): return 440 * 2 ** ((m - 69) / 12)
def tone(m, d, r=0.2, harm=(1, 0.3, 0.1)):
    t = T(d); return sum(a * np.sin(2 * np.pi * note(m) * (k + 1) * t) for k, a in enumerate(harm)) * env(len(t), 0.003, r)
def crackle(d):
    out = lp(noise(d), 500) * 0.35
    for t in rng.uniform(0, d, int(d * 25)): add(out, hp(noise(0.012), 2500) * env(int(0.012 * SR), 0.001, 0.003), t, rng.uniform(0.3, 1))
    return out

# ---------------- effects ----------------
def seq(items, total):
    out = np.zeros(int(total * SR))
    for t, x in items: add(out, x, t)
    return out
def whoosh(d=0.45):
    n = noise(d); t = T(d); out = np.zeros_like(n)
    for k, (lo, hi) in enumerate([(300, 900), (700, 2000), (1500, 4000)]): out += bp(n, lo, hi) * np.sin(np.pi * np.clip(t / d * 1.1 - k * 0.05, 0, 1)) ** 2
    return norm(out)
def thump(f0=150, d=0.3): return sweep(f0, 45, d) * env(int(d * SR), 0.001, d / 3)
FX = {
  'zap':      lambda: norm(hp(crackle(0.35), 1500) * env(int(0.35 * SR), 0.001, 0.12) + 0.5 * sweep(2400, 300, 0.35) * env(int(0.35 * SR), 0.001, 0.1)),
  'storm':    lambda: norm(lp(noise(2.0), 220, 3) * (0.4 + 0.6 * (T(2.0) / 2.0)) + 0.6 * hp(crackle(2.0), 1200) * (T(2.0) > 0.6)),
  'tick':     lambda: norm(hp(noise(0.03), 3000) * env(int(0.03 * SR), 0.001, 0.008) * 0.8),
  'splash':   lambda: norm(bp(noise(0.6), 400, 4000) * env(int(0.6 * SR), 0.005, 0.2)),
  'pop':      lambda: norm(sweep(500, 1400, 0.09) * env(int(0.09 * SR), 0.002, 0.03)),
  'whoosh':   lambda: whoosh(0.45),
  'swish':    lambda: norm(hp(noise(0.22), 1800) * np.sin(np.pi * T(0.22) / 0.22) ** 3),
  'sip':      lambda: norm(bp(noise(0.5), 300, 1500) * (0.5 + 0.5 * np.sin(2 * np.pi * 9 * T(0.5))) * env(int(0.5 * SR), 0.05, 0.2)),
  'fall':     lambda: norm(sweep(1600, 500, 0.3) * np.linspace(0.4, 1, int(0.3 * SR))),
  'thunk':    lambda: norm(thump(170, 0.3) + 0.3 * np.pad(bp(noise(0.04), 800, 3000), (0, int(0.26 * SR)))),
  'shock':    lambda: norm(seq([(0, tone(79, 0.12, 0.08)), (0.1, tone(84, 0.35, 0.15))], 0.5)),
  'crunch':   lambda: norm(seq([(k * 0.035, bp(noise(0.05), 1500, 7000) * env(int(0.05 * SR), 0.001, 0.015)) for k in range(5)], 0.3)),
  'yuck':     lambda: norm(lp(signal.sawtooth(2 * np.pi * np.cumsum(220 * (1 - 0.35 * T(0.7) / 0.7) * (1 + 0.04 * np.sin(2 * np.pi * 7 * T(0.7)))) / SR), 1400) * env(int(0.7 * SR), 0.02, 0.4)),
  'shimmer':  lambda: norm(seq([(i * 0.06, tone(m, 0.5, 0.15, (1, 0.2))) for i, m in enumerate([88, 91, 95, 98, 100, 103])], 0.9)),
  'ding':     lambda: norm(sum(np.sin(2 * np.pi * 1320 * h * T(1.2)) / h ** 1.3 for h in (1, 2.76, 5.4)) * env(int(1.2 * SR), 0.002, 0.3)),
  'rumble':   lambda: norm(lp(noise(2.2), 160, 4) * (T(2.2) / 2.2) ** 1.2 + 0.3 * crackle(2.2) * (T(2.2) / 2.2)),
  'levelup':  lambda: norm(seq([(i * 0.08, tone(m, 0.25, 0.1, (1, 0.5, 0.25))) for i, m in enumerate([72, 76, 79, 84, 88])], 0.8)),
  'ignite':   lambda: norm(lp(noise(0.9), 1800) * env(int(0.9 * SR), 0.12, 0.35) + 0.5 * sweep(60, 120, 0.9) * env(int(0.9 * SR), 0.1, 0.3)),
  'fireloop': lambda: norm(crackle(2.2) * np.minimum(1, np.minimum(T(2.2) / 0.3, (2.2 - T(2.2)) / 0.5))),
  'bullets':  lambda: norm(seq([(i * 0.1, sweep(2400, 900, 0.12) * env(int(0.12 * SR), 0.001, 0.05)) for i in range(3)], 0.5)),
  'evolve':   lambda: norm(seq([(0, whoosh(0.35) * np.linspace(0.3, 1, int(0.35 * SR))), (0.3, tone(84, 0.45, 0.25, (1, 0.5, 0.3))), (0.3, tone(91, 0.45, 0.25))], 0.8)),
  'blast':    lambda: norm(lp(noise(2.0), 1400) * env(int(2.0 * SR), 0.03, 0.6) + 0.9 * sweep(90, 35, 2.0) * env(int(2.0 * SR), 0.005, 0.35) + 0.4 * crackle(2.0) * env(int(2.0 * SR), 0.05, 0.8)),
  'impact':   lambda: norm(thump(130, 0.45) + 0.6 * lp(noise(0.45), 2500) * env(int(0.45 * SR), 0.001, 0.08)),
  'twinkle':  lambda: norm(seq([(i * 0.1, tone(m, 0.4, 0.09, (1,))) for i, m in enumerate([84, 88, 91, 96, 91, 96])], 1.1)),
  'pops':     lambda: norm(seq([(i * 0.05 + rng.uniform(0, 0.03), lp(noise(0.25), 900) * env(int(0.25 * SR), 0.002, 0.06) + 0.6 * sweep(120, 50, 0.25) * env(int(0.25 * SR), 0.002, 0.08)) for i in range(12)], 1.0)),
  'boom':     lambda: norm(lp(noise(2.2), 900) * env(int(2.2 * SR), 0.005, 0.5) + 1.2 * sweep(80, 30, 2.2) * env(int(2.2 * SR), 0.003, 0.5)),
  'sting':    lambda: norm(1.3 * thump(70, 1.6) + 0.5 * sum(lp(signal.sawtooth(2 * np.pi * note(m) * T(1.6)), 900) for m in (38, 39, 45)) * env(int(1.6 * SR), 0.01, 0.6)),
  'fade':     lambda: norm(sweep(900, 300, 0.7) * env(int(0.7 * SR), 0.05, 0.3)),
  'fanfare':  lambda: norm(seq([(i * 0.15, lp(sum(signal.sawtooth(2 * np.pi * note(m + o) * T(d)) for o in (0, 0.08)), 2600) * env(int(d * SR), 0.01, d * 0.9)) for i, (m, d) in enumerate([(60, .14), (64, .14), (67, .14), (72, .6)])], 1.6)),
  'jokesting': lambda: norm(seq([(0, thump(180, 0.14)), (0.16, thump(150, 0.16)), (0.34, hp(noise(0.5), 5000) * env(int(0.5 * SR), 0.002, 0.15))], 0.9)),
}
FX.update({
  'stretch':  lambda: norm(sweep(180, 620, 0.5, 'saw') * env(int(0.5 * SR), 0.02, 0.3) * 0.6 + lp(noise(0.5), 900) * 0.2),
  'snap':     lambda: norm(seq([(0, sweep(900, 160, 0.12) * env(int(0.12 * SR), 0.001, 0.04)), (0.03, hp(noise(0.05), 2000) * env(int(0.05 * SR), 0.001, 0.01))], 0.25)),
  'boing':    lambda: norm(np.sin(2 * np.pi * np.cumsum(220 + 160 * np.sin(2 * np.pi * 12 * T(0.5)) * np.exp(-T(0.5) * 4)) / SR) * env(int(0.5 * SR), 0.003, 0.2)),
  'ricochet': lambda: norm(seq([(i * 0.09, sweep(3200, 1400, 0.22) * env(int(0.22 * SR), 0.001, 0.08)) for i in range(3)], 0.5)),
  'steam':    lambda: norm(hp(noise(0.9), 3000) * env(int(0.9 * SR), 0.05, 0.4)),
  'zip':      lambda: norm(bp(noise(0.25), 1500, 6000) * np.sin(np.pi * T(0.25) / 0.25) ** 2 + 0.4 * sweep(500, 2500, 0.25) * env(int(0.25 * SR), 0.01, 0.1)),
  'inflate':  lambda: norm(lp(noise(0.8), 1200) * np.linspace(0.2, 1, int(0.8 * SR)) + 0.5 * sweep(120, 420, 0.8) * env(int(0.8 * SR), 0.05, 0.6)),
  'haki':     lambda: norm(lp(sum(signal.sawtooth(2 * np.pi * note(m) * T(0.7)) for m in (36, 43)), 500) * env(int(0.7 * SR), 0.03, 0.3) + np.pad(thump(110, 0.4), (0, int(0.3 * SR)))),
  'drums':    lambda: norm(seq([(t, thump(90, 0.25) + 0.4 * bp(noise(0.25), 150, 600) * env(int(0.25 * SR), 0.002, 0.06)) for t in (0, 0.18, 0.5, 0.68, 1.0)], 1.4)),
  'slash':    lambda: norm(hp(noise(0.3), 2500) * np.sin(np.pi * T(0.3) / 0.3) ** 4 + 0.3 * sweep(2000, 600, 0.3)),
  'stamp':    lambda: norm(thump(160, 0.35) + 0.4 * np.pad(hp(noise(0.03), 1000) * env(int(0.03 * SR), 0.001, 0.01), (0, int(0.32 * SR)))),
  'waves':    lambda: norm(lp(noise(2.0), 600) * (0.4 + 0.6 * np.sin(np.pi * T(2.0) / 2.0) ** 2)),
})
FX.update({
  'quake':   lambda: norm(lp(noise(1.4), 120, 4) * env(int(1.4 * SR), 0.02, 0.6) * (1 + 0.6 * np.sin(2 * np.pi * 9 * T(1.4))) + np.pad(thump(70, 1.0), (0, int(0.4 * SR)))),
  'charge':  lambda: norm(sweep(80, 600, 0.8) * np.linspace(0.2, 1, int(0.8 * SR)) + 0.3 * hp(noise(0.8), 3000) * np.linspace(0, 1, int(0.8 * SR))),
  'hum':     lambda: norm(sum(np.sin(2 * np.pi * f * T(1.0)) for f in (110, 165, 220)) * (0.6 + 0.4 * np.sin(2 * np.pi * 6 * T(1.0))) * env(int(1.0 * SR), 0.1, 0.6)),
  'glass':   lambda: norm(seq([(rng.uniform(0, 0.25), sum(np.sin(2 * np.pi * rng.uniform(2500, 7000) * T(0.25)) for _ in range(3)) * env(int(0.25 * SR), 0.001, 0.05)) for _ in range(14)], 0.6) + hp(noise(0.6), 2000) * env(int(0.6 * SR), 0.001, 0.12)),
  'crumble': lambda: norm(seq([(rng.uniform(0, 0.9), lp(noise(0.15), 800) * env(int(0.15 * SR), 0.002, 0.05)) for _ in range(24)], 1.2)),
  'splash':  lambda: norm(bp(noise(0.9), 400, 6000) * env(int(0.9 * SR), 0.004, 0.25) + 0.5 * np.pad(thump(90, 0.4), (0, int(0.5 * SR)))),
  'siren':   lambda: norm(np.sin(2 * np.pi * np.cumsum(700 + 250 * np.sin(2 * np.pi * 2.5 * T(1.4))) / SR) * env(int(1.4 * SR), 0.02, 0.8)),
})
FX.update({
  'heartbeat': lambda: norm(seq([(t, thump(70, 0.18) + 0.3 * lp(noise(0.18), 200) * env(int(0.18 * SR), 0.002, 0.05)) for t in (0, 0.22, 0.8, 1.02)], 1.3)),
  'room':      lambda: norm(sweep(200, 900, 1.0) * env(int(1.0 * SR), 0.05, 0.6) * 0.6 + sum(np.sin(2 * np.pi * f * T(1.0)) for f in (220, 330)) * env(int(1.0 * SR), 0.2, 0.7) * 0.4),
  'zap':       lambda: norm(signal.square(2 * np.pi * np.cumsum(1800 - 1400 * T(0.4) / 0.4) / SR) * env(int(0.4 * SR), 0.002, 0.15) * 0.5 + hp(noise(0.4), 3000) * env(int(0.4 * SR), 0.002, 0.1)),
  'tick':      lambda: norm(seq([(i * 0.5, hp(noise(0.02), 3000) * env(int(0.02 * SR), 0.001, 0.005)) for i in range(5)], 2.5)),
})
GAIN = {'fireloop': 0.45, 'rumble': 0.7, 'blast': 1.0, 'boom': 1.0, 'sting': 1.2, 'whoosh': 0.6, 'swish': 0.7, 'pop': 0.55, 'ding': 0.5, 'twinkle': 0.5,
        'shimmer': 0.55, 'pops': 0.8, 'sip': 0.6, 'levelup': 0.6, 'fanfare': 0.6, 'crunch': 0.9, 'yuck': 0.6, 'impact': 1.0, 'jokesting': 0.9}

# ---------------- ambience ----------------
def waves(d):
    t = T(d); return lp(noise(d), 700) * (0.55 + 0.45 * np.sin(2 * np.pi * t / 3.2) ** 2)
def gull(): t = T(0.45); f = 1500 + 600 * np.sin(np.pi * t / 0.45); return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.03, 0.15) * 0.6
def wind(d): t = T(d); return bp(noise(d), 200, 900) * (0.6 + 0.4 * np.sin(2 * np.pi * t / 2.3))
AMB = {'beach': 'sea', 'deck': 'sea', 'sea': 'sea', 'harbor': 'sea', 'nightSea': 'sea', 'cliff': 'wind', 'snow': 'wind', 'mountain': 'wind', 'storm': 'wind', 'rooftops': 'wind'}

# ---------------- music ----------------
def music(n):
    bpm = 112; beat = 60 / bpm; out = np.zeros(n + SR); L = n / SR
    chords = [[48, 60, 64, 67], [45, 57, 60, 64], [41, 57, 60, 65], [43, 55, 59, 62]]
    kick = sweep(130, 45, 0.25) * env(int(0.25 * SR), 0.001, 0.08)
    clap = bp(noise(0.18), 900, 4000) * env(int(0.18 * SR), 0.001, 0.05)
    hat = hp(noise(0.05), 7000) * env(int(0.05 * SR), 0.001, 0.012)
    b = 0
    while b * beat < L:
        t = b * beat; bar = b // 4; ch = chords[bar % 4]; pos = b % 4
        if pos in (0, 2): add(out, kick, t, 0.9)
        if pos == 2 and bar % 2: add(out, kick, t + beat * 0.5, 0.6)
        if pos in (1, 3): add(out, clap, t, 0.55)
        for h in (0, 0.5): add(out, hat, t + h * beat, 0.22 if h else 0.12)
        for h, m in ((0, ch[0]), (0.5, ch[0] + 12 if pos % 2 else ch[0])):
            d = beat * 0.45; bt = T(d); add(out, lp(signal.square(2 * np.pi * note(m) * bt) * 0.5 + np.sin(2 * np.pi * note(m) * bt), 700) * env(len(bt), 0.004, 0.12), t + h * beat, 0.35)
        d = 0.35; ct = T(d)
        add(out, sum(np.sin(2 * np.pi * note(m) * ct) + 0.25 * np.sin(2 * np.pi * note(m) * 4 * ct) * np.exp(-ct / 0.02) for m in ch[1:]) * env(len(ct), 0.002, 0.09), t + beat * 0.5, 0.16)
        if bar % 2 == 1: at = T(0.3); add(out, np.sin(2 * np.pi * note(ch[1 + pos % 3] + 12) * at) * env(len(at), 0.002, 0.12), t + beat * 0.25, 0.12)
        b += 1
    return out[:n]

# ---------------- build ----------------
vo = np.zeros(N)
for ln in tl["lines"]:
    with wave.open(ln["vo"]) as w: a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    add(vo, norm(a, 0.9), ln["start"] + ln["voStart"])
vpeak = np.max(np.abs(vo)); speech = np.abs(vo) > 0.02; vrms = np.sqrt(np.mean(vo[speech] ** 2))

sfx = np.zeros(N)
for t, name in cues["sfx"]: add(sfx, FX[name](), t, GAIN.get(name, 0.7))
amb = np.zeros(N)
for s in cues["shots"]:
    kind = AMB.get(s["bg"]);  d = s["t1"] - s["t0"]
    if not kind: continue
    x = waves(d) if kind == 'sea' else wind(d); fade = np.minimum(1, np.minimum(T(d) / 0.15, (d - T(d)) / 0.15))
    add(amb, norm(x) * fade * 0.35, s["t0"])
    if kind == 'sea': [add(amb, gull(), s["t0"] + rng.uniform(0.2, max(0.3, d - 0.5)), 0.25) for _ in range(2)]
# SFX + ambience at ~50% of voice level, peaks limited to 0.7x the voice peak
fxbus = sfx * (0.5 * vpeak / (np.percentile(np.abs(sfx[np.abs(sfx) > 1e-3]), 99) + 1e-9)) + amb * 0.25 * vpeak
lim = 0.7 * vpeak; fxbus = lim * np.tanh(fxbus / lim)

# music ~6 dB under the voice; stops at the twist, low drone until the joke, then back
mus = music(N); mus = mus / (np.sqrt(np.mean(mus ** 2)) + 1e-9) * vrms * 0.4
tw = next(s for s in cues["shots"] if s["twist"])["t0"]; tj = next(l for l in tl["lines"] if l["id"] == "joke")["start"]
gate = np.ones(N); i0, i1 = int(tw * SR), int(tj * SR); gate[i0:i1] = 0; r = int(0.03 * SR)
gate[i0 - r:i0] = np.linspace(1, 0, r); gate[i1:i1 + int(0.2 * SR)] = np.linspace(0, 1, int(0.2 * SR))
drone_t = T((i1 - i0) / SR); drone = lp(sum(np.sin(2 * np.pi * note(m) * drone_t) for m in (33, 40)) + 0.3 * noise(len(drone_t) / SR), 300)
drone = norm(drone) * vrms * 0.6 * np.minimum(1, np.minimum(drone_t / 0.4, (drone_t[-1] - drone_t) / 0.3))
dr = np.zeros(N); dr[i0:i0 + len(drone)] = drone
fade = np.minimum(1, np.minimum(T(N / SR) / 0.3, (N / SR - T(N / SR)) / 1.0))
if not tl.get("music", True): mus[:] = 0; dr[:] = 0   # background music switched off in script.json
mix = vo + mus * gate * fade + dr + fxbus
mix = mix / max(1.0, np.max(np.abs(mix)) / 0.98)
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[3], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(st, -1, 1) * 32767).astype(np.int16).tobytes())
print(f"mixed {sys.argv[3]}  {N / SR:.2f}s  " + (f"music stops {tw:.2f}s -> back {tj:.2f}s" if tl.get("music", True) else "no music"))
