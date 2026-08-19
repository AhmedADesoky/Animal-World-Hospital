"""
Ask AWH — RAG chatbot service.

Pipeline per request:
  1. Check the incoming message against an emergency keyword list (fast, no LLM call).
  2. Embed the message locally (sentence-transformers) and run a pgvector similarity
     search against Supabase's `documents` table to retrieve the most relevant context.
  3. Send the user message + retrieved context to OpenRouter (openai/gpt-4o-mini) and
     return the generated answer, along with the emergency flag and matched sources.

Run with:
    uvicorn main:app --reload --port 8000
"""
import os
from typing import Optional

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer

import supabase_rest

load_dotenv()

OPENROUTER_API_KEY = os.environ["OPENROUTER_API_KEY"]
OPENROUTER_MODEL = os.environ.get("OPENROUTER_MODEL", "openai/gpt-4o-mini")
EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "").split(",")

embedder = SentenceTransformer(EMBEDDING_MODEL)

app = FastAPI(title="Ask AWH Chatbot")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in CORS_ORIGINS if o.strip()],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

EMERGENCY_KEYWORDS = [
    # English
    "not breathing", "can't breathe", "difficulty breathing", "unconscious",
    "unresponsive", "seizure", "severe bleeding", "poison", "poisoned",
    "hit by car", "collapsed", "won't wake up",
    # Arabic
    "لا يتنفس", "صعوبة في التنفس", "نزيف", "نزيف شديد", "غير واعي",
    "فاقد الوعي", "مات", "سم", "تسمم", "لسعة", "عضة ثعبان",
]

EMERGENCY_MESSAGE = (
    "This sounds like it could be an emergency. Please call our 24/7 emergency "
    "line right away or head to the nearest emergency vet — don't wait for a chat reply. "
    "Animal World Hospital emergency line: +20 100 000 0000."
)

SYSTEM_PROMPT = """You are Ask AWH, the friendly pet-care assistant for Animal World Hospital,
a veterinary clinic in Egypt. Answer using ONLY the context provided below when it's relevant.
If the context doesn't cover the question, answer briefly from general pet-care knowledge but
make clear it's general advice, and suggest booking a Medical Consultation for anything specific
to the user's pet. Keep answers short (2-4 sentences), warm, and practical. Prices are in EGP.
Never provide a definitive medical diagnosis — always recommend an in-clinic visit for anything
beyond minor, common issues."""


class ChatRequest(BaseModel):
    message: str
    category: Optional[str] = None  # optionally scope retrieval, e.g. "emergency_triage"


class ChatResponse(BaseModel):
    answer: str
    emergency: bool
    sources: list[str]


def is_emergency(message: str) -> bool:
    lowered = message.lower()
    return any(kw.lower() in lowered for kw in EMERGENCY_KEYWORDS)


def retrieve_context(message: str, category: Optional[str], match_count: int = 5):
    query_embedding = embedder.encode([message], normalize_embeddings=True)[0].tolist()
    return supabase_rest.match_documents(query_embedding, match_count, category)


async def call_openrouter(message: str, context_text: str) -> str:
    payload = {
        "model": OPENROUTER_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": f"Context:\n{context_text}\n\nQuestion: {message}"},
        ],
        "temperature": 0.4,
        "max_tokens": 300,
    }
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            json=payload,
            headers=headers,
        )
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail=f"OpenRouter error: {resp.text}")
    data = resp.json()
    return data["choices"][0]["message"]["content"].strip()


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="message is required")

    if is_emergency(req.message):
        return ChatResponse(answer=EMERGENCY_MESSAGE, emergency=True, sources=[])

    matches = retrieve_context(req.message, req.category)
    context_text = "\n\n".join(f"- {m['title']}: {m['content']}" for m in matches) or "No matching context found."

    answer = await call_openrouter(req.message, context_text)
    sources = [m["title"] for m in matches if m.get("title")]

    return ChatResponse(answer=answer, emergency=False, sources=sources)
