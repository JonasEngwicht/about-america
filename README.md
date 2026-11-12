# About America

Modern Next.js starter for about-america.com.

## Run locally
1. Install Node.js 20+.
2. Copy `.env.example` to `.env.local` and add your keys.
3. Run `npm install` and `npm run dev`.
4. Open http://localhost:3000.

## Supabase
Create a project, paste `supabase/schema.sql` into the SQL Editor, and add the URL and publishable key to `.env.local`. The included UI currently stores demo bookmarks in localStorage. Replace that helper with the bookmarks table after wiring Supabase Auth.

## AI draft endpoint
POST source text and its URL to `/api/generate` with header `x-admin-secret`. The endpoint returns a draft for human review. Never auto-publish AI output. Do not copy full third-party articles; use licensed feeds, public-domain government sources, or short factual extracts with attribution.

## Deploy
Push the folder to GitHub, import it in Vercel, add the same environment variables, and connect `about-america.com` in Vercel Domains.
