import { z } from "zod";

export const dayOfWeekSchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

export const scheduleRoomSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  grade: z.number().int().nullish(),
  classNumber: z.number().int().nullish(),
  floor: z.number().int().nullish(),
  clubName: z.string().nullish(),
});

// CheckpointSimpleResponse에는 시간이 없어서, 하루 안의 순서는 id 오름차순으로 본다.
export const scheduleCheckpointSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

// AttendanceTypeResponse와 같은 모양이지만, entities 간 교차 참조를 피하려고 여기에 둔다.
const scheduleTypeSchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export const studentScheduleSchema = z.object({
  id: z.number().int(),
  dayOfWeek: dayOfWeekSchema,
  checkpoint: scheduleCheckpointSchema,
  type: scheduleTypeSchema,
  room: scheduleRoomSchema,
});

export const studentSchedulesSchema = z.array(studentScheduleSchema);

export type DayOfWeek = z.infer<typeof dayOfWeekSchema>;
export type StudentSchedule = z.infer<typeof studentScheduleSchema>;
