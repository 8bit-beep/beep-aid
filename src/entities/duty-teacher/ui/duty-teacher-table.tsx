import { BRAND_COLOR } from "@/shared/config/colors.ts";

const DUTY_TEACHERS = [
  { grade: "1학년", teacherName: "김지영" },
  { grade: "2학년", teacherName: "박종범" },
  { grade: "3학년", teacherName: "이수경" },
];

export const DutyTeacherTable = () => {
  return (
    <section className="rounded-medium bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">오늘의 당직 선생님</h2>

      <div className="mt-4 grid grid-cols-3">
        {DUTY_TEACHERS.map(({ grade, teacherName }) => (
          <div key={grade} className="text-center text-base">
            <span className="mr-1 text-base-gray-700">{grade} </span>
            <span className="text-lg font-semibold" style={{ color: BRAND_COLOR }}>
              {teacherName}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
