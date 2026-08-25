import { createContext } from "react";
import type { User } from "@/entities/user";

export type AuthState =
  | { status: "loading" }
  | { status: "authenticated"; user: User }
  | { status: "error"; description: string };

export type AuthContextValue = {
  state: AuthState;
  retry: () => void;
  refreshUser: () => Promise<User>;
  setCurrentStatus: (currentStatus: NonNullable<User["currentStatus"]> | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
