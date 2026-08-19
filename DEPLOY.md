# Deployment Guide

This repo has three deployable pieces. Each is deployed **separately** — they're independent apps.

| Folder | What it is | Host |
|---|---|---|
| `frontend/` | Client website (Next.js) | Vercel |
| `Admin_Frontend/` | Admin dashboard (Next.js) | Vercel |
| `chatbot-service/` | RAG chatbot API (Python FastAPI) | Railway |

Deploy the chatbot first — the two frontends need its live URL as an environment variable.

---

## 1. Chatbot service → Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub.
2. **New Project → Deploy from GitHub repo** → select `AhmedADesoky/Animal-World-Hospital`.
3. When asked for the **Root Directory**, set it to `chatbot-service`.
4. Railway will detect Python automatically and use the included `Procfile` to start the server.
5. Go to the service's **Variables** tab and add these (copy the values from your local `chatbot-service/.env` — never commit that file):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY`
   - `DATABASE_URL`
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL` = `openai/gpt-4o-mini`
   - `EMBEDDING_MODEL` = `all-MiniLM-L6-v2`
   - `CORS_ORIGINS` — set this **after** step 2/3 below once you know your Vercel URLs, e.g. `https://awh-frontend.vercel.app,https://awh-admin.vercel.app`. Use a temporary `*` value for now if you want to test immediately (loosen only temporarily).
6. Deploy. Railway gives you a public URL like `https://chatbot-service-production.up.railway.app`. Test it: `GET /health` should return `{"status":"ok"}`.
7. **Important — one-time data setup**: the ingest script needs to run once against your Supabase project (it already has been run from local, so if you're using the same Supabase project, you can skip this). If you point this at a fresh Supabase project instead, run locally: `python apply_schema.py && python ingest.py` with that project's credentials in your local `.env`.

Keep the resulting URL — you'll set it as `NEXT_PUBLIC_CHATBOT_API_URL` on the frontend project below.

---

## 2. Client website → Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project** → import `AhmedADesoky/Animal-World-Hospital`.
3. In the import settings, set **Root Directory** to `frontend`.
4. Framework preset auto-detects as **Next.js** — leave build/output settings default.
5. Add an environment variable:
   - `NEXT_PUBLIC_CHATBOT_API_URL` = the Railway URL from step 1 (e.g. `https://chatbot-service-production.up.railway.app`)
6. Click **Deploy**. Vercel gives you a URL like `https://awh-frontend.vercel.app`.

---

## 3. Admin dashboard → Vercel

Repeat the same steps as above as a **second, separate** Vercel project:

1. **Add New → Project** → import the **same repo** again.
2. Set **Root Directory** to `Admin_Frontend`.
3. No special environment variables are required for the admin app currently.
4. Deploy. You'll get a second URL like `https://awh-admin.vercel.app`.

---

## 4. Finish wiring CORS

Go back to Railway → the chatbot service → **Variables**, and set `CORS_ORIGINS` to your two real Vercel URLs (comma-separated, no spaces), then redeploy the chatbot service so it accepts requests from them:

```
CORS_ORIGINS=https://awh-frontend.vercel.app,https://awh-admin.vercel.app
```

---

## Notes

- Every `git push` to `main` auto-redeploys all three services (Vercel and Railway both watch the repo).
- The `backend/` folder (Node.js/Apollo scaffold) isn't deployed yet — it's an early scaffold from the original plan and isn't wired into either frontend. Deploy it later once it's actually built out.
- Custom domains: both Vercel and Railway let you attach your own domain for free under their project settings once you have one.
