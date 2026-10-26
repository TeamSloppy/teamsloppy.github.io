#!/usr/bin/env bash
set -euo pipefail
installer="$(mktemp)"
trap 'rm -f "$installer"' EXIT
curl -fsSL https://github.com/TeamSloppy/Sloppy/releases/latest/download/install.sh -o "$installer"
bash "$installer" --release "$@"
