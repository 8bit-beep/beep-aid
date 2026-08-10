import { z } from "zod";

export const userRoleSchema = z.enum(["STUDENT", "TEACHER", "ADMIN"]);

export const studentInfoSchema = z.object({
  id: z.number().int().optional(),
  grade: z.number().int(),
  classNumber: z.number().int(),
  num: z.number().int(),
  cardId: z.string().nullish(),
});

// AttendanceTypeResponse와 같은 모양이지만, entities 간 교차 참조를 피하려고 여기에 둔다.
const currentStatusSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

// 교사/관리자 계정에는 studentInfo가 없다.
export const userSchema = z.object({
  id: z.number().int().optional(),
  username: z.string().min(1),
  name: z.string().min(1),
  role: userRoleSchema,
  profileImage: z.string().nullish(),
  studentInfo: studentInfoSchema.nullish(),
  currentStatus: currentStatusSchema.nullish(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type StudentInfo = z.infer<typeof studentInfoSchema>;
export type User = z.infer<typeof userSchema>;

export const formatStudentNumber = ({ grade, classNumber, num }: StudentInfo) =>
  `${grade}학년 ${classNumber}반 ${num}번`;
