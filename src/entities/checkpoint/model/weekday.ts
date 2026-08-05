import type { DayOfWeek } from "./types";

export const WEEKDAYS = ["월", "화", "수", "목", "금"] as const;

export type Weekday = (typeof WEEKDAYS)[number];

export const WEEKDAY_TO_DAY_OF_WEEK: Record<Weekday, DayOfWeek> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
};
