# Reference directory tree

The canonical layout for a Vite + React + FSD SPA. Keep this open while scaffolding the first few slices.

```
<repo-root>/
├── src/
│   ├── main.tsx                        # Vite entry — mounts App
│   ├── app/                            # App shell (router, providers)
│   │   ├── app.tsx                     # Root component
│   │   ├── providers.tsx               # Theme, query client, auth context
│   │   ├── router.tsx                  # react-router route definitions
│   │   └── error-boundary.tsx          # Route-level error UI
│   │
│   ├── views/                          # FSD "pages" layer — page compositions
│   │   ├── home/
│   │   │   ├── index.ts                # public API: HomeView
│   │   │   └── ui/home-view.tsx
│   │   └── codes/
│   │       ├── index.ts
│   │       └── ui/codes-view.tsx
│   │
│   ├── widgets/                        # Self-contained UI blocks (reused across views)
│   │   ├── site-header/
│   │   │   ├── index.ts
│   │   │   └── ui/site-header.tsx
│   │   └── command-palette/
│   │       ├── index.ts
│   │       ├── ui/command-palette.tsx
│   │       └── model/use-palette.ts
│   │
│   ├── features/                       # User actions with business value
│   │   ├── login/
│   │   │   ├── index.ts                # public: LoginForm, useLogin, types
│   │   │   ├── ui/login-form.tsx
│   │   │   ├── model/
│   │   │   │   ├── use-login.ts
│   │   │   │   ├── submit-login.ts
│   │   │   │   └── types.ts
│   │   │   └── api/login.ts
│   │   └── theme-toggle/
│   │       └── …
│   │
│   ├── entities/                       # Business entities
│   │   ├── user/
│   │   │   ├── index.ts                # public: User, fetchUser, UserCard
│   │   │   ├── ui/user-card.tsx
│   │   │   ├── model/
│   │   │   │   ├── types.ts            # type User, UserSchema (Zod)
│   │   │   │   └── store.ts
│   │   │   └── api/
│   │   │       └── fetch-user.ts
│   │   └── project/
│   │       └── …
│   │
│   └── shared/                         # Reusable infra (no business knowledge)
│       ├── ui/                         # UI kit (Button, Input, Dialog, …)
│       │   ├── button/
│       │   │   ├── index.ts
│       │   │   └── button.tsx
│       │   └── input/
│       │       └── …
│       ├── lib/                        # Pure utilities (format-date, cn, …)
│       │   ├── format-date.ts
│       │   └── cn.ts
│       ├── api/                        # HTTP client, query keys, …
│       │   └── client.ts
│       ├── config/                     # Env vars, feature flags, constants
│       │   ├── env.ts
│       │   └── tokens.css
│       └── types/                      # Generic ambient types
│           └── result.ts
│
├── public/                             # Static assets served at /
│
├── index.html                          # Vite HTML entry (at project root)
├── tsconfig.json                       # ← assets/tsconfig.json
├── vite.config.ts                      # ← assets/vite.config.ts
├── eslint.config.mjs                   # ← assets/eslint.config.mjs
├── steiger.config.ts                   # ← assets/steiger.config.ts
├── package.json
└── README.md
```

## What goes where — quick lookup

| Kind of file                              | Lives in                                    |
|-------------------------------------------|---------------------------------------------|
| Vite entry                                | `src/main.tsx`                              |
| Router + providers                        | `src/app/…`                                 |
| Page composition (the real page)          | `src/views/<view>/ui/<view>-view.tsx`       |
| Reusable UI block (header, sidebar, …)    | `src/widgets/<widget>/ui/…`                 |
| User-action form / button / orchestration | `src/features/<action>/ui/…` + `model/…`    |
| Entity type + Zod schema                  | `src/entities/<entity>/model/types.ts`      |
| Entity fetcher                            | `src/entities/<entity>/api/…`               |
| Entity card / row component               | `src/entities/<entity>/ui/<entity>-card.tsx`|
| UI kit primitives (Button, Input, …)      | `src/shared/ui/<primitive>/…`               |
| Generic util (formatDate, cn, …)          | `src/shared/lib/<util>.ts`                  |
| HTTP client                               | `src/shared/api/client.ts`                  |
| Env / feature-flag access                 | `src/shared/config/env.ts`                  |

## What never appears

- `src/components/`, `src/hooks/`, `src/utils/` at the top level — these are technical-type folders that FSD replaces with business-meaning layers.
- `src/lib/` at the top level — that's `src/shared/lib/`.
- Per-route `components/` folders — components live in FSD slices.
- Nested slices (`features/auth/login/`) — flatten to `features/login/`.
- Default exports anywhere outside router lazy-import internals.
