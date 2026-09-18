# Astro Migration

This branch builds the replacement for the current Jekyll site while keeping `gh-pages` unchanged.

## Completed on this branch

- Added Astro 7 + Tailwind CSS 4 project scaffolding.
- Added christiant.io branding, light/dark theme tokens, SEO metadata, header, footer, and homepage.
- Added Astro content collections for existing `docs/` Markdown pages and root Markdown guides.
- Preserved existing `permalink:` routes through a catch-all Astro route.
- Replaced the Jekyll Liquid "latest intel brief" page with native Astro collection logic.
- Added a branded Astro 404 page.
- Copied existing static assets into `public/` without modifying the original files.
- Preserved the custom domain through `public/CNAME`.
- Preserved the ZDR page JavaScript under `public/assets/js/`.

## Intentionally not changed yet

- GitHub Pages deployment remains unchanged.
- Jekyll files remain in place for comparison and rollback.
- The large interactive HTML applications have not been ported:
  - `astra-model-explorer.html`
  - `coding-agent-explorer.html`
  - `gpt-5-6-value-analysis.html`
  - `dns-osint.html`
- Existing page-specific CSS and JavaScript have not been refactored.
- No generated lockfile has been committed yet.

## Next local step

Run this branch locally and fix any compile/content edge cases before changing deployment:

```bash
pnpm install
pnpm run build
pnpm run dev
```

After the production build is clean:

1. Review migrated Markdown routes for rendering regressions.
2. Port the interactive HTML pages into dedicated Astro pages/layouts.
3. Generate and commit the final `pnpm-lock.yaml`.
4. Add the GitHub Pages deployment workflow.
5. Verify important legacy URLs before merging.
