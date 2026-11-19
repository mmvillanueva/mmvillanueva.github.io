# MMVILLANUEVA – artist portfolio
Astro 7 + Tailwind 4. Placeholder data in `src/data/works.ts` (mirrors the future Sanity schema).
```
npm install && cp .env.example .env   # add your Web3Forms access key
npm run dev
```

## Deploy (GitHub Pages)
Pushing to `main` builds and publishes via `.github/workflows/deploy.yml`.
One-time setup in the GitHub repo:
1. Settings > Pages > Source: **GitHub Actions**.
2. Settings > Secrets and variables > Actions > Variables: add `PUBLIC_WEB3FORMS_KEY` (your Web3Forms access key).
