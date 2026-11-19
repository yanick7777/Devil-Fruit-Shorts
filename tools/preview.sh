#!/bin/bash
# Build timeline + mid-shot stills + contact sheet for a short. usage: tools/preview.sh name
n=$1; mkdir -p build/$n/st
python3 tools/voice.py shorts/$n/script.json build/$n > /dev/null || exit 1
node tools/render.mjs build/$n/timeline.json build/$n/st/s --only 0 2>&1 2>&1 | grep -iE "error|not a function|undefined" | head -3
T=$(python3 -c "
import json;c=json.load(open('build/$n/cues.json'));print(','.join(f\"{(s['t0']+s['t1'])/2:.2f}\" for s in c['shots']))")
node tools/render.mjs build/$n/timeline.json build/$n/st/s --only $T 2>&1 2>&1 | grep -iE "error|not a function|undefined" | head -3
python3 tools/contact.py build/$n/cues.json build/$n/st/s shorts/$n/review/contact_sheet.jpg
