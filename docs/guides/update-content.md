# How to update site content

How-to guide: change what the portfolio says. Almost every content change is an edit to one file, [src/shared/config/site-data.ts](../../src/shared/config/site-data.ts), plus a file in `public/` when an image or PDF is involved. Field definitions are in the [content model reference](../references/content-model.md).

## Add a project

1. Append an object to `PROJECTS`:

   ```ts
   {
     id: "rag-assistant",            // kebab-case, unique; also the screenshot filename
     name: "RAG Assistant",
     description: "One or two sentences: the problem, what you built, the result.",
     liveUrl: "https://…",
     githubUrl: "https://github.com/AhmedElbialy148/…",
     imageSlot: "gradient-3",        // fallback gradient behind the screenshot
     tags: ["LangGraph", "pgvector", "FastAPI"],
     featured: true,                 // true = also shown on the home page
   },
   ```

2. Add a screenshot at `public/assets/projects/<id>.png`. The card shows it at 176 px tall with `object-top` cropping, so the top of the image is what people see. Export at about 1200 px wide and compress it (WebP or a compressed PNG, ideally under 200 KB).
3. Keep the number of `featured: true` projects divisible by 3. The home grid is three columns on desktop.

Project order in the array is display order on both the home page and `/codes`.

## Add or edit a job

Edit `EXPERIENCES`. Entries render top to bottom in array order, so keep the newest first. `highlights` is a list of single-sentence bullets. Lead each one with the outcome or the hardest technical detail, not "Responsible for".

## Add a skill category

Append to `SKILL_CATEGORIES`.

- `icon` is a `SkillIcon`: `"server" | "brain" | "cloud" | "layers" | "database" | "workflow"`. A typo fails the type check. To add an icon, extend `SkillIcon` in `site-data.ts` and register the `lucide-react` glyph in the `ICONS` map in [skill-icon.tsx](../../src/shared/ui/skill-icon/skill-icon.tsx).
- `items` are chip labels. Use short names ("FastAPI", "Cloud Run"), not sentences.
- A chip shows a brand logo when its label is a key in the `TECH_ICONS` map in [tech-icon.tsx](../../src/shared/ui/tech-icon/tech-icon.tsx). Logos come from [Simple Icons](https://simpleicons.org) (CC0). Renaming a label means updating the map key too, otherwise the chip silently falls back to text-only. Simple Icons has no AWS logos, so AWS chips are always text-only.
- The grid has three columns, so aim for a multiple of three categories.

The "What I do" cards come from `SERVICES`, and the hero stats from `STATS`. Both live in the same file.

## Add an education entry

Append to `EDUCATION`. `details` is optional. Without it, the card shows only institution, degree, dates and location.

## Replace the CV

1. Overwrite `public/Ahmed_Adel_CV.pdf`, keeping the filename. The hero "Resume" button links to it through `ASSET_SLOTS.resume` in [asset-slots.ts](../../src/shared/config/asset-slots.ts).
2. To rename the file, update both `PROFILE.resumeSlot` in `site-data.ts` and `ASSET_SLOTS.resume` in `asset-slots.ts`. They must match. Only `ASSET_SLOTS.resume` is actually rendered.

## Change the profile photo

Overwrite `public/assets/profile.jpg`. It renders as a 160 × 160 px square in the contact section, so supply at least 480 × 480 px for sharp display on high-DPI screens.

## Change header and footer links

Edit `SITE_LINKS`. Entries with `external: true` render in the desktop nav, the mobile menu and the contact section. The internal `/codes` link is hard-coded in [site-header.tsx](../../src/widgets/site-header/ui/site-header.tsx).

## Change the page `<head>`

The `<title>`, meta description, Open Graph and Twitter tags, JSON-LD `Person` data, theme colour and fonts are static in [index.html](../../index.html). The PWA name is in [public/manifest.json](../../public/manifest.json). Per-page `document.title` is set in each view (`home-view.tsx`, `codes-view.tsx`). Update `index.html` whenever your headline role changes. The meta description is what search engines and link previews show.

## Checklist after any content change

- [ ] `npm run build` passes.
- [ ] Every URL you added opens (live demo and GitHub).
- [ ] The CV and the site agree on dates, titles and company names.
