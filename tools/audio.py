"""Synthesize music bed + sound effects and mix them with the voiceover.
usage: python3 tools/audio.py build/<short>/timeline.json build/<short>/mix.wav"""
import json, sys, wave
import numpy as np
from scipy import signal

SR = 48000
rng = np.random.default_rng(7)
tl = json.load(open(sys.argv[1]))
N = int((tl["duration"] + 0.5) * SR)

def T(d): return np.arange(int(d * SR)) / SR
def env(n, a=0.005, r=None):
    e = np.ones(n); na = max(1, int(a * SR)); e[:na] = np.linspace(0, 1, na)
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
    i = int(t * SR); x = x[: max(0, len(buf) - i)]; buf[i:i + len(x)] += x * g
def norm(x, p=1.0): return x / (np.max(np.abs(x)) + 1e-9) * p
def note(m): return 440 * 2 ** ((m - 69) / 12)

# ---------------- sound effects ----------------
def s_pop(_):    return norm(sweep(500, 1400, 0.09) * env(int(0.09 * SR), 0.002, 0.03))
def s_drop(_):
    w = sweep(1500, 280, 0.32) * np.linspace(0.6, 1, int(0.32 * SR)); th = sweep(140, 50, 0.25) * env(int(0.25 * SR), 0.002, 0.07)
    return norm(np.concatenate([w * 0.5, th]))
def s_whoosh(d=0.45):
    n = noise(d); t = T(d); out = np.zeros_like(n)
    for k, (lo, hi) in enumerate([(300, 900), (700, 2000), (1500, 4000)]): out += bp(n, lo, hi) * np.sin(np.pi * np.clip(t / d * 1.1 - k * 0.05, 0, 1)) ** 2
    return norm(out)
def s_swish(_):  return norm(hp(noise(0.22), 1800) * np.sin(np.pi * T(0.22) / 0.22) ** 3)
def s_ignite(_):
    d = 0.9; n = lp(noise(d), 1800) * env(int(d * SR), 0.15, 0.35); return norm(n + 0.5 * sweep(60, 120, d) * env(int(d * SR), 0.1, 0.3))
def crackle(d):
    out = lp(noise(d), 500) * 0.35
    for t in rng.uniform(0, d, int(d * 25)): add(out, hp(noise(0.012), 2500) * env(int(0.012 * SR), 0.001, 0.003), t, rng.uniform(0.3, 1))
    return out
def s_fireloop(d): x = crackle(d); fade = np.minimum(1, np.minimum(T(d) / 0.3, (d - T(d)) / 0.4)); return norm(x * fade) * 0.6
def s_stamp(_):  return norm(sweep(160, 45, 0.35) * env(int(0.35 * SR), 0.001, 0.1) + 0.4 * np.pad(hp(noise(0.03), 1000) * env(int(0.03 * SR), 0.001, 0.01), (0, int(0.32 * SR))))
def s_blast(_):
    d = 2.0; roar = lp(noise(d), 1400) * env(int(d * SR), 0.03, 0.6); sub = sweep(90, 35, d) * env(int(d * SR), 0.005, 0.35)
    return norm(roar + 0.9 * sub + 0.4 * crackle(d) * env(int(d * SR), 0.05, 0.8))
def s_twinkle(_):
    out = np.zeros(int(1.2 * SR))
    for i, m in enumerate([84, 88, 91, 96, 91, 96]): t = T(0.4); add(out, np.sin(2 * np.pi * note(m) * t) * env(len(t), 0.003, 0.09), i * 0.1)
    return norm(out)
def s_pops(_):
    out = np.zeros(int(1.4 * SR))
    for i in range(12): add(out, lp(noise(0.25), 900) * env(int(0.25 * SR), 0.002, 0.06) + 0.6 * sweep(120, 50, 0.25) * env(int(0.25 * SR), 0.002, 0.08), i * 0.06 + rng.uniform(0, 0.04), rng.uniform(0.5, 1))
    return norm(out)
def s_rumble(d): t = T(d); return norm(lp(noise(d), 180, 4) * (t / d) ** 1.5 + 0.3 * crackle(d) * (t / d))
def s_boom(_):
    d = 2.2; return norm(lp(noise(d), 900) * env(int(d * SR), 0.005, 0.5) + 1.2 * sweep(80, 30, d) * env(int(d * SR), 0.003, 0.5))
def s_ding(_):
    t = T(1.2); f = 1320; return norm(sum(np.sin(2 * np.pi * f * h * t) / h ** 1.3 for h in (1, 2.76, 5.4)) * env(len(t), 0.002, 0.3))
def s_fanfare(_):
    out = np.zeros(int(1.6 * SR))
    for i, (m, d) in enumerate([(60, .14), (64, .14), (67, .14), (72, .6)]):
        x = lp(sum(signal.sawtooth(2 * np.pi * note(m + o) * T(d)) for o in (0, 0.08)), 2600) * env(int(d * SR), 0.01, d * 0.9)
        add(out, x, i * 0.15)
    return norm(out)
def s_sad(_):
    out = np.zeros(int(1.8 * SR))
    for i, (m, d) in enumerate([(55, .3), (54, .3), (53, .3), (52, .8)]):
        t = T(d); vib = 1 + 0.012 * np.sin(2 * np.pi * 6 * t) * (i == 3)
        ph = 2 * np.pi * np.cumsum(note(m) * vib) / SR
        add(out, lp(signal.sawtooth(ph), 1100) * env(len(t), 0.03, d), i * 0.32)
    return norm(out)
def s_splash(_): return norm(bp(noise(0.8), 600, 6000) * env(int(0.8 * SR), 0.004, 0.18))
def s_bubbles(_):
    out = np.zeros(int(1.6 * SR))
    for i in range(9): add(out, sweep(400 + rng.uniform(0, 300), 1200, 0.07) * env(int(0.07 * SR), 0.003, 0.03), i * 0.15 + rng.uniform(0, 0.05))
    return norm(out)

SFX = {k[2:]: v for k, v in globals().items() if k.startswith('s_')}
GAIN = {'fireloop': 0.25, 'rumble': 0.5, 'blast': 0.75, 'boom': 0.8, 'whoosh': 0.45, 'swish': 0.5, 'pop': 0.45, 'ding': 0.35, 'twinkle': 0.35, 'pops': 0.5, 'sad': 0.4, 'fanfare': 0.35}

# ---------------- music: bouncy 112 BPM loop, C - Am - F - G ----------------
def music(n):
    bpm = 112; beat = 60 / bpm; out = np.zeros(n + SR); L = n / SR
    chords = [[48, 60, 64, 67], [45, 57, 60, 64], [41, 57, 60, 65], [43, 55, 59, 62]]
    kick = sweep(130, 45, 0.25) * env(int(0.25 * SR), 0.001, 0.08)
    clap = bp(noise(0.18), 900, 4000) * env(int(0.18 * SR), 0.001, 0.05)
    hat = hp(noise(0.05), 7000) * env(int(0.05 * SR), 0.001, 0.012)
    b = 0
    while b * beat < L:
        t = b * beat; bar = b // 4; ch = chords[bar % 4]; pos = b % 4
        add(out, kick, t, 0.9 if pos in (0, 2) else 0)
        if pos == 2 and bar % 2: add(out, kick, t + beat * 0.5, 0.6)
        if pos in (1, 3): add(out, clap, t, 0.55)
        for h in (0, 0.5): add(out, hat, t + h * beat, 0.22 if h else 0.12)
        # bass pluck: root on beats, octave on the "and"
        for h, m in ((0, ch[0]), (0.5, ch[0] + 12 if pos % 2 else ch[0])):
            d = beat * 0.45; bt = T(d); x = lp(signal.square(2 * np.pi * note(m - 12 + 12) * bt) * 0.5 + np.sin(2 * np.pi * note(m) * bt), 700) * env(len(bt), 0.004, 0.12)
            add(out, x, t + h * beat, 0.35)
        # marimba-ish chord stabs on off-beats
        d = 0.35; ct = T(d)
        stab = sum(np.sin(2 * np.pi * note(m) * ct) + 0.25 * np.sin(2 * np.pi * note(m) * 4 * ct) * np.exp(-ct / 0.02) for m in ch[1:]) * env(len(ct), 0.002, 0.09)
        add(out, stab, t + beat * 0.5, 0.16)
        # little bell arpeggio every other bar
        if bar % 2 == 1:
            m = ch[1 + pos % 3] + 12; d = 0.3; at = T(d)
            add(out, np.sin(2 * np.pi * note(m) * at) * env(len(at), 0.002, 0.12), t + beat * 0.25, 0.12)
        b += 1
    return out[:n]

vo = np.zeros(N); sfx = np.zeros(N)
for sc in tl["scenes"]:
    with wave.open(sc["vo"]) as w: a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    add(vo, norm(a, 0.9), sc["start"] + sc["voStart"])
    for t, name in sc.get("sfx", []):
        at = sc["start"] + (t if t >= 0 else sc["dur"] + t)
        d = sc["dur"] - (t if t >= 0 else sc["dur"] + t)
        add(sfx, SFX[name](d), at, GAIN.get(name, 0.6))

mus = music(N)
# sidechain ducking under the voice
venv = lp(np.abs(vo), 6)
duck = 1 - 0.55 * np.clip(venv / (venv.max() * 0.25 + 1e-9), 0, 1)
fade = np.minimum(1, np.minimum(T(N / SR) / 0.4, (N / SR - T(N / SR)) / 1.2))
mix = vo + 0.32 * norm(mus) * duck * fade + 0.55 * sfx
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
st = np.stack([mix, mix], 1)
with wave.open(sys.argv[2], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(st, -1, 1) * 32767).astype(np.int16).tobytes())
print("mixed", sys.argv[2], f"{N / SR:.2f}s")
