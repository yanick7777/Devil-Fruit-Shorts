"""Split one recorded take into script lines without a transcript.
Finds pauses, then picks the line boundaries (in order) that keep the speaking pace most even.
usage: python3 tools/align.py <script.json> <take.wav> [--write] [--set <line id>=<end time s> ...]"""
import json, re, subprocess, sys
import numpy as np
S = json.load(open(sys.argv[1])); take = sys.argv[2]; write = '--write' in sys.argv
SR = 16000
a = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', take, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout, np.int16) / 32768
dur = len(a) / SR
hop = int(0.01 * SR); w = int(0.03 * SR)
e = np.array([np.sqrt(np.mean(a[i:i + w] ** 2)) for i in range(0, len(a) - w, hop)])
db = 20 * np.log10(e + 1e-9); thr = np.percentile(db, 90) - 24
quiet = db < thr
# candidate cut points: middle of every quiet run of >= 60 ms, scored by its length
cands = []; i = 0
while i < len(quiet):
    if quiet[i]:
        j = i
        while j < len(quiet) and quiet[j]: j += 1
        if (j - i) >= 6: cands.append(((i + j) / 2 * 0.01, (j - i) * 0.01))
        i = j
    else: i += 1
cands = [c for c in cands if 0.3 < c[0] < dur - 0.3]
words = [len(re.sub(r'#\w+', '', l['text']).split()) for l in S['lines']]
n = len(words); m = len(cands)
starts = [0.0] + [c[0] for c in cands]; ends = [c[0] for c in cands] + [dur]
rate = dur / sum(words)
# DP over (line, candidate index of its end)
INF = 1e18; best = np.full((n, m + 1), INF); back = np.zeros((n, m + 1), int)
pos = [0.0] + [c[0] for c in cands] + [dur]  # boundary positions 0..m+1
glen = [0.0] + [c[1] for c in cands] + [1.0]
def cost(k, p0, p1):
    d = pos[p1] - pos[p0]; return ((d - words[k] * rate) / (words[k] * rate)) ** 2 - 0.15 * min(glen[p1], 0.6)
for p1 in range(1, m + 2):
    if n == 1 and p1 != m + 1: continue
    best[0][p1 - 1 if p1 <= m else m] = INF
B = {}
def solve():
    dp = {(0, 0): (0.0, None)}
    for k in range(n):
        nxt = {}
        for (kk, p0), (c0, _) in dp.items():
            if kk != k: continue
            rng = [m + 1] if k == n - 1 else range(p0 + 1, m + 1)
            for p1 in rng:
                c = c0 + cost(k, p0, p1)
                if (k + 1, p1) not in nxt or c < nxt[(k + 1, p1)][0]: nxt[(k + 1, p1)] = (c, (k, p0))
        B.update(nxt); dp = nxt
    p = m + 1; path = [p]
    for k in range(n, 0, -1): _, prev = B[(k, p)]; p = prev[1]; path.append(p)
    return list(reversed(path))
path = solve()
cuts = [pos[p] for p in path]
ids = [l['id'] for l in S['lines']]
for k, v in enumerate(sys.argv):  # manual overrides: --set name=7.9 moves the end of line "name"
    if v == '--set': lid, t = sys.argv[k + 1].split('='); cuts[ids.index(lid) + 1] = float(t)
print(f"take {dur:.2f}s, {sum(words)} words, {len(cands)} pause candidates")
for k, l in enumerate(S['lines']):
    d = cuts[k + 1] - cuts[k]; print(f"  {l['id']:7s} {cuts[k]:6.2f}-{cuts[k+1]:6.2f}  {d:4.2f}s  {words[k]:2d} words  {words[k]/d:4.1f} w/s  | {re.sub(r'#\w+', '', l['text'])[:60]}")
if write:
    out = S['voice_override_dir']
    for k, l in enumerate(S['lines']):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', take, '-ss', f"{cuts[k]:.3f}", '-to', f"{cuts[k+1]:.3f}", '-ac', '1', '-ar', '48000', f"{out}/{l['id']}.wav"], check=True)
    print('wrote', n, 'lines to', out)
