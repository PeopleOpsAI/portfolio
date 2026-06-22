# Swapnil Mishra — HR Portfolio

## Stack

Next.js 15 · TypeScript · Tailwind CSS v4 · Lucide React

## Run

```bash
npm install
npm run dev
```

## Structure (no small files)

```
src/
  app/
    [[...slug]]/page.tsx   — all UI + routing (~480 lines)
    layout.tsx             — root shell (Next.js required)
    sitemap.ts             — re-exports from site.ts (Next.js required)
    globals.css
  lib/
    site.ts                — content, config, SEO, sitemap (~425 lines)
```

Routes: `/` · `/experience` · `/skills` · `/about` · `/case-studies`

## Before deploy

1. Resume download: `public/resume/Swapnil_Mishra_HR_Resume.md` (served directly)
2. Update `SITE.email` and `SITE.url` in `src/lib/site.ts`
