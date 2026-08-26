import { useEffect, useState, type PropsWithChildren } from "react";
import { MOCK_USER, type User } from "@/entities/user";
import { subscribeTokens, useAuthTokenPersistence } from "@/shared/lib/auth-token";
import { bootstrapAidAuth, getCurrentUser, retryAidAuth } from "../api/auth-api";
import { AuthContext, type AuthState } from "./auth-context";
import { toAuthErrorReason } from "./auth-error";

const useMockUser = import.meta.env.VITE_USE_MOCK_USER === "true";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  // 아래 인증 요청이 토큰을 갱신하기 전에 구독을 걸어야 하므로 가장 먼저 호출한다.
  useAuthTokenPersistence();

  const [state, setState] = useState<AuthState>({ status: "loading" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const request = useMockUser
      ? Promise.resolve(MOCK_USER)
      : attempt === 0
        ? bootstrapAidAuth()
        : retryAidAuth();

    request
      .then(user => {
        if (active) {
          setState({ status: "authenticated", user });
        }
      })
      .catch(error => {
        if (active) {
          setState({ status: "error", reason: toAuthErrorReason(error) });
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  // 401 재발급까지 실패하면 인터셉터가 토큰을 비운다. 그 순간 화면은 여전히
  // 인증된 상태라 이후 요청이 전부 실패하므로, 인증 화면으로 되돌린다.
  useEffect(
    () =>
      subscribeTokens(nextTokens => {
        if (nextTokens.accessToken || nextTokens.dodamToken) {
          return;
        }

        setState(currentState =>
          currentState.status === "authenticated"
            ? { status: "error", reason: "session-expired" }
            : currentState
        );
      }),
    []
  );

  const retry = () => {
    setState({ status: "loading" });
    setAttempt(currentAttempt => currentAttempt + 1);
  };

  const refreshUser = async () => {
    if (useMockUser) {
      setState({ status: "authenticated", user: MOCK_USER });
      return MOCK_USER;
    }

    const user = await getCurrentUser();
    setState({ status: "authenticated", user });
    return user;
  };

  const setCurrentStatus = (currentStatus: NonNullable<User["currentStatus"]> | null) => {
    setState(currentState =>
      currentState.status === "authenticated"
        ? {
            status: "authenticated",
            user: { ...currentState.user, currentStatus },
          }
        : currentState
    );
  };

  // 상태와 무관하게 항상 컨텍스트를 제공한다. 무엇을 보여줄지는 app 레이어의
  // AuthGate가 결정해야 앱 셸(safe-area, 스크롤 영역, 토스트)이 유지된다.
  return (
    <AuthContext.Provider value={{ state, retry, refreshUser, setCurrentStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
