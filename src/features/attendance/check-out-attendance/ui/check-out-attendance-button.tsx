import { useCheckOutAttendance } from "@/features/attendance/check-out-attendance/model/use-check-out-attendance";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast";

type CheckOutAttendanceButtonProps = {
  currentActivity: string;
  onSuccess?: () => void | Promise<void>;
};

export const CheckOutAttendanceButton = ({
  currentActivity,
  onSuccess,
}: CheckOutAttendanceButtonProps) => {
  const toast = useToast();
  const { checkOutAttendance, isLoading, error } = useCheckOutAttendance(async () => {
    await onSuccess?.();
    toast.success("출석을 취소했어요.");
  });

  return (
    <div className="flex flex-col gap-2">
      {error && (
        <p className="text-center text-sm text-red-600" role="alert">
          {error.message}
        </p>
      )}
      <Button
        variant="danger"
        disabled={isLoading}
        onClick={checkOutAttendance}
        className="w-full disabled:opacity-60"
      >
        {isLoading ? "취소 중..." : `퇴실하기 (현재: ${currentActivity})`}
      </Button>
    </div>
  );
};
