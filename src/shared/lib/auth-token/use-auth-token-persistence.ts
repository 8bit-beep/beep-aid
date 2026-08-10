import { useEffect, useRef } from "react";
import { useAppState } from "@b1nd/aid-kit/app-state";
import { AUTH_TOKENS_KEY, getTokens, subscribeTokens, type AuthTokens } from "./token-store";

/**
 * 인메모리 토큰 스토어의 변경을 app-state(localStorage)에 반영한다.
 * 토큰을 건드리는 요청보다 먼저 구독돼야 하므로 AuthProvider 최상단에서 호출한다.
 */
export const useAuthTokenPersistence = () => {
  const [, setStoredTokens] = useAppState<AuthTokens>(getTokens(), AUTH_TOKENS_KEY);
  const setStoredTokensRef = useRef(setStoredTokens);

  useEffect(() => {
    setStoredTokensRef.current = setStoredTokens;
  });

  useEffect(() => subscribeTokens(nextTokens => setStoredTokensRef.current(nextTokens)), []);
};
