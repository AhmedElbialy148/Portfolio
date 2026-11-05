# ADR-0002: Keep all site content in one typed config file

- **Status:** accepted
- **Date:** 2026-07-09 (recorded retroactively 2026-11-05)
- **Supersedes:** —
- **Superseded by:** —

## Context

Portfolio content (jobs, projects, skills) changes far more often than layout, and it must stay in step with the CV. In the old site the copy was hard-coded inside JSX, so updating a job title meant hunting through components.

## Decision

All content lives in [src/shared/config/site-data.ts](../../src/shared/config/site-data.ts) as exported `readonly` constants with TypeScript interfaces (`Profile`, `Experience`, `Project`, `SkillCategory`, `Education`, `SiteLink`). Components receive typed objects and contain no copy except section headings and subtitles.

## Consequences

**Positive**

- One file to update when the CV changes, and a type error if a required field is forgotten.
- Easy to diff the site against the CV.
- No CMS, network call or build-time content pipeline.

**Negative**

- Content edits need a code change and a redeploy.
- Section headings and subtitles are still hard-coded in widgets, so they aren't fully covered.
- Binary assets are linked by convention (`/assets/projects/<id>.png`), which TypeScript can't check.

## Alternatives considered

- **Markdown/MDX content collections:** better for long-form case studies and worth revisiting if project pages are added, but extra tooling for today's short entries.
- **Headless CMS:** unnecessary for one author.
- **JSON file:** loses the interfaces and inline docs.

## Links

- Reference: [Content model](../references/content-model.md)
- How-to: [Update site content](../guides/update-content.md)
