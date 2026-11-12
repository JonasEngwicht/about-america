create table public.articles (id bigint generated always as identity primary key, slug text unique not null, title text not null, dek text, body text not null, category text not null, source_url text not null, source_name text, published_at timestamptz, status text not null default 'draft' check (status in ('draft','published','archived')), created_at timestamptz not null default now());
create table public.bookmarks (user_id uuid references auth.users on delete cascade not null, article_id bigint references public.articles on delete cascade not null, created_at timestamptz not null default now(), primary key(user_id,article_id));
alter table public.articles enable row level security; alter table public.bookmarks enable row level security;
create policy "published articles are public" on public.articles for select using (status='published');
create policy "users see own bookmarks" on public.bookmarks for select using (auth.uid()=user_id);
create policy "users insert own bookmarks" on public.bookmarks for insert with check (auth.uid()=user_id);
create policy "users delete own bookmarks" on public.bookmarks for delete using (auth.uid()=user_id);