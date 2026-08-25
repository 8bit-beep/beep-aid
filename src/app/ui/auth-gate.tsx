import type { PropsWithChildren } from "react";
import { AuthStatusScreen, useAuthState } from "@/features/auth";

/** 인증이 끝나기 전까지 앱 화면 대신 상태 화면을 보여준다. 앱 셸 안쪽에 놓인다. */
export const AuthGate = ({ children }: PropsWithChildren) => {
  const { state, retry } = useAuthState();

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

  return children;
};
