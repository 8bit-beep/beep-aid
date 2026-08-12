import { useMemo, useState } from "react";
import { groupSchedulesByDay, useMySchedules } from "@/entities/schedule";
import { getTodayWeekday, WEEKDAY_TO_DAY_OF_WEEK, WEEKDAYS, type Weekday } from "../model/weekday";

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState<Weekday>(getTodayWeekday);
  const { schedules, isLoading, error, refetch } = useMySchedules();

  const schedulesByDay = useMemo(() => groupSchedulesByDay(schedules), [schedules]);
  const daySchedules = schedulesByDay[WEEKDAY_TO_DAY_OF_WEEK[selectedDay]] ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex rounded-full bg-gray-200 p-1">
        {WEEKDAYS.map(day => (
          <button
            key={day}
            type="button"
            onClick={() => setSelectedDay(day)}
            className={`flex-1 rounded-full py-2 text-sm font-medium ${
              day === selectedDay ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="rounded-medium bg-white p-5">
        {isLoading ? (
          <p className="py-2 text-center text-gray-400">스케줄을 불러오는 중이에요</p>
        ) : error ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <p className="text-center text-gray-400">스케줄을 불러오지 못했어요</p>
            <button
              type="button"
              onClick={refetch}
              className="text-sm font-medium text-gray-600 underline"
            >
              다시 시도
            </button>
          </div>
        ) : daySchedules.length > 0 ? (
          daySchedules.map(schedule => (
            <div key={schedule.id} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{schedule.type.name}</span>
              <span className="font-medium text-gray-900">
                {schedule.room.name} ({schedule.checkpoint.name})
              </span>
            </div>
          ))
        ) : (
          <p className="py-2 text-center text-gray-400">일정이 없습니다</p>
        )}
      </div>
    </div>
  );
};
