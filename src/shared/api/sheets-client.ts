import axios from "axios";

export const sheetsClient = axios.create({
  baseURL: "https://sheets.googleapis.com/v4",
  params: {
    key: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  },
});
