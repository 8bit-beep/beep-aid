import axios from "axios";

export type AuthErrorReason =
  /** 도담 토큰이 없어 인증을 시작할 수 없다. 재시도해도 결과가 같다. */
  | "no-token"
  /** 재발급까지 실패해 토큰이 비워졌다. 도담 앱에서 다시 진입해야 한다. */
  | "session-expired"
  /** 서버 응답 자체를 받지 못했다. 재시도할 가치가 있다. */
  | "network"
  | "unknown";

export class AuthError extends Error {
  readonly reason: AuthErrorReason;

  constructor(reason: AuthErrorReason, options: { cause?: unknown } = {}) {
    super(reason, { cause: options.cause });
    this.name = "AuthError";
    this.reason = reason;
  }
}

export const toAuthErrorReason = (error: unknown): AuthErrorReason => {
  if (error instanceof AuthError) {
    return error.reason;
  }

  if (axios.isAxiosError(error)) {
    return error.response ? "unknown" : "network";
  }

  return "unknown";
};

/** 재시도해도 같은 결과가 나오는 원인인지. 재시도 버튼 노출 여부를 가른다. */
export const isRetriableAuthError = (reason: AuthErrorReason) =>
  reason === "network" || reason === "unknown";
