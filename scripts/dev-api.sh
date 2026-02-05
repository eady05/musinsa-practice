#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../fastapi"

uvicorn app.main:app --reload
