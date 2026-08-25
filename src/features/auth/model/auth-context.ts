import { createContext } from "react";
import type { User } from "@/entities/user";
import type { AuthErrorReason } from "./auth-error";

export type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "error"; reason: AuthErrorReason };

export type AuthContextValue = {
  state: AuthState;
  retry: () => void;
  refreshUser: () => Promise<User>;
  setCurrentStatus: (currentStatus: NonNullable<User["currentStatus"]> | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
