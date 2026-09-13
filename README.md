# OKTANT — Devlog

The public engineering devlog for Oktant, published at [dev.oktant.tech](https://dev.oktant.tech).

Built with [Astro](https://astro.build), MDX, and TypeScript. Fully static, no database, no
CMS, no backend. Deploys on Cloudflare Pages straight from Git.

## Project layout

```text
src/
├── content/
│   ├── config.ts              # Content collection schema (devlogs)
│   └── devlogs/
│       └── 2026/
│           └── week-37/
│               ├── abdullah.mdx
│               ├── harris.mdx
│               └── moiz.mdx
├── data/
│   └── developers.ts          # Author definitions (for bylines)
├── layouts/
│   ├── BaseLayout.astro
│   └── DevlogLayout.astro
├── components/
│   ├── Header.astro           # Minimal nav + light/dark toggle
│   └── Footer.astro
├── pages/
│   ├── index.astro            # Home: all devlogs
│   ├── devlogs/[slug].astro   # Individual devlog
│   ├── 404.astro
│   └── rss.xml.ts             # Devlog RSS feed
└── utils/                     # Date formatting, reading time, collection queries
```

Key idea: **devlogs are the only content authors touch.** Each entry is one MDX file with
frontmatter. Pages query the content collection directly; there is no duplicated metadata.

## Content model

Every devlog is a Markdown/MDX file under `src/content/devlogs/`. Directory structure is free —
the flat slug is derived from the path (e.g. `2026/week-37/abdullah.mdx` →
`2026-week-37-abdullah`).

Frontmatter schema:

```yaml
---
title: "Building the Execution Pipeline"
description: "One or two sentences. Used as the lede and for SEO/RSS."
date: "2026-09-12"
author: "harris"        # must be one of: abdullah | harris | moiz
week: 37                # ISO-like week number for the log
milestone: "M3"         # optional context, not displayed on the site
status: "published"     # "published" or "draft"
tags:
  - Runtime
  - Execution
---
```

Notes:

- Author slugs must match `src/data/developers.ts`. To add an engineer, add them there and
  extend the `author` enum in `src/content/config.ts`.
- Set `status: "draft"` to keep an entry out of the production build while it lives in the repo.
- Reading time is computed from the body at build time — nothing to maintain.

## Adding a devlog (the whole workflow)

```text
Create MDX devlog file
        ↓
git commit
        ↓
git push
        ↓
Cloudflare Pages build
        ↓
dev.oktant.tech updated
```

No admin panel, no dashboard. Publishing is just Git.

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output in dist/
npm run preview    # serve the production build
npm run typecheck  # astro check
```

## Deployment

The site is configured for Cloudflare Pages:

- **Framework preset:** Astro
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20 or newer

Wire the GitHub repo to Cloudflare Pages; every push to the default branch rebuilds the site.

`public/_headers` ships cache headers and strict security headers. `sitemap-index.xml` and
`rss.xml` are generated on every build.

## Design

- Colors: paper `#f5f1e8` light theme, ink `#171717` dark theme, accent `#e4572e`.
- Type: a single font everywhere — Inter Variable, self-hosted.
- Client JavaScript is used only for the theme toggle and the theme init script; everything
  else is static HTML.