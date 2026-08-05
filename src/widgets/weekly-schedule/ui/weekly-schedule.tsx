import { useState } from "react";
import {
  useCheckpoints,
  formatTime,
  WEEKDAYS,
  WEEKDAY_TO_DAY_OF_WEEK,
  type Weekday,
} from "@/entities/checkpoint";

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState<Weekday>(WEEKDAYS[0]);
  const { checkpoints } = useCheckpoints();

  const schedule = (checkpoints ?? [])
    .filter(checkpoint => checkpoint.dayOfWeek === WEEKDAY_TO_DAY_OF_WEEK[selectedDay])
    .sort(
      (a, b) => a.startAt.hour * 60 + a.startAt.minute - (b.startAt.hour * 60 + b.startAt.minute)
    );

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

      <div className="rounded-medium bg-white p-5 shadow-sm">
        {schedule.length > 0 ? (
          schedule.map(checkpoint => (
            <div key={checkpoint.id} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{checkpoint.name}</span>
              <span className="font-medium text-gray-900">
                {formatTime(checkpoint.startAt)} ~ {formatTime(checkpoint.endAt)}
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
