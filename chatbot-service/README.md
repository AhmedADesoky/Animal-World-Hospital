# Ask AWH — RAG Chatbot Service

A standalone Python FastAPI microservice that powers the "Ask AWH" chatbot with
retrieval-augmented generation: pet-care knowledge is embedded and stored in
Supabase (pgvector), retrieved per-query, and passed to OpenRouter's
`openai/gpt-4o-mini` to generate grounded answers.

## Architecture

```
User message
     │
     ▼
[Emergency keyword check] ──yes──▶ instant emergency response (no LLM call)
     │ no
     ▼
[Embed message locally] (sentence-transformers, all-MiniLM-L6-v2, free/offline)
     │
     ▼
[Supabase pgvector similarity search] (match_documents RPC)
     │
     ▼
[OpenRouter chat completion] (openai/gpt-4o-mini, context injected)
     │
     ▼
Answer + emergency flag + matched sources
```

## One-time setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Copy `.env.example` to `.env` and fill in your real credentials (never commit `.env`).
3. Apply the database schema (pgvector extension, `documents` table, `match_documents` RPC):
   ```bash
   python apply_schema.py
   ```
4. Ingest the starter datasets (embeds and uploads everything in `datasets/`):
   ```bash
   python ingest.py
   ```

## Running the service

```bash
uvicorn main:app --reload --port 8000
```

Health check: `GET http://localhost:8000/health`
Chat: `POST http://localhost:8000/chat` with body `{"message": "..."}`

The client website's `AskAwhChatbot` widget calls this service directly at
`http://localhost:8000` by default (override with `NEXT_PUBLIC_CHATBOT_API_URL`
in `frontend/.env.local`).

## Datasets

Each JSON file in `datasets/` becomes one Supabase "category". Add new entries or
new files (any filename works — the filename becomes the category) and re-run
`python ingest.py`; it wipes and re-inserts only that category, so it's safe to
re-run repeatedly.

| File | Purpose |
|---|---|
| `services_catalog.json` | Services, prices, durations — mirrors the site's service listing |
| `faq.json` | General booking/ordering/policy questions |
| `emergency_triage.json` | Life-threatening symptoms → instructs to call the clinic immediately |
| `symptom_diagnosis.json` | Common non-emergency symptoms and what to do |
| `pet_care_tips.json` | Vaccination schedules, grooming frequency, seasonal care |
| `breed_info.json` | Breed-specific health notes |
| `medication_faq.json` | Shop medication usage and safety notes |
| `booking_knowledge.json` | How booking, rescheduling, and cancellation work on the site |

Recommended next additions: a dataset of real past client Q&A (once the clinic
has chat history to mine), and Arabic-language versions of each category so the
bot can answer naturally in Arabic too.

## Security notes

- `SUPABASE_SERVICE_KEY` and `DATABASE_URL` are server-only secrets — never expose
  them to `frontend/` or `Admin_Frontend/`. Only this Python service should read them.
- The `documents` table is writable only by the secret key (`service_role`); the
  anon/publishable key has read-only access, which is fine since it's just
  pet-care knowledge, not sensitive data.
- The OpenRouter key is also server-only, used exclusively by `main.py`.
