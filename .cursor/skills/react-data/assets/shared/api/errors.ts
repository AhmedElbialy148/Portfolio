/**
 * @file shared/api/errors.ts
 * Typed client-side API errors. The API client throws these; UI branches on `code`.
 */

/** Stable, machine-readable error codes. */
export type ErrorCode =
  | "bad_request"
  | "validation_failed"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "network_error"
  | "timeout"
  | "upstream_error"
  | "internal_error"

/**
 * An error carrying an HTTP status and a stable {@link ErrorCode}.
 */
export class ApiError extends Error {
  /** HTTP status code. */
  readonly status: number
  /** Stable machine code for clients to branch on. */
  readonly code: ErrorCode
  /** Optional structured details. */
  readonly details?: unknown

  /**
   * @param status - HTTP status code
   * @param code - stable machine {@link ErrorCode}
   * @param message - human-readable message
   * @param details - optional structured details
   */
  constructor(status: number, code: ErrorCode, message: string, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.details = details
  }
}

/** 400 — malformed or semantically invalid request. */
export class BadRequestError extends ApiError {
  constructor(message = "Bad request", details?: unknown) {
    super(400, "bad_request", message, details)
    this.name = "BadRequestError"
  }
}

/** 400 — input failed schema validation. */
export class ValidationError extends ApiError {
  constructor(message = "Validation failed", details?: unknown) {
    super(400, "validation_failed", message, details)
    this.name = "ValidationError"
  }
}

/** 401 — no valid session. */
export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details?: unknown) {
    super(401, "unauthorized", message, details)
    this.name = "UnauthorizedError"
  }
}

/** 403 — authenticated but not allowed. */
export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details?: unknown) {
    super(403, "forbidden", message, details)
    this.name = "ForbiddenError"
  }
}

/** 404 — resource does not exist. */
export class NotFoundError extends ApiError {
  constructor(message = "Not found", details?: unknown) {
    super(404, "not_found", message, details)
    this.name = "NotFoundError"
  }
}

/** 409 — conflict. */
export class ConflictError extends ApiError {
  constructor(message = "Conflict", details?: unknown) {
    super(409, "conflict", message, details)
    this.name = "ConflictError"
  }
}

/** 429 — rate limit exceeded. */
export class RateLimitedError extends ApiError {
  constructor(message = "Too many requests", details?: unknown) {
    super(429, "rate_limited", message, details)
    this.name = "RateLimitedError"
  }
}

/** 0 — network failure (offline, DNS, CORS). */
export class NetworkError extends ApiError {
  constructor(message = "Network error", details?: unknown) {
    super(0, "network_error", message, details)
    this.name = "NetworkError"
  }
}

/** 504 — request timed out. */
export class TimeoutError extends ApiError {
  constructor(message = "Request timed out", details?: unknown) {
    super(504, "timeout", message, details)
    this.name = "TimeoutError"
  }
}

/** 502 — upstream dependency failed. */
export class UpstreamError extends ApiError {
  constructor(message = "Upstream error", details?: unknown) {
    super(502, "upstream_error", message, details)
    this.name = "UpstreamError"
  }
}

/**
 * Narrow an unknown thrown value to {@link ApiError}.
 *
 * @param err - any caught value
 * @returns true if `err` is an ApiError
 */
export function isApiError(err: unknown): err is ApiError {
  return err instanceof ApiError
}
