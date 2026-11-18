"""Voice line per script line + timeline.json with line and word timings.
A recorded take at <voice_override_dir>/<line id>.wav (or a line's "audio" path) replaces the TTS line;
otherwise the espeak-ng/MBROLA voice is used as a placeholder."""
import json, re, subprocess, sys, wave, os
import numpy as np

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
S = json.load(open(src)); v = S["voice"]; SR = 48000
FX = S.get("voice_fx") or {}
POST = ""
if FX:  # faster, higher, more excited delivery (formants preserved so it still sounds human)
    POST = f"rubberband=tempo={FX.get('tempo', 1)}:pitch={2 ** (FX.get('pitch_semitones', 0) / 12):.4f}:formant=preserved:pitchq=quality,"
    if FX.get("excited"):
        POST += "equalizer=f=180:t=q:w=1:g=2,equalizer=f=3200:t=q:w=1.2:g=4,equalizer=f=8000:t=q:w=1:g=2,acompressor=threshold=-22dB:ratio=4:attack=5:release=60:makeup=3,"
CLEAN = ("silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
         "highpass=f=90,equalizer=f=220:t=q:w=1:g=3,equalizer=f=3500:t=q:w=1.5:g=2,acompressor=threshold=-18dB:ratio=3,")
CLEAN_END = "aresample=48000"

t, lines = 0.0, []
for i, ln in enumerate(S["lines"]):
    raw, wav = f"{out}/raw_{i}.wav", f"{out}/vo_{i}.wav"
    rec = ln.get("audio") or (os.path.join(S["voice_override_dir"], ln["id"] + ".wav") if S.get("voice_override_dir") else None)
    if rec and os.path.exists(rec):
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", rec, "-af", CLEAN + POST + CLEAN_END, "-ac", "1", wav], check=True); source = rec
    else:
        subprocess.run(["espeak-ng", "-v", v["name"], "-s", str(v["speed"]), "-p", str(v["pitch"]), "-w", raw, ln["say"]], check=True)
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af", CLEAN + POST + CLEAN_END, "-ac", "1", wav], check=True); source = "tts"
    with wave.open(wav) as w: vdur = w.getnframes() / SR
    words = ln["text"].split()
    plain = [re.sub(r"#\w+$", "", w) for w in words]
    weights = [max(2, len(re.sub(r"[^A-Za-z]", "", w))) + (3 if re.search(r"[.,!?]$", w) else 0) for w in plain]
    tot, acc, wt = sum(weights), 0.0, []
    for w, wg in zip(words, weights):
        m = re.match(r"(.*?)(?:#(\w+))?$", w)
        wt.append({"w": m.group(1), "c": m.group(2), "t": round(ln["lead"] + vdur * acc / tot, 3)})
        acc += wg
    dur = ln["lead"] + vdur + ln["tail"]
    lines.append({**ln, "start": round(t, 3), "dur": round(dur, 3), "vo": wav, "voStart": ln["lead"], "voDur": round(vdur, 3), "words": wt, "source": source})
    t += dur

json.dump({"title": S["title"], "story": S.get("story", "/shorts/mera-mera/story.js"), "music": S.get("music", True), "duration": round(t, 3), "lines": lines}, open(f"{out}/timeline.json", "w"), indent=1)
print(f"total {t:.2f}s")
for l in lines: print(f"  {l['id']:6s} {l['start']:6.2f}  dur {l['dur']:.2f}  vo {l['voDur']:.2f}  ({l['source']})")
