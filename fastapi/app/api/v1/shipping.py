from collections import defaultdict
from typing import Dict, List, Union

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.models.product_data import PRODUCTS, ProductOption

router = APIRouter()


class ShippingItem(BaseModel):
    optionId: int = Field(..., ge=1)
    quantity: int


class ShippingCheckRequest(BaseModel):
    items: List[ShippingItem]


class UnavailableItem(BaseModel):
    optionId: int
    reason: str


class ShippingCheckAvailableResponse(BaseModel):
    available: bool
    message: str


class ShippingCheckUnavailableResponse(BaseModel):
    available: bool
    unavailableItems: List[UnavailableItem]


def _build_option_index() -> Dict[int, ProductOption]:
    option_index: Dict[int, ProductOption] = {}
    for product in PRODUCTS:
        for option in product.options:
            option_index[option.option_id] = option
    return option_index


@router.post(
    "/shipping/check",
    response_model=Union[
        ShippingCheckAvailableResponse, ShippingCheckUnavailableResponse
    ],
)
def check_shipping_availability(payload: ShippingCheckRequest):
    option_index = _build_option_index()

    # Aggregate quantities by optionId to handle duplicates in a single request.
    required_by_option: Dict[int, int] = defaultdict(int)
    for item in payload.items:
        if item.quantity <= 0:
            raise HTTPException(status_code=400, detail="quantity must be greater than 0")
        if item.optionId not in option_index:
            raise HTTPException(status_code=400, detail=f"optionId {item.optionId} not found")
        required_by_option[item.optionId] += item.quantity

    unavailable: List[UnavailableItem] = []
    # Compare required quantity with current stock.
    for option_id, required_qty in required_by_option.items():
        stock = option_index[option_id].stock
        if stock < required_qty:
            unavailable.append(
                UnavailableItem(
                    optionId=option_id,
                    reason=f"stock: {stock}, required: {required_qty}",
                )
            )

    if unavailable:
        return ShippingCheckUnavailableResponse(
            available=False,
            unavailableItems=unavailable,
        )

    return ShippingCheckAvailableResponse(
        available=True,
        message="All items available for immediate shipping.",
    )
