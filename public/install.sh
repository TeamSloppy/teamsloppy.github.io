#!/usr/bin/env bash
set -euo pipefail
curl -fsSL https://raw.githubusercontent.com/TeamSloppy/Sloppy/main/scripts/install.sh | bash -s -- "$@"
