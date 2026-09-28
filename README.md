# christiant.io

Personal cybersecurity and AI resource hub built with AstroDeck as the foundation.

## Stack

- Astro 7
- Tailwind CSS 4
- Astro Content Collections
- Static GitHub Pages deployment
- AstroDeck conventions and AI-agent guidance

## Local development

```bash
npm ci
npm run dev
```

Validation:

```bash
npm run validate
npm run build
```

## Migration notes

The site was migrated from Jekyll without carrying the Jekyll theme forward. Existing Markdown content is rendered through `src/content/pages`, current public permalinks are preserved, and the large model/coding-agent explorers remain standalone static apps to avoid unnecessary rewrites.

Brand styling uses the Dark Roast/Telltale palette while preserving the content hierarchy and recognizable elements from the previous homepage.

## AstroDeck

This project is based on the MIT-licensed AstroDeck starter by Holger Könemann. See `LICENSE-ASTRODECK` for the upstream license notice.
