import { useMarkAttendance } from "@/features/mark-attendance/model/use-mark-attendance";
import { Button } from "@/shared/ui/button";

type MarkAttendanceButtonProps = {
  onSuccess?: () => void;
};

export const MarkAttendanceButton = ({ onSuccess }: MarkAttendanceButtonProps) => {
  const { markAttendance } = useMarkAttendance(onSuccess);

  return (
    <Button variant="primary" onClick={markAttendance}>
      출석하기
    </Button>
  );
};
