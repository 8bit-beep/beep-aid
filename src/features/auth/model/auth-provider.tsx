import { useEffect, useState, type PropsWithChildren } from "react";
import { MOCK_USER, type User } from "@/entities/user";
import { bootstrapAidAuth, logoutAidAuth, retryAidAuth } from "../api/auth-api";
import { AuthStatusScreen } from "../ui/auth-status-screen";
import { AuthContext } from "./auth-context";

type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "error"; description: string };

const useMockUser = import.meta.env.VITE_USE_MOCK_USER === "true";

export const AuthProvider = ({ children }: PropsWithChildren) => {
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
      .catch(() => {
        if (active) {
          setState({
            status: "error",
            description: "인증 정보를 확인하지 못했습니다. 도담 앱에서 다시 시도해 주세요.",
          });
        }
      });

    return () => {
      active = false;
    };
  }, [attempt]);

  const retry = () => {
    setState({ status: "loading" });
    setAttempt(currentAttempt => currentAttempt + 1);
  };

  if (state.status === "loading") {
    return (
      <AuthStatusScreen
        title="사용자 정보를 확인하고 있어요"
        description="잠시만 기다려 주세요."
        loading
      />
    );
  }

  if (state.status === "error") {
    return (
      <AuthStatusScreen title="인증하지 못했어요" description={state.description} onRetry={retry} />
    );
  }

  const logout = async () => {
    if (!useMockUser) {
      await logoutAidAuth();
    }

    setState({
      status: "error",
      description: "로그아웃되었습니다. 도담 앱에서 미니앱을 다시 열어 주세요.",
    });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, logout }}>{children}</AuthContext.Provider>
  );
};
