import { z } from "zod";

const dayOfWeekSchema = z.enum([
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
]);

const TIME_PATTERN = /^(\d{1,2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/;

// Swagger는 LocalTime을 {hour, minute, ...} 객체로 표기하지만, Jackson 기본 설정은 "HH:mm:ss" 문자열로 내려준다.
// 둘 다 받아서 자정부터 지난 분(minute)으로 맞춘다.
const localTimeSchema = z.union([
  z
    .string()
    .regex(TIME_PATTERN)
    .transform(value => {
      const [, hour, minute] = TIME_PATTERN.exec(value)!;
      return Number(hour) * 60 + Number(minute);
    }),
  z
    .object({ hour: z.number().int(), minute: z.number().int() })
    .transform(({ hour, minute }) => hour * 60 + minute),
]);

export const checkpointSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  startAt: localTimeSchema,
  endAt: localTimeSchema,
  attendanceStartAt: localTimeSchema.nullish(),
  attendanceEndAt: localTimeSchema.nullish(),
  dayOfWeek: dayOfWeekSchema.nullish(),
  grade: z.number().int().nullish(),
});

export const checkpointsSchema = z.array(checkpointSchema);

// 시각 필드는 자정부터 지난 분(minute) 단위다.
export type Checkpoint = z.infer<typeof checkpointSchema>;
