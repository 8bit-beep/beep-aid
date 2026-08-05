export type TimeOfDay = {
  hour: number;
  minute: number;
  second: number;
  nano: number;
};

export type DayOfWeek =
  "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";

export type Checkpoint = {
  id: number;
  name: string;
  startAt: TimeOfDay;
  endAt: TimeOfDay;
  attendanceStartAt: TimeOfDay;
  attendanceEndAt: TimeOfDay;
  dayOfWeek: DayOfWeek;
  grade: number;
};
