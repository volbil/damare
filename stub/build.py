"""Build ``stub/data.pkl`` from ``stub/ranobe.json``.

The bulk dataset is not committed (gitignored). After dropping a fresh
``ranobe.json`` into this directory, run::

    uv run python -m stub.build

The script parses the raw export, strips Quill HTML, fabricates the
fields ranobe doesn't track (source language, ★ score, chapter excerpts,
etc.), and pickles a single bundle that ``stub/__init__.py`` loads on
import. Running uvicorn never re-parses 457 MB.

Determinism: ``random.seed(42)`` so re-runs produce stable output.
"""

import json
import os
import pickle
import random
import re
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).parent
SOURCE = ROOT / "ranobe.json"
OUTPUT = ROOT / "data.pkl"
LOADER = ROOT / "loader.py"

random.seed(42)


# ─── HTML stripping ─────────────────────────────────────────────────────

class _StripHTML(HTMLParser):
    """Quill HTML → plain text, with paragraph breaks preserved."""

    _BLOCK = {"p", "div", "h1", "h2", "h3", "h4", "h5", "h6", "li", "blockquote"}

    def __init__(self):
        super().__init__()
        self._parts = []

    def handle_starttag(self, tag, attrs):
        if tag == "br":
            self._parts.append("\n")

    def handle_endtag(self, tag):
        if tag in self._BLOCK:
            self._parts.append("\n")

    def handle_data(self, data):
        self._parts.append(data)

    def text(self):
        out = "".join(self._parts)
        out = re.sub(r"\n{3,}", "\n\n", out)
        out = re.sub(r"[ \t]+", " ", out)
        return out.strip()


def strip_html(html):
    if not html:
        return ""
    p = _StripHTML()
    try:
        p.feed(html)
        p.close()
    except Exception:
        return html
    return p.text()


# ─── Language detection ─────────────────────────────────────────────────

_HANGUL = re.compile(r"[가-힯]")
_KANA = re.compile(r"[぀-ゟ゠-ヿ]")
_HANZI = re.compile(r"[一-鿿]")
_CYRILLIC = re.compile(r"[Ѐ-ӿ]")
_LATIN = re.compile(r"[a-zA-Z]")


def detect_language(record):
    """Heuristic source language. Returns 'ja' / 'ko' / 'zh' / 'en' / 'uk' / None."""

    title = record.get("title_original") or ""

    if _HANGUL.search(title):
        return "ko"
    if _KANA.search(title):
        return "ja"
    if _HANZI.search(title):
        return "zh"

    url = (record.get("original_url") or "").lower()
    if "kakao" in url or ".kr/" in url:
        return "ko"
    if "syosetu" in url or "kakuyomu" in url or ".jp/" in url:
        return "ja"
    if "qidian" in url or "jjwxc" in url or ".cn/" in url:
        return "zh"

    if _CYRILLIC.search(title):
        return "uk"
    if _LATIN.search(title):
        return "en"

    return None


# ─── Score fabrication ──────────────────────────────────────────────────

def fabricate_score(record):
    """A believable ★ rating derived from likes/views/bookmarks."""

    likes = record.get("likes") or 0
    views = max(record.get("views") or 0, 1)
    bookmarks = record.get("bookmarks") or 0

    if views < 50:
        # Not enough engagement to compute — anchor to id hash for stability.
        h = abs(hash(record.get("id", 0))) % 1000
        return round(7.0 + (h / 1000.0) * 2.0, 1)

    engagement = (likes + bookmarks * 2) / views
    score = 7.0 + min(engagement * 50, 2.5)
    return round(min(max(score, 6.5), 9.7), 1)


# ─── Date formatting (Ukrainian) ────────────────────────────────────────

_MONTHS_UA = [
    "січня", "лютого", "березня", "квітня", "травня", "червня",
    "липня", "серпня", "вересня", "жовтня", "листопада", "грудня",
]


def fmt_relative_uk(epoch):
    """Format an epoch as a relative Ukrainian time string."""

    if not epoch:
        return ""

    now = datetime.now(timezone.utc).timestamp()
    delta = max(now - epoch, 0)

    if delta < 60:
        return "щойно"
    if delta < 3600:
        return f"{int(delta // 60)} хв тому"
    if delta < 86400:
        return f"{int(delta // 3600)} год тому"
    if delta < 86400 * 2:
        return "вчора"
    if delta < 86400 * 7:
        return f"{int(delta // 86400)} днів тому"
    if delta < 86400 * 14:
        return "тиждень тому"
    if delta < 86400 * 30:
        return f"{int(delta // (86400 * 7))} тижні тому"
    if delta < 86400 * 60:
        return "місяць тому"
    if delta < 86400 * 365:
        return f"{int(delta // (86400 * 30))} місяців тому"
    return "давно"


def fmt_joined_uk(epoch):
    """Format an epoch as 'місяця року' (Ukrainian style)."""

    if not epoch:
        return ""
    dt = datetime.fromtimestamp(epoch, tz=timezone.utc)
    return f"{_MONTHS_UA[dt.month - 1]} {dt.year}"


# ─── Slug / handle ──────────────────────────────────────────────────────

_TRANSLIT = str.maketrans({
    "а": "a", "б": "b", "в": "v", "г": "h", "ґ": "g", "д": "d",
    "е": "e", "є": "ie", "ж": "zh", "з": "z", "и": "y", "і": "i",
    "ї": "ji", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n",
    "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "kh", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "shch",
    "ь": "", "ю": "iu", "я": "ia", "'": "", "ʼ": "",
})


def slugify(name):
    """URL-safe slug from Cyrillic or Latin name."""

    if not name:
        return "anon"
    slug = name.lower().translate(_TRANSLIT)
    slug = re.sub(r"[^a-z0-9]+", "_", slug).strip("_")
    return slug or "anon"


def initials(name):
    """First letter of first two words, uppercased."""

    if not name:
        return "?"
    parts = [p for p in re.split(r"\s+", name.strip()) if p]
    return "".join(p[0] for p in parts[:2]).upper() or "?"


# ─── Status mapping ─────────────────────────────────────────────────────

_STATUS_UA = {
    "ongoing": "У процесі",
    "finished": "Завершено",
    "paused": "Призупинено",
    "coming_soon": "Скоро",
}


_TRANS_TO_TEAM_STATUS = {
    "ongoing": "active",
    "finished": "completed",
    "paused": "frozen",
    "coming_soon": "active",
}


# ─── Junk filter ────────────────────────────────────────────────────────

def is_junk_record(record):
    """Discard test entries and titles with trailing whitespace."""

    title = record.get("title_ua") or ""

    if not title.strip():
        return True
    if title != title.rstrip():
        return True

    junk = ("тест тест", "test test", "запис зі збірки чундок")
    title_lower = title.lower()
    return any(p in title_lower for p in junk)


# ─── Per-novel parser ───────────────────────────────────────────────────

def parse_novel(record):
    """Convert a ranobe.json record into the schema NOVELS uses."""

    src_lang = detect_language(record)
    is_translation = src_lang in ("ja", "ko", "zh", "en")
    novel_type = "translation" if is_translation else "original"

    title_ua = record["title_ua"]
    title_orig = record.get("title_original") or None
    title_en = record.get("title_en") or None

    writers = record.get("writers") or []
    if writers:
        original_author = writers[0].get("name") or "Невідомий"
    else:
        original_author = (record.get("author") or {}).get("name") or "Невідомий"

    score = fabricate_score(record)
    likes = record.get("likes") or 0
    bookmarks = record.get("bookmarks") or 0
    comments_count = record.get("comments") or 0
    views = record.get("views") or 0

    # Tags from genres + tags (lowercase, dedup)
    tag_names = []
    seen = set()
    for t in (record.get("genres") or []) + (record.get("tags") or []):
        name = (t.get("name") or "").strip().lower() if t else ""
        if name and name not in seen:
            tag_names.append(name)
            seen.add(name)

    # Chapters — strip HTML, build chapter list and excerpt
    raw_chapters = record.get("chapters_list") or []

    def _ch_sort_key(ch):
        # Chapter numbers can be decimal strings ("35.4" for sub-chapters).
        try:
            n = float(ch.get("chapter") or 0)
        except (TypeError, ValueError):
            n = 0.0
        try:
            p = float(ch.get("part") or 1)
        except (TypeError, ValueError):
            p = 1.0
        return (n, p)

    raw_chapters_sorted = sorted(raw_chapters, key=_ch_sort_key)

    chapters_full = []
    excerpt_text = ""
    word_count = 0

    for i, ch in enumerate(raw_chapters_sorted, start=1):
        pages = []
        for p in (ch.get("pages") or []):
            text = strip_html(p.get("content") or "")
            pages.append({"order": p.get("order", 0), "text": text})
            word_count += len(text.split())

        if not excerpt_text:
            for p in pages:
                if p["text"]:
                    excerpt_text = p["text"]
                    break

        team_obj = ch.get("team") or {}
        chapter_no = i  # Sequential, matches existing schema's "no" field
        chapter_name = ch.get("name") or f"Розділ {ch.get('chapter') or i}"
        team_id = str(team_obj.get("id")) if team_obj.get("id") is not None else None

        chapter_dict = {
            "no": chapter_no,
            "title": chapter_name,
            "primary_title": chapter_name,
            "updated": fmt_relative_uk(ch.get("updated")),
            "updated_epoch": ch.get("updated"),
            "translations": [
                {
                    "team_id": team_id,
                    "title": chapter_name,
                    "updated": fmt_relative_uk(ch.get("updated")),
                }
            ] if is_translation and team_id else [],
            "pages": pages,
            "likes": ch.get("likes") or 0,
            "views": ch.get("views") or 0,
        }
        chapters_full.append(chapter_dict)

    # Excerpt — first ~140 chars from first available chapter text
    excerpt = ""
    if excerpt_text:
        first_para = excerpt_text.split("\n")[0]
        excerpt = first_para[:140]
        if len(first_para) > 140:
            excerpt = excerpt.rsplit(" ", 1)[0].rstrip(",.;:") + "…"

    # Fandom — for translations, use the original title as a "fandom" tag
    fandom = None
    if is_translation and title_orig and title_orig != title_ua:
        fandom = title_orig if len(title_orig) <= 40 else None

    # Teams — collect from top-level + per-chapter
    raw_teams = record.get("teams") or []
    raw_trans_status = record.get("translation_status") or "ongoing"
    team_status = _TRANS_TO_TEAM_STATUS.get(raw_trans_status, "active")
    chapters_done = record.get("chapters") or 0

    teams_active = []
    for t in raw_teams:
        teams_active.append({
            "team_id": str(t.get("id")),
            "title": title_ua,
            "status": team_status,
            "chapters_done": chapters_done,
            "last_update": fmt_relative_uk(record.get("updated")),
            "kudos_total": likes // max(len(raw_teams), 1),
            "translator_notes_excerpt": (t.get("description") or "")[:120],
        })

    # Author handle for the novel author display
    author_handle = slugify(original_author)

    novel = {
        "id": f"r{record['id']}",
        "type": novel_type,

        "summary": record.get("descriptions") or "",
        "tags": tag_names,
        "warnings": [],
        "rating": "G",
        "source_language": src_lang,

        "title": title_ua,
        "title_en": title_en,
        "title_ja": title_orig if src_lang == "ja" else None,
        "title_romaji": None,

        "original_author": original_author if is_translation else None,
        "original_publisher": None,
        "original_year": record.get("year"),
        "original_status": _STATUS_UA.get(record.get("status"), "У процесі"),

        "author": original_author,
        "author_handle": author_handle,
        "fandom": fandom,

        "chapters": chapters_done,
        "chapter_count": record.get("total_chapters") or chapters_done or 0,
        "words": word_count,

        "kudos": likes,
        "bookmarks": bookmarks,
        "comments": comments_count,
        "hits": views,

        "updated": fmt_relative_uk(record.get("updated")),
        "updated_epoch": record.get("updated") or 0,
        "status": _STATUS_UA.get(raw_trans_status, "У процесі"),
        "progress": int(min(
            100,
            (chapters_done / max(record.get("total_chapters") or chapters_done or 1, 1)) * 100,
        )),

        "score": score,
        "votes": likes + bookmarks,
        "excerpt": excerpt,

        "teams_active": teams_active,
        "chapters_full": chapters_full,

        "cover_image": record.get("cover_image"),
        "background_image": record.get("background_image"),
    }

    if not is_translation:
        author_obj = record.get("author") or {}
        novel["author_obj"] = {
            "id": slugify(author_obj.get("name") or original_author),
            "name": author_obj.get("name") or original_author,
            "avatar": initials(author_obj.get("name") or original_author),
            "bio": "",
        }
        novel["original_author"] = None

    return novel


# ─── TEAMS ──────────────────────────────────────────────────────────────

def build_teams(raw_records):
    """Collect unique teams across all raw records."""

    seen = {}
    for record in raw_records:
        for t in (record.get("teams") or []):
            tid = str(t.get("id"))
            if tid in seen:
                continue
            name = t.get("name") or f"Команда {tid}"
            description = (t.get("description") or "").strip()
            is_solo = "/" not in name and (
                "соло" in description.lower() or len(name.split()) == 1
            )
            seen[tid] = {
                "id": tid,
                "name": name,
                "avatar": initials(name),
                "kind": "solo" if is_solo else "group",
                "members_count": 1 if is_solo else 3,
                "members": [],
                "joined": fmt_joined_uk(t.get("created")),
                "bio": description or "Команда перекладачів.",
                "kudos": t.get("kudos") or 0,
                "background_image": t.get("background_image"),
                "team_avatar_url": t.get("avatar"),
                "links": t.get("links") or [],
                "contact_link": t.get("contact_link"),
            }
    return list(seen.values())


# ─── USERS ──────────────────────────────────────────────────────────────

_CITIES = ["Київ", "Львів", "Харків", "Одеса", "Дніпро", "Запоріжжя",
           "Чернігів", "Тернопіль", "Чернівці", "Рівне", "Полтава", "Суми"]


def build_users(raw_records, novels):
    """Collect uploader users + ensure each novel.author_handle resolves."""

    by_handle = {}

    # Collect from raw record uploader (.author)
    for record in raw_records:
        author = record.get("author") or {}
        if not author:
            continue
        name = author.get("name") or f"user{author.get('id')}"
        handle = slugify(name)
        if handle in by_handle:
            continue
        by_handle[handle] = {
            "handle": handle,
            "name": name,
            "avatar": initials(name),
            "location": _CITIES[abs(hash(handle)) % len(_CITIES)],
            "joined": fmt_joined_uk(author.get("created")),
            "bio": "",
            "team_memberships": [],
            "original_handles": [],
            "roles": [],
            "following": [],
            "_external_avatar": author.get("avatar"),
        }

    # Make sure each novel's author_handle resolves; mark originals
    for n in novels:
        handle = n.get("author_handle")
        if not handle:
            continue
        if handle not in by_handle:
            by_handle[handle] = {
                "handle": handle,
                "name": n["author"],
                "avatar": initials(n["author"]),
                "location": _CITIES[abs(hash(handle)) % len(_CITIES)],
                "joined": "",
                "bio": "",
                "team_memberships": [],
                "original_handles": [],
                "roles": [],
                "following": [],
                "_external_avatar": None,
            }
        if n["type"] == "original":
            user = by_handle[handle]
            if n["id"] not in user["original_handles"]:
                user["original_handles"].append(n["id"])
            if "авторка" not in user["roles"] and "автор" not in user["roles"]:
                user["roles"].append("автор/ка")

    return list(by_handle.values())


# ─── TOP_WEEK ───────────────────────────────────────────────────────────

_TRENDS = ["↑1", "↑2", "↑3", "↑5", "=", "=", "=", "↓1", "↓2", "↓3", "NEW"]


def build_top_week(novels):
    """Top 10 by score (with votes as tiebreaker)."""

    sorted_n = sorted(novels, key=lambda n: (-n["score"], -n["votes"]))[:10]
    out = []
    for i, n in enumerate(sorted_n):
        out.append({
            "rank": i + 1,
            "id": n["id"],
            "title": n["title"],
            "author": n["author"],
            "score": n["score"],
            "votes": n["votes"],
            "trend": _TRENDS[i % len(_TRENDS)],
            "is_translation": n["type"] == "translation",
            "source_language": n["source_language"],
            "cover_image": n.get("cover_image"),
            "background_image": n.get("background_image"),
        })
    return out


# ─── HOT_NOW ────────────────────────────────────────────────────────────

def _last_chapter_title(novel):
    if novel["chapters_full"]:
        return novel["chapters_full"][-1].get("primary_title") or "Розділ"
    return "Розділ"


def _hot_card(novel, kind, label, detail):
    return {
        "id": novel["id"],
        "title": novel["title"],
        "author_or_team": novel["author"],
        "is_translation": novel["type"] == "translation",
        "source_language": novel["source_language"],
        "fandom": novel.get("fandom"),
        "signal_kind": kind,
        "signal_label": label,
        "signal_detail": detail,
        "chapter_count": novel["chapter_count"],
        "last_chapter_no": novel["chapters"] or len(novel["chapters_full"]),
        "last_chapter_title": _last_chapter_title(novel),
        "excerpt": novel.get("excerpt") or "",
        "cover_image": novel.get("cover_image"),
        "background_image": novel.get("background_image"),
    }


def build_hot_now(novels):
    """Pick four novels with diverse signal kinds."""

    out = []
    used = set()

    by_recent = sorted(novels, key=lambda n: -(n.get("updated_epoch") or 0))
    by_score = sorted(novels, key=lambda n: -n["score"])
    by_comments = sorted(novels, key=lambda n: -(n["comments"] or 0))

    # burst — recent + has chapters
    for n in by_recent:
        if n["id"] in used:
            continue
        if n["chapters"] >= 3 and n.get("excerpt"):
            out.append(_hot_card(n, "burst", f"+{min(n['chapters'], 7)} розділів", "за останню добу"))
            used.add(n["id"])
            break

    # momentum — high score
    for n in by_score:
        if n["id"] in used:
            continue
        if n.get("excerpt"):
            out.append(_hot_card(n, "momentum", "↑ 320%", "читачів цього тижня"))
            used.add(n["id"])
            break

    # storm — many comments
    for n in by_comments:
        if n["id"] in used:
            continue
        if (n["comments"] or 0) > 0 and n.get("excerpt"):
            out.append(_hot_card(n, "storm", f"{n['comments']} коментарів", "обговорення кипить"))
            used.add(n["id"])
            break

    # finale — completed
    for n in by_recent:
        if n["id"] in used:
            continue
        if n.get("status") == "Завершено" and n.get("excerpt"):
            out.append(_hot_card(n, "finale", "фінальний розділ", f"вчора · {n['chapter_count']} розділів"))
            used.add(n["id"])
            break

    return out


# ─── RECENT_COMMENTS ────────────────────────────────────────────────────

_GENERIC_COMMENTS = [
    "Цей розділ просто розриває серце. І перекладач передав жарт ідеально — рідко так буває!",
    "Я зрозуміла, ким насправді була та героїня! Перечитала перший розділ — все сходиться 🤯",
    "Дякую перекладачам за такий темп. Прочитала за вечір. Чекаю на наступну главу.",
    "переклад тримає темп ориґіналу, фрази дихають. найкраща глава за останній арк.",
    "епілог зробив мені боляче і добре одночасно. дякую що довели до кінця",
    "Як ви це робите, що мовчання чути голосніше за крик?",
]

_GENERIC_USERS = [
    {"name": "kateryna_v", "avatar": "КВ"},
    {"name": "drozdiv_son", "avatar": "ДС"},
    {"name": "ostap.read", "avatar": "ОР"},
    {"name": "оля_читає", "avatar": "ОЧ"},
    {"name": "архіваріус", "avatar": "АР"},
]


def build_recent_comments(novels):
    """Three fabricated comments tied to real novels."""

    if len(novels) < 3:
        return []

    picks = random.sample(novels[:30], 3)
    times = ["6 хв", "22 хв", "41 хв"]
    return [
        {
            "user": _GENERIC_USERS[i],
            "novel_title": n["title"],
            "chapter_no": max(n.get("chapters") or 1, 1),
            "body": _GENERIC_COMMENTS[i],
            "kudos": random.randint(5, 30),
            "time": times[i],
        }
        for i, n in enumerate(picks)
    ]


# ─── TAGS (for tag cloud / filter) ──────────────────────────────────────

def build_tags(raw_records):
    """Aggregate genres + tags with frequency-derived counts."""

    counter = {}
    for record in raw_records:
        for t in (record.get("genres") or []) + (record.get("tags") or []):
            name = (t.get("name") or "").strip().lower() if t else ""
            if name:
                counter[name] = counter.get(name, 0) + 1

    items = sorted(counter.items(), key=lambda x: -x[1])
    return [
        {"name": name, "count": count * 100 + random.randint(50, 500)}
        for name, count in items[:30]
    ]


# ─── READER_CHAPTER ─────────────────────────────────────────────────────

def build_reader_chapter(novels):
    """Pick a real first chapter, render its first ~10 paragraphs."""

    for n in novels:
        if n["chapters_full"] and any(p["text"] for ch in n["chapters_full"] for p in ch["pages"]):
            ch = n["chapters_full"][0]
            text = "\n\n".join(p["text"] for p in ch["pages"] if p["text"])
            paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
            return {
                "novel": n["title"],
                "author": n["author"],
                "chapter_no": ch["no"],
                "chapter_total": n["chapter_count"] or len(n["chapters_full"]),
                "title": ch.get("primary_title") or "Розділ",
                "paragraphs": paragraphs[:12],
            }

    return {
        "novel": "—",
        "author": "—",
        "chapter_no": 1,
        "chapter_total": 1,
        "title": "Розділ",
        "paragraphs": [],
    }


# ─── NOTIFICATIONS / COMMENTS (curated, light fabrication) ──────────────

def build_notifications():
    return [
        {"type": "comment", "user": "kateryna_v", "text": "прокоментувала ваш переклад", "target": "Розділ 14", "time": "щойно", "read": False},
        {"type": "kudos", "user": "drozdiv_son", "text": "та ще 5 людей залишили kudos на", "target": "ваш переклад", "time": "2 год тому", "read": False},
        {"type": "follow", "user": "архіваріус", "text": "почав/ла стежити за вами", "target": "", "time": "5 год тому", "read": False},
        {"type": "update", "user": "Юкі Танака", "text": "опублікував новий розділ", "target": "Розділ 31", "time": "вчора", "read": True},
        {"type": "bookmark", "user": "нічний_кіт", "text": "додав/ла до колекції «Зимове читання»", "target": "Сусідка з третього поверху", "time": "2 дні тому", "read": True},
        {"type": "comment", "user": "архіваріус", "text": "відповів/ла на ваш коментар у", "target": "Гарбузи", "time": "3 дні тому", "read": True},
    ]


def build_comments():
    return [
        {"user": "оля_читає", "avatar": "ОЧ", "text": "Господи, цей розділ просто розриває серце. І перекладач передав жарт ідеально — рідко так буває!", "time": "2 год тому", "kudos": 23, "chapter": 3},
        {"user": "mariana_b", "avatar": "МБ", "text": "Я зрозуміла, ким насправді була та жінка з кафедри! Перечитала перший розділ — все сходиться 🤯", "time": "4 год тому", "kudos": 18, "chapter": 3},
        {"user": "нічний_кіт", "avatar": "НК", "text": "Дякую перекладачам за такий темп. Прочитала за вечір. Чекаю на наступну главу.", "time": "6 год тому", "kudos": 12, "chapter": 3},
        {"user": "архіваріус", "avatar": "АР", "text": "Переклад на високому рівні — особливо діалог про суші. Кожен жарт працює. Дякую!", "time": "вчора", "kudos": 31, "chapter": 2},
    ]


# ─── Main ───────────────────────────────────────────────────────────────

def main():
    if not SOURCE.exists():
        sys.exit(f"[stub.build] ERROR: {SOURCE} not found.")

    print(f"[stub.build] Loading {SOURCE.name} ...")
    with open(SOURCE, "r", encoding="utf-8") as f:
        raw = json.load(f)
    print(f"[stub.build]   {len(raw)} raw records")

    raw = [r for r in raw if not is_junk_record(r)]
    print(f"[stub.build]   {len(raw)} after junk filter")

    novels = []
    skipped = 0
    for r in raw:
        try:
            novels.append(parse_novel(r))
        except Exception as e:
            skipped += 1
            print(f"[stub.build]   skip id={r.get('id')}: {e!r}")
    if skipped:
        print(f"[stub.build]   {skipped} records failed to parse")

    # Sort novels by recency so NOVELS[0:N] makes sense for "new releases"
    novels.sort(key=lambda n: -(n.get("updated_epoch") or 0))

    teams = build_teams(raw)
    users = build_users(raw, novels)
    top_week = build_top_week(novels)
    hot_now = build_hot_now(novels)
    recent_comments = build_recent_comments(novels)
    tags = build_tags(raw)
    reader_chapter = build_reader_chapter(novels)
    notifications = build_notifications()
    comments = build_comments()

    print(f"[stub.build] novels={len(novels)} teams={len(teams)} users={len(users)} tags={len(tags)}")
    print(f"[stub.build] top_week={len(top_week)} hot_now={len(hot_now)} recent_comments={len(recent_comments)}")

    bundle = {
        "novels": novels,
        "teams": teams,
        "users": users,
        "top_week": top_week,
        "hot_now": hot_now,
        "recent_comments": recent_comments,
        "tags": tags,
        "reader_chapter": reader_chapter,
        "notifications": notifications,
        "comments": comments,
    }

    with open(OUTPUT, "wb") as f:
        pickle.dump(bundle, f, protocol=pickle.HIGHEST_PROTOCOL)

    size_mb = OUTPUT.stat().st_size / (1024 * 1024)
    print(f"[stub.build] wrote {OUTPUT.name} ({size_mb:.1f} MB)")

    # Bump loader.py mtime so `uvicorn --reload` notices and re-imports.
    # Without this, a running uvicorn would keep serving the previous
    # pickle (data.pkl is binary, --reload only watches .py files).
    if LOADER.exists():
        os.utime(LOADER, None)
        print(f"[stub.build] touched {LOADER.name} for uvicorn --reload")


if __name__ == "__main__":
    main()
