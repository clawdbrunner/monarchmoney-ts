export type ErrorCause =
  | 'auth'
  | 'rate_limit'
  | 'validation'
  | 'not_found'
  | 'dependency_down'
  | 'network'
  | 'unknown';

export interface MonarchErrorPayload {
  message: string;
  code?: string;
  cause?: ErrorCause;
  retriable?: boolean;
  retryAfterMs?: number;
  details?: unknown;
}

export class MonarchError extends Error {
  code?: string;
  causeCategory: ErrorCause;
  retriable: boolean;
  retryAfterMs?: number;
  details?: unknown;

  constructor(payload: MonarchErrorPayload) {
    super(payload.message);
    this.name = 'MonarchError';
    this.code = payload.code;
    this.causeCategory = payload.cause ?? 'unknown';
    this.retriable = payload.retriable ?? false;
    this.retryAfterMs = payload.retryAfterMs;
    this.details = payload.details;
  }
}

export class AuthError extends MonarchError {
  constructor(message: string, details?: unknown) {
    super({ message, cause: 'auth', code: 'AUTH_ERROR', retriable: false, details });
    this.name = 'AuthError';
  }
}

export class RateLimitError extends MonarchError {
  constructor(message: string, retryAfterMs?: number) {
    super({ message, cause: 'rate_limit', code: 'RATE_LIMIT', retriable: true, retryAfterMs });
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends MonarchError {
  constructor(message: string, details?: unknown) {
    super({ message, cause: 'validation', code: 'VALIDATION_ERROR', retriable: false, details });
    this.name = 'ValidationError';
  }
}

export class NetworkError extends MonarchError {
  constructor(message: string, details?: unknown) {
    super({ message, cause: 'network', code: 'NETWORK_ERROR', retriable: true, details });
    this.name = 'NetworkError';
  }
}

export class DependencyError extends MonarchError {
  constructor(message: string, details?: unknown) {
    super({ message, cause: 'dependency_down', code: 'DEPENDENCY_ERROR', retriable: true, details });
    this.name = 'DependencyError';
  }
}

export function normalizeHTTPError(status: number, bodyText?: string): MonarchError {
  if (status === 401 || status === 403) return new AuthError('Unauthorized');
  if (status === 429) return new RateLimitError('Rate limit exceeded');
  if (status >= 500) return new DependencyError(`Upstream error ${status}`, bodyText);
  if (status === 404) return new ValidationError('Resource not found');
  return new MonarchError({ message: `HTTP error ${status}`, cause: 'unknown', retriable: false, details: bodyText });
}

export function normalizeGraphQLError(message: string): MonarchError {
  const lower = message.toLowerCase();
  if (lower.includes('unauthorized') || lower.includes('authentication')) return new AuthError(message);
  if (lower.includes('rate limit')) return new RateLimitError(message);
  if (lower.includes('not found')) return new ValidationError(message);
  return new MonarchError({ message, cause: 'unknown', retriable: false });
}
