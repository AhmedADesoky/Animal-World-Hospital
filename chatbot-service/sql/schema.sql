-- Run this once in the Supabase SQL editor (or via psql) before ingesting data.

create extension if not exists vector;

create table if not exists documents (
  id bigserial primary key,
  category text not null,           -- e.g. 'faq', 'services_catalog', 'emergency_triage'
  title text,
  content text not null,            -- the chunk of text that gets embedded
  metadata jsonb default '{}'::jsonb,
  embedding vector(384),            -- all-MiniLM-L6-v2 output size
  created_at timestamptz default now()
);

create index if not exists documents_embedding_idx
  on documents using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists documents_category_idx on documents (category);

-- Similarity search RPC used by the FastAPI service
create or replace function match_documents (
  query_embedding vector(384),
  match_count int default 5,
  filter_category text default null
)
returns table (
  id bigint,
  category text,
  title text,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.category,
    documents.title,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where filter_category is null or documents.category = filter_category
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- This table is only ever accessed server-side by the FastAPI service using the
-- Supabase *secret* key (sb_secret_...), which is never shipped to any client app.
-- RLS is left disabled here because Supabase's newer secret-key format does not
-- currently get resolved to a role that bypasses RLS automatically the way the
-- legacy service_role JWT did — enabling RLS with no policies would just 403 the
-- server itself. The table is not exposed to the anon/publishable key anywhere.
alter table documents disable row level security;

-- Tables created via a direct psql connection (as this one was) don't inherit
-- Supabase's default PostgREST grants, so they must be added explicitly.
-- anon/authenticated get read-only access (harmless — it's just KB content);
-- only service_role (the secret key, used exclusively by chatbot-service) can write.
grant select on public.documents to service_role, anon, authenticated;
grant insert, update, delete on public.documents to service_role;
grant usage, select on sequence public.documents_id_seq to service_role;
grant execute on function public.match_documents(vector, int, text) to service_role, anon, authenticated;
