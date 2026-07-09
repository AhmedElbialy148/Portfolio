# TanStack Query patterns

## Query key factory

Each entity has a `api/query-keys.ts` file with a key factory:

```ts
/**
 * @file entities/user/api/query-keys.ts
 * TanStack Query key factory for user-related queries.
 */

/** Query keys for the user entity. */
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (filters: UserListFilters) => [...userKeys.lists(), filters] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: string) => [...userKeys.details(), id] as const,
}
```

Rules:

- Keys are `as const` tuples — never plain strings.
- Factory functions, not inline arrays scattered across files.
- Hierarchical: `all` → `lists` / `details` → specific instances.
- Invalidating `userKeys.all` clears every user query; `userKeys.detail(id)` clears one.

## Query hook placement

| What | Where |
|------|-------|
| Entity read hook | `entities/<entity>/model/use-<entity>.ts` |
| Entity list hook | `entities/<entity>/model/use-<entity>-list.ts` |
| Feature-specific read | `features/<feature>/model/use-<thing>.ts` |

Export hooks from the slice's `index.ts`.

## Standard query hook shape

```ts
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: function queryUser() {
      return fetchUser(id)
    },
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000, // 5 minutes — tune per entity
  })
}
```

## `queryFn` naming

Per `react-fsd` hook rules, `queryFn` is a named function expression:

```ts
queryFn: function queryUserList() {
  return fetchUserList(filters)
}
```

## Stale time defaults

| Data type | `staleTime` | Rationale |
|-----------|-------------|-----------|
| User profile | 5 min | Changes infrequently |
| Dashboard stats | 30s | Near-real-time |
| Static config | Infinity | Never refetches unless invalidated |
| Search results | 0 | Always fresh |

## `enabled` flag

Disable the query when required params are missing:

```ts
enabled: Boolean(id)           // don't fetch with empty id
enabled: isAuthenticated       // don't fetch when logged out
enabled: filters.query.length > 0  // don't fetch empty search
```

## Prefetching

Prefetch on hover or route transition in views:

```ts
import { useQueryClient } from "@tanstack/react-query"

function handleMouseEnter(userId: string) {
  void queryClient.prefetchQuery({
    queryKey: userKeys.detail(userId),
    queryFn: function prefetchUser() {
      return fetchUser(userId)
    },
  })
}
```

## Suspense mode

For views that want Suspense boundaries:

```ts
export function useUserSuspense(id: string) {
  return useSuspenseQuery({
    queryKey: userKeys.detail(id),
    queryFn: function queryUser() {
      return fetchUser(id)
    },
  })
}
```

Wrap the consuming view in `<Suspense fallback={<Skeleton />}>`.

## QueryClient defaults

```ts
// shared/api/query-client.ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
})
```
