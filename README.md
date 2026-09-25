# Christian Taillon's Cybersecurity & AI Hub

This repository contains the source for [christiant.io](https://christiant.io/), a practical cybersecurity and AI resource hub.

## Repository structure

- Content pages live at the repository root and define stable public URLs with Jekyll front matter.
- `_briefs/` contains intelligence briefs and analysis.
- `_includes/` contains site-level include overrides.
- `assets/`, `image/`, `video/`, and `download/` contain static site assets.
- `archive/` contains historical pages that remain available at their original public permalinks but are no longer maintained.
- `redirects/` contains compatibility redirects for older URLs.
- `_config.yml` contains Jekyll, navigation, theme, SEO, and collection settings.
- `AGENTS.md` contains repository design and contributor guidance.

The legacy `docs/` content directory was retired in September 2026. Content source files now live at the repository root so new and existing pages follow the same structure.

## Theme

The site uses [Beautiful Jekyll](https://github.com/daattali/beautiful-jekyll) with local styling and SEO overrides.
