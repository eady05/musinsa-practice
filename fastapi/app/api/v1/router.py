from fastapi import APIRouter

from app.api.v1 import health, shipping

api_router = APIRouter()
api_router.include_router(health.router, tags=["health"])
api_router.include_router(shipping.router, tags=["shipping"])
