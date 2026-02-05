from dataclasses import dataclass
from typing import List


@dataclass(frozen=True)
class ProductOption:
    option_id: int
    color: str
    size: str
    stock: int


@dataclass(frozen=True)
class Product:
    id: int
    name: str
    options: List[ProductOption]


PRODUCTS: List[Product] = [
    Product(
        id=1,
        name="Basic T-Shirt",
        options=[
            ProductOption(option_id=101, color="black", size="M", stock=5),
            ProductOption(option_id=102, color="black", size="L", stock=0),
            ProductOption(option_id=103, color="white", size="M", stock=3),
        ],
    ),
    Product(
        id=2,
        name="Jogger Pants",
        options=[
            ProductOption(option_id=201, color="gray", size="M", stock=1),
            ProductOption(option_id=202, color="gray", size="L", stock=2),
        ],
    ),
]
