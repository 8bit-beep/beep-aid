import { loadFromStorage } from "@b1nd/aid-kit/app-state";

export const AUTH_TOKENS_KEY = "auth_tokens";

export type AuthTokens = {
  readonly accessToken: string | null;
  readonly refreshToken: string | null;
  // 리프레시 토큰(30일)까지 만료됐을 때 액세스/리프레시를 재발급받기 위해 보관한다.
  readonly dodamToken: string | null;
};

type Listener = (tokens: AuthTokens) => void;

const EMPTY_TOKENS: AuthTokens = {
  accessToken: null,
  refreshToken: null,
  dodamToken: null,
};

const readString = (source: Record<string, unknown>, key: string) =>
  typeof source[key] === "string" && source[key].length > 0 ? source[key] : null;

const hydrate = (): AuthTokens => {
  const stored = loadFromStorage()[AUTH_TOKENS_KEY];

  if (typeof stored !== "object" || stored === null) {
    return EMPTY_TOKENS;
  }

  const source = stored as Record<string, unknown>;

  return {
    accessToken: readString(source, "accessToken"),
    refreshToken: readString(source, "refreshToken"),
    dodamToken: readString(source, "dodamToken"),
  };
};

// axios 인터셉터는 React 밖에서 동기적으로 토큰을 읽어야 하는데 app-state는 훅으로만
// 접근되고 저장도 100ms 디바운스된다. 그래서 인메모리 값을 단일 소스로 두고,
// useAuthTokenPersistence가 구독해서 app-state(localStorage)에 뒤따라 반영한다.
let tokens = hydrate();
const listeners = new Set<Listener>();

export const getTokens = () => tokens;
export const getAccessToken = () => tokens.accessToken;
export const getRefreshToken = () => tokens.refreshToken;
export const getDodamToken = () => tokens.dodamToken;

const commit = (next: AuthTokens) => {
  tokens = next;
  listeners.forEach(listener => listener(next));
};

export const setTokens = (patch: Partial<AuthTokens>) => {
  commit({ ...tokens, ...patch });
};

export const clearTokens = () => {
  commit(EMPTY_TOKENS);
};

export const subscribeTokens = (listener: Listener) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};
