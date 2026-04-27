"""Deterministic per-date selection for 宅民曆.

Same calendar date always produces the same quote and 宜/忌 set, so the
"almanac" UX stays consistent across page loads, sessions, and deployments.
"""
from __future__ import annotations

import datetime
import json
import random
from pathlib import Path
from typing import TypedDict


class YiJiItem(TypedDict):
    id: str
    text: str
    tags: list[str]


def _seed_for_date(date: datetime.date) -> int:
    return date.year * 10000 + date.month * 100 + date.day


def quote_for_date(date: datetime.date, quotes: list[str]) -> str:
    if not quotes:
        return ""
    return quotes[_seed_for_date(date) % len(quotes)]


def pick_yi_ji(
    date: datetime.date,
    yi_pool: list[YiJiItem],
    ji_pool: list[YiJiItem],
    *,
    min_count: int = 3,
    max_count: int = 5,
) -> tuple[list[YiJiItem], list[YiJiItem]]:
    """Pick 3-5 items from each pool, ensuring no tag overlap between sets.

    Conflict rule: a 忌 item is rejected if any of its tags also appears on a
    selected 宜 item. 宜 is picked first; 忌 fills around what was chosen.
    """
    rng = random.Random(_seed_for_date(date))

    def shuffled(pool: list[YiJiItem]) -> list[YiJiItem]:
        copy = list(pool)
        rng.shuffle(copy)
        return copy

    n_yi = rng.randint(min_count, min(max_count, len(yi_pool))) if yi_pool else 0
    yi = shuffled(yi_pool)[:n_yi]

    used_tags: set[str] = {tag for item in yi for tag in item["tags"]}

    n_ji_target = rng.randint(min_count, min(max_count, len(ji_pool))) if ji_pool else 0
    ji: list[YiJiItem] = []
    for item in shuffled(ji_pool):
        if not used_tags.isdisjoint(item["tags"]):
            continue
        ji.append(item)
        if len(ji) >= n_ji_target:
            break

    return yi, ji


def load_yi_ji_file(path: Path) -> list[YiJiItem]:
    with path.open(encoding="utf-8") as f:
        data = json.load(f)
    items = data["items"]
    seen: set[str] = set()
    for item in items:
        if item["id"] in seen:
            raise ValueError(f"duplicate id in {path.name}: {item['id']}")
        if not item.get("tags"):
            raise ValueError(f"{path.name}:{item['id']} must declare at least one tag")
        seen.add(item["id"])
    return items


def load_quotes(path: Path) -> list[str]:
    with path.open(encoding="utf-8") as f:
        return json.load(f)
