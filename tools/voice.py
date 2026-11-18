"""Synthesize one voice line per scene and write timeline.json (scene + word timings)."""
import json, re, subprocess, sys, wave, os
import numpy as np

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
S = json.load(open(src))
v = S["voice"]
SR = 48000
PRE, POST, TAIL = 0.18, 0.42, 1.2

def read_wav(p):
    with wave.open(p) as w:
        return np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768

t, scenes = 0.0, []
for i, sc in enumerate(S["scenes"]):
    raw, wav = f"{out}/raw_{i}.wav", f"{out}/vo_{i}.wav"
    subprocess.run(["espeak-ng", "-v", v["name"], "-s", str(v["speed"]), "-p", str(v["pitch"]), "-w", raw, sc["say"]], check=True)
    # trim silence, resample, light warmth + compression
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af",
        "silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
        "highpass=f=90,equalizer=f=220:t=q:w=1:g=3,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-18dB:ratio=3,aresample=48000",
        "-ac", "1", wav], check=True)
    a = read_wav(wav)
    vdur = len(a) / SR
    words = sc["text"].split()
    weights = [max(2, len(re.sub(r"[^A-Za-z]", "", w))) + (3 if re.search(r"[.,!?]$", w) else 0) for w in words]
    tot, acc, wt = sum(weights), 0.0, []
    for w, wg in zip(words, weights):
        wt.append({"w": w, "t": PRE + vdur * acc / tot})
        acc += wg
    dur = PRE + vdur + POST + (TAIL if i == len(S["scenes"]) - 1 else 0)
    scenes.append({**sc, "start": round(t, 3), "dur": round(dur, 3), "vo": wav, "voStart": PRE, "voDur": round(vdur, 3), "words": wt})
    t += dur

json.dump({"title": S["title"], "duration": round(t, 3), "scenes": scenes}, open(f"{out}/timeline.json", "w"), indent=1)
print(f"total {t:.2f}s", [round(s["dur"], 2) for s in scenes])
