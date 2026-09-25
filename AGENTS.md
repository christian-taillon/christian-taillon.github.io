# christiant.io Repository Guide

This file is the operating guide for contributors and coding agents working in this repository.

## Site structure

- Public content source files live at the repository root.
- Do not create a new `docs/` content directory.
- `archive/` contains historical pages and unpublished source retained for reference.
- `redirects/` contains compatibility pages for older URLs.
- `_includes/` contains site-level template overrides.
- `assets/`, `image/`, `video/`, and `download/` contain static assets.
- `_config.yml` contains navigation, theme, plugin, SEO, and collection settings.

## Public URL rules

Public URLs are part of the site's compatibility contract.

1. Every new content page should define an explicit `permalink`.
2. Moving a source file must not change its public permalink.
3. Do not delete a published URL merely to reorganize source files.
4. If a public URL changes intentionally, add a compatibility page under `redirects/`.
5. Archived public pages keep their historical permalink and should set `sitemap: false`. Material intentionally retired from the public site should use `published: false`.

## Archiving a page

When material is no longer current but is still useful historically:

1. Move the source file to `archive/`.
2. If the page should remain public, keep its existing `permalink`, add `sitemap: false`, and add a visible archive notice.
3. If the page should be retired from the public site, add `published: false` and `sitemap: false` instead.
4. Link to the current replacement when one exists.
5. Remove archived material from active navigation and homepage feature links.

Do not silently present model, pricing, benchmark, product, conference, or threat data as current when it is historical.

## Current AI benchmark methodology

The active benchmark pages are:

- `/astra-model-explorer/` for model-family intelligence, cost per task, and token use.
- `/coding-agent-explorer/` for coding-agent benchmark performance, cost per task, and token utilization.

Use Artificial Analysis published source measurements directly. Do not apply local GPT/OpenAI pricing multipliers, historical repricing modifiers, or inferred values to fields Artificial Analysis publishes as N/A.

When refreshing benchmark data:

- record the Artificial Analysis benchmark/index version;
- record the retrieval date;
- update the complete embedded dataset, not only the newest model;
- preserve N/A rather than estimating missing values;
- update visible methodology copy, filters, ranges, counts, and stale benchmark labels.

## Content conventions

- Prefer evergreen wording over counts, prices, rankings, or version claims that quickly become stale.
- Date time-sensitive resource pages when they are reviewed.
- Prefer primary sources and official documentation.
- Preserve historical conference and research pages when they have lasting reference value.
- Check internal links after moving files.
- Use descriptive page titles and front-matter descriptions.
- Avoid introducing duplicate pages with the same permalink.

## Design conventions

The site uses Beautiful Jekyll with local overrides.

Core palette:

- Dark Roast black: `#000000`
- Brand yellow: `#fcc624`
- Primary text: `#333333`
- Link blue: `#007bff`
- Green: `#28a745`
- Pink: `#d63384`
- Cyan: `#0dcaf0`
- Purple: `#6610f2`
- Red: `#dc3545`

Prefer existing components and `assets/css/site-overrides.css` over inventing another visual system. New pages should remain usable on narrow/mobile layouts.

## Local Jekyll build

Install dependencies and run:

```bash
bundle install
bundle exec jekyll serve
```

The Gemfile is for local development. GitHub Pages uses its own production build environment.

Before committing structural changes, validate that Jekyll front matter is intact and that important public permalinks have not changed.

## Repository hygiene

Do not commit:

- `_site/`
- Jekyll caches
- `vendor/`
- `.bundle/`
- editor-specific project state
- backup files
- secrets, tokens, credentials, or private operational data

Keep the root focused on actual site content and necessary project/build files.
