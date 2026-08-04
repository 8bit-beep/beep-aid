import { client } from "./client";

export const beepClient = client({
  baseURL: import.meta.env.VITE_BEEP_API_BASE_URL,
});
