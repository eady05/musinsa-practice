# Musinsa Search & Recommend API (Next.js)

## Requirements
- Node.js 18+

## Setup
```bash
npm install
```

## Run
```bash
npm run dev
```

## API

### Search
`GET /api/search?keyword=musinsa&category=top&minPrice=10000&maxPrice=30000&tags=basic,cotton`

Response:
```json
[
  {
    "id": 1,
    "name": "Basic Cotton T-Shirt",
    "brand": "MUSINSA",
    "price": 19000,
    "tags": ["basic", "cotton", "daily"]
  }
]
```

### Recommend
`GET /api/recommend/1`

Response:
```json
[
  {
    "id": 5,
    "name": "Loose Fit Cotton Tee",
    "brand": "MUSINSA",
    "similarityScore": 0.73
  }
]
```

## Tests
```bash
npm test
```
