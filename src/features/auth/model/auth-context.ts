import { createContext } from "react";
import type { User } from "@/entities/user";

export type AuthContextValue = {
  user: User;
  refreshUser: () => Promise<User>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
