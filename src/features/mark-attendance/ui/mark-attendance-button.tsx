import { useMarkAttendance } from "@/features/mark-attendance/model/use-mark-attendance";
import { Button } from "@/shared/ui/button";

export const MarkAttendanceButton = () => {
  const { markAttendance } = useMarkAttendance();

  return (
    <Button variant="primary" onClick={markAttendance}>
      출석하기
    </Button>
  );
};
