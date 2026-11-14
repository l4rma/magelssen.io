#!/usr/bin/env sh
# Render the first page of a talk's PDF to thumbnail.png in the same folder.
# Usage: scripts/talk-thumbnail.sh content/talks/<slug>/slides.pdf
set -eu
pdf="$1"
out="$(dirname "$pdf")/thumbnail.png"
gs -q -o "$out" -sDEVICE=png16m -r150 -dFirstPage=1 -dLastPage=1 \
   -dTextAlphaBits=4 -dGraphicsAlphaBits=4 "$pdf"
echo "Wrote $out"
