# MMVILLANUEVA – artist portfolio
Astro 7 + Tailwind 4. Content (artworks, blog posts, artist info) comes from Sanity project `t33pzyyd` at build time.
```
npm install && cp .env.example .env   # add your Web3Forms access key
npm run dev
```

## Deploy (GitHub Pages)
Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.
One-time setup in the GitHub repo:
1. Settings > Pages > Source: **GitHub Actions**.
2. Settings > Secrets and variables > Actions > Variables: add `PUBLIC_WEB3FORMS_KEY` (your Web3Forms access key).

## Content (Sanity)
- Studio code lives in `studio/` (own `package.json`). Run locally: `cd studio && npm install && npm run dev` (http://localhost:3333).
- Deploy the hosted Studio: `cd studio && npx sanity deploy`.
- First-time seed (placeholder content): `cd studio && npx sanity dataset import seed.ndjson production`.
- The site is static, so edits go live after a rebuild. A Sanity webhook sends a `repository_dispatch` event (`sanity-publish`)
  to GitHub, which runs `deploy.yml`. Webhook: sanity.io/manage > project > API > Webhooks.
  - URL: `https://api.github.com/repos/jerohalili/mmvillanueva.github.io/dispatches`, method POST
  - Headers: `Authorization: Bearer <fine-grained token>`, `Accept: application/vnd.github+json`
  - Projection: `{"event_type":"sanity-publish"}`; filter: `_type in ["artwork","post","artist"]`; trigger on create, update, delete; drafts off.
  - The token is limited to this repository and has an expiry date: renew it before then or publishing will stop updating the site.
