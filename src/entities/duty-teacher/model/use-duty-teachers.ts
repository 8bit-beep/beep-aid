import { useEffect, useState } from "react";
import { sheetsClient } from "@/shared/api";

const SPREADSHEET_ID = import.meta.env.VITE_DUTY_TEACHER_SHEET_ID;
const RANGE = "공개용!D4:F4";
const GRADES = ["1학년", "2학년", "3학년"];
const FALLBACK_NAME = "미정";

export type DutyTeacher = {
  grade: string;
  teacherName: string;
};

export const useDutyTeachers = () => {
  const [dutyTeachers, setDutyTeachers] = useState<DutyTeacher[] | null>(null);

  useEffect(() => {
    sheetsClient
      .get<{ values?: string[][] }>(
        `/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}`
      )
      .then(({ data }) => {
        const row = data.values?.[0] ?? [];

        setDutyTeachers(
          GRADES.map((grade, index) => ({
            grade,
            teacherName: row[index] && row[index] !== "#N/A" ? row[index] : FALLBACK_NAME,
          }))
        );
      })
      .catch(() => {
        setDutyTeachers(GRADES.map(grade => ({ grade, teacherName: FALLBACK_NAME })));
      });
  }, []);

  return { dutyTeachers };
};
