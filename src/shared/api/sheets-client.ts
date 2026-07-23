import axios from "axios";

// VITE_ 접두사라 이 키는 클라이언트 번들에 그대로 노출된다. Google Cloud
// Console에서 이 키에 "웹사이트" 애플리케이션 제한(배포 도메인)을 반드시
// 걸어야 한다 — 코드로는 막을 수 없는 부분.
export const sheetsClient = axios.create({
  baseURL: "https://sheets.googleapis.com/v4",
  params: {
    key: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY,
  },
});
