import { z } from "zod";

export const attendanceTypeSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
});

export const attendanceTypesSchema = z.array(attendanceTypeSchema);

export type AttendanceType = z.infer<typeof attendanceTypeSchema>;
