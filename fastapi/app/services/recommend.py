from typing import List


def recommend_products(query: str) -> List[str]:
    # TODO: wire up real recommendation logic
    if not query:
        return []
    return [query]
