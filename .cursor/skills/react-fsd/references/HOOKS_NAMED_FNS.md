# Named function expressions in hooks

Every callback passed to a React hook (`useEffect`, `useLayoutEffect`, `useMemo`, `useCallback`, `useInsertionEffect`) is a **named function expression**, not an anonymous arrow.

## Why

1. **Stack traces.** An anonymous arrow shows as `at <anonymous>` in errors and React's component-stack. A named expression shows as `at syncUserProfile`.
2. **React DevTools.** The Profiler tags effects by the callback's function name.
3. **Reader scan-ability.** The reader sees the *intent* of the effect on the first line, before the dependency list.
4. **Diff readability.** Renaming a named effect produces a 1-line diff.
5. **Grep-ability.** `grep "function syncUserProfile"` finds every effect named that way.

## The rule

```tsx
// ❌ anonymous arrow
useEffect(() => {
  void fetchUser(userId).then(setUser)
}, [userId])

// ✅ named function expression
useEffect(function syncUserProfile() {
  void fetchUser(userId).then(setUser)
}, [userId])
```

Naming convention: **verb phrase that describes the effect's purpose**.

- `useEffect`: side-effect verbs — `syncUserProfile`, `subscribeToInbox`, `trackPageView`, `cleanupListeners`.
- `useMemo`: compute verbs — `computeFilteredItems`, `deriveTotalPrice`, `buildSortedIndex`.
- `useCallback`: handler verbs — `handleSubmit`, `handleDelete`, `handleSearchChange`.

## Async work inside effects

`useEffect` callbacks can't be `async`. Extract the async work into a **named inner function** and call it:

```tsx
useEffect(function syncUserProfile() {
  async function loadUser() {
    const u = await fetchUser(userId)
    setUser(u)
  }
  void loadUser()
}, [userId])
```

## Cleanup functions

The cleanup function returned from `useEffect` is **also** a named function expression:

```tsx
useEffect(function subscribeToInbox() {
  const handle = inbox.subscribe(handleMessage)
  return function unsubscribeFromInbox() {
    inbox.unsubscribe(handle)
  }
}, [])
```

## Event handlers in JSX

One-line arrow handlers in JSX are **acceptable**:

```tsx
<button onClick={() => setOpen(true)}>Open</button>
```

Anything multi-line is lifted out into a named function.

## ESLint enforcement

`assets/eslint.config.mjs` ships with a `no-restricted-syntax` rule that flags anonymous arrows in the relevant hooks.

## Migration recipe (existing codebase)

When adopting this skill on an existing repo:

1. Run the lint rule to find every offender.
2. Convert in batches by *layer*, lowest first (`shared/` → `entities/` → … → `app/`).
3. One PR per layer. Title: `refactor(<layer>): name effect callbacks (FSD <layer>)`.
4. Don't bundle behaviour changes into the migration. Renames only.
