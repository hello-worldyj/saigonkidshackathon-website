#!/usr/bin/env bash
# Builds a pure static site (no API routes) for Firebase Hosting.
# The waitlist form calls NEXT_PUBLIC_API_BASE_URL (the Vercel deployment)
# instead of a local /api, so the API routes have nothing to do here —
# and Next's static export refuses to build if they're present at all.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ -z "${NEXT_PUBLIC_API_BASE_URL:-}" ]; then
  echo "NEXT_PUBLIC_API_BASE_URL must be set (e.g. https://saigon-kids-hackathon.vercel.app)" >&2
  exit 1
fi

trap 'if [ -d app/api.bak ]; then rm -rf app/api; mv app/api.bak app/api; fi' EXIT

rm -rf app/api.bak
mv app/api app/api.bak

STATIC_EXPORT=true NEXT_PUBLIC_API_BASE_URL="$NEXT_PUBLIC_API_BASE_URL" npx next build
