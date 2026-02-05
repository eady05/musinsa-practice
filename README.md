# Musinsa Monorepo

## Structure
- `next` Next.js app
- `fastapi` FastAPI app (template structure)

## Quick Start
- Web dev server: `./scripts/dev-web.sh`
- API dev server: `./scripts/dev-api.sh`

## Tests
- Web tests: `./scripts/test-web.sh`
- API tests: `./scripts/test-api.sh`

## API Setup
- Install deps: `python -m venv .venv && source .venv/bin/activate && pip install -r fastapi/requirements.txt`
- Health check: `GET /api/v1/health`
