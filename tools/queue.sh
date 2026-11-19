#!/bin/bash
# Render shorts one after another (a lock file serializes them). usage: tools/queue.sh name...
for n in "$@"; do
  while pgrep -f "^/bin/bash ./make.sh|^bash ./make.sh" >/dev/null && [ ! -e build/render.lock.held ]; do sleep 15; done
  mkdir -p build/$n
  flock build/render.lock ./make.sh $n > build/$n/make.log 2>&1; echo "$n: $(tail -1 build/$n/make.log)"
done
