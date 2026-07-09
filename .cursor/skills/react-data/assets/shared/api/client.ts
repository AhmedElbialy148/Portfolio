/**
 * @file shared/api/client.ts
 * Typed HTTP client for the SPA. All network calls go through this module.
 */

import { ApiError, NetworkError, TimeoutError } from "./errors"

/** Server response envelope shape. */
interface ApiEnvelope<T> {
  ok: boolean
  data?: T
  error?: { code: ApiError["code"]; message: string; details?: unknown }
  requestId?: string
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api"
const DEFAULT_TIMEOUT_MS = 30_000

/** Returns auth headers for authenticated requests. */
function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("session_token")
  return token ? { Authorization: `Bearer ${token}` } : {}
}

/**
 * Performs an HTTP request and returns the parsed `data` field.
 *
 * @param method - HTTP method
 * @param path - API path (prepended with base URL)
 * @param body - optional JSON body
 * @param opts - optional fetch overrides
 * @returns the response `data` field as unknown (caller validates with Zod)
 * @throws ApiError on server-reported failures
 * @throws NetworkError on fetch failures
 * @throws TimeoutError when the request exceeds the time budget
 */
async function request(
  method: string,
  path: string,
  body?: unknown,
  opts?: RequestInit,
): Promise<unknown> {
  const controller = new AbortController()
  const timeout = setTimeout(function abortOnTimeout() {
    controller.abort()
  }, DEFAULT_TIMEOUT_MS)

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
        ...opts?.headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: opts?.signal ?? controller.signal,
      ...opts,
    })

    const envelope: ApiEnvelope<unknown> = await res.json()

    if (!envelope.ok || envelope.error) {
      throw new ApiError(
        res.status,
        envelope.error?.code ?? "internal_error",
        envelope.error?.message ?? "Request failed",
        envelope.error?.details,
      )
    }

    return envelope.data
  } catch (err) {
    if (err instanceof ApiError) throw err
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new TimeoutError()
    }
    throw new NetworkError(err instanceof Error ? err.message : "Network error")
  } finally {
    clearTimeout(timeout)
  }
}

/** Typed HTTP client for the SPA. */
export const apiClient = {
  /**
   * Performs a GET request.
   *
   * @param path - API path
   * @param opts - optional fetch overrides
   * @returns parsed response data
   */
  get: (path: string, opts?: RequestInit) => request("GET", path, undefined, opts),

  /**
   * Performs a POST request.
   *
   * @param path - API path
   * @param body - JSON body
   * @param opts - optional fetch overrides
   * @returns parsed response data
   */
  post: (path: string, body: unknown, opts?: RequestInit) => request("POST", path, body, opts),

  /**
   * Performs a PUT request.
   *
   * @param path - API path
   * @param body - JSON body
   * @param opts - optional fetch overrides
   * @returns parsed response data
   */
  put: (path: string, body: unknown, opts?: RequestInit) => request("PUT", path, body, opts),

  /**
   * Performs a PATCH request.
   *
   * @param path - API path
   * @param body - JSON body
   * @param opts - optional fetch overrides
   * @returns parsed response data
   */
  patch: (path: string, body: unknown, opts?: RequestInit) => request("PATCH", path, body, opts),

  /**
   * Performs a DELETE request.
   *
   * @param path - API path
   * @param opts - optional fetch overrides
   * @returns parsed response data
   */
  delete: (path: string, opts?: RequestInit) => request("DELETE", path, undefined, opts),
}
