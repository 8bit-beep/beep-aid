import { useScanAttendanceQr } from "@/features/scan-attendance-qr/model/use-scan-attendance-qr";
import { Button } from "@/shared/ui/button";

type ScanAttendanceQrButtonProps = {
  onSuccess?: () => void;
};

export const ScanAttendanceQrButton = ({ onSuccess }: ScanAttendanceQrButtonProps) => {
  const { scanAttendanceQr } = useScanAttendanceQr(onSuccess);

  return (
    <Button variant="secondary" onClick={scanAttendanceQr}>
      QR 찍기
    </Button>
  );
};
