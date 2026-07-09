---
name: react-data
description: Standard for the client-side data layer in Vite + React + TypeScript SPAs — typed API client, TanStack Query for reads, mutation + cache patterns, Zod validation at the network boundary, normalized error types, and hook conventions. Use whenever creating or reviewing fetch logic, API hooks, query keys, mutations, cache invalidation, or migrating ad-hoc fetch/useEffect patterns in a React SPA.
license: Proprietary — MIS (Modern Intelligence Solutions) internal use
metadata:
  team: MIS
  version: "1.0"
  stack: vite, react, typescript, tanstack-query, zod
  related: react-fsd
---

# React client data layer

The contract for every data-fetching React SPA:

1. **One API client.** All HTTP calls go through `shared/api/client.ts`. No raw `fetch()` in components or features.
2. **Validate at the boundary.** Network responses are parsed with Zod before they become typed values. Never `as User`.
3. **Reads use TanStack Query.** Entity/feature `api/` functions are wrapped in query hooks in `model/`. Components never call `fetch` directly.
4. **Mutations invalidate precisely.** After a mutation, invalidate only the query keys that actually changed — not the whole cache.
5. **Errors are normalized.** The client maps HTTP failures to typed `ApiError` subclasses so UI can branch on `code`, not prose.

Drop-in implementation lives in `assets/shared/api/` — copy the tree as-is. Depth on each topic:

| Topic | Reference |
|-------|-----------|
| API client contract + configuration | `references/API_CLIENT.md` |
| TanStack Query patterns for reads | `references/QUERY_PATTERNS.md` |
| Mutations, optimistic updates, cache | `references/MUTATIONS_AND_CACHE.md` |
| Zod boundary validation | `references/VALIDATION.md` |
| Error types + UI handling | `references/ERROR_HANDLING.md` |

---

## Decision tree

| If the user asked to… | Go to |
|-----------------------|-------|
| Fetch data from an API | [1. Fetch with TanStack Query](#1-fetch-with-tanstack-query) |
| Create / update / delete data | [2. Mutations](#2-mutations) |
| Validate API responses | [3. Boundary validation](#3-boundary-validation) |
| Handle errors in UI | [4. Error handling](#4-error-handling) |
| Wire the API client | [5. Configure the client](#5-configure-the-client) |
| Migrate `useEffect` + `fetch` | [6. Migrate from useEffect fetch](#6-migrate-from-useeffect-fetch) |
| Review data-layer code | [7. Review checklist](#7-review-checklist) |

---

## 1. Fetch with TanStack Query

Entity read functions live in `entities/<entity>/api/`. Feature-specific reads live in `features/<feature>/api/`. Query hooks wrap them in `model/`.

```ts
/**
 * @file entities/user/api/fetch-user.ts
 * Fetches a single user by id from the API.
 */
import { apiClient } from "@/shared/api/client"
import { UserSchema, type User } from "../model/types"

/**
 * Fetches the user with the given id.
 *
 * @param id - the user's uuid
 * @returns the validated user
 * @throws NotFoundError when the user does not exist
 */
export async function fetchUser(id: string): Promise<User> {
  const json: unknown = await apiClient.get(`/users/${id}`)
  return UserSchema.parse(json)
}
```

```ts
/**
 * @file entities/user/model/use-user.ts
 * TanStack Query hook for loading a single user.
 */
import { useQuery } from "@tanstack/react-query"
import { fetchUser } from "../api/fetch-user"
import { userKeys } from "../api/query-keys"

/**
 * Loads a user by id and exposes TanStack Query state.
 *
 * @param id - the user's uuid
 * @returns query result with `data`, `isPending`, `error`
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: function queryUser() {
      return fetchUser(id)
    },
    enabled: Boolean(id),
  })
}
```

The component imports the hook — never the fetcher:

```tsx
import { useUser } from "@/entities/user"

export function UserProfile({ userId }: { userId: string }) {
  const { data: user, isPending, error } = useUser(userId)
  // render states…
}
```

Full query key conventions — `references/QUERY_PATTERNS.md`.

---

## 2. Mutations

Mutations live in `features/<feature>/model/` and call `features/<feature>/api/`:

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOrder } from "../api/update-order"
import { orderKeys } from "@/entities/order"

export function useUpdateOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateOrder,
    onSuccess: function invalidateOrderDetail(_data, variables) {
      void queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) })
    },
  })
}
```

Optimistic updates and precise invalidation — `references/MUTATIONS_AND_CACHE.md`.

---

## 3. Boundary validation

Every value from the network goes through Zod:

```ts
const json: unknown = await res.json()
return UserSchema.parse(json)  // throws ZodError → mapped to ValidationError
```

Never:

```ts
return json as User  // ❌
```

Full schema patterns — `references/VALIDATION.md`.

---

## 4. Error handling

The API client throws typed `ApiError` subclasses. UI branches on `error.code`:

```tsx
const { error } = useUser(userId)

if (error) {
  if (isApiError(error) && error.code === "not_found") return <NotFound />
  return <ErrorBanner message={error.message} />
}
```

Full error taxonomy — `references/ERROR_HANDLING.md`.

---

## 5. Configure the client

Wire the client once at boot in `shared/api/client.ts`. Import `QueryClientProvider` in `app/providers.tsx`:

```tsx
// src/app/providers.tsx
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/api/query-client"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

---

## 6. Migrate from useEffect fetch

| Old pattern | New pattern |
|-------------|-------------|
| `useEffect(() => { fetch(…).then(setData) }, [])` | `useQuery({ queryKey, queryFn })` |
| Manual `isLoading` / `error` state | TanStack Query's `isPending` / `error` |
| `useEffect` refetch on param change | Query key includes the param; auto-refetches |
| `fetch()` in component body | Entity `api/` function + query hook |

---

## 7. Review checklist

Block on:

- [ ] No raw `fetch()` in components, views, or widgets.
- [ ] Every network response validated with Zod before typing.
- [ ] Query keys are centralized in `api/query-keys.ts` per entity.
- [ ] Mutations invalidate only affected query keys.
- [ ] Errors are `ApiError` subclasses — UI branches on `code`.
- [ ] `queryFn` uses named function expressions (per `react-fsd` hook rules).
- [ ] `enabled` flag set when the query depends on a nullable id/param.

---

## Anti-patterns (do not do this)

- `fetch()` directly in a component or view. Use entity `api/` + query hook.
- `as User` on network JSON. Validate with Zod.
- `queryClient.invalidateQueries()` with no key (invalidates everything). Be precise.
- Storing server data in `useState` when TanStack Query should own it.
- `useEffect` + manual fetch for data that could be a query.
- Ignoring error states in UI ("just show a spinner forever").
- Putting query keys as inline strings scattered across files.
