from fastapi.testclient import TestClient

from app.main import create_app


client = TestClient(create_app())


def test_shipping_available_true() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={"items": [{"optionId": 101, "quantity": 2}]},
    )
    assert response.status_code == 200
    assert response.json() == {
        "available": True,
        "message": "All items available for immediate shipping.",
    }


def test_shipping_insufficient_stock_false() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={"items": [{"optionId": 102, "quantity": 1}]},
    )
    assert response.status_code == 200
    assert response.json() == {
        "available": False,
        "unavailableItems": [
            {"optionId": 102, "reason": "stock: 0, required: 1"}
        ],
    }


def test_shipping_one_of_many_insufficient() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={
            "items": [
                {"optionId": 101, "quantity": 1},
                {"optionId": 201, "quantity": 2},
            ]
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "available": False,
        "unavailableItems": [
            {"optionId": 201, "reason": "stock: 1, required: 2"}
        ],
    }


def test_shipping_invalid_option_id_400() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={"items": [{"optionId": 999, "quantity": 1}]},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "optionId 999 not found"}


def test_shipping_quantity_zero_400() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={"items": [{"optionId": 101, "quantity": 0}]},
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "quantity must be greater than 0"}


def test_shipping_reason_aggregation() -> None:
    response = client.post(
        "/api/v1/shipping/check",
        json={
            "items": [
                {"optionId": 201, "quantity": 1},
                {"optionId": 201, "quantity": 1},
            ]
        },
    )
    assert response.status_code == 200
    assert response.json() == {
        "available": False,
        "unavailableItems": [
            {"optionId": 201, "reason": "stock: 1, required: 2"}
        ],
    }
