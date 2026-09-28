# PROJECT.md - christiant.io

This file overrides AstroDeck defaults for this project.

## Goal

Maintain christiant.io as a fast, low-maintenance static resource hub for cybersecurity, AI, engineering notes, community resources, and a small number of interactive explorers.

## Design

- Use AstroDeck structure and conventions.
- Brand language comes from the Dark Roast Cyber and Telltale ecosystem.
- Primary palette: near-black, warm off-white, Dark Roast yellow, coffee brown.
- Keep the homepage recognizable: coffee motif, Dark Roast callout, family image, featured resource cards, recent research cards, knowledge-base groupings.
- Preserve the legacy navigation taxonomy as dropdown sections. Shorter labels are fine, but keep the underlying article/resource links.
- Every user-facing page must render the shared AstroDeck navigation bar.
- Dark mode must remain first-class.
- Use semantic design tokens from `src/styles/globals.css`. Do not hardcode colors in Astro components.
- Prefer quiet technical styling over generic SaaS gradients.
- Use small mono labels for technical eyebrows and metadata.

## Architecture

- No Jekyll, Ruby, Liquid templates, or Beautiful Jekyll dependencies.
- Markdown bodies are migrated with minimal translation and rendered through one Astro content collection.
- Preserve existing public permalinks whenever practical.
- Large interactive explorers may remain isolated static HTML applications until there is a concrete reason to rewrite them.
- New site UI should be Astro components with Tailwind utilities.
- Avoid client-side JavaScript unless interaction requires it.

## Content

- Preserve practical, concise language.
- Keep resource links and technical details useful rather than promotional.
- Do not add fake metrics, testimonials, marketing claims, or filler sections from the starter template.
