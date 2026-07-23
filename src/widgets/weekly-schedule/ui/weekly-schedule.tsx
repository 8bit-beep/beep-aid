import { useState } from "react";
import { WEEKDAYS, WEEKLY_SCHEDULE, type Weekday } from "../model/mock-schedule";

export const WeeklySchedule = () => {
  const [selectedDay, setSelectedDay] = useState<Weekday>(WEEKDAYS[0]);
  const schedule = WEEKLY_SCHEDULE[selectedDay];

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
          schedule.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{item.label}</span>
              <span className="font-medium text-gray-900">{item.detail}</span>
            </div>
          ))
        ) : (
          <p className="py-2 text-center text-gray-400">일정이 없습니다</p>
        )}
      </div>
    </div>
  );
};
