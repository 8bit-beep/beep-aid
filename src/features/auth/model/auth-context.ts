import { createContext } from "react";
import type { User } from "@/entities/user";

export type AuthContextValue = {
  user: User;
  refreshUser: () => Promise<User>;
  setCurrentStatus: (currentStatus: NonNullable<User["currentStatus"]> | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
