# Error handling

Client-side errors are normalized to typed `ApiError` subclasses so UI can branch on `code`, not HTTP status or message text.

## Error taxonomy

| Class | HTTP status | Code | When |
|-------|-------------|------|------|
| `BadRequestError` | 400 | `bad_request` | Malformed request |
| `ValidationError` | 400 | `validation_failed` | Zod parse failure on response or form |
| `UnauthorizedError` | 401 | `unauthorized` | No valid session |
| `ForbiddenError` | 403 | `forbidden` | Authenticated but not allowed |
| `NotFoundError` | 404 | `not_found` | Resource doesn't exist |
| `ConflictError` | 409 | `conflict` | Duplicate / locked resource |
| `RateLimitedError` | 429 | `rate_limited` | Too many requests |
| `NetworkError` | 0 | `network_error` | Fetch failed (offline, DNS, CORS) |
| `TimeoutError` | 504 | `timeout` | Request exceeded time budget |
| `UpstreamError` | 502 | `upstream_error` | Server dependency failed |
| `ApiError` (base) | any | any | Catch-all typed error |

## API client error mapping

The client reads the server envelope and throws the matching subclass:

```ts
if (!envelope.ok) {
  throw new ApiError(
    res.status,
    envelope.error.code,
    envelope.error.message,
    envelope.error.details,
  )
}
```

Non-envelope failures (network, timeout) throw `NetworkError` or `TimeoutError`.

## UI error handling patterns

### Query errors

```tsx
const { data, isPending, error } = useUser(userId)

if (isPending) return <UserSkeleton />
if (error) {
  if (isApiError(error) && error.code === "not_found") return <NotFound />
  return <ErrorBanner message={error.message} onRetry={refetch} />
}
return <UserCard user={data} />
```

### Mutation errors

```tsx
const { mutate, error } = useUpdateProfile()

// Inline on the form:
{error && <FormError message={isApiError(error) ? error.message : "Something went wrong"} />}
```

### Global error boundary

Catch unhandled render errors at the app layer:

```tsx
// app/error-boundary.tsx
export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<FatalErrorPage />}>
      {children}
    </ErrorBoundary>
  )
}
```

Query errors are **not** thrown — they're returned in `error`. Only use error boundaries for render crashes.

## Type guard

```ts
export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError
}
```

## Error copy rules

- **Specific, not generic.** "User not found" not "Something went wrong."
- **Actionable.** Include a retry button or a next step.
- **Never leak internals.** Stack traces and server details stay in the console, not the UI.
- **Pair with icon + text.** Don't rely on color alone (see `mis-frontend-design` a11y rules).

## Logging

Log errors with context in development; send to error tracking (Sentry, etc.) in production:

```ts
if (import.meta.env.DEV) {
  console.error("[fetchUser]", { id, error })
}
```

Never `console.log` the full error object in production — it may contain sensitive data.
