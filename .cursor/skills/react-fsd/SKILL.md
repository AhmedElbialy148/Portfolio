---
name: react-fsd
description: Standard for Vite + React + TypeScript SPAs using Feature-Sliced Design. Enforces FSD folder layout, strict TypeScript, file- and function-level TSDoc docstrings, and named function expressions inside hooks (useEffect / useMemo / useCallback). Use whenever creating a new React SPA, adding a feature/entity/widget, writing a React component or hook, structuring imports, or reviewing TypeScript / React code in a Vite + react-router repo.
license: Proprietary — MIS (Modern Intelligence Solutions) internal use
metadata:
  team: MIS
  version: "1.0"
  stack: vite, react, typescript, react-router, fsd, tailwind, shadcn
  related: react-data, mis-frontend-design
---

# React + FSD application standard

The contract for every Vite + React SPA:

1. **Folder layout is Feature-Sliced Design.** Code is organised by business meaning (`entities/`, `features/`, `widgets/`, `views/`), not by technical type (`components/`, `hooks/`).
2. **Imports flow downward only.** Higher FSD layers import from lower layers; same-layer cross-imports are forbidden.
3. **TypeScript is strict.** No `any`, no implicit `unknown`, no unchecked index access.
4. **Every file has a top-level docstring.** Every exported function, component, hook, and type has its own TSDoc block.
5. **Every callback passed to a React hook is a named function expression.** `useEffect(function syncUser() { … }, [userId])` — never an anonymous arrow.

When in doubt on any of these, open the matching reference:

| Topic | Reference |
|-------|-----------|
| FSD layers, segments, import rules | `references/FSD_LAYERS.md` |
| Mapping react-router v6 onto FSD | `references/ROUTING.md` |
| TypeScript config + naming + patterns | `references/TYPESCRIPT.md` |
| Docstring rules (file & function level) | `references/DOCSTRINGS.md` |
| Named function expressions in hooks | `references/HOOKS_NAMED_FNS.md` |

Drop-in starter files live in `assets/`.

---

## Decision tree

| If the user asked to… | Go to |
|-----------------------|-------|
| Bootstrap a new React SPA | [1. Bootstrap a new app](#1-bootstrap-a-new-app) |
| Add a new feature / entity / widget | [2. Add a slice](#2-add-a-slice) |
| Place a file in the tree | [3. Where does this file go?](#3-where-does-this-file-go) |
| Write a component or hook | [4. Write a component or hook](#4-write-a-component-or-hook) |
| Write a `useEffect` / `useMemo` / `useCallback` | [5. Hooks with named functions](#5-hooks-with-named-functions) |
| Define types or write a function signature | [6. TypeScript rules](#6-typescript-rules) |
| Add docstrings | [7. Docstring rules](#7-docstring-rules) |
| Review a PR for compliance | [8. Review checklist](#8-review-checklist) |

---

## 1. Bootstrap a new app

```bash
pnpm create vite@latest <app-name> --template react-ts
cd <app-name>
pnpm add react-router-dom
```

Required choices: **React + TypeScript**, **`@/*` import alias** (configure in `vite.config.ts` + `tsconfig.json`).

Then drop these in from `assets/`:

| Source                        | Destination          |
|-------------------------------|----------------------|
| `assets/tsconfig.json`        | `tsconfig.json` (merge with the generated one) |
| `assets/vite.config.ts`       | `vite.config.ts`     |
| `assets/eslint.config.mjs`    | `eslint.config.mjs`  |
| `assets/steiger.config.ts`    | `steiger.config.ts`  |
| `assets/directory-tree.md`    | keep open while scaffolding the first slices |

Install dev deps for the linters:

```bash
pnpm add -D eslint-plugin-jsdoc eslint-plugin-import @feature-sliced/steiger-plugin steiger
```

Initial FSD scaffold (under `src/`):

```
src/
├── app/                    # App shell — router, global providers, route wiring
├── views/                  # FSD views layer (page composers; thin wrappers)
├── widgets/                # Independent UI blocks composed from features/entities
├── features/               # User actions that deliver value
├── entities/               # Business entities (user, product, order, …)
└── shared/                 # Reusable infra (ui kit, lib, api client, config)
```

See `references/ROUTING.md` for how `src/app/` interacts with FSD's `views/`.

---

## 2. Add a slice

A **slice** is one folder inside a layer — e.g. `features/login`, `entities/user`. Slices contain **segments**:

```
features/login/
├── index.ts        # public API — only these exports may be imported by other slices
├── ui/             # React components for this feature
├── model/          # state, business logic, types
├── api/            # backend calls for this feature
└── lib/            # utilities used only inside this slice
```

Rules:

- **Only `index.ts` is public.** Never reach into `features/login/ui/login-form.tsx` from outside the slice.
- **Same-layer cross-imports are forbidden.** `features/login` cannot import from `features/signup`. Push shared logic down a layer (to `entities/` or `shared/`) instead.
- **Upward imports are forbidden.** `entities/user` cannot import from any `features/*` or `widgets/*`.

Full layer + segment reference, with the allow/deny matrix — `references/FSD_LAYERS.md`.

---

## 3. Where does this file go?

Answer these in order:

1. **Is it the app shell (router, providers, route wiring)?** → `src/app/...` only. No business logic here.
2. **Is it a complete page composition?** → `src/views/<view-name>/`.
3. **Is it a self-contained UI block reused across multiple views (sidebar, header, command palette)?** → `src/widgets/<widget>/`.
4. **Does it implement a user-visible action with business value (login, send-message, add-to-cart)?** → `src/features/<feature>/`.
5. **Does it represent a business entity (user, product, order) with its model + base UI?** → `src/entities/<entity>/`.
6. **Is it generic reusable infra (button, formatter, http client, config)?** → `src/shared/<segment>/`.

If two answers fit, pick the **lower layer** (closer to `shared`). Pushing code down is cheap; pulling it up later is expensive.

---

## 4. Write a component or hook

Component file template — full version in `assets/template-component.tsx`:

```tsx
/**
 * @file features/login/ui/login-form.tsx
 * Login form: collects credentials, calls the auth feature's submit action,
 * surfaces validation + server errors inline.
 */

import { useState } from "react"
import type { LoginCredentials } from "@/entities/user"
import { submitLogin } from "../model/submit-login"

/**
 * Props for {@link LoginForm}.
 */
export interface LoginFormProps {
  /** Called once the server has accepted the credentials. */
  onSuccess: (userId: string) => void
}

/**
 * Renders the login form and orchestrates the submit flow.
 *
 * @param props - see {@link LoginFormProps}
 */
export function LoginForm({ onSuccess }: LoginFormProps) {
  const [creds, setCreds] = useState<LoginCredentials>({ email: "", password: "" })
  // ...
}
```

Hook file template — full version in `assets/template-hook.ts`.

Naming conventions (full table in `references/TYPESCRIPT.md`):

- **Files:** kebab-case (`login-form.tsx`, `use-login.ts`).
- **React components & types:** PascalCase (`LoginForm`, `LoginFormProps`).
- **Functions, variables, hooks:** camelCase (`submitLogin`, `useLogin`).
- **Constants (module-level, immutable):** UPPER_SNAKE_CASE.
- **Default exports:** **never**, except where the router requires them (`app/router.tsx` route elements may use lazy default imports internally — prefer named exports everywhere else).

---

## 5. Hooks with named functions

Every callback passed to a React hook is a **named function expression**, not an anonymous arrow.

```tsx
// ❌ anonymous arrow — stack traces show "anonymous"
useEffect(() => {
  void fetchUser(userId).then(setUser)
}, [userId])

// ✅ named function expression — stack traces, DevTools, and the next reader
//    all see "syncUserProfile" immediately
useEffect(function syncUserProfile() {
  void fetchUser(userId).then(setUser)
}, [userId])
```

Full rationale + ESLint rule that enforces it — `references/HOOKS_NAMED_FNS.md`.

---

## 6. TypeScript rules

The hard rules — full discussion in `references/TYPESCRIPT.md`:

- **Strict everywhere.** `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`, `noImplicitOverride: true`.
- **No `any`.** Use `unknown` and narrow. The escape hatch is `// @ts-expect-error <reason>` with a written reason.
- **`import type` for type-only imports.** Keeps the compiled bundle clean and signals intent.
- **Path aliases via `@/`.** Cross-layer imports use `@/entities/user`, never relative `../../../entities/user`.
- **Discriminated unions over enums.** TS enums emit runtime code and don't tree-shake; tagged unions don't.
- **Validate at the boundary.** Anything from the network / URL / form goes through Zod (or equivalent) before it becomes a typed value. Inside the app, trust the types.
- **No barrel files in `shared/`.** Each slice has a public `index.ts`; `shared/` exports per-folder (`@/shared/ui/button`) to keep tree-shaking honest.

---

## 7. Docstring rules

Two mandatory levels — full guide in `references/DOCSTRINGS.md`:

### File-level (every `.ts` / `.tsx`)

Top of file, before imports:

```ts
/**
 * @file <fsd-path>/<file-name>
 * <one-sentence summary of what this file exports and its role in the slice>.
 */
```

### Function-level (every exported function, component, hook, type)

TSDoc block immediately above the declaration.

The shared ESLint config (`assets/eslint.config.mjs`) enforces these via `eslint-plugin-jsdoc`.

---

## 8. Review checklist

When reviewing a PR in a React FSD repo, block on:

- [ ] No anonymous arrow callbacks in `useEffect` / `useLayoutEffect` / `useMemo` / `useCallback`.
- [ ] No imports that cross FSD rules (upward, same-layer, or reaching past a slice's `index.ts`).
- [ ] No `any`. No suppressed errors without a written reason.
- [ ] Every new file starts with a `@file` docstring.
- [ ] Every exported symbol has a TSDoc block.
- [ ] No business logic in `src/app/**` — only routing and composition.
- [ ] No default exports outside router convention files.
- [ ] Boundary input is validated (Zod or equivalent), not type-asserted.

Comment-only (not blocking): naming bikesheds, hypothetical extraction, minor doc wording.

---

## Anti-patterns (do not do this)

- Folders organised by technical type (`/components`, `/hooks`, `/utils`) at the top level. Use FSD layers instead.
- Importing from another feature: `features/login` ↦ `features/profile`. Push the shared logic down to `entities/` or `shared/`.
- Reaching past a slice's public `index.ts` (`@/features/login/model/foo`). Re-export from `index.ts` instead.
- Business logic in `app/router.tsx` or route wiring files. The app layer is plumbing — move logic into `views/` or further down.
- Anonymous arrow callbacks in hooks (`useEffect(() => …)`).
- `any` to silence the compiler. Narrow from `unknown` or fix the type.
- Default exports outside router convention files. They make refactors and IDE rename harder.
- Files without a `@file` docstring.
- Type-asserting boundary data (`json as User`). Validate it.
