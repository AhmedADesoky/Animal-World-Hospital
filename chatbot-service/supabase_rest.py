"""
Minimal Supabase REST/RPC client using plain HTTP (httpx).

We avoid the official `supabase-py` SDK here because its client-side key
validation only accepts legacy JWT-style keys and rejects Supabase's newer
`sb_secret_...` / `sb_publishable_...` key format — even though the REST API
itself accepts them fine. Talking to PostgREST directly sidesteps that.
"""
import os

import httpx
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"].rstrip("/")
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]

_headers = {
    "apikey": SUPABASE_SERVICE_KEY,
    "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
    "Content-Type": "application/json",
}


def delete_by_category(category: str):
    resp = httpx.delete(
        f"{SUPABASE_URL}/rest/v1/documents",
        headers=_headers,
        params={"category": f"eq.{category}"},
        timeout=30,
    )
    resp.raise_for_status()


def insert_documents(rows: list[dict]):
    resp = httpx.post(
        f"{SUPABASE_URL}/rest/v1/documents",
        headers={**_headers, "Prefer": "return=minimal"},
        json=rows,
        timeout=60,
    )
    resp.raise_for_status()


def match_documents(query_embedding: list[float], match_count: int = 5, filter_category: str | None = None):
    resp = httpx.post(
        f"{SUPABASE_URL}/rest/v1/rpc/match_documents",
        headers=_headers,
        json={
            "query_embedding": query_embedding,
            "match_count": match_count,
            "filter_category": filter_category,
        },
        timeout=30,
    )
    resp.raise_for_status()
    return resp.json()
