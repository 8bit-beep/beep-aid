import type { DayOfWeek, StudentSchedule } from "./schedule.schema";

export type SchedulesByDay = Partial<Record<DayOfWeek, StudentSchedule[]>>;

// 응답은 요일 구분 없이 평평하게 오므로 요일별로 묶고, 하루 안에서는 체크포인트 순서대로 정렬한다.
export const groupSchedulesByDay = (schedules: StudentSchedule[]): SchedulesByDay => {
  const grouped: SchedulesByDay = {};

  for (const schedule of schedules) {
    (grouped[schedule.dayOfWeek] ??= []).push(schedule);
  }

  for (const daySchedules of Object.values(grouped)) {
    daySchedules.sort((a, b) => a.checkpoint.id - b.checkpoint.id);
  }

  return grouped;
};
