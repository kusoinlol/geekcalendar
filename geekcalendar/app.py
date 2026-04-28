"""宅民曆 — Nerdy Calendar.

FastAPI app that renders a daily 農民曆-style page (theme-pluggable on
the frontend) and exposes the same data as JSON for browser extension /
mobile app consumers.
"""
from __future__ import annotations

import datetime
import time
from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from geekcalendar.calendar_logic import (
    load_quotes,
    load_yi_ji_file,
    pick_yi_ji,
    quote_for_date,
)
from geekcalendar.lunar import (
    auspicious_hours,
    chong_zodiac,
    day_of_year,
    engineer_chong,
    engineer_sha,
    ganzhi_year,
    iso_week,
    lunar_day_cn,
    lunar_month_cn,
    solar_to_lunar,
    zodiac_year,
)

PACKAGE_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = PACKAGE_DIR.parent
DATA_DIR = PACKAGE_DIR / "data"

QUOTES = load_quotes(PROJECT_ROOT / "it.json")
YI_POOL = load_yi_ji_file(DATA_DIR / "yi.json")
JI_POOL = load_yi_ji_file(DATA_DIR / "ji.json")

WEEKDAYS = ["一", "二", "三", "四", "五", "六", "日"]
THEMES = {
    "classic", "terminal", "newsprint", "temple",
    "cyberpunk", "ascii", "vscode", "receipt", "pos",
}
DEFAULT_THEME = "classic"

app = FastAPI(title="宅民曆 Nerdy Calendar", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_cache_headers(request: Request, call_next):
    """Cache hints for Cloudflare / browsers.

    The calendar payload is deterministic per date, and JSX assets only change
    on deploy. `s-maxage` controls the CDN's TTL (Cloudflare obeys it);
    `max-age` controls the browser's. Cloudflare Cache Rules can override these
    if needed but defaults work.
    """
    response = await call_next(request)
    if response.status_code >= 400:
        return response
    path = request.url.path
    if path.startswith("/static/"):
        response.headers["Cache-Control"] = "public, max-age=86400, s-maxage=86400"
    elif path == "/healthz":
        response.headers["Cache-Control"] = "no-store"
    elif path == "/" or path.startswith("/api/"):
        # Browser caches 10 min, CDN caches 1 hour. Purge Cloudflare cache
        # after each deploy or after editing yi.json / ji.json / it.json.
        response.headers["Cache-Control"] = "public, max-age=600, s-maxage=3600"
    return response


app.mount("/static", StaticFiles(directory=PACKAGE_DIR / "static"), name="static")
templates = Jinja2Templates(directory=PACKAGE_DIR / "templates")


def _parse_date(date_str: str | None) -> datetime.date:
    if not date_str:
        return datetime.date.today()
    try:
        return datetime.date.fromisoformat(date_str)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="date must be YYYY-MM-DD") from exc


def _build_payload(date: datetime.date) -> dict:
    yi, ji = pick_yi_ji(date, YI_POOL, JI_POOL)
    lunar = solar_to_lunar(date)
    return {
        "date": date.isoformat(),
        "iso": date.isoformat(),
        "year": date.year,
        "month": date.month,
        "day": date.day,
        "weekday": WEEKDAYS[date.weekday()],
        "weekdayIdx": date.weekday(),
        "quote": quote_for_date(date, QUOTES),
        "yi": yi,
        "ji": ji,
        # lunar / 干支 / 生肖
        "lunar": {"y": lunar.y, "m": lunar.m, "dM": lunar.dM, "leap": lunar.leap},
        "lunarMonthCN": lunar_month_cn(lunar.m, lunar.leap),
        "lunarDayCN": lunar_day_cn(lunar.dM),
        "ganzhi": ganzhi_year(lunar.y),
        "zodiac": zodiac_year(lunar.y),
        "chong": chong_zodiac(lunar.y),
        # engineer chrome
        "engChong": engineer_chong(date),
        "engSha": engineer_sha(date),
        "hours": auspicious_hours(date),
        # nerd extras
        "unix": int(time.mktime(date.timetuple())),
        "iso_week": iso_week(date),
        "doy": day_of_year(date),
        # nav
        "prev_date": (date - datetime.timedelta(days=1)).isoformat(),
        "next_date": (date + datetime.timedelta(days=1)).isoformat(),
        "is_today": date == datetime.date.today(),
    }


@app.get("/", response_class=HTMLResponse)
def index(request: Request, date: str | None = None, theme: str = DEFAULT_THEME) -> HTMLResponse:
    if theme not in THEMES:
        theme = DEFAULT_THEME
    target = _parse_date(date)
    payload = _build_payload(target)
    return templates.TemplateResponse(
        "calendar.html",
        {
            "request": request,
            "payload": payload,
            "theme": theme,
            "themes": sorted(THEMES),
        },
    )


@app.get("/api/v1/today")
def api_today(date: str | None = None) -> dict:
    """JSON payload for browser-extension / app consumers."""
    return _build_payload(_parse_date(date))


@app.get("/healthz")
def healthz() -> dict:
    return {"ok": True}
