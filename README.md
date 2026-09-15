# Lifted.me — Human → ?

A public longitudinal experiment documenting what happens when one human deliberately reorganizes how he learns, decides, creates and operates around machine intelligence.

**T0:** September 14, 2026

## Repo structure

```text
/
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── icons/favicon.svg
└── data/
    └── public-metrics.json
```

## Deployment

This is a zero-build static site. It can be deployed directly to GitHub Pages, Cloudflare Pages, Netlify, Vercel static hosting, or any standard web server.

For GitHub Pages, place these files at the repository root and publish from the main branch/root directory.

## Updating public metrics

`data/public-metrics.json` is intentionally tiny. The homepage reads it automatically.

```json
{
  "asOf": "2026-09-15",
  "recordedCycles": 4,
  "dominantBottleneck": "L",
  "newCapabilities": 0
}
```

Only public-safe aggregate data belongs in this repository.

## Privacy boundary

Do **not** commit the private Human–AI Loop Ledger to this public repository. The public site should receive only derived, anonymized, intentionally publishable metrics and field notes.

## Design note

The site is intentionally typography-led and dependency-free: no external fonts, frameworks, analytics, stock imagery, trackers or third-party JavaScript.
