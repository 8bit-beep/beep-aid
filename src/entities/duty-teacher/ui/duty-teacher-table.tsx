const DUTY_TEACHERS = [
  { grade: "1학년", teacherName: "000" },
  { grade: "2학년", teacherName: "000" },
  { grade: "3학년", teacherName: "000" },
];

export const DutyTeacherTable = () => {
  return (
    <section className="rounded-medium bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <h2 className="shrink-0 text-lg font-bold text-gray-900">오늘의 당직 선생님</h2>
      </div>

      <div className="mt-4 overflow-hidden rounded-xs">
        <div className="grid grid-cols-3 bg-blue-50">
          {DUTY_TEACHERS.map(({ grade }) => (
            <div key={grade} className="py-3 text-center text-sm font-medium text-gray-700">
              {grade}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3">
          {DUTY_TEACHERS.map(({ grade, teacherName }) => (
            <div key={grade} className="py-3 text-center text-base font-semibold text-gray-900">
              {teacherName}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
