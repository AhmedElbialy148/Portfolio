# API client

One HTTP client for the entire SPA. All network calls go through it.

## Contract

`shared/api/client.ts` exports:

```ts
export const apiClient = {
  get:    <T>(path: string, opts?: RequestInit) => Promise<T>,
  post:   <T>(path: string, body: unknown, opts?: RequestInit) => Promise<T>,
  put:    <T>(path: string, body: unknown, opts?: RequestInit) => Promise<T>,
  patch:  <T>(path: string, body: unknown, opts?: RequestInit) => Promise<T>,
  delete: <T>(path: string, opts?: RequestInit) => Promise<T>,
}
```

The client:

1. Prepends `VITE_API_BASE_URL` (from `import.meta.env`).
2. Sets `Content-Type: application/json` on mutations.
3. Attaches auth headers from a pluggable `getAuthHeaders()` function.
4. Parses the response envelope (`{ ok, data, error, requestId }`).
5. Throws typed `ApiError` on failure.
6. Returns `data` on success (typed as `unknown` — the caller validates with Zod).

## Response envelope

The client expects the same envelope as MIS server APIs:

```jsonc
// success
{ "ok": true, "data": { /* payload */ }, "requestId": "…" }

// failure
{ "ok": false, "error": { "code": "not_found", "message": "…", "details": {} }, "requestId": "…" }
```

For third-party APIs that don't use this envelope, add a separate client or a `raw` mode:

```ts
export const rawClient = {
  get: async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) throw new NetworkError(res.status, await res.text())
    return res.json() as unknown
  },
}
```

## Configuration

```ts
// shared/api/client.ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api"

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("session_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}
```

Env access lives in `shared/config/env.ts` — never read `import.meta.env` outside config.

## Timeouts

Default timeout: 30s. Override per-call:

```ts
await apiClient.get("/slow-endpoint", { signal: AbortSignal.timeout(60_000) })
```

## Where fetch functions live

| Layer | Location | Example |
|-------|----------|---------|
| Entity read | `entities/<entity>/api/fetch-<entity>.ts` | `fetchUser` |
| Entity list | `entities/<entity>/api/fetch-<entity>-list.ts` | `fetchUserList` |
| Feature mutation | `features/<feature>/api/<action>.ts` | `submitLogin` |
| Third-party | `shared/api/raw-client.ts` | Medium RSS, external APIs |

Never in `ui/`, `views/`, or `widgets/`.
