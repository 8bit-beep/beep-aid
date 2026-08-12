import type { DayOfWeek } from "@/entities/schedule";

// 실이동/자습이 운영되는 요일만 노출한다.
export const WEEKDAYS = ["월", "화", "수", "목"] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const WEEKDAY_TO_DAY_OF_WEEK: Record<Weekday, DayOfWeek> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
};

const DAY_INDEX_TO_WEEKDAY: Record<number, Weekday> = {
  1: "월",
  2: "화",
  3: "수",
  4: "목",
};

// 운영 요일이 아니면(금~일) 첫 요일을 기본 선택한다.
export const getTodayWeekday = (today = new Date()): Weekday =>
  DAY_INDEX_TO_WEEKDAY[today.getDay()] ?? WEEKDAYS[0];
