import { client } from "./client";

export const appClient = client({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
});
