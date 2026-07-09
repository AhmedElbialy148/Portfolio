# TypeScript rules

This is the canonical TS contract for Vite + React SPAs. The settings ship in `assets/tsconfig.json`; the rationale is here.

## `tsconfig.json` — required compiler options

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,

    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,

    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Why each non-default matters:

- **`noUncheckedIndexedAccess`** — `arr[i]` is `T | undefined` instead of `T`. Eliminates a huge class of runtime crashes on empty arrays / missing keys.
- **`exactOptionalPropertyTypes`** — `{ foo?: string }` no longer silently allows `{ foo: undefined }`. Distinguishes "missing" from "present-and-undefined".
- **`verbatimModuleSyntax`** — forces `import type` for type-only imports. Catches misuse at compile time and keeps emitted JS clean.
- **`noUnusedLocals` / `noUnusedParameters`** — dead variables fail the build. Prefix with `_` to opt out (`_unusedParam`).

## Naming conventions

| Kind                                | Convention            | Examples                             |
|-------------------------------------|-----------------------|--------------------------------------|
| File names                          | kebab-case            | `login-form.tsx`, `use-login.ts`     |
| React components                    | PascalCase            | `LoginForm`, `UserCard`              |
| Types & interfaces                  | PascalCase            | `LoginCredentials`, `UserProps`      |
| Functions, methods, variables       | camelCase             | `submitLogin`, `userId`              |
| Hooks                               | camelCase, `use*`     | `useLogin`, `useUserProfile`         |
| React event handlers                | camelCase, `handle*`  | `handleSubmit`, `handleDelete`       |
| Boolean variables                   | `is* / has* / should*`| `isPending`, `hasAccess`             |
| Module-level immutable constants    | UPPER_SNAKE_CASE      | `MAX_RETRY`, `DEFAULT_PAGE_SIZE`     |
| FSD slice folders                   | kebab-case noun       | `login/`, `user-profile/`            |
| Zod schemas                         | PascalCase + `Schema` | `LoginCredentialsSchema`             |

## Types vs interfaces

- **`interface`** for object shapes that may be extended or implemented (component props, public API contracts).
- **`type`** for unions, intersections, mapped/conditional types, and aliases.
- Don't mix purely for style. Pick the one that fits the shape.

## No `any`

`any` opts the value out of the type system. Use `unknown` and narrow.

The two acceptable escape hatches:

1. **`unknown`** — for genuinely unknown input. Narrow before use.
2. **`// @ts-expect-error <reason>`** — must include a written reason. Build fails if the comment becomes stale.

`@ts-ignore` is **not** allowed (it silently rots).

## `import type` is mandatory

Enforced by `verbatimModuleSyntax: true`.

## Discriminated unions over enums

TS enums emit runtime objects, don't tree-shake, and have surprising behaviour. Tagged unions are zero-cost and exhaustive-checkable.

## Boundary validation with Zod

Any value crossing into the app from outside (network response, URL params, form data, localStorage) goes through a schema **before** it becomes a typed value. See `react-data` skill for the full data-layer patterns.

Never `as User` your way past unknown data.

## Path aliases

One alias only: `@/*` → `./src/*`. Cross-layer imports use it.

Within a slice, relative imports are fine and preferred (they survive moves).

## Function signatures

- **Always type the return type of exported functions.** Inference is fine internally; at the public boundary it's a contract.
- **Avoid optional positional params past the first.** Use a single options object.
- **Default to readonly.** `readonly string[]`, `ReadonlyArray<…>`, `readonly` props.

## React-specific

- **Props interfaces named `<Component>Props`.** Always exported.
- **No `React.FC`.** Use a plain function with typed props.
- **Children typing:** `children: React.ReactNode` (not `JSX.Element` which is too narrow).
- **Refs:** use the `ref` prop directly (React 19), not `forwardRef`.

## ESLint enforcement

`assets/eslint.config.mjs` ships with the strict ruleset. See `HOOKS_NAMED_FNS.md` for hook-specific rules.
