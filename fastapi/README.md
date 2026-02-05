# FastAPI Shipping Check

## Run
```bash
cd fastapi
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## API
- `POST /api/v1/shipping/check`

### Request
```json
{
  "items": [
    { "optionId": 101, "quantity": 2 },
    { "optionId": 201, "quantity": 1 }
  ]
}
```

### Response (available)
```json
{
  "available": true,
  "message": "All items available for immediate shipping."
}
```

### Response (unavailable)
```json
{
  "available": false,
  "unavailableItems": [
    { "optionId": 102, "reason": "stock: 0, required: 1" }
  ]
}
```

### Error cases
- invalid `optionId` -> `400`
- `quantity` <= 0 -> `400`

## Tests
```bash
cd fastapi
pytest -q
```
