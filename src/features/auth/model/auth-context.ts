import { createContext } from "react";
import type { User } from "@/entities/user";

export type AuthContextValue = {
  user: User;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
