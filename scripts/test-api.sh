#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../fastapi"

pytest -q
