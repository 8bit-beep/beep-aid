import type { AttendanceType } from "@/entities/attendance";
import type { Checkpoint } from "@/entities/checkpoint";
import type { DayOfWeek, StudentSchedule } from "@/entities/schedule";

const DAY_INDEX_TO_DAY_OF_WEEK: DayOfWeek[] = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

type Params = {
  readonly schedules: StudentSchedule[];
  readonly checkpoints: Checkpoint[];
  readonly attendanceTypes: AttendanceType[];
  readonly now: Date;
};

// 출석 가능 시각이 있으면 그 범위를, 없으면 교시 시작~종료 범위를 쓴다.
const getWindow = (checkpoint: Checkpoint) =>
  checkpoint.attendanceStartAt != null && checkpoint.attendanceEndAt != null
    ? { start: checkpoint.attendanceStartAt, end: checkpoint.attendanceEndAt }
    : { start: checkpoint.startAt, end: checkpoint.endAt };

// 후보가 정확히 한 타입으로 모일 때만 그 타입을 쓴다. 겹치면 사용자가 고르게 둔다.
const pickSingleTypeId = (schedules: StudentSchedule[]) => {
  const typeIds = new Set(schedules.map(schedule => schedule.type.id));
  return typeIds.size === 1 ? [...typeIds][0] : undefined;
};

/**
 * 오늘 내 스케줄과 체크포인트 시간을 보고 출석 모달의 기본 출석 타입을 고른다.
 * 1. 지금 시각이 출석 범위에 들어가는 오늘 스케줄의 타입
 * 2. (1이 없거나 체크포인트를 못 불러왔으면) 오늘 스케줄이 모두 같은 타입일 때 그 타입
 * 판단이 애매하거나 출석 타입 목록에 없는 타입이면 undefined를 돌려준다.
 */
export const getDefaultAttendanceTypeId = ({
  schedules,
  checkpoints,
  attendanceTypes,
  now,
}: Params): string | undefined => {
  const today = DAY_INDEX_TO_DAY_OF_WEEK[now.getDay()];
  const todaySchedules = schedules.filter(schedule => schedule.dayOfWeek === today);
  if (todaySchedules.length === 0) return undefined;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const checkpointById = new Map(checkpoints.map(checkpoint => [checkpoint.id, checkpoint]));
  const currentSchedules = todaySchedules.filter(schedule => {
    const checkpoint = checkpointById.get(schedule.checkpoint.id);
    if (!checkpoint) return false;
    const { start, end } = getWindow(checkpoint);
    return start <= nowMinutes && nowMinutes <= end;
  });

  const typeId =
    currentSchedules.length > 0
      ? pickSingleTypeId(currentSchedules)
      : pickSingleTypeId(todaySchedules);

  if (typeId === undefined) return undefined;
  return attendanceTypes.some(type => type.id === typeId) ? String(typeId) : undefined;
};
