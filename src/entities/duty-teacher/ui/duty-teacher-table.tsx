import { BRAND_COLOR } from "@/shared/config/colors.ts";
import { useDutyTeachers } from "../model/use-duty-teachers";

const PLACEHOLDER_TEACHERS = [
  { grade: "1학년", teacherName: "-" },
  { grade: "2학년", teacherName: "-" },
  { grade: "3학년", teacherName: "-" },
];

export const DutyTeacherTable = () => {
  const { dutyTeachers } = useDutyTeachers();

  return (
    <section className="rounded-medium bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">오늘의 당직 선생님</h2>

      <div className="mt-4 grid grid-cols-3">
        {(dutyTeachers ?? PLACEHOLDER_TEACHERS).map(({ grade, teacherName }) => (
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
