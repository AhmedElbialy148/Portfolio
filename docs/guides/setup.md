# How to set up local development

How-to guide: get the portfolio running on your machine.

## Prerequisites

- Node.js **22 or newer**. The repo pins `22` in [.nvmrc](../../.nvmrc), and `package.json` enforces `"engines": { "node": ">=22" }`.
- npm (ships with Node).

## Steps

1. Select the pinned Node version (if you use nvm / nvm-windows / fnm):

   ```bash
   nvm use
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:5173. Edits to `src/` hot-reload.

4. Before pushing, check that the production build passes:

   ```bash
   npm run build
   npm run preview
   ```

   `build` runs `tsc --noEmit` first, so any type error fails the build.

## Notes

- The `@/` import alias maps to `src/`. It's configured in both [vite.config.ts](../../vite.config.ts) and [tsconfig.json](../../tsconfig.json). Keep the two in sync.
- TypeScript is strict, with `noUncheckedIndexedAccess`, `noUnusedLocals` and `verbatimModuleSyntax`. Import types with `import type { … }`.
- `npm run lint` only type-checks. No ESLint config exists yet.
- The build warns that chunks exceed 500 kB (lottie-web in the main chunk, three.js in the lazy hero chunk). It's a warning, not an error. See the [review](../review/2026-11-05-portfolio-review.md#performance) for ways to reduce it.
