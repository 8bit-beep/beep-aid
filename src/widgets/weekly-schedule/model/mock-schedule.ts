export type ScheduleItem = {
  label: string;
  detail: string;
};

export const WEEKDAYS = ["월", "화", "수", "목"] as const;

export type Weekday = (typeof WEEKDAYS)[number];

// TODO: 스케줄 API 연동되면 실제 데이터로 교체
export const WEEKLY_SCHEDULE: Record<Weekday, ScheduleItem[]> = {
  월: [
    { label: "교실자습", detail: "프로젝트 5 (8~9교시)" },
    { label: "실이동", detail: "랩 2 (10~11교시)" },
    { label: "실이동", detail: "랩 2 (최종 출석)" },
  ],
  화: [],
  수: [],
  목: [],
};
