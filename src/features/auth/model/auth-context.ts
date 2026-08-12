import { createContext } from "react";
import type { User } from "@/entities/user";

export type AuthContextValue = {
  user: User;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
