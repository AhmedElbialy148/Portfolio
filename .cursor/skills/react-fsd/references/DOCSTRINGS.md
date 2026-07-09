# Docstrings — file & function level

Every `.ts` and `.tsx` file in a React FSD repo has two mandatory docstring layers:

1. **A file-level docstring** at the top of the file.
2. **A TSDoc block** above every exported function, component, hook, type, and interface.

Enforced by `eslint-plugin-jsdoc` (config in `assets/eslint.config.mjs`).

## File-level docstring

Position: very top of the file. Before imports.

Format:

```ts
/**
 * @file <fsd-path>/<file-name>
 * <one-sentence summary of what this file exports and its role in the slice>.
 */
```

Rules:

- `@file` tag is mandatory. The value is the path relative to `src/`, ending in the file name.
- Summary is one sentence (≤ ~100 chars). End with a period.
- For multi-export files, the summary covers the file's role, not each export.
- No blank line between the docstring and the first import.

## Function / component / hook docstring

Position: immediately above the declaration. No blank line between the docstring and the declaration.

Format:

```ts
/**
 * <one-line summary in imperative mood, ending with a period>.
 *
 * <optional longer description, wrap at ~80 chars>.
 *
 * @param <name> - <what it is; units / constraints if non-obvious>
 * @returns <what comes back; omit if void or trivially obvious>
 * @throws <ErrorClass> when <condition> — omit if no throws
 * @see {@link OtherSymbol}
 */
```

## Internal helpers (non-exported)

Non-exported helpers inside a file get a **single-line** docstring:

```ts
/** Lowercases the email and trims whitespace. */
function normaliseEmail(input: string): string {
  return input.trim().toLowerCase()
}
```

## What not to write

- **Don't restate the signature.**
- **Don't write essays.**
- **Don't add change-log entries.**
- **Don't auto-generate.**

## ESLint rules

`eslint-plugin-jsdoc` rules in `assets/eslint.config.mjs`:

- `jsdoc/require-jsdoc` — exported symbols, components, hooks, classes.
- `jsdoc/require-file-overview` — the `@file` block.
- `jsdoc/require-description`
- `jsdoc/require-param-description`
- `jsdoc/require-returns-description`
- `jsdoc/require-param-type` (off — TS owns types)
- `jsdoc/require-returns-type` (off — TS owns types)

## Quick checklist

Before opening a PR:

- [ ] Every changed file has a `@file` docstring.
- [ ] Every changed exported symbol has a TSDoc block.
- [ ] `@param` covers every parameter; `@returns` is present unless void.
- [ ] Docstrings explain *intent*, not the signature.
