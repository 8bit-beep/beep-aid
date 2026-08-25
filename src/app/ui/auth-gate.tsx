import type { PropsWithChildren } from "react";
import {
  AuthStatusScreen,
  isRetriableAuthError,
  useAuthState,
  type AuthErrorReason,
} from "@/features/auth";

const ERROR_COPY: Record<AuthErrorReason, { title: string; description: string }> = {
  "no-token": {
    title: "인증 정보가 없어요",
    description: "도담 앱에서 Beep을 다시 열어 주세요.",
  },
  "session-expired": {
    title: "로그인이 만료됐어요",
    description: "도담 앱에서 Beep을 다시 열어 주세요.",
  },
  network: {
    title: "연결하지 못했어요",
    description: "네트워크 연결을 확인한 뒤 다시 시도해 주세요.",
  },
  unknown: {
    title: "인증하지 못했어요",
    description: "잠시 후 다시 시도해 주세요.",
  },
};

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
    const { title, description } = ERROR_COPY[state.reason];

    return (
      <AuthStatusScreen
        title={title}
        description={description}
        onRetry={isRetriableAuthError(state.reason) ? retry : undefined}
      />
    );
  }

  return children;
};
