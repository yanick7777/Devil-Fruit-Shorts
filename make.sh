#!/usr/bin/env bash
# Build one short end to end: voice -> timeline -> audio mix -> Three.js frames -> MP4
set -euo pipefail
NAME=${1:-mera-mera}
B=build/$NAME; mkdir -p "$B" out
python3 tools/voice.py "shorts/$NAME/script.json" "$B"
python3 tools/audio.py "$B/timeline.json" "$B/mix.wav"
node tools/render.mjs "$B/timeline.json" "$B/video.mp4"
ffmpeg -y -v error -i "$B/video.mp4" -i "$B/mix.wav" -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "out/$NAME.mp4"
echo "done -> out/$NAME.mp4"
