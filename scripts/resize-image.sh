#!/usr/bin/env sh
# Prepare photos for the site: rotate upright, shrink to fit 1600x1600
# (never enlarges), strip all metadata (GPS, camera, timestamps) and save
# JPEGs at quality 82. Files are replaced in place.
# Usage: scripts/resize-image.sh content/blog/<slug>/photo.jpeg [more files...]
set -eu
[ $# -gt 0 ] || { echo "Usage: $0 image [image...]" >&2; exit 1; }
for img in "$@"; do
  before=$(du -k "$img" | cut -f1)
  tmp="${img%.*}.tmp.${img##*.}"   # keep the extension so the format stays the same
  magick "$img" -auto-orient -resize '1600x1600>' -strip -quality 82 "$tmp"
  mv "$tmp" "$img"
  echo "$img: ${before}K -> $(du -k "$img" | cut -f1)K ($(magick identify -format '%wx%h' "$img"))"
done
