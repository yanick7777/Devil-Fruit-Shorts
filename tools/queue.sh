#!/bin/bash
# Render shorts one after another, waiting for any running make.sh to finish first. usage: tools/queue.sh name...
for n in "$@"; do
  while pgrep -f "make.sh" >/dev/null; do sleep 15; done
  mkdir -p build/$n; ./make.sh $n > build/$n/make.log 2>&1; echo "$n: $(tail -1 build/$n/make.log)"
done
