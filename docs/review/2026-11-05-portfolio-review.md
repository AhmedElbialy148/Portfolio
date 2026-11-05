# Portfolio review — 2026-11-05

A review of the portfolio as of commit `fe5d7e5`, compared against the CV of 2026-11-05 (`public/Ahmed_Adel_CV.pdf`).

**Method:** I read all the source, ran a production build, measured colour contrast from the design tokens, and checked link status codes against the live site. I did **not** render the site in a browser, so the visual notes come from the code, the tokens and the screenshots in the repo. The Netlify demo links couldn't be reached from the review environment and are unverified.

---

## Scorecard

| Area                          | Score | One-line verdict                                                                 |
| ----------------------------- | :---: | -------------------------------------------------------------------------------- |
| Visual design & brand         | 7/10  | Cohesive, restrained graphite + gold system. Stock Lotties dilute it            |
| UX & information architecture | 5/10  | No section nav, a 404 on deep link, and a skills wall before the experience      |
| Experience: CV match          | 8/10  | All 6 roles, titles and dates match exactly                                     |
| Skills: CV match              | 5/10  | GCP, RAG, Redis, data/automation tooling and languages are missing              |
| Projects                      | 3/10  | **Biggest gap.** 2023-era course projects don't show the engineer the CV describes |
| Identity & consistency        | 5/10  | "Ahmed Adel" vs "Ahmed Elbialy" split across files, and a broken GitHub profile link |
| SEO & link previews           | 3/10  | Outdated meta description, no Open Graph tags, no rendered HTML                  |
| Accessibility                 | 6/10  | Good focus and ARIA basics. Light-mode contrast fails, and card motion ignores the reduced-motion setting |
| Code quality                  | 8/10  | Strict TS, clean FSD, consistent docstrings                                      |
| Performance                   | 5/10  | About 490 kB gzipped JS plus about 7 MB of PNG and Lottie assets                 |
| **Overall**                   | **5.5/10** | **Well engineered, but it undersells you.** Your best work is in the CV, not the site |

The site's structure, typing and design system are better than most developer portfolios. The problem is content. The CV describes a backend and AI-agent engineer who builds agentic RAG, streaming LLM chat, cloud infrastructure on AWS and GCP, and HR-platform integrations. The site's *Projects* section shows a calculator, a to-do app and four course exercises. A recruiter who skims the projects (most do) leaves with the wrong picture.

---

## 1. Correctness bugs (fix first)

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 1 | **GitHub profile link is 404.** Header, mobile menu and contact section all point to `github.com/AhmedElbailey` | `curl` → 404. The repo remote and CV use `AhmedElbialy148` | Set `SITE_LINKS.github.href` to `https://github.com/AhmedElbialy148`, and update every `githubUrl` in `PROJECTS` as well. Those currently work only because GitHub redirects renamed repos, and that redirect stops if anyone registers the old name |
| 2 | **`/codes` returns 404** when opened directly or refreshed on Vercel | `curl https://portfolio-two-puce-19.vercel.app/codes` → 404 | Add `vercel.json` with an SPA rewrite. See [Deploy](../guides/deploy.md#spa-routing-rewrite). `_redirects` is Netlify-only |
| 3 | **Shopify demo is 404** | `https://shopify-cnnv.onrender.com` → 404 | Redeploy it, or drop the Live button and the featured flag |
| 4 | **The "Portfolio" project card shows the old 2023 site** (purple theme, "Hi I'm Ahmed Adel", "certified AWS Cloud Practitioner") | `public/assets/projects/portfolio.png` | Replace it with a screenshot of the current site, or remove the card. A portfolio listing itself as a project adds little |
| 5 | No 404 route | `router.tsx` has no `*` or `errorElement`, so unknown paths show React Router's developer error screen | Add `{ path: "*", element: <NotFoundView/> }` |
| 6 | Sticky header covers anchor targets | "View work" → `#projects` scrolls the heading under the 64 px header | Add `scroll-margin-top: 5rem` to `section[id]` |

## 2. CV ↔ portfolio match

### 2.1 Experience: accurate, but thin where it matters

All six roles (MIS, Anyware, Digital Car, Vultara, Freelancing, ValleySoft) are present with matching titles, dates, locations and work types. Education (Cairo University, NTI) matches as well.

The gap is depth on the **MIS** role, your current job and strongest material. The CV has **17 bullets** and the site has **5**. These are missing:

| Missing from site (CV, MIS role)                                                                 | Why it matters                                   |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Multi-layer **agentic RAG**: pgvector + full-text search + reciprocal rank fusion, source-cited answers | Your most distinctive, senior-sounding work      |
| **Document-ingestion pipeline**: PDF/DOCX/screenplay/budget, Document AI OCR fallback, Voyage embeddings, semantic chunking, resumable jobs | Shows production data engineering, not just demos |
| LangGraph **context management**: token-aware summarisation, prompt caching, retry logic        | Shows you've hit real LLM production problems    |
| **SSE streaming chat** in Next.js with persisted messages and inline citations                  | Full-stack AI delivery                           |
| **GCP staging**: Cloud Run v2, Cloud SQL/pgvector, Memorystore, GCS, Secret Manager, Cloud Armor | Second cloud. Absent from the entire site        |
| **Firebase auth with TOTP/SMS MFA**, session revocation, account lockout                         | Security credibility                             |
| **Supabase** data modelling and RBAC                                                             |                                                  |
| **PyQt** desktop app                                                                             | Breadth                                          |
| **Google Apps Script + clasp** automation                                                         | Listed in your CV summary, absent from the site  |

Smaller gaps: Vultara shows 2 of 3 bullets, and ValleySoft is missing "message transformation pipelines and middleware".

### 2.2 Skills: missing categories

The CV has **8 skill groups** and the site has **4**.

| CV group                 | On site? | Missing items                                                                  |
| ------------------------ | -------- | ------------------------------------------------------------------------------ |
| Backend & API            | ✓        | —                                                                              |
| Frontend                 | ✓        | —                                                                              |
| AI & Agent Engineering   | partial  | **Hybrid RAG, pgvector**, LLM agents named as such                            |
| Cloud & DevOps           | partial  | **All of GCP** (Cloud Run, Cloud SQL, GCS, Memorystore, Secret Manager, Cloud Armor) |
| Databases                | merged into Cloud | **Redis**, pgvector                                                     |
| Data & Automation        | ✗        | Apps Script, clasp, Pandas, Selenium, Playwright, XLWings, Document AI (Pandas, Selenium and Playwright appear only in an experience bullet) |
| Developer Tools          | ✗        | Cursor, IntelliJ, Postman (lower priority)                                     |
| Software Engineering     | partial  | OOP (System design and SOLID are present)                                      |
| **Languages**            | ✗        | Arabic (native), English B2, German A1                                         |

GCP is in your CV **summary line** ("Next.js, FastAPI, PostgreSQL, AWS, and GCP") but appears nowhere on the site.

### 2.3 Summary / bio

The hero bio is a good condensation of the CV summary. It omits the **years of experience** ("2+ years"), which recruiters scan for first, and the business-integrations angle (Paychex, AxisCare, Relias).

Your timeline starts in Sep 2023, so you have 3+ years including freelance and 2+ years full-time. Pick one way to count, and use it on both the CV and the site.

### 2.4 Projects: the core mismatch

| CV says you build…                                   | Site's projects show…                                      |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| LangGraph agents, agentic RAG, ingestion pipelines   | Nothing AI-related                                         |
| FastAPI + Celery, NestJS, event-driven backends      | One EJS SSR shop (demo down), one REST to-do app            |
| AWS ECS/ECR/RDS, GCP Cloud Run infrastructure        | Netlify-hosted static pages                                |
| Third-party integrations, auth, MFA                  | —                                                          |

Seven of the 11 projects are frontend-only HTML/CSS/JS exercises. Several (Forkify, Mapty, Bankist ×2, Omnifood) share names and concepts with well-known course capstones, and experienced reviewers recognise them. Presenting them as *Personal Projects* next to an "AI agent engineer" headline works against you.

Two of three **featured** projects are a to-do app and a shop whose demo is down. Facar (React + GraphQL social network) is the only one that ties into your CV (Freelancing: "social platforms using GraphQL APIs and React.js"). Say that on the card.

### 2.5 Things on the site or CV that need a decision

- **AWS Cloud Practitioner.** Your old site claimed this certification, and the new site and CV don't. If it's still valid, add it to both. If it has lapsed (the exam is valid for 3 years), the omission is correct.
- **Facebook link** was on the old site and is gone. That's the right call for a professional profile.

## 3. Identity & consistency

| Where                                    | Name used          |
| ---------------------------------------- | ------------------ |
| Site hero, titles, footer, CV header     | Ahmed **Elbialy**  |
| CV filename `Ahmed_Adel_CV.pdf`          | Ahmed **Adel**     |
| `index.html` meta description            | Ahmed **Adel**     |
| `manifest.json` (`name`, `short_name`)   | Ahmed **Adel**     |
| LinkedIn slug `/in/ahmed-adel`           | Ahmed **Adel**     |
| GitHub handle                            | `AhmedElbialy148`  |
| Old CV in repo `Ahmed Adel Mohamed.pdf`  | Ahmed Adel Mohamed |

Pick one public name, for example "Ahmed Adel Elbialy" on first mention and "Ahmed Elbialy" afterwards, and use it everywhere. Rename the CV to `Ahmed_Elbialy_CV.pdf`, because recruiters save it under its filename.

The meta description and manifest still say "**Backend developer** … Node.js, NestJS, AWS, Docker", which is your 2024 positioning. Update them to the AI/backend full-stack framing.

## 4. Visual design

**Strengths**

- **A real design system.** It has a token file, a two-theme palette, a radius/shadow/motion scale, and CVA-based primitives in the style of shadcn. Everything uses the same tokens, which is uncommon in personal sites.
- **Restrained palette.** Graphite with a single gold accent reads as senior and calm. It's a big step up from the 2023 purple illustration style.
- **Good type pairing.** Space Grotesk for display and body, JetBrains Mono for eyebrows and dates. The mono dates nod to your engineering background without overdoing it.
- **A theme bootstrap script** in `index.html` prevents the wrong-theme flash on load.
- **Thoughtful micro-interactions.** Staggered entrances, a 3D tilt on project cards, and a slow zoom on screenshots.

**Weaknesses**

1. **Stock Lottie animations do the heavy lifting.** Five generic animations total about 2.2 MB of JSON: one in the hero, and one per skill card at up to roughly 450 px square. They're the most visually dominant elements on the page, and they say nothing about you. On a backend/AI portfolio, an architecture diagram, a code or terminal snippet, or a real screenshot of something you built would be more memorable.
2. **The skills section is a wall.** Four full-width cards stacked vertically, each with a square animation, push Experience about 2,000 px down on desktop. A compact chip grid of the 8 CV categories would fit in one screen.
3. **Hero clutter.** Lottie and the 3D wireframe sit in the same square. The wireframe runs at 70 % opacity behind an opaque animation, so most of its 245 kB (gzipped) download is hidden. Use one or the other.
4. **Your photo is buried in the footer** at 160 px. The source is only 250 × 333 px, so it's soft on high-DPI screens. A face near the headline builds trust, especially for remote and freelance clients.
5. **Gradient-text name** (`from-accent to-amber-200`) is a common AI-template pattern. Plain `--color-fg` text with the gold kept for small accents would look more confident.
6. **Project screenshots are cropped to 176 px tall** with `object-top`. Landing pages work with that crop, but the to-do and calculator screenshots will show mostly empty space.

## 5. UX & information architecture

- **No in-page navigation.** The header offers Projects (another page), Email, GitHub and LinkedIn. There are no links to Experience, Skills or Contact, and on mobile there's no way to jump around a long page. Add `Experience · Skills · Projects · Contact` anchor links and keep the external icons on the right.
- **Section order.** Skills → Experience → Education → Projects → Contact. Recruiters want **Experience** or **Selected work** first, and skills are supporting evidence. A better order: Hero → Selected work/case studies → Experience → Skills → Education → Contact.
- **`/codes`** is an odd URL for a page labelled "Projects". `/projects` reads better, and you can keep `/codes` as a redirect.
- **The resume button** opens the PDF in a new tab, which is good. A `download` attribute with a clean filename would be better on mobile.
- **The mobile menu** doesn't close on <kbd>Esc</kbd> or on outside click, and it doesn't trap focus. That's a minor issue.
- **No call to action in the hero** other than Resume and View work. Since the footer says you're open to roles and freelance, add a primary "Get in touch" (`mailto:`) button in the hero.

## 6. SEO & link previews

When you paste the site URL into LinkedIn, WhatsApp or Slack, the preview shows only "Ahmed Elbialy" and the old description, with no image.

- Add Open Graph and Twitter tags to `index.html`: `og:title`, `og:description`, `og:image` (a 1200 × 630 card with your name and title), `og:url`, `twitter:card=summary_large_image`.
- Update `<meta name="description">` to the current positioning.
- Add `<link rel="canonical">` and a JSON-LD `Person` block (name, jobTitle, sameAs: GitHub, LinkedIn).
- Longer term, prerender to static HTML. See [ADR-0003](../decisions/0003-vite-spa-over-ssr.md). Then your experience text is indexable and visible to crawlers that don't run JavaScript.

## 7. Accessibility

**Good:** global `:focus-visible` ring, `aria-label` on icon buttons, `aria-expanded` on the menu toggle, `aria-hidden` on decorative canvas, `role="img"` with labels on Lotties, and reduced-motion handling for the 3D scene and Lotties.

**Fix:**

| Issue | Detail |
|-------|--------|
| Light-theme accent fails contrast | `#b8860b` on white = **3.25:1** (needs 4.5:1). It's used for job titles, eyebrow text and the **primary button label** (white on gold, also 3.25:1). Darken the light accent to about `#8a6508` (≈ 5.4:1) |
| `fg-subtle` fails in both themes | 2.52:1 light, 3.63:1 dark. It's used for dates, the search result count and the copyright line. Raise it to about `#78716c` light and `#8a8a93` dark |
| Motion ignores reduced-motion for cards | `ExperienceCard`, `ProjectCard` and `SkillCard` animate with Motion regardless of the setting. Wrap the app in `<MotionConfig reducedMotion="user">` |
| Headings | Section `<h2>`s contain a decorative `<span>` underline, so screen readers are unaffected, but `SectionHeading` accepts an `id` prop that no caller passes |

## 8. Performance

| Asset                         | Size                          | Suggestion                                                                |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------------- |
| Main JS chunk                 | 854 kB min / 245 kB gz        | lottie-web is the bulk of it. Dropping the Lotties removes it             |
| Hero 3D chunk (lazy)          | 908 kB min / 245 kB gz        | Replace with SVG/CSS, or drop it                                          |
| Lottie JSON (5 files)         | ≈ 2.2 MB (cloud alone 1 MB)   | Remove, or switch to `.lottie` (dotLottie) format at about 10–20 % of the size |
| Project PNGs (11 files)       | ≈ 5 MB (mapty 1.5 MB)         | Convert to WebP at about 1200 px wide, under 150 kB each, with explicit `width`/`height` |
| Google Fonts                  | 2 families, 6 weights         | Fine. Consider self-hosting with `font-display: swap`                     |

Also: `useReducedMotion` exists in `shared/lib`, yet `LottieAnimation` re-implements the same listener. Reuse the hook.

## 9. Code quality

**Strengths:** strict TypeScript (`noUncheckedIndexedAccess`, `verbatimModuleSyntax`), a clean FSD layout with public `index.ts` APIs, TSDoc on every file, named functions inside hooks, typed content, a lazy-loaded heavy dependency, and no dead imports (the build passes cleanly).

**Gaps:**

- `npm run lint` only runs `tsc`. There's no ESLint and no FSD boundary checking (`steiger`).
- `PROFILE.resumeSlot` is defined but never read, because the hero uses `ASSET_SLOTS.resume`. Two sources of truth.
- The `ICONS` lookup in `SkillCard` casts `category.icon as keyof typeof ICONS`. Typing `SkillCategory.icon` as a union would catch typos at compile time.
- `OrbitControls` in the hero scene can never receive input (`pointer-events-none`), so it's dead weight.
- No tests. That's acceptable for a portfolio, but a single link-check script in CI would have caught bugs #1 and #3.

## 10. Repository hygiene

The repo is public, and every project card's "Code" button links to it.

| Item | Concern |
|------|---------|
| **`.cursor/skills/` (≈ 120 files of MIS engineering standards)** | These appear to be your employer's internal standards (API guards, FSD rules, GAS patterns, LangGraph templates) committed to a **public** personal repo. **Confirm with MIS that publishing them is OK.** If not, remove them from the repo and its history. `.claude/` (currently untracked) has the same content, so add it to `.gitignore` |
| `src/components/` (6.7 MB) | Pre-rewrite leftovers, including **an old CV (`docs/Ahmed Adel Mohamed.pdf`)** that's publicly downloadable from GitHub. Nothing imports it, so delete it |
| `image/portfolio.png` | Old 2023 screenshot. Delete or replace |
| `tsconfig*.tsbuildinfo` | Build cache files. Add to `.gitignore` |
| `_redirects` | Netlify-only and ineffective on Vercel |

## 11. Privacy

- The **public CV PDF includes your full street address** (25 Al Arbeein St …). The site rightly shows only "Giza, Egypt", but anyone can download the PDF. Use a web version of the CV that shows just "Giza, Egypt".
- The phone number is shown publicly on the site and in the PDF. That's a personal choice, but public numbers attract recruiter spam and scraping. Email plus LinkedIn is usually enough.

## 12. Notes on the CV itself

You asked about the portfolio, but these came up during the comparison:

- **No numbers anywhere.** "Significantly accelerate", "reducing manual overhead", "high-performance" are all claims without measurements. Add even rough figures, for example "cut report prep from 4 h to 10 min", "ingests ~N documents/day", "p95 latency X ms", or "N integrations".
- **The MIS role has 17 bullets.** Cut it to 6–8 of the strongest, and move the rest into portfolio case studies. That's where depth belongs.
- **Ordering.** ValleySoft (Jun–Jul 2024) is listed after Freelancing (Sep 2023 – May 2024). Order roles by start date, or group internships together.
- "Giza, Giza" in the Cairo University line should be "Giza, Egypt".

---

## Recommended restructure

```
Hero        Name · "Backend & AI-Agent Engineer" · 1-line value prop · years of experience
            [Get in touch] [Resume] · photo · GitHub / LinkedIn icons
Selected    3–4 case studies of real (anonymised) work:
work          • Agentic RAG platform (pgvector + FTS + RRF, cited answers)
              • Document-ingestion pipeline (OCR fallback, embeddings, resumable jobs)
              • Streaming agent chat (LangGraph → SSE → Next.js, citations)
              • HR-platform integrations (Paychex / AxisCare / Relias) or cloud infra (ECS / Cloud Run)
            Each: problem → architecture diagram → your role → stack → outcome (with a number)
Experience  Current layout, MIS trimmed to 5–6 sharp bullets, links to case studies
Skills      Compact chip grid of the 8 CV groups, plus spoken languages
Open source 2–3 small public repos that prove the CV (e.g. a minimal LangGraph + pgvector
            RAG demo, a FastAPI + Celery template)
Archive     /projects → "Early work (2023)": the current course projects, de-emphasised
Contact     As is, minus the phone if you prefer
```

You can write case studies without breaching confidentiality. Describe the architecture and the problems you solved, use generic names ("a film-production client"), and don't include screenshots of client data. A diagram you draw yourself is usually enough.

---

## Prioritised action list

**P0: this week (≈ 1–2 h, fixes visible breakage)**

1. Fix the GitHub URLs (`AhmedElbailey` → `AhmedElbialy148`) in `SITE_LINKS` and all `PROJECTS`.
2. Add `vercel.json` with the SPA rewrite.
3. Fix or remove the Shopify demo, and replace the Portfolio screenshot.
4. Update the meta description and manifest, and add Open Graph tags and an OG image.
5. Remove the street address from the public CV and rename the file.
6. Decide about `.cursor/skills/` in the public repo, and delete `src/components/` and `image/`.

**P1: next 2–4 weeks (closes the CV gap)**

7. Add 3–4 case studies from MIS work, and make them the featured projects.
8. Expand the MIS experience entry with RAG, ingestion, SSE, GCP and MFA.
9. Restructure skills to the 8 CV groups, and add GCP, Redis, RAG, the data/automation group and languages.
10. Add years of experience to the hero, and add section anchor nav to the header.
11. Move the course projects to an "Early work" archive on `/projects`.

**P2: polish**

12. Fix light-mode accent and `fg-subtle` contrast, and add `MotionConfig reducedMotion="user"`.
13. Replace the Lotties and the 3D scene with lighter, more personal visuals. Move the photo into the hero at a higher resolution.
14. Convert screenshots to WebP, add a 404 page, and add `scroll-margin-top`.
15. Add ESLint and a link-check script, and consider static prerendering.
