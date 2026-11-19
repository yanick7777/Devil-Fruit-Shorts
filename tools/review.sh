#!/bin/bash
# design sheets + contact sheet + PLAN for one short. usage: tools/review.sh name
n=$1; for k in fruit cast bg; do node tools/sheet.mjs /shorts/$n/sheets.js shorts/$n/review/${k}_sheet.png "k=$k" || exit 1; done
tools/preview.sh $n && python3 tools/mkplan.py $n > /dev/null
