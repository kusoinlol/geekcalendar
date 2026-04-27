"""農曆轉換 + 干支 + 工程師裝飾元素 (deterministic per date).

Mirrors the algorithm in almanac-core.js so HTML and JSON API agree.
LUNAR_INFO covers 1900–2049; outside that range we fall back to None.
"""
from __future__ import annotations

import datetime
from dataclasses import dataclass

# ── Lunar data table (1900–2049) ────────────────────────────────────────────
LUNAR_INFO = [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
    0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
    0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
    0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
    0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
]

ZHI_NUM = ['初', '十', '廿', '卅']
ZHI_UNIT = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
MONTHS_CN = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '臘']
TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
ZODIAC = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬']


@dataclass
class LunarDate:
    y: int
    m: int
    dM: int
    leap: bool


def _leap_month(y: int) -> int:
    return LUNAR_INFO[y - 1900] & 0xf


def _leap_days(y: int) -> int:
    if _leap_month(y):
        return 30 if (LUNAR_INFO[y - 1900] & 0x10000) else 29
    return 0


def _month_days(y: int, m: int) -> int:
    return 30 if (LUNAR_INFO[y - 1900] & (0x10000 >> m)) else 29


def _year_days(y: int) -> int:
    s = 348
    bit = 0x8000
    while bit > 0x8:
        if LUNAR_INFO[y - 1900] & bit:
            s += 1
        bit >>= 1
    return s + _leap_days(y)


def solar_to_lunar(d: datetime.date) -> LunarDate:
    """Approximate solar → lunar conversion (1900–2049)."""
    if d.year < 1900 or d.year > 2049:
        # Out of table — return solar as best-effort.
        return LunarDate(d.year, d.month, d.day, False)
    base = datetime.date(1900, 1, 31)
    offset = (d - base).days
    y = 1900
    while y < 2050 and offset > 0:
        temp = _year_days(y)
        if offset < temp:
            break
        offset -= temp
        y += 1
    leap = _leap_month(y)
    is_leap = False
    m = 1
    while m < 13 and offset > 0:
        if leap > 0 and m == leap + 1 and not is_leap:
            m -= 1
            is_leap = True
            temp = _leap_days(y)
        else:
            temp = _month_days(y, m)
        if is_leap and m == leap + 1:
            is_leap = False
        if offset < temp:
            break
        offset -= temp
        m += 1
    return LunarDate(y, m, offset + 1, is_leap)


def lunar_day_cn(d: int) -> str:
    if d == 10:
        return '初十'
    if d == 20:
        return '二十'
    if d == 30:
        return '三十'
    return ZHI_NUM[d // 10] + ZHI_UNIT[d % 10]


def lunar_month_cn(m: int, leap: bool) -> str:
    return ('閏' if leap else '') + MONTHS_CN[m - 1] + '月'


def ganzhi_year(ly: int) -> str:
    o = (ly - 4) % 60
    return TIANGAN[o % 10] + DIZHI[o % 12]


def zodiac_year(ly: int) -> str:
    return ZODIAC[(ly - 4) % 12]


def chong_zodiac(ly: int) -> str:
    return ZODIAC[((ly - 4) % 12 + 6) % 12]


# ── Engineer-themed extras ───────────────────────────────────────────────────
CHONG_ENG = ['前端', '後端', 'PM', 'SRE', 'DBA', '資安', '設計師', '測試', '實習生', '主管', '客戶', 'iOS']
SHA_DIRECTIONS = [
    'console.log', 'main 分支', 'prod DB', 'Sentry 警報', 'Slack 訊息',
    'Jenkins 紅燈', 'PR review', 'linter', 'TypeScript any', 'GitHub Actions',
    'staging 環境', 'rebase 衝突',
]
HOURS_DIZHI = [
    {'dz': '子', 'range': '23–01'}, {'dz': '丑', 'range': '01–03'},
    {'dz': '寅', 'range': '03–05'}, {'dz': '卯', 'range': '05–07'},
    {'dz': '辰', 'range': '07–09'}, {'dz': '巳', 'range': '09–11'},
    {'dz': '午', 'range': '11–13'}, {'dz': '未', 'range': '13–15'},
    {'dz': '申', 'range': '15–17'}, {'dz': '酉', 'range': '17–19'},
    {'dz': '戌', 'range': '19–21'}, {'dz': '亥', 'range': '21–23'},
]
ENG_ACTIVITIES = [
    'deploy', 'code review', '重構', '寫測試', '開站立會議', '喝咖啡',
    '1-on-1', 'rebase', '寫文件', '除錯', '開 PR', '下班', '看文件', '放空',
]


def _seed_for_date(d: datetime.date) -> int:
    return d.year * 10000 + d.month * 100 + d.day


def _seeded_pick(seq, seed: int):
    """Deterministic single-element pick — a stand-in for random.Random(seed).choice."""
    import random
    return random.Random(seed).choice(seq)


def _seeded_shuffle(seq, seed: int):
    import random
    out = list(seq)
    random.Random(seed).shuffle(out)
    return out


def engineer_chong(d: datetime.date) -> str:
    return _seeded_pick(CHONG_ENG, _seed_for_date(d) ^ 0x1337)


def engineer_sha(d: datetime.date) -> str:
    return _seeded_pick(SHA_DIRECTIONS, _seed_for_date(d) ^ 0xc0de)


def auspicious_hours(d: datetime.date) -> list[dict]:
    hours = _seeded_shuffle(HOURS_DIZHI, _seed_for_date(d) ^ 0xb00b)[:3]
    acts = _seeded_shuffle(ENG_ACTIVITIES, _seed_for_date(d) ^ 0xb00c)
    return [{**h, 'act': acts[i]} for i, h in enumerate(hours)]


def iso_week(d: datetime.date) -> int:
    return d.isocalendar().week


def day_of_year(d: datetime.date) -> int:
    return (d - datetime.date(d.year, 1, 1)).days + 1
