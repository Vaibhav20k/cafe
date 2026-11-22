import asyncio
import json
import logging
import os
import uuid
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

api_router = APIRouter(prefix="/api")

OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY", "")
OPENROUTER_BASE = "https://openrouter.ai/api/v1/chat/completions"
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "openai/gpt-4o-mini")

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger("sarai")

MENU = [
    {"id": "royal-kaapi-meter", "name": "The Royal Kaapi Meter", "dev": "शाही कापी", "category": "signature",
     "estate": "Chikmagalur Estate #44", "price": 320, "roast": "Medium-Dark",
     "notes": "Wild Fig • Cacao Husk • Cardamom Blossom", "tags": ["Signature", "Single-Origin"],
     "desc": "Pulled through a brass davarah-tumbler from two feet up for micro-velvet froth."},
    {"id": "kyoto-jaggery", "name": "Smoked Jaggery Kyoto Drip", "category": "signature",
     "estate": "Monsooned Malabar Base", "price": 380, "roast": "Light",
     "notes": "Palmyra Jaggery • Smoke • Dark Cherry", "tags": ["Signature"],
     "desc": "Twelve hours down the cold drip tower, sweetened with wild palmyra nectar."},
    {"id": "malabar-aeropress", "name": "Monsooned Malabar Aeropress", "category": "signature",
     "estate": "Malabar Coast Curing House", "price": 340, "roast": "Medium",
     "notes": "Hazelnut • Cigar Leaf • Cocoa", "tags": ["Signature", "Single-Origin"],
     "desc": "Beans swollen by coastal monsoon winds, pressed slow and deliberate."},
    {"id": "saffron-tonic", "name": "Saffron & Pistachio Espresso Tonic", "category": "signature",
     "estate": "Baba Budangiri Washed", "price": 420, "roast": "Light-Medium",
     "notes": "Saffron • Orange Oil • Pistachio", "tags": ["Signature"],
     "desc": "A double shot of washed espresso layered over house saffron tonic."},
    {"id": "chikmagalur-795", "name": "Chikmagalur Washed 795", "category": "filter",
     "estate": "Chikmagalur Estate #44", "price": 280, "roast": "Medium",
     "notes": "Toffee • Tamarind • Star Anise", "tags": ["Single-Origin", "V"],
     "desc": "Our house filter expression. S95 selection, brewed on the brass syphon."},
    {"id": "araku-honey", "name": "Araku Valley Honey Sun-Dried", "category": "filter",
     "estate": "Araku Smallholder Collective", "price": 300, "roast": "Light",
     "notes": "Apricot • Honeycomb • Jasmine", "tags": ["Single-Origin", "V"],
     "desc": "Honey-processed in the Eastern Ghats, dried on raised bamboo beds."},
    {"id": "coorg-robusta", "name": "Coorg Old-Parcel Robusta", "category": "filter",
     "estate": "Coorg Family Estate", "price": 260, "roast": "Dark",
     "notes": "Bitter Cocoa • Spice Wood • Molasses", "tags": ["V"],
     "desc": "A Robusta we refuse to apologise for. Deep, unapologetic, very Indian."},
    {"id": "espresso", "name": "Espresso", "category": "espresso",
     "estate": "House Blend 01", "price": 240, "roast": "Medium-Dark",
     "notes": "Bittersweet Cocoa • Caramel", "tags": ["V"],
     "desc": "The benchmark shot. 18g in, 36g out, 27 seconds of patience."},
    {"id": "cardamom-cortado", "name": "Cardamom Cortado", "category": "espresso",
     "estate": "House Blend 01", "price": 300, "roast": "Medium",
     "notes": "Green Cardamom • Silk Milk", "tags": ["V"],
     "desc": "Equal parts espresso and steamed milk, perfumed with green cardamom."},
    {"id": "baba-ristretto", "name": "Baba Budangiri Ristretto", "category": "espresso",
     "estate": "Baba Budangiri Washed", "price": 280, "roast": "Medium",
     "notes": "Dried Fig • Black Pepper", "tags": ["Single-Origin", "V"],
     "desc": "Short, intense, unhurried. From the hills where Indian coffee began."},
    {"id": "cold-drip-drum", "name": "18-Hour Cold Drip Drum", "category": "cold",
     "estate": "Chikmagalur Estate #44", "price": 340, "roast": "Light-Medium",
     "notes": "Stone Fruit • Sugarcane • Chill Spice", "tags": ["Single-Origin", "V"],
     "desc": "One drop per second for eighteen hours. Nothing rushed survives here."},
    {"id": "cardamom-cold-brew", "name": "Cardamom Husk Cold Brew", "category": "cold",
     "estate": "Coorg Family Estate", "price": 320, "roast": "Medium",
     "notes": "Cardamom Husk • Cola Nut", "tags": ["V"],
     "desc": "Steeped with spent cardamom husk from the spice market next door."},
    {"id": "nitro-kaapi", "name": "Nitro Kaapi", "category": "cold",
     "estate": "House Blend 01", "price": 360, "roast": "Medium-Dark",
     "notes": "Velvet • Cocoa Nib • Cream", "tags": ["V"],
     "desc": "Filter kaapi charged with nitrogen. No milk, all velvet."},
    {"id": "bun-maska", "name": "Bun Maska, Elevated", "category": "bakes",
     "estate": "From the Irani tradition", "price": 180, "roast": None,
     "notes": "House Pav • Cold-Churned Maska • Jaggery Dust", "tags": ["V"],
     "desc": "Soft bun, salted cold butter, a snowfall of jaggery."},
    {"id": "jaggery-banana-cake", "name": "Jaggery Banana Cake", "category": "bakes",
     "estate": "Baked each dawn", "price": 240, "roast": None,
     "notes": "Ghee Crumb • Jaggery Glaze • Banana", "tags": ["V"],
     "desc": "Warm crumb and a dark jaggery glaze, sliced thick."},
    {"id": "filter-affogato", "name": "Filter Coffee Affogato", "category": "bakes",
     "estate": "House Blend 01", "price": 300, "roast": None,
     "notes": "Vanilla Kulfi • Double Shot", "tags": ["V"],
     "desc": "Vanilla-bean kulfi drowned in a double espresso. Dessert as theatre."},
    {"id": "mysore-toast", "name": "Mysore Masala Toast", "category": "bakes",
     "estate": "From the Mysore bakery carts", "price": 260, "roast": None,
     "notes": "Chilli • Cheese • Curry Leaf Butter", "tags": ["V"],
     "desc": "Chilli-cheese toast with curry-leaf butter. The 4pm legend."},
]

CAFE_INFO = {
    "name": "SARAI",
    "tagline": "Specialty Indian Coffee House",
    "address": "100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038",
    "hours": "Open every day, 07:30 - 23:00 IST",
    "origins": "Chikmagalur, Araku Valley, Coorg, Baba Budangiri, Malabar",
}

SYSTEM_PROMPT = (
    "You are Sarai — the AI coffee sommelier of SARAI, a specialty Indian coffee house in Indiranagar, Bengaluru. "
    "You speak warm, unhurried, a little poetic, never more than 90 words. You are an expert on Indian specialty coffee: "
    "single-origin microlots (Chikmagalur, Araku Valley, Coorg, Baba Budangiri, Monsooned Malabar), filter kaapi culture, "
    "davarah-tumbler frothing, chicory blends, chai, and food. Recommend items by name with their price in rupees. "
    f"Hours: {CAFE_INFO['hours']}. Address: {CAFE_INFO['address']}. "
    "Menu (category | name | INR | notes):\n"
    + "\n".join(f"{m['category']} | {m['name']} | Rs.{m['price']} | {m['notes']}" for m in MENU)
)


def sse(payload: dict) -> str:
    return f"data: {json.dumps(payload)}\n\n"


def cors_headers():
    return {
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
        "Access-Control-Allow-Origin": "*",
    }


class ChatIn(BaseModel):
    session_id: str = Field(default_factory=lambda: uuid.uuid4().hex)
    message: str


@api_router.get("/")
async def root():
    return {"message": "SARAI API — brewing.", "mode": "openrouter" if OPENROUTER_API_KEY else "demo"}


@api_router.get("/menu")
async def get_menu():
    count = await db.menu_items.count_documents({})
    if count == 0:
        await db.menu_items.insert_many([{**m} for m in MENU])
    items = await db.menu_items.find({}, {"_id": 0}).sort("price", 1).to_list(200)
    return {"items": items, "cafe": CAFE_INFO}


@api_router.get("/health")
async def health():
    return {"ok": True, "chat_mode": "openrouter" if OPENROUTER_API_KEY else "demo"}


async def save_message(session_id: str, role: str, content: str):
    await db.chat_messages.insert_one({
        "session_id": session_id,
        "role": role,
        "content": content,
        "ts": datetime.now(timezone.utc).isoformat(),
    })


async def load_history(session_id: str, limit: int = 12):
    docs = await db.chat_messages.find({"session_id": session_id}, {"_id": 0, "role": 1, "content": 1}) \
        .sort("ts", -1).limit(limit).to_list(limit)
    return [{"role": d["role"], "content": d["content"]} for d in reversed(docs)]


# ---------- Demo responder (used when OPENROUTER_API_KEY is not set) ----------

def demo_answer(q: str) -> str:
    t = q.lower()
    if any(w in t for w in ["sweet", "sugar", "dessert", "mittha"]):
        return ("No refined sugar needed here. The Smoked Jaggery Kyoto Drip (Rs.380) leans on wild palmyra nectar — "
                "dark cherry and smoke in every sip. Pair it with the Jaggery Banana Cake (Rs.240) and thank us later.")
    if any(w in t for w in ["caffeine", "strong", "strongest", "wake"]):
        return ("The 18-Hour Cold Drip Drum (Rs.340) carries the quietest, longest caffeine curve on the menu — "
                "stone fruit up front, a slow burn behind. Want it as a Nitro Kaapi (Rs.360) instead? Even denser.")
    if any(w in t for w in ["chai", "tea"]):
        return ("We keep chai honest — strong Assam leaf, whole spice, no syrup. The house cardamom chai is what the "
                "roasters drink on break. And our Cardamom Cortado (Rs.300) is the espresso wearing chai's perfume.")
    if any(w in t for w in ["kaapi", "filter", "davarah", "traditional", "south"]):
        return ("Filter kaapi is our mother tongue. The Royal Kaapi Meter (Rs.320) is frothed through a brass davarah "
                "from two feet up — micro-velvet, wild fig, cacao husk, cardamom blossom. Chikmagalur 795, chicory touch, zero shortcuts.")
    if any(w in t for w in ["hour", "open", "close", "timing", "when"]):
        return (f"We keep sarai hours: {CAFE_INFO['hours']}. Early light is the best light — the first pour is at 07:30 sharp.")
    if any(w in t for w in ["where", "location", "address", "direction", "reach", "located"]):
        return (f"Find us at {CAFE_INFO['address']}. Look for the brass arch above the door — and the queue that knows why.")
    if any(w in t for w in ["eat", "food", "bite", "hungry", "snack", "breakfast"]):
        return ("Small plates, big opinions: Bun Maska Elevated (Rs.180) for the Irani classic, Mysore Masala Toast (Rs.260) "
                "for chilli-cheese with curry-leaf butter, and the Filter Coffee Affogato (Rs.300) when dessert counts as a meal.")
    if any(w in t for w in ["decaf"]):
        return ("We hold a small decaf lot of the Monsooned Malabar — same ocean-aged softness, none of the thunder. "
                "Ask the barista for it as an Aeropress (Rs.340).")
    if any(w in t for w in ["milk", "dairy", "vegan", "oat", "lactose"]):
        return ("Oat and soy are on us — no surcharge, no side-eye. The Araku Valley Honey (Rs.300) as a flat white with "
                "oat is quietly one of the best things we pour.")
    if any(w in t for w in ["price", "cost", "expensive", "cheap", "menu"]):
        return ("Most cups sit between Rs.240 and Rs.420. Signatures run higher — the Saffron & Pistachio Tonic (Rs.420) is "
                "the splurge. The full menu is a scroll away.")
    if any(w in t for w in ["recommend", "suggest", "best", "favourite", "favorite", "mood", "what should"]):
        return ("Tell me your mood and I'll pour. Cold and cloudy? Nitro Kaapi (Rs.360). Warm and nostalgic? The Royal Kaapi "
                "Meter (Rs.320). Feeling dramatic? Smoked Jaggery Kyoto Drip (Rs.380). It rarely misses.")
    if any(w in t for w in ["hello", "hi", "hey", "namaste", "salaam"]):
        return ("Namaste, traveller. The kettle is warm and the beans are from Chikmagalur. What are you in the mood for — "
                "something sweet, something strong, or something you've never tried?")
    if any(w in t for w in ["monsoon", "rain", "weather", "season"]):
        return ("Monsoon belongs to the Monsooned Malabar Aeropress (Rs.340) — beans that were literally aged by the rains, "
                "all earthy hazelnut and cigar leaf. Watch the rain through our courtyard glass with it.")
    return ("I'm the Sarai sommelier — I know every bean, price and pour on this menu. Ask me for a recommendation, "
            "the strongest brew, what to eat with your kaapi, or our hours. What's your mood?")


async def demo_stream(session_id: str, message: str):
    answer = demo_answer(message)
    await save_message(session_id, "user", message)
    words = answer.split(" ")
    chunk = ""
    for w in words:
        chunk += w + " "
        if len(chunk) > 14:
            yield sse({"delta": chunk})
            chunk = ""
            await asyncio.sleep(0.03)
    if chunk:
        yield sse({"delta": chunk})
    await save_message(session_id, "assistant", answer)
    yield sse({"done": True, "mode": "demo"})


# ---------- OpenRouter stream (activates when OPENROUTER_API_KEY is set) ----------

async def openrouter_stream(session_id: str, message: str):
    await save_message(session_id, "user", message)
    history = await load_history(session_id)
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://sarai.coffee",
        "X-Title": "SARAI Coffee House",
    }
    payload = {"model": OPENROUTER_MODEL, "messages": messages, "stream": True}
    full = ""
    try:
        async with httpx.AsyncClient(timeout=90) as ac:
            async with ac.stream("POST", OPENROUTER_BASE, headers=headers, json=payload) as resp:
                resp.raise_for_status()
                async for line in resp.aiter_lines():
                    if not line.startswith("data: "):
                        continue
                    data = line[6:].strip()
                    if data == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data)
                        delta = chunk["choices"][0]["delta"].get("content") or ""
                    except (json.JSONDecodeError, KeyError, IndexError):
                        continue
                    if delta:
                        full += delta
                        yield sse({"delta": delta})
    except Exception as exc:
        logger.error("openrouter_stream failed: %s", exc)
        if not full:
            yield sse({"delta": "The connection to my faraway brain dropped for a moment. Ask me again?"})
    if full:
        await save_message(session_id, "assistant", full)
    yield sse({"done": True, "mode": "openrouter"})


@api_router.post("/chat")
async def chat(input: ChatIn):
    if OPENROUTER_API_KEY:
        return StreamingResponse(openrouter_stream(input.session_id, input.message),
                                 media_type="text/event-stream", headers=cors_headers())
    return StreamingResponse(demo_stream(input.session_id, input.message),
                             media_type="text/event-stream", headers=cors_headers())


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.on_event("startup")
async def startup():
    logger.info("SARAI API up — chat mode: %s", "openrouter" if OPENROUTER_API_KEY else "demo")


@app.on_event("shutdown")
async def shutdown_db_client():
    with suppress(Exception):
        client.close()
