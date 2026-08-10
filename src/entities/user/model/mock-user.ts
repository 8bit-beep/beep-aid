import type { User } from "./user.schema";

// 일반 브라우저에서 UI를 개발할 때만 사용한다.
export const MOCK_USER = {
  name: "장강민",
  studentInfo: "2학년 1반 12번",
  username: "gangmin_0716",
} satisfies User;
