#!/usr/bin/env bash
# Build one short end to end: voice -> timeline -> Three.js frames (+ shot cues) -> sound design -> MP4 -> QA
set -euo pipefail
NAME=${1:-mera-mera}
B=build/$NAME; mkdir -p "$B" out
python3 tools/voice.py "shorts/$NAME/script.json" "$B"
node tools/render.mjs "$B/timeline.json" "$B/video.mp4"          # also writes $B/cues.json
python3 tools/sound.py "$B/timeline.json" "$B/cues.json" "$B/mix.wav"
ffmpeg -y -v error -i "$B/video.mp4" -i "$B/mix.wav" -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "out/$NAME.mp4"
# QA: black frames and frozen spans of 0.4 s or more
ffmpeg -v info -i "out/$NAME.mp4" -vf "blackdetect=d=0.1:pix_th=0.05,freezedetect=n=0.001:d=0.4" -an -f null - 2>&1 \
  | grep -E "black_start|freeze_start" > "$B/qa.txt" || true
if [ -s "$B/qa.txt" ]; then echo "QA issues:"; cat "$B/qa.txt"; else echo "QA: no black frames, no frozen spans >= 0.4s"; fi
echo "done -> out/$NAME.mp4"
