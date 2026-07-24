import { useCheckOutAttendance } from "@/features/check-out-attendance/model/use-check-out-attendance";
import { Button } from "@/shared/ui/button";

type CheckOutAttendanceButtonProps = {
  currentActivity: string;
  onSuccess?: () => void;
};

export const CheckOutAttendanceButton = ({
  currentActivity,
  onSuccess,
}: CheckOutAttendanceButtonProps) => {
  const { checkOutAttendance } = useCheckOutAttendance(onSuccess);

  return (
    <Button variant="danger" onClick={checkOutAttendance} className="w-full">
      퇴실하기 (현재: {currentActivity})
    </Button>
  );
};
