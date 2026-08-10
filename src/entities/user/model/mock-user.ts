import type { User } from "./user.schema";

// 일반 브라우저에서 UI를 개발할 때만 사용한다.
export const MOCK_USER = {
  id: 1,
  username: "gangmin_0716",
  name: "장강민",
  role: "STUDENT",
  studentInfo: {
    id: 1,
    grade: 2,
    classNumber: 1,
    num: 12,
    cardId: null,
  },
} satisfies User;
