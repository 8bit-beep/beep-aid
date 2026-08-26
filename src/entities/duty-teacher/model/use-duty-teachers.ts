import { useEffect, useState } from "react";
import { sheetsClient } from "@/shared/api";

const SPREADSHEET_ID = import.meta.env.VITE_DUTY_TEACHER_SHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
const RANGE = "공개용!D4:F4";
const GRADES = ["1학년", "2학년", "3학년"];
const FALLBACK_NAME = "미정";

export type DutyTeacher = {
  grade: string;
  teacherName: string;
};

const fallbackTeachers = () => GRADES.map(grade => ({ grade, teacherName: FALLBACK_NAME }));

// 두 값이 빠진 채 빌드되면 /spreadsheets/undefined 로 키 없이 요청이 나가고,
// 전 학년이 조용히 "미정"으로 떨어져 원인을 알 수 없다. 요청 자체를 걸지 않는다.
const isConfigured = Boolean(SPREADSHEET_ID && API_KEY);

export const useDutyTeachers = () => {
  const [dutyTeachers, setDutyTeachers] = useState<DutyTeacher[] | null>(() =>
    isConfigured ? null : fallbackTeachers()
  );

  useEffect(() => {
    if (!isConfigured) {
      console.error(
        "[DutyTeacher] 당직 선생님을 조회할 수 없습니다. 빌드에 포함되지 않은 환경변수:",
        [!SPREADSHEET_ID && "VITE_DUTY_TEACHER_SHEET_ID", !API_KEY && "VITE_GOOGLE_SHEETS_API_KEY"]
          .filter(Boolean)
          .join(", ")
      );
      return;
    }

    sheetsClient
      .get<{ values?: string[][] }>(
        `/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(RANGE)}`
      )
      .then(({ data }) => {
        const row = data.values?.[0] ?? [];

        if (row.length === 0) {
          console.error(`[DutyTeacher] 시트 ${RANGE} 범위가 비어 있습니다.`);
        }

        setDutyTeachers(
          GRADES.map((grade, index) => ({
            grade,
            teacherName: row[index] && !row[index].startsWith("#") ? row[index] : FALLBACK_NAME,
          }))
        );
      })
      .catch(error => {
        console.error("[DutyTeacher] 시트 조회 실패", error);
        setDutyTeachers(fallbackTeachers());
      });
  }, []);

  return { dutyTeachers };
};
