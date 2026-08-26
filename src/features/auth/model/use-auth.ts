import { useContext } from "react";
import { AuthContext } from "./auth-context";

const useAuthContext = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
};

/** 인증 상태 자체를 다루는 곳(AuthGate, 앱 셸)에서 쓴다. */
export const useAuthState = () => useAuthContext();

/** 인증된 사용자를 전제로 하는 화면에서 쓴다. AuthGate 안에서만 호출해야 한다. */
export const useAuth = () => {
  const { state, refreshUser, setCurrentStatus } = useAuthContext();

  if (state.status !== "authenticated") {
    throw new Error("useAuth must be used within AuthGate");
  }

  return { user: state.user, refreshUser, setCurrentStatus };
};
