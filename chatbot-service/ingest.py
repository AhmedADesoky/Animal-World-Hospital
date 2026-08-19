"""
Loads every JSON file in datasets/, embeds each entry's content with a local
sentence-transformers model, and upserts the results into Supabase's
`documents` table (pgvector). Run this once after applying sql/schema.sql,
and again any time a dataset file changes.

Usage:
    python ingest.py
"""
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer

import supabase_rest

load_dotenv()

EMBEDDING_MODEL = os.environ.get("EMBEDDING_MODEL", "all-MiniLM-L6-v2")
DATASETS_DIR = Path(__file__).parent / "datasets"

model = SentenceTransformer(EMBEDDING_MODEL)


def main():
    total = 0
    for path in sorted(DATASETS_DIR.glob("*.json")):
        category = path.stem
        entries = json.loads(path.read_text(encoding="utf-8"))
        print(f"Ingesting {len(entries)} entries from {path.name} (category={category})")

        # Wipe existing rows for this category so re-running is idempotent.
        supabase_rest.delete_by_category(category)

        contents = [e["content"] for e in entries]
        embeddings = model.encode(contents, normalize_embeddings=True).tolist()

        rows = [
            {
                "category": category,
                "title": entry.get("title"),
                "content": entry["content"],
                "metadata": entry.get("metadata", {}),
                "embedding": embedding,
            }
            for entry, embedding in zip(entries, embeddings)
        ]
        supabase_rest.insert_documents(rows)
        total += len(rows)

    print(f"Done. Ingested {total} chunks total.")


if __name__ == "__main__":
    main()
